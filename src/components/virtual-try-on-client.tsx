
"use client";

import { Card, CardContent } from '@/components/ui/card';

export function VirtualTryOnClient() {
  return (
    <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <iframe
          src="https://kwai-kolors-kolors-virtual-try-on.hf.space"
          frameBorder="0"
          className="w-full h-[600px]"
        ></iframe>
      </CardContent>
    </Card>
  );
}
