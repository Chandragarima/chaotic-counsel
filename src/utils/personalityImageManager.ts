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
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750981294/sassy-cat-choice-4_y4jumf.png'
    ]
  },
  'wise-owl': {
    thinking: [],
    yes: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982786/wise-owl-yes-1_xswo1i.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982781/wise-owl-yes-4_o1jl55.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982778/wise-owl-yes-3_rd0oip.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982773/wise-owl-yes-2_ww7qg6.png'
    ],
    no: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982826/wise-owl-no-5_oanh3g.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982816/wise-owl-no-1_f5t4eb.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982811/wise-owl-no-4_r1fo2l.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982806/wise-owl-no-3_roj2iu.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982802/wise-owl-no-2_yirfl7.png'
    ],
    maybe: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982872/wise-owl-maybe-1_p0klrx.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982860/wise-owl-maybe-4_dov9dh.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982852/wise-owl-maybe-3_ukw31b.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982839/wise-owl-maybe-2_bo42ai.png'
    ],
    choice: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982916/wise-owl-choice-1_yf5fgd.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982908/wise-owl-choice-4_fvwf1p.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982895/wise-owl-choice-3_lezwsp.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982889/wise-owl-choice-2_j5yztm.png'
    ]
  },
  'lazy-panda': {
    thinking: [],
    yes: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982998/lazy-panda-yes-2_zmiulg.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982993/lazy-panda-yes-1_ex79e5.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982989/lazy-panda-yes-5_ynvifg.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982983/lazy-panda-yes-4_tzxqo4.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750982979/lazy-panda-yes-3_smtumd.png'
    ],
    no: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983021/lazy-panda-no-2_xvc6eq.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983017/lazy-panda-no-1_vc1iaa.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983009/lazy-panda-no-4_moiyfe.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983003/lazy-panda-no-3_y99z6j.png'
    ],
    maybe: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983086/lazy-panda-maybe-1_yc1qt2.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983091/lazy-panda-maybe-2_axhq4t.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983082/lazy-panda-maybe-4_xmv9qo.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983078/lazy-panda-maybe-3_zti14t.png'
    ],
    choice: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983056/lazy-panda-choice-2_ygdzul.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983046/lazy-panda-choice-1_vgbupb.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983035/lazy-panda-choice-4_zcefzg.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983031/lazy-panda-choice-3_mzrtzs.png'
    ]
  },
  'sneaky-snake': {
    thinking: [],
    yes: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983189/sneaky-snake-yes-2_r52qsk.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983185/sneaky-snake-yes-4_z43unj.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983180/sneaky-snake-yes-3_ofhnhs.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983199/sneaky-snake-no-1_mqh8fb.png'
    ],
    no: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983204/sneaky-snake-no-2_paurk1.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983211/sneaky-snake-no-4_axxrkp.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983196/sneaky-snake-no-3_vliujz.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983199/sneaky-snake-no-1_mqh8fb.png'
    ],
    maybe: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983299/sneaky-snake-maybe-3_exlrcm.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983308/sneaky-snake-maybe-4_n0pgys.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983315/sneaky-snake-maybe-1_zqx6wm.jpg',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983326/sneaky-snake-maybe-2_a0cc6t.png'
    ],
    choice: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983218/sneaky-snake-choice-2_cgcaut.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983225/sneaky-snake-choice-3_z6paxq.jpg',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983230/sneaky-snake-choice-4_ar1oey.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983234/sneaky-snake-choice-1_ma0odn.png'
    ]
  },
  'people-pleaser-pup': {
    thinking: [],
    yes: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983456/people-pleaser-pup-yes-1_bk5vzj.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983450/people-pleaser-pup-yes-4_tdavuy.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983443/people-pleaser-pup-yes-3_jpfutt.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983440/people-pleaser-pup-yes-2_rxtdcl.png'
    ],
    no: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983499/people-pleaser-pup-no-1_tvoood.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983484/people-pleaser-pup-no-4_ked9tq.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983468/people-pleaser-pup-no-3_udtyof.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983462/people-pleaser-pup-no-2_pzysbq.png'
    ],
    maybe: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983585/people-pleaser-pup-maybe-1_cfzbvw.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983580/people-pleaser-pup-maybe-4_dzfp6j.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983565/people-pleaser-pup-maybe-3_j0ozwr.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983549/people-pleaser-pup-maybe-2_ech8ca.png'
    ],
    choice: [
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983542/people-pleaser-pup-choice-2_xos4p7.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983536/people-pleaser-pup-choice-1_c5iah3.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983529/people-pleaser-pup-choice-4_rvyoyx.png',
      'https://res.cloudinary.com/dh1n9zhp3/image/upload/v1750983517/people-pleaser-pup-choice-3_thduvg.png'
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
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982690/wise-owl-thinking-3_pxadft.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982695/wise-owl-thinking-4_lrs99b.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982703/wise-owl-thinking-1_xdksxf.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982715/wise-owl-thinking-2_j6hbjx.mp4'
    ]
  },
  'lazy-panda': {
    thinking: [
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982524/lazy-panda-thinking-1_zgohsn.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982520/lazy-panda-thinking-5_yifndy.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982518/lazy-panda-thinking-4_pairtl.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982515/lazy-panda-thinking-3_becd65.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982511/lazy-panda-thinking-2_dktjnt.mp4'
    ]
  },
  'sneaky-snake': {
    thinking: [
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982646/sneaky-snake-thinking-2_zmtcbt.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982649/sneaky-snake-thinking-1_orofsf.mp4'  
    ]
  },
  'people-pleaser-pup': {
    thinking: [
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982596/people-pleaser-pup-thinking-1_xu0rq6.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982592/people-pleaser-pup-thinking-2_juvbbw.mp4',
      'https://res.cloudinary.com/dh1n9zhp3/video/upload/v1750982589/people-pleaser-pup-thinking-3_iphopt.mp4'
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
