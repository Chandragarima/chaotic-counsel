import { useState, useEffect } from 'react';
import { supabase, testSupabaseConnection } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { IS_AUTH_ENABLED } from '@/config/features';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if auth is disabled or already authenticated
  useEffect(() => {
    if (!IS_AUTH_ENABLED) {
      navigate('/');
      return;
    }
    
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Test connection on mount (development only) - skip if auth is disabled
  useEffect(() => {
    if (!IS_AUTH_ENABLED) return;
    
    if (import.meta.env.DEV) {
      testSupabaseConnection().then((result) => {
        if (!result.success) {
          console.warn('⚠️ Supabase connection test failed:', result);
          toast({
            title: "Connection Warning",
            description: "Unable to connect to Supabase. Check console for details.",
            variant: "destructive",
          });
        } else {
          console.log('✅ Supabase connection test passed');
        }
      });
    }
  }, [toast]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't allow auth if feature is disabled
    if (!IS_AUTH_ENABLED) {
      toast({
        title: "Authentication Disabled",
        description: "Authentication is currently disabled.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    
    setLoading(true);

    try {
      // Log connection details for debugging
      console.log('🔐 Attempting authentication...');
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL || 'Using fallback');
      console.log('Has anon key:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      if (isLogin) {
        console.log('📝 Signing in with email:', email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log('Sign in response:', { 
          hasData: !!data, 
          hasUser: !!data?.user,
          hasSession: !!data?.session,
          error: error ? {
            message: error.message,
            status: error.status,
            name: error.name
          } : null
        });
        
        if (error) {
          console.error('❌ Sign in error:', error);
          throw error;
        }
        
        console.log('✅ Sign in successful');
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        console.log('📝 Signing up with email:', email);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        console.log('Sign up response:', { 
          hasData: !!data, 
          hasUser: !!data?.user,
          hasSession: !!data?.session,
          error: error ? {
            message: error.message,
            status: error.status,
            name: error.name
          } : null
        });
        
        if (error) {
          console.error('❌ Sign up error:', error);
          throw error;
        }
        
        console.log('✅ Sign up successful');
        toast({
          title: "Account created!",
          description: "Ask your first question and unleash the fun.",
        });
      }
      navigate('/');
    } catch (error: any) {
      console.error('🚨 Authentication error caught:', {
        message: error?.message,
        status: error?.status,
        name: error?.name,
        stack: error?.stack
      });
      
      // Provide more detailed error messages
      let errorMessage = error?.message || 'An unknown error occurred';
      if (error?.status === 400) {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (error?.status === 429) {
        errorMessage = 'Too many requests. Please try again later.';
      } else if (error?.message?.includes('network') || error?.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  // Don't render auth page if auth is disabled
  if (!IS_AUTH_ENABLED) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Sign in to continue your chaotic journey' 
              : 'Join the community of wisdom seekers'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailAuth} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="text-sm text-muted-foreground"
            >
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
