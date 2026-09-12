'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '@/lib/firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role: 'admin' | 'user';
}

export interface SavedGeneration {
  id: string;
  userId?: string;
  toolName: string;
  prompt: string;
  result: string;
  createdAt: string;
  updatedAt?: string;
}

interface AuthGuestContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isGuest: boolean;
  savedGenerations: SavedGeneration[];
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  isHistoryModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  openHistoryModal: () => void;
  closeHistoryModal: () => void;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  saveGeneration: (toolName: string, prompt: string, result: string) => Promise<{ success: boolean; id?: string; error?: string }>;
  deleteSavedGeneration: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthGuestContext = createContext<AuthGuestContextType | undefined>(undefined);

async function syncUserProfileDocument(fbUser: FirebaseUser, mappedUser: User) {
  try {
    const userDocRef = doc(db, 'users', fbUser.uid);
    const userSnap = await getDoc(userDocRef);
    const nowIso = new Date().toISOString();

    if (!userSnap.exists()) {
      await setDoc(userDocRef, {
        userId: fbUser.uid,
        email: fbUser.email || '',
        displayName: (mappedUser.name || fbUser.email?.split('@')[0] || 'User').slice(0, 128),
        photoURL: (fbUser.photoURL || '').slice(0, 1024),
        createdAt: nowIso,
        updatedAt: nowIso,
      });
    } else {
      const existingData = userSnap.data();
      const updatePayload: Record<string, string> = {
        updatedAt: nowIso,
      };
      const newDisplayName = (mappedUser.name || fbUser.email?.split('@')[0] || 'User').slice(0, 128);
      if (newDisplayName && newDisplayName !== existingData?.displayName) {
        updatePayload.displayName = newDisplayName;
      }
      const newPhoto = (fbUser.photoURL || '').slice(0, 1024);
      if (newPhoto && newPhoto !== existingData?.photoURL) {
        updatePayload.photoURL = newPhoto;
      }
      await updateDoc(userDocRef, updatePayload);
    }
  } catch (err) {
    try {
      handleFirestoreError(err, OperationType.WRITE, `users/${fbUser.uid}`);
    } catch (e) {
      console.warn('User profile sync error:', e);
    }
  }
}

export function AuthGuestProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedGenerations, setSavedGenerations] = useState<SavedGeneration[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const isAdminUser =
          fbUser.email === 'rk7681761@gmail.com' ||
          fbUser.email?.toLowerCase().includes('admin@aitoolkitpro.in') ||
          false;

        const mappedUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email || '',
          photoURL: fbUser.photoURL || undefined,
          role: isAdminUser ? 'admin' : 'user',
        };

        setUser(mappedUser);
        setIsLoading(false);

        // Ensure user profile document exists or is updated in Firestore
        await syncUserProfileDocument(fbUser, mappedUser);
      } else {
        // Fallback check: local server admin session
        try {
          const res = await fetch('/api/auth/me');
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Real-time synchronization of saved generations with Firestore
  useEffect(() => {
    if (!user) {
      setSavedGenerations([]);
      return;
    }

    // Only attach onSnapshot if user is authenticated with Firebase Auth
    const currentAuthUid = auth.currentUser?.uid;
    if (currentAuthUid && currentAuthUid === user.id) {
      const generationsColPath = `users/${user.id}/generations`;
      const generationsColRef = collection(db, 'users', user.id, 'generations');

      const unsubscribeSnapshot = onSnapshot(
        generationsColRef,
        (snapshot) => {
          const items: SavedGeneration[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            items.push({
              id: data.id || docSnap.id,
              userId: data.userId || user.id,
              toolName: data.toolName || 'AI Tool',
              prompt: data.prompt || '',
              result: data.result || '',
              createdAt: data.createdAt || new Date().toISOString(),
              updatedAt: data.updatedAt,
            });
          });

          // Sort in-memory by newest first
          items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setSavedGenerations(items);

          // Update local cache as backup
          try {
            localStorage.setItem(`user_generations_${user.id}`, JSON.stringify(items));
          } catch {
            // Ignore quota errors
          }
        },
        (error) => {
          try {
            handleFirestoreError(error, OperationType.LIST, generationsColPath);
          } catch (e) {
            console.warn('Generations onSnapshot error, falling back to local cache:', e);
          }

          // Fallback to localStorage on error
          try {
            const stored = localStorage.getItem(`user_generations_${user.id}`);
            if (stored) {
              setSavedGenerations(JSON.parse(stored));
            }
          } catch {
            // Ignore
          }
        }
      );

      return () => unsubscribeSnapshot();
    } else {
      // Local fallback for local server-authenticated session
      try {
        const stored = localStorage.getItem(`user_generations_${user.id}`);
        if (stored) {
          setSavedGenerations(JSON.parse(stored));
        } else {
          setSavedGenerations([]);
        }
      } catch {
        setSavedGenerations([]);
      }
    }
  }, [user]);

  // Google Sign In via Firebase Authentication
  const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      const fbUser = cred.user;

      if (fbUser) {
        const isAdminUser =
          fbUser.email === 'rk7681761@gmail.com' ||
          fbUser.email?.toLowerCase().includes('admin@aitoolkitpro.in') ||
          false;

        const mappedUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email || '',
          photoURL: fbUser.photoURL || undefined,
          role: isAdminUser ? 'admin' : 'user',
        };

        setUser(mappedUser);

        // Sync profile to Firestore
        await syncUserProfileDocument(fbUser, mappedUser);

        setIsAuthModalOpen(false);
        return { success: true };
      }
      return { success: false, error: 'Failed to retrieve Google user credentials' };
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      let errorMsg = 'Google sign-in was canceled or failed';
      if (error?.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign-in popup was closed before completing.';
      } else if (error?.code === 'auth/network-request-failed') {
        errorMsg = 'Network connection issue. Please check your internet and retry.';
      } else if (error?.message) {
        errorMsg = error.message;
      }
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Save tool generation result to Firestore with error handling
  const saveGeneration = async (
    toolName: string,
    prompt: string,
    result: string
  ): Promise<{ success: boolean; id?: string; error?: string }> => {
    if (!user) {
      // If not logged in, prompt user to sign in
      openAuthModal('register');
      return { success: false, error: 'Please sign in to save your generated content.' };
    }

    const id = `gen_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const nowIso = new Date().toISOString();

    const newGeneration: SavedGeneration = {
      id,
      userId: user.id,
      toolName: (toolName || 'AI Tool').slice(0, 128),
      prompt: (prompt || '').slice(0, 10000),
      result: (result || '').slice(0, 50000),
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // Optimistically update UI
    setSavedGenerations((prev) => [newGeneration, ...prev.filter((item) => item.id !== id)]);

    // Write to Firestore if logged in via Firebase
    if (auth.currentUser && auth.currentUser.uid === user.id) {
      const docPath = `users/${user.id}/generations/${id}`;
      try {
        await setDoc(doc(db, 'users', user.id, 'generations', id), newGeneration);
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.CREATE, docPath);
        } catch (e) {
          console.error('Failed to save generation to Firestore:', e);
        }
      }
    }

    // Always keep in local storage as fast cache
    try {
      const cached = [newGeneration, ...savedGenerations.filter((item) => item.id !== id)].slice(0, 100);
      localStorage.setItem(`user_generations_${user.id}`, JSON.stringify(cached));
    } catch {
      // Ignore
    }

    return { success: true, id };
  };

  // Delete saved generation from Firestore
  const deleteSavedGeneration = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };

    // Optimistic UI update
    setSavedGenerations((prev) => prev.filter((item) => item.id !== id));

    if (auth.currentUser && auth.currentUser.uid === user.id) {
      const docPath = `users/${user.id}/generations/${id}`;
      try {
        await deleteDoc(doc(db, 'users', user.id, 'generations', id));
      } catch (error) {
        try {
          handleFirestoreError(error, OperationType.DELETE, docPath);
        } catch (e) {
          console.error('Failed to delete generation from Firestore:', e);
        }
      }
    }

    // Update local storage
    try {
      const updated = savedGenerations.filter((item) => item.id !== id);
      localStorage.setItem(`user_generations_${user.id}`, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    return { success: true };
  };

  const openAuthModal = (mode: 'login' | 'register' = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  // Existing credentials-based login support
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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

  // Existing credentials-based register support
  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
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

  // Sign out from both Firebase and local session
  const logout = async () => {
    try {
      if (auth.currentUser) {
        await signOut(auth);
      }
      await fetch('/api/auth/me', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setUser(null);
      setSavedGenerations([]);
      router.refresh();
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
        isHistoryModalOpen,
        openAuthModal,
        closeAuthModal,
        openHistoryModal,
        closeHistoryModal,
        signInWithGoogle,
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
