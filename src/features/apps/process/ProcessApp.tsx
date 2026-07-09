import { WindowInstance } from '../../window-manager/useWindowStore';
import { StoryWindowLayout } from '../../story/components/StoryWindowLayout';
import { ProcessHero } from './components/ProcessHero';
import { ProcessTimeline } from './components/ProcessTimeline';
import { ProcessPhaseSection } from './components/ProcessPhaseSection';
import { ProcessPrinciples } from './components/ProcessPrinciples';
import { ProcessExpectations } from './components/ProcessExpectations';
import { ProcessFAQ } from './components/ProcessFAQ';
import { ProcessContactRail } from './components/ProcessContactRail';
import { PROCESS_PHASES } from './process-data';

interface ProcessAppProps {
  windowInstance: WindowInstance;
}

export function ProcessApp({ windowInstance }: ProcessAppProps) {
  const sections = [
    { id: 'timeline', label: 'Overview' },
    ...PROCESS_PHASES.map((phase) => ({
      id: `process-${phase.id}`,
      label: phase.name.split(' & ')[0] // e.g. "Discovery", "Design"
    })),
    { id: 'process-principles', label: 'Principles' },
    { id: 'process-faq', label: 'FAQ' }
  ];

  return (
    <StoryWindowLayout 
      instanceId={windowInstance.instanceId} 
      sections={sections}
    >
      <ProcessHero />
      <ProcessTimeline />
      
      {PROCESS_PHASES.map((phase, idx) => (
        <ProcessPhaseSection 
          key={phase.id} 
          phase={phase} 
          isAlternate={idx % 2 !== 0} 
        />
      ))}
      
      <ProcessPrinciples />
      <ProcessExpectations />
      <ProcessFAQ />
      <ProcessContactRail />
    </StoryWindowLayout>
  );
}
