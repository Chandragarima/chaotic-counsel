
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
import { MessageCircle, User, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);

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

  if (isMobile) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center gap-2">
          {/* Compact Streak Display */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
            <StreakDisplay />
          </div>
          
          {/* Main Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="rounded-full bg-slate-800/90 backdrop-blur-md text-white hover:bg-slate-700/90 border border-white/10 w-10 h-10"
                aria-label="Menu"
              >
                <User className="w-5 h-5" />
              </Button>
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
              <DropdownMenuItem asChild>
                <FeedbackTrigger
                  feedbackType="general"
                  variant="inline"
                  className="w-full justify-start text-white hover:bg-slate-700/70"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Feedback
                </FeedbackTrigger>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
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
    );
  }

  // Desktop: Slide-out menu design
  return (
    <div className="fixed top-6 right-0 z-50">
      <div 
        className={`flex items-center transition-all duration-300 ${
          isExpanded ? 'translate-x-0' : 'translate-x-[calc(100%-3rem)]'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Expanded Menu Content */}
        <div className={`flex items-center gap-3 bg-slate-800/90 backdrop-blur-md rounded-l-2xl border border-white/10 pl-4 pr-2 py-3 transition-opacity duration-200 ${
          isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Compact Streak */}
          <div className="flex items-center gap-2">
            <StreakDisplay />
          </div>
          
          {/* Feedback Button */}
          <FeedbackTrigger
            feedbackType="general"
            variant="inline"
            className="bg-transparent hover:bg-white/10 text-white border-0 px-3 py-1.5 text-sm rounded-lg"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Feedback
          </FeedbackTrigger>
          
          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-transparent hover:bg-white/10 text-white border-0 px-3 py-1.5 text-sm rounded-lg max-w-[120px]"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span className="truncate">{displayName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 bg-slate-800/95 text-white backdrop-blur-md rounded-xl border border-white/10"
                sideOffset={8}
              >
                <DropdownMenuItem onClick={signOut} className="text-white hover:bg-slate-700/70">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate('/auth')}
              variant="ghost"
              size="sm"
              className="bg-transparent hover:bg-white/10 text-white border-0 px-3 py-1.5 text-sm rounded-lg"
            >
              <User className="w-4 h-4 mr-1" />
              Sign In
            </Button>
          )}
        </div>
        
        {/* Slide Tab */}
        <div className="bg-slate-800/90 backdrop-blur-md rounded-r-2xl border border-l-0 border-white/10 px-2 py-3 cursor-pointer">
          <div className="flex items-center justify-center w-6 h-6 text-white/70">
            {isExpanded ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
