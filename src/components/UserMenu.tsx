
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
import { User, MessageCircle, Menu } from 'lucide-react';
import FeedbackTrigger from './feedback/FeedbackTrigger';
import StreakDisplay from './StreakDisplay';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 min-w-[180px]">
            <DropdownMenuItem 
              onClick={() => navigate('/auth')}
              className="text-white hover:bg-slate-700 cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              Sign In
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-white hover:bg-slate-700 p-0">
              <FeedbackTrigger 
                feedbackType="general"
                variant="inline"
                className="w-full justify-start p-2 text-white hover:bg-transparent"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Feedback
              </FeedbackTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <StreakDisplay />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full h-10 w-10 p-0"
          >
            <User className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 min-w-[180px]">
          <DropdownMenuItem disabled className="text-slate-400 font-medium">
            {user.email?.split('@')[0] || 'User'}
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-700" />
          <DropdownMenuItem className="text-white hover:bg-slate-700 p-0">
            <FeedbackTrigger 
              feedbackType="general"
              variant="inline"
              className="w-full justify-start p-2 text-white hover:bg-transparent"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Feedback
            </FeedbackTrigger>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-700" />
          <DropdownMenuItem 
            onClick={signOut}
            className="text-white hover:bg-slate-700 cursor-pointer"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
