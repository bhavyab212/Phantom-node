import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonTreeProps {
  data: any;
  name?: string;
  isRoot?: boolean;
}

export function JsonTree({ data, name = 'root', isRoot = true }: JsonTreeProps) {
  const [isExpanded, setIsExpanded] = useState(isRoot);

  const isObject = data !== null && typeof data === 'object';
  const isArray = Array.isArray(data);

  if (!isObject) {
    // Primitive types
    const renderValue = () => {
      if (typeof data === 'string') return <span className="text-green-400">"{data}"</span>;
      if (typeof data === 'number') return <span className="text-orange-400">{data}</span>;
      if (typeof data === 'boolean') return <span className="text-purple-400">{data ? 'true' : 'false'}</span>;
      if (data === null) return <span className="text-gray-500">null</span>;
      return <span className="text-white">{String(data)}</span>;
    };

    return (
      <div className="flex font-mono text-[13px] leading-6 hover:bg-white/5 px-1 rounded-sm w-fit transition-colors">
        {name && <span className="text-blue-300 mr-1">{name}:</span>}
        {renderValue()}
      </div>
    );
  }

  // Object or Array
  const keys = Object.keys(data);
  const isEmpty = keys.length === 0;

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="font-mono text-[13px] leading-6">
      <div 
        className="flex items-center cursor-pointer hover:bg-white/5 px-1 rounded-sm w-fit transition-colors select-none"
        onClick={toggleExpand}
      >
        <span className="w-4 h-4 flex items-center justify-center mr-1 text-white/40">
          {!isEmpty && (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
        </span>
        {name && <span className="text-blue-300 mr-1">{name}:</span>}
        <span className="text-white/60">
          {isArray ? '[' : '{'}
          {!isExpanded && !isEmpty && <span className="mx-1 text-white/40">...</span>}
          {(!isExpanded || isEmpty) && (isArray ? ']' : '}')}
        </span>
      </div>
      
      {isExpanded && !isEmpty && (
        <div className="pl-4 ml-2 border-l border-white/10 flex flex-col">
          {keys.map((key, index) => (
            <div key={key}>
              <JsonTree data={data[key as keyof typeof data]} name={isArray ? undefined : key} isRoot={false} />
            </div>
          ))}
          <div className="text-white/60 -ml-4 pl-1 hover:bg-white/5 rounded-sm w-fit transition-colors">
            {isArray ? ']' : '}'}
          </div>
        </div>
      )}
    </div>
  );
}
