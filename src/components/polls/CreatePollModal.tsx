
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Users, Share2 } from 'lucide-react';
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
      <DialogContent className="max-w-2xl mx-4 sm:mx-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className={`text-2xl sm:text-3xl font-bold ${theme.fonts.heading} bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent text-center`}>
            {createdPollUrl ? 'Poll Created!' : 'Create Community Poll'}
          </DialogTitle>
        </DialogHeader>

        {!createdPollUrl ? (
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="p-6 bg-gradient-to-br from-slate-100/50 to-slate-200/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm border border-border/50">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-sm`}>
                    <span className="text-white font-semibold">{character.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{character.name}'s Advice</h3>
                    <p className="text-sm text-muted-foreground">Community Decision Poll</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-base font-medium text-foreground italic">"{question}"</p>
                  <div className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-700/80 dark:to-slate-800/80 p-4 rounded-lg border border-border/30">
                    <p className="text-base text-foreground leading-relaxed">
                      "{getDisplayAnswer()}"
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground text-center pt-2 border-t border-border/30">
                  Your friends will vote anonymously to help you decide
                </div>
              </div>
            </Card>

            {/* Duration Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                How long should the poll run?
              </label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour - Quick decision</SelectItem>
                  <SelectItem value="24h">24 Hours - Give everyone time</SelectItem>
                  <SelectItem value="3d">3 Days - Weekend decision</SelectItem>
                  <SelectItem value="1w">1 Week - Big life choice</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Create Button */}
            <Button
              onClick={createPoll}
              disabled={isCreating}
              className={`w-full h-12 text-lg font-medium bg-gradient-to-r ${theme.colors.primary} hover:${theme.colors.secondary} text-white shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              <Users className="w-5 h-5 mr-2" />
              {isCreating ? 'Creating Poll...' : 'Create Community Poll'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            {/* Success Message */}
            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-green-800 dark:text-green-200">
                <Users className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Your poll is ready!</h3>
                <p className="text-sm">Share the link below with your friends so they can help you decide.</p>
              </div>
            </div>

            {/* Poll URL */}
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-2">Poll Link:</p>
              <p className="font-mono text-sm break-all text-foreground">{createdPollUrl}</p>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={copyPollUrl}
                variant="outline"
                className="h-12"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              
              <Button
                onClick={() => sharePoll('whatsapp')}
                className="h-12 bg-green-500 hover:bg-green-600 text-white"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                WhatsApp
              </Button>
              
              <Button
                onClick={() => sharePoll('general')}
                variant="outline"
                className="h-12"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Button
              onClick={() => onOpenChange(false)}
              variant="ghost"
              className="w-full"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePollModal;
