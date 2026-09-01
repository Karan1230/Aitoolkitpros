'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Save,
  ArrowLeft,
  Eye,
  Sparkles,
  Search,
  Globe,
  Tag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  Heading2,
  Heading3,
  Quote,
  Code,
  Smartphone,
  Monitor,
  Wand2,
  Layers,
  FileText,
  Table as TableIcon,
  ImageIcon,
  Loader2,
  RefreshCw,
  Zap,
  Flame,
  Upload,
  FileImage,
  Gauge,
  ImagePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/storage-types';
import { allTools } from '@/lib/tools';
import { CuratedImage, generateAiImageUrl } from '@/lib/blog-image-curator';
import { compressImageFile, formatBytes, getOptimizedImageUrl } from '@/lib/client-image-compressor';

interface PostEditorProps {
  initialPost?: BlogPost;
  isEditMode?: boolean;
}

const PRESET_TOPICS = [
  { topic: 'Top 10 Free AI Tools for Students & Creators in 2025', category: 'AI Tutorials', kw: 'free ai tools 2025' },
  { topic: 'How to Write High-Ranking SEO Blog Posts with AI in 15 Minutes', category: 'Marketing & Advertising', kw: 'ai seo blog writer' },
  { topic: 'The Complete Guide to AI Image Generation and Prompt Engineering', category: 'Design & Branding', kw: 'ai prompt guide' },
  { topic: 'How Freelancers Use AI to Double Their Income and Save 20 Hours a Week', category: 'AI Trends & Productivity', kw: 'ai productivity for freelancers' }
];

export function PostEditor({ initialPost, isEditMode = false }: PostEditorProps) {
  const router = useRouter();

  // Core Post Fields
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [description, setDescription] = useState(initialPost?.description || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [category, setCategory] = useState(initialPost?.category || 'AI Tutorials');
  const [tags, setTags] = useState<string>(initialPost?.tags?.join(', ') || 'AI Tools, Productivity, SEO Guide');
  const [author, setAuthor] = useState(initialPost?.author || 'AI Editorial Team');
  const [authorRole, setAuthorRole] = useState(initialPost?.authorRole || 'Senior AI Editor');
  const [authorAvatar, setAuthorAvatar] = useState(
    initialPost?.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );
  
  // AI-Generated Thumbnail / Cover Image
  const [featuredImage, setFeaturedImage] = useState(
    initialPost?.featuredImage ||
      generateAiImageUrl(
        'Eye-catching viral 3D concept thumbnail art, bold focal element, cinematic volumetric neon lighting, vibrant high-contrast colors, 8k render',
        12345
      )
  );
  const [featuredPrompt, setFeaturedPrompt] = useState('');
  const [isRegeneratingThumbnail, setIsRegeneratingThumbnail] = useState(false);

  // In-article generated AI images
  const [inArticleImages, setInArticleImages] = useState<CuratedImage[]>([]);
  const [regeneratingImageIdx, setRegeneratingImageIdx] = useState<number | null>(null);

  const [status, setStatus] = useState<'published' | 'draft'>(initialPost?.status || 'published');
  const [featured, setFeatured] = useState<boolean>(initialPost?.featured || false);
  const [metaTitle, setMetaTitle] = useState(initialPost?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialPost?.metaDescription || '');
  const [focusKeywords, setFocusKeywords] = useState<string>(initialPost?.focusKeywords?.join(', ') || '');
  const [relatedToolHref, setRelatedToolHref] = useState(initialPost?.relatedToolHref || '');
  const [relatedToolName, setRelatedToolName] = useState(initialPost?.relatedToolName || '');

  // AI 1-Click Writer State
  const [aiTopic, setAiTopic] = useState('');
  const [aiKeyword, setAiKeyword] = useState('');
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [showAiModal, setShowAiModal] = useState(!isEditMode && !initialPost?.title);

  // UI States
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Image Compression State
  const [isCompressingImage, setIsCompressingImage] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: string;
    compressedSize: string;
    savedPercentage: number;
    dimensions: string;
  } | null>(null);

  // Auto-compress and set Featured Thumbnail
  const handleCompressAndSetThumbnail = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setFeedback({ type: 'error', message: 'Please select a valid image file (JPG, PNG, WebP).' });
      return;
    }

    try {
      setIsCompressingImage(true);
      const res = await compressImageFile(file, {
        maxWidth: 1280,
        maxHeight: 720,
        quality: 0.80,
        targetFormat: 'image/webp'
      });

      setFeaturedImage(res.dataUrl);
      setCompressionStats({
        originalSize: formatBytes(res.originalSize),
        compressedSize: formatBytes(res.compressedSize),
        savedPercentage: res.savedPercentage,
        dimensions: `${res.width}x${res.height}`
      });

      setFeedback({
        type: 'success',
        message: `⚡ Image compressed: ${formatBytes(res.originalSize)} ➔ ${formatBytes(res.compressedSize)} (${res.savedPercentage}% saved) in WebP format!`
      });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Image compression failed' });
    } finally {
      setIsCompressingImage(false);
    }
  };

  // Auto-compress and insert in-article image into Markdown
  const handleCompressAndInsertImage = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setFeedback({ type: 'error', message: 'Please select a valid image file.' });
      return;
    }

    try {
      setIsCompressingImage(true);
      const res = await compressImageFile(file, {
        maxWidth: 960,
        maxHeight: 540,
        quality: 0.80,
        targetFormat: 'image/webp'
      });

      const alt = title ? `${title} illustration` : 'Compressed visual';
      insertTextAtCursor(`\n![${alt}](${res.dataUrl})\n`);

      setFeedback({
        type: 'success',
        message: `⚡ Inserted compressed WebP (${formatBytes(res.compressedSize)}, ${res.savedPercentage}% smaller) into article!`
      });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Image compression failed' });
    } finally {
      setIsCompressingImage(false);
    }
  };

  // Auto-generate slug from title if new post
  useEffect(() => {
    if (!isEditMode && title && !slug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  }, [title, isEditMode, slug]);

  const insertTextAtCursor = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('post-content-area') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const replacement = prefix + selected + suffix;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  // 1-Click AI Full Blog Post Generator Handler with 4 AI-Generated Images
  const handleGenerateAiPost = async (customTopic?: string, customKeyword?: string) => {
    const topicToUse = customTopic || aiTopic || title;
    if (!topicToUse.trim()) {
      setFeedback({ type: 'error', message: 'Please enter a Topic or Title for the AI Writer.' });
      return;
    }

    setIsGeneratingArticle(true);
    setFeedback(null);
    setGenerationStep('Analyzing topic & formulating high-CTR viral thumbnail prompt...');

    try {
      const stepTimer1 = setTimeout(() => {
        setGenerationStep('Generating 4 unique topic-specific AI landscape images (16:9)...');
      }, 1200);

      const stepTimer2 = setTimeout(() => {
        setGenerationStep('Drafting 1500+ words with 9th-grade human tone (no robotic words)...');
      }, 3000);

      const stepTimer3 = setTimeout(() => {
        setGenerationStep('Structuring comparison table, E-E-A-T case study & 4-6 FAQs...');
      }, 5000);

      const res = await fetch('/api/admin/blog/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse.trim(),
          targetKeyword: (customKeyword || aiKeyword || '').trim(),
          category,
          relatedToolName,
          relatedToolHref
        })
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      const data = await res.json();

      if (data.success && data.post) {
        const p = data.post;
        setTitle(p.title);
        setSlug(p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        setDescription(p.excerpt || p.description || p.metaDescription);
        setContent(p.content);
        if (p.category) setCategory(p.category);
        if (p.tags && Array.isArray(p.tags)) setTags(p.tags.join(', '));
        if (p.focusKeywords && Array.isArray(p.focusKeywords)) setFocusKeywords(p.focusKeywords.join(', '));
        if (p.featuredImage) {
          setFeaturedImage(p.featuredImage);
          setFeaturedPrompt(p.featuredImageAlt || `High-resolution commercial photography for "${topicToUse}"`);
        }
        if (p.inArticleImages && Array.isArray(p.inArticleImages)) {
          setInArticleImages(p.inArticleImages);
        }
        if (p.metaTitle) setMetaTitle(p.metaTitle);
        if (p.metaDescription) setMetaDescription(p.metaDescription);

        setShowAiModal(false);
        setFeedback({
          type: 'success',
          message: `✨ Full 1500+ word article generated with 4 fresh AI-generated images & high-CTR thumbnail! Review and click Publish.`
        });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to generate article with AI' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Connection error while contacting AI generator' });
    } finally {
      setIsGeneratingArticle(false);
      setGenerationStep('');
    }
  };

  // Regenerate Context-Aware AI Thumbnail On Demand (Nano Banana, Qwen, Unsplash Free, FLUX)
  const handleRegenerateThumbnail = async (styleModifier: string = '', engine: 'nano-banana' | 'qwen' | 'unsplash' | 'flux' = 'nano-banana') => {
    setIsRegeneratingThumbnail(true);
    try {
      const topicForThumb = title || aiTopic || 'Modern AI Technology and Digital Workflow';
      let prompt = featuredPrompt.trim();
      
      if (!prompt || styleModifier) {
        prompt = `Professional commercial editorial photography representing "${topicForThumb}" ${styleModifier ? `, ${styleModifier}` : ', high-end modern workstation setup with laptop showing analytics and clean minimalist desk'}, natural studio daylight, sharp focus, 8k resolution, 16:9 widescreen landscape perspective`;
        setFeaturedPrompt(prompt);
      }

      const res = await fetch('/api/admin/blog/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          type: 'featured',
          topic: topicForThumb,
          category,
          engine
        })
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        setFeaturedImage(data.imageUrl);
        setFeedback({
          type: 'success',
          message: engine === 'unsplash'
            ? '📷 Applied 100% Free Watermark-Free Online HD Photo!'
            : engine === 'nano-banana'
            ? '🍌 New Nano Banana Image generated!'
            : engine === 'qwen'
            ? '🌟 New Qwen-Image Photorealistic Thumbnail generated!'
            : '🔥 New AI Thumbnail generated!'
        });
      } else {
        const seed = Math.floor(Math.random() * 999999);
        const fallbackUrl = generateAiImageUrl(prompt, seed, 'flux');
        setFeaturedImage(fallbackUrl);
        setFeedback({
          type: 'success',
          message: '🔥 New AI Thumbnail generated!'
        });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', message: 'Failed to regenerate thumbnail' });
    } finally {
      setIsRegeneratingThumbnail(false);
    }
  };

  // 1-Click Replace All Images in Article (Internet Free Watermark-Free or Nano Banana)
  const [isReplacingAllImages, setIsReplacingAllImages] = useState(false);
  const handleReplaceAllArticleImages = async (mode: 'free-online' | 'nano-banana' = 'free-online') => {
    setIsReplacingAllImages(true);
    setFeedback(null);

    try {
      const topicToUse = title || aiTopic || 'Modern Technology';
      const res = await fetch('/api/admin/blog/replace-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicToUse,
          content,
          currentFeaturedImage: featuredImage,
          mode
        })
      });

      const data = await res.json();
      if (data.success) {
        if (data.featuredImage) {
          setFeaturedImage(data.featuredImage);
        }
        if (data.content) {
          setContent(data.content);
        }

        // Update in-article images list if any
        if (data.replacedImages && data.replacedImages.length > 0) {
          const newInArticle = data.replacedImages.map((item: any, idx: number) => ({
            url: item.newUrl,
            alt: item.alt,
            caption: item.caption,
            sectionTitle: `Visual ${idx + 1}`,
            source: mode === 'free-online' ? 'curated-hd' : 'gemini'
          }));
          setInArticleImages(newInArticle);
        }

        setFeedback({
          type: 'success',
          message: mode === 'free-online'
            ? `✅ 1-Click Success: All article images replaced with relevant, 100% watermark-free HD free online photos!`
            : `🍌 1-Click Success: All article images replaced with fresh Nano Banana AI images!`
        });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to replace article images' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Error replacing article images' });
    } finally {
      setIsReplacingAllImages(false);
    }
  };

  // Regenerate Specific In-Article Image on demand (with Nano Banana / Free Online)
  const handleRegenerateInArticleImage = async (index: number, engine: 'nano-banana' | 'unsplash' = 'nano-banana') => {
    const targetImg = inArticleImages[index];
    if (!targetImg) return;

    setRegeneratingImageIdx(index);
    try {
      const topicToUse = title || aiTopic || 'Modern Digital Technology';
      const res = await fetch('/api/admin/blog/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: targetImg.prompt,
          type: 'in-article',
          topic: topicToUse,
          sectionTitle: targetImg.sectionTitle || `Section ${index + 1}`,
          keyword: focusKeywords.split(',')[0],
          category,
          engine
        })
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        const oldUrl = targetImg.url;
        const newUrl = data.imageUrl;

        const updated = [...inArticleImages];
        updated[index] = {
          ...updated[index],
          url: newUrl,
          alt: data.alt || updated[index].alt,
          caption: data.caption || updated[index].caption,
          prompt: data.prompt || updated[index].prompt
        };
        setInArticleImages(updated);

        // Automatically update the url in content if present
        if (content.includes(oldUrl)) {
          setContent(content.replace(oldUrl, newUrl));
        }

        setFeedback({
          type: 'success',
          message: engine === 'unsplash'
            ? `📷 Section ${index + 1} image replaced with free watermark-free HD online photo!`
            : `🍌 In-article visual for Section ${index + 1} regenerated with Nano Banana!`
        });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to regenerate image' });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', message: 'Failed to regenerate image' });
    } finally {
      setRegeneratingImageIdx(null);
    }
  };

  // Save or Update Post
  const handleSave = async (targetStatus?: 'published' | 'draft') => {
    const finalStatus = targetStatus || status;
    if (!title.trim() || !content.trim()) {
      setFeedback({ type: 'error', message: 'Title and Content are required before saving.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    const postPayload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: description || title,
      content,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      author,
      authorRole,
      authorAvatar,
      featuredImage,
      status: finalStatus,
      featured,
      metaTitle: metaTitle || `${title} | AI Toolkit Pro`,
      metaDescription: metaDescription || description || title,
      focusKeywords: focusKeywords.split(',').map(k => k.trim()).filter(Boolean),
      relatedToolHref,
      relatedToolName
    };

    try {
      const url = isEditMode && initialPost ? `/api/blog/${initialPost.id}` : '/api/blog';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postPayload)
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success) {
        setFeedback({
          type: 'success',
          message: isEditMode ? 'Post updated successfully!' : '🎉 Post published successfully to the website!'
        });
        setTimeout(() => {
          router.push('/admin/blog');
        }, 1200);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save post' });
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setFeedback({ type: 'error', message: err.message || 'Connection error' });
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  return (
    <div className="space-y-6 pb-24">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <span>{isEditMode ? 'Edit Blog Article' : 'AI Blog Writer & Custom AI Images'}</span>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 font-bold">
                100% Free Publish
              </Badge>
            </h1>
            <p className="text-xs text-muted-foreground">
              Auto-generate 1500+ words + 4 newly generated AI images (with viral high-CTR thumbnail) in 1 click.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditMode && initialPost && (
            <Link href={`/blog/${initialPost.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="text-xs gap-1">
                <Eye className="h-3.5 w-3.5" />
                <span>View Live</span>
              </Button>
            </Link>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave('draft')}
            disabled={isSubmitting || isGeneratingArticle}
            className="text-xs"
          >
            Save Draft
          </Button>

          <Button
            size="sm"
            onClick={() => handleSave('published')}
            disabled={isSubmitting || isGeneratingArticle}
            className="gap-1.5 font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{isSubmitting ? 'Publishing...' : 'Publish to Website'}</span>
          </Button>
        </div>
      </div>

      {/* AI Writer 1-Click Generator Hero Card */}
      <div className="relative p-6 rounded-3xl border border-primary/30 bg-linear-to-r from-primary/10 via-primary/5 to-transparent shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>AI Auto-Pilot Blog & Visual Creator</span>
            </div>
            <h2 className="text-lg font-extrabold text-foreground">
              Enter any Topic to generate a 1500+ Word Human Article + 4 Fresh AI-Generated Landscape Images
            </h2>
            <p className="text-xs text-muted-foreground max-w-2xl">
              Generates a viral, high-CTR 3D concept thumbnail + 3 contextual in-article AI images specific to your topic, with 9th-grade conversational readability and zero robotic clichés.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-6 space-y-1">
            <Label htmlFor="quick-topic" className="text-xs font-semibold">Blog Topic or Title</Label>
            <Input
              id="quick-topic"
              placeholder="e.g. 10 Best Free AI Video Generators in 2025 (Step-by-Step Guide)"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              className="text-sm bg-background/80"
              disabled={isGeneratingArticle}
            />
          </div>

          <div className="md:col-span-3 space-y-1">
            <Label htmlFor="quick-keyword" className="text-xs font-semibold">Target SEO Keyword</Label>
            <Input
              id="quick-keyword"
              placeholder="e.g. free ai video generator"
              value={aiKeyword}
              onChange={(e) => setAiKeyword(e.target.value)}
              className="text-sm bg-background/80"
              disabled={isGeneratingArticle}
            />
          </div>

          <div className="md:col-span-3 flex items-end">
            <Button
              type="button"
              onClick={() => handleGenerateAiPost()}
              disabled={isGeneratingArticle || !aiTopic.trim()}
              className="w-full h-10 font-bold text-xs gap-2 bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
            >
              {isGeneratingArticle ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Post & Images...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  <span>Generate Article & 4 AI Images</span>
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Quick topic suggestion chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-muted-foreground font-medium text-[11px]">Quick Ideas:</span>
          {PRESET_TOPICS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setAiTopic(preset.topic);
                setAiKeyword(preset.kw);
                setCategory(preset.category);
              }}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-background/80 hover:bg-primary/20 border border-border text-foreground/80 hover:text-foreground transition-colors truncate max-w-xs"
            >
              {preset.topic}
            </button>
          ))}
        </div>

        {/* Live generation progress banner */}
        {isGeneratingArticle && (
          <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3 animate-pulse">
            <Loader2 className="h-5 w-5 animate-spin text-primary shrink-0" />
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-primary">Generating 100% Unique Human-Written Article & Custom AI Visuals...</p>
              <p className="text-[11px] text-muted-foreground">{generationStep}</p>
            </div>
          </div>
        )}
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-2.5 shadow-xs ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : 'bg-destructive/10 text-destructive border border-destructive/30'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
          )}
          <span className="font-medium">{feedback.message}</span>
        </div>
      )}

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Post Writing & Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Post Title & Slug */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="post-title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Article Title (Catchy & SEO Optimized)
                </Label>
                <span className="text-[10px] text-muted-foreground font-mono">{title.length}/70 chars</span>
              </div>
              <Input
                id="post-title"
                placeholder="e.g. 10 Best Free AI Video Generators in 2025 (Step-by-Step Guide)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-base font-extrabold h-12 rounded-xl"
                required
              />
            </div>

            {/* Permanent Slug Editor */}
            <div className="flex items-center gap-2 text-xs bg-muted/50 p-3 rounded-xl border border-border">
              <span className="text-muted-foreground font-mono shrink-0">https://aitoolkitpro.com/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-slug"
                className="bg-transparent font-mono font-medium focus:outline-none flex-1 text-foreground border-b border-dashed border-border/80"
              />
            </div>

            {/* Short Excerpt */}
            <div className="space-y-1.5">
              <Label htmlFor="post-excerpt" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Short Excerpt / Hook (2 Sentences)
              </Label>
              <Textarea
                id="post-excerpt"
                placeholder="A compelling 2-sentence hook that pulls readers in..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="text-xs rounded-xl"
              />
            </div>
          </div>

          {/* WordPress / Gutenberg-Style Content Editor */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
              <div className="flex flex-wrap items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => insertTextAtCursor('## ')}
                  title="Heading 2 (H2)"
                >
                  <Heading2 className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => insertTextAtCursor('### ')}
                  title="Heading 3 (H3)"
                >
                  <Heading3 className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => insertTextAtCursor('**', '**')}
                  title="Bold (**text**)"
                >
                  <Bold className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => insertTextAtCursor('*', '*')}
                  title="Italic (*text*)"
                >
                  <Italic className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => insertTextAtCursor('- ')}
                  title="Bullet List (- item)"
                >
                  <List className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => insertTextAtCursor('> ')}
                  title="Blockquote (> quote)"
                >
                  <Quote className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() =>
                    insertTextAtCursor(
                      '\n| Feature / Metric | Traditional Method | AI Automated Strategy | Key Advantage |\n| :--- | :--- | :--- | :--- |\n| Speed | 4-8 Hours | 15 Minutes | 85% Faster |\n| Cost | $$$ | Free | Zero Barrier |\n\n'
                    )
                  }
                  title="Insert Comparison Table"
                >
                  <TableIcon className="h-4 w-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() =>
                    insertTextAtCursor(
                      `\n![${title || 'AI Visual Diagram'}](${generateAiImageUrl(`Step by step workflow of ${title || 'technology'}`, Date.now())})\n`
                    )
                  }
                  title="Generate & Insert New AI Landscape Image"
                >
                  <ImageIcon className="h-4 w-4 text-primary" />
                </Button>

                {/* Upload & Auto-Compress in-article image button */}
                <label className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted cursor-pointer transition-colors" title="Upload & Auto-Compress WebP Image">
                  <Upload className="h-4 w-4 text-emerald-500" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleCompressAndInsertImage(e.target.files[0]);
                        e.target.value = '';
                      }
                    }}
                  />
                </label>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => insertTextAtCursor('[Link Text](', ')')}
                  title="Hyperlink"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs font-semibold ${
                    wordCount >= 1500
                      ? 'text-emerald-600 border-emerald-500/40 bg-emerald-500/10'
                      : 'text-amber-600 border-amber-500/40 bg-amber-500/10'
                  }`}
                >
                  {wordCount >= 1500 ? '✅ 1500+ Words (SEO Ready)' : `${wordCount} words (Target: 1500+)`}
                </Badge>
              </div>
            </div>

            <Textarea
              id="post-content-area"
              placeholder="Write your article in Markdown with ## H2, ### H3, - bullets, ![Alt](url) images, and tables..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={22}
              className="font-mono text-xs sm:text-sm leading-relaxed rounded-xl"
              required
            />

            <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground pt-2 gap-2">
              <div className="flex items-center gap-3">
                <span>
                  <strong>{wordCount}</strong> total words
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {estimatedReadTime}
                </span>
                <span>•</span>
                <span className="text-primary font-semibold">
                  {(content.match(/!\[.*?\]\(.*?\)/g) || []).length} AI images embedded
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">Markdown & HTML Supported</span>
            </div>
          </div>

          {/* In-Article AI Images Palette */}
          {inArticleImages.length > 0 && (
            <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground">
                      Contextual AI In-Article Visuals (16:9 Landscape)
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      Photorealistic scene visuals matching your article subtopics and hardware reviews
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] text-primary border-primary/30 bg-primary/5">
                  {inArticleImages.length} Visuals Ready
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {inArticleImages.map((img, idx) => {
                  const isRegenerating = regeneratingImageIdx === idx;
                  return (
                    <div key={idx} className="group relative rounded-2xl overflow-hidden border border-border bg-muted/20 p-2.5 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                            {img.sectionTitle || `Visual ${idx + 1}`}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRegenerateInArticleImage(idx)}
                            disabled={isRegenerating}
                            title="Regenerate this visual with Gemini"
                            className="p-1 rounded-md text-[10px] text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50"
                          >
                            {isRegenerating ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                            ) : (
                              <RefreshCw className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>

                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted border border-border/60">
                          <Image
                            src={img.url}
                            alt={img.alt}
                            fill
                            unoptimized={img.url.startsWith('data:')}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            value={img.alt}
                            onChange={(e) => {
                              const newAlt = e.target.value;
                              const updated = [...inArticleImages];
                              updated[idx] = { ...updated[idx], alt: newAlt };
                              setInArticleImages(updated);
                            }}
                            placeholder="Descriptive Alt Text..."
                            className="w-full text-[10px] px-2 py-1 rounded-lg border border-border bg-background/80 focus:outline-none focus:ring-1 focus:ring-primary truncate font-medium"
                          />
                          {img.caption && (
                            <p className="text-[9px] text-muted-foreground italic line-clamp-1 px-1">
                              {img.caption}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-1 flex gap-1.5">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => insertTextAtCursor(`\n\n![${img.alt}](${img.url})\n*${img.caption || img.alt}*\n\n`)}
                          className="flex-1 text-[10px] h-7 font-bold gap-1 bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                          <span>Insert into Post</span>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Live Google Search SERP Snippet Preview */}
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold flex items-center gap-1.5">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>Google Search SERP Diagnostic & Snippet Preview</span>
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Simulated appearance of this post on Google Search on Desktop and Mobile.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-muted p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => setSerpDevice('desktop')}
                  className={`p-1.5 rounded-lg font-semibold transition-all ${
                    serpDevice === 'desktop' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'
                  }`}
                  title="Desktop Preview"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSerpDevice('mobile')}
                  className={`p-1.5 rounded-lg font-semibold transition-all ${
                    serpDevice === 'mobile' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'
                  }`}
                  title="Mobile Preview"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Google Result Card Simulation */}
            <div
              className={`p-4 sm:p-5 rounded-2xl border border-border/80 bg-white text-black dark:bg-zinc-900 dark:text-white space-y-1.5 shadow-sm ${
                serpDevice === 'mobile' ? 'max-w-xs mx-auto border-dashed' : ''
              }`}
            >
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                  AI
                </div>
                <span className="truncate text-[11px]">https://aitoolkitpro.com › blog › {slug || 'article-slug'}</span>
              </div>
              <div className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
                {metaTitle || (title ? `${title} | AI Toolkit Pro` : 'Article Title - AI Toolkit Pro')}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                {metaDescription || description || 'Explore actionable guides, real-world case studies, and free AI tool strategies.'}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing Controls */}
          <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="text-sm font-bold border-b border-border pb-2">Publishing Status</h3>

            <div className="space-y-1.5">
              <Label className="text-xs">Post Visibility</Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    status === 'published'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Published (Live)
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    status === 'draft'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'border-border bg-card text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Draft Only
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Label htmlFor="featured-toggle" className="text-xs font-semibold cursor-pointer">
                Pin as Hero Featured Post
              </Label>
              <input
                id="featured-toggle"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 rounded text-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* AI-Generated Featured Cover / High-CTR Thumbnail */}
          <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
                <h3 className="text-sm font-extrabold">Eye-Catching AI Thumbnail</h3>
              </div>
              <Badge variant="outline" className="text-[10px] text-amber-500 border-amber-500/30 bg-amber-500/10 font-bold">
                High CTR 16:9
              </Badge>
            </div>

            {/* Thumbnail Live Preview */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted border-2 border-primary/20 shadow-md group">
              <Image
                src={featuredImage}
                alt="AI Generated Thumbnail"
                fill
                unoptimized={true}
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[11px] text-white font-medium drop-shadow-md">AI Generated 16:9 Cover</span>
              </div>
            </div>

            {/* Compression Stats Badge */}
            {compressionStats && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="font-bold text-emerald-700 dark:text-emerald-300">
                      ⚡ WebP Compressed ({compressionStats.savedPercentage}% Saved)
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {compressionStats.originalSize} ➔ {compressionStats.compressedSize} • {compressionStats.dimensions}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] bg-emerald-500/20 text-emerald-600 border-emerald-500/40">
                  PageSpeed A+
                </Badge>
              </div>
            )}

            {/* Upload & Auto-Compress Dropzone */}
            <div className="p-3 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-muted/20 text-center space-y-2">
              <input
                type="file"
                id="thumbnail-upload"
                accept="image/*"
                className="hidden"
                disabled={isCompressingImage}
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleCompressAndSetThumbnail(e.target.files[0]);
                    e.target.value = '';
                  }
                }}
              />
              <label
                htmlFor="thumbnail-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-1.5 py-1"
              >
                {isCompressingImage ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Compressing to WebP & Optimizing...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-primary" />
                    <div className="text-xs font-bold text-foreground">
                      Upload & Auto-Compress (WebP)
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Converts PNG/JPG to ultra-fast WebP (saves 80-95% file size)
                    </p>
                  </>
                )}
              </label>
            </div>

            {/* Instant AI & Real Photo Controls */}
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={() => handleRegenerateThumbnail('', 'qwen')}
                  disabled={isRegeneratingThumbnail}
                  className="text-[11px] font-bold gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                >
                  {isRegeneratingThumbnail ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      <span>🌟 Qwen-Image AI</span>
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerateThumbnail('', 'flux')}
                  disabled={isRegeneratingThumbnail}
                  className="text-[11px] font-bold gap-1.5 border-border bg-muted/40 hover:bg-muted text-foreground shadow-xs"
                >
                  <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                  <span>FLUX.1 Pro</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleRegenerateThumbnail('', 'unsplash')}
                  disabled={isRegeneratingThumbnail}
                  className="text-[11px] font-bold gap-1.5 border-border bg-muted/40 hover:bg-muted text-foreground shadow-xs"
                >
                  <ImagePlus className="h-3.5 w-3.5 text-blue-500" />
                  <span>📷 Unsplash HD</span>
                </Button>
              </div>

              {/* Style Presets for Editorial Thumbnail */}
              <div className="space-y-1">
                <Label className="text-[10px] text-muted-foreground uppercase font-bold">Quick Realistic Photography Styles:</Label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleRegenerateThumbnail('photorealistic commercial editorial studio tech photography with soft natural daylight and high detail', 'qwen')}
                    className="p-1.5 rounded-lg text-[10px] font-semibold border border-border bg-muted/40 hover:bg-primary/10 hover:border-primary/40 text-left truncate transition-colors"
                  >
                    📸 Editorial Studio
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRegenerateThumbnail('modern sleek desk workstation with laptop showing digital dashboard and charts', 'qwen')}
                    className="p-1.5 rounded-lg text-[10px] font-semibold border border-border bg-muted/40 hover:bg-primary/10 hover:border-primary/40 text-left truncate transition-colors"
                  >
                    💻 Modern Workspace
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRegenerateThumbnail('hands on tech product showcase with clean bokeh background and sharp macro focus', 'qwen')}
                    className="p-1.5 rounded-lg text-[10px] font-semibold border border-border bg-muted/40 hover:bg-primary/10 hover:border-primary/40 text-left truncate transition-colors"
                  >
                    📱 Tech Showcase
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRegenerateThumbnail('minimalist clean modern luxury technology aesthetic with balanced negative space', 'qwen')}
                    className="p-1.5 rounded-lg text-[10px] font-semibold border border-border bg-muted/40 hover:bg-primary/10 hover:border-primary/40 text-left truncate transition-colors"
                  >
                    💎 Minimalist Pro
                  </button>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <Label htmlFor="image-url" className="text-[11px] text-muted-foreground">Or Direct Image URL:</Label>
                <Input
                  id="image-url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://..."
                  className="text-xs rounded-xl font-mono text-[11px]"
                />
              </div>
            </div>
          </div>

          {/* On-Page SEO Meta Tags */}
          <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="text-sm font-bold border-b border-border pb-2 flex items-center justify-between">
              <span>On-Page SEO Meta Tags</span>
              <Search className="h-3.5 w-3.5 text-primary" />
            </h3>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <Label htmlFor="seo-meta-title">Meta Title</Label>
                <span className={`text-[10px] ${metaTitle.length > 60 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {metaTitle.length}/60
                </span>
              </div>
              <Input
                id="seo-meta-title"
                placeholder={title ? `${title} | AI Toolkit Pro` : 'Meta Title for Google'}
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <Label htmlFor="seo-meta-desc">Meta Description</Label>
                <span className={`text-[10px] ${metaDescription.length > 160 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                  {metaDescription.length}/160
                </span>
              </div>
              <Textarea
                id="seo-meta-desc"
                placeholder={description || 'Meta description for search engine ranking...'}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="seo-keywords" className="text-xs">Focus SEO Keywords</Label>
              <Input
                id="seo-keywords"
                placeholder="ai tools, marketing, seo writing"
                value={focusKeywords}
                onChange={(e) => setFocusKeywords(e.target.value)}
                className="text-xs rounded-xl"
              />
            </div>
          </div>

          {/* Taxonomy & Internal Tool Promotion */}
          <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="text-sm font-bold border-b border-border pb-2">Category & Cross-Promotion</h3>

            <div className="space-y-1.5">
              <Label htmlFor="post-category" className="text-xs">Category</Label>
              <select
                id="post-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-9 px-3 text-xs rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="AI Trends & Productivity">AI Trends & Productivity</option>
                <option value="Marketing & Advertising">Marketing & Advertising</option>
                <option value="Video & Social Media">Video & Social Media</option>
                <option value="Design & Branding">Design & Branding</option>
                <option value="AI Tutorials">AI Tutorials</option>
                <option value="Developer Guides">Developer Guides</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="post-tags" className="text-xs">Tags (comma-separated)</Label>
              <Input
                id="post-tags"
                placeholder="AI, Copywriting, Video, Free Tools"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5 pt-2 border-t border-border">
              <Label htmlFor="related-tool" className="text-xs font-semibold">Promote Free Interactive Tool</Label>
              <select
                id="related-tool"
                value={relatedToolHref}
                onChange={(e) => {
                  setRelatedToolHref(e.target.value);
                  const found = allTools.find(t => t.href === e.target.value);
                  setRelatedToolName(found ? found.name : '');
                }}
                className="w-full h-9 px-3 text-xs rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">None (General Article)</option>
                {allTools.map(tool => (
                  <option key={tool.href} value={tool.href}>
                    {tool.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Author Details Card */}
          <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-4">
            <h3 className="text-sm font-bold border-b border-border pb-2">Author & E-E-A-T Profile</h3>

            <div className="space-y-1.5">
              <Label htmlFor="author-name" className="text-xs">Author Name</Label>
              <Input
                id="author-name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="author-role" className="text-xs">Author Job Title / Role</Label>
              <Input
                id="author-role"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="text-xs rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
