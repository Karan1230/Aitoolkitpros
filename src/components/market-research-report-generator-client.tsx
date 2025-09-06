
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { marketResearchReportGenerator } from '@/ai/flows/market-research-report-generator';
import type { MarketResearchReportGeneratorOutput } from '@/ai/flows/market-research-report-generator';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Briefcase, Users, Globe, FileText, CheckCircle, BarChart, TrendingUp, Target, Swords, ShieldCheck, XCircle, Lightbulb, Zap, LineChart, ListOrdered } from 'lucide-react';
import { Badge } from './ui/badge';
import Image from 'next/image';

const reportStyles = ["Detailed", "Summary"];

const formSchema = z.object({
  industryProduct: z.string().min(3, 'This field must be at least 3 characters.'),
  targetMarket: z.string().min(3, 'This field must be at least 3 characters.'),
  region: z.string().min(3, 'This field must be at least 3 characters.'),
  reportStyle: z.string().min(1, 'Please select a report style.'),
});

export function MarketResearchReportGeneratorClient() {
  const [report, setReport] = useState<MarketResearchReportGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industryProduct: '',
      targetMarket: '',
      region: '',
      reportStyle: 'Detailed',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReport(null);

    try {
      const result = await marketResearchReportGenerator(values);
      setReport(result);
    } catch (error) {
      console.error('Report generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the report. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatReportForAction = () => {
    if (!report) return '';
    let text = `Market Research Report: ${form.getValues('industryProduct')}\n\n`;
    text += `## Executive Summary\n${report.executiveSummary}\n\n`;
    text += `## Market Overview\nSize: ${report.marketOverview.size}\nGrowth: ${report.marketOverview.growth}\nTrends:\n- ${report.marketOverview.trends.join('\n- ')}\n\n`;
    text += `## Target Audience\nDemographics: ${report.targetAudience.demographics}\nNeeds:\n- ${report.targetAudience.needs.join('\n- ')}\nBehavior: ${report.targetAudience.behavior}\n\n`;
    text += `## Competitor Analysis\nLandscape: ${report.competitorAnalysis.competitiveLandscape}\nKey Players:\n${report.competitorAnalysis.keyPlayers.map(p => `  - ${p.name}: S: ${p.strengths}, W: ${p.weaknesses}`).join('\n')}\n\n`;
    text += `## SWOT Analysis\nStrengths:\n- ${report.swotAnalysis.strengths.join('\n- ')}\n\nWeaknesses:\n- ${report.swotAnalysis.weaknesses.join('\n- ')}\n\nOpportunities:\n- ${report.swotAnalysis.opportunities.join('\n- ')}\n\nThreats:\n- ${report.swotAnalysis.threats.join('\n- ')}\n\n`;
    text += `## Opportunities & Challenges\nOpportunities:\n- ${report.opportunitiesAndChallenges.opportunities.join('\n- ')}\n\nChallenges:\n- ${report.opportunitiesAndChallenges.challenges.join('\n- ')}\n\n`;
    text += `## Future Forecast & Recommendations\nForecast: ${report.futureForecast.forecast}\nRecommendations:\n- ${report.futureForecast.recommendations.join('\n- ')}\n\n`;
    return text;
  };

  const copyToClipboard = () => {
    const text = formatReportForAction();
    navigator.clipboard.writeText(text);
    toast({ title: "Report copied to clipboard!" });
  };
  
  const downloadReport = () => {
    const text = formatReportForAction();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'market-research-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Report downloaded!" });
    };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="industryProduct"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Industry / Product</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electric Bikes in India" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="targetMarket"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Target Market</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Urban Youth, 18–30" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Region</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., India, Delhi NCR" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="reportStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Report Style</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                          <SelectTrigger><FileText className="mr-2 h-4 w-4"/>{field.value}</SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          {reportStyles.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                      </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating Report...' : 'Generate Report'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-6 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is analyzing the market...
           </div>
        )}

        {report && (
          <div className="mt-6 space-y-4">
             <div className="flex justify-between items-center">
                <h2 className="text-2xl font-headline">Market Research Report: {form.getValues('industryProduct')}</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadReport}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase /> Executive Summary</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">{report.executiveSummary}</p></CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BarChart/> Market Overview</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary">Size: {report.marketOverview.size}</Badge>
                  <Badge variant="secondary">Growth: {report.marketOverview.growth}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center gap-2"><TrendingUp/> Trends</h4>
                  <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                    {report.marketOverview.trends.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Target/> Target Audience</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <p><strong className="text-foreground">Demographics:</strong> {report.targetAudience.demographics}</p>
                    <p><strong className="text-foreground">Behavior:</strong> {report.targetAudience.behavior}</p>
                    <div>
                    <h4 className="font-semibold">Needs & Pain Points</h4>
                    <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                        {report.targetAudience.needs.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    </div>
                </CardContent>
                </Card>

                <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Swords/> Competitor Analysis</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    <p>{report.competitorAnalysis.competitiveLandscape}</p>
                     <div>
                    <h4 className="font-semibold">Key Players</h4>
                    <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                        {report.competitorAnalysis.keyPlayers.map((item, i) => <li key={i}><strong>{item.name}</strong> - S: {item.strengths}, W: {item.weaknesses}</li>)}
                    </ul>
                    </div>
                </CardContent>
                </Card>
            </div>

             <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck/> SWOT Analysis</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                   <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-lg">
                     <h4 className="font-semibold text-green-800 dark:text-green-300">Strengths</h4>
                     <ul className="list-disc pl-5 text-sm text-green-700 dark:text-green-400">{report.swotAnalysis.strengths.map((item, i) => <li key={i}>{item}</li>)}</ul>
                   </div>
                   <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-lg">
                     <h4 className="font-semibold text-red-800 dark:text-red-300">Weaknesses</h4>
                     <ul className="list-disc pl-5 text-sm text-red-700 dark:text-red-400">{report.swotAnalysis.weaknesses.map((item, i) => <li key={i}>{item}</li>)}</ul>
                   </div>
                   <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-lg">
                     <h4 className="font-semibold text-blue-800 dark:text-blue-300">Opportunities</h4>
                     <ul className="list-disc pl-5 text-sm text-blue-700 dark:text-blue-400">{report.swotAnalysis.opportunities.map((item, i) => <li key={i}>{item}</li>)}</ul>
                   </div>
                   <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-lg">
                     <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Threats</h4>
                     <ul className="list-disc pl-5 text-sm text-yellow-700 dark:text-yellow-400">{report.swotAnalysis.threats.map((item, i) => <li key={i}>{item}</li>)}</ul>
                   </div>
                </CardContent>
             </Card>

            <div className="grid md:grid-cols-2 gap-4">
                <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb/> Opportunities</CardTitle></CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 text-muted-foreground">{report.opportunitiesAndChallenges.opportunities.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </CardContent>
                </Card>
                <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Zap/> Challenges</CardTitle></CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 text-muted-foreground">{report.opportunitiesAndChallenges.challenges.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </CardContent>
                </Card>
            </div>
            
             <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><LineChart/> Future Forecast & Recommendations</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <p>{report.futureForecast.forecast}</p>
                <div>
                  <h4 className="font-semibold flex items-center gap-2"><ListOrdered/> Recommendations</h4>
                  <ul className="list-decimal pl-5 mt-2 text-muted-foreground">
                    {report.futureForecast.recommendations.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </CardContent>
            </Card>

          </div>
        )}
      </CardContent>
    </Card>
  );
}
