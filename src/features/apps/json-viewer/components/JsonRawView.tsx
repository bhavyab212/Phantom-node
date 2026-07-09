import { useMemo } from 'react';

interface JsonRawViewProps {
  data: any;
}

export function JsonRawView({ data }: JsonRawViewProps) {
  const formattedJson = useMemo(() => JSON.stringify(data, null, 2), [data]);
  
  // Basic syntax highlighting via regex
  const highlightedJson = useMemo(() => {
    const json = formattedJson.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'text-green-400'; // string
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-blue-300'; // key
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-purple-400'; // boolean
      } else if (/null/.test(match)) {
        cls = 'text-gray-500'; // null
      } else {
        cls = 'text-orange-400'; // number
      }
      return `<span class="${cls}">${match}</span>`;
    });
  }, [formattedJson]);

  const lines = formattedJson.split('\n');

  return (
    <div className="flex w-full h-full bg-[#1E1E1E]">
      <div className="w-10 bg-[#1E1E1E] border-r border-[#3E3E42] flex-shrink-0 flex flex-col items-end py-4 text-xs text-white/30 px-2 select-none font-mono">
        {lines.map((_, i) => (
          <div key={i} className="leading-6">{i + 1}</div>
        ))}
      </div>
      <div className="flex-1 overflow-auto p-4 custom-scrollbar">
        <pre 
          className="font-mono text-[13px] leading-6 text-white m-0"
          dangerouslySetInnerHTML={{ __html: highlightedJson }}
        />
      </div>
    </div>
  );
}
