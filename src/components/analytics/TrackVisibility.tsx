"use client";

import { useEffect, useRef, useState } from "react";
import { trackStudioComponentViewed } from "@/lib/analytics";

interface TrackVisibilityProps {
  children: React.ReactNode;
  componentName: string;
  studioView: string;
  componentPosition: number;
  sourceId?: string;
}

export function TrackVisibility({
  children,
  componentName,
  studioView,
  componentPosition,
  sourceId
}: TrackVisibilityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (hasTracked) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackStudioComponentViewed(componentName, studioView, componentPosition, sourceId);
          setHasTracked(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // Fire when 30% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [componentName, studioView, componentPosition, sourceId, hasTracked]);

  return <div ref={ref} className="w-full h-full">{children}</div>;
}
