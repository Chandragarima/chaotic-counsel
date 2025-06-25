
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
    if (isVisible) {
      setShowAnimation(true);
      // Stagger the content animation
      setTimeout(() => setShowContent(true), 300);
    } else {
      setShowContent(false);
      setShowAnimation(false);
    }
  }, [isVisible]);

  if (!isVisible || !unlockedCharacter) return null;

  const character = characters.find(c => c.id === unlockedCharacter);
  if (!character) return null;

  const getUnlockMessage = (characterId: string) => {
    switch (characterId) {
      case 'lazy-panda':
        return "2-day streak reached! You've unlocked the Lazy Panda 🐼";
      case 'sneaky-snake':
        return "4-day streak reached! You've unlocked the Sneaky Snake 🐍";
      case 'people-pleaser-pup':
        return "7-day streak reached! You've unlocked the People Pleaser Pup 🐕";
      default:
        return `You've unlocked ${character.name}!`;
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

  if (!showAnimation) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Sparkles className="h-8 w-8 text-amber-400/60 animate-pulse" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <Star className="h-6 w-6 text-yellow-300/50 animate-pulse" />
        </div>
        <div className="absolute bottom-1/3 left-1/6 animate-float" style={{ animationDelay: '2s' }}>
          <Zap className="h-7 w-7 text-orange-400/40 animate-pulse" />
        </div>
        <div className="absolute bottom-1/4 right-1/6 animate-float" style={{ animationDelay: '0.5s' }}>
          <Gift className="h-6 w-6 text-purple-400/50 animate-pulse" />
        </div>
      </div>

      <div className={`
        relative max-w-lg w-full mx-4
        bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95
        backdrop-blur-xl border border-amber-400/30 
        rounded-3xl overflow-hidden
        shadow-2xl shadow-amber-400/20
        transition-all duration-700 ease-out
        ${showAnimation ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Premium gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/10 pointer-events-none" />
        
        {/* Golden accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="relative p-8 text-center space-y-6">
          {/* Crown icon with glow effect */}
          <div className={`
            inline-flex items-center justify-center w-20 h-20 mx-auto
            bg-gradient-to-br from-amber-400/20 to-amber-600/30
            border-2 border-amber-400/40 rounded-full
            shadow-lg shadow-amber-400/30
            transition-all duration-1000 ease-out
            ${showContent ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}
          `}>
            <Crown className="w-10 h-10 text-amber-400 drop-shadow-lg" />
          </div>

          {/* Character avatar with sophisticated styling */}
          <div className={`
            inline-flex items-center justify-center w-24 h-24 mx-auto
            bg-gradient-to-br from-slate-700/50 to-slate-800/50
            border-2 border-amber-400/30 rounded-full
            shadow-xl shadow-black/20
            text-5xl
            transition-all duration-1000 ease-out delay-200
            ${showContent ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
          `}>
            {getCharacterEmoji(unlockedCharacter)}
          </div>

          {/* Content with staggered animations */}
          <div className={`
            space-y-4
            transition-all duration-800 ease-out delay-400
            ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
              Congratulations!
            </h2>
            
            <div className="space-y-3">
              <p className="text-lg font-semibold text-amber-100 leading-relaxed">
                {getUnlockMessage(unlockedCharacter)}
              </p>
              
              <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                {character.description}
              </p>
            </div>

            {/* Premium info card */}
            <div className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm border border-amber-400/20 rounded-xl p-4 mx-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-amber-200 text-sm font-medium">Premium Feature</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Your progress is automatically saved. All unlocked characters remain available even after breaks.
              </p>
            </div>
          </div>

          {/* Enhanced CTA button */}
          <div className={`
            pt-2
            transition-all duration-800 ease-out delay-600
            ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <Button 
              onClick={onDismiss}
              className="
                relative overflow-hidden
                bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600
                hover:from-amber-500 hover:via-amber-400 hover:to-amber-500
                text-slate-900 font-bold text-lg
                px-8 py-4 rounded-2xl
                shadow-xl shadow-amber-400/25
                hover:shadow-2xl hover:shadow-amber-400/40
                transition-all duration-300 ease-out
                hover:scale-105 active:scale-95
                border border-amber-400/30
                group
              "
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's Continue
                <Sparkles className="w-5 h-5 group-hover:animate-spin transition-transform duration-300" />
              </span>
              
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UnlockCelebration;
