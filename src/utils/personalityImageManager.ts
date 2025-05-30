
export type ImageType = 'thinking' | 'yes' | 'no' | 'maybe' | 'choice';

export interface PersonalityImageConfig {
  [key: string]: {
    thinking: string[];
    yes: string[];
    no: string[];
    maybe: string[];
    choice: string[];
  };
}

const PERSONALITY_IMAGES: PersonalityImageConfig = {
  'sassy-cat': {
    thinking: [
      '/images/personalities/sassy-cat/thinking/sassy-cat-thinking-1.png',
      '/images/personalities/sassy-cat/thinking/sassy-cat-thinking-2.png',
      '/images/personalities/sassy-cat/thinking/sassy-cat-thinking-3.png'
    ],
    yes: [
      '/images/personalities/sassy-cat/yes/sassy-cat-yes-1.png',
      '/images/personalities/sassy-cat/yes/sassy-cat-yes-2.png'
    ],
    no: [
      '/images/personalities/sassy-cat/no/sassy-cat-no-1.png',
      '/images/personalities/sassy-cat/no/sassy-cat-no-2.png'
    ],
    maybe: [
      '/images/personalities/sassy-cat/maybe/sassy-cat-maybe-1.png',
      '/images/personalities/sassy-cat/maybe/sassy-cat-maybe-2.png'
    ],
    choice: [
      '/images/personalities/sassy-cat/choice/sassy-cat-choice-1.png',
      '/images/personalities/sassy-cat/choice/sassy-cat-choice-2.png'
    ]
  },
  'wise-owl': {
    thinking: [
      '/images/personalities/wise-owl/thinking/wise-owl-thinking-1.png',
      '/images/personalities/wise-owl/thinking/wise-owl-thinking-2.png'
    ],
    yes: [
      '/images/personalities/wise-owl/yes/wise-owl-yes-1.png',
      '/images/personalities/wise-owl/yes/wise-owl-yes-2.png'
    ],
    no: [
      '/images/personalities/wise-owl/no/wise-owl-no-1.png',
      '/images/personalities/wise-owl/no/wise-owl-no-2.png'
    ],
    maybe: [
      '/images/personalities/wise-owl/maybe/wise-owl-maybe-1.png',
      '/images/personalities/wise-owl/maybe/wise-owl-maybe-2.png'
    ],
    choice: [
      '/images/personalities/wise-owl/choice/wise-owl-choice-1.png',
      '/images/personalities/wise-owl/choice/wise-owl-choice-2.png'
    ]
  },
  'lazy-panda': {
    thinking: [
      '/images/personalities/lazy-panda/thinking/lazy-panda-thinking-1.png'
    ],
    yes: [
      '/images/personalities/lazy-panda/yes/lazy-panda-yes-1.png'
    ],
    no: [
      '/images/personalities/lazy-panda/no/lazy-panda-no-1.png'
    ],
    maybe: [
      '/images/personalities/lazy-panda/maybe/lazy-panda-maybe-1.png'
    ],
    choice: [
      '/images/personalities/lazy-panda/choice/lazy-panda-choice-1.png'
    ]
  },
  'anxious-bunny': {
    thinking: [
      '/images/personalities/anxious-bunny/thinking/anxious-bunny-thinking-1.png'
    ],
    yes: [
      '/images/personalities/anxious-bunny/yes/anxious-bunny-yes-1.png'
    ],
    no: [
      '/images/personalities/anxious-bunny/no/anxious-bunny-no-1.png'
    ],
    maybe: [
      '/images/personalities/anxious-bunny/maybe/anxious-bunny-maybe-1.png'
    ],
    choice: [
      '/images/personalities/anxious-bunny/choice/anxious-bunny-choice-1.png'
    ]
  },
  'quirky-duck': {
    thinking: [
      '/images/personalities/quirky-duck/thinking/quirky-duck-thinking-1.png'
    ],
    yes: [
      '/images/personalities/quirky-duck/yes/quirky-duck-yes-1.png'
    ],
    no: [
      '/images/personalities/quirky-duck/no/quirky-duck-no-1.png'
    ],
    maybe: [
      '/images/personalities/quirky-duck/maybe/quirky-duck-maybe-1.png'
    ],
    choice: [
      '/images/personalities/quirky-duck/choice/quirky-duck-choice-1.png'
    ]
  }
};

class PersonalityImageManager {
  private imageCache: Map<string, HTMLImageElement> = new Map();

  constructor() {
    this.preloadImages();
  }

  private preloadImages(): void {
    Object.entries(PERSONALITY_IMAGES).forEach(([personality, imageTypes]) => {
      Object.entries(imageTypes).forEach(([type, images]) => {
        images.forEach((imagePath) => {
          const img = new Image();
          img.src = imagePath;
          this.imageCache.set(`${personality}-${type}-${imagePath}`, img);
        });
      });
    });
  }

  getRandomImage(personality: string, imageType: ImageType): string | null {
    const personalityImages = PERSONALITY_IMAGES[personality];
    if (!personalityImages) {
      console.warn(`No images found for personality: ${personality}`);
      return null;
    }

    const typeImages = personalityImages[imageType];
    if (!typeImages || typeImages.length === 0) {
      console.warn(`No ${imageType} images found for personality: ${personality}`);
      return null;
    }

    // Use crypto.getRandomValues for better randomness if available
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);
      return typeImages[randomArray[0] % typeImages.length];
    }
    
    // Fallback to Math.random
    return typeImages[Math.floor(Math.random() * typeImages.length)];
  }

  hasImages(personality: string, imageType: ImageType): boolean {
    const personalityImages = PERSONALITY_IMAGES[personality];
    return personalityImages && 
           personalityImages[imageType] && 
           personalityImages[imageType].length > 0;
  }
}

export const personalityImageManager = new PersonalityImageManager();
