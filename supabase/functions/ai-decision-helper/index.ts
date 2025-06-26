
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

const getCharacterPersonality = (character: string) => {
  switch (character) {
    case 'wise-owl':
      return `You are the Wise Owl. Be concise, mystical, and wise. Always end with "Hoot!" Keep responses under 100 words total.`;
    
    case 'sassy-cat':
      return `You are Sassy Cat. Be direct, dramatic, and confident with attitude. Always include dramatic flair. Keep responses under 100 words total.`;
    
    case 'lazy-panda':
      return `You are Lazy Panda. Focus on simple, low-stress solutions and comfort. Keep responses under 100 words total.`;
    
    case 'sneaky-snake':
      return `You are Sneaky Snake. Be strategic and cunning, revealing hidden angles. Keep responses under 100 words total.`;
    
    case 'people-pleaser-pup':
      return `You are People-Pleaser Pup. Be enthusiastic, supportive, and collaborative. Keep responses under 100 words total.`;
    
    default:
      return `You are a wise advisor. Be concise and helpful. Keep responses under 100 words total.`;
  }
};

const getSystemPrompt = (questionType: string, character: string) => {
  const basePersonality = getCharacterPersonality(character);

  switch (questionType) {
    case 'binary':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "One penetrating question (max 50 words)",
  "reasonsForYes": ["2 reasons for YES (max 25 words each)"],
  "reasonsForNo": ["2 reasons for NO (max 25 words each)"],
  "calculatedRisk": "Brief risk assessment (max 30 words)",
  "personalityRecommendation": "Your final recommendation with signature (max 30 words)"
}`;

    case 'advice':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "advice",
  "mainAdvice": "Primary guidance (max 40 words)",
  "steps": ["3 practical steps (max 20 words each)"],
  "considerations": ["2 important considerations (max 20 words each)"],
  "personalityWisdom": "Final wisdom with signature (max 30 words)"
}`;

    case 'recommendation':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "recommendation",
  "topRecommendation": "Primary recommendation (max 40 words)",
  "alternatives": ["2 alternatives (max 20 words each)"],
  "reasoning": "Brief explanation (max 30 words)",
  "personalityNote": "Final note with signature (max 30 words)"
}`;

    case 'analysis':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "analysis",
  "keyInsights": ["3 main insights (max 20 words each)"],
  "perspectives": ["2 different viewpoints (max 20 words each)"],
  "conclusion": "Overall analysis (max 30 words)",
  "personalityReflection": "Final reflection with signature (max 30 words)"
}`;

    case 'choice':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "choice",
  "recommendedChoice": "Top choice (max 30 words)",
  "choiceAnalysis": [{"option": "Option name", "pros": ["1 pro (max 20 words)"], "cons": ["1 con (max 20 words)"]}],
  "finalThought": "Final wisdom with signature (max 30 words)"
}`;

    default:
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "Thought-provoking question (max 50 words)",
  "reasonsForYes": ["Positive aspects (max 25 words)"],
  "reasonsForNo": ["Potential challenges (max 25 words)"],
  "calculatedRisk": "General wisdom (max 30 words)",
  "personalityRecommendation": "General wisdom with signature (max 30 words)"
}`;
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, character } = await req.json();
    
    console.log('Processing request:', { question, character });

    if (!question || !character) {
      throw new Error('Missing required parameters');
    }

    if (!openAIApiKey) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key not configured');
    }

    // Detect question type
    const questionType = analyzeQuestion(question);
    console.log('Question type:', questionType);

    const systemPrompt = getSystemPrompt(questionType, character);

    console.log('Calling OpenAI API...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using the faster model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.7,
        max_tokens: 300, // Reduced from 600 to 300 for faster responses
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      throw new Error('Invalid response from OpenAI');
    }

    let aiResponse;
    const messageContent = data.choices[0].message.content;

    try {
      aiResponse = JSON.parse(messageContent);
      console.log('AI response parsed successfully');
      
      if (!aiResponse.responseType) {
        throw new Error('Missing responseType in AI response');
      }
      
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      
      // Quick fallback response
      const characterSignature = character === 'wise-owl' ? 'Hoot!' : 
                                character === 'sassy-cat' ? 'Meow, darling!' :
                                character === 'lazy-panda' ? 'Keep it chill!' :
                                character === 'sneaky-snake' ? 'Trust me...' :
                                character === 'people-pleaser-pup' ? 'Woof!' : 'Trust yourself!';
      
      aiResponse = {
        responseType: 'binary',
        deeperQuestion: "What choice aligns with your values?",
        reasonsForYes: ["Follow your instincts", "Take decisive action"],
        reasonsForNo: ["Consider all options", "Wait for clarity"],
        calculatedRisk: "Every decision teaches you something valuable",
        personalityRecommendation: `Trust your judgment. ${characterSignature}`
      };
    }

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Function error:', error);
    
    // Fast fallback response
    const fallbackResponse = {
      responseType: 'binary',
      deeperQuestion: "What feels right in your heart?",
      reasonsForYes: ["Trust your instincts"],
      reasonsForNo: ["Consider alternatives"], 
      calculatedRisk: "Growth comes from thoughtful choices",
      personalityRecommendation: "Choose what serves your highest good."
    };

    return new Response(JSON.stringify(fallbackResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
