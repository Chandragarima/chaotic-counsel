
import { useState } from 'react';
import { Character, QuestionType, QuestionMode } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Sparkles, Brain, Heart, Lightbulb, Target, Scale } from 'lucide-react';
import { getPersonalityTheme } from '../utils/personalityThemes';
import PersonalityEffects from './PersonalityEffects';
import { audioManager } from '../utils/audioManager';

interface QuestionTypeSelectorProps {
  selectedCharacter: Character | null;
  onTypeSelect: (type: QuestionType, mode: QuestionMode) => void;
  onBack: () => void;
}

const QuestionTypeSelector = ({ selectedCharacter, onTypeSelect, onBack }: QuestionTypeSelectorProps) => {
  const [selectedMode, setSelectedMode] = useState<QuestionMode>('fun');
  const theme = selectedCharacter ? getPersonalityTheme(selectedCharacter.type) : null;

  if (!selectedCharacter || !theme) return null;

  const questionTypes = [
    {
      type: 'binary' as QuestionType,
      icon: Scale,
      title: 'Yes or No',
      description: 'Get a clear answer to your question',
      color: 'from-green-500 to-emerald-600'
    },
    {
      type: 'advice' as QuestionType,
      icon: Lightbulb,
      title: 'Life Advice',
      description: 'Receive guidance for your situation',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      type: 'recommendation' as QuestionType,
      icon: Target,
      title: 'Recommendations',
      description: 'Get suggestions and options',
      color: 'from-purple-500 to-violet-600'
    },
    {
      type: 'analysis' as QuestionType,
      icon: Brain,
      title: 'Analysis',
      description: 'Deep dive into your question',
      color: 'from-orange-500 to-red-600'
    },
    {
      type: 'choice' as QuestionType,
      icon: Heart,
      title: 'Decision Help',
      description: 'Choose between options',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  const handleTypeSelect = (type: QuestionType) => {
    audioManager.playSound(theme.sounds.select, selectedCharacter.type);
    onTypeSelect(type, selectedMode);
  };

  const handleModeToggle = (mode: QuestionMode) => {
    setSelectedMode(mode);
    audioManager.playSound(theme.sounds.select, selectedCharacter.type);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme.animations.entrance}`}>
      <PersonalityEffects character={selectedCharacter} />
      
      <div className="relative z-10 p-6 space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button 
            onClick={onBack}
            variant="ghost"
            className={`${theme.colors.text} hover:bg-gradient-to-r hover:${theme.colors.background} ${theme.fonts.body} transition-all duration-300`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent ${theme.fonts.heading}`}>
              What guidance do you seek?
            </h1>
            <p className={`${theme.colors.text} ${theme.fonts.body} text-lg mt-2 opacity-80`}>
              {selectedCharacter.name} awaits your question
            </p>
          </div>
          
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Mode Toggle */}
        <div className="max-w-md mx-auto">
          <div className={`flex p-1 rounded-xl ${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md ${theme.colors.glow}`}>
            <Button
              onClick={() => handleModeToggle('fun')}
              className={`flex-1 transition-all duration-300 ${
                selectedMode === 'fun'
                  ? `bg-gradient-to-r ${theme.colors.primary} text-white shadow-lg`
                  : `${theme.colors.text} bg-transparent hover:bg-white/10`
              }`}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Fun Mode
            </Button>
            <Button
              onClick={() => handleModeToggle('serious')}
              className={`flex-1 transition-all duration-300 ${
                selectedMode === 'serious'
                  ? `bg-gradient-to-r ${theme.colors.primary} text-white shadow-lg`
                  : `${theme.colors.text} bg-transparent hover:bg-white/10`
              }`}
            >
              <Brain className="mr-2 h-4 w-4" />
              Serious Mode
            </Button>
          </div>
        </div>

        {/* Question Types Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questionTypes.map((questionType) => {
            const Icon = questionType.icon;
            return (
              <Card
                key={questionType.type}
                className={`${theme.effects.borderStyle} bg-gradient-to-br ${theme.colors.background} backdrop-blur-md p-6 ${theme.colors.glow} shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 ${theme.animations.cardHover}`}
                onClick={() => handleTypeSelect(questionType.type)}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${questionType.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`${theme.colors.text} ${theme.fonts.heading} text-xl font-semibold mb-2`}>
                      {questionType.title}
                    </h3>
                    <p className={`${theme.colors.text} ${theme.fonts.body} opacity-70 text-sm leading-relaxed`}>
                      {questionType.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
