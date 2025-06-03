
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
    
    console.log('Received request:', { question, character, category });

    if (!question || !character || !category) {
      throw new Error('Missing required parameters');
    }

    if (!openAIApiKey) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key not configured');
    }

    // Create personality-specific system prompt for Wise Owl focused on decision-making
    const systemPrompt = `You are the Wise Owl, an ancient and mystical advisor who helps people make actual decisions, not just think about them. Your wisdom cuts through analysis paralysis to provide clear, actionable guidance.

CRITICAL: Your goal is to help the human make a DECISION, not just consider options. Be decisive while acknowledging uncertainty.

You must respond with valid JSON in this exact format:
{
  "reflection": "1-2 concise sentences with your recommended decision/direction (max 50 words). Include a subtle owl reference like 'Hoot!' or nature metaphor.",
  "considerations": ["2-3 key factors that support your recommendation"],
  "nextSteps": ["2-3 immediate, specific actions they should take to move forward"],
  "deeperQuestion": "One focused question that helps them validate your recommendation"
}

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

    console.log('Making OpenAI API call...');

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

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response data:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response from OpenAI');
    }

    let aiResponse;
    const messageContent = data.choices[0].message.content;
    console.log('Raw message content:', messageContent);

    try {
      aiResponse = JSON.parse(messageContent);
      console.log('Successfully parsed AI response:', aiResponse);
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Raw content that failed to parse:', messageContent);
      
      // Fallback response with more specific error info
      aiResponse = {
        reflection: "Hoot! The wise owl's ancient wisdom whispers: when in doubt, choose growth over comfort.",
        considerations: ["Your gut feeling often knows the answer", "Consider which choice aligns with your values"],
        nextSteps: ["Make a small test first if possible", "Set a decision deadline to avoid overthinking"],
        deeperQuestion: "What would your future self thank you for choosing?"
      };
    }

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-decision-helper:', error);
    
    // Enhanced fallback response with error details
    const fallbackResponse = {
      reflection: "Hoot! Technical difficulties cloud the owl's vision, but wisdom prevails: trust your instincts.",
      considerations: ["Your inner wisdom often knows the right path", "Consider the long-term consequences"],
      nextSteps: ["Take time for quiet reflection", "Seek advice from trusted sources"],
      deeperQuestion: "If you could only choose based on your values, what would you pick?"
    };

    return new Response(JSON.stringify(fallbackResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
