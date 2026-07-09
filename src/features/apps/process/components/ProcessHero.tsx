import { StoryHero } from '../../../story/components/StoryHero';
import { useWindowStore } from '../../../window-manager/useWindowStore';

import { APP_REGISTRY } from '../../../window-manager/window-registry';

export function ProcessHero() {
  const { openApp } = useWindowStore();

  const handleStartProject = () => {
    const entry = APP_REGISTRY['contact'];
    if (entry) openApp('contact', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
  };

  const handleSeeWork = () => {
    const entry = APP_REGISTRY['work'];
    if (entry) openApp('work', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
  };

  return (
    <StoryHero
      eyebrow="HOW WE WORK"
      headline="A clear path from kickoff to launch — no black boxes."
      subheadline="Transparency, specific deliverables, and predictable timelines. Every project follows a proven methodology designed to minimize risk and maximize impact."
      primaryCtaLabel="Start a project"
      onPrimaryCtaClick={handleStartProject}
      secondaryCtaLabel="See our work"
      onSecondaryCtaClick={handleSeeWork}
      ambient={
        <div className="absolute top-0 right-[-10%] w-[60%] h-[100%] bg-[var(--accent-color,#3b82f6)]/5 blur-[120px] rounded-full pointer-events-none" />
      }
    />
  );
}
