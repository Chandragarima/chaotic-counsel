import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'sassy-cat',
    name: 'Sassy Cat',
    type: 'sassy-cat',
    personality: 'Drama queen answers only',
    description: 'Sarcastic, bold, and always right (just ask her)',
    unlocked: true,
    image: 'https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg',
    responses: {
      dinner: [
        "Ugh, order some takeout already.",
        "Make ramen. Again. I'm judging you.",
        "Pizza. Obviously. Don't overthink it.",
        "Whatever's in the fridge. I'm not your personal chef.",
        "Cereal for dinner? Bold choice. I respect it."
      ],
      movie: [
        "Something with cats. Or drama. Preferably both.",
        "Pick a rom-com and cry about your life choices.",
        "Horror movie. You need to feel something.",
        "Whatever. I'll be napping anyway.",
        "Documentary about serial killers. You're welcome."
      ],
      hangout: [
        "Stay in. People are exhausting.",
        "Go out, but come back early. I need attention.",
        "Coffee shop. Judge other people's orders.",
        "Park bench. Watch birds. Plot their demise.",
        "Library. Pretend to be intellectual."
      ],
      choice: [
        "Left. Always left. Trust me on this.",
        "The expensive option. You only live once.",
        "Whatever makes you happy, I guess.",
        "Flip a coin. Even chaos has more sense than you.",
        "Ask someone else. I'm done here."
      ],
      yesNoMaybe: {
        yes: [
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
          "Correct answer: Yes. You're learning.",
          "Yes, but make it snappy. I have naps to take."
        ],
        no: [
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
        maybe: [
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
      }
    }
  },
  {
    id: 'wise-owl',
    name: 'Wise Owl',
    type: 'wise-owl',
    personality: 'Ancient peatbog wisdom',
    description: 'Calm, poetic, and mystically unhelpful',
    unlocked: true,
    image: '/lovable-uploads/2cfc8411-76b1-445c-9423-8a2df38f3788.png',
    responses: {
      dinner: [
        "Nourish thy soul with what brings thee joy.",
        "The path to sustenance winds through thy pantry.",
        "Seek the wisdom of thy ancestors... or order pizza.",
        "In the dance of hunger and choice, find balance.",
        "What feeds the body must also feed the spirit."
      ],
      movie: [
        "Choose tales that speak to thy inner truth.",
        "Let the moving pictures guide thy heart's journey.",
        "In stories, we find ourselves reflected.",
        "Seek wisdom in both comedy and tragedy.",
        "The owl suggests documentaries. Obviously."
      ],
      hangout: [
        "Nature calls to those who listen.",
        "Solitude and companionship both have their seasons.",
        "Where thy heart finds peace, there venture.",
        "The wise one suggests a moonlit walk.",
        "In stillness, find thy center."
      ],
      choice: [
        "Trust the whispers of intuition.",
        "All paths lead somewhere meaningful.",
        "In uncertainty, find the gift of possibility.",
        "The answer lies within, dear seeker.",
        "Choose with both mind and heart aligned."
      ],
      yesNoMaybe: {
        yes: [
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
        no: [
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
        maybe: [
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
      }
    }
  },
  {
    id: 'lazy-panda',
    name: 'Lazy Panda',
    type: 'lazy-panda',
    personality: 'No Irish, no worries',
    description: 'Chill, sleepy, and probably still in pajamas',
    unlocked: true,
    image: '/lovable-uploads/f6581916-a5a9-4852-9ef1-172b37caec2f.png',
    responses: {
      dinner: [
        "Whatever requires the least effort, dude.",
        "Delivery. I'm not moving from this spot.",
        "Snacks count as dinner, right?",
        "Whatever's already prepared. Energy is precious.",
        "Bamboo? Wait, wrong species. Pasta works."
      ],
      movie: [
        "Something I can nap through.",
        "Nothing too intense. I'm fragile.",
        "Animated movies are perfect nap soundtracks.",
        "Whatever's already queued up. Don't make me choose.",
        "Nature documentaries. David Attenborough is soothing."
      ],
      hangout: [
        "Somewhere with good napping spots.",
        "My couch. Why would we leave?",
        "Maybe a hammock situation?",
        "Anywhere but somewhere that requires pants.",
        "Coffee shop with those big comfy chairs."
      ],
      choice: [
        "Whatever path requires less walking.",
        "Go with the flow, man.",
        "Choose the comfy option.",
        "When in doubt, nap on it.",
        "Both choices are probably fine. *yawn*"
      ],
      yesNoMaybe: {
        yes: [
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
        no: [
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
        maybe: [
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
      }
    }
  },
  {
    id: 'anxious-bunny',
    name: 'Anxious Bunny',
    type: 'anxious-bunny',
    personality: 'Chaos embodied',
    description: 'Nervous, chaotic, and somehow always right',
    unlocked: false,
    responses: {
      dinner: [
        "WHAT IF WE ORDER THE WRONG THING?!",
        "I've read 47 reviews. Still can't decide.",
        "Quick! Before the kitchen closes! Or... wait, what time is it?",
        "Maybe we should just eat crackers? Is that safe?",
        "I KNOW! Let's try that new place! Wait, what if it's terrible?"
      ],
      movie: [
        "Nothing scary! Unless you want scary? Do you want scary?",
        "I've made a spreadsheet of options organized by genre and mood.",
        "What if we pick something and then regret it forever?",
        "Quick! Random selection! Go go go!",
        "I can't handle commitment right now. You choose!"
      ],
      hangout: [
        "Somewhere public but not too crowded but not empty either!",
        "ADVENTURE! But safe adventure! Is that a thing?",
        "I have seventeen backup plans just in case.",
        "What if we get lost? Do you have GPS? And snacks?",
        "Let's go somewhere new! Actually, somewhere familiar! Both!"
      ],
      choice: [
        "BOTH! Can we choose both? Why not both?",
        "I've listed all possible outcomes. There are 23.",
        "Quick decision! No thinking! Just go!",
        "What does your gut say? Mine is screaming.",
        "Flip a coin then choose the opposite!"
      ],
      yesNoMaybe: {
        yes: [
          "YES! Wait, no! Actually YES! Are you sure?",
          "Yes, but what if we're making a huge mistake?!",
          "ABSOLUTELY! *nervous twitching*",
          "Yes yes yes! Quick, before I change my mind!",
          "Yes! I think! Maybe! Definitely yes!"
        ],
        no: [
          "NO! Too scary! What if something goes wrong?",
          "Nope nope nope! My anxiety says no!",
          "NO WAY! I've thought of 17 ways this could fail!",
          "Absolutely not! My bunny senses are tingling!",
          "No! Unless... wait, should it be yes? NO!"
        ],
        maybe: [
          "MAYBE?! How am I supposed to work with maybe?!",
          "Maybe! Or not! I can't decide! Help!",
          "Possibly! But what does that even mean?!",
          "Maybe... *hyperventilating* What if maybe isn't enough?",
          "MAYBE! But I need 47 backup plans just in case!"
        ]
      }
    }
  },
  {
    id: 'quirky-duck',
    name: 'Quirky Duck',
    type: 'quirky-duck',
    personality: 'Expect the unexpected',
    description: 'Random, eccentric, and wonderfully weird',
    unlocked: false,
    responses: {
      dinner: [
        "Sandwich made entirely of different bread types.",
        "Whatever food rhymes with your middle name.",
        "Cook something while wearing a fancy hat.",
        "Eat dessert first. Rules are made to be quacked.",
        "Food trucks exist for a reason. Find the weirdest one."
      ],
      movie: [
        "Foreign film with no subtitles. Interpret creatively.",
        "Watch three random 20-minute segments from different movies.",
        "Silent film with your own soundtrack.",
        "Movie filmed entirely underwater. Do those exist?",
        "Whatever movie has the most unusual poster."
      ],
      hangout: [
        "Backwards day! Do everything in reverse order!",
        "Visit a place that starts with the same letter as your mood.",
        "Go somewhere you've never been within a 10-minute radius.",
        "Follow a dog. See where they lead you.",
        "Pretend to be tourists in your own city."
      ],
      choice: [
        "Choose based on which option weighs more.",
        "Ask the next person you see wearing blue.",
        "Whatever option has more vowels in its name.",
        "Choose the one that sounds like a good band name.",
        "The universe will send you a sign. Wait for it."
      ],
      yesNoMaybe: {
        yes: [
          "Yes! But only if you do it while hopping on one foot.",
          "Absolutely! The rubber ducks have spoken!",
          "Yes, but backwards. Start from the end!",
          "Quack yes! *flaps wings enthusiastically*",
          "Yes! And wear something purple while doing it!"
        ],
        no: [
          "No way, José! Unless you ARE José. Then maybe.",
          "Nope! The cosmic ducks disapprove!",
          "No, but yes to the opposite of whatever you asked!",
          "Negative! Try asking again in a funny voice!",
          "No! But ask me again on a Tuesday during a full moon!"
        ],
        maybe: [
          "Maybe! But only if the weather matches your socks!",
          "Perhaps! Depends on how many vowels are in your name!",
          "Possibly! The magic 8-duck says 'outlook unclear'!",
          "Maybe! But first, tell me your favorite color of invisible!",
          "Might be! Let's consult the ancient art of puddle-gazing!"
        ]
      }
    }
  }
];
