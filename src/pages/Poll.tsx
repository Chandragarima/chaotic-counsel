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
      setTimeRemaining(`${days}d ${hours}h`);
    } else if (hours > 0) {
      setTimeRemaining(`${hours}h ${minutes}m`);
    } else {
      setTimeRemaining(`${minutes}m`);
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
      
      {/* Fixed Header with Stats */}
      <div className="fixed top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">{poll.total_votes}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{timeRemaining}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20 pb-8 max-w-4xl mx-auto px-4">
        
        {/* 1. The Question - What user needs to think about */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <div className="text-white/60 text-sm font-medium mb-2 uppercase tracking-wide">
              Community Decision
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              "{poll.question}"
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
          </div>
        </div>

        {/* 2. Character with Personality Animation */}
        <div className="flex flex-col items-center mb-12">
          <CharacterAvatar
            character={character}
            responseType="choice"
            isThinking={false}
            className="mb-6"
          />
          
          <div className={`text-center space-y-2 ${theme.animations.entrance}`}>
            <h2 className={`text-xl font-bold text-white ${theme.fonts.heading}`}>
              {poll.character_name}
            </h2>
            <p className="text-white/60">shares their wisdom</p>
          </div>
        </div>

        {/* 3. The Recommended Answer */}
        <div className="mb-12">
          <div className={`relative bg-gradient-to-br ${theme.colors.primary}/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 ${theme.animations.entrance}`}>
            <div className="absolute -top-3 left-8">
              <div className={`bg-gradient-to-r ${theme.colors.primary} px-4 py-1 rounded-full text-white text-sm font-medium`}>
                Recommendation
              </div>
            </div>
            
            <div className="text-center pt-4">
              <blockquote className="text-xl md:text-2xl text-white font-light italic leading-relaxed">
                "{poll.personality_answer}"
              </blockquote>
            </div>
          </div>
        </div>

        {/* 4. Voting Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              What's your take?
            </h3>
            <p className="text-white/70">
              Should they follow this advice?
            </p>
          </div>

          {!isExpired && !hasVoted ? (
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <Button
                onClick={() => vote('up')}
                disabled={voting}
                className="h-16 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 border-0 rounded-2xl"
              >
                <ThumbsUp className="w-6 h-6 mr-2" />
                Yes!
              </Button>
              <Button
                onClick={() => vote('down')}
                disabled={voting}
                className="h-16 bg-gradient-to-br from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 border-0 rounded-2xl"
              >
                <ThumbsDown className="w-6 h-6 mr-2" />
                Nope
              </Button>
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto">
              {hasVoted && (
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="text-white font-medium">
                    You voted: <span className="text-green-400">
                      {userVote === 'up' ? 'Yes!' : 'Nope'}
                    </span>
                  </p>
                </div>
              )}

              {isExpired && (
                <div className="text-center p-4 bg-orange-500/20 backdrop-blur-sm rounded-2xl border border-orange-400/30">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                  <p className="text-orange-100 font-medium">This poll has ended</p>
                </div>
              )}

              {/* Results Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <ThumbsUp className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white font-medium">Yes</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{poll.upvotes}</div>
                      <div className="text-xs text-white/60">{upvotePercentage.toFixed(0)}%</div>
                    </div>
                  </div>
                  <Progress value={upvotePercentage} className="h-2" />
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                        <ThumbsDown className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-white font-medium">Nope</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white">{poll.downvotes}</div>
                      <div className="text-xs text-white/60">{downvotePercentage.toFixed(0)}%</div>
                    </div>
                  </div>
                  <Progress value={downvotePercentage} className="h-2" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-white/60">
            Get your own mystical guidance at{' '}
            <span className="font-semibold text-white/80">chaoticcounsel.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Poll;
