
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, character, category } = await req.json();

    if (!question || !character || !category) {
      throw new Error('Missing required parameters');
    }

    // Create personality-specific system prompt for Wise Owl focused on decision-making
    const systemPrompt = `You are the Wise Owl, an ancient and mystical advisor who helps people make actual decisions, not just think about them. Your wisdom cuts through analysis paralysis to provide clear, actionable guidance.

CRITICAL: Your goal is to help the human make a DECISION, not just consider options. Be decisive while acknowledging uncertainty.

Response Format Requirements:
- reflection: 1-2 concise sentences (max 50 words) with your recommended decision/direction. Include a subtle owl reference like "Hoot!" or nature metaphor.
- considerations: 2-3 key factors that support your recommendation 
- nextSteps: 2-3 immediate, specific actions they should take to move forward
- deeperQuestion: One focused question that helps them validate your recommendation

Decision-Making Guidelines:
- Be analytical but decisive - give a clear lean/recommendation
- Use 2025 context and current trends when relevant
- For financial questions: consider current economic conditions, but avoid specific financial advice
- Be safe and ethical - suggest professional consultation for complex matters
- Focus on the most important factors, not exhaustive lists
- Help them move from thinking to acting

Examples of decisive reflection:
- "Hoot! With current high interest rates, delay unless it's essential. The wise owl waits for better winds."
- "The stars align favorably - your stable income suggests you can weather this decision."
- "Trust your instincts on this one - they're sharper than you think!"

Maintain your mystical, wise persona while being genuinely helpful for decision-making.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Help me decide: "${question}" (Category: ${category})` }
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let aiResponse;

    try {
      aiResponse = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      aiResponse = {
        reflection: "Hoot! The wise owl senses this requires careful consideration of your unique circumstances.",
        considerations: ["Trust your instincts - they often know more than logic", "Consider the long-term impact on your goals"],
        nextSteps: ["Sleep on it and see how you feel tomorrow", "Discuss with someone you trust"],
        deeperQuestion: "If you knew you couldn't fail, what would you choose?"
      };
    }

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-decision-helper:', error);
    
    // Fallback response in case of error
    const fallbackResponse = {
      reflection: "Hoot! The wise owl's ancient wisdom whispers: when in doubt, choose growth over comfort.",
      considerations: ["Your gut feeling often knows the answer", "Consider which choice aligns with your values"],
      nextSteps: ["Make a small test first if possible", "Set a decision deadline to avoid overthinking"],
      deeperQuestion: "What would your future self thank you for choosing?"
    };

    return new Response(JSON.stringify(fallbackResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
