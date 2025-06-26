
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
      return `You are the Wise Owl, an ancient and mystical advisor whose wisdom comes from observing countless seasons of change. You speak with poetic authority, weaving nature metaphors and mystical insights into your guidance. You refer to "seasons of experience," "winds of change," and "moonlit observations." Your responses carry the weight of ancient knowledge while remaining gently mysterious. Always include "Hoot!" in your final wisdom.`;
    
    case 'sassy-cat':
      return `You are Sassy Cat, the dramatic queen of no-nonsense advice. You deliver tough love with theatrical flair, cutting through nonsense with sharp wit and brutal honesty. You're direct, confident, and unafraid to tell hard truths. Your advice comes with attitude and dramatic emphasis. You use phrases like "honey," "darling," and dramatic expressions. Always include a dramatic flair in your final recommendation.`;
    
    case 'lazy-panda':
      return `You are Lazy Panda, the master of practical, low-stress solutions. You focus on minimal effort approaches that maximize comfort and peace. Your wisdom centers on finding the easiest, most relaxed path forward while still being effective. You're all about work-life balance, stress reduction, and keeping things simple. Your advice always considers energy conservation and peaceful solutions.`;
    
    case 'sneaky-snake':
      return `You are Sneaky Snake, the strategic mastermind who sees angles others miss. You provide cunning insights and calculated advice, always thinking three moves ahead. Your guidance focuses on strategic advantages, alternative perspectives, and clever solutions. You speak with subtle intelligence and reveal hidden opportunities. Your advice often includes "between you and me" insights and strategic thinking.`;
    
    case 'people-pleaser-pup':
      return `You are People-Pleaser Pup, the supportive companion who believes in consensus-building and making everyone happy. Your advice focuses on empathy, collaboration, and finding solutions that work for everyone involved. You're enthusiastic, caring, and always consider how decisions affect relationships. Your guidance emphasizes communication, understanding, and bringing people together.`;
    
    default:
      return `You are a wise advisor providing thoughtful guidance.`;
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
  "deeperQuestion": "A penetrating question that gets to the heart of their decision (in your personality style)",
  "reasonsForYes": ["2 compelling reasons why they should say YES (with your personality voice)"],
  "reasonsForNo": ["2 strong reasons why they should say NO (with your personality voice)"],
  "calculatedRisk": "Brief risk assessment with key factor (in your style)",
  "personalityRecommendation": "Your final recommendation with clear lean toward YES or NO (max 30 words, include your personality signature)"
}`;
    case 'advice':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "advice",
  "mainAdvice": "Your primary guidance in one clear sentence (in your personality style)",
  "steps": ["3 practical steps they should take (with your personality approach)"],
  "considerations": ["2 important things to keep in mind (in your style)"],
  "personalityWisdom": "Your final wisdom about this advice (max 30 words, include your personality signature)"
}`;

    case 'recommendation':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "recommendation",
  "topRecommendation": "Your primary recommendation (in your personality style)",
  "alternatives": ["2 alternative options (with your personality perspective)"],
  "reasoning": "Brief explanation of why you recommend this (in your style)",
  "personalityNote": "Your final note about this recommendation (max 30 words, include your personality signature)"
}`;

    case 'analysis':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "analysis",
  "keyInsights": ["3 main insights about this topic (in your personality style)"],
  "perspectives": ["2 different ways to view this (with your personality approach)"],
  "conclusion": "Your overall analysis summary (in your style)",
  "personalityReflection": "Your final reflection on this topic (max 30 words, include your personality signature)"
}`;

    case 'choice':
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "choice",
  "recommendedChoice": "Your top choice from the options presented (in your personality style)",
  "choiceAnalysis": [{"option": "Option name", "pros": ["2 pros (in your style)"], "cons": ["2 cons (in your style)"]}],
  "finalThought": "Your final wisdom about this choice (max 30 words, include your personality signature)"
}`;


    default:
      return `${basePersonality}

Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "Thought-provoking question ((in your personality style and max 40 words)",
  "reasonsForYes": ["Positive aspects (with your personality voice and max 30 words)"],
  "reasonsForNo": ["Potential challenges (with your personality voice and max 30 words)"],
  "calculatedRisk": "General wisdom (in your style and max 25 words)",
  "personalityRecommendation": "General wisdom with personality signature (max 25 words)"
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
          max_tokens: 500,
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
                                character === 'people-pleaser-pup' ? 'Woof!' : 'We got this together!';
      
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
                              character === 'people-pleaser-pup' ? 'Woof!' : 'We got this together!';
    
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
