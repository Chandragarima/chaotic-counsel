
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
import { User, MessageCircle } from 'lucide-react';
import FeedbackTrigger from './feedback/FeedbackTrigger';
import StreakDisplay from './StreakDisplay';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <FeedbackTrigger 
          feedbackType="general"
          variant="button"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-sm px-3 py-2"
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
    <div className="flex items-center space-x-2">
      <StreakDisplay />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <User className="h-4 w-4 mr-2" />
            {user.email?.split('@')[0] || 'User'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <FeedbackTrigger 
              feedbackType="general"
              variant="inline"
              className="w-full justify-start p-0 h-auto font-normal"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Feedback
            </FeedbackTrigger>
          </DropdownMenuItem>
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
