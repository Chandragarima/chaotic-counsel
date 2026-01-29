/**
 * Feature Flags Configuration
 * 
 * Set these flags to enable/disable features that depend on Supabase.
 * When Supabase is unavailable, set SUPABASE_ENABLED to false.
 * 
 * To re-enable Supabase features in the future, simply change SUPABASE_ENABLED to true.
 */

export const FEATURE_FLAGS = {
  // Master flag: Set to false to disable all Supabase-dependent features
  SUPABASE_ENABLED: false,
  
  // Individual feature flags (automatically disabled when SUPABASE_ENABLED is false)
  AUTHENTICATION: true,  // User login/signup
  STREAK_TRACKING: true, // Daily streak and character unlocks
  USER_PROGRESS: true,   // User progress tracking
  PROFILE_FEATURES: true, // User profile editing
  POLL_FEATURES: true,   // Community polls
} as const;

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS): boolean => {
  if (feature === 'SUPABASE_ENABLED') {
    return FEATURE_FLAGS.SUPABASE_ENABLED;
  }
  // All other features depend on SUPABASE_ENABLED
  return FEATURE_FLAGS.SUPABASE_ENABLED && FEATURE_FLAGS[feature];
};

// Convenience exports
export const IS_SUPABASE_ENABLED = FEATURE_FLAGS.SUPABASE_ENABLED;
export const IS_AUTH_ENABLED = isFeatureEnabled('AUTHENTICATION');
export const IS_STREAK_ENABLED = isFeatureEnabled('STREAK_TRACKING');
export const IS_PROGRESS_ENABLED = isFeatureEnabled('USER_PROGRESS');
export const IS_PROFILE_ENABLED = isFeatureEnabled('PROFILE_FEATURES');
export const IS_POLL_ENABLED = isFeatureEnabled('POLL_FEATURES');
