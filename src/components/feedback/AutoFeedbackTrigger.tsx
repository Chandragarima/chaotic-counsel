
import { useEffect } from 'react';
import FeedbackTrigger from './FeedbackTrigger';
import { Character } from '../../types';

interface AutoFeedbackTriggerProps {
  shouldShow: boolean;
  character?: Character;
  onFeedbackShown: () => void;
  isAnswerRevealed: boolean; // New prop to check if answer is fully displayed
}

const AutoFeedbackTrigger = ({ shouldShow, character, onFeedbackShown, isAnswerRevealed }: AutoFeedbackTriggerProps) => {
  useEffect(() => {
    if (shouldShow && isAnswerRevealed) {
      // Small delay to ensure the answer has been displayed
      const timer = setTimeout(() => {
        onFeedbackShown();
      }, 2000); // Increased delay to ensure user has time to read the answer

      return () => clearTimeout(timer);
    }
  }, [shouldShow, onFeedbackShown, isAnswerRevealed]);

  if (!shouldShow || !isAnswerRevealed) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-in slide-in-from-right-5 duration-500">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              How are you liking the app?
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Quick feedback helps us improve! (Optional)
            </p>
            <FeedbackTrigger 
              character={character}
              feedbackType="general"
              variant="inline"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoFeedbackTrigger;
