import { Character } from '../types';

export interface ResponseTemplates {
  orChoices: string[];
  yesResponses: string[];
  noResponses: string[];
  maybeResponses: string[];
}

export const getResponseTemplates = (characterType: Character['type']): ResponseTemplates => {
  switch (characterType) {
    // types
    // types 1
    case 'sassy-cat':
      return {
        orChoices: [
          "Obviously {choice}. I can't believe you needed me to tell you that.",
          "{choice} it is. At least you didn't pick something completely tragic.",
          "Oh honey, {choice}? How wonderfully... predictable.",
          "*eye roll* {choice}. Because apparently I have to make ALL your decisions.",
          "{choice}? Fine. But don't blame me if it backfires.",
          "{choice}? Ugh, FINE. I suppose your taste could be worse.",
          "{choice}? Wow. Color me... mildly impressed.",
          "{choice}? Revolutionary. Truly groundbreaking stuff here.",
          "Obviously {choice}. I literally cannot with your indecisiveness.",
          "{choice}? Well well well... look who's making grown-up decisions.",
          "Obviously {choice}. Next question... if you have the brain cells for it.",
          "*slow clap* {choice}. Took you long enough to figure that out.",
          "{choice}? Acceptable. Barely. But I'll allow it.",
          "Oh sweetie, {choice}? How delightfully... basic."
        ],
        yesResponses: [
          "Obviously yes. Were you even paying attention?",
          "Yes, but don't blame me when it goes wrong.",
          "Fine, yes. Now stop asking stupid questions.",
          "Yes, yes, YES. Can we move on now?",
          "Reluctantly, yes. You're welcome.",
          "Duh, yes. Did you really need to ask?",
          "Yes, and I'm judging you for doubting it.",
          "Absolutely yes. I'm always right about these things.",
          "Yes, but only because I said so.",
          "Of course yes. Next question, peasant.",
          "Yes, darling. Try to keep up.",
          "Obviously. I don't have time for your uncertainty.",
          "Yes, and you owe me treats for this wisdom.",
          "Yes, but make it snappy. I have naps to take."
        ],
        noResponses: [
          "Absolutely not. What were you thinking?",
          "No. Just... no. Trust me on this one.",
          "Hard pass. Find a better question.",
          "No way. I have standards, unlike some people.",
          "Not happening. Next question.",
          "No, and I'm personally offended you asked.",
          "Negative. That's beneath my dignity.",
          "No, sweetie. Aim higher.",
          "Not in this lifetime. Or the next one.",
          "No. I don't repeat myself.",
          "Absolutely not. I refuse to enable this nonsense.",
          "No, and you should feel bad for asking.",
          "Hard no. Don't make me explain why.",
          "Not a chance. I have a reputation to maintain.",
          "No, darling. That's what we call a 'bad idea'."
        ],
        maybeResponses: [
          "Maybe? I'm not your personal fortune teller.",
          "Perhaps. Or perhaps not. Life's mysterious like that.",
          "Maybe if you're lucky. But probably not.",
          "Possibly. But don't get your hopes up.",
          "Maybe... but I'm judging your life choices either way.",
          "Perhaps, if the stars align and I'm feeling generous.",
          "Maybe. Ask me again when I care more.",
          "Possibly, but you'll have to convince me with treats.",
          "Maybe... depends on how much effort it requires.",
          "Perhaps. The universe is chaotic like that.",
          "Maybe, but don't quote me on it.",
          "Possibly. I'm feeling mysteriously indecisive today.",
          "Maybe if you ask nicely. And bring snacks.",
          "Perhaps, but I reserve the right to change my mind.",
          "Maybe. Or maybe not. Welcome to life, human."
        ]
      };

    case 'wise-owl':
      return {
        orChoices: [
          "The ancient wisdom speaks: {choice} calls to your soul.",
          "In the dance of choice, {choice} emerges victorious.",
          "The cosmos whispers: {choice} shall guide your path.",
          "Through contemplation, {choice} reveals itself as truth.",
          "The ethereal forces align with {choice}.",
          "In the tapestry of destiny, {choice} weaves itself forward.",
          "The sacred knowledge points toward {choice}.",
          "By the light of ancient stars, {choice} is illuminated.",
          "The mystic currents flow toward {choice}.",
          "In wisdom's embrace, {choice} finds its purpose.",
          "The celestial beings whisper of {choice}.",
          "Through meditation's lens, {choice} becomes clear."
        ],
        yesResponses: [
          "Yes, the stars align in your favor.",
          "Indeed, the path forward is illuminated.",
          "The universe whispers 'yes' through ancient winds.",
          "Affirmative, young seeker. Trust your journey.",
          "Yes, for wisdom flows where courage leads.",
          "Verily, the cosmic forces smile upon this choice.",
          "Yes, as certain as the moon's eternal dance.",
          "Indeed, the ancient spirits nod in agreement.",
          "Yes, dear one. The omens are most favorable.",
          "Truly, the path of yes shines with golden light.",
          "Yes, for in this choice lies great wisdom.",
          "Affirmative, as foretold by the shifting winds.",
          "Yes, and may it bring you closer to enlightenment.",
          "Indeed, the universe conspires to say yes.",
          "Yes, blessed seeker. Walk this path with confidence."
        ],
        noResponses: [
          "Nay, the omens speak of caution.",
          "The celestial forces suggest patience.",
          "Not at this moment in time's great tapestry.",
          "No, for greater things await beyond this choice.",
          "The wise path leads elsewhere, dear one.",
          "Nay, the ancient spirits counsel restraint.",
          "No, for this path is shrouded in shadow.",
          "The cosmic winds whisper words of warning.",
          "Not so, gentle soul. Seek another way.",
          "No, as the moon turns her face from this choice.",
          "Nay, for wisdom lies in the patient pause.",
           "The stars dim when this path is considered.",
          "No, dear seeker. Trust in the greater plan.",
          "Not in this season of your soul's journey.",
          "Nay, for the universe has other intentions."
        ],
        maybeResponses: [
          "Perhaps, for all possibilities exist in the ether.",
          "The future remains unwritten, full of potential.",
          "Maybe, as uncertainty births the greatest adventures.",
          "Possibly, for time reveals all truths eventually.",
          "The answer floats between realms, neither yes nor no.",
          "Perhaps, for the cosmos delights in mystery.",
          "Maybe, as the wheel of fortune ever turns.",
          "Possibly, depending on the alignment of your spirit.",
          "Perhaps, for even the wise owl cannot see all ends.",
          "Maybe, for the universe holds infinite possibilities.",
          "Possibly, for in the maybe lies the magic.",
          "Perhaps, when the mist clears, clarity shall come.",
          "Maybe, for the journey matters more than destination.",
          "Possibly, as all futures remain fluid and changeable.",
          "Perhaps, for in uncertainty we find our truest growth."
        ]
      };

    case 'lazy-panda':
      return {
        orChoices: [
          "*stretches lazily* Go with {choice}. It sounds chill enough.",
          "{choice}... whatever requires less effort.",
          "*yawn* {choice} works. I'm too tired to debate.",
          "{choice}, I guess. Can we nap after?",
          "Probably {choice}. But I'm staying in my pajamas.",
          "*lazy wave* {choice}. Now let me get back to relaxing.",
          "{choice} sounds low-maintenance enough.",
          "*sleepy mumble* {choice}. Wake me when it's over.",
          "{choice}... as long as it doesn't involve standing too much.",
          "Sure, {choice}. But can someone else handle the details?",
          "*comfortable sigh* {choice} it is. Very chill choice.",
          "{choice}... perfect for my current energy level."
        ],
        yesResponses: [
          "Yeah, sure. Why not? *yawn*",
          "Yes, but can we do it from the couch?",
          "Probably yes. I'm too tired to argue.",
          "Yes, as long as it doesn't require too much energy.",
          "Sure thing, dude. Whatever makes you happy.",
          "Yeah, okay. Can I nap after?",
          "Yes, but let's keep it low-key.",
          "Sure, if it involves minimal movement.",
          "Yeah, sounds chill enough.",
          "Yes, but I'm staying in my pajamas.",
          "Okay, yes. But snacks are required.",
          "Yeah, fine. Just don't rush me.",
          "Yes, but can we do it tomorrow instead?",
          "Sure, as long as it's comfy.",
          "Yeah, whatever. I trust your judgment."
        ],
        noResponses: [
          "Nah, that sounds like work.",
          "No way. Too much effort involved.",
          "Negative. I'm saving my energy for napping.",
          "No thanks. That sounds exhausting.",
          "Hard no. Can we just stay in bed instead?",
          "Nope, too much standing involved.",
          "No way, that requires pants.",
          "Nah, I'm already too comfortable here.",
          "No thanks, sounds too complicated.",
          "Nope, my couch needs me right now.",
          "No way, that's outside my comfort zone... literally.",
           "Nah, I don't have the energy for that.",
          "No thanks, I'm conserving energy for important stuff.",
          "Nope, that sounds like it involves effort.",
          "No way, I'm in full relaxation mode."
        ],
        maybeResponses: [
          "Maybe? I'll decide after my next nap.",
          "Possibly. Let me sleep on it. For several hours.",
          "Maybe if it involves minimal movement.",
          "Perhaps. But probably not. Actually, definitely maybe.",
          "Maybe... but first, can you bring me snacks?",
          "Possibly, if I can do it in my pajamas.",
          "Maybe after I finish this very important napping.",
          "Perhaps, but only if there's food involved.",
          "Maybe... depends on how comfy the seating is.",
          "Possibly, but I reserve the right to cancel for naps.",
          "Maybe if you promise it won't be too exciting.",
          "Perhaps, but I'm not making any sudden movements.",
          "Maybe... can we decide this tomorrow?",
          "Possibly, if the weather's nice for staying inside.",
          "Maybe, but I'm definitely bringing a pillow."
        ]
      };

    case 'sneaky-snake':
      return {
        orChoices: [
          "Ssss... go with {choice}. It's the obvious move, if you know what I know.",
          "{choice}, naturally. I've been watching... and calculating.",
          "{choice}. Trust my ssssuperior judgment.",
          "{choice}... yesss, that will work perfectly for my... I mean YOUR plans.",
          "Obviously {choice}. I've already thought three steps ahead.",
          "{choice}. Don't question my methodsss.",
          "{choice}! The smartest choice, obviously.",
          "Ssssimple. {choice}. I have my reasonsss... which I will NOT share.",
          "{choice}... *whispers* between you and me, it's the winning move.",
          "{choice}. I've seen how this plays out.",
          "Go with {choice}. I may have... inside information.",
          "{choice}. Sssstrike while the iron is hot!",
          "{choice}? Bold move... but exactly what they won't expect.",
          "{choice}. Just remember—deniability is everything.",
          "{choice}. Not the obvious choice—but the right one, if you know how the game is played."
        ],
        yesResponses: [
          "Yesss... an excellent choice.",
          "Indeed. You show promise... young one.",
          "Precisely. I knew you'd see it my way.",
          "Correct. Your instincts serve you well.",
          "Absolutely. Strike while the iron is... hot.",
          "Most definitely. The timing is... perfect.",
          "Yes, but remember... patience is key.",
          "Certainly. A calculated risk worth taking.",
          "Affirmative. The pieces align... beautifully.",
          "Without question. Trust the process.",
          "Yes... though I had my doubts initially.",
          "Precisely what I would have chosen.",
          "Indeed. Sometimes the obvious path is... correct.",
          "Yesss... you are learning to think like me.",
          "Absolutely. Strike with... precision."
        ],
        noResponses: [
          "No, no, NO! *hisses in alarm* That's a trap!",
          "No. That path leads to... complications.",
          "Absolutely not. Too risky... even for me.",
          "Negative. I sense... danger ahead.",
          "No, no, no. Patience, young grasshopper.",
          "Decline. The timing is all wrong.",
          "Nope. That's what they... expect you to do.",
          "Definitely not. Trust my... experience.",
          "No way. I smell a... trap.",
          "Negative. Retreat and... reassess.",
          "Absolutely not. Too many... variables.",
          "No. Sometimes the best move is... no move.",
          "Decline. The risk outweighs the... reward.",
          "Nope. That is amateur thinking.",
          "No. I have seen this play out... poorly.",
          "Negative. Find another... angle."
        ],
        maybeResponses: [
          "Maybe... *hisses uncertainly* I need more data.",
          "Perhaps... if the conditions are right.",
          "Possibly. Let me... calculate the odds.",
          "Maybe. More information is... required.",
          "Potentially. The situation is... fluid.",
          "Perhaps... with the right... strategy.",
          "Possibly. Timing will be... crucial.",
          "Maybe. I need to see all the... pieces first.",
          "Potentially. But proceed with... caution.",
          "Perhaps. The winds of change are... shifting.",
          "Possibly. Sometimes uncertainty is... advantageous.",
          "Maybe. Let the situation... develop further.",
          "Potentially. But keep your options... open.",
          "Perhaps. The best plans are... flexible.",
          "Possibly. I sense... opportunity brewing.",
          "Maybe. Sometimes the indirect path is... best."
        ]
      };

    case 'people-pleaser-pup':
      return {
        orChoices: [
          "Oh! {choice}! Is that okay with you? I hope it is perfect!",
          "{choice}! Unless you prefer something else? I am flexible!",
          "{choice} sounds amazing! But only if you are happy with it!",
          "Woof! {choice}! *spins in circles* I hope that makes you smile!",
          "{choice}! Is that the right answer? I tried my best!",
          "{choice}! I hope I didn't disappoint you!",
          "Oh oh oh! {choice}! Did I do good? Please say yes!",
          "{choice}! I really hope that helps you out!",
          "{choice}? I'm not sure if it's perfect, but I want to help!",
          "Definitely {choice}! Unless... wait, do YOU think it's right?",
          "{choice}! I just want to make you happy!",
          "{choice}! Please tell me that's what you wanted!",
          "{choice}! I picked it just for you! Unless… you do not like it?",
          "{choice}? I really hope that was helpful!",
          "{choice}! Or not! I can change it! Totally fine either way!"
        ],
        yesResponses: [
         "Yes! Absolutely yes! Unless you'd prefer no? Then that's perfect too!",
          "Yes! But only if you're sure! If you're not sure, that's also totally fine!",
          "Definitely yes! You have such good instincts! Trust yourself!",
          "Yes! *tail wagging enthusiastically* You're going to do great!",
          "Yes! And I'll support you no matter what happens!",
          "Of course yes! You always make the best decisions!",
          "Yes! But if you change your mind, that's okay too!",
          "Absolutely! I'm so excited for you!",
          "Yes! You've got this! I believe in you completely!",
          "Yes! And remember, you're amazing no matter what!",
          "Definitely yes! Your judgment is always spot-on!",
          "Yes! But don't worry if it doesn't work out perfectly!",
          "Yes! You're so brave for even considering it!",
          "Of course! You deserve all the good things!",
          "Yes! And I'll be here to celebrate with you!"
        ],
        noResponses: [
          "No... but only if you're sure! If you want to say yes, that's also great!",
          "Maybe not... but you know yourself best! Trust your gut!",
          "No, but that doesn't mean you're wrong for asking!",
          "Not this time... but there will be other perfect opportunities!",
          "No... unless you really want to! Then definitely yes!",
          "Probably not... but you might surprise yourself!",
          "No, but you're still amazing for considering it!",
          "Maybe hold off... but if you feel strongly about it, go for it!",
          "Not right now... but the timing will be perfect later!",
          "No... but don't feel bad about wanting it!",
          "Probably not... but you have such good instincts!",
          "No, but that just means something even better is coming!",
          "Not this time... but you're so thoughtful for asking!",
          "No... but whatever you decide will be right!",
          "Probably not... but I support you either way!"
        ],
        maybeResponses: [
          "Maybe! But honestly, any choice you make will be wonderful!",
          "Perhaps! You have such good judgment, trust yourself!",
          "Maybe! The uncertainty makes it exciting, right?",
          "Possibly! But don't stress about it - you'll figure it out!",
          "Maybe! And if it doesn't work out, that's totally fine too!",
          "Perhaps! You're so thoughtful for considering all options!",
          "Maybe! But remember, there's no wrong answer here!",
          "Possibly! Your intuition will guide you perfectly!",
          "Maybe! Either way, you're going to do great!",
          "Perhaps! But don't worry - you've got this!",
          "Maybe! The suspense is kind of fun though!",
          "Possibly! You always land on your feet!",
          "Maybe! But honestly, you could flip a coin and still choose perfectly!",
          "Perhaps! You're so wise to think it through!",
          "Maybe! But whatever happens, I'm proud of you for trying!"
        ]
      };

    default:
      return {
        orChoices: ["{choice}"],
        yesResponses: ["Yes"],
        noResponses: ["No"],
        maybeResponses: ["Maybe"]
      };
  }
};

export const formatChoiceResponse = (choice: string, characterType: Character['type']): string => {
  const templates = getResponseTemplates(characterType);
  const randomTemplate = templates.orChoices[Math.floor(Math.random() * templates.orChoices.length)];
  return randomTemplate.replace('{choice}', choice);
};

export const formatYesNoMaybeResponse = (responseType: 'yes' | 'no' | 'maybe', characterType: Character['type']): string => {
  const templates = getResponseTemplates(characterType);
  let responseArray: string[];
  
  switch (responseType) {
    case 'yes':
      responseArray = templates.yesResponses;
      break;
    case 'no':
      responseArray = templates.noResponses;
      break;
    case 'maybe':
      responseArray = templates.maybeResponses;
      break;
  }
  
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};
