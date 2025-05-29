

import * as ElevenLabs from '@11labs/client';

interface VoiceConfig {
  voiceId: string;
  model: string;
}

const VOICE_CONFIGS: Record<string, VoiceConfig> = {
  'sassy-cat': {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah - confident female voice
    model: 'eleven_multilingual_v2'
  },
  'wise-owl': {
    voiceId: 'CwhRBWXzGAHq8TQ4Fs17', // Roger - deep, wise voice
    model: 'eleven_multilingual_v2'
  },
  'lazy-panda': {
    voiceId: 'TX3LPaxmHKxFdv7VOQHJ', // Liam - relaxed voice
    model: 'eleven_multilingual_v2'
  },
  'anxious-bunny': {
    voiceId: 'FGY2WhTYpPnrIDTdsKH5', // Laura - quick, higher-pitched voice
    model: 'eleven_multilingual_v2'
  },
  'quirky-duck': {
    voiceId: 'cgSgspJ2msm6clMCkdW9', // Jessica - playful voice
    model: 'eleven_multilingual_v2'
  }
};

class ElevenLabsService {
  private client: any = null;
  private isEnabled: boolean = true;
  private volume: number = 0.7;

  constructor() {
    this.initializeClient();
  }

  private async initializeClient() {
    try {
      // Get API key from environment or return early if not available
      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      if (!apiKey) {
        console.warn('ElevenLabs API key not found');
        this.isEnabled = false;
        return;
      }

      // Try different initialization patterns for the namespace import
      if (typeof ElevenLabs === 'object' && ElevenLabs.ElevenLabs) {
        this.client = new ElevenLabs.ElevenLabs({
          apiKey: apiKey
        });
      } else if (typeof ElevenLabs === 'function') {
        this.client = new ElevenLabs({
          apiKey: apiKey
        });
      } else if (ElevenLabs && typeof ElevenLabs.default === 'function') {
        this.client = new ElevenLabs.default({
          apiKey: apiKey
        });
      } else {
        console.warn('ElevenLabs constructor not found');
        this.isEnabled = false;
      }
    } catch (error) {
      console.error('Failed to initialize ElevenLabs client:', error);
      this.isEnabled = false;
    }
  }

  async speak(text: string, characterType: string): Promise<void> {
    if (!this.isEnabled || !this.client || !text.trim()) {
      return;
    }

    try {
      const voiceConfig = VOICE_CONFIGS[characterType];
      if (!voiceConfig) {
        console.warn(`No voice configuration found for character type: ${characterType}`);
        return;
      }

      // Clean the text for better speech synthesis
      const cleanText = this.cleanTextForSpeech(text);

      // Generate and play audio
      const audio = await this.client.generate({
        voice: voiceConfig.voiceId,
        model_id: voiceConfig.model,
        text: cleanText,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true
        }
      });

      // Play the audio
      if (audio) {
        const audioElement = new Audio();
        audioElement.src = URL.createObjectURL(new Blob([audio], { type: 'audio/mpeg' }));
        audioElement.volume = this.volume;
        await audioElement.play();
      }
    } catch (error) {
      console.error('ElevenLabs TTS error:', error);
      // Fail silently to maintain app functionality
    }
  }

  private cleanTextForSpeech(text: string): string {
    // Remove quotes and clean up text for better speech synthesis
    return text
      .replace(/^["']|["']$/g, '') // Remove leading/trailing quotes
      .replace(/\*[^*]*\*/g, '') // Remove text between asterisks (stage directions)
      .replace(/\([^)]*\)/g, '') // Remove parenthetical content
      .trim();
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  isReady(): boolean {
    return this.isEnabled && this.client !== null;
  }
}

export const elevenLabsService = new ElevenLabsService();

