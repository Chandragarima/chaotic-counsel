
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { toast } from 'sonner';

interface Poll {
  id: string;
  question: string;
  personality_answer: string;
  character_name: string;
  character_type: string;
  expires_at: string;
  total_votes: number;
  upvotes: number;
  downvotes: number;
  is_active: boolean;
}

const Poll = () => {
  const { pollId } = useParams<{ pollId: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Generate or get session ID for anonymous voting
  const getSessionId = () => {
    let sessionId = localStorage.getItem('poll_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('poll_session_id', sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    if (pollId) {
      fetchPoll();
      checkIfVoted();
    }
  }, [pollId]);

  useEffect(() => {
    if (poll && poll.is_active) {
      const interval = setInterval(() => {
        updateTimeRemaining();
      }, 60000); // Update every minute

      updateTimeRemaining();
      return () => clearInterval(interval);
    }
  }, [poll]);

  const fetchPoll = async () => {
    try {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('id', pollId)
        .single();

      if (error) {
        console.error('Error fetching poll:', error);
        toast.error('Poll not found');
        return;
      }

      setPoll(data);
    } catch (error) {
      console.error('Error fetching poll:', error);
      toast.error('Failed to load poll');
    } finally {
      setLoading(false);
    }
  };

  const checkIfVoted = async () => {
    const sessionId = getSessionId();
    
    try {
      const { data, error } = await supabase
        .from('poll_votes')
        .select('vote_type')
        .eq('poll_id', pollId)
        .eq('voter_session', sessionId)
        .maybeSingle();

      if (data) {
        setHasVoted(true);
        setUserVote(data.vote_type as 'up' | 'down');
      }
    } catch (error) {
      console.error('Error checking vote status:', error);
    }
  };

  const updateTimeRemaining = () => {
    if (!poll) return;

    const now = new Date();
    const expiresAt = new Date(poll.expires_at);
    const timeDiff = expiresAt.getTime() - now.getTime();

    if (timeDiff <= 0) {
      setTimeRemaining('Poll ended');
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      setTimeRemaining(`${days}d ${hours}h remaining`);
    } else if (hours > 0) {
      setTimeRemaining(`${hours}h ${minutes}m remaining`);
    } else {
      setTimeRemaining(`${minutes}m remaining`);
    }
  };

  const vote = async (voteType: 'up' | 'down') => {
    if (!poll || hasVoted || voting) return;

    setVoting(true);
    const sessionId = getSessionId();

    try {
      const { error } = await supabase
        .from('poll_votes')
        .insert({
          poll_id: poll.id,
          vote_type: voteType,
          voter_session: sessionId,
          voter_ip: null // Optional: you could get IP for additional duplicate prevention
        });

      if (error) {
        console.error('Error voting:', error);
        toast.error('Failed to record vote. You may have already voted.');
        return;
      }

      setHasVoted(true);
      setUserVote(voteType);
      toast.success('Vote recorded successfully!');
      
      // Refresh poll data to get updated counts
      await fetchPoll();
      
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Failed to record vote');
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading poll...</div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-4 text-center">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="text-2xl font-bold mb-2">Poll Not Found</h1>
          <p className="text-muted-foreground">This poll may have been deleted or the link is incorrect.</p>
        </Card>
      </div>
    );
  }

  const theme = getPersonalityTheme(poll.character_type as any);
  const isExpired = new Date(poll.expires_at) <= new Date() || !poll.is_active;
  const upvotePercentage = poll.total_votes > 0 ? (poll.upvotes / poll.total_votes) * 100 : 0;
  const downvotePercentage = poll.total_votes > 0 ? (poll.downvotes / poll.total_votes) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center text-white space-y-2">
          <h1 className={`text-3xl font-bold ${theme.fonts.heading}`}>Community Decision Poll</h1>
          <p className="text-purple-200">Help decide what to do based on personality guidance</p>
        </div>

        {/* Poll Card */}
        <Card className="p-6 bg-white/10 backdrop-blur-md border border-white/20">
          <div className="space-y-6">
            {/* Character Header */}
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg">{poll.character_name[0]}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{poll.character_name}'s Advice</h2>
                <div className="flex items-center space-x-4 text-sm text-purple-200">
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {poll.total_votes} votes
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {timeRemaining}
                  </span>
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-white">The Question:</h3>
              <p className="text-purple-100 italic bg-white/5 p-4 rounded-lg border border-white/10">
                "{poll.question}"
              </p>
            </div>

            {/* Answer */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-white">{poll.character_name}'s Recommendation:</h3>
              <div className={`p-4 rounded-lg bg-gradient-to-r ${theme.colors.primary}/20 border border-white/10`}>
                <p className="text-white leading-relaxed">
                  "{poll.personality_answer}"
                </p>
              </div>
            </div>

            {/* Voting Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white text-center">
                What do you think? Should they follow this advice?
              </h3>

              {!isExpired && !hasVoted ? (
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => vote('up')}
                    disabled={voting}
                    className="h-16 bg-green-500 hover:bg-green-600 text-white font-medium text-lg"
                  >
                    <ThumbsUp className="w-6 h-6 mr-2" />
                    Yes, Follow It!
                  </Button>
                  <Button
                    onClick={() => vote('down')}
                    disabled={voting}
                    className="h-16 bg-red-500 hover:bg-red-600 text-white font-medium text-lg"
                  >
                    <ThumbsDown className="w-6 h-6 mr-2" />
                    No, Don't Do It
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {hasVoted && (
                    <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-400" />
                      <p className="text-green-100">
                        You voted: <span className="font-semibold">
                          {userVote === 'up' ? 'Yes, Follow It!' : 'No, Don\'t Do It'}
                        </span>
                      </p>
                    </div>
                  )}

                  {isExpired && (
                    <div className="text-center p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                      <p className="text-orange-100">This poll has ended</p>
                    </div>
                  )}

                  {/* Results */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-white">
                      <span className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-2 text-green-400" />
                        Yes, Follow It
                      </span>
                      <span className="font-semibold">{poll.upvotes} ({upvotePercentage.toFixed(0)}%)</span>
                    </div>
                    <Progress value={upvotePercentage} className="h-3 bg-white/10" />

                    <div className="flex items-center justify-between text-white">
                      <span className="flex items-center">
                        <ThumbsDown className="w-4 h-4 mr-2 text-red-400" />
                        No, Don't Do It
                      </span>
                      <span className="font-semibold">{poll.downvotes} ({downvotePercentage.toFixed(0)}%)</span>
                    </div>
                    <Progress value={downvotePercentage} className="h-3 bg-white/10" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-purple-200 text-sm">
          <p>Get your own mystical guidance at <span className="font-semibold">chaoticcounsel.com</span></p>
        </div>
      </div>
    </div>
  );
};

export default Poll;
