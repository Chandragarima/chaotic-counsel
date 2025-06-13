import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ThumbsUp, ThumbsDown, Clock, Users, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getPersonalityTheme } from '../utils/personalityThemes';
import { toast } from 'sonner';
import CharacterAvatar from '@/components/answer/CharacterAvatar';
import PersonalityEffects from '@/components/PersonalityEffects';

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
  const navigate = useNavigate();
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
      }, 60000);
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
          voter_ip: null
        });

      if (error) {
        console.error('Error voting:', error);
        toast.error('Failed to record vote. You may have already voted.');
        return;
      }

      setHasVoted(true);
      setUserVote(voteType);
      toast.success('Vote recorded successfully!');
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
      <div className="min-h-screen relative overflow-hidden">
        <PersonalityEffects character={{ type: 'wise-owl' } as any} isActive={true} />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto animate-spin rounded-full border-4 border-white/20 border-t-white/80"></div>
            <p className="text-white/80 text-lg font-medium">Loading community wisdom...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <PersonalityEffects character={{ type: 'wise-owl' } as any} isActive={true} />
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <Card className="p-8 max-w-md mx-auto text-center bg-white/10 backdrop-blur-xl border border-white/20">
            <XCircle className="w-20 h-20 mx-auto mb-6 text-red-400" />
            <h1 className="text-2xl font-bold mb-3 text-white">Poll Not Found</h1>
            <p className="text-white/70 mb-6">This poll may have been deleted or the link is incorrect.</p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-6 py-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const theme = getPersonalityTheme(poll.character_type as any);
  const character = { 
    type: poll.character_type, 
    name: poll.character_name 
  } as any;
  
  const isExpired = new Date(poll.expires_at) <= new Date() || !poll.is_active;
  const upvotePercentage = poll.total_votes > 0 ? (poll.upvotes / poll.total_votes) * 100 : 0;
  const downvotePercentage = poll.total_votes > 0 ? (poll.downvotes / poll.total_votes) * 100 : 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PersonalityEffects character={character} isActive={true} />
      
      {/* Header Navigation */}
      <div className="relative z-10 p-4">
        <Button 
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-white/80 hover:text-white hover:bg-white/10 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-8">
        {/* Page Header */}
        <div className="text-center mb-8 space-y-3">
          <h1 className={`text-4xl md:text-5xl font-bold text-white ${theme.fonts.heading} ${theme.animations.entrance}`}>
            Community Decision Poll
          </h1>
          <p className="text-xl text-white/80 font-light">
            Help decide what to do based on personality guidance
          </p>
        </div>

        {/* Character Section with Avatar */}
        <div className="flex flex-col items-center mb-8">
          <CharacterAvatar
            character={character}
            responseType="choice"
            isThinking={false}
            className="mb-6"
          />
          
          {/* Character Info Card */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 max-w-2xl w-full">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{poll.total_votes} votes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">{timeRemaining}</span>
                </div>
              </div>
              
              <h2 className={`text-2xl font-bold text-white ${theme.fonts.heading}`}>
                {poll.character_name}'s Guidance
              </h2>
            </div>
          </Card>
        </div>

        {/* Question Section */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4 text-center">The Question:</h3>
          <div className="text-center">
            <p className="text-2xl text-white font-light italic leading-relaxed">
              "{poll.question}"
            </p>
          </div>
        </Card>

        {/* Answer Section */}
        <Card className={`bg-gradient-to-r ${theme.colors.primary}/20 backdrop-blur-xl border border-white/30 p-8 mb-8`}>
          <h3 className="text-xl font-semibold text-white mb-4 text-center">
            {poll.character_name}'s Recommendation:
          </h3>
          <div className="text-center">
            <p className="text-xl text-white leading-relaxed font-medium">
              "{poll.personality_answer}"
            </p>
          </div>
        </Card>

        {/* Voting Section */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            What do you think? Should they follow this advice?
          </h3>

          {!isExpired && !hasVoted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Button
                onClick={() => vote('up')}
                disabled={voting}
                className="h-20 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 border-0"
              >
                <ThumbsUp className="w-8 h-8 mr-3" />
                Yes, Follow It!
              </Button>
              <Button
                onClick={() => vote('down')}
                disabled={voting}
                className="h-20 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 border-0"
              >
                <ThumbsDown className="w-8 h-8 mr-3" />
                No, Don't Do It
              </Button>
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto">
              {hasVoted && (
                <div className="text-center p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 backdrop-blur-sm">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <p className="text-green-100 text-lg font-medium">
                    You voted: <span className="font-bold text-white">
                      {userVote === 'up' ? 'Yes, Follow It!' : 'No, Don\'t Do It'}
                    </span>
                  </p>
                </div>
              )}

              {isExpired && (
                <div className="text-center p-6 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl border border-orange-400/30 backdrop-blur-sm">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                  <p className="text-orange-100 text-lg font-medium">This poll has ended</p>
                </div>
              )}

              {/* Enhanced Results Display */}
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <ThumbsUp className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium text-lg">Yes, Follow It</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{poll.upvotes}</div>
                      <div className="text-sm text-white/60">{upvotePercentage.toFixed(0)}%</div>
                    </div>
                  </div>
                  <Progress 
                    value={upvotePercentage} 
                    className="h-4 bg-white/10"
                  />
                </div>

                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <ThumbsDown className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white font-medium text-lg">No, Don't Do It</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{poll.downvotes}</div>
                      <div className="text-sm text-white/60">{downvotePercentage.toFixed(0)}%</div>
                    </div>
                  </div>
                  <Progress 
                    value={downvotePercentage} 
                    className="h-4 bg-white/10"
                  />
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p className="text-lg">
            Get your own mystical guidance at <span className="font-semibold text-white/80">chaoticcounsel.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Poll;
