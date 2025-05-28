
import { useState } from 'react';
import { Character, QuestionType, AppScreen } from '../types';
import { characters } from '../data/characters';
import { useUserProgress } from '../hooks/useUserProgress';

import Sparkles from '../components/Sparkles';
import SplashScreen from '../components/SplashScreen';
import PersonalitySelector from '../components/PersonalitySelector';
import QuestionTypeSelector from '../components/QuestionTypeSelector';
import AnswerScreen from '../components/AnswerScreen';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);
  const { progress, incrementDecisions } = useUserProgress();

  // Update characters with user's unlocked status
  const availableCharacters = characters.map(char => ({
    ...char,
    unlocked: progress.unlockedCharacters.includes(char.id)
  }));

  const handleSplashComplete = () => {
    setCurrentScreen('selector');
  };

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
    setCurrentScreen('answer');
    incrementDecisions();
  };

  const handleBackToSelector = () => {
    setCurrentScreen('selector');
    setSelectedCharacter(null);
  };

  const handleBackToQuestions = () => {
    setCurrentScreen('question');
    setQuestionType(null);
  };

  const handleAskAgain = () => {
    if (questionType) {
      // Force re-render with new answer
      const currentType = questionType;
      setQuestionType(null);
      setTimeout(() => {
        setQuestionType(currentType);
        incrementDecisions();
      }, 100);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Sparkles />
      
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {currentScreen === 'selector' && (
        <PersonalitySelector
          selectedCharacter={selectedCharacter}
          onCharacterSelect={handleCharacterSelect}
          onContinue={handleContinueToQuestions}
          onBack={handleSplashComplete}
        />
      )}

      {currentScreen === 'question' && (
        <QuestionTypeSelector
          onTypeSelect={handleQuestionTypeSelect}
          onBack={handleBackToSelector}
        />
      )}

      {currentScreen === 'answer' && selectedCharacter && questionType && (
        <AnswerScreen
          character={selectedCharacter}
          questionType={questionType}
          onBack={handleBackToQuestions}
          onAskAgain={handleAskAgain}
        />
      )}
    </div>
  );
};

export default Index;
