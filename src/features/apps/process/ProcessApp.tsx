import React, { useState } from 'react';
import { ProcessTimelineTrack } from './components/ProcessTimelineTrack';
import { StepDetailPanel } from './components/StepDetailPanel';
import { PROCESS_STEPS } from './data';

export const ProcessApp: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA] overflow-y-auto">
      <div className="p-12 max-w-6xl mx-auto w-full pt-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">Our Process</h1>
        <p className="text-gray-500 text-[15px] font-medium mb-16">A proven methodology for engineering digital systems.</p>

        <div className="flex flex-col gap-16">
          {/* Horizontal orientation for desktop */}
          <div className="w-full max-w-5xl mx-auto">
            <ProcessTimelineTrack 
              activeStepIndex={activeStepIndex}
              onStepSelect={setActiveStepIndex}
              orientation="horizontal"
            />
          </div>
          <div className="w-full mt-4">
            <StepDetailPanel step={activeStep} />
            
            <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
              <button 
                onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                disabled={activeStepIndex === 0}
                className="px-6 py-2.5 rounded-full font-bold text-sm bg-white border border-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => setActiveStepIndex(Math.min(PROCESS_STEPS.length - 1, activeStepIndex + 1))}
                disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                className="px-6 py-2.5 rounded-full font-bold text-sm bg-yellow-400 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors"
              >
                Next Step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
