import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';
import { Quote } from 'lucide-react';

interface CaseStudyQuoteProps {
  testimonial: CaseStudy['testimonial'];
}

export default function CaseStudyQuote({ testimonial }: CaseStudyQuoteProps) {
  if (!testimonial) return null;

  return (
    <StorySection id="quote" eyebrow="Client" title="">
      <div className="py-16 md:py-24 relative overflow-hidden flex flex-col items-center text-center">
        <Quote size={48} className="text-[var(--accent-color,#3b82f6)] mb-12 opacity-50" />
        <p className="text-2xl md:text-4xl font-medium text-white/95 leading-relaxed mb-12 max-w-4xl">
          "{testimonial.quote}"
        </p>
        <div className="flex flex-col items-center">
          <div className="text-white/90 font-semibold text-lg">{testimonial.author}</div>
          <div className="text-white/50 text-sm">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>
    </StorySection>
  );
}
