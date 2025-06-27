import { Info } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Character } from '../types';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { useIsMobile } from '../hooks/use-mobile';

interface QuestionHelpTooltipProps {
  character: Character;
}

const QuestionHelpTooltip = ({ character }: QuestionHelpTooltipProps) => {
  const theme = getPersonalityTheme(character.type);
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const questionExamples = {
    binary: [
      "Should I ask for a promotion?",
      "Is it time to change careers?",
      "Should I invest in stocks?"
    ],
    advice: [
      "How do I improve my work-life balance?",
      "What's the best way to learn a new skill?",
      "How can I save more money?"
    ],
    recommendation: [
      "What career path should I pursue?",
      "Which investment option is better?",
      "What book would you recommend?"
    ],
    analysis: [
      "Why is diversification important?",
      "Explain the pros and cons of remote work",
      "What are the benefits of meditation?"
    ],
    choice: [
      "MBA or coding bootcamp?",
      "Rent vs buy a house?",
      "Freelancing or full-time job?"
    ]
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip open={isMobile ? isOpen : undefined} onOpenChange={isMobile ? setIsOpen : undefined}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 h-8 w-8 ${theme.colors.text} opacity-50 hover:opacity-80 transition-opacity`}
            onClick={handleClick}
          >
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-sm p-4 bg-slate-900/95 backdrop-blur-sm border border-amber-400/20"
        >
          <div className="space-y-3">
            <h4 className="font-semibold text-amber-400 text-sm">
              How to Ask Effective Questions
            </h4>
            
            <div className="space-y-2 text-xs">
              <div>
                <p className="font-medium text-green-400">✓ Yes/No Decisions:</p>
                <p className="text-slate-300 ml-2">"Should I..." or "Is it time to..."</p>
              </div>
              
              <div>
                <p className="font-medium text-blue-400">📋 Step-by-Step Advice:</p>
                <p className="text-slate-300 ml-2">"How do I..." or "What's the best way to..."</p>
              </div>
              
              <div>
                <p className="font-medium text-purple-400">🎯 Recommendations:</p>
                <p className="text-slate-300 ml-2">"What should I..." or "Which option..."</p>
              </div>
              
              <div>
                <p className="font-medium text-orange-400">🔍 Analysis & Insights:</p>
                <p className="text-slate-300 ml-2">"Why..." or "Explain..."</p>
              </div>
              
              <div>
                <p className="font-medium text-pink-400">⚖️ Compare Options:</p>
                <p className="text-slate-300 ml-2">"X vs Y" or "Between A and B"</p>
              </div>
            </div>
            
            <div className="border-t border-amber-400/20 pt-2">
              <p className="text-xs text-slate-400 italic">
                Be specific for better guidance!
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default QuestionHelpTooltip;
