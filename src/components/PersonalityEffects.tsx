
import { useEffect, useState } from 'react';
import { Character } from '../types';
import { getPersonalityTheme } from '../utils/personalityThemes';

interface PersonalityEffectsProps {
  character: Character;
  isActive?: boolean;
  isThinking?: boolean;
  isResponding?: boolean;
}

const PersonalityEffects = ({ character, isActive = true, isThinking = false, isResponding = false }: PersonalityEffectsProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string; delay: number }>>([]);
  const [showEyeRoll, setShowEyeRoll] = useState(false);
  const theme = getPersonalityTheme(character.type);

  useEffect(() => {
    if (!isActive) return;

    const generateParticles = () => {
      const particleEmojis = theme.effects.particles.split('');
      const newParticles = Array.from({ length: 4 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: particleEmojis[Math.floor(Math.random() * particleEmojis.length)],
        delay: Math.random() * 4
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 12000);

    return () => clearInterval(interval);
  }, [theme.effects.particles, isActive]);

  // Trigger eye roll animation for Sassy Cat when responding
  useEffect(() => {
    if (character.type === 'sassy-cat' && isResponding) {
      // Random chance to trigger eye roll (30% chance)
      if (Math.random() < 0.3) {
        setShowEyeRoll(true);
        const timer = setTimeout(() => setShowEyeRoll(false), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [character.type, isResponding]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Character-specific interactive animation overlay */}
      {character.type === 'sassy-cat' && showEyeRoll && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="text-6xl animate-sassy-eye-roll">
            🙄
          </div>
          <div className="text-2xl text-pink-300 font-bold animate-sassy-dramatic-pause mt-2 text-center">
            *dramatic sigh*
          </div>
        </div>
      )}

      {/* Sophisticated Background with matching homepage aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Subtle geometric patterns */}
        {theme.effects.backgroundPattern === 'subtle-grid' && (
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
        )}
        
        {theme.effects.backgroundPattern === 'mystical-dots' && (
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(245, 158, 11, 0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
          </div>
        )}
        
        {theme.effects.backgroundPattern === 'zen-lines' && (
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, transparent 49%, rgba(16, 185, 129, 0.1) 50%, transparent 51%)',
              backgroundSize: '80px 80px'
            }} />
          </div>
        )}
        
        {theme.effects.backgroundPattern === 'electric-lines' && (
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(30deg, transparent 48%, rgba(249, 115, 22, 0.1) 50%, transparent 52%)',
              backgroundSize: '40px 40px'
            }} />
          </div>
        )}
        
        {theme.effects.backgroundPattern === 'abstract-shapes' && (
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-yellow-400/5 rounded-full blur-xl"></div>
            <div className="absolute top-2/3 right-1/5 w-24 h-48 bg-blue-400/5 rounded-lg rotate-45 blur-lg"></div>
          </div>
        )}
        
        {/* Ambient lighting effects matching homepage */}
        <div className={`absolute top-1/3 right-1/3 w-[600px] h-[600px] bg-${theme.colors.accent.replace('#', '')}/[0.03] rounded-full blur-[120px]`}></div>
        <div className={`absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-${theme.colors.accent.replace('#', '')}/[0.02] rounded-full blur-[100px]`}></div>
      </div>

      {/* Minimal floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-lg opacity-30 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '8s'
          }}
        >
          {particle.emoji}
        </div>
      ))}
      
      {/* Elegant border effects matching homepage */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${theme.colors.accent.replace('#', '')}/10 to-transparent`}></div>
        <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-${theme.colors.accent.replace('#', '')}/10 to-transparent`}></div>
        <div className={`absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-${theme.colors.accent.replace('#', '')}/10 to-transparent`}></div>
        <div className={`absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-${theme.colors.accent.replace('#', '')}/10 to-transparent`}></div>
      </div>
    </div>
  );
};

export default PersonalityEffects;
