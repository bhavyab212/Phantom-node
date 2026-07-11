import React from 'react';

export const StudioLogoIcon = ({ className = "w-full h-full", style }: { className?: string, style?: React.CSSProperties }) => (
  <img 
    src="/images/studio-logo.png" 
    alt="Phantom Node Studio Logo" 
    className={className} 
    style={style} 
  />
);
