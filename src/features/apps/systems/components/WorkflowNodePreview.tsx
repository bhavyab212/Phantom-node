import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { NeumorphicControl, GlassPanel } from '@/features/native-app-shell';
import type { WorkflowNode } from '../data';

export interface WorkflowNodePreviewProps {
  nodes: WorkflowNode[];
  className?: string;
  interactive?: boolean;
}

export const WorkflowNodePreview: React.FC<WorkflowNodePreviewProps> = ({ 
  nodes, 
  className, 
  interactive = true 
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  return (
    <div className={cn("relative flex items-center justify-between w-full h-32 px-4 select-none", className)}>
      {/* Animated Connector Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {/* Render a single line connecting the centers of the nodes if they were evenly spaced */}
        {/* We use a simple horizontal line across the container that gets masked by the nodes in CSS, 
            or we can just draw lines between nodes. The simplest is a single line with dash animation. */}
        <line
          x1="10%" y1="50%" x2="90%" y2="50%"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="animate-[dash_2s_linear_infinite] opacity-50"
        />
        {/* Define the dash animation in a style tag for this specific component */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes dash {
            to {
              stroke-dashoffset: -12;
            }
          }
        `}} />
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const isHovered = hoveredNodeId === node.id;
        
        return (
          <div 
            key={node.id} 
            className="relative z-10 flex flex-col items-center"
            onMouseEnter={() => interactive && setHoveredNodeId(node.id)}
            onMouseLeave={() => interactive && setHoveredNodeId(null)}
          >
            <NeumorphicControl
              raised={!isHovered || !interactive}
              pressed={isHovered && interactive}
              rounded="full"
              className={cn(
                "w-12 h-12 flex items-center justify-center p-0 transition-all duration-100 cursor-pointer",
                isHovered && interactive ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"
              )}
            >
              {node.icon}
            </NeumorphicControl>
            
            <span className="mt-2 text-xs font-semibold text-[var(--color-text)]/70 uppercase tracking-wider">
              {node.label}
            </span>

            {/* Tooltip Popover */}
            {interactive && (
              <GlassPanel
                elevation="high"
                className={cn(
                  "absolute top-full mt-2 w-48 p-3 text-center transition-all duration-200 pointer-events-none origin-top",
                  isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"
                )}
                style={{ zIndex: 50 }}
              >
                <p className="text-sm text-[var(--color-text)] leading-tight">{node.description}</p>
              </GlassPanel>
            )}
          </div>
        );
      })}
    </div>
  );
};
