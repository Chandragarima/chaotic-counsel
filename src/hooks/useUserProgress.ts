
import { useState, useEffect } from 'react';
import { UserProgress } from '../types';

const STORAGE_KEY = 'chaotic-counsel-progress';

const defaultProgress: UserProgress = {
  streak: 0,
  lastVisit: '',
  unlockedCharacters: ['sassy-cat', 'wise-owl', 'lazy-panda'],
  totalDecisions: 0
};

export const useUserProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress({ ...defaultProgress, ...parsed });
      } catch {
        setProgress(defaultProgress);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const incrementDecisions = () => {
    const today = new Date().toDateString();
    const newProgress = {
      ...progress,
      totalDecisions: progress.totalDecisions + 1,
      lastVisit: today,
      streak: progress.lastVisit === today ? progress.streak : progress.streak + 1
    };

    // Unlock characters based on decisions
    if (newProgress.totalDecisions >= 5 && !newProgress.unlockedCharacters.includes('anxious-bunny')) {
      newProgress.unlockedCharacters.push('anxious-bunny');
    }
    if (newProgress.totalDecisions >= 10 && !newProgress.unlockedCharacters.includes('quirky-duck')) {
      newProgress.unlockedCharacters.push('quirky-duck');
    }

    saveProgress(newProgress);
  };

  return {
    progress,
    incrementDecisions,
    saveProgress
  };
};
