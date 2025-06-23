import { canvasShareService } from './canvasShareService';

export interface ShareData {
  character: string;
  question: string;
  answer: string;
  characterType: string;
}

export interface ShareOptions {
  platform: 'instagram' | 'whatsapp' | 'general' | 'copy';
  imageUrl?: string;
  text?: string;
}

class ShareService {
  async generateShareImage(shareData: any): Promise<string> {
    try {
      return await canvasShareService.generateShareImage(shareData);
    } catch (error) {
      console.error('Error generating share image:', error);
      throw error;
    }
  }

  async shareToInstagram(imageUrl: string, text: string) {
    // Try to open Instagram app on mobile devices
    const instagramUrl = 'instagram://library?AssetPickerSourceType=1';
    
    // Check if we're on mobile and try to open Instagram app
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Try to open Instagram app first
      const appWindow = window.open(instagramUrl, '_blank');
      
      // If app doesn't open within a short time, fall back to web
      setTimeout(() => {
        if (appWindow && appWindow.closed) {
          // App opened successfully, now copy text and download image
          navigator.clipboard.writeText(text);
          
          const link = document.createElement('a');
          link.download = 'chaotic-counsel.png';
          link.href = imageUrl;
          link.click();
        } else {
          // App didn't open, try web Instagram
          window.open('https://www.instagram.com/', '_blank');
          navigator.clipboard.writeText(text);
          
          const link = document.createElement('a');
          link.download = 'chaotic-counsel.png';
          link.href = imageUrl;
          link.click();
        }
      }, 1000);
    } else {
      // Desktop fallback - copy text and download image
      await navigator.clipboard.writeText(text);
      
      const link = document.createElement('a');
      link.download = 'chaotic-counsel.png';
      link.href = imageUrl;
      link.click();
    }

    return {
      success: true,
      message: 'Image downloaded and text copied to clipboard. Share on Instagram!'
    };
  }

  // async shareToWhatsApp(text: string, imageUrl?: string) {
  //   const whatsappText = encodeURIComponent(text);
  //   const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    
  //   if (imageUrl) {
  //     // For WhatsApp with image, we'll download the image and provide instructions
  //     const link = document.createElement('a');
  //     link.download = 'mystical-answer.png';
  //     link.href = imageUrl;
  //     link.click();
  //   }
    
  //   window.open(whatsappUrl, '_blank');
  //   return { success: true, message: 'Image downloaded! Attach it to your WhatsApp message.' };
  // }

  async shareToTikTok(imageUrl: string, text: string) {
    // Try to open TikTok app on mobile devices
    const tiktokUrl = 'tiktok://';
    
    // Check if we're on mobile and try to open TikTok app
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Try to open TikTok app first
      const appWindow = window.open(tiktokUrl, '_blank');
      
      // If app doesn't open within a short time, fall back to web
      setTimeout(() => {
        if (appWindow && appWindow.closed) {
          // App opened successfully, now copy text and download image
          navigator.clipboard.writeText(text);
          
          const link = document.createElement('a');
          link.download = 'chaotic-counsel.png';
          link.href = imageUrl;
          link.click();
        } else {
          // App didn't open, try web TikTok
          window.open('https://www.tiktok.com/', '_blank');
          navigator.clipboard.writeText(text);
          
          const link = document.createElement('a');
          link.download = 'chaotic-counsel.png';
          link.href = imageUrl;
          link.click();
        }
      }, 1000);
    } else {
      // Desktop fallback - copy text and download image
      await navigator.clipboard.writeText(text);
      
      const link = document.createElement('a');
      link.download = 'chaotic-counsel.png';
      link.href = imageUrl;
      link.click();
    }

    return {
      success: true,
      message: 'Image downloaded and text copied to clipboard. Share on TikTok!'
    };
  }

  async shareToX(text: string, imageUrl?: string) {
    // X (Twitter) sharing
    const xText = encodeURIComponent(text);
    const xUrl = `https://x.com/intent/tweet?text=${xText}`;
    
    if (imageUrl) {
      // Download the image for user to save and attach manually
      const link = document.createElement('a');
      link.download = 'chaotic-counsel.png';
      link.href = imageUrl;
      link.click();
    }
    
    window.open(xUrl, '_blank');
    return { 
      success: true, 
      message: imageUrl ? 'Image downloaded! Attach it to your X post.' : 'Opening X...' 
    };
  }

  async shareGeneral(text: string, imageUrl?: string) {
    if (navigator.share && imageUrl) {
      try {
        // Convert data URL to blob for native sharing
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'chaotic-counsel.png', { type: 'image/png' });

        await navigator.share({
          title: 'Check out this chaotic advice!',
          text: text,
          files: [file]
        });
        return { success: true };
      } catch (error) {
        console.error('Native sharing failed:', error);
      }
    }

    // Fallback to copying text
    await navigator.clipboard.writeText(text);
    return { 
      success: true, 
      message: 'Text copied to clipboard!' 
    };
  }

  async copyToClipboard(text: string, imageUrl?: string) {
    await navigator.clipboard.writeText(text);
    
    if (imageUrl) {
      // Also download the image
      const link = document.createElement('a');
      link.download = 'chaotic-counsel.png';
      link.href = imageUrl;
      link.click();
    }
    
    return { 
      success: true, 
      message: 'Content copied and image downloaded!' 
    };
  }

  generateShareText(data: ShareData): string {
    const appUrl = window.location.origin;
    return `🔮 Just got some wild advice from ${data.character}!

"${data.question}"

${data.character}'s advice: "${data.answer}"

Get your wild advice at ${appUrl} ✨`;
  }

  generateInstagramText(data: ShareData): string {
    return `🔮 ${data.character} just dropped some wisdom! 

"${data.answer}"

What would they tell you? Find out at the link in bio! ✨

#ChaoticGuidance #${data.characterType.replace('-', '')} #LifeAdvice #DailyDecision`;
  }

  generateTikTokText(data: ShareData): string {
    return `🔮 ${data.character} just gave me the BEST advice! 

"${data.answer}"

What would they tell you? 

#ChaoticCounsel #${data.characterType.replace('-', '')} #DailyWisdom #LifeAdvice #TikTokMade`;
  }
}

export const shareService = new ShareService();
