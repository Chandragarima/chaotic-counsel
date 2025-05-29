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

  // Improved random selection to avoid patterns
  const getRandomChoice = <T extends any>(array: readonly T[]): T => {
    // Use crypto.getRandomValues for better randomness if available
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);
      return array[randomArray[0] % array.length];
    }
    // Fallback to Math.random with additional entropy
    const entropy = Date.now() % 1000 + Math.random() * 1000;
    return array[Math.floor(entropy) % array.length];
  };

  // Function to detect and handle "or" questions
  const handleOrQuestion = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    // Check if it's a cuisine question
    if (lowerQuestion.includes('cuisine') || lowerQuestion.includes('food type')) {
      const cuisines = ['Italian', 'Thai', 'Mexican', 'Japanese', 'Indian', 'Chinese', 'Mediterranean', 'Korean', 'Vietnamese', 'Greek', 'French', 'Lebanese', 'Brazilian', 'Ethiopian', 'Moroccan'];
      const randomCuisine = getRandomChoice(cuisines);
      return formatPersonalityAnswer(randomCuisine, 'choice');
    }
    
    // Check if it's a dinner/meal question
    if (lowerQuestion.includes('dinner') || lowerQuestion.includes('meal') || lowerQuestion.includes('eat tonight')) {
      const meals = ['Pizza', 'Sushi', 'Tacos', 'Pasta', 'Ramen', 'Burgers', 'Poke Bowl', 'Stir Fry', 'Sandwich', 'Salad', 'Curry', 'Dumplings', 'Pho', 'Bibimbap', 'Shawarma'];
      const randomMeal = getRandomChoice(meals);
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
        
        const randomOption = getRandomChoice(options);
        return formatPersonalityAnswer(randomOption, 'choice');
      }
    }
    
    return null;
  };

  // Format answer based on character personality with multiple templates
  const formatPersonalityAnswer = (choice: string, type: 'choice' | 'yesno') => {
    switch (character.type) {
      case 'sassy-cat':
        if (type === 'choice') {
          const choiceTemplates = [
            `Obviously ${choice}. I can't believe you needed me to tell you that.`,
            `Seriously? ${choice}? That's... actually not terrible. Shocking.`,
            `${choice.toUpperCase()} it is. At least you didn't pick something completely tragic.`,
            `Oh honey, ${choice}? How wonderfully... predictable.`,
            `*eye roll* ${choice}. Because apparently I have to make ALL your decisions.`,
            `${choice.toUpperCase()}? Fine. But don't blame me when you're hungry again in an hour.`,
            `${choice}? Ugh, FINE. I suppose your taste could be worse.`,
            `Obviously ${choice}. Even you can't mess this one up.`,
            `${choice.toUpperCase()}: The only choice that won't make me lose faith in humanity.`,
            `*sigh* ${choice}. Try not to fall asleep halfway through... again.`,
            `${choice}? Wow. Color me... mildly impressed.`,
            `${choice}? Revolutionary. Truly groundbreaking stuff here.`,
            `Obviously ${choice}. I literally cannot with your indecisiveness.`,
            `${choice.toUpperCase()}: Because apparently I'm your personal life coach now.`,
            `Oh please, ${choice}. Like there was any other option.`,
            `${choice}? *chef's kiss* Finally, some decent judgment.`,
            `${choice}? Well well well... look who's making grown-up decisions.`,
            `Obviously ${choice}. Next question... if you have the brain cells for it.`,
            `${choice.toUpperCase()}: Not completely awful. I'm almost proud.`,
            `*slow clap* ${choice}. Took you long enough to figure that out.`,
            `${choice}? Acceptable. Barely. But I'll allow it.`,
            `Oh sweetie, ${choice}? How delightfully... basic.`
          ];
          return getRandomChoice(choiceTemplates);
        } else {
          const yesNoTemplates = [
            `${choice.toUpperCase()}: Obviously. Were you even paying attention?`,
            `${choice.toUpperCase()}: Because I said so, that's why.`,
            `${choice.toUpperCase()}: *dramatic sigh* Next question.`,
            `${choice.toUpperCase()}: I don't repeat myself, darling.`,
            `${choice.toUpperCase()}: Finally, a decent question.`,
            `${choice.toUpperCase()}: You're welcome for my wisdom.`,
            `${choice.toUpperCase()}: Try to keep up, sweetie.`
          ];
          return getRandomChoice(yesNoTemplates);
        }
        
      case 'wise-owl':
        if (type === 'choice') {
          const choiceTemplates = [
            `The ancient wisdom speaks: ${choice} calls to your soul.`,
            `In the cosmic dance of choice, ${choice} emerges as your destiny.`,
            `The universe whispers through the wind: ${choice} is your path.`,
            `Ancient spirits guide you toward ${choice}, dear seeker.`,
            `The celestial signs point clearly to ${choice}.`,
            `In meditation's silence, ${choice} reveals itself as truth.`,
            `The harmony of all things suggests ${choice} as your way.`,
            `Through the mists of possibility, ${choice} shines brightest.`,
            `The eternal wisdom of ages proclaims ${choice} as fitting.`,
            `In the tapestry of fate, ${choice} weaves itself into your story.`,
            `The sacred balance of the universe leans toward ${choice}.`,
            `Ancient knowledge flows like water toward ${choice}.`
          ];
          return getRandomChoice(choiceTemplates);
        } else {
          const yesNoTemplates = [
            `The cosmos whispers: ${choice}`,
            `Ancient wisdom declares: ${choice}`,
            `The celestial spheres align to say: ${choice}`,
            `Through mystic contemplation: ${choice}`,
            `The eternal truth reveals: ${choice}`,
            `In the silence of ages: ${choice}`,
            `The universe's gentle voice: ${choice}`
          ];
          return getRandomChoice(yesNoTemplates);
        }
        
      case 'lazy-panda':
        if (type === 'choice') {
          const choiceTemplates = [
            `*stretches lazily* Go with ${choice}. It sounds chill enough.`,
            `*yawn* ${choice} works. Whatever requires less effort.`,
            `${choice}, I guess. Can we nap after deciding?`,
            `*rolls over* ${choice}. But only if it doesn't involve standing.`,
            `${choice} sounds... *yawn* ...comfortable enough.`,
            `*sleepy mumble* ${choice}. Now can I go back to sleep?`,
            `${choice}. But let's do it the lazy way.`,
            `*stretches* ${choice} it is. Minimal effort required, right?`,
            `${choice}... *nods sleepily* ...that works.`,
            `*cozy sigh* ${choice}. Perfect for a chill day.`,
            `${choice}. Just promise me we can be comfy about it.`,
            `*lazy smile* ${choice}. Good choice for maximum relaxation.`
          ];
          return getRandomChoice(choiceTemplates);
        } else {
          const yesNoTemplates = [
            `*yawn* ${choice}... whatever requires less effort.`,
            `*sleepy nod* ${choice}. Can I nap now?`,
            `*stretches* ${choice}. But comfortably.`,
            `*drowsy mumble* ${choice}... *snooze*`,
            `*cozy sigh* ${choice}. From the couch.`,
            `*lazy wave* ${choice}. Now, naptime.`,
            `*yawn* ${choice}. The path of least resistance.`
          ];
          return getRandomChoice(yesNoTemplates);
        }
        
      case 'anxious-bunny':
        if (type === 'choice') {
          const choiceTemplates = [
            `${choice.toUpperCase()}! Wait, are you sure? Actually yes, ${choice}! Quick decision!`,
            `OH! ${choice}! That's it! No wait, what if... NO, ${choice} is perfect!`,
            `*twitchy excitement* ${choice}! Final answer! Don't second-guess!`,
            `${choice.toUpperCase()}! I've run through all scenarios and ${choice} wins!`,
            `*rapid nodding* ${choice}! Quick before we overthink it!`,
            `${choice}! I mean, what if we're wrong? NO! ${choice} is right!`,
            `*nervous energy* ${choice}! Trust the instinct! Go go go!`,
            `${choice.toUpperCase()}! All my calculations point to ${choice}!`,
            `*excited bouncing* ${choice}! That's the one! Move fast!`,
            `${choice}! Don't hesitate! I've considered everything!`,
            `*hyperventilating* ${choice}! THAT'S IT! Perfect choice!`,
            `${choice.toUpperCase()}! Quick decision! No regrets!`
          ];
          return getRandomChoice(choiceTemplates);
        } else {
          const yesNoTemplates = [
            `${choice}! But what if we're wrong?! Actually stick with ${choice}!`,
            `${choice.toUpperCase()}! Quick answer! No second-guessing!`,
            `*twitches nervously* ${choice}! Final answer!`,
            `${choice}! Don't think, just go with ${choice}!`,
            `*rapid breathing* ${choice}! That's it! Done!`,
            `${choice.toUpperCase()}! My gut says ${choice}!`,
            `*nervous giggle* ${choice}! Let's stick with that!`
          ];
          return getRandomChoice(yesNoTemplates);
        }
        
      case 'quirky-duck':
        if (type === 'choice') {
          const choiceTemplates = [
            `*quacks mysteriously* The universe says... ${choice}! But only if you do it backwards!`,
            `*rubber duck squeaks* ${choice}! The pond spirits have spoken!`,
            `*waddles excitedly* ${choice}! But add some glitter for good luck!`,
            `*quack quack* ${choice}! The cosmic ducks approve this message!`,
            `*flaps wings* ${choice}! But only on days that end in 'y'!`,
            `*mysterious quacking* ${choice}! The ancient art of pond-gazing confirms it!`,
            `*splashes happily* ${choice}! As foretold by the rubber duck prophecy!`,
            `*quacks in binary* ${choice}! Translation: absolutely, maybe, definitely!`,
            `*does a little duck dance* ${choice}! The pond council has voted!`,
            `*quacks melodically* ${choice}! But sing it, don't say it!`,
            `*wiggles tail feathers* ${choice}! The universe's quackiest choice!`,
            `*mysterious duck whispers* ${choice}! But only if you believe in magic!`
          ];
          return getRandomChoice(choiceTemplates);
        } else {
          const yesNoTemplates = [
            `Quack! ${choice}! The rubber ducks have spoken!`,
            `*mysterious quacking* ${choice}! But backwards!`,
            `*duck dance* ${choice}! The pond spirits approve!`,
            `Quack quack! ${choice}! In duck language: absolutely!`,
            `*wiggles* ${choice}! The cosmic ducks agree!`,
            `*splashes* ${choice}! As the ancient ducks foretold!`,
            `*quacks in riddles* ${choice}! But only on Tuesdays!`
          ];
          return getRandomChoice(yesNoTemplates);
        }
        
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
        // Regular yes/no/maybe logic for other questions with improved randomization
        const responses = ['yes', 'no', 'maybe'] as const;
        const randomResponse = getRandomChoice(responses);
        const responseTexts = character.responses.yesNoMaybe[randomResponse];
        
        // Get a truly random response from the expanded array
        const randomText = getRandomChoice(responseTexts);
        
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
      
      // Play response sound with the actual text for TTS
      audioManager.playSound(theme.sounds.response, character.type, formattedAnswer);
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
            <div className={`w-40 h-40 mx-auto rounded-full overflow-hidden bg-gradient-to-br ${theme.colors.secondary} border ${theme.effects.borderStyle.replace('border border-', 'border-')} ${theme.colors.glow} shadow-2xl ${isThinking ? theme.animations.thinking : theme.animations.floating}`}>
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
