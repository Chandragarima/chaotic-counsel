# Supabase Features Disabled

## Overview

All Supabase-dependent features have been deactivated while keeping the code structure intact for future re-enabling. The app now works completely offline with all characters unlocked.

## Feature Flag Configuration

**Location:** `src/config/features.ts`

The master flag `SUPABASE_ENABLED` is set to `false`, which automatically disables:
- Authentication
- Streak tracking
- User progress tracking
- Profile features
- Poll features

### To Re-enable Supabase Features

Simply change `SUPABASE_ENABLED` to `true` in `src/config/features.ts`:

```typescript
export const FEATURE_FLAGS = {
  SUPABASE_ENABLED: true,  // Change this to true
  // ... rest of flags
};
```

## What Was Changed

### 1. **Feature Flag System** (`src/config/features.ts`)
   - Created centralized feature flag configuration
   - Easy toggle to enable/disable Supabase features

### 2. **Progress Hook** (`src/hooks/useSupabaseProgress.ts`)
   - Skips all Supabase database calls when disabled
   - Returns all characters unlocked by default
   - Uses local-only progress tracking

### 3. **Authentication Context** (`src/contexts/AuthContext.tsx`)
   - Skips Supabase auth initialization when disabled
   - Returns no user (anonymous mode)

### 4. **UI Components - Hidden Elements**

   **CombinedHomePage** (`src/components/CombinedHomePage.tsx`)
   - Hides unlock celebration popup
   - Hides character lock overlays
   - All characters appear unlocked

   **UserMenu** (`src/components/UserMenu.tsx`)
   - Completely hidden when auth is disabled
   - Hides streak display when streak tracking is disabled

   **StreakDisplay** (`src/components/StreakDisplay.tsx`)
   - Returns null when streak tracking is disabled

   **ActionButtons** (`src/components/answer/ActionButtons.tsx`)
   - Hides "Ask the Community" poll button when poll features are disabled

   **CreatePollModal** (`src/components/polls/CreatePollModal.tsx`)
   - Returns null when poll features are disabled

   **ProfileEditor** (`src/components/profile/ProfileEditor.tsx`)
   - Skips all Supabase calls when profile features are disabled

### 5. **Routes** (`src/App.tsx`)
   - `/auth` route hidden when auth is disabled
   - `/profile` route hidden when auth/profile features are disabled
   - `/poll/:pollId` route hidden when poll features are disabled

### 6. **Auth Page** (`src/pages/Auth.tsx`)
   - Redirects to home when auth is disabled
   - Skips connection tests when disabled

### 7. **Profile Page** (`src/pages/Profile.tsx`)
   - Redirects to home when auth/profile features are disabled

## Current Behavior

✅ **All characters are unlocked** - Users can access all 5 characters immediately
✅ **No authentication required** - App works completely anonymously
✅ **No Supabase calls** - All database operations are skipped
✅ **No streak tracking** - Streak UI elements are hidden
✅ **No profile features** - Profile editing is disabled
✅ **No poll features** - Community polls are disabled

## Code Structure Preserved

All Supabase-related code remains in place but is conditionally executed based on feature flags. This means:
- Easy to re-enable by changing one flag
- No code deletion - everything is preserved
- Clean separation between enabled/disabled states

## Testing

1. All characters should be accessible without login
2. No lock overlays on character cards
3. No "Sign In" button in navigation
4. No streak displays
5. No profile/poll features visible
6. App works completely offline

## Future Re-enabling

When Supabase is available again:

1. Open `src/config/features.ts`
2. Change `SUPABASE_ENABLED: false` to `SUPABASE_ENABLED: true`
3. All features will automatically re-enable
4. No other code changes needed!
