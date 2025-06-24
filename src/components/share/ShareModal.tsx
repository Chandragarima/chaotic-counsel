
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Facebook, Twitter, Linkedin, Mail, QrCode } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
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
  
  const shareUrl = window.location.href;

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

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out my decision from ${character.name}!`)}`, '_blank'),
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank'),
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => window.open(`mailto:?subject=${encodeURIComponent(`Check out my decision!`)}&body=${encodeURIComponent(`I got some great advice from ${character.name}: ${shareUrl}`)}`, '_self'),
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
