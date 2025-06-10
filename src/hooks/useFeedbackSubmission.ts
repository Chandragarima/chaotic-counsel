
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FeedbackData {
  feedback_type: 'post_decision' | 'general';
  character_used?: string | null;
  app_satisfaction?: number | null;
  favorite_character?: string | null;
  desired_characters?: string[];
  willing_detailed_feedback?: boolean | null;
  additional_notes?: string | null;
}

export const useFeedbackSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const generateSessionId = () => {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  };

  const submitFeedback = async (feedbackData: FeedbackData): Promise<boolean> => {
    setIsSubmitting(true);
    
    try {
      const dataToSubmit = {
        ...feedbackData,
        user_id: user?.id || null,
        session_id: user?.id ? null : generateSessionId()
      };

      const { error } = await supabase
        .from('feedback')
        .insert([dataToSubmit]);

      if (error) {
        console.error('Error submitting feedback:', error);
        toast({
          title: "Error",
          description: "Failed to submit feedback. Please try again.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });
      
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitFeedback,
    isSubmitting
  };
};
