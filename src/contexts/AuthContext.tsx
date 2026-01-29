import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { IS_AUTH_ENABLED } from '@/config/features';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If authentication is disabled, skip all Supabase auth calls
    if (!IS_AUTH_ENABLED) {
      console.log('🚫 Authentication disabled - skipping Supabase auth initialization');
      setUser(null);
      setSession(null);
      setLoading(false);
      return;
    }
    
    console.log('🔐 AuthContext: Initializing auth state...');
    
    // Set up auth state listener
    const { data: { subscription }, error: listenerError } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔔 Auth state changed:', {
          event,
          hasSession: !!session,
          userEmail: session?.user?.email,
          userId: session?.user?.id
        });
        
        // Clear progress cache when user signs out
        if (event === 'SIGNED_OUT') {
          console.log('🚪 User signed out, clearing cache');
          // Clear any cached progress data
          if (typeof window !== 'undefined') {
            localStorage.removeItem('chaotic-counsel-progress');
          }
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    if (listenerError) {
      console.error('❌ Error setting up auth state listener:', listenerError);
    }

    // Check for existing session
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.error('❌ Error getting session:', error);
        } else {
          console.log('📋 Initial session check:', {
            hasSession: !!session,
            userEmail: session?.user?.email,
            userId: session?.user?.id
          });
        }
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('❌ Exception getting session:', error);
        setLoading(false);
      });

    return () => {
      console.log('🔐 AuthContext: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (!IS_AUTH_ENABLED) {
      setUser(null);
      setSession(null);
      return;
    }
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
