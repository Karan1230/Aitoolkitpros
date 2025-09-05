
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Message } from 'genkit';

import { personalFinanceAssistant } from '@/ai/flows/personal-finance-assistant';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Bot, User } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

const formSchema = z.object({
  prompt: z.string().min(1, 'Message cannot be empty.'),
});

export function PersonalFinanceAssistantClient() {
  const [history, setHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  useEffect(() => {
    // Scroll to bottom when history changes
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [history, isLoading]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const userMessage: Message = {
      role: 'user',
      content: [{ text: values.prompt }],
    };
    setHistory(prev => [...prev, userMessage]);
    form.reset();

    try {
      const result = await personalFinanceAssistant({ history, prompt: values.prompt });
      const assistantMessage: Message = {
        role: 'model',
        content: [{ text: result.response }],
      };
      setHistory(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Finance assistant failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to get a response. Please try again.',
      });
       const errorMessage: Message = {
            role: 'model',
            content: [{ text: "I'm sorry, I encountered an error and can't respond right now. Please try again later." }],
       };
       setHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-2 border-primary/20 shadow-lg h-[70vh] flex flex-col">
      <CardHeader>
        <CardTitle>Finance Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="space-y-4 pr-4">
                {history.map((message, index) => (
                <div
                    key={index}
                    className={cn(
                    'flex items-start gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                >
                    {message.role === 'model' && (
                    <Avatar className="w-8 h-8">
                        <AvatarFallback><Bot/></AvatarFallback>
                    </Avatar>
                    )}
                    <div
                    className={cn(
                        'max-w-[80%] rounded-lg p-3 text-sm whitespace-pre-wrap',
                        message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                    >
                    {message.content[0].text}
                    </div>
                     {message.role === 'user' && (
                    <Avatar className="w-8 h-8">
                        <AvatarFallback><User/></AvatarFallback>
                    </Avatar>
                    )}
                </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3 justify-start">
                        <Avatar className="w-8 h-8">
                            <AvatarFallback><Bot/></AvatarFallback>
                        </Avatar>
                        <div className="max-w-[80%] rounded-lg p-3 text-sm bg-muted space-y-2">
                             <Skeleton className="h-4 w-[250px]" />
                             <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-6 border-t">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full items-center space-x-2"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      placeholder="Ask a financial question or paste your expenses..."
                      className="resize-none"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
