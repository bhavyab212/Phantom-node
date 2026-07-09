import { useEffect, useRef } from 'react';
import { useContactFormStore } from '../useContactFormStore';
import { Monitor, PenTool, TrendingUp, MessageSquare } from 'lucide-react';

const INTENT_OPTIONS = [
  { id: 'Web Design / Development', label: 'Web Design / Development', icon: Monitor },
  { id: 'Branding / Identity', label: 'Branding / Identity', icon: PenTool },
  { id: 'Marketing / Growth', label: 'Marketing / Growth', icon: TrendingUp },
  { id: 'Other', label: 'Something else', icon: MessageSquare },
];

export default function ContactStepIntent() {
  const { intent, customIntentText, setField, nextStep } = useContactFormStore();
  const customInputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (selectedIntent: string) => {
    setField('intent', selectedIntent);
    
    // Auto-advance for non-Other options
    if (selectedIntent !== 'Other') {
      // Small delay to show the selection before animating away
      setTimeout(() => {
        nextStep();
      }, 300);
    }
  };

  const handleCustomTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField('customIntentText', e.target.value);
  };
  
  const handleCustomSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customIntentText.trim().length > 0) {
      nextStep();
    }
  };

  // Focus the input when 'Other' is selected
  useEffect(() => {
    if (intent === 'Other' && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [intent]);

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-2xl font-semibold mb-6 text-white/90">What do you need help with?</h2>
      
      <div className="grid grid-cols-1 gap-3 flex-1 overflow-y-auto custom-scrollbar pb-4 pr-1">
        {INTENT_OPTIONS.map((option) => {
          const isSelected = intent === option.id;
          const Icon = option.icon;
          
          return (
            <div key={option.id} className="w-full">
              <button
                type="button"
                onClick={() => handleSelect(option.id)}
                aria-pressed={isSelected}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-200 border outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#202020]
                  ${isSelected 
                    ? 'bg-[var(--accent-color,rgba(59,130,246,0.15))] border-[var(--accent-color,#3b82f6)] shadow-[0_0_15px_rgba(var(--accent-color-rgb,59,130,246),0.15)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-[var(--accent-color,#3b82f6)] text-white' : 'bg-white/10 text-white/70'}
                `}>
                  <Icon size={20} />
                </div>
                <span className={`font-medium ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {option.label}
                </span>
              </button>
              
              {isSelected && option.id === 'Other' && (
                <div className="mt-3 pl-14 pr-2 animate-in slide-in-from-top-2 fade-in duration-200">
                  <input
                    ref={customInputRef}
                    type="text"
                    value={customIntentText}
                    onChange={handleCustomTextChange}
                    onKeyDown={handleCustomSubmit}
                    placeholder="Briefly describe what you need..."
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-color,#3b82f6)] focus:ring-1 focus:ring-[var(--accent-color,#3b82f6)] transition-all"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => customIntentText.trim() && nextStep()}
                      disabled={!customIntentText.trim()}
                      className="px-4 py-1.5 text-sm font-medium bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
