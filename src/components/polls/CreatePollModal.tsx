import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Share2, Sparkles, Timer, MessageCircle } from 'lucide-react';
import { Character, AIResponse } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
        toast.error('You need to be logged in to create a poll');
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
        toast.error('Failed to create poll. Please try again.');
        return;
      }

      const pollUrl = `${window.location.origin}/poll/${poll.id}`;
      setCreatedPollUrl(pollUrl);
      toast.success('Poll created successfully!');
      
    } catch (error) {
      console.error('Error creating poll:', error);
      toast.error('Failed to create poll. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const copyPollUrl = async () => {
    if (createdPollUrl) {
      await navigator.clipboard.writeText(createdPollUrl);
      toast.success('Poll link copied to clipboard!');
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[420px] mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-purple-400/20 shadow-2xl rounded-3xl p-4 sm:p-6">
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center flex items-center justify-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            {createdPollUrl ? 'Poll Ready!' : 'Community Poll'}
          </DialogTitle>
        </DialogHeader>

        {!createdPollUrl ? (
          <div className="space-y-4 sm:space-y-6">
            {/* Character & Question Preview */}
            <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-4 sm:p-5 overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-10 sm:translate-x-10"></div>
              
              <div className="relative space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-lg ring-2 ring-white/20`}>
                    <span className="text-white font-bold text-sm sm:text-lg">{character.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">{character.name}</h3>
                    <p className="text-xs sm:text-sm text-purple-200/80">says...</p>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                    <p className="text-xs sm:text-sm text-purple-100/90 italic font-medium line-clamp-2">"{question}"</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl p-3 sm:p-4 border border-purple-300/30">
                    <p className="text-xs sm:text-sm text-white leading-relaxed line-clamp-3">"{getDisplayAnswer()}"</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <Timer className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">Duration</span>
              </div>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="bg-slate-800/50 border-purple-400/30 text-white h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-purple-400/30 rounded-xl">
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
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl border-0"
            >
              {isCreating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Create Poll
                </div>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 text-center">
            {/* Success Animation */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping opacity-20"></div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-white">Ready to Share!</h3>
              <p className="text-purple-200/80 text-xs sm:text-sm">Your community can now help you decide</p>
            </div>

            {/* Poll URL Display */}
            <div className="bg-slate-800/50 rounded-xl p-3 sm:p-4 border border-purple-400/20">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-purple-200/60 mb-1">Poll Link</p>
                  <p className="font-mono text-xs sm:text-sm text-white truncate">{createdPollUrl}</p>
                </div>
                <Button
                  onClick={copyPollUrl}
                  size="sm"
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs px-3 py-2 rounded-lg"
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* Share Actions */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Button
                onClick={() => sharePoll('whatsapp')}
                className="h-10 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg sm:rounded-xl text-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              
              <Button
                onClick={() => sharePoll('general')}
                className="h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg sm:rounded-xl text-sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePollModal;
