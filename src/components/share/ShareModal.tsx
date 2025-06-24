
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Facebook, Twitter, Linkedin, Mail, QrCode } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { shareService } from '@/utils/shareService';
import { QRCodeSVG } from 'qrcode.react';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  character: any;
  question: string;
  answer?: string;
  aiResponse?: any;
}

const ShareModal = ({ open, onOpenChange, character, question, answer, aiResponse }: ShareModalProps) => {
  const [showQR, setShowQR] = useState(false);
  
  // Generate share URL and content
  const shareUrl = window.location.href;
  const shareData = {
    character: character.name,
    question: question,
    answer: answer || '',
    characterType: character.type
  };
  
  const shareText = shareService.generateShareText(shareData);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "The share link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy link to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async (platform: string) => {
    try {
      let result;
      switch (platform) {
        case 'instagram':
          const imageUrl = await shareService.generateShareImage(shareData);
          const instagramText = shareService.generateInstagramText(shareData);
          result = await shareService.shareToInstagram(imageUrl, instagramText);
          break;
        case 'tiktok':
          const tiktokImageUrl = await shareService.generateShareImage(shareData);
          const tiktokText = shareService.generateTikTokText(shareData);
          result = await shareService.shareToTikTok(tiktokImageUrl, tiktokText);
          break;
        case 'x':
          const xImageUrl = await shareService.generateShareImage(shareData);
          result = await shareService.shareToX(shareText, xImageUrl);
          break;
        case 'general':
          result = await shareService.shareGeneral(shareText);
          break;
        default:
          result = await shareService.copyToClipboard(shareText);
      }
      
      if (result.message) {
        toast({
          title: "Success!",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Failed to share content.",
        variant: "destructive",
      });
    }
  };

  const shareOptions = [
    {
      name: 'Instagram',
      icon: Facebook, // Using Facebook icon as placeholder
      action: () => handleShare('instagram'),
      color: 'bg-pink-600 hover:bg-pink-700'
    },
    {
      name: 'TikTok',
      icon: Twitter, // Using Twitter icon as placeholder
      action: () => handleShare('tiktok'),
      color: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      action: () => handleShare('x'),
      color: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'Share',
      icon: Mail,
      action: () => handleShare('general'),
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-800/95 backdrop-blur-md border border-amber-400/20">
        <DialogHeader>
          <DialogTitle className="text-amber-100">Share your decision</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* URL Input with Copy Button */}
          <div className="flex items-center space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="bg-slate-700/50 border-amber-400/20 text-amber-100"
            />
            <Button
              onClick={copyToClipboard}
              size="icon"
              variant="outline"
              className="border-amber-400/20 text-amber-100 hover:bg-amber-400/10"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                onClick={option.action}
                className={`${option.color} text-white transition-all duration-200 hover:scale-105`}
              >
                <option.icon className="h-4 w-4 mr-2" />
                {option.name}
              </Button>
            ))}
          </div>

          {/* QR Code Toggle */}
          <div className="text-center">
            <Button
              onClick={() => setShowQR(!showQR)}
              variant="outline"
              className="border-amber-400/20 text-amber-100 hover:bg-amber-400/10"
            >
              <QrCode className="h-4 w-4 mr-2" />
              {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </Button>
          </div>

          {/* QR Code Display */}
          {showQR && (
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <QRCodeSVG value={shareUrl} size={200} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
