
import { useEffect, useState } from 'react';

interface SparklePosition {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<SparklePosition[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: SparklePosition[] = [];
      for (let i = 0; i < 8; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 4,
          duration: 3 + Math.random() * 2,
          size: 4 + Math.random() * 4
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`
          }}
        >
          <div 
            className="sparkle-element"
            style={{
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              borderRadius: '50%',
              animation: 'sparkle 3s ease-in-out infinite',
              boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Sparkles;
