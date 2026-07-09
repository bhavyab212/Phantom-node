import { motion } from 'framer-motion';
import { useContactFormStore } from '../useContactFormStore';

export default function ContactProgressBar() {
  const { currentStep } = useContactFormStore();
  const totalSteps = 3;

  return (
    <div className="w-full mb-6 mt-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/70">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs text-white/40">
          {currentStep === 1 && 'Intent'}
          {currentStep === 2 && 'Details'}
          {currentStep === 3 && 'Contact Info'}
        </span>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: 'var(--accent-color, #3b82f6)' }}
          initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
