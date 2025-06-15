
import { useEffect, useState } from 'react';
import { Sparkles, Star, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { characters } from '../data/characters';
import { Character } from '../types';

interface UnlockCelebrationProps {
  isVisible: boolean;
  unlockedCharacter: string | null;
  onDismiss: () => void;
}

const UnlockCelebration = ({ isVisible, unlockedCharacter, onDismiss }: UnlockCelebrationProps) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowAnimation(true);
    }
  }, [isVisible]);

  if (!isVisible || !unlockedCharacter) return null;

  const character = characters.find(c => c.id === unlockedCharacter);
  if (!character) return null;

  // FIXED: Correct unlock messages for new thresholds
  const getUnlockMessage = (characterId: string) => {
    switch (characterId) {
      case 'lazy-panda':
        return "1-day streak achieved! You've unlocked the Lazy Panda 🐼";
      case 'sneaky-snake':
        return "3-day streak achieved! You've unlocked the Sneaky Snake 🐍";
      case 'people-pleaser-pup':
        return "7-day streak achieved! You've unlocked the People Pleaser Pup 🐕";
      default:
        return `You've unlocked ${character.name}!`;
    }
  };

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 max-w-md w-full text-center border border-amber-400/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 left-4 animate-bounce">
            <Sparkles className="h-6 w-6 text-amber-400" />
          </div>
          <div className="absolute top-8 right-6 animate-bounce delay-300">
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="absolute bottom-6 left-8 animate-bounce delay-500">
            <Flame className="h-5 w-5 text-orange-400" />
          </div>
          <div className="absolute bottom-4 right-4 animate-bounce delay-700">
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          {/* Character image placeholder */}
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 border-2 border-amber-400/50 flex items-center justify-center text-4xl animate-pulse">
            {character.id === 'lazy-panda' && '🐼'}
            {character.id === 'sneaky-snake' && '🐍'}
            {character.id === 'people-pleaser-pup' && '🐕'}
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-amber-100 flex items-center justify-center gap-2">
              <Flame className="h-6 w-6 text-orange-400" />
              Congratulations!
              <Flame className="h-6 w-6 text-orange-400" />
            </h2>
            
            <p className="text-amber-200 text-lg font-medium">
              {getUnlockMessage(unlockedCharacter)}
            </p>
            
            <p className="text-slate-300 text-sm">
              {character.description}
            </p>
          </div>

          <Button 
            onClick={onDismiss}
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Awesome! Let's Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnlockCelebration;
