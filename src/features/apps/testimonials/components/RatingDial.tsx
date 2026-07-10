import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from '@/features/native-app-shell';

export interface RatingDialProps {
  rating: number; // e.g. 4.9
  maxRating?: number; // default 5
  className?: string;
}

export const RatingDial: React.FC<RatingDialProps> = ({ rating, maxRating = 5, className }) => {
  const [fill, setFill] = useState(0);
  
  useEffect(() => {
    // Animate the fill on mount
    const targetFill = (rating / maxRating) * 100;
    const timer = setTimeout(() => setFill(targetFill), 100);
    return () => clearTimeout(timer);
  }, [rating, maxRating]);

  // SVG Arc calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  // Let's make it a 3/4 circle gauge (270 degrees)
  const dashArray = `${circumference * 0.75} ${circumference * 0.25}`;
  const strokeDashoffset = (circumference * 0.75) - ((circumference * 0.75) * fill) / 100;

  return (
    <div className={cn("flex flex-col items-center justify-center p-6", className)}>
      <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/50 mb-6">
        Overall Client Rating
      </h3>
      
      <div className="relative w-48 h-48">
        {/* Outer Bezel */}
        <NeumorphicControl
          raised={true}
          rounded="full"
          className="absolute inset-0 rounded-full"
        />

        {/* Inner Dial Face (Pressed) */}
        <NeumorphicControl
          raised={false}
          pressed={true}
          rounded="full"
          className="absolute inset-4 rounded-full flex items-center justify-center"
        >
          {/* SVG Gauge */}
          <svg className="absolute inset-0 w-full h-full -rotate-[135deg]">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="var(--color-text)"
              strokeOpacity="0.1"
              strokeWidth="8"
              strokeDasharray={dashArray}
              strokeLinecap="round"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="8"
              strokeDasharray={dashArray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            />
          </svg>

          {/* Rating Text inside Dial */}
          <div className="text-center">
            <span className="text-4xl font-black text-[var(--color-text)] tracking-tighter">
              {rating}
            </span>
            <span className="text-sm font-bold text-[var(--color-text)]/40 ml-1">
              / {maxRating}
            </span>
          </div>
        </NeumorphicControl>
      </div>
    </div>
  );
};
