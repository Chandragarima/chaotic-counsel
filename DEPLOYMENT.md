# Edge Function Deployment Guide

## Prerequisites

1. **Supabase CLI installed** ✅ (Already installed at `/opt/homebrew/bin/supabase`)
2. **Supabase account** with access to project `dtkpjnpqcceguhaicabi`
3. **OpenAI API Key** for the Edge Function

## Step-by-Step Deployment

### 1. Login to Supabase CLI

Run this command in your terminal (it will open a browser for authentication):

```bash
npm run supabase:login
```

Or directly:
```bash
supabase login
```

### 2. Link Your Project

Link your local project to the remote Supabase project:

```bash
npm run supabase:link
```

Or directly:
```bash
supabase link --project-ref dtkpjnpqcceguhaicabi
```

### 3. Set OpenAI API Key Secret

Set the OpenAI API key as a secret in Supabase:

```bash
npm run supabase:secrets:set
```

When prompted, enter your OpenAI API key.

Or directly:
```bash
supabase secrets set OPENAI_API_KEY
```

**Alternative: Set via Supabase Dashboard**
1. Go to https://supabase.com/dashboard/project/dtkpjnpqcceguhaicabi
2. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
3. Add a new secret:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key

### 4. Deploy the Edge Function

Deploy the `ai-decision-helper` function:

```bash
npm run supabase:deploy:function
```

Or directly:
```bash
supabase functions deploy ai-decision-helper
```

### 5. Verify Deployment

After deployment, you should see a success message. You can also verify in the Supabase Dashboard:
1. Go to https://supabase.com/dashboard/project/dtkpjnpqcceguhaicabi
2. Navigate to **Edge Functions**
3. You should see `ai-decision-helper` listed

## Troubleshooting

### Error: "Access token not provided"
- Run `supabase login` first
- Make sure you're authenticated

### Error: "Project not linked"
- Run `supabase link --project-ref dtkpjnpqcceguhaicabi`
- Make sure you have access to the project

### Error: "Function deployment failed"
- Check that the function file exists at `supabase/functions/ai-decision-helper/index.ts`
- Verify your Supabase CLI is up to date: `supabase update`
- Check the error message for specific issues

### Error: "OPENAI_API_KEY not configured"
- Make sure you've set the secret: `supabase secrets set OPENAI_API_KEY`
- Verify the secret is set: Check in Supabase Dashboard → Edge Functions → Secrets

## Testing the Deployment

After deployment, test the function:

1. Open your app in the browser
2. Open the browser console (F12)
3. Try asking a question in "serious mode"
4. Check the console logs for any errors
5. The function should now work correctly

## Quick Deploy Command

Once everything is set up, you can deploy with:

```bash
npm run supabase:deploy:function
```
