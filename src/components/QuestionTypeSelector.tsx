
import { useState } from 'react';
import { QuestionType } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface QuestionTypeSelectorProps {
  selectedCharacter?: any;
  onTypeSelect: (type: QuestionType) => void;
  onBack: () => void;
}

const QuestionTypeSelector = ({ selectedCharacter, onTypeSelect, onBack }: QuestionTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);

  // Personality-specific question types
  const getPersonalityQuestionTypes = () => {
    if (!selectedCharacter) {
      return [
        { type: 'dinner' as QuestionType, title: 'Dinner', description: 'What should I eat?', icon: '🍽️', gradient: 'from-orange-500 to-red-500' },
        { type: 'movie' as QuestionType, title: 'Movie', description: 'What should I watch?', icon: '🎬', gradient: 'from-purple-500 to-pink-500' },
        { type: 'hangout' as QuestionType, title: 'Hang Out', description: 'What should I do?', icon: '🎨', gradient: 'from-green-500 to-blue-500' },
        { type: 'choice' as QuestionType, title: 'Choice', description: 'Help me decide', icon: '⚡', gradient: 'from-yellow-500 to-orange-500' }
      ];
    }

    switch (selectedCharacter.type) {
      case 'sassy-cat':
        return [
          { type: 'choice' as QuestionType, title: 'Drama & Decisions', description: 'Let me judge your choices', icon: '💅', gradient: 'from-pink-500 to-purple-500' },
          { type: 'hangout' as QuestionType, title: 'Social Situations', description: 'Should I deal with people?', icon: '👑', gradient: 'from-purple-500 to-pink-500' },
          { type: 'movie' as QuestionType, title: 'Entertainment', description: 'What\'s worth my time?', icon: '🎭', gradient: 'from-pink-600 to-purple-600' },
          { type: 'dinner' as QuestionType, title: 'Dining Choices', description: 'What deserves my attention?', icon: '🍷', gradient: 'from-purple-600 to-pink-600' }
        ];
      case 'wise-owl':
        return [
          { type: 'choice' as QuestionType, title: 'Life Philosophy', description: 'Seek ancient wisdom', icon: '🦉', gradient: 'from-amber-500 to-orange-500' },
          { type: 'hangout' as QuestionType, title: 'Spiritual Guidance', description: 'Find your path', icon: '🔮', gradient: 'from-orange-500 to-amber-500' },
          { type: 'movie' as QuestionType, title: 'Knowledge & Stories', description: 'Learn from tales', icon: '📚', gradient: 'from-amber-600 to-orange-600' },
          { type: 'dinner' as QuestionType, title: 'Nourishment', description: 'Feed body and soul', icon: '🍯', gradient: 'from-orange-600 to-amber-600' }
        ];
      case 'lazy-panda':
        return [
          { type: 'hangout' as QuestionType, title: 'Chill Vibes', description: 'Minimal effort required', icon: '🐼', gradient: 'from-green-500 to-emerald-500' },
          { type: 'dinner' as QuestionType, title: 'Comfort Food', description: 'Easy and satisfying', icon: '🥢', gradient: 'from-emerald-500 to-green-500' },
          { type: 'movie' as QuestionType, title: 'Cozy Entertainment', description: 'Perfect for napping', icon: '🛋️', gradient: 'from-green-600 to-emerald-600' },
          { type: 'choice' as QuestionType, title: 'Low-Energy Decisions', description: 'Keep it simple', icon: '😴', gradient: 'from-emerald-600 to-green-600' }
        ];
      case 'anxious-bunny':
        return [
          { type: 'choice' as QuestionType, title: 'Quick Decisions!', description: 'Help me choose FAST!', icon: '🐰', gradient: 'from-orange-500 to-red-500' },
          { type: 'hangout' as QuestionType, title: 'Adventure Ideas!', description: 'What should we do?!', icon: '⚡', gradient: 'from-red-500 to-orange-500' },
          { type: 'dinner' as QuestionType, title: 'Food Panic!', description: 'So many options!', icon: '🥕', gradient: 'from-orange-600 to-red-600' },
          { type: 'movie' as QuestionType, title: 'Entertainment Rush!', description: 'Quick! Before I change my mind!', icon: '🎬', gradient: 'from-red-600 to-orange-600' }
        ];
      case 'quirky-duck':
        return [
          { type: 'choice' as QuestionType, title: 'Random Decisions', description: 'Expect the unexpected', icon: '🦆', gradient: 'from-yellow-500 to-blue-500' },
          { type: 'hangout' as QuestionType, title: 'Weird Adventures', description: 'Let\'s get creative!', icon: '🎨', gradient: 'from-blue-500 to-purple-500' },
          { type: 'movie' as QuestionType, title: 'Quirky Picks', description: 'Something different', icon: '🎭', gradient: 'from-purple-500 to-yellow-500' },
          { type: 'dinner' as QuestionType, title: 'Food Experiments', description: 'Why be normal?', icon: '🍳', gradient: 'from-yellow-600 to-blue-600' }
        ];
      default:
        return [
          { type: 'dinner' as QuestionType, title: 'Dinner', description: 'What should I eat?', icon: '🍽️', gradient: 'from-orange-500 to-red-500' },
          { type: 'movie' as QuestionType, title: 'Movie', description: 'What should I watch?', icon: '🎬', gradient: 'from-purple-500 to-pink-500' },
          { type: 'hangout' as QuestionType, title: 'Hang Out', description: 'What should I do?', icon: '🎨', gradient: 'from-green-500 to-blue-500' },
          { type: 'choice' as QuestionType, title: 'Choice', description: 'Help me decide', icon: '⚡', gradient: 'from-yellow-500 to-orange-500' }
        ];
    }
  };

  const questionTypes = getPersonalityQuestionTypes();

  const handleTypeSelect = (type: QuestionType) => {
    setSelectedType(type);
    setTimeout(() => {
      onTypeSelect(type);
    }, 150);
  };

  const getHeaderText = () => {
    if (!selectedCharacter) return "What do you seek?";
    
    switch (selectedCharacter.type) {
      case 'sassy-cat': return "What drama shall we address?";
      case 'wise-owl': return "What wisdom do you seek?";
      case 'lazy-panda': return "What requires minimal effort?";
      case 'anxious-bunny': return "What needs deciding RIGHT NOW?!";
      case 'quirky-duck': return "What randomness awaits?";
      default: return "What do you seek?";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <h1 className="text-3xl font-mystical font-bold text-mystical-gold">
            {getHeaderText()}
          </h1>
          <p className="text-mystical-gold-light">
            {selectedCharacter ? `${selectedCharacter.name} awaits your question` : 'Choose your path to wisdom'}
          </p>
        </div>

        {/* Question Type Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          {questionTypes.map((type) => (
            <Card
              key={type.type}
              className={`mystical-card p-6 cursor-pointer text-center space-y-3 transition-all duration-200 min-h-[120px] ${
                selectedType === type.type 
                  ? 'scale-95 opacity-75' 
                  : 'hover:scale-105 active:scale-95'
              }`}
              onClick={() => handleTypeSelect(type.type)}
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
            className="text-mystical-gold-light hover:text-mystical-gold min-h-[44px] px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Characters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
