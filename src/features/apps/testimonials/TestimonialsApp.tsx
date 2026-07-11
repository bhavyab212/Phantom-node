import React from 'react';
import {
  NativeAppFrame,
  NativeAppToolbar,
  NativeAppContent,
  useNativeApp
} from '@/features/native-app-shell';
import { TestimonialNoteCard } from './components/TestimonialNoteCard';
import { RatingDial } from './components/RatingDial';
import { MetricStackPanel } from './components/MetricStackPanel';
import { TESTIMONIALS } from './data';

const TestimonialsAppContent: React.FC = () => {
  const { breakpoint } = useNativeApp();
  const isCompact = breakpoint === 'compact';

  return (
    <>
      {/* No sidebar, just toolbar */}
      <NativeAppToolbar title="Testimonials" />

      <NativeAppContent maxWidth="none" className="p-4 md:p-8 lg:p-12 pb-24">
        
        {isCompact ? (
          /* COMPACT LAYOUT */
          <div className="flex flex-col gap-10">
            {/* Aggregate Stats stacked at the top */}
            <div className="flex flex-col gap-6">
              <RatingDial rating={4.9} maxRating={5} />
              <MetricStackPanel />
            </div>

            {/* Single column list of testimonials (no rotation) */}
            <div className="flex flex-col gap-6">
              {TESTIMONIALS.map(testimonial => (
                <TestimonialNoteCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        ) : (
          /* WIDE LAYOUT */
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
            
            <div className="flex-1 columns-1 md:columns-2 xl:columns-3 gap-8 space-y-8">
              {TESTIMONIALS.map(testimonial => (
                <div key={testimonial.id} className="break-inside-avoid">
                  <TestimonialNoteCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Right: Docked Panel */}
            <div className="w-full lg:w-80 shrink-0 sticky top-12 flex flex-col gap-8">
              <RatingDial rating={4.9} maxRating={5} />
              <MetricStackPanel />
            </div>

          </div>
        )}
      </NativeAppContent>
    </>
  );
};

export const TestimonialsApp: React.FC = () => {
  return (
    <NativeAppFrame>
      <TestimonialsAppContent />
    </NativeAppFrame>
  );
};
