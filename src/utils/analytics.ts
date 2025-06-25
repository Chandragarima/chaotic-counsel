// Google Analytics 4 tracking utility
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Helper function to safely call gtag
const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  } else {
    console.warn('Google Analytics not loaded');
  }
};

// Analytics tracking functions
export const analytics = {
  // Track community poll creation
  trackPollCreated: (characterType: string, characterName: string, questionType: string) => {
    trackEvent('poll_created', {
      character_type: characterType,
      character_name: characterName,
      question_type: questionType,
      timestamp: new Date().toISOString()
    });
  },

  // Track answer sharing
  trackAnswerShared: (characterType: string, characterName: string, questionType: string, sharePlatform: string) => {
    trackEvent('answer_shared', {
      character_type: characterType,
      character_name: characterName,
      question_type: questionType,
      share_platform: sharePlatform,
      timestamp: new Date().toISOString()
    });
  },

  // Track custom question submission
  trackCustomQuestionAsked: (characterType: string, characterName: string, questionType: string, questionMode: string) => {
    trackEvent('custom_question_asked', {
      character_type: characterType,
      character_name: characterName,
      question_type: questionType,
      question_mode: questionMode,
      timestamp: new Date().toISOString()
    });
  },

  // Track total questions asked (both custom and sample)
  trackQuestionAsked: (characterType: string, characterName: string, questionType: string, questionMode: string, isCustom: boolean) => {
    trackEvent('question_asked', {
      character_type: characterType,
      character_name: characterName,
      question_type: questionType,
      question_mode: questionMode,
      is_custom: isCustom,
      timestamp: new Date().toISOString()
    });
  },

  // Track character selection
  trackCharacterSelected: (characterType: string, characterName: string) => {
    trackEvent('character_selected', {
      character_type: characterType,
      character_name: characterName,
      timestamp: new Date().toISOString()
    });
  },

  // Track question type selection
  trackQuestionTypeSelected: (questionType: string, questionMode: string) => {
    trackEvent('question_type_selected', {
      question_type: questionType,
      question_mode: questionMode,
      timestamp: new Date().toISOString()
    });
  },

  // Track serious mode engagement (first question in serious mode)
  trackSeriousModeEngagement: (characterType: string, characterName: string, questionType: string) => {
    trackEvent('serious_mode_engagement', {
      character_type: characterType,
      character_name: characterName,
      question_type: questionType,
      timestamp: new Date().toISOString()
    });
  }
}; 