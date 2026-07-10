import React from 'react';
import { SkeuomorphicAccent } from '@/features/native-app-shell';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react'; // Fallback icon

export interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl?: string;
  className?: string;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, imageUrl, className }) => {
  return (
    <div className={cn("flex flex-col items-center group", className)}>
      {/* The signature moment: framed portrait */}
      <SkeuomorphicAccent 
        variant="leather-texture" 
        className="w-32 h-32 rounded-full p-2 mb-4 shadow-lg transition-transform duration-300 group-hover:scale-105"
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[var(--color-surface)] shadow-[inset_0_4px_6px_rgba(0,0,0,0.4)] flex items-center justify-center relative">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover relative z-10"
            />
          ) : (
            <User className="w-12 h-12 text-[var(--color-text)]/20 relative z-10" />
          )}
          {/* Inner glass highlight */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] pointer-events-none z-20" />
        </div>
      </SkeuomorphicAccent>
      
      <h4 className="text-lg font-bold text-[var(--color-text)] tracking-tight">{name}</h4>
      <p className="text-sm text-[var(--color-text)]/60 font-medium uppercase tracking-wider mt-1">{role}</p>
    </div>
  );
};
