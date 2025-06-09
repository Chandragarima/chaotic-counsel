
import { useState } from "react";
import { Character, QuestionType, QuestionMode } from "../types";
import CombinedHomePage from "../components/CombinedHomePage";
import QuestionTypeSelector from "../components/QuestionTypeSelector";
import QuestionsScreen from "../components/QuestionsScreen";
import AnswerScreen from "../components/AnswerScreen";
import UserMenu from "../components/UserMenu";
import AutoFeedbackTrigger from "../components/feedback/AutoFeedbackTrigger";
import { useAuth } from "@/contexts/AuthContext";
import { useQuestionTracking } from "../hooks/useQuestionTracking";

export default function Index() {
  const { loading } = useAuth();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'question-type' | 'questions' | 'answer'>('home');
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null);
  const [selectedQuestionMode, setSelectedQuestionMode] = useState<QuestionMode>('fun');
  const [userQuestion, setUserQuestion] = useState('');

  const { 
    questionCount, 
    shouldShowFeedback, 
    incrementQuestionCount, 
    resetFeedbackTrigger, 
    resetSession 
  } = useQuestionTracking();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleCharacterSelectAndContinue = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentScreen('question-type');
  };

  const handleTypeSelect = (type: QuestionType, mode: QuestionMode) => {
    setSelectedQuestionType(type);
    setSelectedQuestionMode(mode);
    setCurrentScreen('questions');
  };

  const handleQuestionSubmit = (question: string) => {
    setUserQuestion(question);
    setCurrentScreen('answer');
    // Increment question count when a new question is asked
    incrementQuestionCount();
  };

  const handleAskAgain = () => {
    setUserQuestion(prev => prev + ' ');
    setTimeout(() => {
      setUserQuestion(prev => prev.trim());
    }, 0);
    // Increment question count for re-asks too
    incrementQuestionCount();
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCharacter(null);
    setSelectedQuestionType(null);
    // Reset session when going back to home
    resetSession();
  };

  const handleBackToQuestionType = () => {
    setCurrentScreen('question-type');
  };

  const handleBackToQuestions = () => {
    setCurrentScreen('questions');
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 right-4 z-50">
        <UserMenu />
      </div>

      {/* Auto-triggered feedback - only show on answer screen after answer is revealed */}
      {currentScreen === 'answer' && (
        <AutoFeedbackTrigger 
          shouldShow={shouldShowFeedback}
          character={selectedCharacter || undefined}
          onFeedbackShown={resetFeedbackTrigger}
          isAnswerRevealed={userQuestion !== ''} // Answer is revealed when we have a question
        />
      )}
      
      {currentScreen === 'home' && (
        <CombinedHomePage
          selectedCharacter={selectedCharacter}
          onCharacterSelect={handleCharacterSelectAndContinue}
          onContinue={() => setCurrentScreen('question-type')}
        />
      )}

      {currentScreen === 'question-type' && (
        <QuestionTypeSelector
          selectedCharacter={selectedCharacter}
          onTypeSelect={handleTypeSelect}
          onBack={handleBackToHome}
        />
      )}

      {currentScreen === 'questions' && selectedCharacter && selectedQuestionType && (
        <QuestionsScreen
          questionType={selectedQuestionType}
          questionMode={selectedQuestionMode}
          character={selectedCharacter}
          onQuestionSelect={handleQuestionSubmit}
          onBack={handleBackToQuestionType}
        />
      )}

      {currentScreen === 'answer' && selectedCharacter && (
        <AnswerScreen
          character={selectedCharacter}
          question={userQuestion}
          questionMode={selectedQuestionMode}
          questionType={selectedQuestionType}
          onBack={handleBackToQuestions}
          onAskAgain={handleAskAgain}
          onStartOver={handleBackToHome}
        />
      )}
    </div>
  );
}
