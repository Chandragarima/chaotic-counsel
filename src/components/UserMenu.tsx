
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
import { useIsMobile } from '@/hooks/use-mobile';

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  {user.email?.split('@')[0] || 'User'}
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

  // Desktop layout - original horizontal layout but more compact
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
