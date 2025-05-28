
import { useState, useEffect } from 'react';
import { Character, QuestionType } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface AnswerScreenProps {
  character: Character;
  questionType: QuestionType;
  onBack: () => void;
  onAskAgain: () => void;
}

const AnswerScreen = ({ character, questionType, onBack, onAskAgain }: AnswerScreenProps) => {
  const [answer, setAnswer] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    // Get a random response from the character for this question type
    const responses = character.responses[questionType];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    setIsRevealing(true);
    setTimeout(() => {
      setAnswer(randomResponse);
      setIsRevealing(false);
    }, 1500);
  }, [character, questionType]);

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

  const getQuestionTypeTitle = () => {
    switch (questionType) {
      case 'dinner': return 'Dinner Guidance';
      case 'movie': return 'Movie Recommendation';
      case 'hangout': return 'Activity Suggestion';
      case 'choice': return 'Decision Help';
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-2xl font-mystical font-bold text-mystical-gold">
          {getQuestionTypeTitle()}
        </h1>
        <p className="text-mystical-gold-light">
          {character.name} speaks...
        </p>
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
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerScreen;
