import { StorySection } from '../../../story/components/StorySection';
import { useGlobalContentIndex } from '../../../story/useGlobalContentIndex';
import { ArrowUpRight, Code, PenTool, TrendingUp } from 'lucide-react';

export function HomeServicesPreview() {
  const { executeAction } = useGlobalContentIndex();

  const services = [
    {
      id: 'idx-srv-web',
      title: 'Web Design & Development',
      description: 'High-performance Next.js applications and conversion-optimized marketing sites.',
      icon: Code,
    },
    {
      id: 'idx-srv-brand',
      title: 'Branding & Identity',
      description: 'Comprehensive visual systems that position you as an industry leader.',
      icon: PenTool,
    },
    {
      id: 'idx-srv-growth',
      title: 'Growth & Marketing',
      description: 'Data-driven campaigns and SEO infrastructure to scale your acquisition.',
      icon: TrendingUp,
    }
  ];

  return (
    <StorySection id="services" eyebrow="Capabilities" title="What we do">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {services.map((service) => (
          <div 
            key={service.id}
            onClick={() => executeAction({ id: service.id, type: 'service', label: service.title, keywords: [], targetApp: 'services', targetSectionId: service.id.replace('idx-', '') })}
            className="group cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-color,#3b82f6)]/10 flex items-center justify-center mb-6">
              <service.icon size={20} className="text-[var(--accent-color,#3b82f6)]" />
            </div>
            <h3 className="text-lg font-semibold text-white/95 mb-2 group-hover:text-[var(--accent-color,#3b82f6)] transition-colors flex items-center justify-between">
              {service.title}
              <ArrowUpRight size={18} className="text-white/30 group-hover:text-[var(--accent-color,#3b82f6)] transition-colors opacity-0 group-hover:opacity-100" />
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </StorySection>
  );
}
