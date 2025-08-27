import { AudioLines, FileText, ImageIcon, Laugh, Wrench, Bot, Share2, Youtube, HelpCircle, ScanSearch, Lightbulb, PenTool, ShoppingCart, BookMarked, Hash, MessageSquare, Megaphone, ThumbsUp, Video, UserSquare, Star, Moon, Palette, Image as LucideImage, Gift, ChefHat, Notebook, BookCopy, BrainCircuit, Paintbrush, PenLine, FileSignature } from 'lucide-react';
import type { ReactNode } from 'react';

export interface Tool {
  name: string;
  description: string;
  href: string;
  icon: ReactNode;
  category: string;
}

export const toolCategories = [
  {
    name: "Writing & Content",
    id: "content",
    icon: <PenLine className="h-8 w-8 text-primary" />,
    description: "AI writers for scripts, articles, and social media.",
  },
  {
    name: "Design & Image",
    id: "image",
    icon: <Paintbrush className="h-8 w-8 text-primary" />,
    description: "Generate and edit images with the power of AI.",
  },
  {
    name: "Business & Marketing",
    id: "business",
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    description: "Tools for ads, logos, and product descriptions.",
  },
   {
    name: "Education & Learning",
    id: "education",
    icon: <Notebook className="h-8 w-8 text-primary" />,
    description: "Create quizzes, study notes, and course outlines.",
  },
  {
    name: "Audio & Voice",
    id: "audio",
    icon: <AudioLines className="h-8 w-8 text-primary" />,
    description: "Create voiceovers and transcribe audio effortlessly.",
  },
  {
    name: "Fun & Lifestyle",
    id: "fun",
    icon: <Laugh className="h-8 w-8 text-primary" />,
    description: "Generate memes, horoscopes, recipes and more.",
  },
];


export const allTools: Tool[] = [
  {
    name: "AI Recipe Maker",
    description: "Generate recipes from ingredients you have at home.",
    href: "/tools/ai-recipe-maker",
    icon: <ChefHat className="h-8 w-8 text-primary" />,
    category: "Fun"
  },
  {
    name: "AI Script Writer",
    description: "Generate engaging scripts for videos, podcasts, and more based on your prompts.",
    href: "/tools/ai-script-writer",
    icon: <FileText className="h-8 w-8 text-primary" />,
    category: "Content"
  },
  {
    name: "Product Description Generator",
    description: "Create compelling descriptions for your e-commerce products.",
    href: "/tools/product-description-generator",
    icon: <ShoppingCart className="h-8 w-8 text-primary" />,
    category: "Business"
  },
  {
    name: "Story Plot Generator",
    description: "Generate unique story plots, characters, and settings for any genre.",
    href: "/tools/story-plot-generator",
    icon: <BookMarked className="h-8 w-8 text-primary" />,
    category: "Content"
  },
  {
    name: "AI Image Generator",
    description: "Turn your text prompts into stunning, unique visual art and graphics.",
    href: "/tools/ai-image-generator",
    icon: <ImageIcon className="h-8 w-8 text-primary" />,
    category: "Image"
  },
    {
    name: "AI Background Remover",
    description: "Automatically remove the background from any image with a single click.",
    href: "/tools/background-remover",
    icon: <ScanSearch className="h-8 w-8 text-primary" />,
    category: "Image"
  },
   {
    name: "AI Logo Maker",
    description: "Design a unique, professional logo for your brand in seconds.",
    href: "/tools/ai-logo-maker",
    icon: <PenTool className="h-8 w-8 text-primary" />,
    category: "Business"
  },
  {
    name: "Meme Generator",
    description: "Create funny memes from text or images, powered by AI.",
    href: "/tools/meme-generator",
    icon: <Laugh className="h-8 w-8 text-primary" />,
    category: "Fun"
  },
  {
    name: "Roast/Joke Generator",
    description: "Generate funny roasts, comebacks, and jokes on any topic.",
    href: "/tools/roast-joke-generator",
    icon: <Laugh className="h-8 w-8 text-primary" />,
    category: "Fun"
  },
  {
    name: "YouTube Thumbnail Generator",
    description: "Create click-worthy YouTube thumbnails with bold text and vibrant colors.",
    href: "/tools/youtube-thumbnail-generator",
    icon: <Youtube className="h-8 w-8 text-primary" />,
    category: "Image"
  },
  {
    name: "Text-to-Speech Converter",
    description: "Convert any written text into natural-sounding, high-quality audio.",
    href: "/tools/text-to-speech",
    icon: <AudioLines className="h-8 w-8 text-primary" />,
    category: "Audio"
  },
  {
    name: "Voice-to-Text Converter",
    description: "Transcribe speech from audio recordings with exceptional accuracy.",
    href: "/tools/voice-to-text",
    icon: <Wrench className="h-8 w-8 text-primary" />,
    category: "Audio"
  },
  {
    name: "Ai ChatBot Assistant",
    description: "A suite of tools for Q&A, coding help, grammar correction, and text rewriting.",
    href: "/tools/chatgpt-ai-tools",
    icon: <Bot className="h-8 w-8 text-primary" />,
    category: "Assistant"
  },
  {
    name: "Social Media Post Generator",
    description: "Create engaging posts and captions for your social media channels in seconds.",
    href: "/tools/social-media-post-generator",
    icon: <Share2 className="h-8 w-8 text-primary" />,
    category: "Content"
  },
  {
    name: "Quiz Generator",
    description: "Create quizzes on any topic with various question types and difficulty levels.",
    href: "/tools/quiz-generator",
    icon: <HelpCircle className="h-8 w-8 text-primary" />,
    category: "Education"
  },
  {
    name: "Exam Question Generator",
    description: "Create practice exam questions on any topic for students and teachers.",
    href: "/tools/exam-question-generator",
    icon: <HelpCircle className="h-8 w-8 text-primary" />,
    category: "Education"
  },
  {
    name: "Idea Generator",
    description: "Generate creative ideas for business, content, marketing, and more.",
    href: "/tools/idea-generator",
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    category: "Business"
  },
  {
    name: "Hashtag Generator",
    description: "Generate relevant, trending, and niche-specific hashtags for social media.",
    href: "/tools/hashtag-generator",
    icon: <Hash className="h-8 w-8 text-primary" />,
    category: "Business"
  },
  {
    name: "Slogan/Tagline Generator",
    description: "Create short, memorable, and brand-focused slogans and taglines.",
    href: "/tools/slogan-generator",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    category: "Business"
  },
  {
    name: "Ad Copy Generator",
    description: "Generate ad copy for platforms like Google, Facebook, and Instagram.",
    href: "/tools/ad-copy-generator",
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    category: "Business"
  },
  {
    name: "Engagement Post Ideas Generator",
    description: "Generate creative post ideas to boost social media interaction.",
    href: "/tools/engagement-post-generator",
    icon: <ThumbsUp className="h-8 w-8 text-primary" />,
    category: "Business"
  },
  {
    name: "Reel/Shorts Script Writer",
    description: "Generate 15-60 second video scripts for Reels, Shorts, and TikTok.",
    href: "/tools/reel-shorts-script-writer",
    icon: <Video className="h-8 w-8 text-primary" />,
    category: "Content"
  },
  {
    name: "Cartoon/Avatar Maker",
    description: "Turn your photo into a stylized cartoon, avatar, or anime character.",
    href: "/tools/cartoon-avatar-maker",
    icon: <UserSquare className="h-8 w-8 text-primary" />,
    category: "Image"
  },
  {
    name: "Horoscope Generator",
    description: "Get your daily, weekly, or monthly horoscope for any zodiac sign.",
    href: "/tools/horoscope-generator",
    icon: <Star className="h-8 w-8 text-primary" />,
    category: "Fun"
  },
  {
    name: "Dream Interpreter",
    description: "Analyze the symbols and meanings behind your dreams with AI.",
    href: "/tools/dream-interpreter",
    icon: <Moon className="h-8 w-8 text-primary" />,
    category: "Fun"
  },
  {
    name: "Color Palette Finder",
    description: "Generate harmonious color palettes from a text description.",
    href: "/tools/color-palette-finder",
    icon: <Palette className="h-8 w-8 text-primary" />,
    category: "Image"
  },
  {
    name: "Custom Icon Generator",
    description: "Create unique icons in various styles from a text description.",
    href: "/tools/custom-icon-generator",
    icon: <LucideImage className="h-8 w-8 text-primary" />,
    category: "Image"
  },
  {
    name: "Gift Suggestion Tool",
    description: "Get personalized gift ideas for any occasion, person, and budget.",
    href: "/tools/gift-suggestion-tool",
    icon: <Gift className="h-8 w-8 text-primary" />,
    category: "Fun"
  },
  {
    name: "Study Notes Creator",
    description: "Convert long text into concise study notes.",
    href: "/tools/study-notes-creator",
    icon: <Notebook className="h-8 w-8 text-primary" />,
    category: "Education"
  },
  {
    name: "Course Outline Generator",
    description: "Create a complete course structure with modules and lessons.",
    href: "/tools/course-outline-generator",
    icon: <BookCopy className="h-8 w-8 text-primary" />,
    category: "Education"
  },
  {
    name: "AI YouTube SEO Tool",
    description: "Get AI-powered SEO suggestions for your YouTube videos.",
    href: "/tools/youtube-seo-tool",
    icon: <Youtube className="h-8 w-8 text-primary" />,
    category: "Business"
  },
];
