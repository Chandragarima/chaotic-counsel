
import { useState } from "react";
import { Character } from "../types";
import SplashScreen from "../components/SplashScreen";
import CombinedHomePage from "../components/CombinedHomePage";
import QuestionsScreen from "../components/QuestionsScreen";
import AnswerScreen from "../components/AnswerScreen";
import UserMenu from "../components/UserMenu";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'questions' | 'answer'>('home');
  const [userQuestion, setUserQuestion] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const handleStartGame = () => {
    setCurrentScreen('questions');
  };

  const handleQuestionSubmit = (question: string) => {
    setUserQuestion(question);
    setCurrentScreen('answer');
  };

  const handleNewQuestion = () => {
    setCurrentScreen('questions');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedCharacter(null);
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

      {currentScreen === 'questions' && selectedCharacter && (
        <QuestionsScreen
          character={selectedCharacter}
          onSubmit={handleQuestionSubmit}
          onBack={handleBackToHome}
        />
      )}

      {currentScreen === 'answer' && selectedCharacter && (
        <AnswerScreen
          character={selectedCharacter}
          question={userQuestion}
          onNewQuestion={handleNewQuestion}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}
