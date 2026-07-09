'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Service } from './services-data';
import ServicesGrid from './components/ServicesGrid';
import ServiceDetailView from './components/ServiceDetailView';
import { StoryWindowLayout } from '../../story/components/StoryWindowLayout';
import { WindowInstance } from '../../window-manager/useWindowStore';

interface ServicesAppProps {
  window?: WindowInstance;
}

export default function ServicesApp({ window }: ServicesAppProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleSelect = (service: Service) => setSelectedService(service);
  const handleBack = () => setSelectedService(null);

  return (
    <StoryWindowLayout instanceId={window?.instanceId}>
      <AnimatePresence mode="wait">
        {selectedService ? (
          <ServiceDetailView
            key={selectedService.id}
            service={selectedService}
            onBack={handleBack}
          />
        ) : (
          <motion.div
            key="grid"
            initial={{ x: -32, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } }}
            exit={{ x: -32, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
            className="flex flex-col h-full w-full py-8"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-white/60 mb-12 max-w-2xl text-lg">We deliver premium digital solutions focused on business growth and operational efficiency.</p>
            <ServicesGrid onSelect={handleSelect} />
          </motion.div>
        )}
      </AnimatePresence>
    </StoryWindowLayout>
  );
}
