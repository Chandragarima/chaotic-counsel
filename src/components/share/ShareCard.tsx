
import { Character, AIResponse } from '../../types';
import { Card } from '@/components/ui/card';
import { getPersonalityTheme } from '../../utils/personalityThemes';
import { personalityImageManager } from '../../utils/personalityImageManager';
import { useEffect, useState } from 'react';

interface ShareCardProps {
  character: Character;
  question: string;
  answer?: string;
  aiResponse?: AIResponse | null;
  isGenerating?: boolean;
}

const ShareCard = ({ character, question, answer, aiResponse, isGenerating = false }: ShareCardProps) => {
  const theme = getPersonalityTheme(character.type);
  const [characterImage, setCharacterImage] = useState<string | null>(null);

  useEffect(() => {
    // Get appropriate character image based on response
    let imageType: 'yes' | 'no' | 'maybe' | 'choice' = 'choice';
    
    if (aiResponse?.responseType === 'binary') {
      imageType = 'maybe'; // Default for binary
    } else if (aiResponse?.responseType === 'choice') {
      imageType = 'choice';
    } else {
      imageType = 'choice'; // Default for other types
    }

    const image = personalityImageManager.getRandomImage(character.type, imageType);
    setCharacterImage(image);
  }, [character.type, aiResponse]);

  const getDisplayAnswer = () => {
    if (aiResponse) {
      switch (aiResponse.responseType) {
        case 'binary':
          return aiResponse.personalityRecommendation;
        case 'advice':
          return aiResponse.mainAdvice;
        case 'recommendation':
          return aiResponse.topRecommendation;
        case 'analysis':
          return aiResponse.conclusion;
        case 'choice':
          return aiResponse.recommendedChoice;
        default:
          return answer || "The universe whispers its wisdom...";
      }
    }
    return answer || "The universe whispers its wisdom...";
  };

  return (
    <div 
      id="share-card" 
      className={`w-[1080px] h-[1080px] relative overflow-hidden ${isGenerating ? 'fixed -top-[2000px] left-0 z-[-1]' : ''}`}
      style={{ 
        background: `linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #94a3b8 100%)`,
      }}
    >
      {/* Mystical Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-purple-600/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-pink-400/5 via-transparent to-blue-400/5"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-32 w-2 h-2 bg-blue-400 rounded-full opacity-80 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-1/2 w-3 h-3 bg-purple-400 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-60 right-20 w-4 h-4 bg-amber-300 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Mystical patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl text-amber-400">✨</div>
          <div className="absolute top-32 right-16 text-4xl text-purple-400">🔮</div>
          <div className="absolute bottom-32 left-16 text-5xl text-pink-400">⭐</div>
          <div className="absolute bottom-16 right-32 text-3xl text-blue-400">🌙</div>
          <div className="absolute top-1/2 left-8 text-4xl text-amber-300">✨</div>
          <div className="absolute top-1/2 right-8 text-3xl text-purple-300">🔮</div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-16">
        
        {/* Header with App Branding */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center space-x-4 bg-gradient-to-r from-amber-400/20 to-purple-400/20 backdrop-blur-sm rounded-full px-8 py-4 border border-amber-400/30">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            <h1 className="text-white text-4xl font-playfair font-bold bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">
              Mystical Guidance
            </h1>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Character Section */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          
          {/* Character Image with Mystical Frame */}
          {characterImage && (
            <div className="relative">
              {/* Outer glow ring */}
              <div className={`absolute inset-0 w-64 h-64 rounded-full bg-gradient-to-r ${theme.colors.primary} opacity-30 blur-xl animate-pulse`}></div>
              
              {/* Character image container */}
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-gradient-to-r from-amber-400 to-purple-400 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-purple-400/20"></div>
                <img 
                  src={characterImage} 
                  alt={character.name}
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
              
              {/* Floating sparkles around character */}
              <div className="absolute -top-4 -right-4 text-3xl animate-bounce">✨</div>
              <div className="absolute -bottom-4 -left-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
            </div>
          )}

          {/* Character Name with Mystical Styling */}
          <div className="text-center">
            <h2 className={`text-7xl font-playfair font-bold bg-gradient-to-r ${theme.colors.primary} bg-clip-text text-transparent drop-shadow-lg`}>
              {character.name}
            </h2>
            <div className="text-amber-200/80 text-2xl font-inter font-medium mt-2 tracking-wide">
              {character.personality}
            </div>
          </div>

          {/* Question Card */}
          <div className="max-w-4xl w-full">
            <Card className="bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-md border-2 border-amber-400/30 rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="text-amber-300 text-2xl font-inter font-medium mb-4 tracking-wide">The Question</div>
                <p className="text-white text-3xl font-playfair leading-relaxed font-medium">
                  "{question}"
                </p>
              </div>
            </Card>
          </div>

          {/* Answer Card */}
          <div className="max-w-4xl w-full">
            <Card className={`bg-gradient-to-br ${theme.colors.primary} border-2 border-amber-300/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden`}>
              {/* Mystical background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 text-4xl">🔮</div>
                <div className="absolute bottom-4 left-4 text-3xl">✨</div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="text-white/90 text-2xl font-inter font-medium mb-4 tracking-wide">
                  {character.name}'s Wisdom
                </div>
                <p className="text-white text-3xl font-playfair leading-relaxed font-bold">
                  "{getDisplayAnswer()}"
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer with Call to Action */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full px-8 py-4 border border-purple-400/30">
            <div className="text-3xl">🔮</div>
            <div className="text-white text-2xl font-inter font-medium">
              Get your own mystical guidance
            </div>
            <div className="text-3xl">✨</div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-400 to-amber-300 text-slate-800 text-4xl font-playfair font-bold px-8 py-4 rounded-2xl inline-block shadow-lg">
            {window.location.origin}
          </div>
          
          <div className="text-amber-200/70 text-xl font-inter tracking-wide">
            Discover what the universe has in store for you! 🌟
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
