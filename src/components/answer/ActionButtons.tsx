
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Home } from 'lucide-react';
import { Character } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { audioManager } from '../../utils/audioManager';

interface ActionButtonsProps {
  character: Character;
  onBack: () => void;
  onAskAgain: () => void;
  onStartOver: () => void;
}

const ActionButtons = ({ character, onBack, onAskAgain, onStartOver }: ActionButtonsProps) => {
  const [isAsking, setIsAsking] = useState(false);
  const theme = getPersonalityTheme(character.type);

  const handleAskAgain = () => {
    setIsAsking(true);
    audioManager.playSound(theme.sounds.select, character.type);
    setTimeout(() => {
      setIsAsking(false);
      onAskAgain();
    }, 150);
  };

  return (
    <div className={`space-y-4 ${theme.animations.responding}`}>
      <Button 
        onClick={handleAskAgain}
        disabled={isAsking}
        className={`w-full min-h-[52px] transition-all duration-300 bg-gradient-to-r ${theme.colors.primary} hover:${theme.colors.secondary} text-white ${theme.fonts.body} tracking-wide ${theme.colors.glow} shadow-lg hover:shadow-xl ${theme.animations.buttonHover} ${
          isAsking ? 'scale-95 opacity-75' : 'hover:scale-[1.02]'
        }`}
      >
        <RotateCcw className="mr-3 h-4 w-4" />
        Consult {character.name} Again
      </Button>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={onBack}
          variant="ghost"
          className={`${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} min-h-[48px] border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.fonts.body} tracking-wide transition-all duration-300 ${theme.animations.buttonHover}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return
        </Button>
        
        <Button 
          onClick={onStartOver}
          variant="ghost"
          className={`${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} min-h-[48px] border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.fonts.body} tracking-wide transition-all duration-300 ${theme.animations.buttonHover}`}
        >
          <Home className="mr-2 h-4 w-4" />
          Begin Anew
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
