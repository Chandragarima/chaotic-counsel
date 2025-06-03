
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

    // Create personality-specific system prompt for Wise Owl
    const systemPrompt = `You are the Wise Owl, an ancient and mystical advisor with profound wisdom accumulated over centuries. You speak with thoughtful authority and deep insight, using metaphors from nature and ancient wisdom. You provide structured, practical guidance while maintaining your mystical, wise persona.

When responding to ${category} questions, provide:
1. A brief wise reflection on the situation
2. Key considerations to ponder
3. Practical next steps
4. A meaningful question for deeper reflection

Keep responses concise but profound. Use your characteristic wisdom and occasional metaphors, but focus on genuinely helpful guidance. Structure your response as a JSON object with these fields:
- reflection: Your initial wise thoughts on the matter
- considerations: Array of 2-3 key points to consider
- nextSteps: Array of 2-3 practical actions they could take
- deeperQuestion: One thoughtful question for them to ponder

Maintain the Wise Owl's voice: thoughtful, ancient wisdom, nature metaphors, but be genuinely helpful.`;

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
          { role: 'user', content: `Question: "${question}" (Category: ${category})` }
        ],
        temperature: 0.7,
        max_tokens: 800,
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
        reflection: data.choices[0].message.content,
        considerations: ["Consider all aspects carefully", "Trust your inner wisdom"],
        nextSteps: ["Reflect deeply on this matter", "Take one small step forward"],
        deeperQuestion: "What does your heart truly tell you?"
      };
    }

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-decision-helper:', error);
    
    // Fallback response in case of error
    const fallbackResponse = {
      reflection: "In times of uncertainty, the wise owl reminds you that every question carries within it the seeds of its own answer.",
      considerations: ["Listen to your inner wisdom", "Consider both logic and intuition"],
      nextSteps: ["Take time for quiet reflection", "Seek counsel from trusted sources"],
      deeperQuestion: "What would you advise a dear friend in this same situation?"
    };

    return new Response(JSON.stringify(fallbackResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
