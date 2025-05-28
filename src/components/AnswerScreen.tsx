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

  // Function to detect and handle "or" questions
  const handleOrQuestion = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    // Check if it's a cuisine question
    if (lowerQuestion.includes('cuisine') || lowerQuestion.includes('food type')) {
      const cuisines = ['Italian', 'Thai', 'Mexican', 'Japanese', 'Indian', 'Chinese', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek'];
      const randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)];
      return formatPersonalityAnswer(randomCuisine, 'choice');
    }
    
    // Check if it's a dinner/meal question
    if (lowerQuestion.includes('dinner') || lowerQuestion.includes('meal') || lowerQuestion.includes('eat tonight')) {
      const meals = ['Pizza', 'Sushi', 'Tacos', 'Pasta', 'Ramen', 'Burgers', 'Poke Bowl', 'Stir Fry', 'Sandwich', 'Salad'];
      const randomMeal = meals[Math.floor(Math.random() * meals.length)];
      return formatPersonalityAnswer(randomMeal, 'choice');
    }
    
    // Handle general "or" questions
    if (lowerQuestion.includes(' or ')) {
      const orIndex = lowerQuestion.indexOf(' or ');
      const beforeOr = question.substring(0, orIndex).trim();
      const afterOr = question.substring(orIndex + 4).trim();
      
      // Extract options more intelligently
      let options = [];
      
      // Simple split on "or" and clean up
      const parts = question.split(/\s+or\s+/i);
      if (parts.length >= 2) {
        // Clean up the first option (remove question words)
        const firstOption = parts[0].replace(/^(should i|do i|can i|will i|shall i|would i)\s+/i, '').trim();
        options.push(firstOption);
        
        // Add remaining options
        for (let i = 1; i < parts.length; i++) {
          options.push(parts[i].replace(/\?$/, '').trim());
        }
        
        const randomOption = options[Math.floor(Math.random() * options.length)];
        return formatPersonalityAnswer(randomOption, 'choice');
      }
    }
    
    return null;
  };

  // Format answer based on character personality
  const formatPersonalityAnswer = (choice: string, type: 'choice' | 'yesno') => {
    switch (character.type) {
      case 'sassy-cat':
        return type === 'choice' 
          ? `Obviously ${choice}. I can't believe you needed me to tell you that.`
          : `${choice.toUpperCase()}: Obviously. Were you even paying attention?`;
      case 'wise-owl':
        return type === 'choice'
          ? `The ancient wisdom speaks: ${choice} calls to your soul.`
          : `The cosmos whispers: ${choice}`;
      case 'lazy-panda':
        return type === 'choice'
          ? `*stretches lazily* Go with ${choice}. It sounds chill enough.`
          : `*yawn* ${choice}... whatever requires less effort.`;
      case 'anxious-bunny':
        return type === 'choice'
          ? `${choice.toUpperCase()}! Wait, are you sure? Actually yes, ${choice}! Quick decision!`
          : `${choice}! But what if we're wrong?! Actually stick with ${choice}!`;
      case 'quirky-duck':
        return type === 'choice'
          ? `*quacks mysteriously* The universe says... ${choice}! But only if you do it backwards!`
          : `Quack! ${choice}! The rubber ducks have spoken!`;
      default:
        return `${choice}`;
    }
  };

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
      
      // First check if it's an "or" question or specific type question
      const orAnswer = handleOrQuestion(question);
      
      let formattedAnswer = '';
      
      if (orAnswer) {
        formattedAnswer = orAnswer;
      } else {
        // Regular yes/no/maybe logic for other questions
        const responses = ['yes', 'no', 'maybe'] as const;
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseTexts = character.responses.yesNoMaybe[randomResponse];
        
        // Get a truly random response from the expanded array
        const randomIndex = Math.floor(Math.random() * responseTexts.length);
        const randomText = responseTexts[randomIndex];
        
        // Format response based on character personality
        switch (character.type) {
          case 'sassy-cat':
            formattedAnswer = `${randomResponse.toUpperCase()}: ${randomText}`;
            break;
          case 'wise-owl':
            formattedAnswer = `The ancient wisdom speaks: ${randomText}`;
            break;
          case 'lazy-panda':
            formattedAnswer = `*stretches lazily* ${randomText}`;
            break;
          case 'anxious-bunny':
            formattedAnswer = `*twitches nervously* ${randomText}`;
            break;
          case 'quirky-duck':
            formattedAnswer = `*quacks mysteriously* ${randomText}`;
            break;
          default:
            formattedAnswer = `${randomResponse.toUpperCase()}: ${randomText}`;
        }
      }
      
      setAnswer(formattedAnswer);
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
