import { elevenLabsService } from './elevenLabsService';

export interface AudioConfig {
  volume: number;
  enabled: boolean;
}

class AudioManager {
  private audioContext: AudioContext | null = null;
  private config: AudioConfig = { volume: 0.3, enabled: true };

  // Sound generators for different personalities
  private generatePurr(duration: number = 0.8): void {
    if (!this.isEnabled()) return;
    
    const ctx = this.getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(60, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + duration);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.3, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  private generateMeow(duration: number = 0.6): void {
    if (!this.isEnabled()) return;
    
    const ctx = this.getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + duration * 0.3);
    oscillator.frequency.linearRampToValueAtTime(300, ctx.currentTime + duration);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(5, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.4, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  private generateHoot(duration: number = 1.2): void {
    if (!this.isEnabled()) return;
    
    const ctx = this.getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(300, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + duration * 0.5);
    oscillator.frequency.linearRampToValueAtTime(250, ctx.currentTime + duration);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.4, ctx.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.2, ctx.currentTime + duration * 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  private generateChuff(duration: number = 0.6): void {
    if (!this.isEnabled()) return;
    
    const ctx = this.getAudioContext();
    const noise = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Create brown noise buffer
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
    
    noise.buffer = buffer;

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.2, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start(ctx.currentTime);
  }

  private generateBambooEating(duration: number = 1.0): void {
    if (!this.isEnabled()) return;
    
    const ctx = this.getAudioContext();
    
    // Create multiple quick crunching sounds
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const noise = ctx.createBufferSource();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        // Create crispy noise buffer for crunching
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let j = 0; j < bufferSize; j++) {
          data[j] = (Math.random() * 2 - 1) * 0.5;
          // Add some crackling texture
          if (Math.random() > 0.7) {
            data[j] *= 2;
          }
        }
        
        noise.buffer = buffer;

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.15, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start(ctx.currentTime);
      }, i * 300);
    }
  }

  private generateSqueak(duration: number = 0.3): void {
    if (!this.isEnabled()) return;
    
    const ctx = this.getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + duration * 0.3);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + duration);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.2, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  private generateQuack(duration: number = 0.5): void {
    if (!this.isEnabled()) return;
    
    const ctx = this.getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.linearRampToValueAtTime(200, ctx.currentTime + duration);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);
    filter.Q.setValueAtTime(10, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.config.volume * 0.3, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }

  private playThinkingSound(): void {
    // Simple thinking sound - soft chime
    this.playTone(440, 0.1, 0.2, 'sine');
  }

  private playSelectSound(): void {
    // Simple select sound - click
    this.playTone(800, 0.05, 0.1, 'square');
  }

  private playTone(frequency: number, duration: number, volume: number, type: OscillatorType): void {
    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.config.volume * volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.warn('Tone playback failed:', error);
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private isEnabled(): boolean {
    return this.config.enabled && this.config.volume > 0;
  }

  // Public methods
  async playSound(soundType: string, personality: string, text?: string): Promise<void> {
    try {
      // If text is provided and it's a response sound, use TTS
      if (text && (soundType.includes('response') || soundType.includes('answer'))) {
        await elevenLabsService.speak(text, personality);
        return;
      }

      // For other sound types (thinking, select, etc.), use simple audio cues
      if (soundType.includes('thinking')) {
        this.playThinkingSound();
      } else if (soundType.includes('select')) {
        this.playSelectSound();
      } else {
        switch (personality) {
          case 'sassy-cat':
            if (soundType.includes('purr')) {
              this.generatePurr();
            } else if (soundType.includes('select') || soundType.includes('response')) {
              this.generateMeow();
            }
            break;
          case 'wise-owl':
            if (soundType.includes('hoot')) this.generateHoot();
            break;
          case 'lazy-panda':
            if (soundType.includes('chuff') || soundType.includes('breath') || soundType.includes('sigh')) {
              this.generateChuff();
            } else if (soundType.includes('select') || soundType.includes('response')) {
              this.generateBambooEating();
            }
            break;
          case 'anxious-bunny':
            if (soundType.includes('squeak') || soundType.includes('thump') || soundType.includes('chatter')) {
              this.generateSqueak();
            }
            break;
          case 'quirky-duck':
            if (soundType.includes('quack')) this.generateQuack();
            break;
        }
      }
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
    elevenLabsService.setVolume(volume);
  }

  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
    elevenLabsService.setEnabled(enabled);
  }
}

export const audioManager = new AudioManager();
