
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSupabaseProgress } from '../hooks/useSupabaseProgress';
import { supabase } from '@/integrations/supabase/client';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { progress } = useSupabaseProgress();
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Error fetching username:', error);
            setUsername(user.email?.charAt(0).toUpperCase() || 'U');
          } else {
            setUsername(data?.username || user.email?.charAt(0).toUpperCase() || 'U');
          }
        } catch (error) {
          console.error('Error in fetchUsername:', error);
          setUsername(user.email?.charAt(0).toUpperCase() || 'U');
        }
      }
    };

    fetchUsername();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (!user) {
    return (
      <Button
        onClick={() => navigate('/auth')}
        className="bg-slate-800/20 backdrop-blur-md border border-amber-400/20
                 hover:bg-slate-800/30 hover:border-amber-400/40
                 text-amber-100 hover:text-amber-50
                 transition-all duration-300 ease-out
                 hover:scale-105 active:scale-95
                 shadow-lg hover:shadow-xl hover:shadow-amber-400/10
                 rounded-full px-4 py-2"
      >
        Sign In
      </Button>
    );
  }

  const getAvatarFallback = () => {
    if (typeof username === 'string' && username.length > 0) {
      return username.charAt(0).toUpperCase();
    }
    return user.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full p-0
                   bg-slate-800/20 backdrop-blur-md border border-amber-400/20
                   hover:bg-slate-800/30 hover:border-amber-400/40
                   transition-all duration-300 ease-out
                   hover:scale-105 active:scale-95
                   shadow-lg hover:shadow-xl hover:shadow-amber-400/10"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt="Profile" />
            <AvatarFallback className="bg-amber-400/20 text-amber-100 text-sm font-medium">
              {getAvatarFallback()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 mt-2 mr-4
                 bg-slate-800/90 backdrop-blur-md border border-amber-400/20
                 shadow-xl shadow-black/20 rounded-xl"
        align="end"
        forceMount
      >
        <div className="flex items-center justify-start gap-2 p-4">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="text-sm font-medium text-amber-100">
              {username || user.user_metadata?.full_name || user.email}
            </p>
            <p className="text-xs text-amber-200/70">
              {user.email}
            </p>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-amber-400/20" />
        
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-2 px-2 py-1">
            <Award className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-amber-100">
              {progress.streak} day streak
            </span>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-amber-400/20" />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-amber-100 hover:bg-red-500/10 hover:text-red-300 
                   focus:bg-red-500/10 focus:text-red-300 cursor-pointer
                   transition-colors duration-200"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
