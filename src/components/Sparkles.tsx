
import { useEffect, useState } from 'react';

interface SparklePosition {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const Sparkles = () => {
  const [sparkles, setSparkles] = useState<SparklePosition[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: SparklePosition[] = [];
      for (let i = 0; i < 12; i++) {
        newSparkles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 2 + Math.random() * 2
        });
      }
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
