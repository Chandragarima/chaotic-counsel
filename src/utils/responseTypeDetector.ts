
import { ImageType } from './personalityImageManager';

export const detectResponseType = (answer: string): ImageType => {
  if (!answer) return 'thinking';

  const lowerAnswer = answer.toLowerCase();

  // Check for choice responses (contains specific choice indicators)
  if (lowerAnswer.includes('obviously') && (lowerAnswer.includes('go with') || lowerAnswer.includes('it is'))) {
    return 'choice';
  }
  if (lowerAnswer.includes('the ancient wisdom speaks:') || lowerAnswer.includes('calls to your soul')) {
    return 'choice';
  }
  if (lowerAnswer.includes('stretches lazily') && lowerAnswer.includes('go with')) {
    return 'choice';
  }
  if (lowerAnswer.includes('quick decision:') || lowerAnswer.includes('panic choice:')) {
    return 'choice';
  }
  if (lowerAnswer.includes('quacks mysteriously') && lowerAnswer.includes('the universe says')) {
    return 'choice';
  }

  // Check for yes responses
  if (lowerAnswer.includes('obviously yes') || lowerAnswer.includes('absolutely') || 
      lowerAnswer.includes('definitely yes') || lowerAnswer.includes('yes') ||
      lowerAnswer.includes('affirmative') || lowerAnswer.includes('indeed') ||
      lowerAnswer.includes('verily') || lowerAnswer.includes('truly')) {
    return 'yes';
  }

  // Check for no responses
  if (lowerAnswer.includes('absolutely not') || lowerAnswer.includes('no way') ||
      lowerAnswer.includes('hard pass') || lowerAnswer.includes('nay') ||
      lowerAnswer.includes('negative') || lowerAnswer.includes('nope') ||
      lowerAnswer.includes('no ') || lowerAnswer.startsWith('no')) {
    return 'no';
  }

  // Check for maybe responses
  if (lowerAnswer.includes('maybe') || lowerAnswer.includes('perhaps') ||
      lowerAnswer.includes('possibly') || lowerAnswer.includes('might be') ||
      lowerAnswer.includes('depends on') || lowerAnswer.includes('uncertain')) {
    return 'maybe';
  }

  // Default fallback
  return 'choice';
};
