
export interface AudioConfig {
  volume: number;
  enabled: boolean;
}

interface PersonalityAudioMap {
  [key: string]: string;
}

const PERSONALITY_AUDIO_FILES: PersonalityAudioMap = {
  'sassy-cat': '/audio/meow.mp3',
  'wise-owl': '/audio/hoot.mp3',
  'lazy-panda': '/audio/bamboo-eating.mp3',
  'anxious-bunny': '/audio/squeak.mp3',
  'quirky-duck': '/audio/quack.mp3'
};

class AudioFileManager {
  private config: AudioConfig = { volume: 0.7, enabled: true };
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    this.preloadAudioFiles();
  }

  private preloadAudioFiles(): void {
    Object.entries(PERSONALITY_AUDIO_FILES).forEach(([personality, filePath]) => {
      const audio = new Audio(filePath);
      audio.preload = 'auto';
      audio.volume = this.config.volume;
      this.audioCache.set(personality, audio);
    });
  }

  async playSound(soundType: string, personality: string, text?: string): Promise<void> {
    if (!this.config.enabled || this.config.volume === 0) {
      return;
    }

    try {
      const audio = this.audioCache.get(personality);
      if (!audio) {
        console.warn(`No audio file found for personality: ${personality}`);
        return;
      }

      // Reset audio to beginning and play
      audio.currentTime = 0;
      audio.volume = this.config.volume;
      await audio.play();
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
    
    // Update volume for all cached audio elements
    this.audioCache.forEach(audio => {
      audio.volume = this.config.volume;
    });
  }

  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.config.enabled && this.config.volume > 0;
  }
}

export const audioFileManager = new AudioFileManager();
