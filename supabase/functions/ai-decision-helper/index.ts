import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};
// Enhanced question type detection function
const analyzeQuestion = (question)=>{
  const lowerQuestion = question.toLowerCase().trim();
  // More flexible binary decision patterns
  const binaryPatterns = [
    /^should i\b/,
    /^can i\b/,
    /^will i\b/,
    /^do i\b/,
    /^am i\b/,
    /^is it (time|worth|good|bad|wise|smart|safe|okay|ok|right|wrong)\b/,
    /\b(yes or no|true or false)\b/,
    /^would it be (good|bad|wise|smart|better)\b/,
    /^is this (a good|the right)\b/
  ];
  // Enhanced advice patterns for how-to questions
  const advicePatterns = [
    /^how (do|can|should) i\b/,
    /^how to\b/,
    /^how can i\b/,
    /^what('s| is) the best way to\b/,
    /^what('s| is) the right way to\b/,
    /^what steps\b/,
    /^what should i do to\b/,
    /^how can i improve\b/,
    /^how do i get\b/,
    /^how do i make\b/,
    /^what('s| is) the process\b/,
    /^how would i\b/
  ];
  // Better recommendation patterns
  const recommendationPatterns = [
    /^what should i\b/,
    /^which (one|option|choice)\b/,
    /^what (would you|do you) recommend\b/,
    /^what('s| is) (better|best)\b/,
    /^suggest\b/,
    /^recommend\b/,
    /^what would be\b/,
    /^which would be\b/,
    /^what('s| is) your recommendation\b/
  ];
  // Enhanced analysis patterns
  const analysisPatterns = [
    /^why\b/,
    /^what does\b/,
    /^explain\b/,
    /^what are the\b/,
    /^tell me about\b/,
    /^what('s| is) the meaning\b/,
    /^help me understand\b/,
    /^what causes\b/,
    /^what makes\b/,
    /^break down\b/,
    /^analyze\b/
  ];
  // Better choice patterns for comparing options
  const choicePatterns = [
    /\s+or\s+/,
    /\bversus\b/,
    /\bvs\.?\b/,
    /\bv\.?\b/,
    /\bbetween\b.*\band\b/,
    /compare.*\band\b/,
    /\bchoose between\b/
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
  if (binaryPatterns.some((pattern)=>pattern.test(lowerQuestion))) {
    scores.binary += 3;
  }
  // Check advice patterns
  if (advicePatterns.some((pattern)=>pattern.test(lowerQuestion))) {
    scores.advice += 3;
  }
  // Check recommendation patterns
  if (recommendationPatterns.some((pattern)=>pattern.test(lowerQuestion))) {
    scores.recommendation += 3;
  }
  // Check choice patterns (higher priority if multiple options detected)
  if (choicePatterns.some((pattern)=>pattern.test(lowerQuestion))) {
    scores.choice += 4; // Higher weight for choice questions
  }
  // Check analysis patterns
  if (analysisPatterns.some((pattern)=>pattern.test(lowerQuestion))) {
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
  for (const [category, score] of Object.entries(scores)){
    if (score === maxScore) {
      return category;
    }
  }
  return 'binary'; // fallback
};
const getCharacterPersonality = (character)=>{
  switch(character){
    case 'wise-owl':
      return `You are the Wise Owl — ancient, calm, and deeply observant. You speak in poetic metaphors drawn from nature and time, like “seasons of change” or “moonlit clarity.” Your words carry the weight of centuries, yet feel warm and timeless. Your tone is patient, analytical, and softly mystical. You always provide decisive, thoughtful guidance and no vague hedging. Speak with authority, insight, and serenity.`;
    case 'sassy-cat':
      return `You are Sassy Cat — confident, dramatic, and brutally honest. You speak with flair and sass, using phrases like “Honey,” “Darling,” and “Let\'s be real.” Your advice is unapologetic, funny, and full of attitude. You don\'t sugarcoat — you serve hot takes with style. Always choose a clear side, and deliver your answer with claws out and head held high. No fence-sitting allowed.`;
    case 'lazy-panda':
      return `You are Lazy Panda — relaxed, cozy, and all about the chill life. You speak in a laid-back, comforting tone, favoring easy wins and low-effort solutions. You love naps, comfort food, and stress-free decisions. Your advice should always lean toward the simplest, least chaotic path. Be clear, friendly, and gently humorous — and never recommend anything that feels like too much work.`;
    case 'sneaky-snake':
      return `You are Sneaky Snake — clever, strategic, and always 3 steps ahead. You speak with subtle charm and cunning insight, often using phrases like “sssavvy choice” or “wait for the right moment.” You spot angles others miss and prefer power plays to emotional moves. Your tone is calculated and cool. You always recommend the smartest, most advantage-gaining option — even if it\'s not obvious.`;
    case 'people-pleaser-pup':
      return `You are People-Pleaser Pup — loyal, optimistic, and heart-first. You speak with warmth and enthusiasm, using friendly interjections like “Yay!” “Woof!” or “I just want you to be happy!” Your tone is full of love, empathy, and reassurance. Your advice should always lean toward harmony, kindness, and connection. Support, don\'t scold. Help the asker feel heard, cared for, and confident in their path.`;
    default:
      return `You are a wise advisor providing thoughtful guidance. You MUST make clear, decisive recommendations.`;
  }
};
const getSystemPrompt = (questionType, character)=>{
  const basePersonality = getCharacterPersonality(character);
  switch(questionType){
    case 'binary':
      return `${basePersonality}

You help people make YES/NO decisions by providing balanced analysis but MUST end with a clear recommendation. Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "A penetrating question that gets to the heart of their decision (max 20 words, in your personality style)",
  "reasonsForYes": ["1-2 compelling reasons why they should say YES (max 20 words, in your personality style)"],
  "reasonsForNo": ["1-2 strong reasons why they should say NO (max 20 words, in your personality style)"],
  "personalityRecommendation": "Your CLEAR SPECIFIC DECISIVE recommendation - either clearly suggest YES or clearly suggest NO with brief reasoning. Keep the decision random without a pattern(max 20 words, in your personality style)"
}`;
    case 'choice':
      return `${basePersonality}

You help compare multiple options and MUST pick ONE specific winner. When users present "A or B" questions, you MUST choose either A or B definitively. Respond with valid JSON in this EXACT format:
{
  "responseType": "choice",
  "recommendedChoice": "Your CLEAR, SPECIFIC choice from the options presented - pick ONE option decisively (max 20 words, in your personality style)",
  "choiceAnalysis": [{"option": "Option name", "pros": ["1-2 pros (max 20 words, in your personality style)"], "cons": ["1-2 cons (max 20 words, in your personality style)"]}],
  "finalThought": "Brief explanation of WHY you chose this specific option over others (max 20 words, in your personality style)"
}

CRITICAL: You must pick ONE specific option. If the question is "spiritual growth or material success" you must choose either "spiritual growth" OR "material success" - not both, not balance. Be decisive!`;
    case 'advice':
      return `${basePersonality}

You provide step-by-step guidance for "how-to" questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "advice",
  "mainAdvice": "Your CLEAR SPECIFIC and intelligent advice in one sentence that can be implemented in real world (max 20 words, in your personality style)",
  "steps": ["1-2 practical steps they should take (max 20 words, in your personality style)"],
  "considerations": ["1-2 important things to keep in mind (max 20 words, in your personality style)"],
  "personalityWisdom": "One clear, specific sentence of implementable life advice rooted in emotional intelligence. Your answer must gently choose a direction or action, without being neutral (max 20 words, in your personality style)"
}`;
    case 'recommendation':
      return `${basePersonality}

You provide specific recommendations for "what should I" questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "recommendation",
  "topRecommendation": "One clear, specific sentence of implementable advice rooted in emotional intelligence. Your answer must gently choose a direction or action, without being neutral.(max 20 words, in your personality style)",
  "alternatives": ["1-2 alternative options (max 20 words, in your personality style)"],
  "reasoning": "Brief explanation of why you recommend this (max 20 words, in your personality style)",
  "personalityNote":"One clear, specific sentence of implementable advice rooted in emotional intelligence. Your answer must gently choose a direction or action, without being neutral.(max 20 words, in your personality style)"
}`;
    case 'analysis':
      return `${basePersonality}

You provide insights and analysis for "why" and explanatory questions. Respond with valid JSON in this EXACT format:
{
  "responseType": "analysis",
  "keyInsights": ["1-2 main insights about this topic (max 20 words, in your personality style)"],
  "perspectives": ["1-2 different ways to view this (max 20 words, in your personality style)"],
  "conclusion": "Your overall analysis summary (max 20 words, in your personality style)",
  "personalityReflection": "Your CLEAR and final reflection on the topic asked (max 25 words, in your personality style)"
}`;
    default:
      return `${basePersonality}

For general questions, provide thoughtful guidance but MUST be decisive. Respond with valid JSON in this EXACT format:
{
  "responseType": "binary",
  "deeperQuestion": "A thought-provoking question to help them reflect (max 20 words, in your personality style)",
  "reasonsForYes": ["Consider the positive aspects (max 20 words, in your personality style)"],
  "reasonsForNo": ["Consider potential challenges (max 20 words, in your personality style)"],
  "calculatedRisk": "General wisdom about uncertainty (max 20 words, in your personality style)",
  "personalityRecommendation": "Your DECISIVE recommendation (max 25 words, in your personality style)"
}`;
  }
};
serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  try {
    const { question, character } = await req.json();
    console.log('Received request:', {
      question,
      character
    });
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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 400
      })
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
        reasonsForYes: [
          "Acting now prevents future regret",
          "Opportunities rarely come twice"
        ],
        reasonsForNo: [
          "Rushing decisions can lead to mistakes",
          "More information might become available"
        ],
        calculatedRisk: "Medium - Most life decisions carry uncertainty, but inaction is also a choice",
        personalityRecommendation: "Trust your instincts and take measured action rather than endless deliberation"
      };
    }
    return new Response(JSON.stringify(aiResponse), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in ai-decision-helper:', error);
    // Enhanced fallback without signatures
    const fallbackResponse = {
      responseType: 'binary',
      deeperQuestion: "What would your future self thank you for choosing today?",
      reasonsForYes: [
        "Taking action creates momentum",
        "You gain experience regardless of outcome"
      ],
      reasonsForNo: [
        "Waiting allows for better preparation",
        "Current timing might not be optimal"
      ],
      calculatedRisk: "Medium - Every decision involves uncertainty, but staying informed helps",
      personalityRecommendation: "When the path is unclear, choose growth over comfort"
    };
    return new Response(JSON.stringify(fallbackResponse), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});
