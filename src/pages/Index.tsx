
import { useState } from "react";
import { Character, QuestionType, QuestionMode } from "../types";
import CombinedHomePage from "../components/CombinedHomePage";
import QuestionTypeSelector from "../components/QuestionTypeSelector";
import QuestionsScreen from "../components/QuestionsScreen";
import AnswerScreen from "../components/AnswerScreen";
import UserMenu from "../components/UserMenu";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { loading } = useAuth();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'question-type' | 'questions' | 'answer'>('home');
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType | null>(null);
  const [selectedQuestionMode, setSelectedQuestionMode] = useState<QuestionMode>('fun');
  const [userQuestion, setUserQuestion] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const handleStartGame = () => {
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
  };

  const handleAskAgain = () => {
    setCurrentScreen('questions');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCharacter(null);
    setSelectedQuestionType(null);
  };

  const handleBackToQuestionType = () => {
    setCurrentScreen('question-type');
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 right-4 z-50">
        <UserMenu />
      </div>
      
      {currentScreen === 'home' && (
        <CombinedHomePage
          selectedCharacter={selectedCharacter}
          onCharacterSelect={setSelectedCharacter}
          onStartGame={handleStartGame}
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
          onBack={handleBackToHome}
          onAskAgain={handleAskAgain}
          onStartOver={handleBackToHome}
        />
      )}
    </div>
  );
}
