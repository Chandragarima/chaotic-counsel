
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Loader2 } from 'lucide-react';
import { Character, AIResponse } from '../../types';
import { shareService, ShareData } from '../../utils/shareService';
import { getPersonalityTheme } from '../../utils/personalityThemes';
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
      const canvasData = {
        character,
        question,
        answer,
        aiResponse
      };
      const imageUrl = await shareService.generateShareImage(canvasData);
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

  const handleShare = async (platform: 'instagram' | 'whatsapp' | 'tiktok' | 'copy') => {
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

        case 'tiktok':
          const tiktokImage = await generateImage();
          const tiktokText = shareService.generateTikTokText(shareData);
          result = await shareService.shareToTikTok(tiktokImage, tiktokText);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg mx-4 sm:mx-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className={`text-2xl sm:text-3xl font-bold ${theme.fonts.heading} bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent text-center`}>
            Share Your Mystical Answer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Card */}
          <Card className="p-4 bg-gradient-to-br from-slate-100/50 to-slate-200/50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-sm border border-border/50">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-sm`}>
                  <span className="text-white font-semibold text-sm">{character.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground">{character.name}</h3>
                  <p className="text-xs text-muted-foreground">Mystical Guidance</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground italic">"{question}"</p>
                <div className="bg-gradient-to-r from-slate-50/80 to-slate-100/80 dark:from-slate-700/80 dark:to-slate-800/80 p-3 rounded-lg border border-border/30">
                  <p className="text-sm text-foreground leading-relaxed">
                    "{getDisplayAnswer()}"
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30">
                Meet your chaotic counsel at {window.location.origin.replace('https://', '')}
              </div>
            </div>
          </Card>

          {/* Share Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleShare('instagram')}
                disabled={isGenerating}
                className="h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                )}
                Instagram
              </Button>

              <Button
                onClick={() => handleShare('whatsapp')}
                disabled={isGenerating}
                className="h-12 bg-green-500 hover:bg-green-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                )}
                WhatsApp
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => handleShare('tiktok')}
                disabled={isGenerating}
                className="h-12 bg-black hover:bg-gray-800 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                )}
                TikTok
              </Button>

              <Button
                onClick={() => handleShare('copy')}
                disabled={isGenerating}
                variant="outline"
                className="h-12 border-border/50 hover:bg-accent/50 font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                Copy & Download
              </Button>
            </div>
          </div>

          {isGenerating && (
            <div className="text-center text-sm text-muted-foreground animate-pulse">
              Generating your beautiful share card...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
