
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Facebook, Twitter, Linkedin, Mail, QrCode } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { ShareService } from '@/utils/shareService';
import { QRCodeSVG } from 'qrcode.react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
  description: string;
}

const ShareModal = ({ isOpen, onClose, shareUrl, title, description }: ShareModalProps) => {
  const [showQR, setShowQR] = useState(false);
  const shareService = new ShareService();

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
      action: () => shareService.shareToFacebook(shareUrl, title),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => shareService.shareToTwitter(shareUrl, title),
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      action: () => shareService.shareToLinkedIn(shareUrl, title, description),
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'Email',
      icon: Mail,
      action: () => shareService.shareViaEmail(shareUrl, title, description),
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
