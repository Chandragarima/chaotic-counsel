
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
          "{choice}! Wait, are you sure? Actually yes, {choice}! Quick decision!",
          "OH! {choice}! But what if we regret it? No wait, {choice} is perfect!",
          "{choice}! *nervous twitching* That's the right choice, right? RIGHT?",
          "DEFINITELY {choice}! Unless... no, stick with {choice}!",
          "{choice}! I've analyzed this 47 times and that's the answer!",
          "Quick! {choice}! Before I overthink it!",
          "{choice}! *hyperventilating* That's what my gut says!",
          "OH OH OH! {choice}! Trust me on this one!",
          "{choice}! I'm 73% sure that's correct!",
          "PANIC CHOICE: {choice}! Go with it!",
          "{choice}! My anxiety radar says yes!",
          "FAST DECISION: {choice}! Don't question it!"
        ],
        yesResponses: [
          "YES! Wait, no! Actually YES! Are you sure?",
          "Yes, but what if we're making a huge mistake?!",
          "ABSOLUTELY! *nervous twitching*",
          "Yes yes yes! Quick, before I change my mind!",
          "Yes! I think! Maybe! Definitely yes!",
          "OH YES! But I've prepared 17 backup plans!",
          "YES! My bunny instincts say so!",
          "Absolutely! *rapid heartbeat* Trust the process!",
          "YES! I've overthought this enough!",
          "Definitely yes! *anxious hopping*",
          "YES! Quick decision! Go go go!"
        ],
        noResponses: [
          "NO! Too scary! What if something goes wrong?",
          "Nope nope nope! My anxiety says no!",
          "NO WAY! I've thought of 17 ways this could fail!",
          "Absolutely not! My bunny senses are tingling!",
          "NO! Unless... wait, should it be yes? NO!",
          "PANIC NO! Abort mission!",
          "Negative! Too many variables!",
          "NO! I need more data first!",
          "Absolutely not! *nervous thumping*",
          "NO WAY! What if we're wrong?!",
          "Hard no! My overthinking meter is off the charts!"
        ],
        maybeResponses: [
          "MAYBE?! How am I supposed to work with maybe?!",
          "Maybe! Or not! I can't decide! Help!",
          "Possibly! But what does that even mean?!",
          "Maybe... *hyperventilating* What if maybe isn't enough?",
          "MAYBE! But I need 47 backup plans just in case!",
          "Perhaps! *nervous energy* But also perhaps not!",
          "Maybe?! *anxious twitching* The uncertainty is killing me!",
          "Possibly! But I've prepared for all scenarios!",
          "MAYBE! Quick, someone make it definite!",
          "Perhaps! *rapid breathing* But what are the odds?!"
        ]
      };

    case 'people-pleaser-pup':
      return {
        orChoices: [
          "*quacks mysteriously* The universe says... {choice}! But only if you do it backwards!",
          "Quack! {choice}! The rubber ducks have spoken!",
          "{choice}! But wear something purple while choosing it!",
          "*flaps wings* {choice}! The cosmic ducks approve!",
          "Obviously {choice}! But first, do a little dance!",
          "*mysterious quacking* {choice}! As foretold by the puddle prophecy!",
          "{choice}! But only on days ending in 'y'!",
          "Quack quack! {choice}! The universe demands it!",
          "{choice}! But make sure to quack three times first!",
          "*whimsical waddle* {choice}! The stars have aligned!",
          "{choice}! As written in the ancient duck scrolls!",
          "Definitely {choice}! But only if you believe in magic!"
        ],
        yesResponses: [
          "Yes! But only if you do it while hopping on one foot.",
          "Absolutely! The rubber ducks have spoken!",
          "Yes, but backwards. Start from the end!",
          "Quack yes! *flaps wings enthusiastically*",
          "Yes! And wear something purple while doing it!",
          "Definitely! But first, tell a joke to a houseplant!",
          "Yes! The cosmic forces demand it!",
          "Absolutely! But only on days that end in 'y'!",
          "Yes! *mysterious quacking* Trust the process!",
          "Definitely! But make it sparkly somehow!",
          "Yes! The universe whispers it through duck songs!"
        ],
        noResponses: [
          "No way, José! Unless you ARE José. Then maybe.",
          "Nope! The cosmic ducks disapprove!",
          "No, but yes to the opposite of whatever you asked!",
          "Negative! Try asking again in a funny voice!",
          "No! But ask me again on a Tuesday during a full moon!",
          "Nope! The rubber duck council has spoken!",
          "No way! Unless you do it while standing on your head!",
          "Negative! The stars are misaligned today!",
          "No! But what if you added glitter to it?",
          "Nope! Try asking in the form of a haiku!",
          "No way! The magic 8-duck says absolutely not!"
        ],
        maybeResponses: [
          "Maybe! But only if the weather matches your socks!",
          "Perhaps! Depends on how many vowels are in your name!",
          "Possibly! The magic 8-duck says 'outlook unclear'!",
          "Maybe! But first, tell me your favorite color of invisible!",
          "Might be! Let's consult the ancient art of puddle-gazing!",
          "Perhaps! But only if you can quack the alphabet!",
          "Maybe! Depends on the phase of the moon and your shoe size!",
          "Possibly! But you have to ask while doing jazz hands!",
          "Maybe! The rubber ducks are still deliberating!",
          "Perhaps! But only if you believe in the power of whimsy!"
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
