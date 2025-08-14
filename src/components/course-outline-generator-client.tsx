"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { courseOutlineGenerator } from '@/ai/flows/course-outline-generator';
import type { CourseOutlineGeneratorOutput } from '@/ai/flows/course-outline-generator';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, BarChart3, Clock, BookCopy, CheckCircle, BookOpen } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
const durations = ["2 Hours (Crash Course)", "1 Week (Part-Time)", "4 Weeks (Standard)", "8 Weeks (In-Depth)"];

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
  level: z.string().min(1, 'Please select a level.'),
  duration: z.string().min(1, 'Please select a duration.'),
  language: z.string().min(1, 'Please select a language.'),
});

export function CourseOutlineGeneratorClient() {
  const [outline, setOutline] = useState<CourseOutlineGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      level: 'Beginner',
      duration: '4 Weeks (Standard)',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setOutline(null);

    try {
      const result = await courseOutlineGenerator(values);
      setOutline(result);
    } catch (error) {
      console.error('Outline generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the course outline. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatOutlineForAction = () => {
    if (!outline) return '';
    let text = `Course Title: ${outline.courseTitle}\n\n`;
    text += `Description: ${outline.courseDescription}\n\n`;
    outline.modules.forEach((module, modIndex) => {
      text += `Module ${modIndex + 1}: ${module.title}\n`;
      module.lessons.forEach((lesson, lesIndex) => {
        text += `  Lesson ${lesIndex + 1}: ${lesson.title}\n`;
        lesson.keyPoints.forEach(point => {
          text += `    - ${point}\n`;
        });
      });
      text += '\n';
    });
    return text;
  };

  const copyToClipboard = () => {
    const text = formatOutlineForAction();
    navigator.clipboard.writeText(text);
    toast({ title: "Outline copied to clipboard!" });
  };
  
  const downloadOutline = () => {
    const text = formatOutlineForAction();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-course-outline.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Outline downloaded!" });
    };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Course Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Introduction to Python Programming, Digital Marketing Masterclass"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {levels.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Duration</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Clock className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a duration" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {durations.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Languages className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {languages.map(lang => <SelectItem key={lang.value} value={lang.name}>{lang.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating...' : 'Generate Outline'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is designing your curriculum...
           </div>
        )}

        {outline && (
          <div className="mt-6 space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="text-xl font-headline flex items-center gap-2"><BookCopy/>Generated Course Outline</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadOutline}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            
            <Card className="bg-muted/50">
                 <CardHeader>
                    <CardTitle className="text-2xl font-headline">{outline.courseTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground pt-2">{outline.courseDescription}</p>
                 </CardHeader>
                 <CardContent>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                       {outline.modules.map((module, modIndex) => (
                           <AccordionItem value={`item-${modIndex}`} key={modIndex}>
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                                            <BookOpen className="h-5 w-5" />
                                        </div>
                                        <span>Module {modIndex + 1}: {module.title}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8">
                                    <div className="space-y-4 border-l-2 border-primary/20 pl-6 py-4">
                                        {module.lessons.map((lesson, lesIndex) => (
                                            <div key={lesIndex}>
                                                <h4 className="font-semibold">{lesson.title}</h4>
                                                <ul className="mt-2 space-y-1">
                                                    {lesson.keyPoints.map((point, ptIndex) => (
                                                       <li key={ptIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span>{point}</span>
                                                       </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                           </AccordionItem>
                       ))}
                    </Accordion>
                 </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
