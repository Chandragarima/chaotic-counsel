
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Home, Share, Users, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
    setIsAsking(true);
    audioManager.playSound(theme.sounds.select, character.type);
    setTimeout(() => {
      setIsAsking(false);
      onAskAgain();
    }, 150);
  };

  return (
    <>
      <div className={`space-y-6 ${theme.animations.responding}`}>
        {/* Primary Action - Ask Again */}
        <Button 
          onClick={handleAskAgain}
          disabled={isAsking}
          className={`w-full min-h-[56px] transition-all duration-300 bg-gradient-to-r ${theme.colors.primary} hover:${theme.colors.secondary} text-white ${theme.fonts.body} text-lg font-semibold tracking-wide ${theme.colors.glow} shadow-lg hover:shadow-xl ${theme.animations.buttonHover} ${
            isAsking ? 'scale-95 opacity-75' : 'hover:scale-[1.02]'
          }`}
        >
          <RotateCcw className="mr-3 h-5 w-5" />
          Consult {character.name} Again
        </Button>

        {/* Secondary Actions - Sharing & Community */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => setShareModalOpen(true)}
            variant="outline"
            className={`min-h-[48px] transition-all duration-300 ${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} border-2 ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.fonts.body} tracking-wide shadow-md hover:shadow-lg ${theme.animations.buttonHover} hover:scale-[1.02]`}
          >
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>

          <Button 
            onClick={() => setPollModalOpen(true)}
            variant="outline"
            className={`min-h-[48px] transition-all duration-300 ${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} border-2 ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.fonts.body} tracking-wide shadow-md hover:shadow-lg ${theme.animations.buttonHover} hover:scale-[1.02]`}
          >
            <Users className="mr-2 h-4 w-4" />
            Community
          </Button>
        </div>

        {/* Navigation Actions - More Compact */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <Button 
            onClick={onBack}
            variant="ghost"
            size="sm"
            className={`${theme.colors.text} hover:bg-white/10 ${theme.fonts.body} transition-all duration-300`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost"
                size="sm"
                className={`${theme.colors.text} hover:bg-white/10 transition-all duration-300`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
              <DropdownMenuItem 
                onClick={onStartOver}
                className="text-white hover:bg-slate-700 cursor-pointer"
              >
                <Home className="mr-2 h-4 w-4" />
                Begin Anew
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Modals */}
      {question && (
        <>
          <ShareModal
            open={shareModalOpen}
            onOpenChange={setShareModalOpen}
            character={character}
            question={question}
            answer={answer}
            aiResponse={aiResponse}
          />
          <CreatePollModal
            open={pollModalOpen}
            onOpenChange={setPollModalOpen}
            character={character}
            question={question}
            answer={answer}
            aiResponse={aiResponse}
          />
        </>
      )}
    </>
  );
};

export default ActionButtons;
