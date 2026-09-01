'use client';

import React from 'react';
import { TrialGuard } from '@/components/auth/trial-guard';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TrialGuard>
      <section className="min-h-[calc(100vh-4rem)]">
        {children}
      </section>
    </TrialGuard>
  );
}
