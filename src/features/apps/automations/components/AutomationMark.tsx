import React from 'react';

interface AutomationMarkProps {
  type: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AutomationMark({ type, className = '', size = 'md' }: AutomationMarkProps) {
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
      case 'calling-agent':
        // Phone icon
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#10B981">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        );
      case 'customer-follow-up':
        // HubSpot style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#FF7A59">
            <path d="M12 2.5a3 3 0 100 6 3 3 0 000-6zM5 13a3 3 0 100 6 3 3 0 000-6zm14 0a3 3 0 100 6 3 3 0 000-6zm-1.8-1.4L14 9.1a4.9 4.9 0 01-4 0l-3.2 2.5a5 5 0 01-1.6 3l1.8 1.8A7.2 7.2 0 0012 15a7.2 7.2 0 004.9-2l1.9-1.8a5 5 0 01-1.6-3z"/>
          </svg>
        );
      case 'customer-support':
        // Zendesk style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#03363D">
            <path d="M12 2L2 22h20L12 2zm0 5l4.5 9h-9L12 7z"/>
            <path d="M12 11l-2 4h4l-2-4z" fill="#17494D" />
          </svg>
        );
      case 'crypto-news':
        // Binance style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#F3BA2F">
            <path d="M12 2.5L2 12l10 9.5L22 12 12 2.5zm0 4.5l4 4-4 4-4-4 4-4z"/>
          </svg>
        );
      case 'lead-scraper':
        // Apollo style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#1A1A1A">
            <path d="M12 2L2 22h20L12 2zM6 18l6-12 6 12H6z" fill="#2451F5" />
            <circle cx="12" cy="14" r="3" fill="#F4C300" />
          </svg>
        );
      case 'linkedin-autopost':
        // LinkedIn style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'offer-letter':
        // DocuSign style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#FFD500">
            <path d="M20 2H8a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zM4 6H2v14a2 2 0 002 2h14v-2H4V6z" fill="#000" />
            <circle cx="14" cy="10" r="4" fill="#005CB9" />
          </svg>
        );
      case 'personalized-cold-email':
        // Gmail style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path fill="#4285F4" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"/>
            <path fill="#EA4335" d="M12 13L2 6h20l-10 7z"/>
            <path fill="#34A853" d="M22 6l-10 7L2 6v12l10-7 10 7V6z" />
            <path fill="#FBBC05" d="M22 18l-10-7-10 7h20z" />
          </svg>
        );
      case 'product-recommendation-rag':
        // OpenAI style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#10A37F">
            <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10 10-4.5 10-10zm-10 8c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-4-9c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm8 0c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1zm-4 5c1.7 0 3-1.3 3-3H9c0 1.7 1.3 3 3 3z"/>
          </svg>
        );
      case 'sales-agent':
        // Salesforce style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#00A1E0">
            <path d="M17.5 7.5A5.5 5.5 0 007 8.2a4 4 0 00-2.5 7.3A3 3 0 007 20h11a4.5 4.5 0 00-.5-8.9 3 3 0 000-3.6z"/>
          </svg>
        );
      case 'social-media-factory':
        // Instagram gradient style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <defs>
              <linearGradient id="ig" x1="20%" y1="20%" x2="80%" y2="80%">
                <stop offset="0%" stopColor="#fdf497" />
                <stop offset="20%" stopColor="#fd5949" />
                <stop offset="50%" stopColor="#d6249f" />
                <stop offset="100%" stopColor="#285AEB" />
              </linearGradient>
            </defs>
            <path fill="url(#ig)" d="M12 2c2.7 0 3 .01 4.1.06 1.1.05 1.7.23 2.1.39.5.2 1 .49 1.4 1s.8.9 1 1.4c.16.4.34 1 .39 2.1.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.23 1.7-.39 2.1-.2.5-.49 1-1 1.4s-.9.8-1.4 1c-.4.16-1 .34-2.1.39-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.7-.23-2.1-.39-.5-.2-1-.49-1.4-1s-.8-.9-1-1.4c-.16-.4-.34-1-.39-2.1C2.01 15 2 14.7 2 12s.01-3 .06-4.1c.05-1.1.23-1.7.39-2.1.2-.5.49-1 1-1.4s.9-.8 1.4-1c.4-.16 1-.34 2.1-.39C9 2.01 9.3 2 12 2zm0 2.2c-2.7 0-3 .01-4 .05-.9.04-1.4.2-1.7.31-.4.15-.7.34-1 .64-.3.3-.49.6-.64 1-.11.3-.27.8-.31 1.7-.04 1-.05 1.3-.05 4s.01 3 .05 4c.04.9.2 1.4.31 1.7.15.4.34.7.64 1 .3.3.6.49 1 .64.3.11.8.27 1.7.31 1 .04 1.3.05 4 .05s3-.01 4-.05c.9-.04 1.4-.2 1.7-.31.4-.15.7-.34 1-.64.3-.3.49-.6.64-1 .11-.3.27-.8.31-1.7.04-1 .05-1.3.05-4s-.01-3-.05-4c-.04-.9-.2-1.4-.31-1.7-.15-.4-.34-.7-.64-1-.3-.3-.6-.49-1-.64-.3-.11-.8-.27-1.7-.31-1-.04-1.3-.05-4-.05zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-7.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/>
          </svg>
        );
      case 'website-audit':
        // Google Analytics style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path fill="#F9AB00" d="M12 20V4h3v16h-3z"/>
            <path fill="#E37400" d="M17 20v-8h3v8h-3z"/>
            <path fill="#F9AB00" d="M7 20v-4h3v4H7z"/>
            <path fill="#E37400" d="M2 20v-2h3v2H2z"/>
          </svg>
        );
      case 'whatsapp-restaurant':
        // WhatsApp style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#25D366">
            <path d="M12 2a10 10 0 018.5 15.2l-1.3 4.8 4.8-1.3A10 10 0 1112 2zm0 2a8 8 0 00-6.8 12.2l-1.1 3.2 3.2-1.1A8 8 0 1012 4zm4.2 9.2c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.4 0-.1.2-.6.7-.7.9-.1.1-.3.2-.5.1-1-.5-1.9-1.2-2.7-2.1-.2-.2-.3-.5 0-.7.1-.1.2-.2.3-.3.1-.1.1-.2.2-.4s0-.3-.1-.4c-.1-.2-.4-1-.6-1.4-.2-.4-.3-.3-.4-.3h-.3c-.1 0-.4.1-.6.3-.2.3-.7.7-.7 1.8s.7 2.1.8 2.3c.1.1 1.6 2.4 3.8 3.4.5.2 1 .4 1.3.5.5.2 1 .1 1.4.1.4-.1 1.3-.5 1.5-1 .2-.5.2-1 .1-1z"/>
          </svg>
        );
      case 'youtube-thumbnail':
        // YouTube style
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]} fill="#FF0000">
            <path d="M21.6 6.4a2.7 2.7 0 00-1.9-1.9C18 4.1 12 4.1 12 4.1s-6 0-7.7.4A2.7 2.7 0 002.4 6.4C2 8.1 2 12 2 12s0 3.9.4 5.6a2.7 2.7 0 001.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 001.9-1.9C22 15.9 22 12 22 12s0-3.9-.4-5.6zM10 15V9l5.2 3-5.2 3z"/>
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
