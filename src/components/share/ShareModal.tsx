import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Download, Instagram, Twitter, Sparkles } from 'lucide-react';
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
      setMessage({ text: 'Failed to generate share image', type: 'error' });
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
              const instagramUrl = `instagram://camera`;
              window.open(instagramUrl, '_blank');
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
            const tiktokUrl = `snssdk1233://`;
            window.open(tiktokUrl, '_blank');
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
            const xAppUrl = `twitter://post?message=${encodeURIComponent(xText)}`;
            window.open(xAppUrl, '_blank');
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
        setMessage({ text: result.message, type: 'info' });
      } else if (platform !== 'x') {
        setMessage({ text: 'Shared successfully!', type: 'info' });
      }
    } catch (error) {
      console.error('Share failed:', error);
      setMessage({ text: 'Failed to share. Please try again.', type: 'error' });
    }
  };

  useEffect(() => {
    if (message && message.type === 'info') {
      const timer = setTimeout(() => setMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[420px] mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-400/20 shadow-2xl rounded-3xl p-4 sm:p-6">
        <DialogHeader className="space-y-3 pb-2">
          <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent text-center flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            Share This Wisdom
          </DialogTitle>
        </DialogHeader>
        {message && (
          <div
            className={
              message.type === 'error'
                ? 'p-3 rounded-lg text-center bg-red-100 text-red-800 font-medium mb-2'
                : 'px-4 py-2 rounded-md text-center bg-green-50 text-green-700 text-sm mb-2 border border-green-100 shadow-sm transition-opacity duration-300'
            }
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4 sm:space-y-6">
          {/* Compact Preview */}
          <div className="relative bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-4 sm:p-5 overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-full -translate-y-6 translate-x-6 sm:-translate-y-8 sm:translate-x-8"></div>
            
            <div className="relative space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r ${theme.colors.primary} flex items-center justify-center shadow-lg ring-2 ring-white/20`}>
                  <span className="text-white font-bold text-xs sm:text-sm">{character.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-amber-100 text-xs sm:text-sm">{character.name}</h3>
                  {/* <p className="text-xs text-amber-200/70">Chaotic Guidance</p> */}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="bg-white/5 rounded-lg p-2 sm:p-3 border border-white/10">
                  <p className="text-xs text-amber-100/90 italic line-clamp-2">"{question}"</p>
                </div>
                <div className="bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-lg p-2 sm:p-3 border border-amber-300/30">
                  <p className="text-xs text-amber-50 leading-relaxed line-clamp-3">"{getDisplayAnswer()}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Share Buttons Grid */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Instagram */}
              <Button
                onClick={() => handleShare('instagram')}
                disabled={isGenerating}
                className="h-12 sm:h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl border-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Instagram className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span className="text-xs">Instagram</span>
                  </div>
                )}
              </Button>

              {/* TikTok */}
              <Button
                onClick={() => handleShare('tiktok')}
                disabled={isGenerating}
                className="h-12 sm:h-16 bg-gradient-to-br from-black via-gray-800 to-gray-900 hover:from-gray-900 hover:via-gray-700 hover:to-black text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl border-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-4 h-4 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                    <span className="text-xs">TikTok</span>
                  </div>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* X (Twitter) */}
              <Button
                onClick={() => handleShare('x')}
                disabled={isGenerating}
                className="h-12 sm:h-16 bg-gradient-to-br from-slate-900 via-black to-slate-800 hover:from-black hover:via-slate-800 hover:to-slate-900 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl border-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Twitter className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span className="text-xs">X</span>
                  </div>
                )}
              </Button>

              {/* Download */}
              <Button
                onClick={() => handleShare('copy')}
                disabled={isGenerating}
                className="h-12 sm:h-16 bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500 hover:from-amber-500 hover:via-amber-400 hover:to-orange-400 text-slate-900 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl sm:rounded-2xl border-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <Download className="w-4 h-4 sm:w-6 sm:h-6" />
                    <span className="text-xs">Download</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Loading Animation */}
          {isGenerating && (
            <div className="text-center py-4">
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-xs text-amber-200/70">Crafting your mystical card...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
