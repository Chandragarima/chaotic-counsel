
import html2canvas from 'html2canvas';

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
  async generateShareImage(elementId: string): Promise<string> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found for sharing');
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        width: 1080,
        height: 1080
      });

      return canvas.toDataURL('image/png', 0.95);
    } catch (error) {
      console.error('Error generating share image:', error);
      throw error;
    }
  }

  async shareToInstagram(imageUrl: string, text: string) {
    // Instagram doesn't have direct web sharing, so we'll copy text and prompt user
    await navigator.clipboard.writeText(text);
    
    // Download the image for user to save
    const link = document.createElement('a');
    link.download = 'mystical-answer.png';
    link.href = imageUrl;
    link.click();

    return {
      success: true,
      message: 'Image downloaded and text copied to clipboard. Share on Instagram!'
    };
  }

  async shareToWhatsApp(text: string, imageUrl?: string) {
    const whatsappText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${whatsappText}`;
    
    if (imageUrl) {
      // For WhatsApp with image, we'll download the image and provide instructions
      const link = document.createElement('a');
      link.download = 'mystical-answer.png';
      link.href = imageUrl;
      link.click();
    }
    
    window.open(whatsappUrl, '_blank');
    return { success: true, message: 'Image downloaded! Attach it to your WhatsApp message.' };
  }

  async shareGeneral(text: string, imageUrl?: string) {
    if (navigator.share && imageUrl) {
      try {
        // Convert data URL to blob for native sharing
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'mystical-answer.png', { type: 'image/png' });

        await navigator.share({
          title: 'Check out this mystical answer!',
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
      link.download = 'mystical-answer.png';
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
    return `🔮 Just got some ${data.characterType} wisdom from ${data.character}!

"${data.question}"

${data.character}'s answer: "${data.answer}"

Get your own mystical guidance at ${appUrl} ✨`;
  }

  generateInstagramText(data: ShareData): string {
    return `🔮 ${data.character} just dropped some wisdom! 

"${data.answer}"

What would they tell you? Find out at the link in bio! ✨

#MysticalGuidance #${data.characterType.replace('-', '')} #DailyWisdom`;
  }
}

export const shareService = new ShareService();
