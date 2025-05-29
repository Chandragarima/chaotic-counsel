
import { audioFileManager } from './audioFileManager';
//import { elevenLabsService } from './elevenLabsService';

export interface AudioConfig {
  volume: number;
  enabled: boolean;
}

class AudioManager {
  private config: AudioConfig = { volume: 0.3, enabled: true };

  // Public methods
  async playSound(soundType: string, personality: string, text?: string): Promise<void> {
    try {
      // Use audio files for personality sounds
      await audioFileManager.playSound(soundType, personality, text);
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
    audioFileManager.setVolume(volume);
    // elevenLabsService.setVolume(volume);
  }

  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
    audioFileManager.setEnabled(enabled);
    // elevenLabsService.setEnabled(enabled);
  }
}

export const audioManager = new AudioManager();
