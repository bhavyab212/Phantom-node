import { StoryCTACluster } from '../../../story/components/StoryCTACluster';
import { useWindowStore } from '../../../window-manager/useWindowStore';
import { APP_REGISTRY } from '../../../window-manager/window-registry';

export function ProcessContactRail() {
  const { openApp } = useWindowStore();

  return (
    <section className="py-24 md:py-32 flex flex-col items-center text-center">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white/95 mb-6">
        Ready to start with a clear plan?
      </h2>
      <p className="text-xl text-white/60 mb-12 max-w-2xl leading-relaxed">
        We'll walk you through every step. First call within 24 hours.
      </p>
      <StoryCTACluster 
        primaryLabel="Start a project"
        onPrimaryClick={() => {
          const entry = APP_REGISTRY['contact'];
          if (entry) openApp('contact', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
        }}
        secondaryLabel="See our work"
        onSecondaryClick={() => {
          const entry = APP_REGISTRY['work'];
          if (entry) openApp('work', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
        }}
      />
    </section>
  );
}
