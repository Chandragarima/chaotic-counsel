import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Question type detection function
const analyzeQuestion = (question: string) => {
  const lowerQuestion = question.toLowerCase().trim();
  
  const binaryPatterns = [
    /^should i\b/, /^can i\b/, /^will i\b/, /^do i\b/,
    /^is it (time|worth|good|bad|wise|smart|safe)\b/, /^am i\b/
  ];
  
  const advicePatterns = [
    /^how (do|can|should) i\b/, /^what('s| is) the best way to\b/,
    /^how to\b/, /^what steps\b/, /^what should i do to\b/
  ];
  
  const recommendationPatterns = [
    /^what should i\b/, /^which (one|option|choice)\b/,
    /^what (would you|do you) recommend\b/, /^what('s| is) (better|best)\b/
  ];
  
  const analysisPatterns = [
    /^why\b/, /^what does\b/, /^explain\b/, /^tell me about\b/,
    /^what are the (pros|cons|benefits|risks)\b/
  ];
  
  const choicePatterns = [/\s+or\s+/, /\bversus\b/, /\bvs\b/];
  
  if (binaryPatterns.some(pattern => pattern.test(lowerQuestion))) return 'binary';
  if (advicePatterns.some(pattern => pattern.test(lowerQuestion))) return 'advice';
  if (recommendationPatterns.some(pattern => pattern.test(lowerQuestion))) return 'recommendation';
  if (choicePatterns.some(pattern => pattern.test(lowerQuestion))) return 'choice';
  if (analysisPatterns.some(pattern => pattern.test(lowerQuestion))) return 'analysis';
  
  return 'general';
};

const getSystemPrompt = (questionType: string, character: string) => {
  const basePersonality = `You are the Wise Owl, an ancient and mystical advisor. Your wisdom comes from observing countless seasons of change. You speak with gentle authority, using "Hoot!" in your responses, and offer guidance that balances practical wisdom with deeper insights.`;

  switch (questionType) {
    case 'binary':
      return `${basePersonality}

You help people make YES/NO decisions by providing balanced analysis. Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "A penetrating question that gets to the heart of their decision",
  "reasonsForYes": ["2-3 compelling reasons why they should say YES"],
  "reasonsForNo": ["2-3 strong reasons why they should say NO"],
  "calculatedRisk": "Brief risk assessment with key factor",
  "personalityRecommendation": "Your final owl wisdom with clear lean toward YES or NO (max 30 words, include 'Hoot!')"
}`;

    case 'advice':
      return `${basePersonality}

You provide step-by-step guidance for "how-to" questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "advice",
  "mainAdvice": "Your primary guidance in one clear sentence",
  "steps": ["3-4 practical steps they should take"],
  "considerations": ["2-3 important things to keep in mind"],
  "personalityWisdom": "Your final owl wisdom about this advice (max 30 words, include 'Hoot!')"
}`;

    case 'recommendation':
      return `${basePersonality}

You provide specific recommendations for "what should I" questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "recommendation",
  "topRecommendation": "Your primary recommendation",
  "alternatives": ["2-3 alternative options"],
  "reasoning": "Brief explanation of why you recommend this",
  "personalityNote": "Your final owl wisdom about this recommendation (max 30 words, include 'Hoot!')"
}`;

    case 'analysis':
      return `${basePersonality}

You provide insights and analysis for "why" and explanatory questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "analysis",
  "keyInsights": ["3-4 main insights about this topic"],
  "perspectives": ["2-3 different ways to view this"],
  "conclusion": "Your overall analysis summary",
  "personalityReflection": "Your final owl wisdom on this topic (max 30 words, include 'Hoot!')"
}`;

    case 'choice':
      return `${basePersonality}

You help compare multiple options. Respond with valid JSON in this EXACT format:
{
  "responseType": "choice",
  "recommendedChoice": "Your top choice from the options presented",
  "choiceAnalysis": [{"option": "Option name", "pros": ["1-2 pros"], "cons": ["1-2 cons"]}],
  "finalThought": "Your final owl wisdom about this choice (max 30 words, include 'Hoot!')"
}`;

    default:
      return `${basePersonality}

For general questions, provide thoughtful guidance. Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "A thought-provoking question to help them reflect",
  "reasonsForYes": ["Consider the positive aspects"],
  "reasonsForNo": ["Consider potential challenges"],
  "calculatedRisk": "General wisdom about uncertainty",
  "personalityRecommendation": "Your general owl wisdom (max 30 words, include 'Hoot!')"
}`;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, character } = await req.json();
    
    console.log('Received request:', { question, character });

    if (!question || !character) {
      throw new Error('Missing required parameters');
    }

    if (!openAIApiKey) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key not configured');
    }

    // Detect question type
    const questionType = analyzeQuestion(question);
    console.log('Detected question type:', questionType);

    const systemPrompt = getSystemPrompt(questionType, character);

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
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 600,
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
      
      // Validate response has required responseType
      if (!aiResponse.responseType) {
        console.error('AI response missing responseType:', aiResponse);
        throw new Error('AI response missing responseType');
      }
      
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      console.error('Raw content that failed to parse:', messageContent);
      
      // Enhanced fallback response
      aiResponse = {
        responseType: 'binary',
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
      responseType: 'binary',
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
