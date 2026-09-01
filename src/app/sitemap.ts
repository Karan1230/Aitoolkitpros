import { type MetadataRoute } from 'next';
import { allTools } from '@/lib/tools';
import { getStoredBlogPosts, getStoredSeoSettings } from '@/lib/server-storage';

export default function sitemap(): MetadataRoute.Sitemap {
  const seo = getStoredSeoSettings();
  const siteUrl = seo.canonicalUrl ? seo.canonicalUrl.replace(/\/$/, '') : 'https://aitoolkitpro.netlify.app';

  // Dynamic Blog Posts
  const blogPosts = getStoredBlogPosts().filter(p => p.status === 'published');
  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.datePublished),
    changeFrequency: 'weekly' as const,
    priority: post.featured ? 0.95 : 0.85,
  }));

  // Dynamic Tools
  const toolRoutes = allTools.map((tool) => ({
    url: `${siteUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Static core routes
  const staticRoutes = [
    '',
    '/tools',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/copyright-disclaimer',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/blog' ? ('daily' as const) : ('monthly' as const),
    priority: route === '' ? 1.0 : route === '/blog' || route === '/tools' ? 0.9 : 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...toolRoutes];
}
