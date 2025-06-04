
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserProgress } from '../types';

const defaultProgress: UserProgress = {
  streak: 0,
  lastVisit: '',
  unlockedCharacters: ['sassy-cat', 'wise-owl', 'lazy-panda'],
  totalDecisions: 0
};

export const useSupabaseProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      // Load progress from Supabase for authenticated users
      loadUserProgress();
    } else {
      // Load from localStorage for guest users
      loadLocalProgress();
    }
  }, [user, loading]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      // Get user progress from Supabase
      const { data: userProgress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading user progress:', error);
        return;
      }

      if (userProgress) {
        setProgress({
          streak: userProgress.current_streak,
          lastVisit: new Date().toDateString(), // We'll use daily_activity for this
          unlockedCharacters: userProgress.unlocked_characters as string[],
          totalDecisions: userProgress.total_decisions
        });
      }
    } catch (error) {
      console.error('Error in loadUserProgress:', error);
    }
  };

  const loadLocalProgress = () => {
    const saved = localStorage.getItem('chaotic-counsel-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress({ ...defaultProgress, ...parsed });
      } catch {
        setProgress(defaultProgress);
      }
    }
  };

  const incrementDecisions = async () => {
    if (user) {
      // Update in Supabase for authenticated users
      await incrementDecisionsSupabase();
    } else {
      // Update localStorage for guest users
      incrementDecisionsLocal();
    }
  };

  const incrementDecisionsSupabase = async () => {
    if (!user) return;

    try {
      // Update daily activity
      const today = new Date().toISOString().split('T')[0];
      
      const { error: activityError } = await supabase
        .from('daily_activity')
        .upsert({
          user_id: user.id,
          activity_date: today,
          decisions_count: 1,
          last_visit_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,activity_date'
        });

      if (activityError) {
        console.error('Error updating daily activity:', activityError);
      }

      // Get current progress
      const { data: currentProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (currentProgress) {
        const newTotalDecisions = currentProgress.total_decisions + 1;
        const currentUnlocked = currentProgress.unlocked_characters as string[];
        const newUnlockedCharacters = [...currentUnlocked];

        // Unlock characters based on decisions
        if (newTotalDecisions >= 15 && !newUnlockedCharacters.includes('sneaky-snake')) {
          newUnlockedCharacters.push('sneaky-snake');
        }
        if (newTotalDecisions >= 30 && !newUnlockedCharacters.includes('people-pleaser-pup')) {
          newUnlockedCharacters.push('people-pleaser-pup');
        }

        // Update progress
        const { error: progressError } = await supabase
          .from('user_progress')
          .update({
            total_decisions: newTotalDecisions,
            unlocked_characters: newUnlockedCharacters,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (progressError) {
          console.error('Error updating progress:', progressError);
        }

        // Update streak using the database function
        const { error: streakError } = await supabase.rpc('update_user_streak', {
          user_uuid: user.id
        });

        if (streakError) {
          console.error('Error updating streak:', streakError);
        }

        // Reload progress to get updated values
        await loadUserProgress();
      }
    } catch (error) {
      console.error('Error in incrementDecisionsSupabase:', error);
    }
  };

  const incrementDecisionsLocal = () => {
    const today = new Date().toDateString();
    
    const newProgress = {
      ...progress,
      totalDecisions: progress.totalDecisions + 1,
      lastVisit: today,
      streak: progress.lastVisit === today ? progress.streak : progress.streak + 1
    };

    // Unlock characters based on decisions
    if (newProgress.totalDecisions >= 15 && !newProgress.unlockedCharacters.includes('sneaky-snake')) {
      newProgress.unlockedCharacters.push('sneaky-snake');
    }
    if (newProgress.totalDecisions >= 30 && !newProgress.unlockedCharacters.includes('people-pleaser-pup')) {
      newProgress.unlockedCharacters.push('people-pleaser-pup');
    }

    setProgress(newProgress);
    localStorage.setItem('chaotic-counsel-progress', JSON.stringify(newProgress));
  };

  return {
    progress,
    incrementDecisions
  };
};
