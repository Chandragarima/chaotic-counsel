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

  // Personality-specific sample questions with mix of basic, or, and category questions
  const getPersonalityQuestions = (): SampleQuestion[] => {
    const baseId = `${character.type}-${questionType}`;
    
    switch (character.type) {
      case 'sassy-cat':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I actually cook tonight, or just keep pretending I will?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Sushi or Thai food?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'What cuisine should I order tonight?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I meal prep this week?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Pizza or tacos for my cheat meal?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I binge-watch something tonight?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Horror movie or rom-com?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What movie I should watch tonight?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I rewatch The Office again?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Netflix or Disney+ tonight?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I go out tonight?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Coffee shop or bubble tea place?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Where should I hang out this weekend?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I post this on my story?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Beach day or shopping mall?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I text my ex?', category: 'choice' },
              { id: `${baseId}-2`, text: 'iPhone or Android for my next phone?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I keep scrolling… or pretend I respect my sleep schedule tonight?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I quit my job and become an influencer?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Spotify or Apple Music?', category: 'choice' }
            ];
        }
        break;
        
      case 'wise-owl':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I practice mindful eating tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Mediterranean or Asian cuisine?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'What cuisine will nourish my soul tonight?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I cook with intention tonight?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Plant-based meal or comfort food?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I seek wisdom through film tonight?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Documentary or foreign film?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What genre will expand my consciousness?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I watch something profound tonight?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Classic literature adaptation or modern storytelling?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I seek solitude today?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Nature walk or meditation center?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Where should I go for inner peace?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I journal in solitude today?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Art gallery or bookstore?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I follow my heart or logic?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Passion or financial stability?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Will reading a book tonight lead to enlightenment?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I speak my truth today?', category: 'choice' },
              { id: `${baseId}-5`, text: 'City life or countryside living?', category: 'choice' }
            ];
        }
        break;
        
      case 'lazy-panda':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I order delivery tonight?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'DoorDash or whatever is in my fridge?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'What food requires zero effort tonight?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I have cereal for dinner?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Ramen packets or actual cooking?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I just let Netflix autoplay?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Something I can nap to or mindless comedy?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What can I fall asleep to tonight?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I rewatch Friends again?', category: 'movie' },
              { id: `${baseId}-5`, text: 'True crime or sitcom background noise?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I leave my couch today?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'My couch or someone else\'s couch?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Should I keep napping with the TV on and pretend I\'m still watching?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I embrace hermit mode today?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Activity that requires pants or pajama-friendly?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I adult today?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Productivity or procrastination?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I cancel my plans because doing nothing is kinda working for me?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I clean my room?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Gym membership or accept my fate?', category: 'choice' }
            ];
        }
        break;
        
      case 'sneaky-snake':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I make dinner reservations... or do I have other plans brewing?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'Expensive restaurant or cheap eats for maximum savings?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'What cuisine would be perfect for my... business meeting tonight?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I cook at home where no one can overhear my calls?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Fast food or sit-down meal with strategic networking opportunities?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I watch a heist movie for... inspiration?', category: 'movie' },
              { id: `${baseId}-2`, text: 'Thriller or comedy to throw people off my scent?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What genre would be the perfect alibi for tonight?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I binge-watch spy shows for research purposes?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Cinema or streaming at home where I can take private calls?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I go somewhere public for a perfectly innocent hangout?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Coffee shop with good Wi-Fi or park with no security cameras?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Where should I meet my... completely legitimate friends?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I suggest a location that benefits my master plan?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Indoor venue or outdoor spot where conversations can\'t be recorded?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I reveal my true intentions now or wait longer?', category: 'choice' },
              { id: `${baseId}-2`, text: 'Direct approach or continue with subtle manipulation?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I execute phase two of my totally ethical plan?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I trust them with my secret... or keep scheming?', category: 'choice' },
              { id: `${baseId}-5`, text: 'Play it safe or take the calculated risk for maximum gain?', category: 'choice' }
            ];
        }
        break;
        
      case 'people-pleaser-pup':
        switch (questionType) {
          case 'dinner':
            return [
              { id: `${baseId}-1`, text: 'Should I cook everyone\'s favorite meal even though it takes 3 hours?', category: 'dinner' },
              { id: `${baseId}-2`, text: 'What everyone else wants or what I actually want to eat?', category: 'dinner' },
              { id: `${baseId}-3`, text: 'What cuisine would make absolutely everyone happy tonight?', category: 'dinner' },
              { id: `${baseId}-4`, text: 'Should I ask everyone what they want even though I\'m starving?', category: 'dinner' },
              { id: `${baseId}-5`, text: 'Safe crowd-pleaser meal or risk trying something new they might not like?', category: 'dinner' }
            ];
          case 'movie':
            return [
              { id: `${baseId}-1`, text: 'Should I let everyone else pick the movie again?', category: 'movie' },
              { id: `${baseId}-2`, text: 'What they all want to watch or secretly what I want to see?', category: 'movie' },
              { id: `${baseId}-3`, text: 'What genre would get the most group approval tonight?', category: 'movie' },
              { id: `${baseId}-4`, text: 'Should I suggest my favorite movie even if others might not like it?', category: 'movie' },
              { id: `${baseId}-5`, text: 'Popular blockbuster or indie film that might be too weird for them?', category: 'movie' }
            ];
          case 'hangout':
            return [
              { id: `${baseId}-1`, text: 'Should I suggest the place I want or ask what everyone else prefers?', category: 'hangout' },
              { id: `${baseId}-2`, text: 'Expensive place they love or budget option that won\'t stress anyone?', category: 'hangout' },
              { id: `${baseId}-3`, text: 'Where would make everyone the happiest today?', category: 'hangout' },
              { id: `${baseId}-4`, text: 'Should I plan everything myself so no one else has to worry?', category: 'hangout' },
              { id: `${baseId}-5`, text: 'Safe familiar spot or new place that might disappoint someone?', category: 'hangout' }
            ];
          case 'choice':
            return [
              { id: `${baseId}-1`, text: 'Should I finally speak up about what I want?', category: 'choice' },
              { id: `${baseId}-2`, text: 'What makes me happy or what keeps everyone else comfortable?', category: 'choice' },
              { id: `${baseId}-3`, text: 'Should I set boundaries even if it might upset someone?', category: 'choice' },
              { id: `${baseId}-4`, text: 'Should I say yes to avoid conflict even though I want to say no?', category: 'choice' },
              { id: `${baseId}-5`, text: 'My authentic choice or the safe people-pleasing option?', category: 'choice' }
            ];
        }
        break;
        
      default:
        return [
          { id: '1', text: 'Should I order pizza?', category: 'dinner' },
          { id: '2', text: 'Should I go out tonight?', category: 'hangout' },
          { id: '3', text: 'What should I watch?', category: 'movie' },
          { id: '4', text: 'Should I make this choice?', category: 'choice' }
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
      case 'sneaky-snake':
        return `Strategic ${baseTitle}`;
      case 'people-pleaser-pup':
        return `Considerate ${baseTitle}`;
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
      case 'sneaky-snake':
        return "Plotting the perfect answer for your schemes";
      case 'people-pleaser-pup':
        return "Eager to help make everyone happy!";
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
