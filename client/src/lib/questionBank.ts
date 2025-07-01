import type { QuizQuestion, StatName } from '@shared/schema';

// All unique stat pairings (15 total)
const STAT_PAIRINGS: [StatName, StatName][] = [
  ['STR', 'DEX'], ['STR', 'CON'], ['STR', 'INT'], ['STR', 'WIS'], ['STR', 'CHA'],
  ['DEX', 'CON'], ['DEX', 'INT'], ['DEX', 'WIS'], ['DEX', 'CHA'],
  ['CON', 'INT'], ['CON', 'WIS'], ['CON', 'CHA'],
  ['INT', 'WIS'], ['INT', 'CHA'],
  ['WIS', 'CHA']
];

// Question scenarios for each stat pairing
const QUESTION_SCENARIOS: Record<string, Array<{
  optionA: { title: string; description: string; icon: string; };
  optionB: { title: string; description: string; icon: string; };
}>> = {
  'STR-DEX': [
    {
      optionA: { title: 'Overwhelming force', description: 'Break through obstacles with raw physical power and might', icon: 'fa-fist-raised' },
      optionB: { title: 'Precise finesse', description: 'Navigate challenges with agility and graceful precision', icon: 'fa-running' }
    },
    {
      optionA: { title: 'Heavy armor mastery', description: 'Tank damage while wielding massive weapons', icon: 'fa-shield-alt' },
      optionB: { title: 'Acrobatic combat', description: 'Dance around enemies with quick strikes and dodges', icon: 'fa-wind' }
    },
    {
      optionA: { title: 'Intimidating presence', description: 'Your physical bulk commands respect and fear', icon: 'fa-frown' },
      optionB: { title: 'Evasive tactics', description: 'Stay mobile and hard to pin down in any situation', icon: 'fa-route' }
    },
    {
      optionA: { title: 'Brute force solutions', description: 'When in doubt, apply more muscle to the problem', icon: 'fa-hammer' },
      optionB: { title: 'Elegant problem solving', description: 'Find the precise, minimal effort solution', icon: 'fa-chess' }
    },
    {
      optionA: { title: 'Powerlifting champion', description: 'Excel at feats of raw physical strength', icon: 'fa-dumbbell' },
      optionB: { title: 'Parkour expert', description: 'Master of fluid movement and environmental navigation', icon: 'fa-mountain' }
    },
    {
      optionA: { title: 'Grappling specialist', description: 'Control enemies through wrestling and holds', icon: 'fa-hand-rock' },
      optionB: { title: 'Ranged precision', description: 'Strike accurately from a distance with finesse weapons', icon: 'fa-bullseye' }
    }
  ],
  
  'STR-CON': [
    {
      optionA: { title: 'Explosive power', description: 'Deliver devastating attacks in short, powerful bursts', icon: 'fa-bolt' },
      optionB: { title: 'Enduring resilience', description: 'Outlast enemies through superior stamina and health', icon: 'fa-heart' }
    },
    {
      optionA: { title: 'Peak performance', description: 'Excel when you can give your absolute maximum effort', icon: 'fa-rocket' },
      optionB: { title: 'Steady reliability', description: 'Maintain consistent performance over long periods', icon: 'fa-balance-scale' }
    },
    {
      optionA: { title: 'Lifting heavy loads', description: 'Move massive objects that others cannot budge', icon: 'fa-weight-hanging' },
      optionB: { title: 'Working all day', description: 'Keep going when others need to rest and recover', icon: 'fa-clock' }
    },
    {
      optionA: { title: 'Crushing blows', description: 'Deal maximum damage with every strike', icon: 'fa-fist-raised' },
      optionB: { title: 'Absorbing damage', description: 'Shrug off hits that would fell lesser beings', icon: 'fa-shield' }
    },
    {
      optionA: { title: 'Athletic prowess', description: 'Dominate in tests of pure physical capability', icon: 'fa-medal' },
      optionB: { title: 'Natural toughness', description: 'Resist poisons, diseases, and environmental hazards', icon: 'fa-leaf' }
    },
    {
      optionA: { title: 'Moment of glory', description: 'Shine brightest in crucial, high-stakes moments', icon: 'fa-star' },
      optionB: { title: 'Marathon mindset', description: 'Excel in prolonged challenges requiring endurance', icon: 'fa-road' }
    }
  ],

  'STR-INT': [
    {
      optionA: { title: 'Physical solutions', description: 'Solve problems through direct action and force', icon: 'fa-hammer' },
      optionB: { title: 'Intellectual analysis', description: 'Think through problems with logic and reasoning', icon: 'fa-brain' }
    },
    {
      optionA: { title: 'Learning by doing', description: 'Gain understanding through hands-on experience', icon: 'fa-tools' },
      optionB: { title: 'Theoretical mastery', description: 'Study concepts deeply before applying them', icon: 'fa-book' }
    },
    {
      optionA: { title: 'Straightforward approach', description: 'Take the most direct path to your goal', icon: 'fa-arrow-right' },
      optionB: { title: 'Strategic planning', description: 'Consider multiple options before acting', icon: 'fa-chess-board' }
    },
    {
      optionA: { title: 'Immediate action', description: 'Trust your instincts and act decisively', icon: 'fa-lightning-bolt' },
      optionB: { title: 'Careful research', description: 'Gather information before making decisions', icon: 'fa-search' }
    },
    {
      optionA: { title: 'Practical skills', description: 'Focus on abilities that have immediate utility', icon: 'fa-wrench' },
      optionB: { title: 'Academic knowledge', description: 'Value learning for its own sake and long-term benefits', icon: 'fa-graduation-cap' }
    },
    {
      optionA: { title: 'Leading by example', description: 'Show others what to do through your actions', icon: 'fa-flag' },
      optionB: { title: 'Teaching and mentoring', description: 'Share knowledge to help others improve', icon: 'fa-chalkboard-teacher' }
    }
  ],

  'STR-WIS': [
    {
      optionA: { title: 'Decisive action', description: 'Act quickly and powerfully when the moment demands it', icon: 'fa-fist-raised' },
      optionB: { title: 'Patient observation', description: 'Watch and wait for the right moment to act', icon: 'fa-eye' }
    },
    {
      optionA: { title: 'Bold confidence', description: 'Trust in your physical abilities to overcome challenges', icon: 'fa-mountain' },
      optionB: { title: 'Humble awareness', description: 'Recognize your limits and the complexity of situations', icon: 'fa-meditation' }
    },
    {
      optionA: { title: 'Imposing presence', description: 'Use your physical stature to influence others', icon: 'fa-crown' },
      optionB: { title: 'Quiet influence', description: 'Lead through wisdom and understanding rather than force', icon: 'fa-dove' }
    },
    {
      optionA: { title: 'Facing problems head-on', description: 'Confront challenges directly with determination', icon: 'fa-shield-alt' },
      optionB: { title: 'Finding deeper meaning', description: 'Look beyond surface issues to understand root causes', icon: 'fa-tree' }
    },
    {
      optionA: { title: 'Physical training', description: 'Improve yourself through rigorous bodily discipline', icon: 'fa-dumbbell' },
      optionB: { title: 'Spiritual growth', description: 'Develop through meditation and inner reflection', icon: 'fa-om' }
    },
    {
      optionA: { title: 'Protecting others', description: 'Use your strength to shield those who cannot protect themselves', icon: 'fa-shield' },
      optionB: { title: 'Guiding others', description: 'Help people find their own path through gentle wisdom', icon: 'fa-compass' }
    }
  ],

  'STR-CHA': [
    {
      optionA: { title: 'Commanding respect', description: 'Your physical presence naturally demands attention', icon: 'fa-fist-raised' },
      optionB: { title: 'Winning hearts', description: 'Charm and inspire others through force of personality', icon: 'fa-heart' }
    },
    {
      optionA: { title: 'Leading by strength', description: 'Others follow because you can protect and provide', icon: 'fa-shield-alt' },
      optionB: { title: 'Leading by inspiration', description: 'Rally others through charismatic speeches and vision', icon: 'fa-flag' }
    },
    {
      optionA: { title: 'Intimidating foes', description: 'Make enemies think twice through displays of power', icon: 'fa-angry' },
      optionB: { title: 'Persuading enemies', description: 'Convert foes to allies through diplomatic charm', icon: 'fa-handshake' }
    },
    {
      optionA: { title: 'Reliable strength', description: 'Be the rock that others can depend on in crisis', icon: 'fa-mountain' },
      optionB: { title: 'Infectious enthusiasm', description: 'Motivate others through your passion and energy', icon: 'fa-fire' }
    },
    {
      optionA: { title: 'Honest simplicity', description: 'Speak truth plainly without flowery words', icon: 'fa-balance-scale' },
      optionB: { title: 'Eloquent expression', description: 'Use beautiful language to move and persuade', icon: 'fa-feather' }
    },
    {
      optionA: { title: 'Actions over words', description: 'Prove your worth through deeds rather than promises', icon: 'fa-hammer' },
      optionB: { title: 'Words as weapons', description: 'Wield language as skillfully as any blade', icon: 'fa-microphone' }
    }
  ],

  'DEX-CON': [
    {
      optionA: { title: 'Quick and agile', description: 'Avoid damage through speed and nimble movement', icon: 'fa-running' },
      optionB: { title: 'Tough and resilient', description: 'Absorb damage and keep fighting through sheer durability', icon: 'fa-heart' }
    },
    {
      optionA: { title: 'Precision strikes', description: 'Strike exactly where it hurts most with calculated attacks', icon: 'fa-crosshairs' },
      optionB: { title: 'Wearing them down', description: 'Outlast opponents through superior staying power', icon: 'fa-hourglass' }
    },
    {
      optionA: { title: 'Acrobatic maneuvers', description: 'Use environment and mobility to gain advantages', icon: 'fa-wind' },
      optionB: { title: 'Standing your ground', description: 'Hold positions and weather any storm of attacks', icon: 'fa-anchor' }
    },
    {
      optionA: { title: 'Finesse weapons', description: 'Master light, precise weapons that reward skill', icon: 'fa-sword' },
      optionB: { title: 'Natural armor', description: 'Rely on your body\'s natural toughness and resilience', icon: 'fa-shield' }
    },
    {
      optionA: { title: 'Hit and run tactics', description: 'Strike quickly then withdraw before retaliation', icon: 'fa-bolt' },
      optionB: { title: 'Sustained combat', description: 'Fight effectively over extended periods without tiring', icon: 'fa-clock' }
    },
    {
      optionA: { title: 'Perfect timing', description: 'Act at precisely the right moment for maximum effect', icon: 'fa-stopwatch' },
      optionB: { title: 'Steady persistence', description: 'Keep pushing forward regardless of setbacks', icon: 'fa-mountain' }
    }
  ],

  'DEX-INT': [
    {
      optionA: { title: 'Reactive adaptability', description: 'Respond instantly to changing situations with fluid grace', icon: 'fa-running' },
      optionB: { title: 'Predictive planning', description: 'Anticipate problems and prepare solutions in advance', icon: 'fa-brain' }
    },
    {
      optionA: { title: 'Intuitive skill', description: 'Master techniques through practice and muscle memory', icon: 'fa-hand-paper' },
      optionB: { title: 'Technical knowledge', description: 'Understand the theory behind every technique', icon: 'fa-cog' }
    },
    {
      optionA: { title: 'Improvised solutions', description: 'Create brilliant tactics on the spot as needed', icon: 'fa-magic' },
      optionB: { title: 'Calculated strategies', description: 'Work out detailed plans using logic and analysis', icon: 'fa-chess' }
    },
    {
      optionA: { title: 'Natural talent', description: 'Excel through innate ability and instinctive understanding', icon: 'fa-star' },
      optionB: { title: 'Studied expertise', description: 'Achieve mastery through dedicated learning and research', icon: 'fa-book' }
    },
    {
      optionA: { title: 'Flexible tactics', description: 'Adapt your approach based on immediate circumstances', icon: 'fa-arrows-alt' },
      optionB: { title: 'Systematic methods', description: 'Apply proven techniques and established procedures', icon: 'fa-list' }
    },
    {
      optionA: { title: 'Swift execution', description: 'Act quickly once you\'ve decided on a course of action', icon: 'fa-lightning-bolt' },
      optionB: { title: 'Thorough analysis', description: 'Examine all angles before committing to action', icon: 'fa-search' }
    }
  ],

  'DEX-WIS': [
    {
      optionA: { title: 'Quick reflexes', description: 'React instantly to threats and opportunities', icon: 'fa-running' },
      optionB: { title: 'Careful perception', description: 'Notice subtle details others miss through patient observation', icon: 'fa-eye' }
    },
    {
      optionA: { title: 'Graceful movement', description: 'Flow through space with natural elegance and poise', icon: 'fa-feather' },
      optionB: { title: 'Centered awareness', description: 'Maintain calm mindfulness in all situations', icon: 'fa-meditation' }
    },
    {
      optionA: { title: 'Spontaneous action', description: 'Trust your instincts and act without hesitation', icon: 'fa-bolt' },
      optionB: { title: 'Mindful consideration', description: 'Reflect deeply before taking any significant action', icon: 'fa-tree' }
    },
    {
      optionA: { title: 'Physical harmony', description: 'Find balance through movement and bodily coordination', icon: 'fa-yin-yang' },
      optionB: { title: 'Spiritual insight', description: 'Achieve understanding through inner contemplation', icon: 'fa-om' }
    },
    {
      optionA: { title: 'Artistic expression', description: 'Channel creativity through dance, music, or performance', icon: 'fa-palette' },
      optionB: { title: 'Natural wisdom', description: 'Draw knowledge from observing the world around you', icon: 'fa-leaf' }
    },
    {
      optionA: { title: 'Instinctive timing', description: 'Know exactly when to act through natural feel', icon: 'fa-clock' },
      optionB: { title: 'Patient wisdom', description: 'Understand that some things cannot be rushed', icon: 'fa-hourglass' }
    }
  ],

  'DEX-CHA': [
    {
      optionA: { title: 'Graceful presence', description: 'Captivate others through elegant movement and poise', icon: 'fa-running' },
      optionB: { title: 'Magnetic personality', description: 'Draw people in through sheer force of character', icon: 'fa-magnet' }
    },
    {
      optionA: { title: 'Artistic performance', description: 'Express yourself through dance, music, or other arts', icon: 'fa-theater-masks' },
      optionB: { title: 'Compelling speech', description: 'Move others through powerful oratory and debate', icon: 'fa-microphone' }
    },
    {
      optionA: { title: 'Subtle influence', description: 'Guide others through gentle touches and body language', icon: 'fa-hand-paper' },
      optionB: { title: 'Direct persuasion', description: 'Convince others through passionate argument and appeal', icon: 'fa-comments' }
    },
    {
      optionA: { title: 'Nimble wit', description: 'Respond cleverly and quickly in social situations', icon: 'fa-brain' },
      optionB: { title: 'Commanding presence', description: 'Naturally take charge in any group or gathering', icon: 'fa-crown' }
    },
    {
      optionA: { title: 'Refined elegance', description: 'Demonstrate sophistication through perfect manners', icon: 'fa-gem' },
      optionB: { title: 'Raw charisma', description: 'Win others over through authentic enthusiasm', icon: 'fa-fire' }
    },
    {
      optionA: { title: 'Non-verbal communication', description: 'Convey meaning through gesture and expression', icon: 'fa-sign-language' },
      optionB: { title: 'Verbal mastery', description: 'Use words as your primary tool of influence', icon: 'fa-quote-right' }
    }
  ],

  'CON-INT': [
    {
      optionA: { title: 'Physical resilience', description: 'Push through challenges using sheer endurance and toughness', icon: 'fa-heart' },
      optionB: { title: 'Mental problem-solving', description: 'Overcome obstacles through clever thinking and analysis', icon: 'fa-brain' }
    },
    {
      optionA: { title: 'Steady persistence', description: 'Keep working steadily until the job is done', icon: 'fa-mountain' },
      optionB: { title: 'Efficient methods', description: 'Find the smartest way to accomplish your goals', icon: 'fa-lightbulb' }
    },
    {
      optionA: { title: 'Natural immunity', description: 'Resist diseases, poisons, and environmental hazards', icon: 'fa-shield' },
      optionB: { title: 'Learned resistance', description: 'Understand threats well enough to counter them effectively', icon: 'fa-book-medical' }
    },
    {
      optionA: { title: 'Enduring effort', description: 'Accomplish great things through sustained hard work', icon: 'fa-clock' },
      optionB: { title: 'Breakthrough insights', description: 'Achieve success through moments of brilliant realization', icon: 'fa-star' }
    },
    {
      optionA: { title: 'Practical experience', description: 'Learn what works through trial and real-world testing', icon: 'fa-tools' },
      optionB: { title: 'Theoretical understanding', description: 'Master concepts through study and logical analysis', icon: 'fa-graduation-cap' }
    },
    {
      optionA: { title: 'Marathon mindset', description: 'Excel in long-term projects requiring sustained effort', icon: 'fa-road' },
      optionB: { title: 'Sprint solutions', description: 'Solve problems quickly through intense mental focus', icon: 'fa-bolt' }
    }
  ],

  'CON-WIS': [
    {
      optionA: { title: 'Physical endurance', description: 'Outlast others through superior stamina and health', icon: 'fa-heart' },
      optionB: { title: 'Emotional stability', description: 'Maintain inner peace regardless of external chaos', icon: 'fa-balance-scale' }
    },
    {
      optionA: { title: 'Steady determination', description: 'Push forward relentlessly toward your goals', icon: 'fa-mountain' },
      optionB: { title: 'Patient wisdom', description: 'Know when to act and when to wait for better timing', icon: 'fa-hourglass' }
    },
    {
      optionA: { title: 'Natural toughness', description: 'Weather any storm through innate resilience', icon: 'fa-shield' },
      optionB: { title: 'Inner strength', description: 'Draw power from deep spiritual reserves', icon: 'fa-meditation' }
    },
    {
      optionA: { title: 'Consistent effort', description: 'Make steady progress through regular, sustained work', icon: 'fa-clock' },
      optionB: { title: 'Mindful action', description: 'Act with full awareness and consideration of consequences', icon: 'fa-eye' }
    },
    {
      optionA: { title: 'Survival instincts', description: 'Thrive in harsh conditions through biological adaptation', icon: 'fa-leaf' },
      optionB: { title: 'Intuitive understanding', description: 'Perceive truth through instinct and inner knowing', icon: 'fa-compass' }
    },
    {
      optionA: { title: 'Stubborn resolve', description: 'Refuse to give up no matter how difficult things become', icon: 'fa-fist-raised' },
      optionB: { title: 'Flexible acceptance', description: 'Adapt to circumstances with grace and understanding', icon: 'fa-water' }
    }
  ],

  'CON-CHA': [
    {
      optionA: { title: 'Reliable strength', description: 'Be the dependable foundation others can count on', icon: 'fa-heart' },
      optionB: { title: 'Inspiring leadership', description: 'Motivate others to achieve more than they thought possible', icon: 'fa-flag' }
    },
    {
      optionA: { title: 'Steady presence', description: 'Provide stability and consistency in turbulent times', icon: 'fa-anchor' },
      optionB: { title: 'Dynamic energy', description: 'Energize groups with your enthusiasm and passion', icon: 'fa-fire' }
    },
    {
      optionA: { title: 'Enduring commitment', description: 'Stand by your principles and promises no matter what', icon: 'fa-handshake' },
      optionB: { title: 'Adaptive diplomacy', description: 'Build relationships and find common ground with anyone', icon: 'fa-users' }
    },
    {
      optionA: { title: 'Quiet strength', description: 'Lead by example through consistent, reliable action', icon: 'fa-mountain' },
      optionB: { title: 'Vocal advocacy', description: 'Champion causes and rally others to important missions', icon: 'fa-bullhorn' }
    },
    {
      optionA: { title: 'Personal resilience', description: 'Bounce back from setbacks stronger than before', icon: 'fa-shield' },
      optionB: { title: 'Social recovery', description: 'Help communities heal and rebuild after disasters', icon: 'fa-hands-helping' }
    },
    {
      optionA: { title: 'Individual determination', description: 'Achieve goals through personal grit and perseverance', icon: 'fa-running' },
      optionB: { title: 'Team building', description: 'Accomplish more by bringing out the best in others', icon: 'fa-users-cog' }
    }
  ],

  'INT-WIS': [
    {
      optionA: { title: 'Analytical thinking', description: 'Break down complex problems using logic and reason', icon: 'fa-brain' },
      optionB: { title: 'Intuitive understanding', description: 'Grasp truth through instinct and inner knowing', icon: 'fa-eye' }
    },
    {
      optionA: { title: 'Book learning', description: 'Gain knowledge through study and formal education', icon: 'fa-book' },
      optionB: { title: 'Life experience', description: 'Learn wisdom through living and observing the world', icon: 'fa-tree' }
    },
    {
      optionA: { title: 'Systematic approach', description: 'Apply proven methods and established procedures', icon: 'fa-cog' },
      optionB: { title: 'Holistic perception', description: 'See the big picture and understand interconnections', icon: 'fa-globe' }
    },
    {
      optionA: { title: 'Innovation and invention', description: 'Create new solutions through scientific advancement', icon: 'fa-lightbulb' },
      optionB: { title: 'Ancient wisdom', description: 'Apply timeless truths to modern challenges', icon: 'fa-scroll' }
    },
    {
      optionA: { title: 'Precise measurement', description: 'Quantify and analyze everything for accurate understanding', icon: 'fa-ruler' },
      optionB: { title: 'Qualitative insight', description: 'Understand meaning and significance beyond mere numbers', icon: 'fa-heart' }
    },
    {
      optionA: { title: 'Academic expertise', description: 'Master specialized knowledge in specific fields', icon: 'fa-graduation-cap' },
      optionB: { title: 'Practical wisdom', description: 'Apply common sense and good judgment to daily life', icon: 'fa-balance-scale' }
    }
  ],

  'INT-CHA': [
    {
      optionA: { title: 'Logical persuasion', description: 'Convince others through facts, evidence, and reason', icon: 'fa-brain' },
      optionB: { title: 'Emotional appeal', description: 'Move others through passion and heartfelt connection', icon: 'fa-heart' }
    },
    {
      optionA: { title: 'Technical expertise', description: 'Gain respect through superior knowledge and skill', icon: 'fa-cog' },
      optionB: { title: 'Social connection', description: 'Build influence through relationships and rapport', icon: 'fa-users' }
    },
    {
      optionA: { title: 'Detailed planning', description: 'Organize complex projects with precision and foresight', icon: 'fa-clipboard-list' },
      optionB: { title: 'Inspiring vision', description: 'Rally others around a compelling future possibility', icon: 'fa-eye' }
    },
    {
      optionA: { title: 'Scholarly teaching', description: 'Share knowledge through structured, methodical instruction', icon: 'fa-chalkboard-teacher' },
      optionB: { title: 'Motivational speaking', description: 'Inspire others to action through powerful oratory', icon: 'fa-microphone' }
    },
    {
      optionA: { title: 'Research and discovery', description: 'Expand human knowledge through careful investigation', icon: 'fa-search' },
      optionB: { title: 'Public communication', description: 'Make complex ideas accessible to broad audiences', icon: 'fa-broadcast-tower' }
    },
    {
      optionA: { title: 'Behind-the-scenes work', description: 'Create solutions and systems that others can use', icon: 'fa-tools' },
      optionB: { title: 'Public recognition', description: 'Take credit and responsibility for achievements openly', icon: 'fa-trophy' }
    }
  ],

  'WIS-CHA': [
    {
      optionA: { title: 'Quiet wisdom', description: 'Guide others through gentle counsel and patient listening', icon: 'fa-eye' },
      optionB: { title: 'Inspiring leadership', description: 'Rally others through passionate speeches and vision', icon: 'fa-flag' }
    },
    {
      optionA: { title: 'Spiritual insight', description: 'Understand deeper truths about life and existence', icon: 'fa-meditation' },
      optionB: { title: 'Social influence', description: 'Shape society through force of personality and charm', icon: 'fa-users' }
    },
    {
      optionA: { title: 'Natural harmony', description: 'Find peace by living in balance with the world', icon: 'fa-leaf' },
      optionB: { title: 'Cultural creation', description: 'Build new traditions and inspire artistic movements', icon: 'fa-palette' }
    },
    {
      optionA: { title: 'Inner development', description: 'Focus on personal growth and self-improvement', icon: 'fa-seed' },
      optionB: { title: 'External impact', description: 'Change the world through your influence on others', icon: 'fa-globe' }
    },
    {
      optionA: { title: 'Humble service', description: 'Help others without seeking recognition or reward', icon: 'fa-hands-helping' },
      optionB: { title: 'Charismatic performance', description: 'Entertain and inspire through public presentation', icon: 'fa-theater-masks' }
    },
    {
      optionA: { title: 'Contemplative practice', description: 'Gain understanding through meditation and reflection', icon: 'fa-om' },
      optionB: { title: 'Dynamic interaction', description: 'Learn and grow through engaging with diverse people', icon: 'fa-comments' }
    }
  ]
};

// Fisher-Yates shuffle for proper randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateQuestions(): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  let questionId = 0;

  // Generate 6 questions for each of the 15 stat pairings
  STAT_PAIRINGS.forEach(([statA, statB]) => {
    const pairKey = `${statA}-${statB}`;
    const scenarios = QUESTION_SCENARIOS[pairKey];
    
    if (scenarios) {
      scenarios.forEach((scenario) => {
        // Randomly determine if we should swap the answer positions
        const shouldSwap = Math.random() < 0.5;
        
        if (shouldSwap) {
          // Swap positions: optionA becomes optionB and vice versa
          questions.push({
            id: questionId++,
            statA: statB,  // Swap stats too
            statB: statA,
            optionA: scenario.optionB,  // Option B becomes A
            optionB: scenario.optionA   // Option A becomes B
          });
        } else {
          // Keep original order
          questions.push({
            id: questionId++,
            statA,
            statB,
            optionA: scenario.optionA,
            optionB: scenario.optionB
          });
        }
      });
    }
  });

  // Properly shuffle the questions using Fisher-Yates algorithm
  return shuffleArray(questions);
}
