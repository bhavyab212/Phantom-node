import React, { useState, useEffect } from 'react';

export function WidgetNotes() {
  const [note, setNote] = useState('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('desktop-widget-notes');
    if (saved) {
      setNote(saved);
    }
  }, []);

  // Save to local storage
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem('desktop-widget-notes', newNote);
  };

  return (
    <div className="w-full h-full flex flex-col relative group">
      <textarea
        value={note}
        onChange={handleNoteChange}
        placeholder="Jot down a quick thought..."
        className="w-full h-full bg-transparent resize-none outline-none text-white/80 placeholder:text-white/30 p-5 text-sm leading-relaxed custom-scrollbar"
        spellCheck={false}
      />
      <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] text-white/30 uppercase tracking-widest">Auto-saved</span>
      </div>
    </div>
  );
}
