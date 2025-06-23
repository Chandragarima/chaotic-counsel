import React, { useState } from 'react';
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

type FeedbackTriggerComponent = {
  (props: FeedbackTriggerProps & { children?: React.ReactNode }, ref: React.Ref<HTMLDivElement>): JSX.Element;
  (props: FeedbackTriggerProps, ref: React.Ref<HTMLButtonElement>): JSX.Element;
};

const FeedbackTrigger = React.forwardRef(function FeedbackTrigger(
  { character, feedbackType, variant = 'button', className = '', children }: FeedbackTriggerProps,
  ref: React.Ref<HTMLDivElement | HTMLButtonElement>
) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);

  if (children) {
    return (
      <>
        <div ref={ref as React.Ref<HTMLDivElement>} onClick={handleOpen} className={className}>
          {children}
        </div>
        <FeedbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          character={character}
          feedbackType={feedbackType}
        />
      </>
    );
  }

  let triggerEl;
  switch (variant) {
    case 'floating':
      triggerEl = (
        <Button
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={handleOpen}
          size="sm"
          className={`fixed bottom-6 right-6 rounded-full shadow-lg z-40 ${className}`}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Feedback
        </Button>
      );
      break;
    case 'inline':
      triggerEl = (
        <Button
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={handleOpen}
          variant="outline"
          size="sm"
          className={`text-sm ${className}`}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Share feedback
        </Button>
      );
      break;
    default:
      triggerEl = (
        <Button
          ref={ref as React.Ref<HTMLButtonElement>}
          onClick={handleOpen}
          variant="outline"
          className={className}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Feedback
        </Button>
      );
  }

  return (
    <>
      {triggerEl}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        character={character}
        feedbackType={feedbackType}
      />
    </>
  );
}) as unknown as FeedbackTriggerComponent;

export default FeedbackTrigger;
