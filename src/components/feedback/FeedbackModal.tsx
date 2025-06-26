import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Heart, X, ExternalLink } from 'lucide-react';
import { Character } from '../../types';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { useFeedbackSubmission } from '../../hooks/useFeedbackSubmission';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  character?: Character;
  feedbackType: 'post_decision' | 'general';
}

const FeedbackModal = ({ isOpen, onClose, character, feedbackType }: FeedbackModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [appSatisfaction, setAppSatisfaction] = useState<number | null>(null);
  const [favoriteCharacter, setFavoriteCharacter] = useState<string>('');
  const [desiredCharacters, setDesiredCharacters] = useState<string>('');
  const [willingDetailedFeedback, setWillingDetailedFeedback] = useState<boolean | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  const { submitFeedback, isSubmitting } = useFeedbackSubmission();
  const theme = character ? getPersonalityTheme(character.type) : null;

  const availableCharacters = [
    'Sassy Cat', 'Wise Owl', 'Lazy Panda', 'Sneaky Snake', 'People Pleaser Pup'
  ];

  const handleSubmit = async () => {
    const feedbackData = {
      feedback_type: feedbackType,
      character_used: character?.type || null,
      app_satisfaction: appSatisfaction,
      favorite_character: favoriteCharacter || null,
      desired_characters: desiredCharacters ? desiredCharacters.split(',').map(c => c.trim()) : [],
      willing_detailed_feedback: willingDetailedFeedback,
      additional_notes: additionalNotes || null
    };

    const success = await submitFeedback(feedbackData);
    if (success) {
      if (willingDetailedFeedback) {
        // Redirect to Google Form (will be provided later)
        window.open('https://forms.google.com/your-form-link', '_blank');
      }
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">How are you liking the app?</h3>
        <p className="text-sm text-gray-600 mb-4">Your feedback helps us improve! (Optional)</p>
      </div>
      
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => setAppSatisfaction(rating)}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              appSatisfaction && rating <= appSatisfaction
                ? 'bg-yellow-400 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
            }`}
          >
            <Star className={`w-6 h-6 ${appSatisfaction && rating <= appSatisfaction ? 'fill-current' : ''}`} />
          </button>
        ))}
      </div>
      
      <div className="flex justify-center space-x-3 mt-6">
        <Button variant="outline" onClick={handleSkip}>
          Skip
        </Button>
        <Button 
          onClick={() => setCurrentStep(2)}
          className={theme ? `${theme.colors.primary}` : ''}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Which character is your favorite?</h3>
        <p className="text-sm text-gray-600 mb-4">We'd love to know! (Optional)</p>
      </div>
      
      <div className="space-y-2">
        {availableCharacters.map((char) => (
          <button
            key={char}
            onClick={() => setFavoriteCharacter(char)}
            className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
              favoriteCharacter === char
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {char}
          </button>
        ))}
      </div>
      
      <div className="flex justify-center space-x-3 mt-6">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button variant="outline" onClick={handleSkip}>
          Skip
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          className={theme ? `${theme.colors.primary}` : ''}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Do you have any feedback or character suggestions?</h3>
        <p className="text-sm text-gray-600 mb-0">Share your ideas! (Optional)</p>
      </div>
      
      <textarea
        value={desiredCharacters}
        onChange={(e) => setDesiredCharacters(e.target.value)}
        placeholder="e.g., Mystical Dragon, Friendly Robot, Wise Turtle..."
        className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      
      <div className="flex justify-center space-x-3 mt-6">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          Back
        </Button>
        <Button variant="outline" onClick={handleSkip}>
          Skip
        </Button>
        <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={theme ? `${theme.colors.primary}` : ''}
          >
            {isSubmitting ? 'Submitting...' : 'Done'}
        </Button>
      </div>
    </div>
  );

  // const renderStep4 = () => (
  //   <div className="space-y-6">
  //     <div className="text-center">
  //       <h3 className="text-lg font-semibold mb-2">Want to help us improve even more?</h3>
  //       <p className="text-sm text-gray-600 mb-4">Would you be open to providing more detailed feedback?</p>
  //     </div>
      
  //     <div className="space-y-3">
  //       <button
  //         onClick={() => setWillingDetailedFeedback(true)}
  //         className={`w-full p-4 rounded-lg border transition-all duration-200 ${
  //           willingDetailedFeedback === true
  //             ? 'border-green-500 bg-green-50 text-green-700'
  //             : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900'
  //         }`}
  //       >
  //         <div className="flex items-center justify-center space-x-2">
  //           <Heart className="w-5 h-5" />
  //           <span>Yes, I'd love to help!</span>
  //           <ExternalLink className="w-4 h-4" />
  //         </div>
  //       </button>
        
  //       <button
  //         onClick={() => setWillingDetailedFeedback(false)}
  //         className={`w-full p-4 rounded-lg border transition-all duration-200 ${
  //           willingDetailedFeedback === false
  //             ? 'border-blue-500 bg-blue-50 text-blue-700'
  //             : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900'
  //         }`}
  //       >
  //         Maybe another time
  //       </button>
  //     </div>
      
  //     <div className="flex justify-center space-x-3 mt-6">
  //       <Button variant="outline" onClick={() => setCurrentStep(3)}>
  //         Back
  //       </Button>
  //       <Button variant="outline" onClick={handleSkip}>
  //         Skip
  //       </Button>
        // <Button 
        //   onClick={handleSubmit}
        //   disabled={isSubmitting}
        //   className={theme ? `${theme.colors.primary}` : ''}
        // >
        //   {isSubmitting ? 'Submitting...' : 'Done'}
        // </Button>
  //     </div>
  //   </div>
  // );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-full md:max-w-md p-4 md:p-8 mx-auto">
        <DialogHeader>
          { <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Quick Feedback
            </DialogTitle>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div> }
          {/* <DialogTitle className="text-xl font-bold text-gray-900">
            Quick Feedback
          </DialogTitle> */}
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 mb-6">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <Card className="p-4 md:p-6 w-full">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {/* {currentStep === 4 && renderStep4()} */}
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
