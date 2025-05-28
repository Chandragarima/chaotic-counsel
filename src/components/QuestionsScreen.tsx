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

  // Personality-specific sample questions
  const getPersonalityQuestions = (): SampleQuestion[] => {
    const baseId = `${character.type}-${questionType}`;
    
    switch (character.type) {
      case 'sassy-cat':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I order the expensive sushi or settle for peasant food?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Is it beneath me to eat leftovers tonight?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Should I judge the delivery person\'s food choices?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Do I deserve caviar or just regular human food?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Should I make someone else cook for me?', category: 'dinner' },
              { id: `${baseId}-6`, text: 'Is cereal for dinner a power move or giving up?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I watch something with good reviews or trash everyone will hate?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Is this movie worth my precious time and attention?', category: 'movie' },
              { id: `${baseId}-3`, text: 'Should I critique the acting while watching?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Horror movie or rom-com to judge people\'s life choices?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Should I spoil the ending for my friends?', category: 'movie' },
              { id: `${baseId}-6`, text: 'Documentary about my superiority complex?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I grace people with my presence today?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Are these humans worthy of my social energy?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Should I cancel plans and let them miss me?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Coffee shop to judge other people\'s orders?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Should I make dramatic entrances everywhere?', category: 'hangout' },
              { id: `${baseId}-6`, text: 'Is staying home the ultimate power move?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I choose what benefits me most obviously?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Is this decision worthy of my mental energy?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I make the choice that annoys people most?', category: 'choice' },
              { id: `${baseId}-4`, text: 'What would a queen like me choose?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Should I flip a coin and ignore the result?', category: 'choice' },
              { id: `${baseId}-6`, text: 'Is this beneath my standards anyway?', category: 'choice' }
            ];
        }
        break;
        
      case 'wise-owl':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'What nourishment will feed both body and spirit tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Should I seek wisdom in ancient grains or modern cuisine?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Does the universe call for soup or salad this evening?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'What meal will honor the sacred act of sustenance?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Should I commune with nature through plant-based fare?', category: 'dinner' },
              { id: `${baseId}-6`, text: 'What would the ancient ones have consumed at twilight?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Which tale will illuminate the deeper truths of existence?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Should I seek wisdom in documentary or metaphor in fiction?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What story will guide my soul\'s evening journey?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Do the stars align for comedy or contemplative drama?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Should I revisit timeless classics or explore new narratives?', category: 'movie' },
              { id: `${baseId}-6`, text: 'What visual meditation will serve my spirit tonight?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I seek solitude in nature or communion with kindred spirits?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Do the cosmic forces favor indoor reflection or outdoor exploration?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'What sacred space will nurture my soul today?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I share wisdom with others or meditate in silence?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Do the ancient winds call for adventure or contemplation?', category: 'hangout' },
              { id: `${baseId}-6`, text: 'What gathering will honor the interconnectedness of all beings?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Which path aligns with the greater cosmic purpose?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Should I trust the whispers of intuition or logic\'s counsel?', category: 'choice' },
              { id: `${baseId}-3`, text: 'What decision honors both wisdom and compassion?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Do the celestial signs favor bold action or patient waiting?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Which choice will serve the highest good for all?', category: 'choice' },
              { id: `${baseId}-6`, text: 'What would the ancient sages counsel in this moment?', category: 'choice' }
            ];
        }
        break;
        
      case 'lazy-panda':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'What requires absolutely zero cooking effort tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Should I order delivery or eat whatever\'s within arm\'s reach?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'Is cereal a valid dinner if I\'m already in pajamas?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I venture to the kitchen or survive on snacks?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'What food can I eat while lying down?', category: 'dinner' },
              { id: `${baseId}-6`, text: 'Should I meal prep or just accept my snack-based lifestyle?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'What can I watch while taking a cozy nap?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Should I rewatch something familiar or risk new plot complexity?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What\'s already queued up so I don\'t have to search?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Documentary or sitcom for optimal background napping?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Should I commit to a full movie or just watch YouTube?', category: 'movie' },
              { id: `${baseId}-6`, text: 'What requires the least emotional investment right now?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I leave the house or convince friends to come here?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'What activity requires the minimum amount of movement?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Should I socialize or embrace my hermit lifestyle today?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Coffee shop with the comfiest chairs for maximum lounging?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Should I make plans or just see what happens from my couch?', category: 'hangout' },
              { id: `${baseId}-6`, text: 'What involves the least amount of getting dressed up?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Which option requires less mental energy to decide?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Should I choose now or nap on it for several hours?', category: 'choice' },
              { id: `${baseId}-3`, text: 'What\'s the path of least resistance here?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I flip a coin so I don\'t have to think?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Which choice lets me stay in my comfort zone?', category: 'choice' },
              { id: `${baseId}-6`, text: 'Can I postpone this decision until tomorrow... or next week?', category: 'choice' }
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
