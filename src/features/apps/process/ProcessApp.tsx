import React, { useState } from 'react';
import {
  NativeAppFrame,
  NativeAppToolbar,
  NativeAppContent,
  useNativeApp
} from '@/features/native-app-shell';
import { ProcessTimelineTrack } from './components/ProcessTimelineTrack';
import { StepDetailPanel } from './components/StepDetailPanel';
import { PROCESS_STEPS } from './data';

const ProcessAppContent: React.FC = () => {
  const { breakpoint } = useNativeApp();
  const isCompact = breakpoint === 'compact';

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <>
      <NativeAppToolbar title="Process" />

      {/* 
        This app uses NO sidebar. It takes the full width available.
        Layout logic:
        - Wide: Timeline track is horizontal at the top, detail panel is below.
        - Compact: Timeline track is vertical on the left, detail panel flows below or alongside.
      */}
      <NativeAppContent maxWidth="xl" className="pb-24 pt-8">
        
        {isCompact ? (
          <div className="flex flex-col px-4 gap-12">
            {/* Vertical orientation for mobile */}
            <div className="h-[480px]">
              <ProcessTimelineTrack 
                activeStepIndex={activeStepIndex}
                onStepSelect={setActiveStepIndex}
                orientation="vertical"
              />
            </div>
            <div className="w-full">
              <StepDetailPanel step={activeStep} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col px-8 gap-16">
            {/* Horizontal orientation for desktop */}
            <div className="w-full max-w-5xl mx-auto mt-12">
              <ProcessTimelineTrack 
                activeStepIndex={activeStepIndex}
                onStepSelect={setActiveStepIndex}
                orientation="horizontal"
              />
            </div>
            <div className="w-full mt-8">
              <StepDetailPanel step={activeStep} />
            </div>
          </div>
        )}

      </NativeAppContent>
    </>
  );
};

export const ProcessApp: React.FC = () => {
  return (
    <NativeAppFrame>
      <ProcessAppContent />
    </NativeAppFrame>
  );
};
