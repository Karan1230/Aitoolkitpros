"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { youtubeSeoTool } from '@/ai/flows/youtube-seo-tool';
import { YoutubeSeoToolInputSchema, type YoutubeSeoToolOutput } from '@/ai/schemas/youtube-seo-tool-schemas';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Video, Clapperboard, Search, Hash, FileText, Bot, ThumbsUp, Eye, MessageSquare, Check, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { Label } from './ui/label';

const formSchema = YoutubeSeoToolInputSchema;

export function YoutubeSeoToolClient() {
  const [report, setReport] = useState<YoutubeSeoToolOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisType, setAnalysisType] = useState('video');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      analysisType: 'video',
      query: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReport(null);
    try {
      const result = await youtubeSeoTool(values);
      setReport(result);
    } catch (error) {
      console.error('YouTube SEO tool failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error instanceof Error ? error.message : 'Failed to generate SEO report. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const SeoScoreMeter = ({ score }: { score: number }) => {
    const colorClass = score < 50 ? 'text-red-500' : score < 75 ? 'text-yellow-500' : 'text-green-500';
    return (
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-muted/50"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className={colorClass}
            strokeDasharray={`${score}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold">
          {score}
        </div>
      </div>
    );
  };
  
  const StatsCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
    <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{label}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</div>
        </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="video" onValueChange={(value) => {
        setAnalysisType(value);
        form.setValue('analysisType', value as 'video' | 'channel' | 'keyword');
    }} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="video"><Video className="mr-2 h-4 w-4" />Video Analyzer</TabsTrigger>
            <TabsTrigger value="channel"><Clapperboard className="mr-2 h-4 w-4"/>Channel Analyzer</TabsTrigger>
            <TabsTrigger value="keyword"><Search className="mr-2 h-4 w-4"/>Keyword Finder</TabsTrigger>
        </TabsList>
        <Card className="mt-4 border-2 border-primary/20 shadow-lg">
            <CardContent className="p-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="query"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input 
                                        placeholder={
                                            analysisType === 'video' ? 'Enter YouTube Video URL...' :
                                            analysisType === 'channel' ? 'Enter YouTube Channel URL...' :
                                            'Enter keyword to analyze...'
                                        } 
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                            {isLoading ? 'Analyzing...' : `Analyze ${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)}`}
                            <Sparkles className="ml-2 h-5 w-5" />
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
        
        {isLoading && (
            <div className="mt-6 space-y-4">
                <Skeleton className="h-32 w-full" />
                <div className="grid md:grid-cols-2 gap-4">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        )}

        {report && (
            <div className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>SEO Score</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <SeoScoreMeter score={report.seoScore} />
                        <p className="mt-2 text-center text-muted-foreground">This score represents the estimated SEO performance based on the provided data.</p>
                    </CardContent>
                </Card>

                {report.originalData && (
                     <Card>
                        <CardHeader>
                            <CardTitle>Original Data Snapshot</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {analysisType === 'video' && (
                                <>
                                 <StatsCard icon={<Eye className="h-4 w-4 text-muted-foreground"/>} label="Views" value={report.originalData.viewCount || 0} />
                                 <StatsCard icon={<ThumbsUp className="h-4 w-4 text-muted-foreground"/>} label="Likes" value={report.originalData.likeCount || 0} />
                                 <StatsCard icon={<MessageSquare className="h-4 w-4 text-muted-foreground"/>} label="Comments" value={report.originalData.commentCount || 0} />
                                 <StatsCard icon={<Bot className="h-4 w-4 text-muted-foreground"/>} label="Tags" value={report.originalData.tags?.length || 0} />
                                </>
                            )}
                             {analysisType === 'channel' && (
                                <>
                                 <StatsCard icon={<Users className="h-4 w-4 text-muted-foreground"/>} label="Subscribers" value={report.originalData.subscriberCount || 0} />
                                 <StatsCard icon={<Eye className="h-4 w-4 text-muted-foreground"/>} label="Total Views" value={report.originalData.viewCount || 0} />
                                 <StatsCard icon={<Video className="h-4 w-4 text-muted-foreground"/>} label="Total Videos" value={report.originalData.videoCount || 0} />
                                </>
                            )}
                        </CardContent>
                    </Card>
                )}
                
                <Card>
                    <CardHeader>
                        <CardTitle>AI SEO Suggestions</CardTitle>
                        <CardDescription>Use these suggestions to improve your video's ranking.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                           <Label className="flex items-center gap-2"><FileText className="h-4 w-4"/>Optimized Title</Label>
                           <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
                               <p className="flex-1 text-sm">{report.optimizedTitle}</p>
                               <Button variant="ghost" size="icon" onClick={() => copyToClipboard(report.optimizedTitle)}><Copy className="h-4 w-4"/></Button>
                           </div>
                        </div>
                         <div className="space-y-2">
                           <Label className="flex items-center gap-2"><FileText className="h-4 w-4"/>Optimized Description</Label>
                           <div className="flex items-start gap-2 p-3 rounded-md bg-muted">
                               <p className="flex-1 text-sm whitespace-pre-wrap">{report.optimizedDescription}</p>
                               <Button variant="ghost" size="icon" onClick={() => copyToClipboard(report.optimizedDescription)}><Copy className="h-4 w-4"/></Button>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label className="flex items-center gap-2"><Hash className="h-4 w-4"/>Optimized Tags</Label>
                           <div className="p-3 rounded-md bg-muted">
                                <div className="flex flex-wrap gap-2">
                                    {report.optimizedTags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                                <Button variant="link" size="sm" className="mt-2" onClick={() => copyToClipboard(report.optimizedTags.join(', '))}><Copy className="mr-2 h-4 w-4"/>Copy All Tags</Button>
                           </div>
                        </div>
                         <div className="space-y-2">
                           <Label className="flex items-center gap-2"><Hash className="h-4 w-4"/>Trending Hashtags</Label>
                           <div className="p-3 rounded-md bg-muted">
                                <div className="flex flex-wrap gap-2">
                                    {report.trendingHashtags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                                </div>
                                <Button variant="link" size="sm" className="mt-2" onClick={() => copyToClipboard(report.trendingHashtags.join(' '))}><Copy className="mr-2 h-4 w-4"/>Copy All Hashtags</Button>
                           </div>
                        </div>
                    </CardContent>
                </Card>
                
                {report.competitorKeywordFrequency.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Competitor Keyword Frequency</CardTitle>
                            <CardDescription>Most common keywords found in top-ranking videos.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <ChartContainer config={{
                                keywords: {
                                    label: "Keywords",
                                    color: "hsl(var(--primary))",
                                },
                           }} className="h-[250px] w-full">
                                <BarChart data={report.competitorKeywordFrequency} layout="vertical" margin={{left: 20}}>
                                    <CartesianGrid horizontal={false} />
                                    <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={100} />
                                    <XAxis dataKey="value" type="number" hide />
                                    <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="value" fill="var(--color-keywords)" radius={4} />
                                </BarChart>
                           </ChartContainer>
                        </CardContent>
                    </Card>
                )}

            </div>
        )}

    </Tabs>
  );
}
