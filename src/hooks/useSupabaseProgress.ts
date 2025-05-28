
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserProgress } from '../types';

const defaultProgress: UserProgress = {
  streak: 0,
  lastVisit: '',
  unlockedCharacters: ['sassy-cat', 'wise-owl', 'lazy-panda'],
  totalDecisions: 0
};

export const useSupabaseProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const { user } = useAuth();

  useEffect(() => {
    // For now, always fall back to localStorage until database is set up
    const saved = localStorage.getItem('chaotic-counsel-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress({ ...defaultProgress, ...parsed });
      } catch {
        setProgress(defaultProgress);
      }
    }
  }, [user]);

  const incrementDecisions = async () => {
    const today = new Date().toDateString();
    
    // Use localStorage for now
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

    setProgress(newProgress);
    localStorage.setItem('chaotic-counsel-progress', JSON.stringify(newProgress));
  };

  return {
    progress,
    incrementDecisions
  };
};
