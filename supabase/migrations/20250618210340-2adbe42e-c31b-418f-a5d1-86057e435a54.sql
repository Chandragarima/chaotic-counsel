
-- Update the handle_new_user function to properly initialize streak data
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  animal_username TEXT;
  avatar_emojis TEXT[] := ARRAY[
    '🐱', '🐶', '🦊', '🐺', '🦁', '🐯', '🐨', '🐼',
    '🐸', '🐙', '🦉', '🦅', '🐧', '🦋', '🐝', '🦒',
    '🐘', '🦏', '🦛', '🐊', '🐢', '🦕', '🦖', '🐳',
    '🐬', '🦈', '🐟', '🐠', '🐡', '🦞', '🦀', '🐚',
    '🌟', '⭐', '🌙', '☀️', '🌈', '⚡', '🔥', '💎'
  ];
  random_avatar TEXT;
BEGIN
  -- Generate unique animal username
  animal_username := generate_unique_animal_username();
  
  -- Select random emoji avatar
  random_avatar := avatar_emojis[floor(random() * array_length(avatar_emojis, 1) + 1)];
  
  -- Insert profile with generated username and avatar
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (new.id, animal_username, random_avatar);
  
  -- Insert user progress with proper initial streak data
  INSERT INTO public.user_progress (user_id, current_streak, longest_streak, last_streak_date)
  VALUES (new.id, 1, 1, CURRENT_DATE);
  
  RETURN new;
END;
$$;
