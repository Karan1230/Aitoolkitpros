
import { type MetadataRoute } from 'next';
import { allTools } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.aitoolkitpro.com';

  const toolRoutes = allTools.map((tool) => ({
    url: `${siteUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    '/',
    '/about',
    '/contact',
    '/tools',
    '/privacy-policy',
    '/terms-and-conditions',
    '/copyright-disclaimer',
    '/login',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: route === '/' ? 1.0 : 0.5,
  }));

  return [...staticRoutes, ...toolRoutes];
}
