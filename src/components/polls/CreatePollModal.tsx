import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Share2, Sparkles, Timer, MessageCircle } from 'lucide-react';
import { Character, AIResponse } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { analytics } from '../../utils/analytics';

interface CreatePollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: Character;
  question: string;
  answer?: string;
  aiResponse?: AIResponse | null;
}

const CreatePollModal = ({ open, onOpenChange, character, question, answer, aiResponse }: CreatePollModalProps) => {
  const [duration, setDuration] = useState('24h');
  const [isCreating, setIsCreating] = useState(false);
  const [createdPollUrl, setCreatedPollUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'info' } | null>(null);
  const theme = getPersonalityTheme(character.type);

  const getDisplayAnswer = () => {
    if (aiResponse) {
      switch (aiResponse.responseType) {
        case 'binary':
          return aiResponse.personalityRecommendation;
        case 'advice':
          return aiResponse.mainAdvice;
        case 'recommendation':
          return aiResponse.topRecommendation;
        case 'analysis':
          return aiResponse.conclusion;
        case 'choice':
          return aiResponse.recommendedChoice;
        default:
          return answer || "The universe whispers its wisdom...";
      }
    }
    return answer || "The universe whispers its wisdom...";
  };

  const getDurationInHours = (duration: string) => {
    switch (duration) {
      case '1h': return 1;
      case '24h': return 24;
      case '3d': return 72;
      case '1w': return 168;
      default: return 24;
    }
  };

  const createPoll = async () => {
    setIsCreating(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setMessage({ text: 'You need to be logged in to create a poll', type: 'error' });
        return;
      }

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + getDurationInHours(duration));

      const { data: poll, error } = await supabase
        .from('polls')
        .insert({
          creator_id: user.id,
          question: question.trim(),
          personality_answer: getDisplayAnswer(),
          character_name: character.name,
          character_type: character.type,
          expires_at: expiresAt.toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating poll:', error);
        setMessage({ text: 'Failed to create poll. Please try again.', type: 'error' });
        return;
      }

      const pollUrl = `${window.location.origin}/poll/${poll.id}`;
      setCreatedPollUrl(pollUrl);
      setMessage({ text: 'Poll created successfully!', type: 'info' });
      
      analytics.trackPollCreated(character.type, character.name, 'community_poll');

    } catch (error) {
      console.error('Error creating poll:', error);
      setMessage({ text: 'Failed to create poll. Please try again.', type: 'error' });
    } finally {
      setIsCreating(false);
    }
  };

  const copyPollUrl = async () => {
    if (createdPollUrl) {
      await navigator.clipboard.writeText(createdPollUrl);
      setMessage({ text: 'Poll link copied to clipboard!', type: 'info' });
    }
  };

  const sharePoll = (platform: 'whatsapp' | 'general') => {
    if (!createdPollUrl) return;

    const shareText = `🗳️ Help me decide! ${character.name} gave me advice, but I want to know what you think.\n\nQuestion: "${question}"\n\nVote here: ${createdPollUrl}`;

    if (platform === 'whatsapp') {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      if (navigator.share) {
        navigator.share({
          title: 'Help me decide!',
          text: shareText,
          url: createdPollUrl
        });
      } else {
        copyPollUrl();
      }
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-full md:max-w-2xl p-4 md:p-8 mx-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            {createdPollUrl ? 'Poll Ready!' : 'Community Poll'}
          </DialogTitle>
        </DialogHeader>
        {message && (
          message.type === 'error' ? (
            <div className="text-red-800 text-sm text-center font-medium mb-2 bg-red-100 rounded-md px-4 py-2 border border-red-200/80">
              {message.text}
            </div>
          ) : (
            <div className="text-green-700 text-sm text-center font-medium mb-2">
              {message.text}
            </div>
          )
        )}
        <div className="space-y-6 w-full text-center">
          {/* Poll Creation Form (restored) */}
          {!createdPollUrl && (
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Character & Question Preview */}
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-6 translate-x-6 sm:-translate-y-8 sm:translate-x-8 lg:-translate-y-10 lg:translate-x-10"></div>
                <div className="relative space-y-2 sm:space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-lg ring-2 ring-white/20`}>
                      <span className="text-white font-bold text-xs sm:text-sm lg:text-lg">{character.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs sm:text-sm lg:text-base">{character.name}</h3>
                      <p className="text-xs sm:text-sm text-purple-200/80">says...</p>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="bg-white/5 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-white/10">
                      <p className="text-xs sm:text-sm text-purple-100/90 italic font-medium line-clamp-2">"{question}"</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 border border-purple-300/30">
                      <p className="text-xs sm:text-sm text-white leading-relaxed line-clamp-3">"{getDisplayAnswer()}"</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Duration Selection */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-white">
                  <Timer className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  <span className="text-xs sm:text-sm font-medium">Duration</span>
                </div>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="bg-slate-800/50 border-purple-400/30 text-white h-10 sm:h-12 rounded-lg sm:rounded-xl text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-400/30 rounded-lg sm:rounded-xl">
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="3d">3 Days</SelectItem>
                    <SelectItem value="1w">1 Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Create Button */}
              <Button
                onClick={createPoll}
                disabled={isCreating}
                className="w-full h-10 sm:h-12 lg:h-14 text-sm sm:text-base lg:text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-lg sm:rounded-xl lg:rounded-2xl border-0"
              >
                {isCreating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    Create Poll
                  </div>
                )}
              </Button>
            </div>
          )}

          {/* Success Animation / Poll Ready Message */}
          {createdPollUrl && (
            <div className="relative flex flex-col items-center justify-center w-full">
              {/* <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl mb-3">
                <Users className="w-8 h-8 text-white" />
              </div> */}
              {/* <h3 className="text-xl sm:text-2xl font-bold mb-1 bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent text-center">
                Your poll is ready!
              </h3> */}
              <p className="text-base sm:text-lg font-medium text-white-700 dark:text-white-200 text-center mb-2">
                Share the link below with your friends so they can help you decide.
              </p>
            </div>
          )}

          {/* Poll URL */}
          {createdPollUrl && (
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border w-full overflow-auto mt-2">
              <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">Poll Link:</p>
              <p className="font-mono text-base break-all text-green-900 dark:text-green-100 select-all">
                {createdPollUrl}
              </p>
            </div>
          )}

          {/* Share Options */}
          {createdPollUrl && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-2">
              <Button
                onClick={copyPollUrl}
                variant="outline"
                className="h-12 min-w-[140px]"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button
                onClick={() => sharePoll('whatsapp')}
                className="h-12 min-w-[140px] bg-green-500 hover:bg-green-600 text-white"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </Button>
            </div>
          )}

          {/* Close Button */}
          {/* <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            className="w-full"
          >
            Close
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePollModal;
