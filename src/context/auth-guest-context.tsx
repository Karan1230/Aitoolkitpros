'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface SavedGeneration {
  id: string;
  toolName: string;
  prompt: string;
  result: string;
  createdAt: string;
}

interface AuthGuestContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isGuest: boolean;
  savedGenerations: SavedGeneration[];
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  saveGeneration: (toolName: string, prompt: string, result: string) => void;
  deleteSavedGeneration: (id: string) => void;
}

const AuthGuestContext = createContext<AuthGuestContextType | undefined>(undefined);

export function AuthGuestProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedGenerations, setSavedGenerations] = useState<SavedGeneration[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');

  // Check current authentication
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.error('Failed to verify auth:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Load saved generations when user logs in
  useEffect(() => {
    if (user) {
      const storageKey = `user_generations_${user.id}`;
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          setSavedGenerations(JSON.parse(stored));
        } else {
          setSavedGenerations([]);
        }
      } catch (e) {
        setSavedGenerations([]);
      }
    } else {
      setSavedGenerations([]);
    }
  }, [user]);

  const saveGeneration = (toolName: string, prompt: string, result: string) => {
    if (!user) return;
    const newItem: SavedGeneration = {
      id: `gen_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      toolName,
      prompt,
      result,
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...savedGenerations].slice(0, 100);
    setSavedGenerations(updated);
    try {
      localStorage.setItem(`user_generations_${user.id}`, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist generation', e);
    }
  };

  const deleteSavedGeneration = (id: string) => {
    if (!user) return;
    const updated = savedGenerations.filter(item => item.id !== id);
    setSavedGenerations(updated);
    try {
      localStorage.setItem(`user_generations_${user.id}`, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update storage', e);
    }
  };

  const openAuthModal = (mode: 'login' | 'register' = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Network error' };
    }
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, error: data.error || 'Registration failed' };
    } catch (e: any) {
      return { success: false, error: e.message || 'Network error' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'POST' });
      setUser(null);
      setSavedGenerations([]);
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <AuthGuestContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        isLoading,
        isGuest: !user,
        savedGenerations,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        saveGeneration,
        deleteSavedGeneration,
      }}
    >
      {children}
    </AuthGuestContext.Provider>
  );
}

export function useAuthGuest() {
  const context = useContext(AuthGuestContext);
  if (!context) {
    throw new Error('useAuthGuest must be used within an AuthGuestProvider');
  }
  return context;
}
