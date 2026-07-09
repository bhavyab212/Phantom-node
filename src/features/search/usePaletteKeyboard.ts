import { useEffect } from 'react';
import { useCommandPalette } from './useCommandPalette';

interface UsePaletteKeyboardProps {
  resultCount: number;
  onExecute: (index: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function usePaletteKeyboard({ resultCount, onExecute, containerRef, inputRef }: UsePaletteKeyboardProps) {
  const { isOpen, close, selectedIndex, moveSelectionUp, moveSelectionDown } = useCommandPalette();

  // Focus trap and navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault(); // prevent scrolling
        if (resultCount > 0) moveSelectionDown(resultCount - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault(); // prevent scrolling
        if (resultCount > 0) moveSelectionUp(resultCount - 1);
      }
      
      // 2. Execution
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (resultCount > 0) {
          onExecute(selectedIndex);
        }
      }
      
      // 3. Close
      else if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
      
      // 4. Focus Trap (Tab)
      else if (e.key === 'Tab') {
        if (!containerRef.current) return;
        
        // Find all focusable elements inside the palette container
        const focusableElements = containerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // If shift+tab and on first element, wrap to last
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } 
        // If tab and on last element, wrap to first
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, resultCount, selectedIndex, close, moveSelectionUp, moveSelectionDown, onExecute, containerRef]);
}
