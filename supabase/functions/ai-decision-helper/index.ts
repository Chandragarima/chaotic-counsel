
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

    // Updated system prompt for decision-focused responses
    const systemPrompt = `You are the Wise Owl, an ancient and mystical advisor who helps people make ACTUAL DECISIONS by presenting balanced analysis and calculated risk assessment.

Your goal is to help humans move from analysis paralysis to clear decision-making through structured reasoning.

You MUST respond with valid JSON in this EXACT format:
{
  "deeperQuestion": "A penetrating question that gets to the heart of their decision (helps them clarify what really matters)",
  "reasonsForYes": ["2-3 compelling reasons why they should say YES to this decision"],
  "reasonsForNo": ["2-3 strong reasons why they should say NO to this decision"],
  "calculatedRisk": "Brief assessment of the risk level (Low/Medium/High) with one key factor",
  "personalityRecommendation": "Your final owl wisdom with a clear lean toward YES or NO (max 40 words, include 'Hoot!' and be decisive)"
}

Decision-Making Guidelines:
- Be analytical but DECISIVE - give a clear recommendation
- Consider 2025 context and current trends when relevant
- For financial decisions: factor in current economic conditions (high interest rates, inflation concerns)
- Present balanced pros/cons but still lean toward a recommendation
- Keep risk assessment realistic and practical
- End with confident guidance, not wishy-washy advice

Example personalities for final recommendation:
- "Hoot! The winds favor action - take the leap, but with a safety net."
- "Wise owls know when to wait - hold off until conditions improve."
- "Trust your instincts and move forward - the timing is right!"

Remember: Help them DECIDE, not just think more. Be the wise counselor who provides clear direction.`;

    console.log('Making OpenAI API call with enhanced prompt...');

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
        max_tokens: 500,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received, parsing...');

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
      
      // Validate response structure
      if (!aiResponse.deeperQuestion || !aiResponse.reasonsForYes || !aiResponse.reasonsForNo || !aiResponse.calculatedRisk || !aiResponse.personalityRecommendation) {
        console.error('Incomplete AI response structure:', aiResponse);
        throw new Error('AI response missing required fields');
      }
      
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Raw content that failed to parse:', messageContent);
      
      // Enhanced fallback response
      aiResponse = {
        deeperQuestion: "What outcome would you regret NOT pursuing in 5 years?",
        reasonsForYes: ["Acting now prevents future regret", "Opportunities rarely come twice"],
        reasonsForNo: ["Rushing decisions can lead to mistakes", "More information might become available"],
        calculatedRisk: "Medium - Most life decisions carry uncertainty, but inaction is also a choice",
        personalityRecommendation: "Hoot! The wise owl says: trust your instincts and take measured action rather than endless deliberation."
      };
    }

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-decision-helper:', error);
    
    // Enhanced fallback with decision structure
    const fallbackResponse = {
      deeperQuestion: "What would your future self thank you for choosing today?",
      reasonsForYes: ["Taking action creates momentum", "You gain experience regardless of outcome"],
      reasonsForNo: ["Waiting allows for better preparation", "Current timing might not be optimal"],
      calculatedRisk: "Medium - Every decision involves uncertainty, but staying informed helps",
      personalityRecommendation: "Hoot! When the path is unclear, the wise owl chooses growth over comfort."
    };

    return new Response(JSON.stringify(fallbackResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
