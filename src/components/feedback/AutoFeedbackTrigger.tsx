
import { useEffect, useState } from 'react';
import FeedbackModal from './FeedbackModal';
import { Character } from '../../types';

interface AutoFeedbackTriggerProps {
  shouldShow: boolean;
  character?: Character;
  onFeedbackShown: () => void;
}

const AutoFeedbackTrigger = ({ shouldShow, character, onFeedbackShown }: AutoFeedbackTriggerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (shouldShow && !isModalOpen) {
      // Small delay to ensure the answer has been fully displayed
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        onFeedbackShown();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [shouldShow, isModalOpen, onFeedbackShown]);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <FeedbackModal
      isOpen={isModalOpen}
      onClose={handleClose}
      character={character}
      feedbackType="general"
    />
  );
};

export default AutoFeedbackTrigger;
