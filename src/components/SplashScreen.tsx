
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [loadingText, setLoadingText] = useState('Summoning the Council...');
  const [showButton, setShowButton] = useState(false);

  const loadingTexts = [
    'Summoning the Council...',
    'Consulting ancient wisdom...',
    'Awakening mystical advisors...',
    'Preparing chaotic counsel...',
    'Ready for guidance!'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < loadingTexts.length - 1) {
        index++;
        setLoadingText(loadingTexts[index]);
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-5xl font-mystical font-bold text-mystical-gold mb-2 animate-glow-pulse">
            CHAOTIC
          </h1>
          <h2 className="text-4xl font-mystical font-semibold text-mystical-gold-light">
            COUNSEL
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-mystical-gold to-transparent mx-auto"></div>
        </div>

        {/* Subtitle */}
        <p className="text-lg text-mystical-gold-light font-medium max-w-sm mx-auto">
          Your whimsical decision-making companion
        </p>

        {/* Loading Animation */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-mystical-gold/30 border-t-mystical-gold rounded-full animate-spin"></div>
          </div>
          
          <p className="text-mystical-gold-light font-medium animate-pulse">
            {loadingText}
          </p>
        </div>

        {/* Enter Button */}
        {showButton && (
          <div className="animate-fade-in">
            <Button 
              onClick={onComplete}
              className="mystical-button text-lg font-semibold px-8 py-4"
            >
              Enter the Realm
            </Button>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-mystical-gold/40 text-6xl animate-float">✨</div>
      <div className="absolute bottom-32 right-8 text-mystical-gold/40 text-4xl animate-float" style={{ animationDelay: '1s' }}>🌟</div>
      <div className="absolute top-40 right-16 text-mystical-gold/40 text-3xl animate-float" style={{ animationDelay: '2s' }}>⭐</div>
    </div>
  );
};

export default SplashScreen;
