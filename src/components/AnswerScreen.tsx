
import { useState, useEffect } from 'react';
import { Character } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface AnswerScreenProps {
  character: Character;
  question: string;
  onBack: () => void;
  onAskAgain: () => void;
}

const AnswerScreen = ({ character, question, onBack, onAskAgain }: AnswerScreenProps) => {
  const [answer, setAnswer] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    // Generate a yes/no/maybe response
    const responses = ['yes', 'no', 'maybe'] as const;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const responseTexts = character.responses.yesNoMaybe[randomResponse];
    const randomText = responseTexts[Math.floor(Math.random() * responseTexts.length)];
    
    setIsRevealing(true);
    setTimeout(() => {
      setAnswer(`${randomResponse.toUpperCase()}: ${randomText}`);
      setIsRevealing(false);
    }, 1500);
  }, [character, question]);

  const getCharacterFont = () => {
    switch (character.type) {
      case 'wise-owl':
        return 'font-mystical';
      case 'sassy-cat':
        return 'font-bold';
      case 'lazy-panda':
        return 'font-normal';
      case 'anxious-bunny':
        return 'font-medium';
      case 'quirky-duck':
        return 'font-light';
      default:
        return 'font-normal';
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-2xl font-mystical font-bold text-mystical-gold">
          The Oracle Responds
        </h1>
        <p className="text-mystical-gold-light">
          {character.name} contemplates your question...
        </p>
      </div>

      {/* Question Display */}
      <div className="max-w-lg mx-auto">
        <Card className="mystical-card p-6 mb-6">
          <p className="text-mystical-gold text-center font-medium">
            "{question}"
          </p>
        </Card>
      </div>

      {/* Character Response */}
      <div className="max-w-lg mx-auto space-y-6">
        {/* Character Image */}
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-mystical-purple-light/20 border-4 border-mystical-gold/30 animate-glow-pulse">
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

        {/* Answer Card */}
        <Card className="mystical-card p-8">
          {isRevealing ? (
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-4 border-mystical-gold/30 border-t-mystical-gold rounded-full animate-spin mx-auto"></div>
              <p className="text-mystical-gold-light animate-pulse">
                Consulting the mystical realm...
              </p>
            </div>
          ) : (
            <div className="space-y-4 text-center animate-fade-in">
              <h3 className="text-mystical-gold font-bold text-lg font-mystical">
                {character.name} says:
              </h3>
              <p className={`text-foreground text-lg leading-relaxed ${getCharacterFont()}`}>
                "{answer}"
              </p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        {!isRevealing && (
          <div className="space-y-3 animate-fade-in">
            <Button 
              onClick={onAskAgain}
              className="mystical-button w-full"
            >
              Ask Again
            </Button>
            
            <Button 
              onClick={onBack}
              variant="ghost"
              className="w-full text-mystical-gold-light hover:text-mystical-gold"
            >
              <ArrowUp className="mr-2 h-4 w-4 rotate-180" />
              Back to Questions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerScreen;
