
export const generateSocialPreviewImage = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  // Set canvas size for social media (1200x630 for optimal sharing)
  canvas.width = 1200;
  canvas.height = 630;
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#0f172a'); // slate-900
  gradient.addColorStop(0.5, '#1e293b'); // slate-800
  gradient.addColorStop(1, '#334155'); // slate-700
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add mystical overlay pattern
  ctx.fillStyle = 'rgba(251, 191, 36, 0.05)'; // amber with low opacity
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3 + 1;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Add main title
  ctx.fillStyle = '#fbbf24'; // amber-400
  ctx.font = 'bold 72px Cinzel, serif';
  ctx.textAlign = 'center';
  ctx.fillText('Chaotic Counsel', canvas.width / 2, 180);
  
  // Add subtitle
  ctx.fillStyle = '#f1f5f9'; // slate-100
  ctx.font = '32px Quicksand, sans-serif';
  ctx.fillText('Your Wild Decision Advisor', canvas.width / 2, 240);
  
  // Add animal emojis
  ctx.font = '64px Arial, sans-serif';
  const emojis = ['🐱', '🦉', '🐼', '🐍', '🐶'];
  const startX = canvas.width / 2 - (emojis.length * 80) / 2;
  emojis.forEach((emoji, index) => {
    ctx.fillText(emoji, startX + index * 80, 340);
  });
  
  // Add call to action
  ctx.fillStyle = '#94a3b8'; // slate-400
  ctx.font = '28px Quicksand, sans-serif';
  ctx.fillText('Combat decision fatigue with whimsical animal advisors', canvas.width / 2, 420);
  
  // Add sparkle effects
  ctx.fillStyle = '#fbbf24';
  const sparkles = ['✨', '⭐', '🌟', '💫'];
  for (let i = 0; i < 12; i++) {
    const emoji = sparkles[Math.floor(Math.random() * sparkles.length)];
    const x = Math.random() * (canvas.width - 100) + 50;
    const y = Math.random() * (canvas.height - 100) + 50;
    ctx.font = `${Math.random() * 20 + 20}px Arial, sans-serif`;
    ctx.fillText(emoji, x, y);
  }
  
  return canvas.toDataURL('image/png');
};

// Function to generate and save the social preview image
export const createSocialPreviewFile = async (): Promise<void> => {
  const imageDataUrl = generateSocialPreviewImage();
  
  // Convert data URL to blob
  const response = await fetch(imageDataUrl);
  const blob = await response.blob();
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'chaotic-counsel-social.png';
  link.click();
  
  // Clean up
  URL.revokeObjectURL(url);
};
