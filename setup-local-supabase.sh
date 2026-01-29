#!/bin/bash

# Setup script for local Supabase development
# This sets up the Edge Function and environment for local development

echo "🔧 Setting up local Supabase development environment..."

# Check if Supabase is running
if ! supabase status > /dev/null 2>&1; then
    echo "❌ Supabase is not running. Please start it with: supabase start"
    exit 1
fi

echo "✅ Supabase is running locally"

# Get the OpenAI API key from .env.local if it exists
if [ -f .env.local ]; then
    OPENAI_KEY=$(grep "OPENAI_API_KEY" .env.local | cut -d '=' -f2 | tr -d '"' | tr -d "'" | xargs)
    if [ -n "$OPENAI_KEY" ]; then
        echo "📝 Found OpenAI API key in .env.local"
        # Set it as an environment variable for the local function
        export OPENAI_API_KEY="$OPENAI_KEY"
        echo "✅ OPENAI_API_KEY environment variable set for local development"
    else
        echo "⚠️  OPENAI_API_KEY not found in .env.local"
        echo "   Please add it: OPENAI_API_KEY=your_key_here"
    fi
else
    echo "⚠️  .env.local not found"
    echo "   Please create it with: OPENAI_API_KEY=your_key_here"
fi

echo ""
echo "🚀 To run the Edge Function locally, use:"
echo "   OPENAI_API_KEY=your_key supabase functions serve ai-decision-helper --no-verify-jwt"
echo ""
echo "   Or set it in your .env.local and source it:"
echo "   export \$(cat .env.local | xargs) && supabase functions serve ai-decision-helper --no-verify-jwt"
echo ""
echo "📝 Your app is configured to use local Supabase at: http://127.0.0.1:54321"
echo "   Make sure your .env.local has VITE_SUPABASE_URL=http://127.0.0.1:54321 (optional)"
