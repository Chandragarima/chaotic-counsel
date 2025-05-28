
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
    if (user) {
      fetchUserProgress();
    } else {
      // Fall back to localStorage for unauthenticated users
      const saved = localStorage.getItem('chaotic-counsel-progress');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProgress({ ...defaultProgress, ...parsed });
        } catch {
          setProgress(defaultProgress);
        }
      }
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProgress({
          streak: data.current_streak,
          lastVisit: new Date().toDateString(),
          unlockedCharacters: data.unlocked_characters || defaultProgress.unlockedCharacters,
          totalDecisions: data.total_decisions
        });
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const incrementDecisions = async () => {
    const today = new Date().toDateString();
    
    if (user) {
      // Update in Supabase for authenticated users
      try {
        // Insert or update daily activity
        await supabase
          .from('daily_activity')
          .upsert({
            user_id: user.id,
            activity_date: new Date().toISOString().split('T')[0],
            decisions_count: 1,
            last_visit_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,activity_date',
            ignoreDuplicates: false
          });

        // Update user progress
        const { data: currentProgress } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (currentProgress) {
          const newTotalDecisions = currentProgress.total_decisions + 1;
          let newUnlockedCharacters = [...currentProgress.unlocked_characters];

          // Unlock characters based on decisions
          if (newTotalDecisions >= 5 && !newUnlockedCharacters.includes('anxious-bunny')) {
            newUnlockedCharacters.push('anxious-bunny');
          }
          if (newTotalDecisions >= 10 && !newUnlockedCharacters.includes('quirky-duck')) {
            newUnlockedCharacters.push('quirky-duck');
          }

          await supabase
            .from('user_progress')
            .update({
              total_decisions: newTotalDecisions,
              unlocked_characters: newUnlockedCharacters,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', user.id);

          // Update streak
          await supabase.rpc('update_user_streak', { user_uuid: user.id });
        }

        // Refresh progress
        await fetchUserProgress();
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    } else {
      // Fall back to localStorage for unauthenticated users
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
    }
  };

  return {
    progress,
    incrementDecisions
  };
};
