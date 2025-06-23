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
    this.canvas.height = 1920;
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

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    // Expand shorthand form (e.g. "#03F") to full form (e.g. "#0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  async generateShareImage(data: CanvasShareData): Promise<string> {
    const { character, question } = data;
    const primaryColor = this.getPersonalityColor(character.type);
    const backgroundColor = this.getPersonalityBackground(character.type);
    const canvasWidth = 1080;
    
    // Clear canvas and set background
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, 1080, 1920);
    
    try {
      // Load and draw character image
      const characterImageSrc = this.getCharacterImage(character, data.aiResponse);
      
      // Spacing values (scaled for taller canvas)
      const X = 72; // space between elements
      const Y = 120; // extra space between question and image
      const Z = 80; // extra space between image and answer

      // Draw character name at the top
      const askedText = `Asked ${character.name}`;
      const askedFont = '600 72px Playfair Display, Georgia, serif';
      this.ctx.font = askedFont;
      const textY = 180;
      const textHeight = 72;
      this.drawText(
        askedText,
        540,
        textY,
        900,
        72,
        '#f8fafc',
        '600',
        'Playfair Display, Georgia, serif'
      );

      // Question box position: below text + X
      this.ctx.font = 'italic 40px Inter, sans-serif';
      const cleanQuestion = this.cleanText(question || "What guidance do you seek?");
      const questionLineHeight = 40 * 1.4;
      const questionPaddingTop = 40;      // Increased top padding
      const questionPaddingBottom = 40;   // Increased bottom padding
      const questionWrapWidth = 820; // reduced from 900 for better wrapping
      const questionTextLines = this.wrapText(cleanQuestion, questionWrapWidth, 40);
      const dynamicBoxHeight = Math.max(
        120,
        (questionTextLines.length * questionLineHeight) + questionPaddingTop + questionPaddingBottom
      );
      const questionBoxWidth = 900;
      const boxX = (canvasWidth - questionBoxWidth) / 2;
      const boxWidth = questionBoxWidth;
      const boxHeight = dynamicBoxHeight;
      const radius = 32;
      const questionBoxY = textY + textHeight + X;
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      this.ctx.beginPath();
      this.ctx.moveTo(boxX + radius, questionBoxY);
      this.ctx.lineTo(boxX + boxWidth - radius, questionBoxY);
      this.ctx.quadraticCurveTo(boxX + boxWidth, questionBoxY, boxX + boxWidth, questionBoxY + radius);
      this.ctx.lineTo(boxX + boxWidth, questionBoxY + boxHeight - radius);
      this.ctx.quadraticCurveTo(boxX + boxWidth, questionBoxY + boxHeight, boxX + boxWidth - radius, questionBoxY + boxHeight);
      this.ctx.lineTo(boxX + radius, questionBoxY + boxHeight);
      this.ctx.quadraticCurveTo(boxX, questionBoxY + boxHeight, boxX, questionBoxY + boxHeight - radius);
      this.ctx.lineTo(boxX, questionBoxY + radius);
      this.ctx.quadraticCurveTo(boxX, questionBoxY, boxX + radius, questionBoxY);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.strokeStyle = primaryColor + '30';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'top'; // <-- Important!
      this.ctx.font = 'italic 40px Inter, sans-serif';
      const questionBoxCenterX = boxX + boxWidth / 2;
      const questionStartY = questionBoxY + questionPaddingTop;
      questionTextLines.forEach((line, index) => {
        let displayLine = line;
        if (index === 0) displayLine = '"' + displayLine;
        if (index === questionTextLines.length - 1) displayLine = displayLine + '"';
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.fillText(displayLine, questionBoxCenterX, questionStartY + (index * questionLineHeight));
      });

      // Image position: below question box + Y
      const imgSize = 420;
      const imgX = 540;
      const imgY = questionBoxY + boxHeight + Y + imgSize / 2;
      if (characterImageSrc) {
        try {
          const characterImg = await this.loadImage(characterImageSrc);
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.arc(imgX, imgY, imgSize / 2, 0, Math.PI * 2);
          this.ctx.clip();
          this.ctx.drawImage(characterImg, imgX - imgSize / 2, imgY - imgSize / 2, imgSize, imgSize);
          this.ctx.restore();
          this.ctx.strokeStyle = primaryColor;
          this.ctx.lineWidth = 6;
          this.ctx.beginPath();
          this.ctx.arc(imgX, imgY, imgSize / 2, 0, Math.PI * 2);
          this.ctx.stroke();
        } catch (error) {
          console.warn('Failed to load character image:', error);
        }
      }

      // Answer box position: below image + Z
      const displayAnswer = this.getDisplayAnswer(data);
      const cleanAnswer = this.cleanText(displayAnswer);
      this.ctx.font = '500 48px Inter, sans-serif';
      const answerLineHeight = 48 * 2;
      const answerPaddingTop = 50;
      const answerPaddingBottom = 50;
      const answerWrapWidth = 820;
      const answerTextLines = this.wrapText(cleanAnswer, answerWrapWidth, 48);
      const dynamicAnswerHeight = Math.max(
        140,
        (answerTextLines.length * answerLineHeight) + answerPaddingTop + answerPaddingBottom
      );
      const answerBoxWidth = 900;
      const answerBoxX = (canvasWidth - answerBoxWidth) / 2;
      const answerBoxCenterX = answerBoxX + answerBoxWidth / 2;
      const answerBoxY = imgY + imgSize / 2 + Z;
      const answerBoxHeight = dynamicAnswerHeight;
      console.log('primaryColor:', primaryColor); // Debug log
      const rgb = this.hexToRgb(primaryColor);
      if (rgb) {
        this.ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.9)`;
      } else {
        this.ctx.fillStyle = primaryColor;
      }
      this.ctx.beginPath();
      this.ctx.moveTo(answerBoxX + radius, answerBoxY);
      this.ctx.lineTo(answerBoxX + answerBoxWidth - radius, answerBoxY);
      this.ctx.quadraticCurveTo(answerBoxX + answerBoxWidth, answerBoxY, answerBoxX + answerBoxWidth, answerBoxY + radius);
      this.ctx.lineTo(answerBoxX + answerBoxWidth, answerBoxY + answerBoxHeight - radius);
      this.ctx.quadraticCurveTo(answerBoxX + answerBoxWidth, answerBoxY + answerBoxHeight, answerBoxX + answerBoxWidth - radius, answerBoxY + answerBoxHeight);
      this.ctx.lineTo(answerBoxX + radius, answerBoxY + answerBoxHeight);
      this.ctx.quadraticCurveTo(answerBoxX, answerBoxY + answerBoxHeight, answerBoxX, answerBoxY + answerBoxHeight - radius);
      this.ctx.lineTo(answerBoxX, answerBoxY + radius);
      this.ctx.quadraticCurveTo(answerBoxX, answerBoxY, answerBoxX + radius, answerBoxY);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'top';
      this.ctx.font = '500 48px Inter, sans-serif';
      const answerStartY = answerBoxY + answerPaddingTop;
      answerTextLines.forEach((line, index) => {
        let displayLine = line;
        if (index === 0) displayLine = '"' + displayLine;
        if (index === answerTextLines.length - 1) displayLine = displayLine + '"';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(displayLine, answerBoxCenterX, answerStartY + (index * answerLineHeight));
      });
      
      // Footer at the bottom
      this.drawText(
        'Find your answers at https://chaotic-counsel.lovable.app/',
        540,
        1860,
        1000,
        32,
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
