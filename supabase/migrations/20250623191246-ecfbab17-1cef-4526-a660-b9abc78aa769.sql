
-- Update the streak function to be more user-friendly:
-- 1. Don't reset streak to 1 when user takes a break - continue from where they left off
-- 2. Never remove unlocked characters - only add new ones
-- 3. Keep the streak progression more forgiving

CREATE OR REPLACE FUNCTION public.update_daily_streak(user_uuid uuid)
RETURNS TABLE(
  current_streak integer,
  longest_streak integer,
  streak_updated boolean,
  unlocked_characters jsonb
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  user_progress_record RECORD;
  new_streak integer := 0;
  new_longest integer := 0;
  streak_was_updated boolean := false;
  current_unlocked jsonb;
  new_unlocked jsonb;
  days_since_last_visit integer;
BEGIN
  -- Get current user progress
  SELECT * INTO user_progress_record
  FROM user_progress 
  WHERE user_id = user_uuid;
  
  -- If no record exists, create one
  IF user_progress_record IS NULL THEN
    INSERT INTO user_progress (user_id, current_streak, longest_streak, last_streak_date, unlocked_characters)
    VALUES (user_uuid, 1, 1, CURRENT_DATE, '["sassy-cat", "wise-owl"]'::jsonb);
    
    RETURN QUERY SELECT 1, 1, true, '["sassy-cat", "wise-owl"]'::jsonb;
    RETURN;
  END IF;
  
  current_unlocked := user_progress_record.unlocked_characters;
  
  -- Check if streak should be updated (only once per day)
  IF user_progress_record.last_streak_date < CURRENT_DATE THEN
    streak_was_updated := true;
    
    -- Calculate days since last visit
    days_since_last_visit := CURRENT_DATE - user_progress_record.last_streak_date;
    
    -- More forgiving streak logic:
    -- - If yesterday: continue streak
    -- - If within 3 days: maintain current streak (grace period)
    -- - If more than 3 days: keep current streak but don't increment
    IF days_since_last_visit = 1 THEN
      -- Perfect consecutive day - increment streak
      new_streak := user_progress_record.current_streak + 1;
    ELSE
      -- User took a break - keep current streak level (don't penalize)
      new_streak := user_progress_record.current_streak;
    END IF;
    
    -- Update longest streak if needed
    new_longest := GREATEST(user_progress_record.longest_streak, new_streak);
    
    -- Always preserve existing unlocked characters and add new ones based on current streak
    -- Start with existing characters
    new_unlocked := current_unlocked;
    
    -- Add characters based on streak level (only if not already present)
    IF new_streak >= 2 AND NOT (current_unlocked ? 'lazy-panda') THEN
      new_unlocked := new_unlocked || '["lazy-panda"]'::jsonb;
    END IF;
    
    IF new_streak >= 4 AND NOT (current_unlocked ? 'sneaky-snake') THEN
      new_unlocked := new_unlocked || '["sneaky-snake"]'::jsonb;
    END IF;
    
    IF new_streak >= 7 AND NOT (current_unlocked ? 'people-pleaser-pup') THEN
      new_unlocked := new_unlocked || '["people-pleaser-pup"]'::jsonb;
    END IF;
    
    -- Ensure base characters are always present (safety check)
    IF NOT (new_unlocked ? 'sassy-cat') THEN
      new_unlocked := new_unlocked || '["sassy-cat"]'::jsonb;
    END IF;
    
    IF NOT (new_unlocked ? 'wise-owl') THEN
      new_unlocked := new_unlocked || '["wise-owl"]'::jsonb;
    END IF;
    
    -- Update the record
    UPDATE user_progress 
    SET 
      current_streak = new_streak,
      longest_streak = new_longest,
      last_streak_date = CURRENT_DATE,
      unlocked_characters = new_unlocked,
      updated_at = now()
    WHERE user_id = user_uuid;
    
  ELSE
    -- No update needed, return current values
    new_streak := user_progress_record.current_streak;
    new_longest := user_progress_record.longest_streak;
    new_unlocked := current_unlocked;
  END IF;
  
  RETURN QUERY SELECT new_streak, new_longest, streak_was_updated, new_unlocked;
END;
$$;
