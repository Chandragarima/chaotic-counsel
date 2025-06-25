import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Character, QuestionType, QuestionMode } from "../types";
import CombinedHomePage from "../components/CombinedHomePage";
import QuestionTypeSelector from "../components/QuestionTypeSelector";
import QuestionsScreen from "../components/QuestionsScreen";
import AnswerScreen from "../components/AnswerScreen";
import UserMenu from "../components/UserMenu";
import Navigation from "../components/Navigation";
import AutoFeedbackTrigger from "../components/feedback/AutoFeedbackTrigger";
import { useAuth } from "@/contexts/AuthContext";
import { useQuestionTracking } from "../hooks/useQuestionTracking";
import { useSupabaseProgress } from "../hooks/useSupabaseProgress";
import { characters } from "../data/characters";
import { analytics } from "../utils/analytics";

export default function Index() {
  const { loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  
  // Parse URL parameters to determine current state
  const { characterId } = params;
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Determine current screen and mode from URL
  let currentScreen: 'home' | 'question-type' | 'questions' | 'answer' = 'home';
  let selectedQuestionMode: QuestionMode = 'fun';
  let selectedQuestionType: QuestionType | null = null;
  
  if (pathSegments.length >= 2) {
    const modeSegment = pathSegments[1];
    if (modeSegment.includes('fun-mode')) {
      selectedQuestionMode = 'fun';
      if (modeSegment.includes('question-type')) currentScreen = 'question-type';
      else if (modeSegment.includes('questions')) currentScreen = 'questions';
      else if (modeSegment.includes('answer')) currentScreen = 'answer';
    } else if (modeSegment.includes('serious-mode')) {
      selectedQuestionMode = 'serious';
      if (modeSegment.includes('question-type')) currentScreen = 'question-type';
      else if (modeSegment.includes('questions')) currentScreen = 'questions';
      else if (modeSegment.includes('answer')) currentScreen = 'answer';
    }
  }
  
  if (pathSegments.length >= 3) {
    selectedQuestionType = pathSegments[2] as QuestionType;
  }
  
  // Get current question from URL state
  const urlState = location.state as { question?: string } | null;
  const userQuestion = urlState?.question || '';
  
  // Derive character from URL
  const selectedCharacter = characterId 
    ? characters.find(c => c.id === characterId) || null 
    : null;
  
  const [answerComplete, setAnswerComplete] = useState(false);
  const [answerKey, setAnswerKey] = useState(0);

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
    navigate(`/${character.id}/fun-mode-question-type`);
    analytics.trackCharacterSelected(character.type, character.name);
  };

  const handleTypeSelect = (type: QuestionType, mode: QuestionMode) => {
    if (selectedCharacter) {
      navigate(`/${selectedCharacter.id}/${mode}-mode-questions/${type}`);
      analytics.trackQuestionTypeSelected(type, mode);
    }
  };

  const handleQuestionSubmit = (question: string) => {
    if (selectedCharacter && selectedQuestionType) {
      navigate(`/${selectedCharacter.id}/${selectedQuestionMode}-mode-answer/${selectedQuestionType}`, {
        state: { question }
      });
      setAnswerComplete(false);
      // Increment question count and decisions when a new question is asked
      incrementQuestionCount();
      incrementDecisions();
    }
  };

  const handleAnswerComplete = () => {
    setAnswerComplete(true);
  };

  const handleAskAgain = () => {
    console.log('handleAskAgain called', { selectedCharacter, selectedQuestionType, userQuestion });
    setAnswerComplete(false);
    setAnswerKey(prev => prev + 1);
    if (selectedCharacter && selectedQuestionType) {
      // Force a re-render by navigating to a temporary route and back
      const currentPath = `/${selectedCharacter.id}/${selectedQuestionMode}-mode-answer/${selectedQuestionType}`;
      console.log('Navigating to:', currentPath);
      navigate(currentPath, {
        state: { question: userQuestion, forceRefresh: Date.now() },
        replace: true
      });
      // Increment counters for re-asks too
      // incrementQuestionCount();
      // incrementDecisions();
    }
  };

  const handleBackToHome = () => {
    navigate('/');
    setAnswerComplete(false);
    resetSession();
  };

  const handleBackToQuestionType = () => {
    if (selectedCharacter) {
      navigate(`/${selectedCharacter.id}/${selectedQuestionMode}-mode-question-type`);
      setAnswerComplete(false);
    }
  };

  const handleBackToQuestions = () => {
    if (selectedCharacter && selectedQuestionType) {
      navigate(`/${selectedCharacter.id}/${selectedQuestionMode}-mode-questions/${selectedQuestionType}`);
      setAnswerComplete(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Fixed Navigation */}
      {/* <Navigation /> */}

      {/* <div className="absolute">
        <Navigation />
      </div> */}
      <div className="absolute top-4 left-4 z-50">
        <Navigation />
      </div>

      
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
          onContinue={() => {
            if (selectedCharacter) {
              navigate(`/${selectedCharacter.id}/fun-mode-question-type`);
            }
          }}
        />
      )}

      {currentScreen === 'question-type' && selectedCharacter && (
        <QuestionTypeSelector
          selectedCharacter={selectedCharacter}
          currentMode={selectedQuestionMode}
          onTypeSelect={handleTypeSelect}
          onBack={handleBackToHome}
          onModeChange={(mode) => {
            navigate(`/${selectedCharacter.id}/${mode}-mode-question-type`);
          }}
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

      {currentScreen === 'answer' && selectedCharacter && selectedQuestionType && (
        <AnswerScreen
          key={answerKey}
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
