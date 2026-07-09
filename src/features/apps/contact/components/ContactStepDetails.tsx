import { useContactFormStore } from '../useContactFormStore';
import { useWindowStore } from '../../../window-manager/useWindowStore';
import { ArrowLeft } from 'lucide-react';

const BUDGET_OPTIONS = ['Under $2k', '$2k–$5k', '$5k–$15k', '$15k+', 'Not sure yet'];
const TIMELINE_OPTIONS = ['ASAP', 'Within a month', 'Just exploring'];

interface SelectCardProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function SelectCard({ label, isSelected, onClick }: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`
        px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border outline-none
        focus-visible:ring-2 focus-visible:ring-[var(--accent-color,#3b82f6)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1C1E]
        ${isSelected
          ? 'bg-[var(--accent-color,#3b82f6)] border-[var(--accent-color,#3b82f6)] text-white shadow-[0_2px_12px_rgba(var(--accent-color-rgb,59,130,246),0.3)]'
          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white'
        }
      `}
    >
      {label}
    </button>
  );
}

export default function ContactStepDetails() {
  const { budgetRange, timeline, setField, nextStep, prevStep } = useContactFormStore();

  const isComplete = budgetRange !== '' && timeline !== '';

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 flex-shrink-0">
        <button
          onClick={prevStep}
          className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Go back to step 1"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-semibold text-white/90">Project Details</h2>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 space-y-8 pb-4 pr-1">

        {/* Budget Section */}
        <section>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
            What's your budget range?
          </h3>
          <div className="flex flex-wrap gap-2">
            {BUDGET_OPTIONS.map(option => (
              <SelectCard
                key={option}
                label={option}
                isSelected={budgetRange === option}
                onClick={() => setField('budgetRange', option)}
              />
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
            When do you want to start?
          </h3>
          <div className="flex flex-wrap gap-2">
            {TIMELINE_OPTIONS.map(option => (
              <SelectCard
                key={option}
                label={option}
                isSelected={timeline === option}
                onClick={() => setField('timeline', option)}
              />
            ))}
          </div>
        </section>
        
        {/* Process Link */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => {
              // Open Process app without interrupting contact flow
              const { openApp } = useWindowStore.getState();
              const APP_REGISTRY = require('../../../window-manager/window-registry').APP_REGISTRY;
              const entry = APP_REGISTRY['process'];
              if (entry) openApp('process', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
            }}
            className="text-[13px] font-medium text-[var(--accent-color,#3b82f6)] hover:underline opacity-80 hover:opacity-100 transition-opacity focus:outline-none"
          >
            Wondering what happens next? See our process
          </button>
        </div>
      </div>

      {/* Continue button — fixed in flow, not absolute positioned */}
      <div className="flex-shrink-0 pt-4 border-t border-white/5 mt-4">
        <button
          onClick={nextStep}
          disabled={!isComplete}
          className={`
            w-full py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300
            ${isComplete
              ? 'bg-[var(--accent-color,#3b82f6)] text-white hover:brightness-110 active:scale-[0.99] shadow-[0_4px_20px_rgba(var(--accent-color-rgb,59,130,246),0.25)]'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
            }
          `}
        >
          Continue
        </button>
        {!isComplete && (
          <p className="text-center text-xs text-white/30 mt-2">
            Select a budget and timeline to continue
          </p>
        )}
      </div>
    </div>
  );
}
