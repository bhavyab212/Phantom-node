import React from 'react';
import { 
  NativeAppFrame, 
  NativeAppToolbar, 
  NativeAppContent,
  useNativeApp
} from '@/features/native-app-shell';
import { StudioSidebar } from './components/StudioSidebar';
import { StudioHero } from './components/StudioHero';
import { PhilosophyCard } from './components/PhilosophyCard';
import { TeamMemberCard } from './components/TeamMemberCard';
import { ToolStackDial } from './components/ToolStackDial';
import { Rocket, Shield, Zap, Workflow } from 'lucide-react';

// Extracted internal content to access context
const StudioAppContent: React.FC = () => {
  const { breakpoint } = useNativeApp();
  const isCompact = breakpoint === 'compact';
  
  return (
    <>
      <NativeAppToolbar title="Studio" />
      <StudioSidebar />
      <NativeAppContent maxWidth={isCompact ? 'none' : 'xl'} className="pb-24">
        
        {/* Overview Section */}
        <section id="overview" className="mb-16">
          <StudioHero />
        </section>

        <div className="flex flex-col gap-16">
          {/* Philosophy Section */}
          <section id="philosophy">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 px-2">Philosophy</h2>
            <div className={`grid gap-6 ${isCompact ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-2'}`}>
              <PhilosophyCard 
                icon={<Zap />}
                title="Automation should calm, not complicate." 
                description="We replace fragile manual workflows with robust, silent automation that frees your team to do what humans do best."
              />
              <PhilosophyCard 
                icon={<Shield />}
                title="Tactile digital experiences." 
                description="Software is a tool. We believe tools should feel solid, respond instantly, and provide satisfying feedback."
              />
              <PhilosophyCard 
                icon={<Workflow />}
                title="Systems over silos." 
                description="Your data should flow freely. We bridge disconnected services to create a single source of truth for operations."
              />
              <PhilosophyCard 
                icon={<Rocket />}
                title="Built for the long term." 
                description="We don't do quick fixes. We engineer scalable infrastructure designed to grow securely alongside your business."
              />
            </div>
          </section>

          {/* Team Section */}
          <section id="team">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-8 px-2">The Team</h2>
            <div className={`grid gap-12 ${isCompact ? 'grid-cols-1 gap-y-12' : 'grid-cols-2 lg:grid-cols-3'}`}>
              <TeamMemberCard name="Alex Mercer" role="Founder & Systems Architect" />
              <TeamMemberCard name="Jordan Vance" role="Lead Automation Engineer" />
              <TeamMemberCard name="Casey Thorne" role="UI/UX Director" />
            </div>
          </section>

          {/* Tools Section */}
          <section id="tools">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-8 px-2">Tools & Stack</h2>
            <div className="flex justify-center my-12">
              <ToolStackDial />
            </div>
          </section>
        </div>
      </NativeAppContent>
    </>
  );
};

export const StudioApp: React.FC = () => {
  return (
    <NativeAppFrame>
      <StudioAppContent />
    </NativeAppFrame>
  );
};
