"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { voiceToTextConverter } from '@/ai/flows/voice-to-text-converter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Upload, Copy, FileText, Languages } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { languages } from '@/lib/languages';


const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const formSchema = z.object({
    files: z
        .custom<FileList>()
        .refine((files) => files && files.length > 0, 'At least one file is required.')
        .refine(
            (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE_BYTES),
            `Each file must be less than ${MAX_FILE_SIZE_MB}MB.`
        ),
    targetLanguage: z.string().min(1, 'Please select a language.'),
});

interface TranscriptionResult {
    fileName: string;
    translatedText?: string;
    error?: string;
}

export function VoiceToTextClient() {
  const [results, setResults] = useState<TranscriptionResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      files: undefined,
      targetLanguage: 'English',
    },
  });

  const { register, handleSubmit, watch } = form;
  const watchedFiles = watch("files");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResults([]);

    const fileList = Array.from(values.files);
    const newResults: TranscriptionResult[] = fileList.map(file => ({ fileName: file.name }));
    setResults(newResults);

    await Promise.all(
        fileList.map(async (file, index) => {
            try {
                const reader = new FileReader();
                const audioDataUri = await new Promise<string>((resolve, reject) => {
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                const result = await voiceToTextConverter({
                    audioDataUri,
                    targetLanguage: values.targetLanguage
                });
                
                newResults[index] = { ...newResults[index], translatedText: result.translatedText };
                setResults([...newResults]);

            } catch (error) {
                console.error(`Transcription failed for ${file.name}:`, error);
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
                newResults[index] = { ...newResults[index], error: `Failed to process: ${errorMessage}` };
                setResults([...newResults]);
                 toast({
                    variant: 'destructive',
                    title: `Error processing ${file.name}`,
                    description: 'Please try again.',
                });
            }
        })
    );

    setIsLoading(false);
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
    });
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Upload Audio Files</FormLabel>
                  <FormControl>
                    <div className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center cursor-pointer hover:border-primary">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                           Drag & drop files here, or click to select files
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            (Max {MAX_FILE_SIZE_MB}MB per file)
                        </p>
                        <input 
                            id="file-upload" 
                            type="file" 
                            multiple 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            {...register("files")}
                        />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchedFiles && watchedFiles.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium">Selected files:</p>
                    <ul className="list-disc list-inside bg-muted/50 p-2 rounded-md">
                        {Array.from(watchedFiles).map((file, i) => (
                           <li key={i} className="text-sm flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            {file.name}
                           </li>
                        ))}
                    </ul>
                </div>
            )}
            
            <FormField
              control={form.control}
              name="targetLanguage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Output Language</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                          <Languages className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {languages.map(lang => (
                            <SelectItem key={lang.value} value={lang.name}>
                                {lang.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Processing...' : 'Convert to Text'}
            </Button>
          </form>
        </Form>
        
        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold">Results</h3>
            {results.map((result, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="font-semibold text-sm mb-2">{result.fileName}</p>
                  {result.translatedText && (
                    <div className="relative">
                      <pre className="whitespace-pre-wrap font-body text-sm pr-10">{result.translatedText}</pre>
                       <Button
                         variant="ghost"
                         size="icon"
                         onClick={() => copyToClipboard(result.translatedText!)}
                         className="absolute top-0 right-0 h-8 w-8"
                       >
                         <Copy className="h-4 w-4" />
                       </Button>
                    </div>
                  )}
                  {result.error && <p className="text-sm text-destructive">{result.error}</p>}
                  {!result.translatedText && !result.error && <p className="text-sm text-muted-foreground animate-pulse">Processing...</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
