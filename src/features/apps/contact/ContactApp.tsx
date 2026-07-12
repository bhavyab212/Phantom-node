import React, { useEffect } from 'react';
import { InquiryFormPanel } from './components/InquiryFormPanel';
import { QualificationFlow } from './components/QualificationFlow';
import { useContactFormStore, SourceType } from './useContactFormStore';
import { WindowInstance } from '../../window-manager/useWindowStore';

interface ContactAppProps {
  window?: WindowInstance;
}

export const ContactApp: React.FC<ContactAppProps> = ({ window: windowInstance }) => {
  const { setSource, isFinalForm } = useContactFormStore();

  useEffect(() => {
    if (windowInstance?.targetContext) {
      const { sourceType, sourceId, sourceTitle } = windowInstance.targetContext;
      if (sourceType) {
        setSource(sourceType as SourceType, sourceId, sourceTitle);
      }
    } else {
      setSource('direct');
    }
  }, [windowInstance?.targetContext, setSource]);

  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA] overflow-y-auto">
      <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full pt-8 flex-1 flex flex-col items-center justify-center">
        {isFinalForm ? (
          <InquiryFormPanel />
        ) : (
          <QualificationFlow />
        )}
      </div>
    </div>
  );
};
