
import { useEffect, useState } from 'react';
import { Character } from '../types';
import { getPersonalityTheme } from '../utils/personalityThemes';

interface PersonalityEffectsProps {
  character: Character;
  isActive?: boolean;
}

const PersonalityEffects = ({ character, isActive = true }: PersonalityEffectsProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string; delay: number }>>([]);
  const theme = getPersonalityTheme(character.type);

  useEffect(() => {
    if (!isActive) return;

    const generateParticles = () => {
      const particleEmojis = theme.effects.particles.split('');
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
        delay: Math.random() * 3
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 6000);

    return () => clearInterval(interval);
  }, [theme.effects.particles, isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Dynamic Background Pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.colors.background} opacity-60`}>
        {theme.effects.backgroundPattern === 'diagonal-stripes' && (
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(236, 72, 153, 0.1) 10px, rgba(236, 72, 153, 0.1) 20px)'
          }} />
        )}
        {theme.effects.backgroundPattern === 'mystical-runes' && (
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 text-6xl text-amber-400 animate-pulse">⚡</div>
            <div className="absolute top-3/4 right-1/4 text-4xl text-amber-400 animate-pulse delay-1000">🔮</div>
            <div className="absolute top-1/2 left-3/4 text-5xl text-amber-400 animate-pulse delay-2000">✨</div>
          </div>
        )}
        {theme.effects.backgroundPattern === 'zen-circles' && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 border border-green-400/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-64 h-64 border border-green-400/30 rounded-full animate-pulse delay-1000"></div>
          </div>
        )}
        {theme.effects.backgroundPattern === 'chaotic-zigzag' && (
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 15px, rgba(249, 115, 22, 0.1) 15px, rgba(249, 115, 22, 0.1) 25px), repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(249, 115, 22, 0.1) 15px, rgba(249, 115, 22, 0.1) 25px)'
          }} />
        )}
        {theme.effects.backgroundPattern === 'random-shapes' && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/5 w-12 h-12 bg-yellow-400/20 rotate-45 animate-spin slow"></div>
            <div className="absolute top-2/3 right-1/5 w-8 h-16 bg-blue-400/20 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-8 bg-purple-400/20 rounded-lg animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '4s'
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

export default PersonalityEffects;
