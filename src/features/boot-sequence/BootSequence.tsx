'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FastBootLog from './FastBootLog';
import { useAssetStore } from '../system/useAssetStore';
import { useDesktopPreferences } from '../system/useDesktopPreferences';

type Stage = 'splash' | 'bootlog' | 'preloader' | 'flash' | 'done';

interface BootSequenceProps {
  onSequenceComplete?: () => void;
}

export default function BootSequence({ onSequenceComplete }: BootSequenceProps) {
  const [stage, setStage] = useState<Stage>('splash');
  const [progress, setProgress] = useState(0);
  const [fadeLogo, setFadeLogo] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [bootlogDone, setBootlogDone] = useState(false);

  const isPreloadingRef = useRef(false);
  const hasLoadedAssets = useRef(false);

  const { setLockScreenWallpaperUrl, setDesktopWallpaperUrl } = useAssetStore();
  const wallpaperId = useDesktopPreferences((s) => s.wallpaperId);

  // ── Skip: any keypress or click jumps immediately to done ──────────────────
  const skip = useCallback(() => {
    setStage('done');
    onSequenceComplete?.();
  }, [onSequenceComplete]);

  useEffect(() => {
    window.addEventListener('keydown', skip);
    window.addEventListener('click', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
    };
  }, [skip]);

  // ── Stage: splash — hold for 2.4s then transition to bootlog ──────────────
  useEffect(() => {
    if (stage !== 'splash') return;
    const t = setTimeout(() => setStage('bootlog'), 2400);
    return () => clearTimeout(t);
  }, [stage]);

  // ── Preload the logo image in the background ──────────────────────────────
  useEffect(() => {
    const img = new Image();
    img.src = '/images/boot-logo.png';
    img.onload = () => setLogoLoaded(true);
    img.onerror = () => {
      setImageError(true);
      setLogoLoaded(true); // Don't hang if image fails to load
    };
  }, []);

  // ── Stage: bootlog → preloader (driven by FastBootLog and Logo load) ────────
  const handleLogComplete = useCallback(() => {
    setBootlogDone(true);
  }, []);

  useEffect(() => {
    if (stage === 'bootlog' && bootlogDone && logoLoaded) {
      setStage('preloader');
    }
  }, [stage, bootlogDone, logoLoaded]);

  // ── Stage: preloader ────────────────────────────────────────────────────────
  useEffect(() => {
    if (stage !== 'preloader') return;
    if (isPreloadingRef.current) return;
    isPreloadingRef.current = true;

    let minimumTimeMet = false;
    let downloadsFinished = false;

    // Minimum delay so the preloader doesn't just flash instantly
    const minTimer = setTimeout(() => {
      minimumTimeMet = true;
      if (downloadsFinished) {
        completePreloader();
      }
    }, 2000);

    const completePreloader = () => {
      setFadeLogo(true);
      setTimeout(() => {
        setStage('flash');
      }, 800);
    };

    const checkCompletion = () => {
      downloadsFinished = true;
      if (minimumTimeMet) {
        completePreloader();
      } else {
        setProgress(100);
      }
    };

    const loadAssets = async () => {
      try {
        const res = await fetch('/api/wallpapers');
        const data = await res.json();
        const lockscreens = data.lockscreens || [];
        const wallpapers = data.wallpapers || [];

        const toDownload: { key: 'lockscreen' | 'desktop', url: string }[] = [];

        if (lockscreens.length > 0) {
          const rand = Math.floor(Math.random() * lockscreens.length);
          toDownload.push({ key: 'lockscreen', url: `/api/image?file=${encodeURIComponent(lockscreens[rand])}` });
        }

        if (wallpaperId === 'default' && wallpapers.length > 0) {
          const rand = Math.floor(Math.random() * wallpapers.length);
          toDownload.push({ key: 'desktop', url: `/api/image?file=${encodeURIComponent(wallpapers[rand])}` });
        }

        if (toDownload.length === 0) {
          checkCompletion();
          return;
        }

        const progresses = new Array(toDownload.length).fill(0);

        const fetchImage = (item: typeof toDownload[0], index: number): Promise<void> => {
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', item.url, true);
            xhr.responseType = 'blob';

            xhr.onprogress = (e) => {
              if (e.lengthComputable) {
                progresses[index] = e.loaded / e.total;
                const totalProgress = (progresses.reduce((a, b) => a + b, 0) / toDownload.length) * 100;
                
                if (!minimumTimeMet) {
                  setProgress(Math.min(95, totalProgress));
                } else {
                  setProgress(totalProgress);
                }
              }
            };

            xhr.onload = () => {
              if (xhr.status === 200) {
                const blobUrl = URL.createObjectURL(xhr.response);
                if (item.key === 'lockscreen') setLockScreenWallpaperUrl(blobUrl);
                if (item.key === 'desktop') setDesktopWallpaperUrl(blobUrl);
                progresses[index] = 1;
                resolve();
              } else {
                reject(new Error(`Failed to load ${item.url}`));
              }
            };

            xhr.onerror = () => reject(new Error(`Network error on ${item.url}`));
            xhr.send();
          });
        };

        await Promise.all(toDownload.map(fetchImage));
        
        setProgress(100);
        checkCompletion();

      } catch (err) {
        console.error('Failed to preload assets:', err);
        checkCompletion();
      }
    };

    if (!hasLoadedAssets.current) {
      hasLoadedAssets.current = true;
      loadAssets();
    } else {
      checkCompletion();
    }

    return () => clearTimeout(minTimer);
    // Explicitly do not include wallpaperId in deps so it doesn't interrupt the sequence if it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, setLockScreenWallpaperUrl, setDesktopWallpaperUrl]);

  // ── Stage: flash → done ────────────────────────────────────────────────────
  useEffect(() => {
    if (stage !== 'flash') return;
    const t = setTimeout(() => {
      setStage('done');
      onSequenceComplete?.();
    }, 450);
    return () => clearTimeout(t);
  }, [stage, onSequenceComplete]);

  if (stage === 'done') return null;

  return (
    <>
      <AnimatePresence>
        {stage === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className="text-white font-mono text-5xl sm:text-6xl tracking-[0.2em] select-none"
              style={{ textShadow: '0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.2)' }}
            >
              Agency WebOS
            </motion.h1>

            <motion.div
              className="absolute w-[200vw] h-px bg-white/10 top-1/2 -translate-y-[80px] -rotate-12"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.5, ease: 'circOut' }}
            />
            <motion.div
              className="absolute w-[200vw] h-px bg-white/5 bottom-1/2 translate-y-[80px] rotate-12"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.5, ease: 'circOut', delay: 0.2 }}
            />
            <motion.div
              className="absolute w-px h-[200vh] bg-white/10 left-1/2 translate-x-[-150px] rotate-12"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 1.5, ease: 'circOut', delay: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {(stage === 'bootlog') && (
        <div className="fixed inset-0 z-[9999] bg-[#050505] font-mono flex flex-col p-8 pointer-events-none">
          <div className="flex-1 overflow-hidden relative">
            <FastBootLog onComplete={handleLogComplete} />
          </div>
        </div>
      )}

      <AnimatePresence>
        {stage === 'preloader' && (
          <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-auto"
          >
            <motion.div
              animate={{ opacity: fadeLogo ? 0 : 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center w-full max-w-sm px-8"
            >
              <motion.div
                className="mb-12 relative flex justify-center items-center select-none"
                initial={{ filter: 'drop-shadow(0 0 10px rgba(0,255,204,0))' }}
                animate={{ filter: 'drop-shadow(0 0 20px rgba(0,255,204,0.4))' }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              >
                {!imageError ? (
                  <img 
                    src="/images/boot-logo.png" 
                    alt="Phantom Node" 
                    className="w-[576px] h-auto object-contain"
                    style={{ mixBlendMode: 'screen' }}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <h1
                    className="text-white font-mono text-4xl tracking-[0.2em] font-medium select-none text-center"
                    style={{ textShadow: '0 0 30px rgba(0,255,204,0.7), 0 0 60px rgba(0,255,204,0.3)' }}
                  >
                    PHANTOM<br/>NODE
                  </h1>
                )}
              </motion.div>

              <div className="w-full h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00aa88] to-[#00ffcc] rounded-full relative"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.3 }}
                >
                  {/* Inner glow for the bar */}
                  <div className="absolute inset-0 shadow-[0_0_12px_rgba(0,255,204,0.8)] rounded-full mix-blend-screen" />
                </motion.div>
              </div>

              <motion.div
                className="mt-4 text-[10px] text-[#00ffcc]/50 tracking-[0.2em] font-mono select-none"
              >
                {Math.round(progress)}%
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'flash' && (
          <motion.div
            className="fixed inset-0 z-[10000] bg-white pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
