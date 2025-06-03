
import { useState } from 'react';
import { Character, QuestionType, AppScreen, QuestionMode } from '../types';
import { characters } from '../data/characters';
import { useSupabaseProgress } from '../hooks/useSupabaseProgress';

import Sparkles from '../components/Sparkles';
import CombinedHomePage from '../components/CombinedHomePage';
import QuestionTypeSelector from '../components/QuestionTypeSelector';
import QuestionsScreen from '../components/QuestionsScreen';
import AnswerScreen from '../components/AnswerScreen';
import UserMenu from '../components/UserMenu';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('selector');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);
  const [questionMode, setQuestionMode] = useState<QuestionMode>('fun');
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const { progress, incrementDecisions } = useSupabaseProgress();

  // Update characters with user's unlocked status
  const availableCharacters = characters.map(char => ({
    ...char,
    unlocked: progress.unlockedCharacters.includes(char.id)
  }));

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleContinueToQuestions = () => {
      setCurrentScreen('question');
  };

  const handleQuestionTypeSelect = (type: QuestionType, mode: QuestionMode) => {
    console.log('Question type selected:', type, 'Mode:', mode);
    setQuestionType(type);
    setQuestionMode(mode);
    setCurrentScreen('questions');
  };

  const handleQuestionSelect = (question: string) => {
    console.log('Question selected:', question, 'Type:', questionType, 'Mode:', questionMode);
    setCurrentQuestion(question);
    setCurrentScreen('answer');
    incrementDecisions();
  };

  const handleBackToSelector = () => {
    setCurrentScreen('selector');
    setSelectedCharacter(null);
    setQuestionType(null);
    setQuestionMode('fun');
    setCurrentQuestion('');
  };

  const handleBackToQuestionType = () => {
    setCurrentScreen('question');
    setQuestionType(null);
    setQuestionMode('fun');
    setCurrentQuestion('');
  };

  const handleBackToQuestionsList = () => {
    setCurrentScreen('questions');
    setCurrentQuestion('');
  };

  const handleAskAgain = () => {
    if (currentQuestion) {
      // Force re-render with new answer
      const question = currentQuestion;
      setCurrentQuestion('');
      setTimeout(() => {
        setCurrentQuestion(question);
        incrementDecisions();
      }, 100);
    }
  };

  const handleStartOver = () => {
    setCurrentScreen('selector');
    setSelectedCharacter(null);
    setQuestionType(null);
    setQuestionMode('fun');
    setCurrentQuestion('');
  };

  return (
    <div className="relative min-h-screen">
      <Sparkles />
      
      {/* User menu in top right */}
      <div className="absolute top-4 right-4 z-50">
        <UserMenu />
      </div>
      
      {currentScreen === 'selector' && (
        <CombinedHomePage
          selectedCharacter={selectedCharacter}
          onCharacterSelect={handleCharacterSelect}
          onContinue={handleContinueToQuestions}
        />
      )}

      {currentScreen === 'question' && (
        <QuestionTypeSelector
          selectedCharacter={selectedCharacter}
          onTypeSelect={handleQuestionTypeSelect}
          onBack={handleBackToSelector}
        />
      )}

      {currentScreen === 'questions' && questionType && selectedCharacter && (
        <QuestionsScreen
          questionType={questionType}
          questionMode={questionMode}
          character={selectedCharacter}
          onQuestionSelect={handleQuestionSelect}
          onBack={handleBackToQuestionType}
        />
      )}

      {currentScreen === 'answer' && selectedCharacter && currentQuestion && (
        <AnswerScreen
          character={selectedCharacter}
          question={currentQuestion}
          questionMode={questionMode}
          questionType={questionType}
          onBack={handleBackToQuestionsList}
          onAskAgain={handleAskAgain}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
};

export default Index;
