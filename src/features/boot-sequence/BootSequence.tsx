'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAssetStore } from '../system/useAssetStore';
import { useDesktopPreferences } from '../system/useDesktopPreferences';

type Stage = 'loading' | 'done';

interface BootSequenceProps {
  onSequenceComplete?: () => void;
}

export default function BootSequence({ onSequenceComplete }: BootSequenceProps) {
  const [stage, setStage] = useState<Stage>('loading');
  const [progress, setProgress] = useState(0);
  const [fadeLogo, setFadeLogo] = useState(false);
  const isPreloadingRef = useRef(false);

  const { setLockScreenWallpaperUrl, setDesktopWallpaperUrl } = useAssetStore();
  const wallpaperId = useDesktopPreferences((s) => s.wallpaperId);

  const completeSequence = useCallback(() => {
    setFadeLogo(true);
    setTimeout(() => {
      setStage('done');
      onSequenceComplete?.();
    }, 800); // Wait for logo to fade out
  }, [onSequenceComplete]);

  useEffect(() => {
    // Only run this once
    if (isPreloadingRef.current) return;
    isPreloadingRef.current = true;

    let minimumTimeMet = false;
    let downloadsFinished = false;

    // We enforce a minimum artificial delay of 2000ms so the loading screen feels satisfying
    const minTimer = setTimeout(() => {
      minimumTimeMet = true;
      if (downloadsFinished) {
        completeSequence();
      }
    }, 2000);

    const checkCompletion = () => {
      downloadsFinished = true;
      if (minimumTimeMet) {
        completeSequence();
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

        // Only fetch desktop wallpaper if it's set to 'default' (meaning an image, not a gradient like purple/green)
        if (wallpaperId === 'default' && wallpapers.length > 0) {
          const rand = Math.floor(Math.random() * wallpapers.length);
          toDownload.push({ key: 'desktop', url: `/api/image?file=${encodeURIComponent(wallpapers[rand])}` });
        }

        if (toDownload.length === 0) {
          // Nothing to download, wait for timer
          checkCompletion();
          return;
        }

        // Track progress for all downloads
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
                
                // Set progress, but don't let it instantly hit 100% unless minimum time is met
                // Let's cap visual progress to max 95% if min timer hasn't finished, so it holds right at the end.
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
        // Fallback completion so we don't hang
        checkCompletion();
      }
    };

    loadAssets();

    return () => clearTimeout(minTimer);
  }, [completeSequence, setLockScreenWallpaperUrl, setDesktopWallpaperUrl, wallpaperId]);

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="boot"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-auto"
      >
        <motion.div
          animate={{ opacity: fadeLogo ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center w-full max-w-sm px-8"
        >
          {/* Glowing Logo */}
          <h1
            className="text-white font-mono text-5xl tracking-[0.3em] font-medium mb-12 select-none"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.7), 0 0 60px rgba(255,255,255,0.3)' }}
          >
            LOGO
          </h1>

          {/* Progress Bar Container */}
          <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>

          {/* Percentage */}
          <motion.div
            className="mt-4 text-[10px] text-blue-200/50 tracking-[0.2em] font-mono select-none"
          >
            {Math.round(progress)}%
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
