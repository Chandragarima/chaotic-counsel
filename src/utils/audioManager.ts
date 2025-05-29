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

  private generateMeow(duration: number = 0.8, style: 'sassy' | 'cute' | 'demanding' | 'lazy' = 'sassy'): void {
    if (!this.isEnabled()) return;
    
    const ctx = this.getAudioContext();
    
    // Create multiple oscillators for richer sound (cat vocal cords are complex!)
    const mainOscillator = ctx.createOscillator();
    const harmonicOscillator = ctx.createOscillator();
    const subOscillator = ctx.createOscillator();
    
    // Create gain nodes for each oscillator
    const mainGain = ctx.createGain();
    const harmonicGain = ctx.createGain();
    const subGain = ctx.createGain();
    const masterGain = ctx.createGain();
    
    // Create filters for more realistic vocal tract simulation
    const formantFilter1 = ctx.createBiquadFilter(); // First formant (throat)
    const formantFilter2 = ctx.createBiquadFilter(); // Second formant (mouth cavity)
    const noiseFilter = ctx.createBiquadFilter();
    
    // Add some noise for breath/texture
    const noiseBuffer = this.createNoiseBuffer(ctx, duration);
    const noiseSource = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    noiseSource.buffer = noiseBuffer;

    // Configure oscillators based on meow style
    const config = this.getMeowConfig(style);
    
    // Main oscillator (fundamental frequency)
    mainOscillator.type = 'sawtooth';
    mainOscillator.frequency.setValueAtTime(config.startFreq, ctx.currentTime);
    
    // Create the characteristic meow frequency curve
    // Real cats: start lower, rise quickly, then fall with vibrato
    const attackTime = duration * 0.15;  // Quick rise
    const sustainTime = duration * 0.4;  // Hold the peak
    const releaseTime = duration * 0.45; // Gradual fall with vibrato
    
    // Frequency envelope with vibrato
    mainOscillator.frequency.linearRampToValueAtTime(config.peakFreq, ctx.currentTime + attackTime);
    mainOscillator.frequency.setValueAtTime(config.peakFreq, ctx.currentTime + attackTime + sustainTime);
    
    // Add vibrato during sustain and release
    const vibratoFreq = 8; // Hz
    const vibratoDepth = 30; // Hz
    for (let i = 0; i < releaseTime * vibratoFreq; i++) {
        const time = ctx.currentTime + attackTime + sustainTime + (i / vibratoFreq);
        const vibrato = Math.sin(i * 2 * Math.PI / vibratoFreq) * vibratoDepth;
        const baseFreq = config.peakFreq - (i / (releaseTime * vibratoFreq)) * (config.peakFreq - config.endFreq);
        mainOscillator.frequency.linearRampToValueAtTime(baseFreq + vibrato, time);
    }
    
    // Harmonic oscillator (adds richness)
    harmonicOscillator.type = 'triangle';
    harmonicOscillator.frequency.setValueAtTime(config.startFreq * 1.5, ctx.currentTime);
    harmonicOscillator.frequency.linearRampToValueAtTime(config.peakFreq * 1.5, ctx.currentTime + attackTime);
    harmonicOscillator.frequency.exponentialRampToValueAtTime(config.endFreq * 1.5, ctx.currentTime + duration);
    
    // Sub oscillator (body resonance)
    subOscillator.type = 'sine';
    subOscillator.frequency.setValueAtTime(config.startFreq * 0.5, ctx.currentTime);
    subOscillator.frequency.linearRampToValueAtTime(config.peakFreq * 0.5, ctx.currentTime + attackTime);
    subOscillator.frequency.exponentialRampToValueAtTime(config.endFreq * 0.5, ctx.currentTime + duration);

    // Configure formant filters (simulate vocal tract)
    formantFilter1.type = 'bandpass';
    formantFilter1.frequency.setValueAtTime(800, ctx.currentTime); // First formant
    formantFilter1.Q.setValueAtTime(8, ctx.currentTime);
    
    formantFilter2.type = 'bandpass';
    formantFilter2.frequency.setValueAtTime(1200, ctx.currentTime); // Second formant
    formantFilter2.Q.setValueAtTime(4, ctx.currentTime);
    
    // Noise filter for breath texture
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(2000, ctx.currentTime);

    // Configure gain envelopes
    const volume = this.config.volume * config.volumeMultiplier;
    
    // Main oscillator envelope (most prominent)
    mainGain.gain.setValueAtTime(0, ctx.currentTime);
    mainGain.gain.linearRampToValueAtTime(volume * 0.8, ctx.currentTime + attackTime);
    mainGain.gain.exponentialRampToValueAtTime(volume * 0.6, ctx.currentTime + attackTime + sustainTime);
    mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    // Harmonic envelope (softer)
    harmonicGain.gain.setValueAtTime(0, ctx.currentTime);
    harmonicGain.gain.linearRampToValueAtTime(volume * 0.3, ctx.currentTime + attackTime);
    harmonicGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    // Sub oscillator envelope (subtle body)
    subGain.gain.setValueAtTime(0, ctx.currentTime);
    subGain.gain.linearRampToValueAtTime(volume * 0.2, ctx.currentTime + attackTime * 2);
    subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    // Noise envelope (breath texture)
    noiseGain.gain.setValueAtTime(0, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(volume * 0.1, ctx.currentTime + 0.02);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration * 0.7);

    // Master gain for final shaping
    masterGain.gain.setValueAtTime(1, ctx.currentTime);

    // Connect the audio graph
    mainOscillator.connect(mainGain);
    harmonicOscillator.connect(harmonicGain);
    subOscillator.connect(subGain);
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    // Route through formant filters
    mainGain.connect(formantFilter1);
    formantFilter1.connect(formantFilter2);
    formantFilter2.connect(masterGain);
    
    harmonicGain.connect(masterGain);
    subGain.connect(masterGain);
    noiseGain.connect(masterGain);
    
    masterGain.connect(ctx.destination);

    // Start all oscillators
    const startTime = ctx.currentTime;
    mainOscillator.start(startTime);
    harmonicOscillator.start(startTime);
    subOscillator.start(startTime);
    noiseSource.start(startTime);

    // Stop all oscillators
    const stopTime = startTime + duration;
    mainOscillator.stop(stopTime);
    harmonicOscillator.stop(stopTime);
    subOscillator.stop(stopTime);
    noiseSource.stop(stopTime);
}

private getMeowConfig(style: 'sassy' | 'cute' | 'demanding' | 'lazy') {
    const configs = {
        sassy: {
            startFreq: 200,    // Lower, more attitude
            peakFreq: 600,     // Not too high, controlled
            endFreq: 180,      // Drops with disdain
            volumeMultiplier: 0.7
        },
        cute: {
            startFreq: 300,    // Higher, sweeter
            peakFreq: 900,     // Peak higher for cuteness
            endFreq: 250,      // Gentle ending
            volumeMultiplier: 0.5
        },
        demanding: {
            startFreq: 180,    // Deep, authoritative
            peakFreq: 800,     // Strong peak
            endFreq: 150,      // Firm ending
            volumeMultiplier: 0.9
        },
        lazy: {
            startFreq: 150,    // Very low, tired
            peakFreq: 400,     // Minimal effort peak  
            endFreq: 120,      // Trails off sleepily
            volumeMultiplier: 0.4
        }
    };
    
    return configs[style];
}

private createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const bufferLength = sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferLength, sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate pink noise (more natural than white noise)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferLength; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        data[i] = pink * 0.11; // Scale down
    }
    
    return buffer;
}

// Usage examples:
// this.generateMeow(0.8, 'sassy');    // For your sassy cat personality
// this.generateMeow(1.2, 'demanding'); // Longer, more insistent
// this.generateMeow(0.5, 'cute');     // Short and sweet
// this.generateMeow(1.5, 'lazy');     // Long, tired meow

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
