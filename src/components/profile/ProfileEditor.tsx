
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Pencil, RefreshCw } from 'lucide-react';

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
}

const ProfileEditor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [regeneratingUsername, setRegeneratingUsername] = useState(false);

  const emojiAvatars = [
    '🐱', '🐶', '🦊', '🐺', '🦁', '🐯', '🐨', '🐼',
    '🐸', '🐙', '🦉', '🦅', '🐧', '🦋', '🐝', '🦒',
    '🐘', '🦏', '🦛', '🐊', '🐢', '🦕', '🦖', '🐳',
    '🐬', '🦈', '🐟', '🐠', '🐡', '🦞', '🦀', '🐚',
    '🌟', '⭐', '🌙', '☀️', '🌈', '⚡', '🔥', '💎',
    '🎭', '🎨', '🎪', '🎯', '🎲', '🎸', '🎺', '🎹'
  ];

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile({ ...profile, ...updates });
      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error", 
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const generateNewUsername = async () => {
    setRegeneratingUsername(true);
    try {
      const { data, error } = await supabase.rpc('generate_unique_animal_username');
      
      if (error) throw error;

      await updateProfile({ username: data });
      toast({
        title: "New username generated!",
        description: "Your username has been updated"
      });
    } catch (error) {
      console.error('Error generating username:', error);
      toast({
        title: "Error",
        description: "Failed to generate new username",
        variant: "destructive"
      });
    } finally {
      setRegeneratingUsername(false);
    }
  };

  const handleAvatarSelect = (emoji: string) => {
    updateProfile({ avatar_url: emoji });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-white">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-white">Profile not found</div>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Your Profile</CardTitle>
        <CardDescription className="text-white/70">
          Your unique identity in the app
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Current Profile Display */}
        <div className="flex items-center gap-6 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="text-6xl">
            {profile.avatar_url || '🐱'}
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{profile.username}</div>
            <div className="text-white/60">Your animal persona</div>
          </div>
        </div>

        {/* Username Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-medium text-white">Username</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={generateNewUsername}
              disabled={regeneratingUsername}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${regeneratingUsername ? 'animate-spin' : ''}`} />
              {regeneratingUsername ? 'Generating...' : 'Generate New'}
            </Button>
          </div>
          <div className="text-white/80">
            Click "Generate New" to get a fresh animal username
          </div>
        </div>

        {/* Avatar Section */}
        <div className="space-y-4">
          <Label className="text-lg font-medium text-white">Profile Avatar</Label>
          <div className="text-white/80 mb-4">
            Choose your avatar from the collection below
          </div>
          
          <div className="grid grid-cols-8 gap-3">
            {emojiAvatars.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleAvatarSelect(emoji)}
                disabled={updating}
                className={`relative p-3 rounded-xl text-3xl transition-all hover:scale-110 border-2 ${
                  profile.avatar_url === emoji 
                    ? 'border-amber-400 bg-amber-400/20 ring-2 ring-amber-400/50' 
                    : 'border-white/20 bg-white/5 hover:border-amber-400/50 hover:bg-white/10'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;
