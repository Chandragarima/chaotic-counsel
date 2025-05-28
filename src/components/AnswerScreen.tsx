
import { useState, useEffect } from 'react';
import { Character } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, Home } from 'lucide-react';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { audioManager } from '../utils/audioManager';
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
    
    // Play thinking sound
    audioManager.playSound(theme.sounds.thinking, character.type);
    
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
      
      // Play response sound
      audioManager.playSound(theme.sounds.response, character.type);
    }, thinkingDuration);
  }, [character, question, theme.sounds, character.type]);

  const handleAskAgain = () => {
    setIsAsking(true);
    audioManager.playSound(theme.sounds.select, character.type);
    setTimeout(() => {
      setIsAsking(false);
      onAskAgain();
    }, 150);
  };

  const getPersonalityPrompt = () => {
    switch (character.type) {
      case 'sassy-cat':
        return "The enigmatic feline contemplates your query...";
      case 'wise-owl':
        return "Ancient wisdom stirs in the depths of knowledge...";
      case 'lazy-panda':
        return "Peaceful contemplation flows through tranquil thoughts...";
      case 'anxious-bunny':
        return "Electric energy courses through rapid considerations...";
      case 'quirky-duck':
        return "Whimsical thoughts dance through unconventional pathways...";
      default:
        return "Consulting the universe...";
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme.animations.entrance}`}>
      <PersonalityEffects character={character} />
      
      <div className="relative z-10 p-6 space-y-8">
        {/* Sophisticated Header */}
        <div className="text-center space-y-6 pt-12">
          <div className="space-y-4">
            <h1 className={`text-4xl ${theme.fonts.heading} bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent ${theme.animations.floating}`}>
              {character.name}
            </h1>
            <div className="flex items-center justify-center space-x-6">
              <div className={`w-16 h-px bg-gradient-to-r from-transparent via-${theme.colors.accent.replace('#', '')}/60 to-transparent`}></div>
              <div className={`w-2 h-2 border border-${theme.colors.accent.replace('#', '')}/60 rotate-45 bg-${theme.colors.accent.replace('#', '')}/10 ${theme.animations.floating}`}></div>
              <div className={`w-16 h-px bg-gradient-to-l from-transparent via-${theme.colors.accent.replace('#', '')}/60 to-transparent`}></div>
            </div>
          </div>
          
          <p className={`${theme.colors.text} ${theme.fonts.body} opacity-80 text-lg`}>
            {getPersonalityPrompt()}
          </p>
        </div>

        {/* Question Display */}
        <div className="max-w-2xl mx-auto">
          <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-8 ${theme.colors.glow} shadow-2xl ${theme.animations.cardHover}`}>
            <p className={`${theme.colors.text} text-center ${theme.fonts.body} text-lg leading-relaxed`}>
              "{question}"
            </p>
          </Card>
        </div>

        {/* Character Response */}
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Character Image */}
          <div className="text-center">
            <div className={`w-40 h-40 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border ${theme.effects.borderStyle.replace('border border-', 'border-2 border-')} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : theme.animations.floating}`}>
              {character.image ? (
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl">
                  {character.type === 'sassy-cat' && '😾'}
                  {character.type === 'wise-owl' && '🦉'}
                  {character.type === 'lazy-panda' && '🐼'}
                  {character.type === 'anxious-bunny' && '🐰'}
                  {character.type === 'quirky-duck' && '🦆'}
                </div>
              )}
            </div>
          </div>

          {/* Answer Card */}
          <Card className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-10 ${theme.colors.glow} shadow-2xl ${theme.animations.cardHover}`}>
            {isRevealing ? (
              <div className={`text-center space-y-6 ${theme.animations.thinking}`}>
                <div className={`w-8 h-8 border-2 border-transparent border-t-current rounded-full animate-spin mx-auto ${theme.colors.text}`} style={{ borderTopColor: theme.colors.accent }}></div>
                <p className={`${theme.colors.text} animate-pulse ${theme.fonts.body} text-lg opacity-70`}>
                  {isThinking ? getPersonalityPrompt() : "Weaving threads of destiny..."}
                </p>
              </div>
            ) : (
              <div className={`space-y-6 text-center ${theme.animations.responding}`}>
                <h3 className={`bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent ${theme.fonts.heading} text-xl`}>
                  {character.name} speaks:
                </h3>
                <p className={`${theme.colors.text} text-xl leading-relaxed ${theme.fonts.body}`}>
                  "{answer}"
                </p>
              </div>
            )}
          </Card>

          {/* Sophisticated Action Buttons */}
          {!isRevealing && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerScreen;
