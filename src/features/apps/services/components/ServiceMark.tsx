import React from 'react';

interface ServiceMarkProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ServiceMark({ type, className = '', size = 'lg' }: ServiceMarkProps) {
  const containerSizes = {
    sm: 'w-14 h-14 rounded-xl',
    md: 'w-16 h-16 rounded-2xl',
    lg: 'w-20 h-20 rounded-[22px]'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const renderIcon = () => {
    switch (type) {
      case 'web-design':
        // Figma-inspired logo
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path fill="#f24e1e" d="M8 2h4a4 4 0 0 1 0 8H8V2z"/>
            <path fill="#ff7262" d="M8 2a4 4 0 0 0 0 8 4 4 0 0 0 0-8z"/>
            <path fill="#1abcfe" d="M8 10h4a4 4 0 0 1 0 8H8v-8z"/>
            <path fill="#0acf83" d="M8 18a4 4 0 0 0 4 4 4 4 0 0 0-4-4z"/>
            <path fill="#a259ff" d="M12 10a4 4 0 0 0 4 4 4 4 0 0 0-4-4z"/>
          </svg>
        );
      case 'brand-identity':
        // Adobe Illustrator style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <rect width="24" height="24" rx="4" fill="#330000" />
            <path d="M7 16V8h2.3l2.8 8h-2.1l-.6-1.9H7.6L7 16H7zm2.4-6.4l-1.3 4h2.5l-1.2-4zm6.5 6.4V8h2v8h-2z" fill="#FF9A00" />
            <circle cx="15.5" cy="6.5" r="1.5" fill="#FF9A00" />
          </svg>
        );
      case 'marketing-growth':
        // Google Ads style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path fill="#F4B400" d="M21.9 14.8l-7.7 13.3c-.9 1.6-3 2.1-4.6 1.2-1.6-.9-2.1-3-1.2-4.6l7.7-13.3c.9-1.6 3-2.1 4.6-1.2 1.6.9 2.1 3 1.2 4.6z"/>
            <path fill="#4285F4" d="M10.3 21.6L2.6 8.3c-.9-1.6-.4-3.7 1.2-4.6C5.4 2.8 7.5 3.3 8.4 5l7.7 13.3c.9 1.6.4 3.7-1.2 4.6-1.6.9-3.7.4-4.6-1.3z"/>
            <circle cx="5" cy="19" r="3" fill="#34A853"/>
          </svg>
        );
      case 'strategy':
        // Colorful strategy
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v2" stroke="#F59E0B" />
            <path d="M12 20v2" stroke="#3B82F6" />
            <path d="M4.93 4.93l1.41 1.41" stroke="#EF4444" />
            <path d="M17.66 17.66l1.41 1.41" stroke="#10B981" />
            <path d="M2 12h2" stroke="#8B5CF6" />
            <path d="M20 12h2" stroke="#EC4899" />
            <circle cx="12" cy="12" r="6" stroke="#111" fill="#FBBF24" />
            <circle cx="12" cy="12" r="2" fill="#111" />
          </svg>
        );
      case 'custom-web-app':
        // React logo
        return (
          <svg viewBox="-11.5 -10.23174 23 20.46348" className={iconSizes[size]}>
            <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
            <g stroke="#61dafb" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        );
      case 'mobile-app':
        // Swift / iOS / Apple vibrant
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#000000">
            <path d="M15.2 6.9c.7-1 1.2-2.3 1.1-3.6-1.1.1-2.5.8-3.3 1.8-.7.8-1.3 2.1-1.1 3.5 1.3 0 2.5-.7 3.3-1.7zm-4.7 14.6c-1.3 0-2.6-.9-3.9-.9-1.3 0-3 .9-4.2.9C.5 21.5-1.5 14.7 1.2 9.9c1.3-2.3 3.6-3.8 6.1-3.8 1.6 0 3.1.8 4.1.8 1 0 2.7-.9 4.6-.9 2 0 4.1.9 5.3 2.8-4.5 2.5-3.8 8.8.8 10.9-1 2.5-2.7 5.2-5.3 5.3-1.4.1-2.7-.8-4.1-.8h-2.2z"/>
          </svg>
        );
      case 'ecommerce':
        // Shopify style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path fill="#95BF47" d="M19 8l-3-6H8L5 8c0 0-2 6-2 9 0 3 4 5 9 5s9-2 9-5c0-3-2-9-2-9z"/>
            <path fill="#5E8E3E" d="M12 22c5 0 9-2 9-5 0-3-2-9-2-9l-3-6h-4v20z"/>
            <path fill="#FFF" d="M14 12c0-1.7-1.3-3-3-3S8 10.3 8 12h2c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1.3.3-2 1C8.3 14.7 8 15.3 8 16h2c0-.6.4-1 1-1s1-.4 1-1 .4-1 1-1 1.3-.3 2-1c.7-.7 1-1.3 1-2z"/>
          </svg>
        );
      case 'seo-content':
        // Ahrefs/Analytics vibrant
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path fill="#FF6B6B" d="M4 14h4v6H4z" />
            <path fill="#4ECDC4" d="M10 10h4v10h-4z" />
            <path fill="#FFE66D" d="M16 4h4v16h-4z" />
            <path stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M2 16l6-6 6 4 8-10" />
          </svg>
        );
      case 'ai-automation':
        // OpenAI style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#10A37F">
            <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10 10-4.5 10-10zm-10 8c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-4-9c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm8 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-4 5c1.7 0 3-1.3 3-3H9c0 1.7 1.3 3 3 3z"/>
          </svg>
        );
      default:
        // Default generic colorful mark
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <circle cx="12" cy="12" r="10" fill="#4F46E5" />
            <path d="M12 6L16 14H8L12 6Z" fill="#FFF" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative bg-white border border-gray-100 flex items-center justify-center shadow-sm shrink-0 ${containerSizes[size]} ${className}`}>
      {renderIcon()}
    </div>
  );
}
