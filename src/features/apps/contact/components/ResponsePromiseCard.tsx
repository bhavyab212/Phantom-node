import React from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl } from '@/features/native-app-shell';
import { Clock } from 'lucide-react';

export interface ResponsePromiseCardProps {
  className?: string;
}

export const ResponsePromiseCard: React.FC<ResponsePromiseCardProps> = ({ className }) => {
  return (
    <div
      className={cn("p-4 flex items-center gap-4 bg-white rounded-lg shadow-sm border border-gray-100", className)}
    >
      <div className="w-10 h-10 rounded-full bg-gray-50 shadow-inner flex items-center justify-center shrink-0 border border-gray-100">
        <Clock className="w-5 h-5 text-yellow-500" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">
          Guaranteed Response
        </h4>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Within 1 Business Day
        </p>
      </div>
    </div>
  );
};
