
"use client";

import { Card, CardContent } from '@/components/ui/card';

export function AiMusicGeneratorClient() {
  return (
    <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <iframe
          src="https://huggingface.co/spaces/google/MusicFX"
          frameBorder="0"
          className="w-full h-[600px]"
          allow="microphone"
        ></iframe>
      </CardContent>
    </Card>
  );
}
