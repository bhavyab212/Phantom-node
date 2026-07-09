'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContactFormStore } from './useContactFormStore';
import ContactProgressBar from './components/ContactProgressBar';
import ContactStepIntent from './components/ContactStepIntent';
import ContactStepDetails from './components/ContactStepDetails';
import ContactStepInfo from './components/ContactStepInfo';
import ContactSuccessState from './components/ContactSuccessState';
import { useWindowStore, WindowInstance } from '../../window-manager/useWindowStore';
import { StoryWindowLayout } from '../../story/components/StoryWindowLayout';

interface ContactAppProps {
  window?: WindowInstance;
}

export default function ContactApp({ window: windowInstance }: ContactAppProps) {
  const { currentStep, isSubmitted, setField, resetForm } = useContactFormStore();
  const { closeWindow } = useWindowStore();

  // Track step direction for slide animation
  const prevStepRef = useRef(currentStep);
  const direction = currentStep >= prevStepRef.current ? 1 : -1;
  useEffect(() => {
    prevStepRef.current = currentStep;
  }, [currentStep]);

  // Read intent from fileContext — this is how Services app hands off pre-fill
  const fileContextIntent = windowInstance?.fileContext?.initialIntent as string | undefined;
  const prevIntentRef = useRef<string | undefined>(undefined);

  // On mount: reset form, then apply intent if provided
  useEffect(() => {
    resetForm();
    if (fileContextIntent) {
      setField('intent', fileContextIntent);
      prevIntentRef.current = fileContextIntent;
    }
    return () => resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to fileContext changes (Services CTA clicked while Contact is already open on step 1)
  useEffect(() => {
    if (fileContextIntent && fileContextIntent !== prevIntentRef.current) {
      prevIntentRef.current = fileContextIntent;
      // Only update the selection if the user hasn't progressed past step 1
      if (currentStep === 1) {
        setField('intent', fileContextIntent);
      }
      // If past step 1 — the window store already focused the window; we don't overwrite
    }
  }, [fileContextIntent, currentStep, setField]);

  const handleClose = () => {
    if (windowInstance) {
      closeWindow(windowInstance.instanceId);
    }
  };

  const variants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 48 : -48,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.28, ease: 'easeOut' as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -48 : 48,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' as const },
    }),
  };

  return (
    <StoryWindowLayout instanceId={windowInstance?.instanceId}>
      <div className="flex flex-col w-full h-full min-h-[500px] select-none relative pb-12">
        {isSubmitted ? (
          <ContactSuccessState onClose={handleClose} />
        ) : (
          <>
            <ContactProgressBar />

            <div className="flex-1 relative mt-8 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <ContactStepIntent />
                  </motion.div>
                )}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <ContactStepDetails />
                  </motion.div>
                )}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <ContactStepInfo />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </StoryWindowLayout>
  );
}
