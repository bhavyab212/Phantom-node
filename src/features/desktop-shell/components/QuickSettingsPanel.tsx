'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Volume2, Volume1, VolumeX, Battery, Bluetooth, Plane, Eye, Moon, Sun } from 'lucide-react';
import { useDesktopPreferences } from '../../system/useDesktopPreferences';

interface QuickSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  volume: number;
  setVolume: (v: number) => void;
  brightness: number;
  setBrightness: (b: number) => void;
}

export default function QuickSettingsPanel({
  isOpen,
  onClose,
  volume,
  setVolume,
  brightness,
  setBrightness
}: QuickSettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { nightLight: nightOn, setNightLight: setNightOn } = useDesktopPreferences();
  
  // Toggles state
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [airplaneOn, setAirplaneOn] = useState(false);
  const [saverOn, setSaverOn] = useState(false);
  const [focusOn, setFocusOn] = useState(false);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (panelRef.current && !panelRef.current.contains(target)) {
        // Prevent immediate close if clicking the tray trigger itself
        if (target.closest('[aria-label="Network, Volume, and Battery status"]')) return;
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [isOpen, onClose]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Volume icon helper
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />;
    if (volume < 33) return <Volume1 size={16} />;
    if (volume < 66) return <Volume2 size={16} />;
    return <Volume2 size={16} />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 right-2 w-96 bg-[#1a1a1a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] z-[60] p-6 select-none"
        >
          {/* Quick Settings Toggles Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {/* Wi-Fi */}
            <button
              onClick={() => setWifiOn(!wifiOn)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 transition-all active:scale-95"
              style={{
                backgroundColor: wifiOn ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
                color: wifiOn ? 'white' : 'rgba(255,255,255,0.7)'
              }}
            >
              <Wifi size={20} className="mb-1.5" />
              <span className="text-[11px] font-medium truncate w-full text-center">Wi-Fi</span>
            </button>

            {/* Bluetooth */}
            <button
              onClick={() => setBluetoothOn(!bluetoothOn)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 transition-all active:scale-95"
              style={{
                backgroundColor: bluetoothOn ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
                color: bluetoothOn ? 'white' : 'rgba(255,255,255,0.7)'
              }}
            >
              <Bluetooth size={20} className="mb-1.5" />
              <span className="text-[11px] font-medium truncate w-full text-center">Bluetooth</span>
            </button>

            {/* Airplane Mode */}
            <button
              onClick={() => setAirplaneOn(!airplaneOn)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 transition-all active:scale-95"
              style={{
                backgroundColor: airplaneOn ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
                color: airplaneOn ? 'white' : 'rgba(255,255,255,0.7)'
              }}
            >
              <Plane size={20} className="mb-1.5" />
              <span className="text-[11px] font-medium truncate w-full text-center">Airplane</span>
            </button>

            {/* Battery Saver */}
            <button
              onClick={() => setSaverOn(!saverOn)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 transition-all active:scale-95"
              style={{
                backgroundColor: saverOn ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
                color: saverOn ? 'white' : 'rgba(255,255,255,0.7)'
              }}
            >
              <Battery size={20} className="mb-1.5" />
              <span className="text-[11px] font-medium truncate w-full text-center">Battery Saver</span>
            </button>

            {/* Night Light */}
            <button
              onClick={() => setNightOn(!nightOn)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 transition-all active:scale-95"
              style={{
                backgroundColor: nightOn ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
                color: nightOn ? 'white' : 'rgba(255,255,255,0.7)'
              }}
            >
              <Eye size={20} className="mb-1.5" />
              <span className="text-[11px] font-medium truncate w-full text-center">Night Light</span>
            </button>

            {/* Focus Assist */}
            <button
              onClick={() => setFocusOn(!focusOn)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 transition-all active:scale-95"
              style={{
                backgroundColor: focusOn ? 'var(--accent-color)' : 'rgba(255,255,255,0.04)',
                color: focusOn ? 'white' : 'rgba(255,255,255,0.7)'
              }}
            >
              <Moon size={20} className="mb-1.5" />
              <span className="text-[11px] font-medium truncate w-full text-center">Focus Assist</span>
            </button>
          </div>

          {/* Volume and Brightness Sliders */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            {/* Brightness Slider */}
            <div className="flex items-center gap-4">
              <Sun size={18} className="text-white/60 flex-shrink-0" />
              <div className="flex-1 relative flex items-center">
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/20 accent-[var(--accent-color)] outline-none"
                />
              </div>
              <span className="text-xs text-white/50 w-8 text-right font-mono">{brightness}%</span>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-4">
              <span className="text-white/60 flex-shrink-0">{getVolumeIcon()}</span>
              <div className="flex-1 relative flex items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/20 accent-[var(--accent-color)] outline-none"
                />
              </div>
              <span className="text-xs text-white/50 w-8 text-right font-mono">{volume}%</span>
            </div>
          </div>

          {/* Bottom Battery & Spec Info Status Bar */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <Battery size={16} className="text-white/80" />
              <span className="font-medium text-white/80">85% Remaining</span>
            </div>
            <div className="text-[11px] text-white/40">
              Charging • 1h 12m to full
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
