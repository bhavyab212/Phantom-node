import { CaseStudy } from '../work-types';
import { StorySection } from '../../../story/components/StorySection';

interface CaseStudyGalleryProps {
  gallery: CaseStudy['gallery'];
}

export default function CaseStudyGallery({ gallery }: CaseStudyGalleryProps) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <StorySection id="gallery" eyebrow="Gallery" title="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gallery.map((image, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              {/* Image would go here, we'll use a placeholder for now */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-32 h-32 rounded-full bg-[var(--accent-color,#3b82f6)] blur-3xl" />
              </div>
            </div>
            {image.caption && (
              <p className="text-sm text-white/50 px-2">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
    </StorySection>
  );
}
