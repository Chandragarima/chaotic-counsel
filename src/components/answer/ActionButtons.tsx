
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Home, Share, Users, MoreHorizontal } from 'lucide-react';
import { Character, AIResponse } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { audioManager } from '../../utils/audioManager';
import ShareModal from '../share/ShareModal';
import CreatePollModal from '../polls/CreatePollModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    setIsAsking(true);
    audioManager.playSound(theme.sounds.select, character.type);
    setTimeout(() => {
      setIsAsking(false);
      onAskAgain();
    }, 150);
  };

  return (
    <>
      <div className={`space-y-4 ${theme.animations.responding}`}>
        {/* Primary Action - Most Important */}
        <Button 
          onClick={handleAskAgain}
          disabled={isAsking}
          className={`w-full min-h-[56px] text-lg transition-all duration-300 bg-gradient-to-r ${theme.colors.primary} hover:${theme.colors.secondary} text-white ${theme.fonts.body} tracking-wide ${theme.colors.glow} shadow-lg hover:shadow-xl ${theme.animations.buttonHover} ${
            isAsking ? 'scale-95 opacity-75' : 'hover:scale-[1.02]'
          }`}
        >
          <RotateCcw className="mr-3 h-5 w-5" />
          Ask {character.name} Again
        </Button>

        {/* Secondary Actions Row */}
        <div className="grid grid-cols-3 gap-3">
          {/* Share Button */}
          <Button 
            onClick={() => setShareModalOpen(true)}
            className="min-h-[48px] transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white ${theme.fonts.body} shadow-lg hover:shadow-xl ${theme.animations.buttonHover} hover:scale-[1.02]"
          >
            <Share className="h-4 w-4" />
          </Button>

          {/* Community Poll Button */}
          <Button 
            onClick={() => setPollModalOpen(true)}
            className="min-h-[48px] transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white ${theme.fonts.body} shadow-lg hover:shadow-xl ${theme.animations.buttonHover} hover:scale-[1.02]"
          >
            <Users className="h-4 w-4" />
          </Button>

          {/* More Options Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className={`min-h-[48px] ${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.fonts.body} transition-all duration-300 ${theme.animations.buttonHover}`}
                variant="ghost"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onBack} className="cursor-pointer">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Questions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onStartOver} className="cursor-pointer">
                <Home className="mr-2 h-4 w-4" />
                Start Over
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
