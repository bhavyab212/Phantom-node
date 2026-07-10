import React, { useState } from 'react';
import { NeumorphicControl } from '@/features/native-app-shell';
import { cn } from '@/lib/utils';

export interface PhilosophyCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const PhilosophyCard: React.FC<PhilosophyCardProps> = ({ title, description, icon, className }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className={cn("cursor-pointer select-none", className)}
    >
      <NeumorphicControl
        raised={!isPressed}
        pressed={isPressed}
        rounded="lg"
        className="p-6 h-full flex flex-col transition-all duration-150 motion-safe:active:scale-[0.98]"
      >
        {icon && (
          <div className="mb-4 text-[var(--color-accent)] w-8 h-8 opacity-80">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 tracking-tight">
          {title}
        </h3>
        <p className="text-[var(--color-text)]/70 text-sm leading-relaxed flex-1">
          {description}
        </p>
      </NeumorphicControl>
    </div>
  );
};
