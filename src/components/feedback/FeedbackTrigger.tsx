
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import FeedbackModal from './FeedbackModal';
import { Character } from '../../types';

interface FeedbackTriggerProps {
  character?: Character;
  feedbackType: 'post_decision' | 'general';
  variant?: 'button' | 'floating' | 'inline';
  className?: string;
  children?: React.ReactNode;
}

const FeedbackTrigger = ({ 
  character, 
  feedbackType, 
  variant = 'button', 
  className = '',
  children 
}: FeedbackTriggerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderTrigger = () => {
    if (children) {
      return (
        <div onClick={() => setIsModalOpen(true)} className={className}>
          {children}
        </div>
      );
    }

    switch (variant) {
      case 'floating':
        return (
          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            className={`fixed bottom-6 right-6 rounded-full shadow-lg z-40 ${className}`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Feedback
          </Button>
        );
      
      case 'inline':
        return (
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            size="sm"
            className={`text-sm ${className}`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Share feedback
          </Button>
        );
      
      default:
        return (
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="outline"
            className={className}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Feedback
          </Button>
        );
    }
  };

  return (
    <>
      {renderTrigger()}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        character={character}
        feedbackType={feedbackType}
      />
    </>
  );
};

export default FeedbackTrigger;
