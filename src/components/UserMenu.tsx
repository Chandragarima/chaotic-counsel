
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, User } from 'lucide-react';
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

  return (
    <TooltipProvider>
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2">
          {/* Streak Display with Tooltip on Desktop */}
          {!isMobile ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-slate-800/90 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 hover:bg-slate-700/90 transition-colors cursor-help">
                  <StreakDisplay />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-slate-800 text-white border-white/20">
                <p className="text-sm">Daily streak - ask questions to maintain it!</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="bg-slate-800/90 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
              <StreakDisplay />
            </div>
          )}
          
          {/* Feedback Button with Tooltip on Desktop */}
          {!isMobile ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <FeedbackTrigger
                  feedbackType="general"
                  variant="inline"
                  className="bg-slate-800/90 backdrop-blur-md hover:bg-slate-700/90 text-white border-white/10 rounded-full px-3 py-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </FeedbackTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-slate-800 text-white border-white/20">
                <p className="text-sm">Share your feedback with us</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <FeedbackTrigger
              feedbackType="general"
              variant="inline"
              className="bg-slate-800/90 backdrop-blur-md hover:bg-slate-700/90 text-white border-white/10 rounded-full px-3 py-2"
            >
              <MessageCircle className="w-4 h-4" />
            </FeedbackTrigger>
          )}
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {!isMobile ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      className="rounded-full bg-slate-800/90 backdrop-blur-md text-white hover:bg-slate-700/90 border border-white/10 w-10 h-10 transition-colors"
                      aria-label="User menu"
                    >
                      <User className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-slate-800 text-white border-white/20">
                    <p className="text-sm">{user ? `${displayName} - Account menu` : 'Sign in to your account'}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Button
                  size="icon"
                  className="rounded-full bg-slate-800/90 backdrop-blur-md text-white hover:bg-slate-700/90 border border-white/10 w-10 h-10"
                  aria-label="User menu"
                >
                  <User className="w-5 h-5" />
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-slate-800/95 text-white backdrop-blur-md rounded-xl border border-white/10"
              sideOffset={8}
            >
              {user && (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-slate-300 truncate">
                    {displayName}
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                </>
              )}
              {user ? (
                <DropdownMenuItem onClick={signOut} className="text-white hover:bg-slate-700/70">
                  Sign Out
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => navigate('/auth')} className="text-white hover:bg-slate-700/70">
                  Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default UserMenu;
