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

export interface PersonalityVideoConfig {
  [key: string]: {
    thinking: string[];
  };
}

const PERSONALITY_IMAGES: PersonalityImageConfig = {
  'sassy-cat': {
    thinking: [],
    yes: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981103/sassy-cat-yes-1_erobwn.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981101/sassy-cat-yes-5_a0rv0y.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981100/sassy-cat-yes-4_wvskyr.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981099/sassy-cat-yes-3_fhoq7n.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981098/sassy-cat-yes-2_wvn91j.png'
    ],
    no: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981173/sassy-cat-no-1_u2nhet.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981172/sassy-cat-no-5_eqsfmq.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981170/sassy-cat-no-4_llo5eg.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981169/sassy-cat-no-3_ph0rvh.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981168/sassy-cat-no-2_rdk6qh.png'
    ],
    maybe: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981252/sassy-cat-maybe-1_sbxd6e.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981251/sassy-cat-maybe-3_u558s8.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981249/sassy-cat-maybe-2_vmnjou.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981248/sassy-cat-maybe-4_klwng7.png'
    ],
    choice: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981298/sassy-cat-choice-2_vzyuup.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981297/sassy-cat-choice-3_igbp49.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981295/sassy-cat-choice-1_ue34aq.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981294/sassy-cat-choice-4_y4jumf.png',
    ]
  },
  'wise-owl': {
    thinking: [],
    yes: [
      '/images/personalities/wise-owl/yes/wise-owl-yes-1.png',
      '/images/personalities/wise-owl/yes/wise-owl-yes-2.png',
      '/images/personalities/wise-owl/yes/wise-owl-yes-3.png',
      '/images/personalities/wise-owl/yes/wise-owl-yes-4.png'
    ],
    no: [
      '/images/personalities/wise-owl/no/wise-owl-no-1.png',
      '/images/personalities/wise-owl/no/wise-owl-no-2.png',
      '/images/personalities/wise-owl/no/wise-owl-no-3.png',
      '/images/personalities/wise-owl/no/wise-owl-no-4.png',
      '/images/personalities/wise-owl/no/wise-owl-no-5.png'
    ],
    maybe: [
      '/images/personalities/wise-owl/maybe/wise-owl-maybe-1.png',
      '/images/personalities/wise-owl/maybe/wise-owl-maybe-2.png',
      '/images/personalities/wise-owl/maybe/wise-owl-maybe-3.png',
      '/images/personalities/wise-owl/maybe/wise-owl-maybe-4.png'
    ],
    choice: [
      '/images/personalities/wise-owl/choice/wise-owl-choice-1.png',
      '/images/personalities/wise-owl/choice/wise-owl-choice-2.png',
      '/images/personalities/wise-owl/choice/wise-owl-choice-3.png',
      '/images/personalities/wise-owl/choice/wise-owl-choice-4.png'
    ]
  },
  'lazy-panda': {
    thinking: [],
    yes: [
      '/images/personalities/lazy-panda/yes/lazy-panda-yes-1.png',
      '/images/personalities/lazy-panda/yes/lazy-panda-yes-2.png',
      '/images/personalities/lazy-panda/yes/lazy-panda-yes-3.png',
      '/images/personalities/lazy-panda/yes/lazy-panda-yes-4.png',
      '/images/personalities/lazy-panda/yes/lazy-panda-yes-5.png'
    ],
    no: [
      '/images/personalities/lazy-panda/no/lazy-panda-no-1.png',
      '/images/personalities/lazy-panda/no/lazy-panda-no-2.png',
      '/images/personalities/lazy-panda/no/lazy-panda-no-3.png',
      '/images/personalities/lazy-panda/no/lazy-panda-no-4.png'
    ],
    maybe: [
      '/images/personalities/lazy-panda/maybe/lazy-panda-maybe-1.png',
      '/images/personalities/lazy-panda/maybe/lazy-panda-maybe-2.png',
      '/images/personalities/lazy-panda/maybe/lazy-panda-maybe-3.png',
      '/images/personalities/lazy-panda/maybe/lazy-panda-maybe-4.png'
    ],
    choice: [
      '/images/personalities/lazy-panda/choice/lazy-panda-choice-1.png',
      '/images/personalities/lazy-panda/choice/lazy-panda-choice-2.png',
      '/images/personalities/lazy-panda/choice/lazy-panda-choice-3.png',
      '/images/personalities/lazy-panda/choice/lazy-panda-choice-4.png'
    ]
  },
  'sneaky-snake': {
    thinking: [],
    yes: [
      '/images/personalities/sneaky-snake/yes/sneaky-snake-yes-1.png',
      '/images/personalities/sneaky-snake/yes/sneaky-snake-yes-2.png',
      '/images/personalities/sneaky-snake/yes/sneaky-snake-yes-3.png',
      '/images/personalities/sneaky-snake/yes/sneaky-snake-yes-4.png'
    ],
    no: [
      '/images/personalities/sneaky-snake/no/sneaky-snake-no-1.png',
      '/images/personalities/sneaky-snake/no/sneaky-snake-no-2.png',
      '/images/personalities/sneaky-snake/no/sneaky-snake-no-3.png',
      '/images/personalities/sneaky-snake/no/sneaky-snake-no-4.png'
    ],
    maybe: [
      '/images/personalities/sneaky-snake/maybe/sneaky-snake-maybe-1.jpg',
      '/images/personalities/sneaky-snake/maybe/sneaky-snake-maybe-2.png',
      '/images/personalities/sneaky-snake/maybe/sneaky-snake-maybe-3.png',
      '/images/personalities/sneaky-snake/maybe/sneaky-snake-maybe-4.png'
    ],
    choice: [
      '/images/personalities/sneaky-snake/choice/sneaky-snake-choice-1.png',
      '/images/personalities/sneaky-snake/choice/sneaky-snake-choice-2.png',
      '/images/personalities/sneaky-snake/choice/sneaky-snake-choice-3.jpg',
      '/images/personalities/sneaky-snake/choice/sneaky-snake-choice-4.png'
    ]
  },
  'people-pleaser-pup': {
    thinking: [],
    yes: [
      '/images/personalities/people-pleaser-pup/yes/people-pleaser-pup-yes-1.png',
      '/images/personalities/people-pleaser-pup/yes/people-pleaser-pup-yes-2.png',
      '/images/personalities/people-pleaser-pup/yes/people-pleaser-pup-yes-3.png',
      '/images/personalities/people-pleaser-pup/yes/people-pleaser-pup-yes-4.png'
    ],
    no: [
      '/images/personalities/people-pleaser-pup/no/people-pleaser-pup-no-1.png',
      '/images/personalities/people-pleaser-pup/no/people-pleaser-pup-no-2.png',
      '/images/personalities/people-pleaser-pup/no/people-pleaser-pup-no-3.png',
      '/images/personalities/people-pleaser-pup/no/people-pleaser-pup-no-4.png'
    ],
    maybe: [
      '/images/personalities/people-pleaser-pup/maybe/people-pleaser-pup-maybe-1.png',
      '/images/personalities/people-pleaser-pup/maybe/people-pleaser-pup-maybe-2.png',
      '/images/personalities/people-pleaser-pup/maybe/people-pleaser-pup-maybe-3.png',
      '/images/personalities/people-pleaser-pup/maybe/people-pleaser-pup-maybe-4.png'
    ],
    choice: [
      '/images/personalities/people-pleaser-pup/choice/people-pleaser-pup-choice-1.png',
      '/images/personalities/people-pleaser-pup/choice/people-pleaser-pup-choice-2.png',
      '/images/personalities/people-pleaser-pup/choice/people-pleaser-pup-choice-3.png',
      '/images/personalities/people-pleaser-pup/choice/people-pleaser-pup-choice-4.png'
    ]
  }
};

const PERSONALITY_VIDEOS: PersonalityVideoConfig = {
  'sassy-cat': {
    thinking: [
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750981844/sassy-cat-thinking-5_nvd80u.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750981840/sassy-cat-thinking-3_j1krx9.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750981837/sassy-cat-thinking-4_sqkbgh.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750981834/sassy-cat-thinking-1_clchzx.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750981833/sassy-cat-thinking-2_hoiu9p.mp4'
    ]
  },
  'wise-owl': {
    thinking: [
      '/videos/personalities/wise-owl/thinking/wise-owl-thinking-1.mp4',
      '/videos/personalities/wise-owl/thinking/wise-owl-thinking-2.mp4',
      '/videos/personalities/wise-owl/thinking/wise-owl-thinking-3.mp4',
      '/videos/personalities/wise-owl/thinking/wise-owl-thinking-4.mp4'
    ]
  },
  'lazy-panda': {
    thinking: [
      '/videos/personalities/lazy-panda/thinking/lazy-panda-thinking-1.mp4',
      '/videos/personalities/lazy-panda/thinking/lazy-panda-thinking-2.mp4',
      '/videos/personalities/lazy-panda/thinking/lazy-panda-thinking-3.mp4',
      '/videos/personalities/lazy-panda/thinking/lazy-panda-thinking-4.mp4',
      '/videos/personalities/lazy-panda/thinking/lazy-panda-thinking-5.mp4'
    ]
  },
  'sneaky-snake': {
    thinking: [
      '/videos/personalities/sneaky-snake/sneaky-snake-thinking-1.mp4',
      '/videos/personalities/sneaky-snake/sneaky-snake-thinking-2.mp4'  
    ]
  },
  'people-pleaser-pup': {
    thinking: [
      '/videos/personalities/people-pleaser-pup/people-pleaser-pup-thinking-1.mp4',
      '/videos/personalities/people-pleaser-pup/people-pleaser-pup-thinking-2.mp4',
      '/videos/personalities/people-pleaser-pup/people-pleaser-pup-thinking-3.mp4'
    ]
  }
};

class PersonalityImageManager {
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private videoCache: Map<string, HTMLVideoElement> = new Map();
  private loadingPromises: Map<string, Promise<void>> = new Map();

  constructor() {
    this.preloadImages();
    this.preloadVideos();
  }

  private preloadImages(): void {
    Object.entries(PERSONALITY_IMAGES).forEach(([personality, imageTypes]) => {
      Object.entries(imageTypes).forEach(([type, images]) => {
        if (type !== 'thinking') { // Skip thinking images since we'll use videos
          images.forEach((imagePath) => {
            this.preloadImage(imagePath);
          });
        }
      });
    });
  }

  private preloadVideos(): void {
    Object.entries(PERSONALITY_VIDEOS).forEach(([personality, videoTypes]) => {
      Object.entries(videoTypes).forEach(([type, videos]) => {
        videos.forEach((videoPath) => {
          this.preloadVideo(videoPath);
        });
      });
    });
  }

  private preloadImage(imagePath: string): Promise<void> {
    if (this.loadingPromises.has(imagePath)) {
      return this.loadingPromises.get(imagePath)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(imagePath, img);
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to preload image: ${imagePath}`);
        reject(new Error(`Failed to load ${imagePath}`));
      };
      img.src = imagePath;
    });

    this.loadingPromises.set(imagePath, promise);
    return promise;
  }

  private preloadVideo(videoPath: string): Promise<void> {
    if (this.loadingPromises.has(videoPath)) {
      return this.loadingPromises.get(videoPath)!;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const video = document.createElement('video');
      video.onloadeddata = () => {
        this.videoCache.set(videoPath, video);
        resolve();
      };
      video.onerror = () => {
        console.warn(`Failed to preload video: ${videoPath}`);
        reject(new Error(`Failed to load ${videoPath}`));
      };
      video.src = videoPath;
      video.load();
    });

    this.loadingPromises.set(videoPath, promise);
    return promise;
  }

  async waitForImageLoad(imagePath: string): Promise<void> {
    if (this.imageCache.has(imagePath)) {
      return Promise.resolve();
    }
    
    if (this.loadingPromises.has(imagePath)) {
      try {
        await this.loadingPromises.get(imagePath);
      } catch (error) {
        // Image failed to load, but we continue
      }
    }
  }

  async waitForVideoLoad(videoPath: string): Promise<void> {
    if (this.videoCache.has(videoPath)) {
      return Promise.resolve();
    }
    
    if (this.loadingPromises.has(videoPath)) {
      try {
        await this.loadingPromises.get(videoPath);
      } catch (error) {
        // Video failed to load, but we continue
      }
    }
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

  getRandomVideo(personality: string, videoType: 'thinking'): string | null {
    const personalityVideos = PERSONALITY_VIDEOS[personality];
    if (!personalityVideos) {
      console.warn(`No videos found for personality: ${personality}`);
      return null;
    }

    const typeVideos = personalityVideos[videoType];
    if (!typeVideos || typeVideos.length === 0) {
      console.warn(`No ${videoType} videos found for personality: ${personality}`);
      return null;
    }

    // Use crypto.getRandomValues for better randomness if available
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
      const randomArray = new Uint32Array(1);
      window.crypto.getRandomValues(randomArray);
      return typeVideos[randomArray[0] % typeVideos.length];
    }
    
    // Fallback to Math.random
    return typeVideos[Math.floor(Math.random() * typeVideos.length)];
  }

  hasImages(personality: string, imageType: ImageType): boolean {
    const personalityImages = PERSONALITY_IMAGES[personality];
    return personalityImages && 
           personalityImages[imageType] && 
           personalityImages[imageType].length > 0;
  }

  hasVideos(personality: string, videoType: 'thinking'): boolean {
    const personalityVideos = PERSONALITY_VIDEOS[personality];
    return personalityVideos && 
           personalityVideos[videoType] && 
           personalityVideos[videoType].length > 0;
  }

  isImageCached(imagePath: string): boolean {
    return this.imageCache.has(imagePath);
  }

  isVideoCached(videoPath: string): boolean {
    return this.videoCache.has(videoPath);
  }
}

export const personalityImageManager = new PersonalityImageManager();
