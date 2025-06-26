import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { UserProgress } from '../types';

const defaultProgress: UserProgress = {
  streak: 0,
  lastVisit: '',
  unlockedCharacters: ['wise-owl', 'sassy-cat'],
  totalDecisions: 0
};

// Cache for progress data to prevent unnecessary reloads
let progressCache: { [userId: string]: { data: UserProgress; timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useSupabaseProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isNewUnlockAvailable, setIsNewUnlockAvailable] = useState(false);
  const [newlyUnlockedCharacter, setNewlyUnlockedCharacter] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  // Track which unlock celebrations have been shown in this session
  const [shownCelebrations, setShownCelebrations] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);
  const currentUserId = useRef<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    
    // Clear cache if user changed
    if (currentUserId.current && currentUserId.current !== user?.id) {
      console.log('👤 User changed, clearing cache');
      clearCache();
    }
    currentUserId.current = user?.id || null;
    
    // Only load once per session unless user changes
    if (hasInitialized.current && user?.id) {
      const cached = progressCache[user.id];
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('📦 Using cached progress for user:', user.id);
        setProgress(cached.data);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    hasInitialized.current = true;

    if (user) {
      console.log('🔵 User logged in, loading progress and updating streak for user:', user.id);
      loadUserProgressAndUpdateStreak().finally(() => setLoading(false));
    } else {
      console.log('🔴 No user, loading local progress');
      loadLocalProgress();
      setLoading(false);
    }
  }, [user, authLoading]);

  const loadUserProgressAndUpdateStreak = async () => {
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

      let initialUnlockedChars: string[];
      if (userProgress) {
        console.log('✅ Loaded user progress:', userProgress);
        initialUnlockedChars = userProgress.unlocked_characters as string[];
        
        // Initialize shown celebrations with already unlocked characters
        setShownCelebrations(new Set(initialUnlockedChars));
        
        const progressData = {
          streak: userProgress.current_streak,
          lastVisit: new Date().toDateString(),
          unlockedCharacters: initialUnlockedChars,
          totalDecisions: userProgress.total_decisions
        };
        
        setProgress(progressData);
        // Cache the progress data
        progressCache[user.id] = { data: progressData, timestamp: Date.now() };
      } else {
        console.log('ℹ️ No user progress found, will be created on first streak update');
        // Initialize with default characters
        initialUnlockedChars = ['wise-owl', 'sassy-cat'];
        setShownCelebrations(new Set(initialUnlockedChars));
      }

      // Now update the streak with the proper initial state
      await updateDailyStreak(initialUnlockedChars);
    } catch (error) {
      console.error('💥 Error in loadUserProgressAndUpdateStreak:', error);
    }
  };

  const updateDailyStreak = async (initialUnlockedChars?: string[]) => {
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
        const newUnlocked = streakData.unlocked_characters as string[];
        
        console.log('📈 Current streak:', streakData.current_streak);
        console.log('🔓 Unlocked characters:', newUnlocked);
        
        // Compare with the initial unlocked characters from the database
        const baseUnlockedChars = initialUnlockedChars || progress.unlockedCharacters;
        const newCharacters = newUnlocked.filter(char => !baseUnlockedChars.includes(char));
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

        const updatedProgress = {
          streak: streakData.current_streak,
          lastVisit: new Date().toDateString(),
          unlockedCharacters: newUnlocked,
          totalDecisions: progress.totalDecisions
        };

        setProgress(updatedProgress);
        // Update cache with new data
        progressCache[user.id] = { data: updatedProgress, timestamp: Date.now() };
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
        await loadUserProgressAndUpdateStreak();
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

  const clearCache = () => {
    if (user?.id) {
      delete progressCache[user.id];
    }
    progressCache = {};
    hasInitialized.current = false;
  };

  return {
    progress,
    incrementDecisions,
    isNewUnlockAvailable,
    newlyUnlockedCharacter,
    dismissUnlockCelebration,
    loading,
    clearCache,
  };
};
