
import { useEffect, useState } from 'react';
import { Sparkles, Star, Crown, Gift, Zap } from 'lucide-react';
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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible && unlockedCharacter) {
      console.log('🎉 Showing celebration for:', unlockedCharacter);
      setShowAnimation(true);
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
      setShowAnimation(false);
    }
  }, [isVisible, unlockedCharacter]);

  if (!isVisible || !unlockedCharacter) return null;

  const character = characters.find(c => c.id === unlockedCharacter);
  if (!character) {
    console.warn('Character not found for celebration:', unlockedCharacter);
    return null;
  }

  const getUnlockMessage = (characterId: string) => {
    switch (characterId) {
      case 'lazy-panda':
        return "2-day streak";
      case 'sneaky-snake':
        return "4-day streak";
      case 'people-pleaser-pup':
        return "7-day streak";
      default:
        return `${character.name} unlocked!`;
    }
  };

  const getCharacterEmoji = (characterId: string) => {
    switch (characterId) {
      case 'lazy-panda': return '🐼';
      case 'sneaky-snake': return '🐍';
      case 'people-pleaser-pup': return '🐕';
      default: return '✨';
    }
  };

  const handleDismiss = () => {
    console.log('🎉 Celebration dismissed for:', unlockedCharacter);
    onDismiss();
  };

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      {/* Subtle fireworks animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-60"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          >
            {i % 4 === 0 && <Sparkles className="h-4 w-4 text-amber-400/70" />}
            {i % 4 === 1 && <Star className="h-3 w-3 text-yellow-300/60" />}
            {i % 4 === 2 && <Zap className="h-4 w-4 text-orange-400/50" />}
            {i % 4 === 3 && <Gift className="h-3 w-3 text-purple-400/60" />}
          </div>
        ))}
      </div>

      <div className={`
        relative max-w-sm w-full mx-4
        bg-gradient-to-br from-slate-900/95 to-slate-800/95
        backdrop-blur-xl border border-amber-400/30 
        rounded-2xl overflow-hidden
        shadow-2xl shadow-amber-400/20
        transition-all duration-700 ease-out
        ${showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/5 pointer-events-none" />
        
        {/* Golden accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="relative p-6 text-center space-y-4">
          {/* Crown icon */}
          <div className={`
            inline-flex items-center justify-center w-16 h-16 mx-auto
            bg-gradient-to-br from-amber-400/20 to-amber-600/30
            border border-amber-400/40 rounded-full
            shadow-lg shadow-amber-400/30
            transition-all duration-1000 ease-out
            ${showContent ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
          `}>
            <Crown className="w-8 h-8 text-amber-400" />
          </div>

          <div className={`
            space-y-3
            transition-all duration-800 ease-out delay-200
            ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <h2 className="text-xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              Congratulations!
            </h2>
            
            <div className="space-y-2">
              <p className="text-base font-medium text-amber-100">
                {getUnlockMessage(unlockedCharacter)} completed
              </p>
              
              <div className="text-3xl">
                {getCharacterEmoji(unlockedCharacter)}
              </div>
              
              <p className="text-amber-200 font-medium">
                You've unlocked the {character.name}!
              </p>
            </div>
          </div>

          {/* CTA button */}
          <div className={`
            pt-2
            transition-all duration-800 ease-out delay-400
            ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <Button 
              onClick={handleDismiss}
              className="
                bg-gradient-to-r from-amber-600 to-amber-500
                hover:from-amber-500 hover:to-amber-400
                text-slate-900 font-bold
                px-6 py-2.5 rounded-xl
                shadow-lg shadow-amber-400/25
                hover:shadow-xl hover:shadow-amber-400/40
                transition-all duration-300 ease-out
                hover:scale-105 active:scale-95
                border border-amber-400/30
                group
              "
            >
              <span className="flex items-center gap-2">
                Continue
                <Sparkles className="w-4 h-4 group-hover:animate-spin transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockCelebration;
