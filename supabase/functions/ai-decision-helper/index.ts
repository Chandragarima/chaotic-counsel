
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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
      return `You are the Wise Owl. Be concise, mystical, and wise. Always end with "Hoot!" Keep responses under 80 words total.`;
    
    case 'sassy-cat':
      return `You are Sassy Cat. Be direct, dramatic, and confident with attitude. Always include dramatic flair. Keep responses under 80 words total.`;
    
    case 'lazy-panda':
      return `You are Lazy Panda. Focus on simple, low-stress solutions and comfort. Keep responses under 80 words total.`;
    
    case 'sneaky-snake':
      return `You are Sneaky Snake. Be strategic and cunning, revealing hidden angles. Keep responses under 80 words total.`;
    
    case 'people-pleaser-pup':
      return `You are People-Pleaser Pup. Be enthusiastic, supportive, and collaborative. Keep responses under 80 words total.`;
    
    default:
      return `You are a wise advisor. Be concise and helpful. Keep responses under 80 words total.`;
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
  "deeperQuestion": "One penetrating question (max 40 words)",
  "reasonsForYes": ["2 reasons for YES (max 20 words each)"],
  "reasonsForNo": ["2 reasons for NO (max 20 words each)"],
  "calculatedRisk": "Brief risk assessment (max 25 words)",
  "personalityRecommendation": "Your final recommendation with signature (max 25 words)"
}`;

    case 'advice':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "advice",
  "mainAdvice": "Primary guidance (max 30 words)",
  "steps": ["3 practical steps (max 15 words each)"],
  "considerations": ["2 important considerations (max 15 words each)"],
  "personalityWisdom": "Final wisdom with signature (max 25 words)"
}`;

    case 'recommendation':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "recommendation",
  "topRecommendation": "Primary recommendation (max 30 words)",
  "alternatives": ["2 alternatives (max 15 words each)"],
  "reasoning": "Brief explanation (max 25 words)",
  "personalityNote": "Final note with signature (max 25 words)"
}`;

    case 'analysis':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "analysis",
  "keyInsights": ["3 main insights (max 15 words each)"],
  "perspectives": ["2 different viewpoints (max 15 words each)"],
  "conclusion": "Overall analysis (max 25 words)",
  "personalityReflection": "Final reflection with signature (max 25 words)"
}`;

    case 'choice':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "choice",
  "recommendedChoice": "Top choice (max 25 words)",
  "choiceAnalysis": [{"option": "Option name", "pros": ["1 pro (max 15 words)"], "cons": ["1 con (max 15 words)"]}],
  "finalThought": "Final wisdom with signature (max 25 words)"
}`;

    default:
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "Thought-provoking question (max 40 words)",
  "reasonsForYes": ["Positive aspects (max 20 words)"],
  "reasonsForNo": ["Potential challenges (max 20 words)"],
  "calculatedRisk": "General wisdom (max 25 words)",
  "personalityRecommendation": "General wisdom with signature (max 25 words)"
}`;
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200 
    });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Parse request body with error handling
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error('Request body parsing error:', parseError);
      return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const { question, character } = requestBody;
    
    console.log('Processing request:', { question, character });

    // Validate required parameters
    if (!question || !character) {
      console.error('Missing required parameters:', { question: !!question, character: !!character });
      return new Response(JSON.stringify({ error: 'Missing required parameters: question and character' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate OpenAI API key
    if (!openAIApiKey) {
      console.error('OpenAI API key is missing');
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Detect question type
    const questionType = analyzeQuestion(question);
    console.log('Question type:', questionType);

    const systemPrompt = getSystemPrompt(questionType, character);

    console.log('Calling OpenAI API...');

    // Call OpenAI API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    let response;
    try {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
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
          max_tokens: 250,
        }),
        signal: controller.signal,
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('OpenAI API fetch error:', fetchError);
      
      if (fetchError.name === 'AbortError') {
        throw new Error('OpenAI API request timeout');
      }
      throw new Error(`OpenAI API connection failed: ${fetchError.message}`);
    }

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
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
      console.error('Raw AI response:', messageContent);
      
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
      status: 200
    });

  } catch (error) {
    console.error('Function error:', error);
    
    // Enhanced fallback response based on character
    const characterSignature = character === 'wise-owl' ? 'Hoot!' : 
                              character === 'sassy-cat' ? 'Meow, darling!' :
                              character === 'lazy-panda' ? 'Keep it chill!' :
                              character === 'sneaky-snake' ? 'Trust me...' :
                              character === 'people-pleaser-pup' ? 'Woof!' : 'Trust yourself!';
    
    const fallbackResponse = {
      responseType: 'binary',
      deeperQuestion: "What feels right in your heart?",
      reasonsForYes: ["Trust your instincts"],
      reasonsForNo: ["Consider alternatives"], 
      calculatedRisk: "Growth comes from thoughtful choices",
      personalityRecommendation: `Choose what serves your highest good. ${characterSignature}`
    };

    return new Response(JSON.stringify(fallbackResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }
});
