import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Home, Share, Users } from 'lucide-react';
import { Character, AIResponse } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { audioManager } from '../../utils/audioManager';
import ShareModal from '../share/ShareModal';
import CreatePollModal from '../polls/CreatePollModal';

interface ActionButtonsProps {
  character: Character;
  onBack: () => void;
  onAskAgain: () => void;
  onStartOver: () => void;
  answer?: string;
  aiResponse?: AIResponse | null;
  question?: string;
}

const ActionButtons = ({ 
  character, 
  onBack, 
  onAskAgain, 
  onStartOver, 
  answer, 
  aiResponse, 
  question 
}: ActionButtonsProps) => {
  const [isAsking, setIsAsking] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [pollModalOpen, setPollModalOpen] = useState(false);
  const theme = getPersonalityTheme(character.type);

  const handleAskAgain = () => {
    console.log('ActionButtons handleAskAgain clicked');
    if (isAsking) return; // Prevent multiple clicks
    
    setIsAsking(true);
    
    // Play sound if available
    try {
      audioManager.playSound(theme.sounds.select, character.type);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
    
    // Always call onAskAgain after a short delay
    setTimeout(() => {
      console.log('Calling onAskAgain from ActionButtons');
      setIsAsking(false);
      onAskAgain();
    }, 150);
  };

  return (
    <>
      <div className={`space-y-4 ${theme.animations.responding}`}>
        {/* Community Poll Button */}
        <Button 
          onClick={() => setPollModalOpen(true)}
          className={`w-full min-h-[52px] transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white ${theme.fonts.body} tracking-wide shadow-lg hover:shadow-xl ${theme.animations.buttonHover} hover:scale-[1.02]`}
        >
          <Users className="mr-3 h-4 w-4" />
          Ask the Community
        </Button>

        {/* Share Button */}
        <Button 
          onClick={() => setShareModalOpen(true)}
          className={`w-full min-h-[52px] transition-all duration-300 bg-gradient-to-r ${theme.colors.secondary} hover: ${theme.colors.primary} text-white ${theme.fonts.body} tracking-wide shadow-lg hover:shadow-xl ${theme.animations.buttonHover} hover:scale-[1.02]`}
        >
          <Share className="mr-3 h-4 w-4" />
          Share This Wisdom
        </Button>

        <Button 
          onClick={handleAskAgain}
          disabled={isAsking}
          className={`w-full min-h-[52px] transition-all duration-300 bg-gradient-to-r ${theme.colors.primary} hover:${theme.colors.secondary} text-white ${theme.fonts.body} tracking-wide ${theme.colors.glow} shadow-lg hover:shadow-xl ${theme.animations.buttonHover} ${
            isAsking ? 'scale-95 opacity-75' : 'hover:scale-[1.02]'
          }`}
        >
          {/* <RotateCcw className="mr-3 h-4 w-4" /> */}
          Not Convinced? Try Again!
        </Button>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={onBack}
            variant="ghost"
            className={`${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} min-h-[48px] border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.fonts.body} tracking-wide transition-all duration-300 ${theme.animations.buttonHover}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Consult Again
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

      {/* Share Modal */}
      {question && (
        <ShareModal
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
          character={character}
          question={question}
          answer={answer}
          aiResponse={aiResponse}
        />
      )}

      {/* Create Poll Modal */}
      {question && (
        <CreatePollModal
          open={pollModalOpen}
          onOpenChange={setPollModalOpen}
          character={character}
          question={question}
          answer={answer}
          aiResponse={aiResponse}
        />
      )}
    </>
  );
};

export default ActionButtons;
