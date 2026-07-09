import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';
import CaseStudyMetrics from './CaseStudyMetrics';

interface CaseStudyResultsProps {
  results: CaseStudy['results'];
  metrics: CaseStudy['metrics'];
}

export default function CaseStudyResults({ results, metrics }: CaseStudyResultsProps) {
  return (
    <StorySection 
      id="results" 
      eyebrow="Results" 
      title={results.title}
    >
      <div className="prose prose-invert prose-lg max-w-3xl mb-16">
        <p className="text-white/70 leading-relaxed">
          {results.body}
        </p>
      </div>
      
      <CaseStudyMetrics metrics={metrics} />
    </StorySection>
  );
}
