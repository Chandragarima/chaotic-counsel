
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
        setProfile({ username: data?.username ?? null, avatar_url: null });
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const displayName =
    profileLoading
      ? 'Loading...'
      : profile?.username && profile.username.trim() !== ''
        ? profile.username
        : 'AnonymousUser' + Math.floor(Math.random() * 1000);

  // --- Universal styling for alignment and safety from title ---
  // Use a flex container, always anchored top-right and with responsive gaps/margins,
  // wrapping at small screens, with max-w and z-index.
  const userMenuContainerClasses =
    "fixed md:absolute top-2 md:top-4 right-2 md:right-4 z-50 " +
    "flex flex-row flex-wrap items-center gap-x-2 gap-y-1 md:gap-x-3 " +
    "max-w-full sm:max-w-[95vw] justify-end pointer-events-auto " +
    "md:bg-transparent bg-slate-700/90 md:backdrop-blur-none backdrop-blur " +
    "rounded-xl p-1 md:p-0 shadow-none";

  // On mobile, always show streak + menu.
  if (isMobile) {
    return (
      <div className={userMenuContainerClasses}>
        <StreakDisplay />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="sm"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end"
            className="w-48 z-[80] bg-slate-800 text-white"
            sideOffset={8}
          >
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

  // Desktop: flex row, always safely far right, but never covers site title area.
  if (!user) {
    return (
      <div className={userMenuContainerClasses}>
        <StreakDisplay />
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
    <div className={userMenuContainerClasses}>
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
        <DropdownMenuContent 
          align="end"
          className="z-[80] bg-slate-800 text-white"
          sideOffset={8}
        >
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

