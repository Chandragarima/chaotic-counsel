
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Instagram, Share, Copy, Loader2 } from 'lucide-react';
import { Character, AIResponse } from '../../types';
import { shareService, ShareData } from '../../utils/shareService';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import ShareCard from './ShareCard';
import { toast } from 'sonner';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: Character;
  question: string;
  answer?: string;
  aiResponse?: AIResponse | null;
}

const ShareModal = ({ open, onOpenChange, character, question, answer, aiResponse }: ShareModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
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

  const shareData: ShareData = {
    character: character.name,
    question,
    answer: getDisplayAnswer(),
    characterType: character.type
  };

  const generateImage = async () => {
    if (generatedImage) return generatedImage;
    
    setIsGenerating(true);
    try {
      const imageUrl = await shareService.generateShareImage('share-card');
      setGeneratedImage(imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Failed to generate image:', error);
      toast.error('Failed to generate share image');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async (platform: 'instagram' | 'whatsapp' | 'general' | 'copy') => {
    try {
      let result;
      
      switch (platform) {
        case 'instagram':
          const instagramImage = await generateImage();
          if (instagramImage) {
            const instagramText = shareService.generateInstagramText(shareData);
            result = await shareService.shareToInstagram(instagramImage, instagramText);
          }
          break;
          
        case 'whatsapp':
          const whatsappImage = await generateImage();
          const whatsappText = shareService.generateShareText(shareData);
          result = await shareService.shareToWhatsApp(whatsappText, whatsappImage || undefined);
          break;
          
        case 'general':
          const generalImage = await generateImage();
          const generalText = shareService.generateShareText(shareData);
          result = await shareService.shareGeneral(generalText, generalImage || undefined);
          break;
          
        case 'copy':
          const copyImage = await generateImage();
          const copyText = shareService.generateShareText(shareData);
          result = await shareService.copyToClipboard(copyText, copyImage || undefined);
          break;
      }

      if (result?.message) {
        toast.success(result.message);
      } else {
        toast.success('Shared successfully!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className={`text-2xl ${theme.fonts.heading} bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent`}>
              Share Your Mystical Answer
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Preview */}
            <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{character.name[0]}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{character.name}</h3>
                    <p className="text-sm text-muted-foreground">Mystical Guidance</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium">"{question}"</p>
                  <p className="text-sm bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-3 rounded-lg">
                    "{getDisplayAnswer()}"
                  </p>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Get your own mystical guidance at {window.location.origin}
                </div>
              </div>
            </Card>

            {/* Share Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleShare('instagram')}
                disabled={isGenerating}
                className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Instagram className="w-5 h-5 mr-2" />
                )}
                Instagram Stories
              </Button>

              <Button
                onClick={() => handleShare('whatsapp')}
                disabled={isGenerating}
                className="h-16 bg-green-500 hover:bg-green-600 text-white"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <span className="w-5 h-5 mr-2 text-lg">💬</span>
                )}
                WhatsApp
              </Button>

              <Button
                onClick={() => handleShare('general')}
                disabled={isGenerating}
                variant="outline"
                className="h-16"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Share className="w-5 h-5 mr-2" />
                )}
                Share Anywhere
              </Button>

              <Button
                onClick={() => handleShare('copy')}
                disabled={isGenerating}
                variant="outline"
                className="h-16"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Copy className="w-5 h-5 mr-2" />
                )}
                Copy & Download
              </Button>
            </div>

            {isGenerating && (
              <div className="text-center text-sm text-muted-foreground">
                Generating your beautiful share card...
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden ShareCard for image generation */}
      <ShareCard
        character={character}
        question={question}
        answer={answer}
        aiResponse={aiResponse}
        isGenerating={true}
      />
    </>
  );
};

export default ShareModal;
