import { StoryCTACluster } from '../../../story/components/StoryCTACluster';
import { useGlobalContentIndex } from '../../../story/useGlobalContentIndex';
import { Mail, Clock } from 'lucide-react';

export function HomeContactRail() {
  const { executeAction } = useGlobalContentIndex();

  return (
    <div className="w-full bg-[#1a1a1a] rounded-3xl p-8 md:p-12 border border-white/10 my-24 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color,#3b82f6)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white/95 mb-4">
            Ready to upgrade your digital presence?
          </h2>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <Mail size={16} /> Contact forms go directly to our founders
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} /> Usually reply within 24 hours
            </span>
          </div>
        </div>
        
        <div className="shrink-0">
          <StoryCTACluster 
            primaryLabel="Start a project"
            onPrimaryClick={() => executeAction({ id: 'idx-act-start', type: 'action', label: 'Start', keywords: [], targetApp: 'contact' })}
          />
        </div>
      </div>
    </div>
  );
}
