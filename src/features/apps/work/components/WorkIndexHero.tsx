import { StoryHero } from '../../../story/components/StoryHero';

export default function WorkIndexHero() {
  return (
    <StoryHero 
      eyebrow="Selected Work"
      headline={
        <>
          Outcomes we're proud to put our <span className="text-[var(--accent-color,#3b82f6)]">name on.</span>
        </>
      }
      subheadline="We engineer digital platforms and automation systems that drive measurable business impact. Here is a selection of our recent partnerships."
      ambient={
        <div className="absolute top-0 right-[-10%] w-[60%] h-[100%] bg-[var(--accent-color,#3b82f6)] opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />
      }
    />
  );
}
