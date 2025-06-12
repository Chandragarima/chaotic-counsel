
import { Character, AIResponse } from '../types';
import { personalityImageManager } from './personalityImageManager';

export interface CanvasShareData {
  character: Character;
  question: string;
  answer?: string;
  aiResponse?: AIResponse | null;
}

class CanvasShareService {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1080;
    this.canvas.height = 1080;
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = context;
  }

  private async loadFont(fontFamily: string, fontSize: number, fontWeight: string = 'normal'): Promise<void> {
    const fontString = `${fontWeight} ${fontSize}px ${fontFamily}`;
    this.ctx.font = fontString;
    
    // Try to load the font
    try {
      if (document.fonts && document.fonts.load) {
        await document.fonts.load(fontString);
      }
    } catch (error) {
      console.warn('Font loading failed, using fallback:', error);
    }
  }

  private async loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
      
      // Timeout after 10 seconds
      setTimeout(() => reject(new Error(`Image load timeout: ${src}`)), 10000);
    });
  }

  private getPersonalityColor(characterType: string): string {
    const colorMap: Record<string, string> = {
      'sassy-cat': '#ec4899',
      'wise-owl': '#f59e0b',
      'lazy-panda': '#10b981',
      'sneaky-snake': '#f97316',
      'people-pleaser-pup': '#eab308'
    };
    return colorMap[characterType] || colorMap['wise-owl'];
  }

  private getPersonalityBackground(characterType: string): string {
    const colorMap: Record<string, string> = {
      'sassy-cat': '#1e293b',
      'wise-owl': '#1e293b',
      'lazy-panda': '#1e293b',
      'sneaky-snake': '#1e293b',
      'people-pleaser-pup': '#1e293b'
    };
    return colorMap[characterType] || colorMap['wise-owl'];
  }

  private wrapText(text: string, maxWidth: number, fontSize: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = this.ctx.measureText(currentLine + ' ' + word).width;
      
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  private drawText(text: string, x: number, y: number, maxWidth: number, fontSize: number, color: string, fontWeight: string = 'normal', fontFamily: string = 'Inter, sans-serif'): number {
    this.ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = 'center';
    
    const lines = this.wrapText(text, maxWidth, fontSize);
    const lineHeight = fontSize * 1.4;
    
    lines.forEach((line, index) => {
      this.ctx.fillText(line, x, y + (index * lineHeight));
    });
    
    return lines.length * lineHeight;
  }

  private getDisplayAnswer(data: CanvasShareData): string {
    if (data.aiResponse) {
      switch (data.aiResponse.responseType) {
        case 'binary':
          return data.aiResponse.personalityRecommendation || "Trust your instincts on this one.";
        case 'advice':
          return data.aiResponse.mainAdvice || "Consider all perspectives before deciding.";
        case 'recommendation':
          return data.aiResponse.topRecommendation || "Follow your heart's guidance.";
        case 'analysis':
          return data.aiResponse.conclusion || "Reflect deeply on this matter.";
        case 'choice':
          return data.aiResponse.recommendedChoice || "Choose what aligns with your values.";
        default:
          return data.answer || "The universe whispers its wisdom...";
      }
    }
    return data.answer || "The universe whispers its wisdom...";
  }

  private cleanText(text: string): string {
    if (!text || typeof text !== 'string') {
      return "The universe whispers its wisdom...";
    }
    
    return text
      .replace(/[^\w\s.,!?'"()-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private getCharacterImage(character: Character, aiResponse?: AIResponse | null): string | null {
    // Always try to get a 'yes' image first as it's most positive and available for all personalities
    let image = personalityImageManager.getRandomImage(character.type, 'yes');
    
    // If no 'yes' image, try 'choice' as fallback
    if (!image) {
      image = personalityImageManager.getRandomImage(character.type, 'choice');
    }
    
    // If still no image, try 'maybe' type
    if (!image) {
      image = personalityImageManager.getRandomImage(character.type, 'maybe');
    }
    
    // Final fallback to character.image from character data
    if (!image && character.image) {
      image = character.image;
    }
    
    return image;
  }

  async generateShareImage(data: CanvasShareData): Promise<string> {
    const { character, question } = data;
    const primaryColor = this.getPersonalityColor(character.type);
    const backgroundColor = this.getPersonalityBackground(character.type);
    
    // Clear canvas and set background
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, 1080, 1080);
    
    try {
      // Load and draw character image
      const characterImageSrc = this.getCharacterImage(character, data.aiResponse);
      if (characterImageSrc) {
        try {
          const characterImg = await this.loadImage(characterImageSrc);
          
          // Draw character image in circle
          const imgSize = 300;
          const imgX = 540; // center X
          const imgY = 300; // Y position
          
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(imgX, imgY, imgSize / 2, 0, Math.PI * 2);
          this.ctx.clip();
          
          // Draw image
          this.ctx.drawImage(characterImg, imgX - imgSize / 2, imgY - imgSize / 2, imgSize, imgSize);
          this.ctx.restore();
          
          // Draw border around image
          this.ctx.strokeStyle = primaryColor;
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.arc(imgX, imgY, imgSize / 2, 0, Math.PI * 2);
          this.ctx.stroke();
          
        } catch (error) {
          console.warn('Failed to load character image:', error);
        }
      }
      
      // Load fonts
      await this.loadFont('Playfair Display, Georgia, serif', 48, '600');
      await this.loadFont('Inter, sans-serif', 26, 'normal');
      await this.loadFont('Inter, sans-serif', 30, '500');
      await this.loadFont('Inter, sans-serif', 20, 'normal');
      
      // Draw character name
      this.drawText(
        `You Asked ${character.name}`,
        540,
        500,
        800,
        48,
        '#f8fafc',
        '600',
        'Playfair Display, Georgia, serif'
      );
      
      // Draw question
      const cleanQuestion = this.cleanText(question || "What guidance do you seek?");
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      this.ctx.fillRect(140, 550, 800, 120);
      
      this.ctx.strokeStyle = primaryColor + '30';
      this.ctx.lineWidth = 1;
      this.ctx.strokeRect(140, 550, 800, 120);
      
      this.drawText(
        `"${cleanQuestion}"`,
        540,
        600,
        720,
        26,
        '#e2e8f0',
        'italic',
        'Inter, sans-serif'
      );
      
      // Draw answer
      const displayAnswer = this.getDisplayAnswer(data);
      const cleanAnswer = this.cleanText(displayAnswer);
      
      this.ctx.fillStyle = primaryColor;
      this.ctx.fillRect(140, 700, 800, 140);
      
      this.drawText(
        `"${cleanAnswer}"`,
        540,
        760,
        720,
        30,
        'white',
        '500',
        'Inter, sans-serif'
      );
      
      // Draw footer
      this.drawText(
        'chaoticcounsel.com',
        540,
        980,
        800,
        20,
        '#cbd5e1',
        'normal',
        'Inter, sans-serif'
      );
      
    } catch (error) {
      console.error('Error generating share image:', error);
      throw error;
    }
    
    return this.canvas.toDataURL('image/png', 0.95);
  }
}

export const canvasShareService = new CanvasShareService();
