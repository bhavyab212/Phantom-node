import { useState, useEffect, useCallback, useRef } from 'react';

export function useTabSync() {
  const [isSuppressed, setIsSuppressed] = useState(false);
  // Generate a unique ID for this specific tab instance
  const tabIdRef = useRef(Math.random().toString(36).substring(2, 9));

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const channel = new BroadcastChannel('os-session');

    const handleMessage = (event: MessageEvent) => {
      // Ignore claims from our own tab!
      if (event.data?.type === 'claim' && event.data.tabId !== tabIdRef.current) {
        setIsSuppressed(true);
      }
    };

    channel.addEventListener('message', handleMessage);

    // Initial claim when this tab mounts
    channel.postMessage({ type: 'claim', tabId: tabIdRef.current, timestamp: Date.now() });

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);

  const reclaim = useCallback(() => {
    if (typeof window === 'undefined') return;
    const channel = new BroadcastChannel('os-session');
    channel.postMessage({ type: 'claim', tabId: tabIdRef.current, timestamp: Date.now() });
    channel.close();
    setIsSuppressed(false);
  }, []);

  return { isSuppressed, reclaim };
}
