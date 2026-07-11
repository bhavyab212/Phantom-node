import React from 'react';
import { InquiryFormPanel } from './components/InquiryFormPanel';

export const ContactApp: React.FC = () => {
  return (
    <div className="flex flex-col h-full w-full bg-[#FAFAFA] overflow-y-auto">
      <div className="p-12 max-w-6xl mx-auto w-full pt-8 flex-1 flex flex-col items-center justify-center">
        <InquiryFormPanel />
      </div>
    </div>
  );
};
