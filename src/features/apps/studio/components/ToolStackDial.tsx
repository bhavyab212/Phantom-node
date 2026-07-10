import React, { useState } from 'react';
import { NeumorphicControl, GlassPanel } from '@/features/native-app-shell';
import { useNativeApp } from '@/features/native-app-shell';
import { cn } from '@/lib/utils';
import { Database, Zap, Sparkles, Server, CreditCard, LayoutTemplate } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const TOOLS: Tool[] = [
  { id: 'n8n', name: 'n8n', description: 'Advanced workflow automation & orchestration.', icon: <Zap className="w-5 h-5" /> },
  { id: 'ai', name: 'OpenAI / Anthropic', description: 'Intelligent routing, drafting, and analysis.', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'db', name: 'Supabase', description: 'Postgres database and real-time backend.', icon: <Database className="w-5 h-5" /> },
  { id: 'api', name: 'Custom APIs', description: 'Connecting specialized external services seamlessly.', icon: <Server className="w-5 h-5" /> },
  { id: 'stripe', name: 'Stripe', description: 'Frictionless billing and subscription management.', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'frontend', name: 'React / Next.js', description: 'Performant, scalable, native-feeling interfaces.', icon: <LayoutTemplate className="w-5 h-5" /> },
];

export const ToolStackDial: React.FC<{ className?: string }> = ({ className }) => {
  const { breakpoint } = useNativeApp();
  const isCompact = breakpoint === 'compact';
  const [activeToolId, setActiveToolId] = useState<string>(TOOLS[0].id);

  const activeTool = TOOLS.find(t => t.id === activeToolId) || TOOLS[0];
  const activeIndex = TOOLS.findIndex(t => t.id === activeToolId);

  if (isCompact) {
    return (
      <div className={cn("w-full overflow-hidden flex flex-col gap-4", className)}>
        <div className="flex overflow-x-auto gap-4 pb-4 px-2 no-scrollbar snap-x">
          {TOOLS.map((tool) => (
            <div key={tool.id} className="snap-center shrink-0 w-64" onClick={() => setActiveToolId(tool.id)}>
              <NeumorphicControl
                raised={activeToolId !== tool.id}
                pressed={activeToolId === tool.id}
                rounded="lg"
                className="p-4 flex items-center gap-3 cursor-pointer h-full"
              >
                <div className="text-[var(--color-accent)]">{tool.icon}</div>
                <span className="font-semibold text-[var(--color-text)]">{tool.name}</span>
              </NeumorphicControl>
            </div>
          ))}
        </div>
        <GlassPanel elevation="low" className="p-4 mx-2">
          <h4 className="font-bold text-[var(--color-text)] mb-2 flex items-center gap-2">
            {activeTool.icon} {activeTool.name}
          </h4>
          <p className="text-sm text-[var(--color-text)]/70">{activeTool.description}</p>
        </GlassPanel>
      </div>
    );
  }

  // Wide layout: Circular Dial
  const radius = 120; // px
  const center = 160; // offset

  return (
    <div className={cn("relative w-[320px] h-[320px] flex items-center justify-center mx-auto", className)}>
      {/* Base ring */}
      <NeumorphicControl
        raised={false}
        pressed={true}
        rounded="full"
        className="absolute inset-4 rounded-full"
      />
      
      {/* Central Dial */}
      <NeumorphicControl
        raised={true}
        rounded="full"
        className="w-32 h-32 z-10 flex items-center justify-center relative shadow-[var(--neu-shadow-light-raised),inset_0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[var(--neu-shadow-dark-raised),inset_0_0_20px_rgba(255,255,255,0.02)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: `rotate(${-(activeIndex * (360 / TOOLS.length))}deg)` }}
      >
        <div className="w-16 h-16 rounded-full bg-[var(--color-surface-2)] shadow-[var(--neu-shadow-light-pressed)] dark:shadow-[var(--neu-shadow-dark-pressed)]" />
      </NeumorphicControl>

      {/* Dial Nodes */}
      {TOOLS.map((tool, index) => {
        const angle = (index * (360 / TOOLS.length)) - 90; // Start at top
        const rad = angle * (Math.PI / 180);
        const x = center + radius * Math.cos(rad) - 24; // 24 = half width of node (48px)
        const y = center + radius * Math.sin(rad) - 24;

        const isActive = activeToolId === tool.id;

        return (
          <div
            key={tool.id}
            className="absolute z-20"
            style={{ left: x, top: y }}
          >
            <NeumorphicControl
              raised={!isActive}
              pressed={isActive}
              rounded="full"
              className={cn(
                "w-12 h-12 flex items-center justify-center cursor-pointer transition-all duration-300 outline-none",
                isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text)]/50 hover:text-[var(--color-text)]"
              )}
              onClick={() => setActiveToolId(tool.id)}
            >
              {tool.icon}
            </NeumorphicControl>
          </div>
        );
      })}

      {/* Info Popover overlaying the dial edge */}
      <GlassPanel 
        elevation="high" 
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-64 p-5 z-30 pointer-events-none transition-opacity duration-300 opacity-100"
      >
        <h4 className="font-bold text-[var(--color-text)] mb-2 flex items-center gap-2">
          {activeTool.icon} {activeTool.name}
        </h4>
        <p className="text-sm text-[var(--color-text)]/80 leading-relaxed">{activeTool.description}</p>
      </GlassPanel>
    </div>
  );
};
