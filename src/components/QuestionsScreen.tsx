import { useState } from 'react';
import { QuestionType, SampleQuestion, Character } from '../types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';
import { getPersonalityTheme } from '../utils/personalityThemes';
import PersonalityEffects from './PersonalityEffects';

interface QuestionsScreenProps {
  questionType: QuestionType;
  character: Character;
  onQuestionSelect: (question: string) => void;
  onBack: () => void;
}

const QuestionsScreen = ({ questionType, character, onQuestionSelect, onBack }: QuestionsScreenProps) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = getPersonalityTheme(character.type);

  // Personality-specific sample questions with Gen Z/Millennial appeal
  const getPersonalityQuestions = (): SampleQuestion[] => {
    const baseId = `${character.type}-${questionType}`;
    
    switch (character.type) {
      case 'sassy-cat':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'What cuisine should I eat tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Should I order sushi or get Thai food?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Cooking at home or ordering DoorDash?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Pizza or tacos for my cheat meal?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Should I meal prep or live off takeout this week?', category: 'dinner' },
              { id: `${baseId}-6`, text: 'Healthy salad or comfort food tonight?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Netflix or Disney+ for tonight\'s binge?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Horror movie or rom-com to match my mood?', category: 'movie' },
              { id: `${baseId}-3`, text: 'Should I rewatch The Office or try something new?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Marvel or DC for my superhero fix?', category: 'movie' },
              { id: `${baseId}-5`, text: 'True crime documentary or comedy special?', category: 'movie' },
              { id: `${baseId}-6`, text: 'Should I start a new series or finish one I abandoned?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Coffee shop or bubble tea place for our hangout?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Should I go out or stay in and be antisocial?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Museum or shopping mall for weekend vibes?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Beach day or hiking adventure?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'House party or quiet dinner with friends?', category: 'hangout' },
              { id: `${baseId}-6`, text: 'Should I post this on my story or keep it private?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'iPhone or Android for my next phone?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Should I text my ex or maintain my dignity?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Spotify or Apple Music for my subscription?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I quit my job or stick it out?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Move back home or keep struggling with rent?', category: 'choice' },
              { id: `${baseId}-6`, text: 'Should I get another tattoo or save money?', category: 'choice' }
            ];
        }
        break;
        
      case 'wise-owl':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'What nourishment shall feed my soul tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Mediterranean or Asian cuisine for spiritual sustenance?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Should I practice mindful eating or indulge tonight?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Plant-based meal or something with ancient grains?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Should I cook with intention or order mindfully?', category: 'dinner' },
              { id: `${baseId}-6`, text: 'What cuisine will align with my energy tonight?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Criterion Collection or mainstream cinema tonight?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Should I watch something profound or entertaining?', category: 'movie' },
              { id: `${baseId}-3`, text: 'Foreign film or English-speaking for tonight\'s journey?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Documentary about consciousness or sci-fi exploration?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Classic literature adaptation or modern storytelling?', category: 'movie' },
              { id: `${baseId}-6`, text: 'Should I seek wisdom in film or pure entertainment?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Nature walk or meditation center for inner peace?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Should I seek solitude or meaningful connection today?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Art gallery or bookstore for cultural enrichment?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Yoga class or philosophical discussion group?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Should I journal in solitude or share wisdom with others?', category: 'hangout' },
              { id: `${baseId}-6`, text: 'Farmers market or library for soul nourishment?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Follow my heart or trust logical reasoning?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Should I pursue passion or financial stability?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Graduate school or life experience for growth?', category: 'choice' },
              { id: `${baseId}-4`, text: 'City life or countryside for my soul\'s calling?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Should I speak my truth or maintain harmony?', category: 'choice' },
              { id: `${baseId}-6`, text: 'Minimalism or maximalism for my lifestyle?', category: 'choice' }
            ];
        }
        break;
        
      case 'lazy-panda':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'What food requires zero effort tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'DoorDash or whatever\'s in my fridge?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Cereal for dinner or adult responsibility?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Ramen packets or actual cooking tonight?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Should I meal prep or embrace the chaos?', category: 'dinner' },
              { id: `${baseId}-6`, text: 'What cuisine delivers fastest to my couch?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'What can I fall asleep to without missing much?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Rewatch The Office or find something new to ignore?', category: 'movie' },
              { id: `${baseId}-3`, text: 'Netflix autoplay or actually choosing something?', category: 'movie' },
              { id: `${baseId}-4`, text: 'True crime to nap to or sitcom background noise?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Should I commit to a movie or just scroll TikTok?', category: 'movie' },
              { id: `${baseId}-6`, text: 'Animation or live-action for minimal brain usage?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'My couch or someone else\'s couch?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Should I socialize or embrace hermit mode?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Coffee shop with good WiFi or staying home?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Park bench napping or indoor climate control?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Should I make plans or see what happens?', category: 'hangout' },
              { id: `${baseId}-6`, text: 'Activity that requires pants or pajama-friendly?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I adult today or postpone until tomorrow?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Productivity or procrastination for today\'s vibe?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Answer emails or pretend I didn\'t see them?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Gym membership or just accept my fate?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Should I clean my room or learn to navigate the chaos?', category: 'choice' },
              { id: `${baseId}-6`, text: 'Career ambition or work-life balance for happiness?', category: 'choice' }
            ];
        }
        break;
        
      default:
        // Default questions for other characters
        return [
          { id: '1', text: 'Should I order pizza or pasta?', category: 'dinner' },
          { id: '2', text: 'Should I go out or order in?', category: 'dinner' },
          { id: '3', text: 'Which cuisine should I eat?', category: 'dinner' },
          { id: '4', text: 'Is it ice cream day today?', category: 'dinner' },
          { id: '5', text: 'Should I cook or get takeout?', category: 'dinner' },
          { id: '6', text: 'Is it time for dessert?', category: 'dinner' }
        ];
    }
    
    return [];
  };

  const sampleQuestions = getPersonalityQuestions();

  const getTypeTitle = () => {
    const baseTitle = (() => {
      switch (questionType) {
        case 'dinner': return 'Dinner Decisions';
        case 'movie': return 'Entertainment Choices';
        case 'hangout': return 'Activity Ideas';
        case 'choice': return 'Life Choices';
      }
    })();

    // Add personality flair to titles
    switch (character.type) {
      case 'sassy-cat':
        return `${baseTitle} (With Attitude)`;
      case 'wise-owl':
        return `Sacred ${baseTitle}`;
      case 'lazy-panda':
        return `Low-Effort ${baseTitle}`;
      default:
        return baseTitle;
    }
  };

  const getPersonalityPrompt = () => {
    switch (character.type) {
      case 'sassy-cat':
        return "Ready to judge your choices with style";
      case 'wise-owl':
        return "Ancient wisdom awaits your inquiry";
      case 'lazy-panda':
        return "Here to help with minimal effort required";
      default:
        return `${character.name} is here to help you choose`;
    }
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    setTimeout(() => {
      onQuestionSelect(question);
    }, 150);
  };

  const handleCustomSubmit = () => {
    if (customQuestion.trim() && !isSubmitting) {
      setIsSubmitting(true);
      setTimeout(() => {
        onQuestionSelect(customQuestion.trim());
      }, 150);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCustomSubmit();
    }
  };

  return (
    <div className={`relative min-h-screen ${theme.animations.entrance}`}>
      <PersonalityEffects character={character} isActive={true} />
      
      <div className="relative z-10 min-h-screen p-4 space-y-8">
        {/* Header with Character Image */}
        <div className="text-center space-y-6 pt-12">
          {/* Character Image */}
          <div className="flex justify-center">
            <div className={`relative ${theme.animations.floating}`}>
              <img 
                src={character.image} 
                alt={character.name}
                className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white/20 backdrop-blur-sm"
                style={{ 
                  filter: 'drop-shadow(0 0 20px rgba(245, 158, 11, 0.4))',
                  animation: `${theme.animations.floating} 3s ease-in-out infinite`
                }}
              />
            </div>
          </div>
          
          <h1 className={`text-4xl ${theme.fonts.heading} ${theme.colors.text} opacity-90 ${theme.animations.floating}`}>
            {getTypeTitle()}
          </h1>
          <p className={`${theme.colors.text} opacity-70 ${theme.fonts.body}`}>
            {getPersonalityPrompt()}
          </p>
        </div>

        {/* Sample Questions */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className={`${theme.colors.text} ${theme.fonts.heading} text-xl text-center opacity-80`}>
            {character.name}'s Signature Questions
          </h3>
          
          <div className="grid gap-4">
            {sampleQuestions.map((question, index) => (
              <Card
                key={question.id}
                className={`${theme.effects.borderStyle} bg-slate-900/40 backdrop-blur-sm p-6 cursor-pointer transition-all duration-300 min-h-[80px] flex items-center ${theme.colors.glow} ${theme.animations.cardHover} ${
                  selectedQuestion === question.text 
                    ? 'scale-95 opacity-75' 
                    : 'hover:scale-102 hover:bg-slate-900/60 active:scale-98'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`
                }}
                onClick={() => handleQuestionSelect(question.text)}
              >
                <p className={`${theme.colors.text} ${theme.fonts.body} text-center w-full text-lg opacity-90`}>
                  {question.text}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Question Input */}
        <div className="max-w-2xl mx-auto space-y-6">
          <h3 className={`${theme.colors.text} ${theme.fonts.heading} text-xl text-center opacity-80`}>
            Or Ask Your Own
          </h3>
          
          <div className="flex gap-3">
            <Input
              placeholder="Type your question here..."
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`${theme.effects.borderStyle} bg-slate-900/40 backdrop-blur-sm ${theme.colors.text} ${theme.fonts.body} min-h-[56px] text-lg placeholder:opacity-50 focus:bg-slate-900/60 transition-all duration-300`}
              disabled={isSubmitting}
              style={{ color: theme.colors.accent }}
            />
            <Button
              onClick={handleCustomSubmit}
              disabled={!customQuestion.trim() || isSubmitting}
              className={`min-h-[56px] min-w-[56px] bg-gradient-to-r ${theme.colors.primary} hover:opacity-90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${theme.animations.buttonHover}`}
              style={{ backgroundColor: theme.colors.accent }}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center pt-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            className={`${theme.colors.text} hover:opacity-80 min-h-[44px] px-8 ${theme.fonts.body} transition-all duration-300 ${theme.animations.buttonHover}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsScreen;
