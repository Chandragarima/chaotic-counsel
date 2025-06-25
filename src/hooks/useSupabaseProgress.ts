import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserProgress } from '../types';

const defaultProgress: UserProgress = {
  streak: 0,
  lastVisit: '',
  unlockedCharacters: ['wise-owl', 'sassy-cat'],
  totalDecisions: 0
};

export const useSupabaseProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isNewUnlockAvailable, setIsNewUnlockAvailable] = useState(false);
  const [newlyUnlockedCharacter, setNewlyUnlockedCharacter] = useState<string | null>(null);
  const { user, loading } = useAuth();

  // Track which unlock celebrations have been shown in this session
  const [shownCelebrations, setShownCelebrations] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (loading) return;

    if (user) {
      console.log('🔵 User logged in, loading progress and updating streak for user:', user.id);
      loadUserProgress();
      updateDailyStreak();
    } else {
      console.log('🔴 No user, loading local progress');
      loadLocalProgress();
    }
  }, [user, loading]);

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      console.log('📊 Loading user progress for:', user.id);
      const { data: userProgress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('❌ Error loading user progress:', error);
        return;
      }

      if (userProgress) {
        console.log('✅ Loaded user progress:', userProgress);
        const unlockedChars = userProgress.unlocked_characters as string[];
        
        // Initialize shown celebrations with already unlocked characters
        setShownCelebrations(new Set(unlockedChars));
        
        setProgress({
          streak: userProgress.current_streak,
          lastVisit: new Date().toDateString(),
          unlockedCharacters: unlockedChars,
          totalDecisions: userProgress.total_decisions
        });
      } else {
        console.log('ℹ️ No user progress found, will be created on first streak update');
        // Initialize with default characters
        setShownCelebrations(new Set(['wise-owl', 'sassy-cat']));
      }
    } catch (error) {
      console.error('💥 Error in loadUserProgress:', error);
    }
  };

  const updateDailyStreak = async () => {
    if (!user) return;

    try {
      console.log('🔥 Updating daily streak for user:', user.id);
      const { data, error } = await supabase.rpc('update_daily_streak', {
        user_uuid: user.id
      });

      if (error) {
        console.error('❌ Error updating daily streak:', error);
        return;
      }

      console.log('🎯 Streak update result:', data);

      if (data && data.length > 0) {
        const streakData = data[0];
        const previousUnlocked = progress.unlockedCharacters;
        const newUnlocked = streakData.unlocked_characters as string[];
        
        console.log('📈 Current streak:', streakData.current_streak);
        console.log('🔓 Unlocked characters:', newUnlocked);
        
        // Check if a new character was unlocked (show celebration for any new unlocks)
        const newCharacters = newUnlocked.filter(char => !previousUnlocked.includes(char));
        if (newCharacters.length > 0) {
          // Show celebration for the most recently unlocked character that hasn't been celebrated yet
          const characterOrder = ['lazy-panda', 'sneaky-snake', 'people-pleaser-pup'];
          const uncelebratedCharacters = newCharacters.filter(char => !shownCelebrations.has(char));
          
          if (uncelebratedCharacters.length > 0) {
            const mostRecentUnlock = uncelebratedCharacters.sort((a, b) => 
              characterOrder.indexOf(b) - characterOrder.indexOf(a)
            )[0];
            
            console.log('🎉 New character(s) unlocked:', newCharacters, 'showing celebration for:', mostRecentUnlock);
            setNewlyUnlockedCharacter(mostRecentUnlock);
            setIsNewUnlockAvailable(true);
          }
        }

        setProgress({
          streak: streakData.current_streak,
          lastVisit: new Date().toDateString(),
          unlockedCharacters: newUnlocked,
          totalDecisions: progress.totalDecisions
        });
      }
    } catch (error) {
      console.error('💥 Error in updateDailyStreak:', error);
    }
  };

  const loadLocalProgress = () => {
    const saved = localStorage.getItem('chaotic-counsel-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // For anonymous users, always show streak as 0 and only default characters
        setProgress({ 
          ...defaultProgress, 
          totalDecisions: parsed.totalDecisions || 0,
          streak: 0, // Anonymous users don't get streak benefits
          unlockedCharacters: ['wise-owl', 'sassy-cat'] // Only default characters for anonymous users
        });
      } catch {
        setProgress(defaultProgress);
      }
    } else {
      setProgress(defaultProgress);
    }
  };

  const incrementDecisions = async () => {
    if (user) {
      await incrementDecisionsSupabase();
    } else {
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

      // Get current progress and update decisions
      const { data: currentProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (currentProgress) {
        const newTotalDecisions = currentProgress.total_decisions + 1;

        const { error: progressError } = await supabase
          .from('user_progress')
          .update({
            total_decisions: newTotalDecisions,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (progressError) {
          console.error('Error updating progress:', progressError);
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
    
    // For anonymous users, only track decisions, keep streak at 0
    const newProgress = {
      ...progress,
      totalDecisions: progress.totalDecisions + 1,
      lastVisit: today,
      streak: 0, // Always keep streak at 0 for anonymous users
      unlockedCharacters: ['wise-owl', 'sassy-cat'] // Only default characters
    };

    setProgress(newProgress);
    localStorage.setItem('chaotic-counsel-progress', JSON.stringify(newProgress));
  };

  const dismissUnlockCelebration = () => {
    if (newlyUnlockedCharacter) {
      setShownCelebrations(prev => new Set([...prev, newlyUnlockedCharacter]));
    }
    setIsNewUnlockAvailable(false);
    setNewlyUnlockedCharacter(null);
    
    // Check if there are more uncelebrated characters to show
    setTimeout(() => {
      checkForAdditionalUnlocks();
    }, 100);
  };

  const checkForAdditionalUnlocks = () => {
    const newCharacters = progress.unlockedCharacters.filter(char => 
      !['wise-owl', 'sassy-cat'].includes(char) && !shownCelebrations.has(char)
    );
    
    if (newCharacters.length > 0) {
      const characterOrder = ['lazy-panda', 'sneaky-snake', 'people-pleaser-pup'];
      const mostRecentUnlock = newCharacters.sort((a, b) => 
        characterOrder.indexOf(b) - characterOrder.indexOf(a)
      )[0];
      
      setNewlyUnlockedCharacter(mostRecentUnlock);
      setIsNewUnlockAvailable(true);
    }
  };

  return {
    progress,
    incrementDecisions,
    isNewUnlockAvailable,
    newlyUnlockedCharacter,
    dismissUnlockCelebration
  };
};
