
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Loader2, Download, ExternalLink, Instagram, Twitter } from 'lucide-react';
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

  const detectMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleShare = async (platform: 'instagram' | 'whatsapp' | 'tiktok' | 'x' | 'copy') => {
    try {
      let result;
      const isMobile = detectMobile();
      
      switch (platform) {
        case 'instagram':
          const instagramImage = await generateImage();
          if (instagramImage) {
            const instagramText = shareService.generateInstagramText(shareData);
            if (isMobile) {
              // Try to open Instagram app on mobile
              const instagramUrl = `instagram://camera`;
              window.open(instagramUrl, '_blank');
              // Fallback to regular sharing
              setTimeout(() => {
                result = shareService.shareToInstagram(instagramImage, instagramText);
              }, 1000);
            } else {
              result = await shareService.shareToInstagram(instagramImage, instagramText);
            }
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
          if (isMobile) {
            // Try to open TikTok app on mobile
            const tiktokUrl = `snssdk1233://`;
            window.open(tiktokUrl, '_blank');
            // Fallback to regular sharing
            setTimeout(() => {
              result = shareService.shareToTikTok(tiktokImage, tiktokText);
            }, 1000);
          } else {
            result = await shareService.shareToTikTok(tiktokImage, tiktokText);
          }
          break;

        case 'x':
          const xText = shareService.generateShareText(shareData);
          const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}`;
          if (isMobile) {
            // Try to open X app on mobile
            const xAppUrl = `twitter://post?message=${encodeURIComponent(xText)}`;
            window.open(xAppUrl, '_blank');
            // Fallback to web
            setTimeout(() => {
              window.open(xUrl, '_blank');
            }, 1000);
          } else {
            window.open(xUrl, '_blank');
          }
          result = { success: true, message: 'Opening X...' };
          break;
          
        case 'copy':
          const copyImage = await generateImage();
          const copyText = shareService.generateShareText(shareData);
          result = await shareService.copyToClipboard(copyText, copyImage || undefined);
          break;
      }

      if (result?.message) {
        toast.success(result.message);
      } else if (platform !== 'x') {
        toast.success('Shared successfully!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4 sm:mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-400/20 shadow-2xl">
        <DialogHeader className="space-y-4 pb-2">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent text-center">
            Share Your Mystical Answer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Card - More Compact */}
          <Card className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-amber-400/20 rounded-xl">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-semibold text-sm">{character.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-100">{character.name}</h3>
                  <p className="text-xs text-amber-200/70">Mystical Guidance</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-amber-100/90 italic font-medium">"{question}"</p>
                <div className="bg-gradient-to-r from-amber-400/10 to-amber-600/10 p-3 rounded-lg border border-amber-400/20">
                  <p className="text-sm text-amber-50 leading-relaxed">
                    "{getDisplayAnswer()}"
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Modern Share Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {/* Instagram */}
              <Button
                onClick={() => handleShare('instagram')}
                disabled={isGenerating}
                className="h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl border-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </div>
                )}
              </Button>

              {/* TikTok */}
              <Button
                onClick={() => handleShare('tiktok')}
                disabled={isGenerating}
                className="h-14 bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-gray-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl border-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                    <span>TikTok</span>
                  </div>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* X (Twitter) */}
              <Button
                onClick={() => handleShare('x')}
                disabled={isGenerating}
                className="h-14 bg-gradient-to-r from-slate-900 to-black hover:from-black hover:to-slate-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl border-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Twitter className="w-5 h-5" />
                    <span>X</span>
                  </div>
                )}
              </Button>

              {/* Download & Share */}
              <Button
                onClick={() => handleShare('copy')}
                disabled={isGenerating}
                className="h-14 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl border-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {isGenerating && (
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-amber-200/80">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-sm text-amber-200/70 mt-2">Crafting your mystical share card...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
