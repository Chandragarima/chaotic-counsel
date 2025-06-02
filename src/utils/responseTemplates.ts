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
          "Yes, and you owe me treats for this wisdom."
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
          "No, and you should feel bad for asking."
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
          "Possibly. I'm feeling mysteriously indecisive today."
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
          "Yes, for in this choice lies great wisdom."
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
          "Nay, for wisdom lies in the patient pause."
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
          "Maybe, for the universe holds infinite possibilities."
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
          "Okay, yes. But snacks are required."
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
          "No way, that's outside my comfort zone... literally."
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
          "Possibly, but I reserve the right to cancel for naps."
        ]
      };

    case 'sneaky-snake':
      return {
        orChoices: [
          "Ssss... go with {choice}. *slithers confidently* It's the obvious choice.",
          "{choice}, naturally. I've been watching... and calculating.",
          "*hisses softly* {choice}. Trust my ssssuperior judgment.",
          "{choice}... yesss, that will work perfectly for my... I mean YOUR plans.",
          "Obviously {choice}. I've already thought three steps ahead.",
          "*cunning smile* {choice}. Don't question my methodsss.",
          "{choice}! *flicks tongue* The smartest choice, obviously.",
          "Ssssimple. {choice}. I have my reasonsss... which I won't share.",
          "{choice}... *whispers* between you and me, it's the winning move.",
          "*coils thoughtfully* {choice}. I've seen how this plays out.",
          "Go with {choice}. *winks* I may have... inside information.",
          "{choice}. Sssstrike while the iron is hot!"
        ],
        yesResponses: [
          "Yesss... *hisses approvingly* Excellent choice.",
          "Oh absolutely. *slithers with satisfaction*",
          "Yes, yes, YESSS! *tongue flick* Perfect.",
          "*nods slowly* Yes. I've been planning this all along.",
          "Definitely yes. *cunning grin* Trust the snake.",
          "Yesss... you're learning to think like me.",
          "*hisses with delight* Yes! Brilliant move.",
          "Oh yes. *coils smugly* I saw this coming.",
          "Absolutely yes. *whispers* Between us, it's foolproof.",
          "Yes! *slithers excitedly* Now we're getting somewhere.",
          "*flicks tongue* Yes. My instincts are never wrong."
        ],
        noResponses: [
          "No, no, NO! *hisses in alarm* That's a trap!",
          "*recoils* Absolutely not. I smell danger.",
          "No way. *slithers backward* My senses are tingling.",
          "*shakes head vigorously* No! Trust me on this one.",
          "Definitely not. *hisses* I've seen this trick before.",
          "No! *coils defensively* Something's not right about this.",
          "*tongue flicks nervously* No. Abort mission.",
          "Nope! *slithers away* Red flags everywhere.",
          "No, no, no. *hisses* My gut says RUN.",
          "*shakes entire body* NO! Every instinct says avoid.",
          "Absolutely not. *whispers* It's obviously a setup."
        ],
        maybeResponses: [
          "Maybe... *hisses uncertainly* I need more data.",
          "*tongue flicks thoughtfully* Perhaps. Let me investigate further.",
          "Possibly... *coils in contemplation* but I sense complications.",
          "Maybe... *slithers cautiously* proceed with extreme care.",
          "*hisses softly* Perhaps. But watch your back.",
          "Possibly... *eyes narrow* something feels... off.",
          "Maybe... *whispers* but I'd have a backup plan ready.",
          "*flicks tongue repeatedly* Uncertain. The signs are mixed.",
          "Perhaps... *coils tighter* but trust your instincts.",
          "Maybe... *hisses thoughtfully* if you're feeling lucky."
        ]
      };

    case 'people-pleaser-pup':
      return {
        orChoices: [
          "Oh! {choice}! *tail wagging* Is that okay with you? I hope it's perfect!",
          "{choice}! *bounces excitedly* Unless you prefer something else? I'm flexible!",
          "*happy panting* {choice} sounds amazing! But only if you're happy with it!",
          "Woof! {choice}! *spins in circles* I hope that makes you smile!",
          "{choice}! *tilts head adorably* Is that the right answer? I tried my best!",
          "*tail wagging frantically* {choice}! I hope I didn't disappoint you!",
          "Oh oh oh! {choice}! *playful bark* Did I do good? Please say yes!",
          "{choice}! *happy wiggling* I really hope that helps you out!",
          "*puppy eyes* {choice}? I'm not sure if it's perfect, but I want to help!",
          "Definitely {choice}! *bounces* Unless... wait, do YOU think it's right?",
          "{choice}! *excited panting* I just want to make you happy!",
          "*spins with joy* {choice}! Please tell me that's what you wanted!"
        ],
        yesResponses: [
          "Yes! *tail wagging intensifies* I hope that makes you happy!",
          "*bounces excitedly* Yes, yes, YES! Did I do good?",
          "Absolutely yes! *happy panting* I hope I helped!",
          "*spins in circles* Yes! Please tell me you're pleased!",
          "Oh yes! *puppy eyes* Is that the answer you wanted?",
          "*tail wagging* Yes! I tried so hard to get it right!",
          "YES! *happy barking* I hope I didn't let you down!",
          "*excited wiggling* Yes! Please say I did okay!",
          "Definitely yes! *tilts head* You're not disappointed, right?",
          "*bounces* Yes! I just want to be helpful!",
          "Yes! *happy panting* I hope this makes your day better!"
        ],
        noResponses: [
          "*whimpers softly* No... I'm sorry, I hope that's not too harsh?",
          "Oh no... *puppy eyes* I feel bad saying no, but...",
          "*tail between legs* No, but please don't be upset with me!",
          "No... *sad whimper* I hope you're not disappointed in me!",
          "*looks worried* No, but I still love you anyway!",
          "I'm sorry, but no... *anxious tail wagging* Are we still friends?",
          "*hesitant whimper* No... but maybe I'm wrong? What do you think?",
          "No... *puppy eyes* Please don't think less of me!",
          "*worried panting* No, but I hope I can help in other ways!",
          "Sadly, no... *tail droops* I wish I could give you better news!",
          "*whimpers* No... but you're still amazing, right?"
        ],
        maybeResponses: [
          "Maybe? *tilts head* I'm not sure, but I hope that's okay!",
          "*confused tail wagging* Maybe... is that helpful at all?",
          "Possibly? *puppy eyes* I don't want to give you the wrong answer!",
          "*uncertain panting* Maybe... I hope I'm not disappointing you!",
          "Perhaps? *worried look* I wish I could be more definitive for you!",
          "*anxious wiggling* Maybe... but what do YOU think?",
          "Possibly? *hopeful tail wag* I really want to help you decide!",
          "*tilts head both ways* Maybe... I hope uncertainty is still useful?",
          "Perhaps? *worried whimper* I don't want to steer you wrong!",
          "*confused spinning* Maybe... but I trust YOUR judgment more!"
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
