
-- Add the missing last_streak_date column to user_progress table
ALTER TABLE user_progress 
ADD COLUMN last_streak_date DATE;

-- Set default value for existing records to allow the function to work
UPDATE user_progress 
SET last_streak_date = CURRENT_DATE - INTERVAL '1 day'
WHERE last_streak_date IS NULL;
