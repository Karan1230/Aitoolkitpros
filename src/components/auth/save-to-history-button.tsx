'use client';

import React, { useState } from 'react';
import { useAuthGuest } from '@/context/auth-guest-context';
import { Button } from '@/components/ui/button';
import { Bookmark, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SaveToHistoryButtonProps {
  toolName: string;
  prompt: string;
  result: string;
  className?: string;
  variant?: 'outline' | 'default' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function SaveToHistoryButton({
  toolName,
  prompt,
  result,
  className = '',
  variant = 'outline',
  size = 'sm',
}: SaveToHistoryButtonProps) {
  const { user, saveGeneration, openAuthModal, openHistoryModal } = useAuthGuest();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!result || result.trim().length === 0) return;

    if (!user) {
      toast({
        title: 'Sign in to save content',
        description: 'Sign in with Google to automatically save your AI generations to the cloud.',
      });
      openAuthModal('register');
      return;
    }

    setIsSaving(true);
    const res = await saveGeneration(toolName, prompt, result);
    setIsSaving(false);

    if (res.success) {
      setIsSaved(true);
      toast({
        title: 'Saved to cloud history! ☁️',
        description: `Your ${toolName} output has been saved to your account.`,
        action: (
          <Button variant="outline" size="sm" onClick={openHistoryModal} className="text-xs h-7">
            View History
          </Button>
        ),
      });
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      toast({
        variant: 'destructive',
        title: 'Could not save',
        description: res.error || 'Failed to save generation.',
      });
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleSave}
      disabled={isSaving || !result}
      className={`text-xs gap-1.5 font-medium transition-all ${className}`}
      title={user ? 'Save to your cloud history' : 'Sign in to save this to your account'}
    >
      {isSaving ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Saving...</span>
        </>
      ) : isSaved ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-emerald-500 font-semibold">Saved to Cloud</span>
        </>
      ) : (
        <>
          <Bookmark className="h-3.5 w-3.5 text-primary" />
          <span>Save to Account</span>
        </>
      )}
    </Button>
  );
}
