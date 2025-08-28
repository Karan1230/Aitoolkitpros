
"use client";

import { Card, CardContent } from '@/components/ui/card';

export function ImageFaceSwapClient() {
  return (
    <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <iframe
          src="https://jonny001-image-face-swap.hf.space"
          frameBorder="0"
          className="w-full h-[550px]"
        ></iframe>
      </CardContent>
    </Card>
  );
}
