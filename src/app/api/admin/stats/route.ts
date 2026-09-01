import { NextResponse } from 'next/server';
import { getStoredBlogPosts, getStoredUsers, getStoredAccessSettings, getStoredSeoSettings } from '@/lib/server-storage';
import { allTools } from '@/lib/tools';

export async function GET() {
  try {
    const posts = getStoredBlogPosts();
    const users = getStoredUsers();
    const access = getStoredAccessSettings();
    const seo = getStoredSeoSettings();

    const publishedPosts = posts.filter(p => p.status === 'published').length;
    const draftPosts = posts.filter(p => p.status === 'draft').length;
    const categories = Array.from(new Set(posts.map(p => p.category)));

    // Calculate SEO health score based on configuration completeness
    let seoHealthScore = 0;
    if (seo.siteTitle) seoHealthScore += 15;
    if (seo.siteDescription && seo.siteDescription.length >= 50) seoHealthScore += 20;
    if (seo.keywords.length >= 5) seoHealthScore += 15;
    if (seo.ogImageUrl) seoHealthScore += 10;
    if (seo.searchConsoleId) seoHealthScore += 15;
    if (seo.canonicalUrl) seoHealthScore += 15;
    if (seo.enableRobotsIndex) seoHealthScore += 10;

    return NextResponse.json({
      success: true,
      stats: {
        totalPosts: posts.length,
        publishedPosts,
        draftPosts,
        categoriesCount: categories.length,
        totalTools: allTools.length,
        totalUsers: users.length,
        guestTrialMinutes: access.guestTrialMinutes,
        seoHealthScore,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
