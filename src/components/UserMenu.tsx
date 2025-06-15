
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Menu } from 'lucide-react';
import FeedbackTrigger from './feedback/FeedbackTrigger';
import StreakDisplay from './StreakDisplay';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  username: string | null;
  avatar_url: string | null;
}

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      setProfileLoading(false);
    }
    // eslint-disable-next-line
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    try {
      setProfileLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (!error) {
        // Always set both fields to satisfy UserProfile type, avatar_url is always null
        setProfile({ username: data?.username ?? null, avatar_url: null });
      }
    } finally {
      setProfileLoading(false);
    }
  };

  // Only display username
  const displayName =
    profileLoading
      ? 'Loading...'
      : profile?.username && profile.username.trim() !== ''
        ? profile.username
        : 'AnonymousUser' + Math.floor(Math.random() * 1000);

  // Mobile layout - compact floating menu
  if (isMobile) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {user && (
              <>
                <div className="px-2 py-1.5 flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground truncate">
                    {displayName}
                  </span>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            
            <DropdownMenuItem asChild>
              <FeedbackTrigger 
                feedbackType="general"
                variant="inline"
                className="w-full justify-start"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Feedback
              </FeedbackTrigger>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {user ? (
              <DropdownMenuItem onClick={signOut}>
                Sign Out
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => navigate('/auth')}>
                Sign In
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Desktop layout - compact horizontal layout, no avatar
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <FeedbackTrigger 
          feedbackType="general"
          variant="button"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        />
        <Button 
          onClick={() => navigate('/auth')}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <StreakDisplay />
      
      <FeedbackTrigger 
        feedbackType="general"
        variant="button"
        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
      />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex items-center gap-2"
          >
            <span className="max-w-24 truncate">{displayName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
