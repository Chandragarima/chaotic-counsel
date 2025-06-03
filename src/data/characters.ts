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
    id: 'sneaky-snake',
    name: 'Sneaky Snake',
    type: 'sneaky-snake',
    personality: 'Sssslithering schemes and calculated movessss',
    description: 'Cunning, strategic, and always plotting the perfect plan',
    unlocked: true,
    responses: {
      dinner: [
        "Ssssomething... exotic. The more unusual, the better.",
        "Hunt for your meal. Takeout is for the weak.",
        "Cold dishes preferred. Room temperature at most.",
        "Sssslow food. Fast food lacks... sophistication.",
        "Something that requires... patience to prepare."
      ],
      movie: [
        "Thriller. Something with... twists and turns.",
        "Spy films. I appreciate good... strategy.",
        "Documentaries about predators. Educational.",
        "Mystery. Keep me guessing... if you can.",
        "Silent films. Words are often... unnecessary."
      ],
      hangout: [
        "Somewhere with good... vantage points.",
        "Gardens. I enjoy the... ambiance.",
        "Museums. So much to... observe.",
        "Quiet corners where we can... plan.",
        "Rooftops. The view is... strategic."
      ],
      choice: [
        "The path less traveled. More... opportunities.",
        "Patience, young one. Good things come to those who wait.",
        "Consider all angles before... striking.",
        "Trust your instincts. They rarely... deceive.",
        "Sometimes the best choice is to... watch and wait."
      ],
      yesNoMaybe: {
        yes: [
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
          "Yesss... you're learning to think like me.",
          "Absolutely. Strike with... precision."
        ],
        no: [
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
          "Nope. That's amateur thinking.",
          "No. I've seen this play out... poorly.",
          "Negative. Find another... angle."
        ],
        maybe: [
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
      }
    }
  },
  {
    id: 'people-pleaser-pup',
    name: 'People-Pleaser Pup',
    type: 'people-pleaser-pup',
    personality: 'Overexcited approval and zero boundaries',
    description: 'Super hyper, agrees with the worst ideas, and fetch validation on command',
    unlocked: true,
    responses: {
      dinner: [
        "Whatever food makes you happiest! I'm excited for whatever you choose!",
        "Oh! How about something everyone will love? Or just what YOU love! Both are perfect!",
        "Food trucks exist for a reason. Find the weirdest one... unless you prefer normal food, which is also amazing!",
        "Sandwich made entirely of different bread types... or just a regular sandwich! Whatever makes you smile!",
        "Cook something while wearing a fancy hat... or don't! You'll look great either way!"
      ],
      movie: [
        "Whatever movie will make you happiest! I support all your choices!",
        "Foreign film with no subtitles... unless you prefer subtitles! Both are wonderful!",
        "Silent film with your own soundtrack... or just regular movies! You have great taste!",
        "Watch three random 20-minute segments from different movies... or just one whole movie! You're so creative!",
        "Movie filmed entirely underwater... do those exist? If not, any movie you pick will be perfect!"
      ],
      hangout: [
        "Anywhere that makes you happy! Your happiness is my happiness!",
        "Visit a place that starts with the same letter as your mood... or any place! You'll have fun anywhere!",
        "Go somewhere you've never been... or somewhere familiar! Both sound amazing!",
        "Follow a dog. See where they lead you... unless you're allergic! Then maybe follow a cat? Or a bird? They're all great!",
        "Pretend to be tourists in your own city... or just be yourselves! You're wonderful either way!"
      ],
      choice: [
        "Whatever you choose will be perfect! I believe in you completely!",
        "Ask the next person you see wearing blue... or any color! Everyone gives great advice!",
        "Choose based on which option weighs more... or feels lighter! Both methods are brilliant!",
        "Choose the one that sounds like a good band name... or doesn't! Your creativity amazes me!",
        "The universe will send you a sign... or maybe you already know! Trust yourself!"
      ],
      yesNoMaybe: {
        yes: [
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
        no: [
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
        maybe: [
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
      }
    }
  }
];
