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
import { useSupabaseProgress } from "../hooks/useSupabaseProgress";

export default function Index() {
  const { loading } = useAuth();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'question-type' | 'questions' | 'answer'>('home');
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null);
  const [selectedQuestionMode, setSelectedQuestionMode] = useState<QuestionMode>('fun');
  const [userQuestion, setUserQuestion] = useState('');
  const [answerComplete, setAnswerComplete] = useState(false);

  const { 
    questionCount, 
    shouldShowFeedback, 
    incrementQuestionCount, 
    resetFeedbackTrigger, 
    resetSession 
  } = useQuestionTracking();

  const { incrementDecisions } = useSupabaseProgress();

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
    setAnswerComplete(false);
    // Increment question count and decisions when a new question is asked
    incrementQuestionCount();
    incrementDecisions();
  };

  const handleAnswerComplete = () => {
    setAnswerComplete(true);
  };

  const handleAskAgain = () => {
    setAnswerComplete(false);
    setUserQuestion(prev => prev + ' ');
    setTimeout(() => {
      setUserQuestion(prev => prev.trim());
    }, 0);
    // Increment counters for re-asks too
    incrementQuestionCount();
    incrementDecisions();
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCharacter(null);
    setSelectedQuestionType(null);
    setAnswerComplete(false);
    resetSession();
  };

  const handleBackToQuestionType = () => {
    setCurrentScreen('question-type');
    setAnswerComplete(false);
  };

  const handleBackToQuestions = () => {
    setCurrentScreen('questions');
    setAnswerComplete(false);
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 right-4 z-50">
        <UserMenu />
      </div>

      {/* Auto-triggered feedback - only show on answer screen when answer is complete */}
      {currentScreen === 'answer' && answerComplete && (
        <AutoFeedbackTrigger 
          shouldShow={shouldShowFeedback}
          character={selectedCharacter || undefined}
          onFeedbackShown={resetFeedbackTrigger}
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
          onAnswerComplete={handleAnswerComplete}
        />
      )}
    </div>
  );
}
