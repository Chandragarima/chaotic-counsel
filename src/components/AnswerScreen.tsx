import { Character, QuestionMode, QuestionType } from '../types';
import { Card } from '@/components/ui/card';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { useAnswerGeneration } from '../hooks/useAnswerGeneration';
import PersonalityEffects from './PersonalityEffects';
import AnswerHeader from './answer/AnswerHeader';
import CharacterAvatar from './answer/CharacterAvatar';
import AnswerDisplay from './answer/AnswerDisplay';
import ActionButtons from './answer/ActionButtons';
import FeedbackTrigger from './feedback/FeedbackTrigger';

interface AnswerScreenProps {
  character: Character;
  question: string;
  questionMode?: QuestionMode;
  questionType?: QuestionType;
  onBack: () => void;
  onAskAgain: () => void;
  onStartOver: () => void;
}

const AnswerScreen = ({ character, question, questionMode = 'fun', questionType, onBack, onAskAgain, onStartOver }: AnswerScreenProps) => {
  const { answer, isRevealing, isThinking, responseType, aiResponse } = useAnswerGeneration({ 
    character, 
    question, 
    mode: questionMode,
    questionType: questionType || undefined
  });
  const theme = getPersonalityTheme(character.type);

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme.animations.entrance}`}>
      <PersonalityEffects character={character} />
      
      <div className="relative z-10 p-6 space-y-8">
        {/* Header */}
        <AnswerHeader character={character} />

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
          {/* Character Avatar */}
          <CharacterAvatar 
            character={character} 
            isThinking={isThinking} 
            responseType={responseType}
          />

          {/* Answer Card */}
          <AnswerDisplay 
            character={character} 
            answer={answer} 
            isRevealing={isRevealing} 
            isThinking={isThinking}
            aiResponse={aiResponse}
          />

          {/* Action Buttons with Feedback */}
          {!isRevealing && (
            <>
              <ActionButtons 
                character={character}
                onBack={onBack}
                onAskAgain={onAskAgain}
                onStartOver={onStartOver}
              />
              
              {/* Post-Decision Feedback */}
              <div className="flex justify-center pt-4">
                <FeedbackTrigger 
                  character={character}
                  feedbackType="post_decision"
                  variant="inline"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerScreen;
