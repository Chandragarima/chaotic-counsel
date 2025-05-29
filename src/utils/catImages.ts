
// Cat images configuration
// Add your free cat image URLs here
export const catImages: string[] = [
  // Placeholder images - replace with your actual cat image URLs
  //'/lovable-uploads/3e3b0145-32d2-4801-b3ac-c7d5af5e5653.png', // Current sassy cat image
  // Add more cat image URLs here like:
  'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg',
  'https://images.pexels.com/photos/32272444/pexels-photo-32272444/free-photo-of-funny-cross-eyed-orange-tabby-cat-on-grass.jpeg',
  'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg'
  // 'https://example.com/cat3.jpg',
];

// Function to get a random cat image
export const getRandomCatImage = (): string => {
  if (catImages.length === 0) {
    return '/lovable-uploads/3e3b0145-32d2-4801-b3ac-c7d5af5e5653.png'; // Fallback to default
  }
  
  // Use crypto.getRandomValues for better randomness if available
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    return catImages[randomArray[0] % catImages.length];
  }
  
  // Fallback to Math.random with additional entropy
  const entropy = Date.now() % 1000 + Math.random() * 1000;
  return catImages[Math.floor(entropy) % catImages.length];
};
