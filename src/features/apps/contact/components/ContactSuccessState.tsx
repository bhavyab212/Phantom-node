import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useContactFormStore } from '../useContactFormStore';

interface ContactSuccessStateProps {
  onClose: () => void;
}

export default function ContactSuccessState({ onClose }: ContactSuccessStateProps) {
  const { name, intent, customIntentText, budgetRange, resetForm } = useContactFormStore();

  const firstName = name.split(' ')[0] || 'there';
  const displayIntent = intent === 'Other' ? customIntentText : intent;

  const handleAnotherRequest = () => {
    resetForm();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--accent-color,#3b82f6)] blur-xl opacity-30 rounded-full" />
          <CheckCircle2 size={72} className="text-[var(--accent-color,#3b82f6)] relative z-10" />
        </div>
      </motion.div>

      <motion.h2 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-2xl font-semibold text-white/90 mb-3"
      >
        Thanks, {firstName} — we'll be in touch within 24 hours.
      </motion.h2>

      <motion.p 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-white/60 mb-8 max-w-sm"
      >
        We've received your request regarding <strong className="text-white/80 font-medium">{displayIntent}</strong> with a budget of <strong className="text-white/80 font-medium">{budgetRange}</strong>.
      </motion.p>

      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex flex-col gap-3 w-full max-w-xs"
      >
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg font-medium text-white bg-[var(--accent-color,#3b82f6)] hover:brightness-110 transition-colors shadow-lg"
        >
          Close window
        </button>
        <button
          onClick={handleAnotherRequest}
          className="w-full py-2.5 rounded-lg font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
        >
          Submit another request
        </button>
      </motion.div>
    </div>
  );
}
