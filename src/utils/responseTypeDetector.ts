
import { ImageType } from './personalityImageManager';

export const getImageTypeFromTemplate = (templateType: 'yes' | 'no' | 'maybe' | 'choice'): ImageType => {
  switch (templateType) {
    case 'yes':
      return 'yes';
    case 'no':
      return 'no';
    case 'maybe':
      return 'maybe';
    case 'choice':
      return 'choice';
    default:
      return 'thinking';
  }
};
