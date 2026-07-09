import { useGlobalContentIndex } from '../../../story/useGlobalContentIndex';
import { StoryHero } from '../../../story/components/StoryHero';

export function HomeOverviewSection() {
  const { executeAction } = useGlobalContentIndex();

  return (
    <StoryHero 
      headline={
        <>
          We build digital platforms that <span className="text-[var(--accent-color,#3b82f6)]">accelerate growth.</span>
        </>
      }
      subheadline="Phantom Node is a specialized digital agency engineering premium web applications, brand identities, and automation systems for forward-thinking companies."
      primaryCtaLabel="Start a project"
      onPrimaryCtaClick={() => executeAction({ id: 'idx-act-start', type: 'action', label: 'Start', keywords: [], targetApp: 'contact' })}
      secondaryCtaLabel="See selected work"
      onSecondaryCtaClick={() => executeAction({ id: 'idx-app-files', type: 'app', label: 'Files', keywords: [], targetApp: 'files' })}
    />
  );
}
