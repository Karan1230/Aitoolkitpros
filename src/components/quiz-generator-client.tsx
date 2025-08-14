"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { languages } from '@/lib/languages';
import type { QuizGeneratorOutput } from '@/ai/flows/quiz-generator';
import { quizGenerator } from '@/ai/flows/quiz-generator';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, BarChart, ListChecks, Hash } from 'lucide-react';
import { Slider } from './ui/slider';

const questionTypes = ["MCQ", "True/False", "Fill in the Blank"];
const difficulties = ["Easy", "Medium", "Hard"];

const formSchema = z.object({
  topic: z.string().min(3, 'Topic must be at least 3 characters long.'),
  language: z.string().min(1, 'Please select a language.'),
  difficulty: z.string().min(1, 'Please select a difficulty.'),
  questionType: z.string().min(1, 'Please select a question type.'),
  numQuestions: z.number().min(1).max(20),
});

export function QuizGeneratorClient() {
  const [quiz, setQuiz] = useState<QuizGeneratorOutput['quiz'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      language: 'English',
      difficulty: 'Medium',
      questionType: 'MCQ',
      numQuestions: 5,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setQuiz(null);

    try {
      const result = await quizGenerator(values);
      setQuiz(result.quiz);
    } catch (error) {
      console.error('Quiz generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the quiz. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatQuizForCopy = () => {
    if (!quiz) return '';
    return quiz.map((q, i) => {
        let questionText = `${i + 1}. ${q.question}\n`;
        if (q.options && q.options.length > 0) {
            questionText += q.options.map((opt, j) => `   ${String.fromCharCode(97 + j)}) ${opt}`).join('\n') + '\n';
        }
        questionText += `Answer: ${q.answer}\n`;
        questionText += `Explanation: ${q.explanation}\n`;
        return questionText;
    }).join('\n');
  };

  const copyToClipboard = () => {
    const text = formatQuizForCopy();
    navigator.clipboard.writeText(text);
    toast({ title: "Quiz copied to clipboard!" });
  };

  const downloadQuiz = () => {
    const text = formatQuizForCopy();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-quiz.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Quiz downloaded!" });
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
                  <FormLabel className="text-lg font-semibold">Quiz Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Solar System, World War II, React Hooks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><BarChart/>{field.value}</SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {difficulties.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="questionType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Question Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><ListChecks/>{field.value}</SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {questionTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
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
                                <SelectTrigger><Languages />{field.value}</SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {languages.map(l => <SelectItem key={l.value} value={l.name}>{l.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="numQuestions"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Questions: {field.value}</FormLabel>
                        <FormControl>
                             <div className="flex items-center gap-4 pt-2">
                                <Hash />
                                <Slider
                                    min={1}
                                    max={20}
                                    step={1}
                                    defaultValue={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                />
                             </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Generating Quiz...' : 'Generate Quiz'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             The AI is crafting your quiz... please wait.
           </div>
        )}

        {quiz && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-headline">Your Generated Quiz</h3>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadQuiz}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-4 max-h-[600px] overflow-y-auto space-y-6">
                   {quiz.map((item, index) => (
                       <div key={index} className="space-y-2 pb-4 border-b last:border-b-0">
                           <p className="font-semibold">{index + 1}. {item.question}</p>
                           {item.options && (
                               <ul className="list-disc list-inside pl-4 space-y-1">
                                   {item.options.map((option, i) => (
                                       <li key={i}>{option}</li>
                                   ))}
                               </ul>
                           )}
                           <div className="pt-2">
                                <p className="text-sm"><strong>Answer:</strong> {item.answer}</p>
                                <p className="text-sm text-muted-foreground"><strong>Explanation:</strong> {item.explanation}</p>
                           </div>
                       </div>
                   ))}
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
