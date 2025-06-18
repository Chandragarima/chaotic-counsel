
-- Add username and avatar_url columns to profiles table if they don't exist
-- and create a function to generate unique animal usernames

-- First, let's create a function to generate unique animal usernames
CREATE OR REPLACE FUNCTION public.generate_unique_animal_username()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = 'public'
AS $$
DECLARE
  animals TEXT[] := ARRAY[
    'Tiger', 'Lion', 'Elephant', 'Giraffe', 'Zebra', 'Kangaroo', 'Panda', 'Koala',
    'Dolphin', 'Whale', 'Shark', 'Octopus', 'Eagle', 'Hawk', 'Owl', 'Penguin',
    'Fox', 'Wolf', 'Bear', 'Rabbit', 'Squirrel', 'Hedgehog', 'Otter', 'Seal',
    'Cheetah', 'Leopard', 'Jaguar', 'Lynx', 'Bobcat', 'Mongoose', 'Meerkat',
    'Flamingo', 'Peacock', 'Parrot', 'Toucan', 'Hummingbird', 'Robin', 'Cardinal',
    'Butterfly', 'Dragonfly', 'Ladybug', 'Beetle', 'Mantis', 'Cricket'
  ];
  adjectives TEXT[] := ARRAY[
    'Swift', 'Brave', 'Clever', 'Mighty', 'Gentle', 'Fierce', 'Wise', 'Playful',
    'Noble', 'Bold', 'Graceful', 'Vibrant', 'Serene', 'Daring', 'Radiant',
    'Mystic', 'Golden', 'Silver', 'Cosmic', 'Stellar', 'Lunar', 'Solar',
    'Arctic', 'Tropical', 'Mountain', 'Ocean', 'Forest', 'Desert', 'Royal',
    'Ancient', 'Magic', 'Crystal', 'Thunder', 'Lightning', 'Storm', 'Peaceful'
  ];
  random_animal TEXT;
  random_adjective TEXT;
  random_number INTEGER;
  proposed_username TEXT;
  username_exists BOOLEAN;
  max_attempts INTEGER := 100;
  attempt_count INTEGER := 0;
BEGIN
  LOOP
    -- Select random animal and adjective
    random_animal := animals[floor(random() * array_length(animals, 1) + 1)];
    random_adjective := adjectives[floor(random() * array_length(adjectives, 1) + 1)];
    random_number := floor(random() * 999 + 1);
    
    -- Create username in format: AdjectiveAnimal123
    proposed_username := random_adjective || random_animal || random_number::TEXT;
    
    -- Check if username already exists
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE username = proposed_username) INTO username_exists;
    
    -- If username doesn't exist, return it
    IF NOT username_exists THEN
      RETURN proposed_username;
    END IF;
    
    -- Increment attempt counter and exit if too many attempts
    attempt_count := attempt_count + 1;
    IF attempt_count >= max_attempts THEN
      -- Fallback: use timestamp to ensure uniqueness
      RETURN random_adjective || random_animal || extract(epoch from now())::INTEGER::TEXT;
    END IF;
  END LOOP;
END;
$$;

-- Update the handle_new_user function to generate animal usernames and assign random avatars
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
  
  -- Insert user progress
  INSERT INTO public.user_progress (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Add RLS policies for profiles table to allow users to read/update their own profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to view all profiles (for displaying usernames publicly)
CREATE POLICY "Users can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

-- Allow users to update only their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);
