import { useState } from 'react';
import { Character, QuestionType, AppScreen } from '../types';
import { characters } from '../data/characters';
import { useUserProgress } from '../hooks/useUserProgress';

import Sparkles from '../components/Sparkles';
import CombinedHomePage from '../components/CombinedHomePage';
import QuestionTypeSelector from '../components/QuestionTypeSelector';
import QuestionsScreen from '../components/QuestionsScreen';
import AnswerScreen from '../components/AnswerScreen';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('selector');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const { progress, incrementDecisions } = useUserProgress();

  // Update characters with user's unlocked status
  const availableCharacters = characters.map(char => ({
    ...char,
    unlocked: progress.unlockedCharacters.includes(char.id)
  }));

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleContinueToQuestions = () => {
    if (selectedCharacter) {
      setCurrentScreen('question');
    }
  };

  const handleQuestionTypeSelect = (type: QuestionType) => {
    setQuestionType(type);
    setCurrentScreen('questions');
  };

  const handleQuestionSelect = (question: string) => {
    setCurrentQuestion(question);
    setCurrentScreen('answer');
    incrementDecisions();
  };

  const handleBackToSelector = () => {
    setCurrentScreen('selector');
    setSelectedCharacter(null);
    setQuestionType(null);
    setCurrentQuestion('');
  };

  const handleBackToQuestionType = () => {
    setCurrentScreen('question');
    setQuestionType(null);
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
    setCurrentQuestion('');
  };

  return (
    <div className="relative min-h-screen">
      <Sparkles />
      
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
          character={selectedCharacter}
          onQuestionSelect={handleQuestionSelect}
          onBack={handleBackToQuestionType}
        />
      )}

      {currentScreen === 'answer' && selectedCharacter && currentQuestion && (
        <AnswerScreen
          character={selectedCharacter}
          question={currentQuestion}
          onBack={handleBackToQuestionsList}
          onAskAgain={handleAskAgain}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
};

export default Index;
