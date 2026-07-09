import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';

interface CaseStudyChallengeProps {
  challenge: CaseStudy['challenge'];
}

export default function CaseStudyChallenge({ challenge }: CaseStudyChallengeProps) {
  return (
    <StorySection 
      id="challenge" 
      eyebrow="The Challenge" 
      title={challenge.title}
    >
      <div className="prose prose-invert prose-lg max-w-3xl">
        <p className="text-white/70 leading-relaxed">
          {challenge.body}
        </p>
      </div>
    </StorySection>
  );
}
