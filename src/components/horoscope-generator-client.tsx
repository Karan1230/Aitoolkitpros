"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { horoscopeGenerator } from '@/ai/flows/horoscope-generator';
import type { HoroscopeGeneratorOutput } from '@/ai/flows/horoscope-generator';
import { languages } from '@/lib/languages';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Copy, Download, Languages, Calendar, Star, Heart, Briefcase, Shield, Palette, Hash } from 'lucide-react';
import { Badge } from './ui/badge';
import { zodSigns } from '@/lib/zodiac';


const timeframes = ["Daily", "Weekly", "Monthly"];

const formSchema = z.object({
  zodiacSign: z.string().min(1, 'Please select a zodiac sign.'),
  timeframe: z.string().min(1, 'Please select a timeframe.'),
  language: z.string().min(1, 'Please select a language.'),
});

export function HoroscopeGeneratorClient() {
  const [horoscope, setHoroscope] = useState<HoroscopeGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zodiacSign: 'Aries',
      timeframe: 'Daily',
      language: 'English',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setHoroscope(null);

    try {
      const result = await horoscopeGenerator(values);
      setHoroscope(result);
    } catch (error) {
      console.error('Horoscope generation failed:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to generate the horoscope. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const formatHoroscopeForAction = () => {
    if (!horoscope) return '';
    let text = `Horoscope for ${form.getValues('zodiacSign')} (${form.getValues('timeframe')})\n\n`;
    text += `Love & Relationships:\n${horoscope.love}\n\n`;
    text += `Career & Finance:\n${horoscope.career}\n\n`;
    text += `Health & Wellness:\n${horoscope.health}\n\n`;
    text += `Lucky Number: ${horoscope.luckyNumber}\n`;
    text += `Lucky Color: ${horoscope.luckyColor}\n`;
    return text;
  };

  const copyToClipboard = () => {
    const text = formatHoroscopeForAction();
    navigator.clipboard.writeText(text);
    toast({ title: "Horoscope copied to clipboard!" });
  };
  
  const downloadHoroscope = () => {
    const text = formatHoroscopeForAction();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-horoscope.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Horoscope downloaded!" });
    };

  const selectedSign = zodSigns.find(sign => sign.name === form.watch('zodiacSign'));

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <FormField
                    control={form.control}
                    name="zodiacSign"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Zodiac Sign</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Star className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a sign" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {zodSigns.map(sign => <SelectItem key={sign.name} value={sign.name}>{sign.icon} {sign.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="timeframe"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="font-semibold">Timeframe</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <Calendar className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select a timeframe" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {timeframes.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
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
              {isLoading ? 'Generating...' : 'Generate Horoscope'}
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>

        {isLoading && (
           <div className="mt-6 p-4 border rounded-lg bg-muted/50 text-center text-muted-foreground animate-pulse">
             Consulting the stars for you...
           </div>
        )}

        {horoscope && selectedSign && (
          <div className="mt-6 space-y-4">
             <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-headline flex items-center gap-2">{selectedSign.icon} {selectedSign.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedSign.dateRange}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={downloadHoroscope}><Download className="h-4 w-4" /></Button>
                </div>
            </div>
            <Card className="bg-muted/50">
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Heart className="text-red-500" /> Love & Relationships</h3>
                        <p className="text-sm">{horoscope.love}</p>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Briefcase className="text-blue-500"/> Career & Finance</h3>
                        <p className="text-sm">{horoscope.career}</p>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Shield className="text-green-500"/> Health & Wellness</h3>
                        <p className="text-sm">{horoscope.health}</p>
                    </div>
                     <div className="flex flex-wrap gap-4 pt-4">
                        <Badge variant="secondary" className="text-base"><Hash className="h-4 w-4 mr-1"/> Lucky Number: {horoscope.luckyNumber}</Badge>
                        <Badge variant="secondary" className="text-base"><Palette className="h-4 w-4 mr-1"/> Lucky Color: {horoscope.luckyColor}</Badge>
                    </div>
                </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
