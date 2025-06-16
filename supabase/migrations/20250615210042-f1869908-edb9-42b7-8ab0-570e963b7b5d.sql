
-- Update existing user records to remove lazy-panda, sneaky-snake, and people-pleaser-pup from unlocked characters
-- Only keep the base characters (sassy-cat and wise-owl) for users with 0 or low streaks
UPDATE user_progress 
SET unlocked_characters = '["sassy-cat", "wise-owl"]'::jsonb
WHERE current_streak < 2;

-- Update users with 2+ streak but less than 4 to have lazy-panda
UPDATE user_progress 
SET unlocked_characters = '["sassy-cat", "wise-owl", "lazy-panda"]'::jsonb
WHERE current_streak >= 2 AND current_streak < 4;

-- Update users with 4+ streak but less than 7 to have lazy-panda and sneaky-snake
UPDATE user_progress 
SET unlocked_characters = '["sassy-cat", "wise-owl", "lazy-panda", "sneaky-snake"]'::jsonb
WHERE current_streak >= 4 AND current_streak < 7;

-- Update users with 7+ streak to have all characters
UPDATE user_progress 
SET unlocked_characters = '["sassy-cat", "wise-owl", "lazy-panda", "sneaky-snake", "people-pleaser-pup"]'::jsonb
WHERE current_streak >= 7;

-- Update the default value for the table to only include base characters
ALTER TABLE user_progress 
ALTER COLUMN unlocked_characters 
SET DEFAULT '["sassy-cat", "wise-owl"]'::jsonb;
