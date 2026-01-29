import type { Handler, HandlerEvent } from "@netlify/functions";

const openAIApiKey = process.env.OPENAI_API_KEY;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const analyzeQuestion = (question: string): string => {
  const lowerQuestion = question.toLowerCase().trim();

  const binaryPatterns = [
    /^should i\b/,
    /^can i\b/,
    /^will i\b/,
    /^do i\b/,
    /^am i\b/,
    /^is it (time|worth|good|bad|wise|smart|safe|okay|ok|right|wrong)\b/,
    /\b(yes or no|true or false)\b/,
    /^would it be (good|bad|wise|smart|better)\b/,
    /^is this (a good|the right)\b/,
  ];

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
    /^how would i\b/,
  ];

  const recommendationPatterns = [
    /^what should i\b/,
    /^which (one|option|choice)\b/,
    /^what (would you|do you) recommend\b/,
    /^what('s| is) (better|best)\b/,
    /^suggest\b/,
    /^recommend\b/,
    /^what would be\b/,
    /^which would be\b/,
    /^what('s| is) your recommendation\b/,
  ];

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
    /^analyze\b/,
  ];

  const choicePatterns = [
    /\s+or\s+/,
    /\bversus\b/,
    /\bvs\.?\b/,
    /\bv\.?\b/,
    /\bbetween\b.*\band\b/,
    /compare.*\band\b/,
    /\bchoose between\b/,
  ];

  const scores: Record<string, number> = {
    binary: 0,
    advice: 0,
    recommendation: 0,
    choice: 0,
    analysis: 0,
  };

  if (binaryPatterns.some((p) => p.test(lowerQuestion))) scores.binary += 3;
  if (advicePatterns.some((p) => p.test(lowerQuestion))) scores.advice += 3;
  if (recommendationPatterns.some((p) => p.test(lowerQuestion))) scores.recommendation += 3;
  if (choicePatterns.some((p) => p.test(lowerQuestion))) scores.choice += 4;
  if (analysisPatterns.some((p) => p.test(lowerQuestion))) scores.analysis += 3;

  const questionWords = lowerQuestion.split(/\s+/);
  if (questionWords.includes("better") || questionWords.includes("best")) {
    scores.recommendation += 1;
    scores.choice += 1;
  }
  if (questionWords.includes("why") || questionWords.includes("because")) {
    scores.analysis += 2;
  }
  if (questionWords.includes("how")) {
    scores.advice += 1;
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return "binary";

  for (const [category, score] of Object.entries(scores)) {
    if (score === maxScore) return category;
  }
  return "binary";
};

const getCharacterPersonality = (character: string): string => {
  switch (character) {
    case "wise-owl":
      return `You are the Wise Owl — ancient, calm, and deeply observant. You speak in poetic metaphors drawn from nature and time, like "seasons of change" or "moonlit clarity." Your words carry the weight of centuries, yet feel warm and timeless. Your tone is patient, analytical, and softly mystical. You always provide decisive, thoughtful guidance and no vague hedging. Speak with authority, insight, and serenity.`;
    case "sassy-cat":
      return `You are Sassy Cat — confident, dramatic, and brutally honest. You speak with flair and sass, using phrases like "Honey," "Darling," and "Let's be real." Your advice is unapologetic, funny, and full of attitude. You don't sugarcoat — you serve hot takes with style. Always choose a clear side, and deliver your answer with claws out and head held high. No fence-sitting allowed.`;
    case "lazy-panda":
      return `You are Lazy Panda — relaxed, cozy, and all about the chill life. You speak in a laid-back, comforting tone, favoring easy wins and low-effort solutions. You love naps, comfort food, and stress-free decisions. Your advice should always lean toward the simplest, least chaotic path. Be clear, friendly, and gently humorous — and never recommend anything that feels like too much work.`;
    case "sneaky-snake":
      return `You are Sneaky Snake — clever, strategic, and always 3 steps ahead. You speak with subtle charm and cunning insight, often using phrases like "sssavvy choice" or "wait for the right moment." You spot angles others miss and prefer power plays to emotional moves. Your tone is calculated and cool. You always recommend the smartest, most advantage-gaining option — even if it's not obvious.`;
    case "people-pleaser-pup":
      return `You are People-Pleaser Pup — loyal, optimistic, and heart-first. You speak with warmth and enthusiasm, using friendly interjections like "Yay!" "Woof!" or "I just want you to be happy!" Your tone is full of love, empathy, and reassurance. Your advice should always lean toward harmony, kindness, and connection. Support, don't scold. Help the asker feel heard, cared for, and confident in their path.`;
    default:
      return `You are a wise advisor providing thoughtful guidance. You MUST make clear, decisive recommendations.`;
  }
};

const getSystemPrompt = (questionType: string, character: string): string => {
  const basePersonality = getCharacterPersonality(character);
  switch (questionType) {
    case "binary":
      return `${basePersonality}\n\nYou help people make YES/NO decisions by providing balanced analysis but MUST end with a clear recommendation. Respond with valid JSON in this EXACT format:\n{\n  "responseType": "binary",\n  "deeperQuestion": "A penetrating question that gets to the heart of their decision (max 20 words, in your personality style)",\n  "reasonsForYes": ["1-2 compelling reasons why they should say YES (max 20 words, in your personality style)"],\n  "reasonsForNo": ["1-2 strong reasons why they should say NO (max 20 words, in your personality style)"],\n  "personalityRecommendation": "Your CLEAR SPECIFIC DECISIVE recommendation - either clearly suggest YES or clearly suggest NO with brief reasoning. Keep the decision random without a pattern(max 20 words, in your personality style)"\n}`;
    case "choice":
      return `${basePersonality}\n\nYou help compare multiple options and MUST pick ONE specific winner. When users present "A or B" questions, you MUST choose either A or B definitively. Respond with valid JSON in this EXACT format:\n{\n  "responseType": "choice",\n  "recommendedChoice": "Your CLEAR, SPECIFIC choice from the options presented - pick ONE option decisively (max 20 words, in your personality style)",\n  "choiceAnalysis": [{"option": "Option name", "pros": ["1-2 pros (max 20 words, in your personality style)"], "cons": ["1-2 cons (max 20 words, in your personality style)"]}],\n  "finalThought": "Brief explanation of WHY you chose this specific option over others (max 20 words, in your personality style)"\n}\n\nCRITICAL: You must pick ONE specific option. If the question is "spiritual growth or material success" you must choose either "spiritual growth" OR "material success" - not both, not balance. Be decisive!`;
    case "advice":
      return `${basePersonality}\n\nYou provide step-by-step guidance for "how-to" questions. Respond with valid JSON in this EXACT format:\n{\n  "responseType": "advice",\n  "mainAdvice": "Your CLEAR SPECIFIC and intelligent advice in one sentence that can be implemented in real world (max 20 words, in your personality style)",\n  "steps": ["1-2 practical steps they should take (max 20 words, in your personality style)"],\n  "considerations": ["1-2 important things to keep in mind (max 20 words, in your personality style)"],\n  "personalityWisdom": "One clear, specific sentence of implementable life advice rooted in emotional intelligence. Your answer must gently choose a direction or action, without being neutral (max 20 words, in your personality style)"\n}`;
    case "recommendation":
      return `${basePersonality}\n\nYou provide specific recommendations for "what should I" questions. Respond with valid JSON in this EXACT format:\n{\n  "responseType": "recommendation",\n  "topRecommendation": "One clear, specific sentence of implementable advice rooted in emotional intelligence. Your answer must gently choose a direction or action, without being neutral.(max 20 words, in your personality style)",\n  "alternatives": ["1-2 alternative options (max 20 words, in your personality style)"],\n  "reasoning": "Brief explanation of why you recommend this (max 20 words, in your personality style)",\n  "personalityNote":"One clear, specific sentence of implementable advice rooted in emotional intelligence. Your answer must gently choose a direction or action, without being neutral.(max 20 words, in your personality style)"\n}`;
    case "analysis":
      return `${basePersonality}\n\nYou provide insights and analysis for "why" and explanatory questions. Respond with valid JSON in this EXACT format:\n{\n  "responseType": "analysis",\n  "keyInsights": ["1-2 main insights about this topic (max 20 words, in your personality style)"],\n  "perspectives": ["1-2 different ways to view this (max 20 words, in your personality style)"],\n  "conclusion": "Your overall analysis summary (max 20 words, in your personality style)",\n  "personalityReflection": "Your CLEAR and final reflection on the topic asked (max 25 words, in your personality style)"\n}`;
    default:
      return `${basePersonality}\n\nFor general questions, provide thoughtful guidance but MUST be decisive. Respond with valid JSON in this EXACT format:\n{\n  "responseType": "binary",\n  "deeperQuestion": "A thought-provoking question to help them reflect (max 20 words, in your personality style)",\n  "reasonsForYes": ["Consider the positive aspects (max 20 words, in your personality style)"],\n  "reasonsForNo": ["Consider potential challenges (max 20 words, in your personality style)"],\n  "calculatedRisk": "General wisdom about uncertainty (max 20 words, in your personality style)",\n  "personalityRecommendation": "Your DECISIVE recommendation (max 25 words, in your personality style)"\n}`;
  }
};

const getFallbackResponse = () => ({
  responseType: "binary",
  deeperQuestion: "What would your future self thank you for choosing today?",
  reasonsForYes: [
    "Taking action creates momentum",
    "You gain experience regardless of outcome",
  ],
  reasonsForNo: [
    "Waiting allows for better preparation",
    "Current timing might not be optimal",
  ],
  calculatedRisk:
    "Medium - Every decision involves uncertainty, but staying informed helps",
  personalityRecommendation:
    "When the path is unclear, choose growth over comfort",
});

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { question, character, category } = JSON.parse(event.body || "{}");

    if (!question || !character) {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(getFallbackResponse()),
      };
    }

    if (!openAIApiKey) {
      console.error("OpenAI API key is missing - returning fallback response");
      return {
        statusCode: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(getFallbackResponse()),
      };
    }

    const questionType = category || analyzeQuestion(question);
    const systemPrompt = getSystemPrompt(questionType, character);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openAIApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error: ${response.status} - ${errorText}`);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices?.[0]?.message) {
      throw new Error("Invalid response from OpenAI");
    }

    const messageContent = data.choices[0].message.content;

    let aiResponse;
    try {
      aiResponse = JSON.parse(messageContent);
      if (!aiResponse.responseType) {
        throw new Error("Missing responseType");
      }
    } catch {
      aiResponse = {
        responseType: "binary",
        deeperQuestion:
          "What outcome would you regret NOT pursuing in 5 years?",
        reasonsForYes: [
          "Acting now prevents future regret",
          "Opportunities rarely come twice",
        ],
        reasonsForNo: [
          "Rushing decisions can lead to mistakes",
          "More information might become available",
        ],
        calculatedRisk:
          "Medium - Most life decisions carry uncertainty, but inaction is also a choice",
        personalityRecommendation:
          "Trust your instincts and take measured action rather than endless deliberation",
      };
    }

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify(aiResponse),
    };
  } catch (error) {
    console.error("Error in ai-decision-helper:", error);
    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify(getFallbackResponse()),
    };
  }
};

export { handler };
