import { useState, useEffect } from 'react';

export const useQuestionTracking = () => {
  const [questionCount, setQuestionCount] = useState(0);
  const [shouldShowFeedback, setShouldShowFeedback] = useState(false);
  const [lastFeedbackQuestionCount, setLastFeedbackQuestionCount] = useState(0);

  const incrementQuestionCount = () => {
    setQuestionCount(prev => {
      const newCount = prev + 1;

      // First trigger at 5 questions.
      if (lastFeedbackQuestionCount === 0 && newCount >= 5) {
        setShouldShowFeedback(true);
      } 
      // Subsequent triggers after 15 questions from the last one.
      else if (lastFeedbackQuestionCount > 0 && (newCount - lastFeedbackQuestionCount >= 12)) {
        setShouldShowFeedback(true);
      }

      return newCount;
    });
  };

  const resetFeedbackTrigger = () => {
    setShouldShowFeedback(false);
    // When feedback is shown, record the current question count.
    // This will be the baseline for the next 15-question interval.
    setLastFeedbackQuestionCount(questionCount);
  };

  const resetSession = () => {
    setQuestionCount(0);
    setShouldShowFeedback(false);
    setLastFeedbackQuestionCount(0);
  };

  return {
    questionCount,
    shouldShowFeedback,
    incrementQuestionCount,
    resetFeedbackTrigger,
    resetSession
  };
};
