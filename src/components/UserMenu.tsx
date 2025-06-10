
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

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
    <div className="flex items-center space-x-2">
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
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <User className="h-4 w-4 mr-2" />
            {user.email?.split('@')[0] || 'User'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={signOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
