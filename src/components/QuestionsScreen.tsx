
import { useState } from 'react';
import { QuestionType, SampleQuestion } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, Send } from 'lucide-react';

interface QuestionsScreenProps {
  questionType: QuestionType;
  onQuestionSelect: (question: string) => void;
  onBack: () => void;
}

const QuestionsScreen = ({ questionType, onQuestionSelect, onBack }: QuestionsScreenProps) => {
  const [customQuestion, setCustomQuestion] = useState('');

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

  const handleCustomSubmit = () => {
    if (customQuestion.trim()) {
      onQuestionSelect(customQuestion.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomSubmit();
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-3xl font-mystical font-bold text-mystical-gold">
          {getTypeTitle()}
        </h1>
        <p className="text-mystical-gold-light">
          Choose a question or ask your own
        </p>
      </div>

      {/* Sample Questions */}
      <div className="max-w-lg mx-auto space-y-4">
        <h3 className="text-mystical-gold font-bold text-lg font-mystical text-center">
          Popular Questions
        </h3>
        
        <div className="grid gap-3">
          {sampleQuestions[questionType].map((question) => (
            <Card
              key={question.id}
              className="mystical-card p-4 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={() => onQuestionSelect(question.text)}
            >
              <p className="text-foreground text-center">
                {question.text}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Question Input */}
      <div className="max-w-lg mx-auto space-y-4">
        <h3 className="text-mystical-gold font-bold text-lg font-mystical text-center">
          Or Ask Your Own
        </h3>
        
        <div className="flex gap-2">
          <Input
            placeholder="Type your question here..."
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            className="mystical-card border-mystical-gold/30 text-foreground"
          />
          <Button
            onClick={handleCustomSubmit}
            disabled={!customQuestion.trim()}
            className="mystical-button px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
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

export default QuestionsScreen;
