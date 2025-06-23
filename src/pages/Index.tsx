
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
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
import { characters } from "../data/characters";

export default function Index() {
  const { loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Parse URL parameters to determine current state
  const step = searchParams.get('step') || 'home';
  const characterId = searchParams.get('character');
  const questionType = searchParams.get('type') as QuestionType;
  const questionMode = searchParams.get('mode') as QuestionMode;
  const encodedQuestion = searchParams.get('question');
  
  // Derive state from URL
  const selectedCharacter = characterId 
    ? characters.find(c => c.id === characterId) || null 
    : null;
  const currentScreen = step as 'home' | 'question-type' | 'questions' | 'answer';
  const selectedQuestionType = questionType || null;
  const selectedQuestionMode = questionMode || 'fun';
  const userQuestion = encodedQuestion ? decodeURIComponent(encodedQuestion) : '';
  
  const [answerComplete, setAnswerComplete] = useState(false);

  const { 
    questionCount, 
    shouldShowFeedback, 
    incrementQuestionCount, 
    resetFeedbackTrigger, 
    resetSession 
  } = useQuestionTracking();

  const { incrementDecisions } = useSupabaseProgress();

  // Helper function to update URL parameters
  const updateUrl = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    
    setSearchParams(newSearchParams);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleCharacterSelectAndContinue = (character: Character) => {
    updateUrl({
      step: 'question-type',
      character: character.id
    });
  };

  const handleTypeSelect = (type: QuestionType, mode: QuestionMode) => {
    updateUrl({
      step: 'questions',
      type: type,
      mode: mode
    });
  };

  const handleQuestionSubmit = (question: string) => {
    updateUrl({
      step: 'answer',
      question: encodeURIComponent(question)
    });
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
    const newQuestion = userQuestion + ' ';
    updateUrl({
      question: encodeURIComponent(newQuestion)
    });
    setTimeout(() => {
      updateUrl({
        question: encodeURIComponent(newQuestion.trim())
      });
    }, 0);
    // Increment counters for re-asks too
    incrementQuestionCount();
    incrementDecisions();
  };

  const handleBackToHome = () => {
    updateUrl({
      step: 'home',
      character: null,
      type: null,
      mode: null,
      question: null
    });
    setAnswerComplete(false);
    resetSession();
  };

  const handleBackToQuestionType = () => {
    updateUrl({
      step: 'question-type',
      type: null,
      mode: null,
      question: null
    });
    setAnswerComplete(false);
  };

  const handleBackToQuestions = () => {
    updateUrl({
      step: 'questions',
      question: null
    });
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
          onContinue={() => updateUrl({ step: 'question-type' })}
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
