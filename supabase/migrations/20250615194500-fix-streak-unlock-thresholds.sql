
-- Update the streak unlocking function with the correct unlock thresholds
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
BEGIN
  -- Get current user progress
  SELECT * INTO user_progress_record
  FROM user_progress 
  WHERE user_id = user_uuid;
  
  -- If no record exists, create one
  IF user_progress_record IS NULL THEN
    INSERT INTO user_progress (user_id, current_streak, longest_streak, last_streak_date, unlocked_characters)
    VALUES (user_uuid, 1, 1, CURRENT_DATE, '["wise-owl", "sassy-cat"]'::jsonb);
    
    RETURN QUERY SELECT 1, 1, true, '["wise-owl", "sassy-cat"]'::jsonb;
    RETURN;
  END IF;
  
  current_unlocked := user_progress_record.unlocked_characters;
  
  -- Check if streak should be updated (only once per day)
  IF user_progress_record.last_streak_date < CURRENT_DATE THEN
    streak_was_updated := true;
    
    -- Check if yesterday was the last streak date (consecutive)
    IF user_progress_record.last_streak_date = CURRENT_DATE - INTERVAL '1 day' THEN
      new_streak := user_progress_record.current_streak + 1;
    ELSE
      -- Streak broken, start over
      new_streak := 1;
    END IF;
    
    -- Update longest streak if needed
    new_longest := GREATEST(user_progress_record.longest_streak, new_streak);
    
    -- Determine unlocked characters based on streak - FIXED THRESHOLDS
    new_unlocked := '["wise-owl", "sassy-cat"]'::jsonb;
    
    IF new_streak >= 1 THEN
      new_unlocked := new_unlocked || '["lazy-panda"]'::jsonb;
    END IF;
    
    IF new_streak >= 3 THEN
      new_unlocked := new_unlocked || '["sneaky-snake"]'::jsonb;
    END IF;
    
    IF new_streak >= 7 THEN
      new_unlocked := new_unlocked || '["people-pleaser-pup"]'::jsonb;
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

-- Update default unlocked characters for new users to only include sassy-cat and wise-owl
ALTER TABLE user_progress 
ALTER COLUMN unlocked_characters 
SET DEFAULT '["sassy-cat", "wise-owl"]'::jsonb;
