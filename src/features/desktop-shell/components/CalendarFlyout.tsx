'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Bell, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarFlyoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarFlyout({ isOpen, onClose }: CalendarFlyoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [navDate, setNavDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = navDate.getFullYear();
  const month = navDate.getMonth();

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (containerRef.current && !containerRef.current.contains(target)) {
        // Prevent closing if clicking the clock itself
        if (target.closest('[aria-label="Clock and Calendar"]')) return;
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [isOpen, onClose]);

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Month navigation helpers
  const handlePrevMonth = () => {
    setNavDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setNavDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // Sunday = 0
  
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const dayCells = [];

  // Previous month fill days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    dayCells.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - i)
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    dayCells.push({
      day: d,
      isCurrentMonth: true,
      date: new Date(year, month, d)
    });
  }

  // Next month fill days to pad to a grid multiple of 7 (usually 42 days total for 6 rows)
  const remaining = 42 - dayCells.length;
  for (let n = 1; n <= remaining; n++) {
    dayCells.push({
      day: n,
      isCurrentMonth: false,
      date: new Date(year, month + 1, n)
    });
  }

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formattedDateHeader = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(selectedDate);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 right-2 w-96 bg-[#1a1a1a]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] z-[60] flex flex-col select-none overflow-hidden"
        >
          {/* Notifications area (placeholder) */}
          <div className="p-4 border-b border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-white/50 px-1">
              <span className="font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <Bell size={13} />
                Notifications
              </span>
              <button className="hover:text-white transition-colors">Clear all</button>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center text-xs text-white/40 py-6">
              No new notifications
            </div>
          </div>

          {/* Calendar header with current date highlight */}
          <div className="p-5 pb-3 flex flex-col">
            <span className="text-white/40 text-xs font-mono uppercase tracking-wider mb-1">SELECTED DATE</span>
            <span className="text-lg font-semibold text-white/95">{formattedDateHeader}</span>
          </div>

          {/* Month Pagination Controls */}
          <div className="flex items-center justify-between px-5 py-2">
            <span className="text-sm font-semibold text-white/80">
              {monthNames[month]} {year}
            </span>
            <div className="flex items-center gap-1">
              <button 
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                title="Previous Month"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                title="Next Month"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="px-5 pb-5">
            {/* Weekdays row */}
            <div className="grid grid-cols-7 text-center mb-2">
              {weekdays.map(day => (
                <div key={day} className="text-xs font-semibold text-white/40 h-8 flex items-center justify-center">
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {dayCells.map((cell, idx) => {
                const today = isToday(cell.date);
                const selected = isSelected(cell.date);
                
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(cell.date)}
                    className={`h-8 w-8 rounded-full text-xs font-medium relative flex items-center justify-center mx-auto transition-all active:scale-95 ${
                      cell.isCurrentMonth ? 'text-white/90' : 'text-white/30'
                    } hover:bg-white/10`}
                    style={{
                      // Focus or selection ring styling
                      border: today ? '1px solid var(--accent-color)' : 'none',
                      backgroundColor: selected ? 'var(--accent-color)' : 'transparent',
                      color: selected ? 'white' : undefined,
                    }}
                  >
                    {/* Tiny dot below if it is today */}
                    {today && !selected && (
                      <div 
                        className="absolute bottom-1 w-1 h-1 rounded-full" 
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      />
                    )}
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
