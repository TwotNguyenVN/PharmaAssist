'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { authService, UserProfile } from '@/lib/auth-service';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (allowedRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user session on startup
  useEffect(() => {
    async function loadSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          // Fetch user profile and roles from NestJS Backend
          const profile = await authService.getMe();
          setUser(profile);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error loading session:', error);
        setUser(null);
        // If profile fetch fails, clean up Supabase session
        await supabase.auth.signOut();
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        router.push('/login');
      } else if (event === 'SIGNED_IN' && session) {
        try {
          const profile = await authService.getMe();
          setUser(profile);
        } catch (error) {
          console.error('Error getting profile on auth state change:', error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      // Log in the frontend Supabase client so its session is updated
      await supabase.auth.setSession({
        access_token: response.accessToken,
        refresh_token: response.refreshToken,
      });

      setUser(response.user);
      router.push('/dashboard');
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (allowedRoles: string[]) => {
    if (!user || !user.roles) return false;
    return user.roles.some(role => allowedRoles.includes(role));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
