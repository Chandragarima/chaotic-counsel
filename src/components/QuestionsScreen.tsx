
import { useState } from 'react';
import { QuestionType, SampleQuestion, Character } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';
import { getPersonalityTheme } from '../utils/personalityThemes';
import PersonalityEffects from './PersonalityEffects';

interface QuestionsScreenProps {
  questionType: QuestionType;
  character: Character;
  onQuestionSelect: (question: string) => void;
  onBack: () => void;
}

const QuestionsScreen = ({ questionType, character, onQuestionSelect, onBack }: QuestionsScreenProps) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = getPersonalityTheme(character.type);

  const sampleQuestions: Record<QuestionType, SampleQuestion[]> = {
    dinner: [
      { id: '1', text: 'Should I order pizza or pasta?', category: 'dinner' },
      { id: '2', text: 'Should I go out or order in?', category: 'dinner' },
      { id: '3', text: 'Which cuisine should I eat?', category: 'dinner' },
      { id: '4', text: 'Is it ice cream day today?', category: 'dinner' },
      { id: '5', text: 'Should I cook or get takeout?', category: 'dinner' },
      { id: '6', text: 'Is it time for dessert?', category: 'dinner' }
    ],
    movie: [
      { id: '1', text: 'Should I watch a comedy or drama?', category: 'movie' },
      { id: '2', text: 'Is it movie night tonight?', category: 'movie' },
      { id: '3', text: 'Should I rewatch an old favorite?', category: 'movie' },
      { id: '4', text: 'Horror movie or romantic comedy?', category: 'movie' },
      { id: '5', text: 'Should I binge a series instead?', category: 'movie' },
      { id: '6', text: 'Documentary or fiction tonight?', category: 'movie' }
    ],
    hangout: [
      { id: '1', text: 'Should I stay in or go out?', category: 'hangout' },
      { id: '2', text: 'Is it a good day for the park?', category: 'hangout' },
      { id: '3', text: 'Should I call friends or enjoy alone time?', category: 'hangout' },
      { id: '4', text: 'Museum or shopping mall?', category: 'hangout' },
      { id: '5', text: 'Should I try something new today?', category: 'hangout' },
      { id: '6', text: 'Is it nap time or adventure time?', category: 'hangout' }
    ],
    choice: [
      { id: '1', text: 'Should I take the risk?', category: 'choice' },
      { id: '2', text: 'Is now the right time?', category: 'choice' },
      { id: '3', text: 'Should I listen to my heart or my head?', category: 'choice' },
      { id: '4', text: 'Will I regret not doing this?', category: 'choice' },
      { id: '5', text: 'Should I wait or act now?', category: 'choice' },
      { id: '6', text: 'Is this worth the effort?', category: 'choice' }
    ]
  };

  const getTypeTitle = () => {
    switch (questionType) {
      case 'dinner': return 'Dinner Decisions';
      case 'movie': return 'Entertainment Choices';
      case 'hangout': return 'Activity Ideas';
      case 'choice': return 'Life Choices';
    }
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setTimeout(() => {
      onQuestionSelect(question);
    }, 150);
  };

  const handleCustomSubmit = () => {
    if (customQuestion.trim() && !isSubmitting) {
      setIsSubmitting(true);
      setTimeout(() => {
        onQuestionSelect(customQuestion.trim());
      }, 150);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCustomSubmit();
    }
  };

  return (
    <div className={`relative min-h-screen ${theme.animations.entrance}`}>
      <PersonalityEffects character={character} isActive={true} />
      
      <div className="relative z-10 min-h-screen p-4 space-y-8">
        {/* Header with Character Image */}
        <div className="text-center space-y-6 pt-12">
          {/* Character Image */}
          <div className="flex justify-center">
            <div className={`relative ${theme.animations.floating}`}>
              <img 
                src={character.image} 
                alt={character.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white/20 backdrop-blur-sm"
                style={{ 
                  filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.4))',
                  animation: `${theme.animations.floating} 3s ease-in-out infinite`
                }}
              />
            </div>
          </div>
          
          <h1 className={`text-4xl ${theme.fonts.heading} ${theme.colors.text} opacity-90 ${theme.animations.floating}`}>
            {getTypeTitle()}
          </h1>
          <p className={`${theme.colors.text} opacity-70 ${theme.fonts.body}`}>
            {character.name} is here to help you choose
          </p>
        </div>

        {/* Sample Questions */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className={`${theme.colors.text} ${theme.fonts.heading} text-xl text-center opacity-80`}>
            Popular Questions
          </h3>
          
          <div className="grid gap-4">
            {sampleQuestions[questionType].map((question, index) => (
              <Card
                key={question.id}
                className={`${theme.effects.borderStyle} bg-slate-900/40 backdrop-blur-sm p-6 cursor-pointer transition-all duration-300 min-h-[80px] flex items-center ${theme.colors.glow} ${theme.animations.cardHover} ${
                  selectedQuestion === question.text 
                    ? 'scale-95 opacity-75' 
                    : 'hover:scale-102 hover:bg-slate-900/60 active:scale-98'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`
                }}
                onClick={() => handleQuestionSelect(question.text)}
              >
                <p className={`${theme.colors.text} ${theme.fonts.body} text-center w-full text-lg opacity-90`}>
                  {question.text}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Question Input */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className={`${theme.colors.text} ${theme.fonts.heading} text-xl text-center opacity-80`}>
            Or Ask Your Own
          </h3>
          
          <div className="flex gap-3">
            <Input
              placeholder="Type your question here..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`${theme.effects.borderStyle} bg-slate-900/40 backdrop-blur-sm ${theme.colors.text} ${theme.fonts.body} min-h-[56px] text-lg placeholder:opacity-50 focus:bg-slate-900/60 transition-all duration-300`}
              disabled={isSubmitting}
              style={{ color: theme.colors.accent }}
            />
            <Button
              onClick={handleCustomSubmit}
              disabled={!customQuestion.trim() || isSubmitting}
              className={`min-h-[56px] min-w-[56px] bg-gradient-to-r ${theme.colors.primary} hover:opacity-90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${theme.animations.buttonHover}`}
              style={{ backgroundColor: theme.colors.accent }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center pt-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            className={`${theme.colors.text} hover:opacity-80 min-h-[44px] px-8 ${theme.fonts.body} transition-all duration-300 ${theme.animations.buttonHover}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsScreen;
