'use client';

import { Command } from 'lucide-react';
import AppIconTile from './AppIconTile';

interface TaskbarStartButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function TaskbarStartButton({ isOpen, onToggle }: TaskbarStartButtonProps) {
  return (
    <div data-start-btn="true">
      <AppIconTile
        label="Start"
        isActive={isOpen}
        icon={
          <div className="grid grid-cols-2 gap-[2px] w-[22px] h-[22px]">
            <div className="bg-[#00A4EF] rounded-sm" />
            <div className="bg-[#00A4EF] rounded-sm" />
            <div className="bg-[#00A4EF] rounded-sm" />
            <div className="bg-[#00A4EF] rounded-sm" />
          </div>
        }
        onClick={onToggle}
      />
    </div>
  );
}
