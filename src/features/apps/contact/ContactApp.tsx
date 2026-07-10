import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContactFormStore } from './useContactFormStore';
import ContactProgressBar from './components/ContactProgressBar';
import ContactStepIntent from './components/ContactStepIntent';
import ContactStepDetails from './components/ContactStepDetails';
import ContactStepInfo from './components/ContactStepInfo';
import ContactSuccessState from './components/ContactSuccessState';
import { useWindowStore, WindowInstance } from '../../window-manager/useWindowStore';
import { NativeAppShell, SidebarGroup, SidebarItem } from '../../ui/NativeAppShell';
import { Send, CheckCircle2, Circle } from 'lucide-react';

interface ContactAppProps {
  window: WindowInstance;
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

  // Read intent from fileContext
  const fileContextIntent = windowInstance?.fileContext?.initialIntent as string | undefined;
  const prevIntentRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    resetForm();
    if (fileContextIntent) {
      setField('intent', fileContextIntent);
      prevIntentRef.current = fileContextIntent;
    }
    return () => resetForm();
  }, []);

  useEffect(() => {
    if (fileContextIntent && fileContextIntent !== prevIntentRef.current) {
      prevIntentRef.current = fileContextIntent;
      if (currentStep === 1) {
        setField('intent', fileContextIntent);
      }
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

  const sidebar = (
    <div className="py-2">
      <SidebarGroup title="Project Inquiry">
        <SidebarItem 
          icon={currentStep > 1 ? CheckCircle2 : Circle} 
          label="1. Intent" 
          isActive={currentStep === 1} 
        />
        <SidebarItem 
          icon={currentStep > 2 ? CheckCircle2 : Circle} 
          label="2. Details" 
          isActive={currentStep === 2} 
        />
        <SidebarItem 
          icon={isSubmitted ? CheckCircle2 : Circle} 
          label="3. Contact Info" 
          isActive={currentStep === 3} 
        />
      </SidebarGroup>
    </div>
  );

  const toolbar = (
    <div className="flex items-center gap-2 text-sm font-medium">
      <span className="text-white/40">Contact</span>
      <span className="text-white/40">/</span>
      <span className="text-white/90">
        Step {currentStep} of 3
      </span>
    </div>
  );

  const content = (
    <div className="flex flex-col w-full h-full min-h-[500px] select-none relative p-8">
      {isSubmitted ? (
        <ContactSuccessState onClose={handleClose} />
      ) : (
        <div className="max-w-2xl mx-auto w-full h-full flex flex-col">
          <ContactProgressBar />

          <div className="flex-1 relative mt-8 overflow-hidden h-full">
            <AnimatePresence mode="wait" custom={direction}>
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 overflow-y-auto custom-scrollbar"
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
                  className="absolute inset-0 overflow-y-auto custom-scrollbar"
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
                  className="absolute inset-0 overflow-y-auto custom-scrollbar"
                >
                  <ContactStepInfo />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <NativeAppShell 
      appId={windowInstance.instanceId}
      sidebar={sidebar}
      toolbar={toolbar}
      content={content}
    />
  );
}
