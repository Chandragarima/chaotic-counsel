
-- Create feedback table to store user responses
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  session_id TEXT, -- For anonymous users
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('post_decision', 'general')),
  character_used TEXT, -- Which character they interacted with
  app_satisfaction INTEGER CHECK (app_satisfaction >= 1 AND app_satisfaction <= 5),
  favorite_character TEXT,
  desired_characters TEXT[], -- Array of character suggestions
  willing_detailed_feedback BOOLEAN,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow users to insert their own feedback (both authenticated and anonymous)
CREATE POLICY "Users can submit feedback" 
  ON public.feedback 
  FOR INSERT 
  WITH CHECK (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN auth.uid() = user_id
      ELSE user_id IS NULL AND session_id IS NOT NULL
    END
  );

-- Allow users to view their own feedback
CREATE POLICY "Users can view their own feedback" 
  ON public.feedback 
  FOR SELECT 
  USING (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN auth.uid() = user_id
      ELSE user_id IS NULL
    END
  );
