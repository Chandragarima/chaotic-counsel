
import { QuestionType } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface QuestionTypeSelectorProps {
  onTypeSelect: (type: QuestionType) => void;
  onBack: () => void;
}

const QuestionTypeSelector = ({ onTypeSelect, onBack }: QuestionTypeSelectorProps) => {
  const questionTypes = [
    {
      type: 'dinner' as QuestionType,
      title: 'Dinner',
      description: 'What should I eat?',
      icon: '🍽️',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      type: 'movie' as QuestionType,
      title: 'Movie',
      description: 'What should I watch?',
      icon: '🎬',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      type: 'hangout' as QuestionType,
      title: 'Hang Out',
      description: 'What should I do?',
      icon: '🎨',
      gradient: 'from-green-500 to-blue-500'
    },
    {
      type: 'choice' as QuestionType,
      title: 'Choice',
      description: 'Help me decide',
      icon: '⚡',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-3xl font-mystical font-bold text-mystical-gold">
          What do you seek?
        </h1>
        <p className="text-mystical-gold-light">
          Choose your path to wisdom
        </p>
      </div>

      {/* Question Type Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {questionTypes.map((type) => (
          <Card
            key={type.type}
            className="mystical-card p-6 cursor-pointer text-center space-y-3 hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={() => onTypeSelect(type.type)}
          >
            <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center text-2xl shadow-lg`}>
              {type.icon}
            </div>
            <div>
              <h3 className="text-mystical-gold font-bold text-lg font-mystical">
                {type.title}
              </h3>
              <p className="text-mystical-gold-light text-sm">
                {type.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-center pt-8">
        <Button 
          onClick={onBack}
          variant="ghost"
          className="text-mystical-gold-light hover:text-mystical-gold"
        >
          <ArrowUp className="mr-2 h-4 w-4 rotate-180" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
