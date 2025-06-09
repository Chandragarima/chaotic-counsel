
import { useState, useEffect } from 'react';

export const useQuestionTracking = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [shouldShowFeedback, setShouldShowFeedback] = useState(false);
  const [hasShownFeedback, setHasShownFeedback] = useState(false);

  const incrementQuestionCount = () => {
    setQuestionCount(prev => {
      const newCount = prev + 1;
      // Show feedback after 3 questions, but only once per session
      if (newCount >= 3 && !hasShownFeedback) {
        setShouldShowFeedback(true);
        setHasShownFeedback(true);
      }
      return newCount;
    });
  };

  const resetFeedbackTrigger = () => {
    setShouldShowFeedback(false);
  };

  const resetSession = () => {
    setQuestionCount(0);
    setShouldShowFeedback(false);
    setHasShownFeedback(false);
  };

  return {
    questionCount,
    shouldShowFeedback,
    incrementQuestionCount,
    resetFeedbackTrigger,
    resetSession
  };
};
