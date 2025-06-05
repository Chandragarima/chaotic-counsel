
import { useState } from 'react';
import { QuestionType, QuestionMode } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { audioManager } from '../utils/audioManager';

interface QuestionTypeSelectorProps {
  selectedCharacter?: any;
  onTypeSelect: (type: QuestionType, mode: QuestionMode) => void;
  onBack: () => void;
}

const QuestionTypeSelector = ({ selectedCharacter, onTypeSelect, onBack }: QuestionTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);
  const [currentMode, setCurrentMode] = useState<QuestionMode>('fun');
  const theme = selectedCharacter ? getPersonalityTheme(selectedCharacter.type) : null;

  // Get question types based on mode and character
  const getQuestionTypes = () => {
    if (!selectedCharacter) {
      return [
        { type: 'dinner' as QuestionType, title: 'Dinner', description: 'What should I eat?', icon: '🍽️', gradient: 'from-orange-500 to-red-500' },
        { type: 'movie' as QuestionType, title: 'Movie', description: 'What should I watch?', icon: '🎬', gradient: 'from-purple-500 to-pink-500' },
        { type: 'hangout' as QuestionType, title: 'Hang Out', description: 'What should I do?', icon: '🎨', gradient: 'from-green-500 to-blue-500' },
        { type: 'choice' as QuestionType, title: 'Choice', description: 'Help me decide', icon: '⚡', gradient: 'from-yellow-500 to-orange-500' }
      ];
    }

    if (currentMode === 'serious') {
      return [
        { type: 'career' as QuestionType, title: 'Career & Growth', description: 'Professional wisdom and guidance', icon: '🎯', gradient: 'from-amber-500 to-orange-500' },
        { type: 'finance' as QuestionType, title: 'Finance & Money', description: 'Financial decisions and planning', icon: '💰', gradient: 'from-amber-600 to-orange-600' },
        { type: 'personal-growth' as QuestionType, title: 'Personal Growth', description: 'Self-development and improvement', icon: '🌱', gradient: 'from-green-500 to-emerald-500' },
        { type: 'relationships' as QuestionType, title: 'Relationships', description: 'Love, friendship, and social guidance', icon: '💝', gradient: 'from-pink-500 to-rose-500' },
      ];
    }

    // Fun mode categories - personality specific
    switch (selectedCharacter.type) {
      case 'wise-owl':
        return [
          { type: 'choice' as QuestionType, title: 'Life Philosophy', description: 'Seek ancient wisdom', icon: '🦉', gradient: 'from-amber-500 to-orange-500' },
          { type: 'hangout' as QuestionType, title: 'Spiritual Guidance', description: 'Find your path', icon: '🔮', gradient: 'from-orange-500 to-amber-500' },
          { type: 'movie' as QuestionType, title: 'Knowledge & Stories', description: 'Learn from tales', icon: '📚', gradient: 'from-amber-600 to-orange-600' },
          { type: 'dinner' as QuestionType, title: 'Nourishment', description: 'Feed body and soul', icon: '🍯', gradient: 'from-orange-600 to-amber-600' }
        ];
      case 'sassy-cat':
        return [
          { type: 'choice' as QuestionType, title: 'Drama & Decisions', description: 'Let me judge your choices', icon: '💅', gradient: 'from-pink-500 to-purple-500' },
          { type: 'hangout' as QuestionType, title: 'Social Situations', description: 'Should I deal with people?', icon: '👑', gradient: 'from-purple-500 to-pink-500' },
          { type: 'movie' as QuestionType, title: 'Entertainment', description: 'What\'s worth my time?', icon: '🎭', gradient: 'from-pink-600 to-purple-600' },
          { type: 'dinner' as QuestionType, title: 'Dining Choices', description: 'What deserves my attention?', icon: '🍷', gradient: 'from-purple-600 to-pink-600' }
        ];
      case 'lazy-panda':
        return [
          { type: 'hangout' as QuestionType, title: 'Chill Vibes', description: 'Minimal effort required', icon: '🐼', gradient: 'from-green-500 to-emerald-500' },
          { type: 'dinner' as QuestionType, title: 'Comfort Food', description: 'Easy and satisfying', icon: '🥢', gradient: 'from-emerald-500 to-green-500' },
          { type: 'movie' as QuestionType, title: 'Cozy Entertainment', description: 'Perfect for napping', icon: '🛋️', gradient: 'from-green-600 to-emerald-600' },
          { type: 'choice' as QuestionType, title: 'Low-Energy Decisions', description: 'Keep it simple', icon: '😴', gradient: 'from-emerald-600 to-green-600' }
        ];
      case 'sneaky-snake':
        return [
          { type: 'choice' as QuestionType, title: 'Strategic Moves', description: 'Let me reveal the clever path', icon: '🐍', gradient: 'from-emerald-500 to-green-500' },
          { type: 'hangout' as QuestionType, title: 'Secret Plans', description: 'Hidden opportunities await', icon: '🎭', gradient: 'from-green-500 to-emerald-500' },
          { type: 'dinner' as QuestionType, title: 'Forbidden Flavors', description: 'Taste the unexpected', icon: '🍎', gradient: 'from-emerald-600 to-green-600' },
          { type: 'movie' as QuestionType, title: 'Dark Mysteries', description: 'Uncover hidden truths', icon: '🎬', gradient: 'from-green-600 to-emerald-600' }
        ];
      case 'people-pleaser-pup':
        return [
          { type: 'choice' as QuestionType, title: 'Supportive Decisions', description: 'Whatever you choose is perfect!', icon: '🐕', gradient: 'from-yellow-500 to-blue-500' },
          { type: 'hangout' as QuestionType, title: 'People-Pleasing Plans', description: 'Let\'s make everyone happy!', icon: '❤️', gradient: 'from-blue-500 to-purple-500' },
          { type: 'movie' as QuestionType, title: 'Crowd-Pleasing Picks', description: 'Something everyone will love!', icon: '🎭', gradient: 'from-purple-500 to-yellow-500' },
          { type: 'dinner' as QuestionType, title: 'Accommodating Meals', description: 'Food that makes everyone smile!', icon: '🦴', gradient: 'from-yellow-600 to-blue-600' }
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

  const questionTypes = getQuestionTypes();

  const handleTypeSelect = (type: QuestionType) => {
    setSelectedType(type);
    if (selectedCharacter && theme) {
      audioManager.playSound(theme.sounds.select, selectedCharacter.type);
    }
    setTimeout(() => {
      onTypeSelect(type, currentMode);
    }, 150);
  };

  const getHeaderText = () => {
    if (!selectedCharacter) return "What do you seek?";
    
    if (currentMode === 'serious') {
      switch (selectedCharacter.type) {
        case 'wise-owl': return "What profound wisdom do you seek?";
        case 'sassy-cat': return "What life challenge needs some real talk?";
        case 'lazy-panda': return "What's stressing you out that we need to simplify?";
        case 'sneaky-snake': return "What strategic life decision requires cunning insight?";
        case 'people-pleaser-pup': return "What life situation needs supportive guidance?";
        default: return "What serious guidance do you need?";
      }
    }
    
    switch (selectedCharacter.type) {
      case 'wise-owl': return "What wisdom do you seek?";
      case 'sassy-cat': return "What drama shall we address?";
      case 'lazy-panda': return "What requires minimal effort?";
      case 'sneaky-snake': return "What secrets shall we uncover?";
      case 'people-pleaser-pup': return "How can I help make you happy?";
      default: return "What do you seek?";
    }
  };

  const canShowSeriousMode = selectedCharacter;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Match homepage background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {theme && (
          <>
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/3 w-96 h-96 border border-amber-400/20 rotate-45 rounded-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-amber-400/15 rotate-12 rounded-2xl"></div>
            </div>
            <div className={`absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-${theme.colors.accent.replace('#', '')}/[0.04] rounded-full blur-[100px]`}></div>
            <div className={`absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-${theme.colors.accent.replace('#', '')}/[0.03] rounded-full blur-[80px]`}></div>
          </>
        )}
      </div>

      <div className="relative z-10 p-6 space-y-12">
        {/* Sophisticated Header */}
        <div className="text-center space-y-8 pt-12">
          <div className="space-y-6">
            <h1 className={`text-5xl font-thin tracking-[0.3em] ${theme ? theme.colors.text : 'text-amber-100'}`}>
              {getHeaderText()}
            </h1>
            
            <div className="flex items-center justify-center space-x-6">
              <div className={`w-16 h-px bg-gradient-to-r from-transparent via-${theme ? theme.colors.accent.replace('#', '') : 'amber-400'}/60 to-transparent`}></div>
              <div className={`w-3 h-3 border border-${theme ? theme.colors.accent.replace('#', '') : 'amber-400'}/60 rotate-45 bg-${theme ? theme.colors.accent.replace('#', '') : 'amber-400'}/10`}></div>
              <div className={`w-16 h-px bg-gradient-to-l from-transparent via-${theme ? theme.colors.accent.replace('#', '') : 'amber-400'}/60 to-transparent`}></div>
            </div>
          </div>
          
          <p className={`text-xl ${theme ? theme.colors.text : 'text-amber-200'} opacity-80 font-light tracking-wider`}>
            {selectedCharacter ? `${selectedCharacter.name} awaits your inquiry` : 'Choose your path to wisdom'}
          </p>
        </div>

        {/* Mode Toggle for All Characters */}
        {canShowSeriousMode && (
          <div className="flex justify-center">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-1 border border-amber-400/20">
              <div className="flex space-x-1">
                <button
                  onClick={() => setCurrentMode('fun')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentMode === 'fun'
                      ? 'bg-amber-500 text-slate-900 shadow-lg'
                      : 'text-amber-200 hover:text-amber-100'
                  }`}
                >
                  Fun Mode
                </button>
                <button
                  onClick={() => setCurrentMode('serious')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentMode === 'serious'
                      ? 'bg-amber-500 text-slate-900 shadow-lg'
                      : 'text-amber-200 hover:text-amber-100'
                  }`}
                >
                  Serious Mode
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sophisticated Question Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {questionTypes.map((type) => (
            <Card
              key={type.type}
              className={`mystical-card p-8 cursor-pointer text-center space-y-4 transition-all duration-300 min-h-[140px] ${
                selectedType === type.type 
                  ? 'scale-95 opacity-75' 
                  : 'hover:scale-[1.02] active:scale-95'
              } ${theme ? theme.effects.borderStyle : 'border border-amber-400/20'} bg-gradient-to-br ${theme ? theme.colors.background : 'from-slate-900/80'} backdrop-blur-md`}
              onClick={() => handleTypeSelect(type.type)}
            >
              <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                {type.icon}
              </div>
              <div className="space-y-2">
                <h3 className={`${theme ? theme.colors.text : 'text-amber-100'} font-light text-xl tracking-wide`}>
                  {type.title}
                </h3>
                <p className={`${theme ? theme.colors.text : 'text-amber-200'} opacity-70 text-sm font-light`}>
                  {type.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            className={`${theme ? theme.colors.text : 'text-amber-200'} hover:${theme ? theme.colors.text : 'text-amber-100'} min-h-[48px] px-8 font-light tracking-wide transition-all duration-300 hover:scale-[1.02]`}
          >
            <ArrowLeft className="mr-3 h-4 w-4" />
            Return to Advisors
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
