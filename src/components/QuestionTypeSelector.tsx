
import { Character, QuestionType } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getPersonalityTheme } from '../utils/personalityThemes';

interface QuestionTypeSelectorProps {
  selectedCharacter: Character | null;
  onTypeSelect: (type: QuestionType) => void;
  onBack: () => void;
}

const QuestionTypeSelector = ({ selectedCharacter, onTypeSelect, onBack }: QuestionTypeSelectorProps) => {
  if (!selectedCharacter) return null;

  const theme = getPersonalityTheme(selectedCharacter.type);

  const getQuestionTypeEmojis = (type: QuestionType, characterType: string) => {
    if (characterType === 'anxious-bunny') { // This is now the snake
      switch (type) {
        case 'dinner': return '🐍🍽️';
        case 'movie': return '🐍🎬';
        case 'hangout': return '🐍🎯';
        case 'choice': return '🐍⚖️';
        default: return '🐍';
      }
    }
    
    // Default emojis for other characters
    switch (type) {
      case 'dinner': return '🍽️✨';
      case 'movie': return '🎬🎭';
      case 'hangout': return '🎯🌟';
      case 'choice': return '⚖️💫';
      default: return '✨';
    }
  };

  const questionTypes: { type: QuestionType; title: string; description: string }[] = [
    {
      type: 'dinner',
      title: 'What to eat?',
      description: 'Culinary decisions and dining choices'
    },
    {
      type: 'movie',
      title: 'What to watch?',
      description: 'Entertainment and viewing recommendations'
    },
    {
      type: 'hangout',
      title: 'Where to go?',
      description: 'Activities and destination suggestions'
    },
    {
      type: 'choice',
      title: 'General choice',
      description: 'Life decisions and general guidance'
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.colors.background} relative overflow-hidden ${theme.animations.entrance}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 border border-current rotate-45 rounded-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-current rotate-12 rounded-2xl opacity-20"></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Button 
          onClick={onBack}
          variant="ghost"
          className={`${theme.colors.text} hover:bg-white/10 p-3 rounded-xl ${theme.animations.buttonHover}`}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative z-10 p-6 pt-20 space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className={`text-5xl ${theme.fonts.heading} bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent ${theme.animations.floating}`}>
            {selectedCharacter.name}
          </h1>
          <div className="flex items-center justify-center space-x-6">
            <div className={`w-16 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-60`}></div>
            <div className={`w-2 h-2 border border-current rotate-45 bg-current/10 opacity-60 ${theme.animations.floating}`}></div>
            <div className={`w-16 h-px bg-gradient-to-l from-transparent via-current to-transparent opacity-60`}></div>
          </div>
          <p className={`${theme.colors.text} opacity-80 text-xl ${theme.fonts.body}`}>
            What guidance do you seek?
          </p>
        </div>

        {/* Question Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {questionTypes.map((questionType) => (
            <Card 
              key={questionType.type}
              className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.secondary} backdrop-blur-md p-8 cursor-pointer transition-all duration-300 ${theme.colors.glow} ${theme.animations.cardHover}`}
              onClick={() => onTypeSelect(questionType.type)}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl">
                  {getQuestionTypeEmojis(questionType.type, selectedCharacter.type)}
                </div>
                <h3 className={`text-xl ${theme.fonts.heading} bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent`}>
                  {questionType.title}
                </h3>
                <p className={`${theme.colors.text} opacity-70 ${theme.fonts.body}`}>
                  {questionType.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
