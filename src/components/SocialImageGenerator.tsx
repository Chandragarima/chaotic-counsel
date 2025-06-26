
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { createSocialPreviewFile } from '../utils/socialImageGenerator';

const SocialImageGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await createSocialPreviewFile();
    } catch (error) {
      console.error('Failed to generate social image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="bg-amber-500 hover:bg-amber-600 text-slate-900"
        size="sm"
      >
        <Download className="w-4 h-4 mr-2" />
        {isGenerating ? 'Generating...' : 'Generate Social Image'}
      </Button>
    </div>
  );
};

export default SocialImageGenerator;
