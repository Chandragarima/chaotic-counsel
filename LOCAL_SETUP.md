# Local Supabase Setup Guide

Since your Supabase project is paused (>90 days), you can use **local Supabase** for development.

## ✅ What's Already Configured

1. **App automatically uses local Supabase in development mode**
   - When running `npm run dev`, the app will use `http://127.0.0.1:54321`
   - No need to change environment variables

2. **Local Supabase is running**
   - Your local instance is active at `http://127.0.0.1:54321`

## 🚀 Quick Start

### Step 1: Make sure local Supabase is running

```bash
supabase status
```

If not running, start it:
```bash
supabase start
```

### Step 2: Serve the Edge Function locally

The Edge Function needs to be running to handle serious mode requests. Run this in a **separate terminal**:

```bash
# Option 1: If you have OPENAI_API_KEY in .env.local
export $(cat .env.local | grep OPENAI_API_KEY | xargs) && npm run supabase:serve:function

# Option 2: Set it directly
OPENAI_API_KEY=your_key_here npm run supabase:serve:function

# Option 3: Use the setup script
npm run supabase:setup:local
```

### Step 3: Start your app

In your main terminal:

```bash
npm run dev
```

The app will automatically connect to local Supabase at `http://127.0.0.1:54321`.

## 📝 Environment Variables

Your `.env.local` should have:

```env
OPENAI_API_KEY=sk-your-openai-key-here
# Optional: Explicitly set local Supabase (auto-detected in dev mode)
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicmVmIjoiZGVtbyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQxNzY5MjAwLCJleHAiOjE5OTczNDU2MDB9.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE
```

## 🧪 Testing

1. Open your app: `http://localhost:8080`
2. Open browser console (F12)
3. Try asking a question in **serious mode**
4. Check console logs - you should see:
   - `🔧 Supabase Client Configuration: URL: http://127.0.0.1:54321`
   - `🤖 Calling AI decision helper...`
   - `📥 AI response received...`

## ⚠️ Important Notes

- **Keep the Edge Function server running** in a separate terminal while developing
- The function server must have access to `OPENAI_API_KEY` environment variable
- Local Supabase uses a different database than production (it's isolated)
- For production, you'll need to create a new Supabase project

## 🔄 For Production

When ready for production:

1. Create a new Supabase project at https://supabase.com
2. Run migrations: `supabase db push`
3. Deploy the function: `supabase functions deploy ai-decision-helper`
4. Set secrets: `supabase secrets set OPENAI_API_KEY`
5. Update your production environment variables

## 🐛 Troubleshooting

### Function not responding?
- Make sure the function server is running in a separate terminal
- Check that `OPENAI_API_KEY` is set in the terminal running the function
- Verify the function is accessible: `curl http://127.0.0.1:54321/functions/v1/ai-decision-helper`

### App can't connect to local Supabase?
- Check `supabase status` - make sure it's running
- Verify the app is using local URL (check browser console logs)
- Try explicitly setting `VITE_SUPABASE_URL=http://127.0.0.1:54321` in `.env.local`

### OpenAI API errors?
- Verify your API key is correct
- Check the function server terminal for error messages
- Make sure the key has credits/quota available
