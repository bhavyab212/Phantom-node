import { StoryWindowLayout } from '../../story/components/StoryWindowLayout';
import { StoryCommandHint } from '../../story/components/StoryCommandHint';
import { HomeOverviewSection } from './components/HomeOverviewSection';
import { HomeServicesPreview } from './components/HomeServicesPreview';
import { HomeWorkPreview } from './components/HomeWorkPreview';
import { HomeProcessPreview } from './components/HomeProcessPreview';
import { HomeContactRail } from './components/HomeContactRail';
import { WindowInstance } from '../../window-manager/useWindowStore';

const HOME_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' }
];

interface HomeAppProps {
  window: WindowInstance;
}

export default function HomeApp({ window }: HomeAppProps) {
  return (
    <StoryWindowLayout 
      sections={HOME_SECTIONS} 
      instanceId={window.instanceId}
      ambientBackground={
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--accent-color,#3b82f6)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      }
    >
      <div id="overview">
        <HomeOverviewSection />
        <StoryCommandHint />
      </div>
      
      <HomeServicesPreview />
      <HomeWorkPreview />
      <HomeProcessPreview />
      
      <HomeContactRail />
    </StoryWindowLayout>
  );
}
