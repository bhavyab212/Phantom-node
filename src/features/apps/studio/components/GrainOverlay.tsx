'use client';

import React, { useEffect, useRef } from 'react';

/**
 * GrainOverlay
 * A barely-perceptible SVG film-grain texture via feTurbulence.
 * Opacity: 0.03–0.04. Blend mode: overlay.
 * Applied ONLY to the Overview section background — this is its one intentional use.
 * Do not reuse elsewhere in the Studio app.
 */
export const GrainOverlay: React.FC<{ className?: string }> = ({ className }) => {
  const filterId = 'studio-grain-noise';

  return (
    <>
      {/* Hidden SVG filter definition */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.035" />
            </feComponentTransfer>
            <feBlend mode="overlay" in="SourceGraphic" result="blend" />
          </filter>
        </defs>
      </svg>

      {/* Grain overlay layer */}
      <div
        aria-hidden="true"
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          // We render a rect-fill via a tiny inline SVG for maximum compatibility
          // rather than applying the filter to a div (which has browser quirks).
          zIndex: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          style={{ display: 'block', mixBlendMode: 'overlay', opacity: 0.035 }}
          aria-hidden="true"
        >
          <rect
            width="100%"
            height="100%"
            filter={`url(#${filterId})`}
            fill="white"
          />
        </svg>
      </div>
    </>
  );
};
