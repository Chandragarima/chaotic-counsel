
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [regeneratingUsername, setRegeneratingUsername] = useState(false);

  const avatarOptions = [
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=200&h=200&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=200&h=200&fit=crop&crop=face'
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
      setNewUsername(data.username || '');
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
      setEditMode(false);
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

      setNewUsername(data);
      toast({
        title: "New username generated!",
        description: "Click save to keep this username"
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

  const handleSaveUsername = () => {
    if (newUsername.trim()) {
      updateProfile({ username: newUsername.trim() });
    }
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    updateProfile({ avatar_url: avatarUrl });
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="flex justify-center p-8">Profile not found</div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
          Customize your username and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Username Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="username" className="text-lg font-medium">Username</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          
          {editMode ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  id="username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Enter username"
                />
                <Button
                  variant="outline"
                  onClick={generateNewUsername}
                  disabled={regeneratingUsername}
                >
                  <RefreshCw className={`h-4 w-4 ${regeneratingUsername ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveUsername} disabled={updating}>
                  {updating ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-xl font-semibold">{profile.username}</div>
          )}
        </div>

        {/* Avatar Section */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">Profile Picture</Label>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url || ''} />
              <AvatarFallback>{profile.username?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Current Picture</div>
              <div className="text-sm text-muted-foreground">
                Click on any picture below to change
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            {avatarOptions.map((avatarUrl, index) => (
              <button
                key={index}
                onClick={() => handleAvatarSelect(avatarUrl)}
                disabled={updating}
                className={`relative rounded-full overflow-hidden border-2 transition-all hover:scale-105 ${
                  profile.avatar_url === avatarUrl 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-gray-200 hover:border-primary/50'
                }`}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;
