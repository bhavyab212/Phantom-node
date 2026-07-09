'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import BootSequence from '@/features/boot-sequence/BootSequence';
import WakeScreen from '@/features/power-system/WakeScreen';
import { usePowerState } from '@/features/power-system/usePowerState';
import LockScreen from '@/features/lock-screen/LockScreen';
import RestartScreen from '@/features/power-system/RestartScreen';
import SleepScreen from '@/features/power-system/SleepScreen';
import ShutdownScreen from '@/features/power-system/ShutdownScreen';
import TabConflictOverlay from '@/features/power-system/TabConflictOverlay';
import { useTabSync } from '@/features/power-system/useTabSync';
import DesktopShell from '@/features/desktop-shell/DesktopShell';

type PowerScreenType = 'none' | 'sleep' | 'restart' | 'shutdown';

export default function DesktopPage() {
  const { hydrated, shouldShowFullBoot, setAwake, setAsleep, setOff } = usePowerState();
  const { isSuppressed, reclaim } = useTabSync();
  const [sequenceDone, setSequenceDone] = useState(false);
  const [activePowerScreen, setActivePowerScreen] = useState<PowerScreenType>('none');
  const [isLocked, setIsLocked] = useState(true);

  const handleSequenceComplete = () => {
    setAwake();
    setSequenceDone(true);
  };

  const handleSleep = () => {
    setAsleep(); // update local storage
    setActivePowerScreen('sleep');
  };

  const handleRestart = () => {
    setActivePowerScreen('restart');
  };

  const handleShutdown = () => {
    setOff(); // update local storage
    setActivePowerScreen('shutdown');
  };

  const handleWakeFromSleep = () => {
    setAwake();
    setActivePowerScreen('none');
  };

  const handleRestartComplete = () => {
    setOff(); // Make sure it triggers full boot next
    setSequenceDone(false);
    setActivePowerScreen('none');
  };

  const handlePowerOn = () => {
    setOff(); // Make sure it triggers full boot next
    setSequenceDone(false);
    setActivePowerScreen('none');
  };

  const handleCancelPowerAction = () => {
    setActivePowerScreen('none');
  };

  useEffect(() => {
    const onPowerAction = (e: Event) => {
      const customEvent = e as CustomEvent<{ action: 'sleep' | 'restart' | 'shutdown' }>;
      const action = customEvent.detail?.action;
      if (action === 'sleep') handleSleep();
      else if (action === 'restart') handleRestart();
      else if (action === 'shutdown') handleShutdown();
    };
    window.addEventListener('power-action', onPowerAction);
    return () => window.removeEventListener('power-action', onPowerAction);
  }, [handleSleep, handleRestart, handleShutdown]);

  if (!hydrated) return null;

  // No early returns for power screens! We want them to layer on top of the Desktop/LockScreen
  // so we can crossfade them using AnimatePresence.

  return (
    <main className="w-screen h-screen overflow-hidden bg-black relative">
      {/* ── Desktop content (always mounted, hidden behind boot/wake screen) ── */}
      {sequenceDone && isLocked && (
        <LockScreen 
          onUnlock={() => setIsLocked(false)}
          onUnlockToApp={(appId) => {
            setIsLocked(false);
          }}
          onSleep={handleSleep}
          onRestart={handleRestart}
          onShutdown={handleShutdown}
        />
      )}

      {sequenceDone && !isLocked && (
        <DesktopShell />
      )}

      {/* ── Power Screens (Layered on top with crossfade) ── */}
      <AnimatePresence>
        {activePowerScreen === 'sleep' && <SleepScreen key="sleep" onWake={handleWakeFromSleep} />}
        {activePowerScreen === 'restart' && <RestartScreen key="restart" onRestartComplete={handleRestartComplete} />}
        {activePowerScreen === 'shutdown' && <ShutdownScreen key="shutdown" onPowerOn={handlePowerOn} onCancel={handleCancelPowerAction} />}
      </AnimatePresence>

      {/* ── Boot / Wake sequence (unmounts itself when done) ── */}
      {!sequenceDone && (
        shouldShowFullBoot
          ? <BootSequence onSequenceComplete={handleSequenceComplete} />
          : <WakeScreen   onComplete={handleSequenceComplete} />
      )}

      {/* ── Tab Conflict Overlay ── */}
      <AnimatePresence>
        {isSuppressed && <TabConflictOverlay key="tab-conflict" onReclaim={reclaim} />}
      </AnimatePresence>
    </main>
  );
}
