
export interface AudioConfig {
  volume: number;
  enabled: boolean;
}

interface PersonalityAudioMap {
  [key: string]: {
    selection: string;
    response: string;
  };
}

const PERSONALITY_AUDIO_FILES: PersonalityAudioMap = {
  'sassy-cat': {
    selection: '/audio/cat-selection.mp3',
    response: '/audio/cat-response.mp3'
  },
  'wise-owl': {
    selection: '/audio/owl-selection.mp3',
    response: '/audio/owl-response.mp3'
  },
  'lazy-panda': {
    selection: '/audio/panda-selection.mp3',
    response: '/audio/panda-response.mp3'
  },
  'sneaky-snake': {
    selection: '/audio/owl-selection.mp3',
    response: '/audio/owl-response.mp3'
  },
  'people-pleaser-pup': {
    selection: '/audio/panda-selection.mp3',
    response: '/audio/panda-response.mp3'
  }
};

class AudioFileManager {
  private config: AudioConfig = { volume: 0.7, enabled: true };
  private audioCache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    this.preloadAudioFiles();
  }

  private preloadAudioFiles(): void {
    Object.entries(PERSONALITY_AUDIO_FILES).forEach(([personality, sounds]) => {
      // Preload selection sound
      const selectionAudio = new Audio(sounds.selection);
      selectionAudio.preload = 'auto';
      selectionAudio.volume = this.config.volume;
      this.audioCache.set(`${personality}-selection`, selectionAudio);

      // Preload response sound
      const responseAudio = new Audio(sounds.response);
      responseAudio.preload = 'auto';
      responseAudio.volume = this.config.volume;
      this.audioCache.set(`${personality}-response`, responseAudio);
    });
  }

  async playSound(soundType: string, personality: string, text?: string): Promise<void> {
    if (!this.config.enabled || this.config.volume === 0) {
      return;
    }

    // Check if we have audio files for this personality
    if (!PERSONALITY_AUDIO_FILES[personality]) {
      console.warn(`No audio files configured for personality: ${personality}`);
      return;
    }

    // Only allow 'selection' and 'response' sound types
    if (soundType !== 'selection' && soundType !== 'response') {
      console.warn(`Invalid sound type: ${soundType}. Only 'selection' and 'response' are supported.`);
      return;
    }

    try {
      const audioKey = `${personality}-${soundType}`;
      const audio = this.audioCache.get(audioKey);
      
      if (!audio) {
        console.warn(`No audio file found for: ${audioKey}`);
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
