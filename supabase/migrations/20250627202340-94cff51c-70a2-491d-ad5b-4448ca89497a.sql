
-- Add a new column to track which celebrations have been shown to each user
ALTER TABLE public.user_progress 
ADD COLUMN celebrations_shown jsonb DEFAULT '[]'::jsonb;

-- Update existing records to mark all currently unlocked characters as celebrated
-- (assuming users have already seen celebrations for characters they unlocked before this update)
UPDATE public.user_progress 
SET celebrations_shown = unlocked_characters
WHERE celebrations_shown IS NULL OR celebrations_shown = '[]'::jsonb;
