import { type MetadataRoute } from 'next';
import { getStoredSeoSettings } from '@/lib/server-storage';

export default function robots(): MetadataRoute.Robots {
  const seo = getStoredSeoSettings();
  const siteUrl = seo.canonicalUrl ? seo.canonicalUrl.replace(/\/$/, '') : 'https://aitoolkitpro.netlify.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/api/admin', '/api/admin/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
