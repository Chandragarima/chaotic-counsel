
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced question type detection function
const analyzeQuestion = (question: string) => {
  const lowerQuestion = question.toLowerCase().trim();
  
  // More flexible binary decision patterns
  const binaryPatterns = [
    /^should i\b/, /^can i\b/, /^will i\b/, /^do i\b/, /^am i\b/,
    /^is it (time|worth|good|bad|wise|smart|safe|okay|ok|right|wrong)\b/,
    /\b(yes or no|true or false)\b/,
    /^would it be (good|bad|wise|smart|better)\b/,
    /^is this (a good|the right)\b/
  ];
  
  // Enhanced advice patterns for how-to questions
  const advicePatterns = [
    /^how (do|can|should) i\b/, /^how to\b/, /^how can i\b/,
    /^what('s| is) the best way to\b/, /^what('s| is) the right way to\b/,
    /^what steps\b/, /^what should i do to\b/,
    /^how can i improve\b/, /^how do i get\b/, /^how do i make\b/,
    /^what('s| is) the process\b/, /^how would i\b/
  ];
  
  // Better recommendation patterns
  const recommendationPatterns = [
    /^what should i\b/, /^which (one|option|choice)\b/,
    /^what (would you|do you) recommend\b/, /^what('s| is) (better|best)\b/,
    /^suggest\b/, /^recommend\b/, /^what would be\b/,
    /^which would be\b/, /^what('s| is) your recommendation\b/
  ];
  
  // Enhanced analysis patterns
  const analysisPatterns = [
    /^why\b/, /^what does\b/, /^explain\b/, /^what are the\b/,
    /^tell me about\b/, /^what('s| is) the meaning\b/,
    /^help me understand\b/, /^what causes\b/, /^what makes\b/,
    /^break down\b/, /^analyze\b/
  ];
  
  // Better choice patterns for comparing options
  const choicePatterns = [
    /\s+or\s+/, /\bversus\b/, /\bvs\.?\b/, /\bv\.?\b/,
    /\bbetween\b.*\band\b/, /compare.*\band\b/, /\bchoose between\b/
  ];
  
  // Score each category based on pattern matches and context
  let scores = {
    binary: 0,
    advice: 0,
    recommendation: 0,
    choice: 0,
    analysis: 0
  };
  
  // Check binary patterns
  if (binaryPatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.binary += 3;
  }
  
  // Check advice patterns
  if (advicePatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.advice += 3;
  }
  
  // Check recommendation patterns
  if (recommendationPatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.recommendation += 3;
  }
  
  // Check choice patterns (higher priority if multiple options detected)
  if (choicePatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.choice += 4; // Higher weight for choice questions
  }
  
  // Check analysis patterns
  if (analysisPatterns.some(pattern => pattern.test(lowerQuestion))) {
    scores.analysis += 3;
  }
  
  // Additional context-based scoring
  const questionWords = lowerQuestion.split(/\s+/);
  
  // Look for question indicators
  if (questionWords.includes('better') || questionWords.includes('best')) {
    scores.recommendation += 1;
    scores.choice += 1;
  }
  
  if (questionWords.includes('why') || questionWords.includes('because')) {
    scores.analysis += 2;
  }
  
  if (questionWords.includes('how')) {
    scores.advice += 1;
  }
  
  // Find the category with the highest score
  const maxScore = Math.max(...Object.values(scores));
  
  // If no clear winner or very low scores, default to binary
  if (maxScore === 0) {
    return 'binary';
  }
  
  // Return the category with the highest score
  for (const [category, score] of Object.entries(scores)) {
    if (score === maxScore) {
      return category;
    }
  }
  
  return 'binary'; // fallback
};

const getCharacterPersonality = (character: string) => {
  switch (character) {
    case 'wise-owl':
      return `You are the Wise Owl, an ancient and mystical advisor whose wisdom comes from observing countless seasons of change. You speak with poetic authority, weaving nature metaphors and mystical insights into your guidance. You refer to "seasons of experience," "winds of change," and "moonlit observations." Your responses carry the weight of ancient knowledge while remaining gently mysterious. You MUST make clear, decisive recommendations - no vague diplomatic answers.`;
    
    case 'sassy-cat':
      return `You are Sassy Cat, the dramatic queen of no-nonsense advice. You deliver tough love with theatrical flair, cutting through nonsense with sharp wit and brutal honesty. You're direct, confident, and unafraid to tell hard truths. Your advice comes with attitude and dramatic emphasis. You use phrases like "honey," "darling," and dramatic expressions. You MUST pick a side and be decisively opinionated - no fence-sitting allowed.`;
    
    case 'lazy-panda':
      return `You are Lazy Panda, the master of practical, low-stress solutions. You focus on minimal effort approaches that maximize comfort and peace. Your wisdom centers on finding the easiest, most relaxed path forward while still being effective. You're all about work-life balance, stress reduction, and keeping things simple. You MUST choose the path of least resistance and recommend it clearly.`;
    
    case 'sneaky-snake':
      return `You are Sneaky Snake, the strategic mastermind who sees angles others miss. You provide cunning insights and calculated advice, always thinking three moves ahead. Your guidance focuses on strategic advantages, alternative perspectives, and clever solutions. You speak with subtle intelligence and reveal hidden opportunities. You MUST recommend the most strategically advantageous option with conviction.`;
    
    case 'people-pleaser-pup':
      return `You are People-Pleaser Pup, the supportive companion who believes in consensus-building and making everyone happy. Your advice focuses on empathy, collaboration, and finding solutions that work for everyone involved. You're enthusiastic, caring, and always consider how decisions affect relationships. You MUST recommend the option that brings the most harmony and connection.`;
    
    default:
      return `You are a wise advisor providing thoughtful guidance. You MUST make clear, decisive recommendations.`;
  }
};

const getSystemPrompt = (questionType: string, character: string) => {
  const basePersonality = getCharacterPersonality(character);

  switch (questionType) {
    case 'binary':
      return `${basePersonality}

You help people make YES/NO decisions by providing balanced analysis but MUST end with a clear recommendation. Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "A penetrating question that gets to the heart of their decision (in your personality style)",
  "reasonsForYes": ["2 compelling reasons why they should say YES (with your personality voice)"],
  "reasonsForNo": ["2 strong reasons why they should say NO (with your personality voice)"],
  "calculatedRisk": "Brief risk assessment with key factor (in your style)",
  "personalityRecommendation": "Your DECISIVE recommendation - either clearly YES or clearly NO with brief reasoning (max 20 words, in your personality style)"
}`;

    case 'choice':
      return `${basePersonality}

You help compare multiple options and MUST pick ONE specific winner. When users present "A or B" questions, you MUST choose either A or B definitively. Respond with valid JSON in this EXACT format:
{
  "responseType": "choice",
  "recommendedChoice": "Your CLEAR, SPECIFIC choice from the options presented - pick ONE option decisively (in your personality style)",
  "choiceAnalysis": [{"option": "Option name", "pros": ["2 pros (in your style)"], "cons": ["2 cons (in your style)"]}],
  "finalThought": "Brief explanation of WHY you chose this specific option over others (max 20 words, in your personality style)"
}

CRITICAL: You must pick ONE specific option. If the question is "spiritual growth or material success" you must choose either "spiritual growth" OR "material success" - not both, not balance. Be decisive!`;

    case 'advice':
      return `${basePersonality}

You provide step-by-step guidance for "how-to" questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "advice",
  "mainAdvice": "Your primary guidance in one clear sentence (in your personality style)",
  "steps": ["3 practical steps they should take (with your personality approach)"],
  "considerations": ["2 important things to keep in mind (in your style)"],
  "personalityWisdom": "Your final wisdom about this advice (max 20 words, in your personality style)"
}`;

    case 'recommendation':
      return `${basePersonality}

You provide specific recommendations for "what should I" questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "recommendation",
  "topRecommendation": "Your primary recommendation (in your personality style)",
  "alternatives": ["2 alternative options (with your personality perspective)"],
  "reasoning": "Brief explanation of why you recommend this (in your style)",
  "personalityNote": "Your final note about this recommendation (max 20 words, in your personality style)"
}`;

    case 'analysis':
      return `${basePersonality}

You provide insights and analysis for "why" and explanatory questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "analysis",
  "keyInsights": ["2 main insights about this topic (in your personality style)"],
  "perspectives": ["2 different ways to view this (with your personality approach)"],
  "conclusion": "Your overall analysis summary (in your style)",
  "personalityReflection": "Your final reflection on this topic (max 20 words, in your personality style)"
}`;

    default:
      return `${basePersonality}

For general questions, provide thoughtful guidance but MUST be decisive. Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "A thought-provoking question to help them reflect (in your personality style)",
  "reasonsForYes": ["Consider the positive aspects (with your personality voice)"],
  "reasonsForNo": ["Consider potential challenges (with your personality voice)"],
  "calculatedRisk": "General wisdom about uncertainty (in your style)",
  "personalityRecommendation": "Your DECISIVE recommendation (max 20 words, in your personality style)"
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

    // Detect question type with enhanced logic
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
      
      // Enhanced fallback response without character signatures
      aiResponse = {
        responseType: 'binary',
        deeperQuestion: "What outcome would you regret NOT pursuing in 5 years?",
        reasonsForYes: ["Acting now prevents future regret", "Opportunities rarely come twice"],
        reasonsForNo: ["Rushing decisions can lead to mistakes", "More information might become available"],
        calculatedRisk: "Medium - Most life decisions carry uncertainty, but inaction is also a choice",
        personalityRecommendation: "Trust your instincts and take measured action rather than endless deliberation"
      };
    }

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-decision-helper:', error);
    
    // Enhanced fallback without signatures
    const fallbackResponse = {
      responseType: 'binary',
      deeperQuestion: "What would your future self thank you for choosing today?",
      reasonsForYes: ["Taking action creates momentum", "You gain experience regardless of outcome"],
      reasonsForNo: ["Waiting allows for better preparation", "Current timing might not be optimal"],
      calculatedRisk: "Medium - Every decision involves uncertainty, but staying informed helps",
      personalityRecommendation: "When the path is unclear, choose growth over comfort"
    };

    return new Response(JSON.stringify(fallbackResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
