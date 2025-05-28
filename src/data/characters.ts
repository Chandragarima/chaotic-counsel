
import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'sassy-cat',
    name: 'Sassy Cat',
    type: 'sassy-cat',
    personality: 'Drama queen answers only',
    description: 'Sarcastic, bold, and always right (just ask her)',
    unlocked: true,
    image: '/lovable-uploads/3e3b0145-32d2-4801-b3ac-c7d5af5e5653.png',
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
      ]
    }
  },
  {
    id: 'wise-owl',
    name: 'Wise Owl',
    type: 'wise-owl',
    personality: 'Ancient peatbog wisdom',
    description: 'Calm, poetic, and mystically unhelpful',
    unlocked: true,
    image: '/lovable-uploads/5ccb5d5f-0a2a-428b-a50b-191390add0ab.png',
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
      ]
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
      ]
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
      ]
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
      ]
    }
  }
];
