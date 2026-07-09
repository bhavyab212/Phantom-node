import { MetadataRoute } from 'next';
import { appsRegistry } from '@/config/apps-registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const appRoutes = appsRegistry.map((app) => ({
    url: `${baseUrl}${app.route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...appRoutes,
  ];
}
