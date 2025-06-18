
-- Create polls table to store poll data
CREATE TABLE public.polls (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES auth.users NOT NULL,
  question TEXT NOT NULL,
  personality_answer TEXT NOT NULL,
  character_name TEXT NOT NULL,
  character_type TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  total_votes INTEGER NOT NULL DEFAULT 0,
  upvotes INTEGER NOT NULL DEFAULT 0,
  downvotes INTEGER NOT NULL DEFAULT 0
);

-- Create poll_votes table for anonymous voting
CREATE TABLE public.poll_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  voter_session TEXT NOT NULL, -- Session-based anonymous voting
  voter_ip TEXT, -- Optional IP tracking for duplicate prevention
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(poll_id, voter_session) -- Prevent duplicate votes from same session
);

-- Add Row Level Security (RLS) to polls table
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active polls
CREATE POLICY "Anyone can view active polls" 
  ON public.polls 
  FOR SELECT 
  USING (is_active = true AND expires_at > now());

-- Policy: Authenticated users can create polls
CREATE POLICY "Authenticated users can create polls" 
  ON public.polls 
  FOR INSERT 
  WITH CHECK (auth.uid() = creator_id);

-- Policy: Poll creators can view their own polls (including expired ones)
CREATE POLICY "Creators can view their own polls" 
  ON public.polls 
  FOR SELECT 
  USING (auth.uid() = creator_id);

-- Policy: Poll creators can update their own polls
CREATE POLICY "Creators can update their own polls" 
  ON public.polls 
  FOR UPDATE 
  USING (auth.uid() = creator_id);

-- Add RLS to poll_votes table
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view votes for active polls
CREATE POLICY "Anyone can view votes for active polls" 
  ON public.poll_votes 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.polls 
      WHERE polls.id = poll_votes.poll_id 
      AND polls.is_active = true 
      AND polls.expires_at > now()
    )
  );

-- Policy: Anyone can insert votes for active polls
CREATE POLICY "Anyone can vote on active polls" 
  ON public.poll_votes 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.polls 
      WHERE polls.id = poll_votes.poll_id 
      AND polls.is_active = true 
      AND polls.expires_at > now()
    )
  );

-- Function to update poll vote counts
CREATE OR REPLACE FUNCTION public.update_poll_counts()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.polls 
    SET 
      total_votes = total_votes + 1,
      upvotes = CASE WHEN NEW.vote_type = 'up' THEN upvotes + 1 ELSE upvotes END,
      downvotes = CASE WHEN NEW.vote_type = 'down' THEN downvotes + 1 ELSE downvotes END,
      updated_at = now()
    WHERE id = NEW.poll_id;
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$;

-- Trigger to auto-update poll counts when votes are added
CREATE TRIGGER update_poll_counts_trigger
  AFTER INSERT ON public.poll_votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_poll_counts();

-- Create index for better performance
CREATE INDEX idx_polls_expires_at ON public.polls(expires_at);
CREATE INDEX idx_polls_creator_id ON public.polls(creator_id);
CREATE INDEX idx_poll_votes_poll_id ON public.poll_votes(poll_id);
CREATE INDEX idx_poll_votes_session ON public.poll_votes(voter_session);
