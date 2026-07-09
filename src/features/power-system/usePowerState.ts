'use client';

import { useState, useEffect } from 'react';

type PowerState = 'off' | 'asleep' | 'awake' | null;

const STORAGE_KEY = 'os-power-state';

function readStorage(): PowerState {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === 'off' || val === 'asleep' || val === 'awake') return val;
    return null; // never set, or invalid value
  } catch {
    return null;
  }
}

function writeStorage(value: PowerState) {
  try {
    if (value === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, value);
    }
  } catch {
    // localStorage unavailable (e.g. SSR / private mode) — silent fail
  }
}

export function usePowerState() {
  // Start as undefined so we know we haven't hydrated yet
  const [powerState, setPowerState] = useState<PowerState | undefined>(undefined);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    setPowerState(readStorage());
  }, []);

  const setAwake = () => {
    writeStorage('awake');
    setPowerState('awake');
  };

  const setAsleep = () => {
    writeStorage('asleep');
    setPowerState('asleep');
  };

  const setOff = () => {
    writeStorage('off');
    setPowerState('off');
  };

  // null (never visited) or "off" → full cold boot
  // "asleep" or "awake" → short wake screen
  const shouldShowFullBoot =
    powerState === null || powerState === 'off';

  // While hydrating (undefined) we don't know yet — return a sentinel
  const hydrated = powerState !== undefined;

  return { powerState, shouldShowFullBoot, hydrated, setAwake, setAsleep, setOff };
}
