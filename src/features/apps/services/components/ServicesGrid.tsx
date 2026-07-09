import { SERVICES, Service } from '../services-data';
import ServiceCard from './ServiceCard';

interface ServicesGridProps {
  onSelect: (service: Service) => void;
}

export default function ServicesGrid({ onSelect }: ServicesGridProps) {
  const featured = SERVICES.find(s => s.featured);
  const rest = SERVICES.filter(s => !s.featured);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 mb-5 px-1">
        <h2 className="text-xl font-semibold text-white/90">What we do</h2>
        <p className="text-sm text-white/45 mt-1">Select a service to see what's included and get a quote.</p>
      </div>

      {/* Scrollable grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 pr-1 space-y-3">
        {/* Featured card — full width */}
        {featured && (
          <ServiceCard
            service={featured}
            onClick={() => onSelect(featured)}
            index={0}
          />
        )}

        {/* Remaining services — 2-col on wider, 1-col when narrow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rest.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => onSelect(service)}
              index={i + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
