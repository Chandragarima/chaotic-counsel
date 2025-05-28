
import { useState, useEffect } from 'react';
import { Character } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Home } from 'lucide-react';
import { getPersonalityTheme } from '../utils/personalityThemes';
import PersonalityEffects from './PersonalityEffects';

interface AnswerScreenProps {
  character: Character;
  question: string;
  onBack: () => void;
  onAskAgain: () => void;
  onStartOver: () => void;
}

const AnswerScreen = ({ character, question, onBack, onAskAgain, onStartOver }: AnswerScreenProps) => {
  const [answer, setAnswer] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const theme = getPersonalityTheme(character.type);

  useEffect(() => {
    setIsThinking(true);
    setIsRevealing(true);
    
    // Personality-specific thinking duration
    const thinkingDuration = character.type === 'lazy-panda' ? 3000 : 
                           character.type === 'anxious-bunny' ? 800 : 
                           character.type === 'wise-owl' ? 2500 : 1500;

    setTimeout(() => {
      setIsThinking(false);
      
      const responses = ['yes', 'no', 'maybe'] as const;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseTexts = character.responses.yesNoMaybe[randomResponse];
      const randomText = responseTexts[Math.floor(Math.random() * responseTexts.length)];
      
      setAnswer(`${randomResponse.toUpperCase()}: ${randomText}`);
      setIsRevealing(false);
    }, thinkingDuration);
  }, [character, question]);

  const handleAskAgain = () => {
    setIsAsking(true);
    setTimeout(() => {
      setIsAsking(false);
      onAskAgain();
    }, 150);
  };

  const getPersonalityPrompt = () => {
    switch (character.type) {
      case 'sassy-cat':
        return "💅 The Sassy Cat flicks her tail dismissively...";
      case 'wise-owl':
        return "🦉 The Wise Owl gazes into the mystical realm...";
      case 'lazy-panda':
        return "🐼 The Lazy Panda slowly opens one eye...";
      case 'anxious-bunny':
        return "🐰 The Anxious Bunny twitches nervously...";
      case 'quirky-duck':
        return "🦆 The Quirky Duck does a little dance...";
      default:
        return "Consulting the universe...";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PersonalityEffects character={character} />
      
      <div className="relative z-10 p-4 space-y-6">
        {/* Personality-themed Header */}
        <div className={`text-center space-y-4 pt-8 ${theme.animations.entrance}`}>
          <h1 className={`text-3xl ${theme.fonts.heading} bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent`}>
            {character.name} Speaks
          </h1>
          <p className={`${theme.colors.text} ${theme.fonts.body}`}>
            {getPersonalityPrompt()}
          </p>
        </div>

        {/* Question Display with theme */}
        <div className="max-w-lg mx-auto">
          <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-6 mb-6 ${theme.colors.glow} shadow-xl`}>
            <p className={`${theme.colors.text} text-center ${theme.fonts.body}`}>
              "{question}"
            </p>
          </Card>
        </div>

        {/* Character Response with themed styling */}
        <div className="max-w-lg mx-auto space-y-6">
          {/* Character Image with personality effects */}
          <div className="text-center">
            <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border-4 ${theme.effects.borderStyle} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : ''}`}>
              {character.image ? (
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {character.type === 'sassy-cat' && '😾'}
                  {character.type === 'wise-owl' && '🦉'}
                  {character.type === 'lazy-panda' && '🐼'}
                  {character.type === 'anxious-bunny' && '🐰'}
                  {character.type === 'quirky-duck' && '🦆'}
                </div>
              )}
            </div>
          </div>

          {/* Answer Card with personality styling */}
          <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-8 ${theme.colors.glow} shadow-2xl`}>
            {isRevealing ? (
              <div className={`text-center space-y-4 ${theme.animations.thinking}`}>
                <div className={`w-8 h-8 border-4 border-transparent border-t-current rounded-full animate-spin mx-auto ${theme.colors.text}`} style={{ borderTopColor: theme.colors.accent }}></div>
                <p className={`${theme.colors.text} animate-pulse ${theme.fonts.body}`}>
                  {isThinking ? getPersonalityPrompt() : "Consulting the mystical realm..."}
                </p>
              </div>
            ) : (
              <div className={`space-y-4 text-center ${theme.animations.responding}`}>
                <h3 className={`bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent ${theme.fonts.heading} text-lg`}>
                  {character.name} says:
                </h3>
                <p className={`${theme.colors.text} text-lg leading-relaxed ${theme.fonts.body}`}>
                  "{answer}"
                </p>
              </div>
            )}
          </Card>

          {/* Action Buttons with personality theming */}
          {!isRevealing && (
            <div className={`space-y-3 ${theme.animations.responding}`}>
              <Button 
                onClick={handleAskAgain}
                disabled={isAsking}
                className={`w-full min-h-[48px] transition-all duration-200 bg-gradient-to-r ${theme.colors.primary} hover:${theme.colors.secondary} text-white font-bold ${theme.colors.glow} shadow-lg hover:shadow-xl ${
                  isAsking ? 'scale-95 opacity-75' : 'hover:scale-105'
                }`}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Ask {character.name} Again
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={onBack}
                  variant="ghost"
                  className={`${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} min-h-[44px] border ${theme.effects.borderStyle.replace('border-2', 'border')}`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                <Button 
                  onClick={onStartOver}
                  variant="ghost"
                  className={`${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} min-h-[44px] border ${theme.effects.borderStyle.replace('border-2', 'border')}`}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerScreen;
