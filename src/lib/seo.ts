import { Metadata } from 'next';

export function getSEOTags(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}
