'use client';

import React from 'react';

interface TrialGuardProps {
  children: React.ReactNode;
  toolName?: string;
}

export function TrialGuard({ children }: TrialGuardProps) {
  return <>{children}</>;
}

