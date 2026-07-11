import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from '@/features/native-app-shell';
import { Check, Send } from 'lucide-react';

export type SubmitState = 'idle' | 'sending' | 'success';

export interface SubmitDialProps {
  status: SubmitState;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const SubmitDial: React.FC<SubmitDialProps> = ({ status, onClick, disabled, className }) => {
  const isIdle = status === 'idle';
  const isSending = status === 'sending';
  const isSuccess = status === 'success';

  return (
    <button
      onClick={() => {
        if (!disabled && isIdle) onClick();
      }}
      className={cn(
        "relative h-16 w-full sm:w-64 flex items-center justify-center p-0 transition-all duration-500 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white bg-gray-900 rounded-full",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && isIdle && "cursor-pointer hover:bg-black",
        className
      )}
    >
      {/* Background fill for success state */}
      <div 
        className={cn(
          "absolute inset-0 bg-green-500 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          isSuccess ? "scale-100" : "scale-0 rounded-full opacity-0"
        )}
      />

      {/* Content wrapper */}
      <div className={cn(
        "relative z-10 flex items-center gap-3 transition-colors duration-300 font-bold tracking-wider uppercase",
        isSuccess ? "text-white" : "text-yellow-400"
      )}>
        {isIdle && (
          <>
            <span>Send brief</span>
            <Send className="w-4 h-4 ml-1" />
          </>
        )}
        
        {isSending && (
          <div className="flex items-center gap-3 opacity-70 text-yellow-400">
            <span>Sending</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {isSuccess && (
          <div className="flex items-center gap-2 animate-in zoom-in duration-300">
            <Check className="w-5 h-5" />
            <span>Received</span>
          </div>
        )}
      </div>
    </button>
  );
};
