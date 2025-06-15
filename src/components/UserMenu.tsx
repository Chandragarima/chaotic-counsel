
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

  // Modern glassmorphic card, vertical on desktop, floating bar on mobile
  // z-50 to stay on top, with shadow/glass, pointer-events for safety, gap-2/gap-3 for rhythm
  const floatingMenuClasses =
    "fixed top-6 right-8 z-50 flex flex-col items-end gap-3 p-4 min-w-[175px] " +
    "rounded-2xl bg-slate-900/60 bg-gradient-to-br from-slate-700/80 to-slate-800/70 " +
    "backdrop-blur-lg shadow-xl border border-white/10 pointer-events-auto " +
    "transition-all duration-300";

  // Compact bottom floating bar for mobile
  const mobileBarClasses =
    "fixed bottom-2 left-1/2 z-50 flex flex-row justify-center items-center gap-2 px-3 py-2 " +
    "rounded-2xl bg-slate-900/70 backdrop-blur-lg shadow-2xl border border-white/10 " +
    "transform -translate-x-1/2 pointer-events-auto w-auto";

  if (isMobile) {
    return (
      <div className={mobileBarClasses}>
        <Button
          size="icon"
          className="rounded-full bg-transparent text-yellow-200 hover:bg-white/10"
          aria-label="Show streak"
          tabIndex={0}
        >
          <StreakDisplay />
        </Button>
        <FeedbackTrigger
          feedbackType="general"
          variant="inline"
          className="rounded-full px-3 text-base text-white bg-transparent hover:bg-white/10"
        >
          <MessageCircle className="w-5 h-5 mr-1" />
        </FeedbackTrigger>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="rounded-full bg-transparent text-white hover:bg-white/10"
              aria-label="Profile menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 z-[80] bg-slate-800/90 text-white backdrop-blur-md rounded-2xl"
            sideOffset={8}
          >
            {user && (
              <>
                <div className="px-2 py-2 flex items-center gap-2">
                  <span className="text-base font-medium text-muted-foreground truncate">{displayName}</span>
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
              <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => navigate('/auth')}>Sign In</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // DESKTOP: glassmorphic card, vertical stacking, floating
  return (
    <div className={floatingMenuClasses}>
      <div className="w-full mb-1">
        <StreakDisplay />
      </div>
      <FeedbackTrigger
        feedbackType="general"
        variant="button"
        className="w-full rounded-xl border-0 bg-transparent text-white font-semibold text-base hover:bg-slate-700/50 py-2"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Feedback
      </FeedbackTrigger>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full flex justify-between items-center rounded-xl border-0 bg-slate-800/70 text-white text-base font-normal hover:bg-slate-700/60 py-2 truncate"
              tabIndex={0}
            >
              <span className="truncate max-w-[90px]">{displayName}</span>
              <Menu className="w-4 h-4 ml-2 text-slate-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 z-[80] bg-slate-800/95 text-white backdrop-blur-xl rounded-2xl"
            sideOffset={8}
          >
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => navigate('/auth')}
          variant="outline"
          size="sm"
          className="w-full rounded-xl border-0 bg-slate-800/80 text-white font-normal text-base hover:bg-slate-700/50 py-2"
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default UserMenu;

