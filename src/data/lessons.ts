import type { Goal, Lesson } from '@/types';

// ─── Goals ────────────────────────────────────────────────────────────────────

export const SMB_GOALS: Goal[] = [
  {
    id: 'smb-leads',
    label: 'Get More Leads',
    icon: '🎯',
    description: 'Use AI to find, attract, and qualify new customers faster.',

  },
  {
    id: 'smb-email',
    label: 'Write Better Emails',
    icon: '✉️',
    description: 'Craft compelling email copy that actually gets replies.',

  },
  {
    id: 'smb-admin',
    label: 'Automate Admin',
    icon: '⚙️',
    description: 'Cut down on repetitive tasks and free up your time.',

  },
  {
    id: 'smb-social',
    label: 'Social Media Content',
    icon: '📱',
    description: 'Generate consistent, on-brand content at scale.',

  },
  {
    id: 'smb-customer',
    label: 'Better Customer Service',
    icon: '💬',
    description: 'Respond faster and more consistently to customers.',

  },
  {
    id: 'smb-strategy',
    label: 'Business Strategy',
    icon: '📊',
    description: 'Use AI as a thinking partner for planning and decisions.',

  },
];


// ─── SMB Lessons ──────────────────────────────────────────────────────────────

export const SMB_LESSONS: Lesson[] = [
  {
    id: 'smb-day-1',
    day: 1,
    title: 'Set Up Your AI Toolkit',
    subtitle: 'The right tools in 30 minutes',
    description: 'Get the essential AI tools running for your business — no tech background needed. You\'ll end this lesson with a working setup and your first successful prompt.',
    estimatedMinutes: 15,
    skillTags: ['tools', 'prompting'],

    goalIds: ['smb-leads', 'smb-email', 'smb-admin', 'smb-social', 'smb-customer'],
    criticalThinkingPrompts: [
      'What assumptions is the AI making about your business type?',
      'What information did you NOT give the AI that might make the output wrong?',
      'What would a customer think if they saw this AI-generated output raw — without your review?',
    ],
    microtask: 'Write one sentence describing your business, then paste it into ChatGPT and ask: "What are 3 things a small business like mine should use AI for?" Paste the output in the reflection box.',
    steps: [
      {
        id: 'smb-1-1',
        type: 'text',
        title: 'Why AI tools matter right now',
        content: 'Small businesses that adopt AI early get an asymmetric advantage — they can produce content, respond to leads, and handle admin at the speed of a company 10× their size. The good news: the best tools are free or cheap, and you don\'t need a developer.\n\nThe three tools you\'ll use in this course:\n• **ChatGPT (or Claude)** — your AI writing and thinking assistant\n• **Notion AI** or Google Docs with Gemini — for document-based work\n• **Make (formerly Integromat)** — for automation (we introduce this in Day 6)',
      },
      {
        id: 'smb-1-2',
        type: 'text',
        title: 'The golden rule of AI for business',
        content: 'AI is a **first-draft machine**, not a finished-product machine.\n\nEvery output needs your eyes before it goes anywhere near a customer. Think of it like hiring an incredibly fast intern — bright, eager, but prone to confident mistakes. Your job is to direct them clearly and review everything they produce.',
      },
      {
        id: 'smb-1-3',
        type: 'task',
        title: 'Your first business prompt',
        content: 'Open ChatGPT (chat.openai.com) and try this prompt:\n\n*"I run a [your business type] serving [your target customer]. Give me 5 ways I could use AI to save time or get more customers this month."*\n\nPaste your favorite result below.',
        placeholder: 'Paste the AI output or your favorite suggestion here...',
      },
      {
        id: 'smb-1-4',
        type: 'reflection',
        title: 'First impressions',
        content: 'Now read that output critically. Which suggestions feel genuinely useful vs. generic?',
        placeholder: 'What felt useful? What felt too generic or wrong for your situation?',
      },
    ],
    nextLessonTeaser: 'Day 2: We\'ll use AI to build your first lead generation workflow',
  },
  {
    id: 'smb-day-2',
    day: 2,
    title: 'AI for Lead Generation',
    subtitle: 'Find and warm up customers at scale',
    description: 'Build prompts and workflows that identify potential customers, craft personalised outreach, and help you qualify leads faster — without sounding like a robot.',
    estimatedMinutes: 20,
    skillTags: ['prompting', 'copywriting', 'strategy'],

    goalIds: ['smb-leads', 'smb-email'],
    criticalThinkingPrompts: [
      'Does this outreach message make claims about your product that are accurate and verifiable?',
      'Would you be comfortable if the recipient knew AI wrote the first draft?',
      'What could go wrong if you send this message to 100 people without changing it?',
    ],
    microtask: 'Take an AI-written outreach message and find ONE thing that could be factually wrong or misleading. Fix it.',
    steps: [
      {
        id: 'smb-2-1',
        type: 'text',
        title: 'The lead gen problem AI solves',
        content: 'Most small business owners spend 3–5 hours a week on prospecting that could be done in 20 minutes with the right prompts. AI can help you:\n\n• Identify your ideal customer profile (ICP)\n• Write personalised outreach at scale\n• Draft follow-up sequences\n• Qualify inbound leads quickly\n\nThe key: **specificity in, specificity out.** Vague prompts produce vague copy.',
      },
      {
        id: 'smb-2-2',
        type: 'example',
        title: 'The ICP prompt',
        content: '**Weak prompt:** "Write me a cold email for my business."\n\n**Strong prompt:** "I\'m a freelance brand designer who specialises in eco-conscious consumer goods companies. My ideal client is a founder or marketing director at a product brand doing $1M–$10M in revenue who has never worked with a dedicated brand designer. Write a 3-sentence cold email that leads with a specific pain they\'d recognise immediately, offers proof in one line, and ends with a low-friction CTA."\n\nThe second prompt gives the AI a character to play, a target to aim at, and a format to follow.',
      },
      {
        id: 'smb-2-3',
        type: 'task',
        title: 'Write your ICP prompt',
        content: 'Using the structure above, write a detailed prompt for YOUR business outreach. Then run it and paste the result below.',
        placeholder: 'Paste your prompt and the AI output here...',
      },
      {
        id: 'smb-2-4',
        type: 'reflection',
        title: 'Accuracy check',
        content: 'Read the email the AI wrote. Does it make any claim about your product or service that isn\'t 100% accurate? Does it sound like YOU?',
        placeholder: 'What needed to change? What did you keep?',
      },
    ],
    nextLessonTeaser: 'Day 3: Write email copy that converts — subject lines, sequences, and CTAs',
  },
  {
    id: 'smb-day-3',
    day: 3,
    title: 'Email Copy That Converts',
    subtitle: 'Subject lines, sequences, and CTAs',
    description: 'Master the art of AI-assisted email marketing — from welcome sequences to promotional blasts — while keeping your brand voice intact.',
    estimatedMinutes: 25,
    skillTags: ['copywriting', 'prompting'],

    goalIds: ['smb-email', 'smb-leads'],
    criticalThinkingPrompts: [
      'Does this email promise something your product can actually deliver?',
      'What would a sceptical customer think reading this for the first time?',
      'Is the subject line honest, or is it clickbait that could damage trust?',
    ],
    microtask: 'Run the "subject line stress test": take an AI-generated subject line, ask ChatGPT to steelman why a cynical reader might delete it unread, then improve it.',
    steps: [
      {
        id: 'smb-3-1',
        type: 'text',
        title: 'Email anatomy and AI\'s role',
        content: 'A high-converting email has 5 components: subject line, preview text, opener, body, and CTA. AI excels at generating variations fast — especially subject lines and openers, which most business owners find hardest.\n\n**What AI does well:** Variations, structure, filling in blanks with your inputs.\n**What AI does poorly:** Knowing your specific customer relationship, your real brand voice, or whether a claim is true.',
      },
      {
        id: 'smb-3-2',
        type: 'task',
        title: 'Generate 10 subject lines',
        content: 'Choose one email you need to send this week. Use this prompt:\n\n*"Generate 10 subject line options for an email about [topic] going to [audience]. Vary the tone: include 3 curiosity-driven, 3 benefit-focused, 2 urgency-based, and 2 conversational. No emojis unless I specify."*\n\nPaste the results below.',
        placeholder: 'Paste your 10 subject lines here...',
      },
      {
        id: 'smb-3-3',
        type: 'reflection',
        title: 'The edit pass',
        content: 'Pick your top 3. For each one: does it make a promise, hint, or claim? Is that claim true?',
        placeholder: 'Your top 3 subject lines and your honesty check on each...',
      },
    ],
  },
  {
    id: 'smb-day-4',
    day: 4,
    title: 'Critical Thinking Before You Post',
    subtitle: 'The 3-question verification habit',
    description: 'Build the habit of running every AI output through a quick verification check before it reaches customers. One missed error can cost real trust.',
    estimatedMinutes: 20,
    skillTags: ['critical-thinking', 'verification'],

    goalIds: ['smb-leads', 'smb-email', 'smb-social', 'smb-customer'],
    criticalThinkingPrompts: [
      'What is the single most dangerous assumption in this output?',
      'If this output is wrong, what\'s the worst realistic outcome for your business?',
      'What would you need to verify before you\'d be comfortable a journalist reading this?',
    ],
    microtask: 'Find a real AI output you\'ve produced this week (or in this course). Apply the 3-question check below to it.',
    steps: [
      {
        id: 'smb-4-1',
        type: 'text',
        title: 'Why AI outputs fail in business',
        content: 'AI makes three types of errors that are especially dangerous for small businesses:\n\n1. **Hallucinated facts** — stats, prices, product features, or claims that sound real but aren\'t\n2. **Off-brand tone** — text that doesn\'t sound like you and erodes authenticity\n3. **Legal grey zones** — claims about results, testimonials, or comparisons that might violate advertising standards\n\nThe fix isn\'t to stop using AI — it\'s to build a 2-minute review habit.',
      },
      {
        id: 'smb-4-2',
        type: 'text',
        title: 'The 3-question check',
        content: 'Before publishing any AI-generated content, ask:\n\n**Q1: Is every factual claim in this verifiable?**\nIf AI says "Studies show 73% of customers prefer..." — can you find that study? If not, cut it or rephrase.\n\n**Q2: Does this sound like ME, or like generic AI?**\nRead it aloud. Does it use phrases you\'d never say? Would a regular customer recognise your voice?\n\n**Q3: Could this mislead or disappoint someone?**\nAre you implying results you can\'t guarantee? Making comparisons to competitors that aren\'t fair?',
      },
      {
        id: 'smb-4-3',
        type: 'task',
        title: 'Run the check on real output',
        content: 'Paste a piece of AI-generated content (from this course or elsewhere) and run all 3 questions on it below.',
        placeholder: 'Content to check:\n\nQ1 - Verifiable facts?\nQ2 - Sounds like me?\nQ3 - Could it mislead?',
      },
    ],
  },
  {
    id: 'smb-day-5',
    day: 5,
    title: 'AI for Customer Service',
    subtitle: 'Scripts, FAQs, and faster responses',
    description: 'Build an AI-powered customer service system — response templates, FAQ documents, and escalation scripts — that saves hours each week without losing the human touch.',
    estimatedMinutes: 20,
    skillTags: ['prompting', 'automation', 'copywriting'],

    goalIds: ['smb-customer', 'smb-admin'],
    criticalThinkingPrompts: [
      'Does this response template make your business sound robotic or evasive?',
      'Is there a scenario where using this template would make a customer more upset?',
      'What nuance does this script miss that a human rep would naturally pick up?',
    ],
    microtask: 'Write an AI response template for your single most common customer question. Test it by asking: "Would I be happy receiving this message?"',
    steps: [
      {
        id: 'smb-5-1',
        type: 'text',
        title: 'Customer service: where AI pays for itself fast',
        content: 'The average small business owner spends 6+ hours/week on repetitive customer queries. The top 5–10 questions usually account for 80% of volume. AI can draft response templates so good you\'ll forget you didn\'t write them — as long as you review them for accuracy and tone.',
      },
      {
        id: 'smb-5-2',
        type: 'task',
        title: 'Build your FAQ response bank',
        content: 'List your top 5 customer questions, then use this prompt for each:\n\n*"Write a friendly, concise response to this customer question: [question]. My business is [description]. The answer is [your actual answer]. Tone: warm but professional. Length: 3–5 sentences. End with an offer to help further."*\n\nPaste your best response below.',
        placeholder: 'Your customer question + the AI draft response...',
      },
      {
        id: 'smb-5-3',
        type: 'reflection',
        title: 'The human touch audit',
        content: 'Read the draft aloud. What one sentence would a real person add that AI didn\'t include?',
        placeholder: 'What\'s missing? What would make this feel more human?',
      },
    ],
  },
  {
    id: 'smb-day-6',
    day: 6,
    title: 'Automate Your Admin',
    subtitle: 'Workflows that run without you',
    description: 'Set up your first AI-powered automation — from invoice reminders to social post scheduling — using no-code tools. Save 5+ hours a week by the end of this lesson.',
    estimatedMinutes: 30,
    skillTags: ['automation', 'tools'],

    goalIds: ['smb-admin'],
    criticalThinkingPrompts: [
      'What happens if this automation sends the wrong message to the wrong person?',
      'Is there a step in this workflow where a human must review before it runs?',
      'What\'s the failure mode — and do you have a way to catch it?',
    ],
    microtask: 'Map one repetitive task you do at least 3× per week. Write it as a simple "IF this happens → THEN do this" statement.',
    steps: [
      {
        id: 'smb-6-1',
        type: 'text',
        title: 'The automation mindset',
        content: 'Automation isn\'t about replacing human judgment — it\'s about removing the moments where you\'re just a human copy-paste machine. The best automation handles the routine so you can focus on the irreplaceable.\n\n**Tools you\'ll use:**\n• **Make.com** — connects apps and runs automations (free tier available)\n• **Zapier** — simpler but more limited on free tier\n• **Notion AI** — for document-based automations',
      },
      {
        id: 'smb-6-2',
        type: 'task',
        title: 'Design your first automation',
        content: 'Choose one of these starter automations:\n\n• New form submission → AI-written welcome email\n• New invoice sent → reminder schedule created\n• Weekly → social post drafted and saved in Notion\n\nDescribe the automation you\'d build and the steps it would take.',
        placeholder: 'Describe your automation: what triggers it, what it does, what it outputs...',
      },
    ],
    nextLessonTeaser: 'Day 7: Your first complete AI campaign — putting everything together',
  },
  {
    id: 'smb-day-7',
    day: 7,
    title: 'Your First AI Campaign',
    subtitle: 'End-to-end in one session',
    description: 'Build a complete mini-campaign from scratch using everything you\'ve learned — targeting, copy, email, social, and a verification pass — and ship something real.',
    estimatedMinutes: 35,
    skillTags: ['strategy', 'copywriting', 'prompting', 'verification', 'critical-thinking'],

    goalIds: ['smb-leads', 'smb-email', 'smb-social'],
    criticalThinkingPrompts: [
      'What is this campaign\'s core promise — and can you deliver it?',
      'What would a competitor or cynic say about this campaign?',
      'If this campaign underperforms, what\'s the most likely reason — and how would you know?',
    ],
    microtask: 'Share one complete AI-assisted campaign asset (email, social post, or landing page intro) you\'ve actually sent or scheduled.',
    steps: [
      {
        id: 'smb-7-1',
        type: 'text',
        title: 'The campaign checklist',
        content: 'A complete small business campaign has: a goal, an audience, a message, a channel, and a call to action. AI can help with all of them — but YOU need to define the goal and the truth behind the message.\n\n**Your campaign brief:**\n1. Goal: What do you want people to do?\n2. Audience: Who exactly is this for?\n3. Message: What problem does this solve for them?\n4. Channel: Email? Instagram? LinkedIn?\n5. CTA: What\'s the one thing they should do next?',
      },
      {
        id: 'smb-7-2',
        type: 'task',
        title: 'Build your campaign brief',
        content: 'Fill in all 5 elements of your campaign brief. Then paste it into ChatGPT and ask it to write the copy for your chosen channel.',
        placeholder: 'Goal:\nAudience:\nMessage:\nChannel:\nCTA:\n\n---\nAI-generated copy:',
      },
      {
        id: 'smb-7-3',
        type: 'reflection',
        title: 'Final verification pass',
        content: 'Run the Day 4 three-question check on your campaign copy before you use it.',
        placeholder: 'Q1 - Verifiable?\nQ2 - Sounds like me?\nQ3 - Could mislead?',
      },
    ],
  },
];

// ─── Helper functions ─────────────────────────────────────────────────────────

export function getLessons(): Lesson[] {
  return SMB_LESSONS;
}

export function getLessonById(id: string): Lesson | undefined {
  return SMB_LESSONS.find(l => l.id === id);
}

export function getGoals(): Goal[] {
  return SMB_GOALS;
}

export function getRecommendedLesson(completedIds: string[]): Lesson | null {
  return SMB_LESSONS.find(l => !completedIds.includes(l.id)) ?? null;
}

// Legacy aliases kept for call-site compatibility
export const getLessonsForRole = (_role: string) => getLessons();
export const getGoalsForRole = (_role: string) => getGoals();

// ─── (removed) Student Lessons ───────────────────────────────────────────────
const _STUDENT_LESSONS_REMOVED = [
  {
    id: 'stu-day-1',
    day: 1,
    title: 'Set Up Your AI Learning Stack',
    subtitle: 'Tools that make studying smarter, not lazier',
    description: 'Get the right AI tools set up for academic work. You\'ll end this lesson with a working setup, clear rules for ethical use, and your first successful study prompt.',
    estimatedMinutes: 15,
    skillTags: ['tools', 'prompting'],
    role: 'student',
    goalIds: ['stu-research', 'stu-writing', 'stu-study'],
    criticalThinkingPrompts: [
      'What is the AI assuming about the topic you asked about?',
      'What background knowledge is the AI relying on that you can\'t see?',
      'Could this explanation be confidently wrong? How would you check?',
    ],
    microtask: 'Pick one concept you\'re currently studying. Ask AI to explain it in 3 different ways: like you\'re 10, like you\'re a university student, and like you\'re a professional. Compare them.',
    steps: [
      {
        id: 'stu-1-1',
        type: 'text',
        title: 'AI as a study partner, not a ghostwriter',
        content: 'The most common mistake students make with AI is using it to DO the work instead of using it to UNDERSTAND the work. That\'s not just an integrity issue — it means you miss the learning and show up to exams, presentations, and jobs without the skills you\'re supposed to have.\n\n**AI is best used for:**\n• Explaining concepts you don\'t understand\n• Generating practice questions\n• Giving feedback on drafts you wrote\n• Summarising long texts so you can engage with them more efficiently\n\n**AI is a trap when used for:**\n• Writing submissions you haven\'t drafted yourself\n• Researching facts without verifying sources\n• Replacing thinking with text generation',
      },
      {
        id: 'stu-1-2',
        type: 'text',
        title: 'The 3 tools to know',
        content: '**ChatGPT / Claude** — general purpose tutor, brainstormer, and draft reviewer\n**Perplexity AI** — search-grounded AI that cites sources (better for research facts)\n**NotebookLM (Google)** — upload your own readings and have AI answer questions only from those sources\n\n*Rule: always know which tool you\'re using and what its limitations are.*',
      },
      {
        id: 'stu-1-3',
        type: 'task',
        title: 'Your first learning prompt',
        content: 'Pick a topic from your current coursework. Ask AI: *"Explain [topic] to me and then give me 3 questions I could be asked about it on an exam."*\n\nPaste the response below.',
        placeholder: 'Paste the AI explanation + exam questions here...',
      },
      {
        id: 'stu-1-4',
        type: 'reflection',
        title: 'Spot the gaps',
        content: 'Read the explanation critically. What did AI miss, oversimplify, or get wrong? What would your professor add?',
        placeholder: 'What gaps or errors did you notice?',
      },
    ],
    nextLessonTeaser: 'Day 2: Build a research system that finds and synthesises sources in minutes',
  },
  {
    id: 'stu-day-2',
    day: 2,
    title: 'Research & Note-Taking with AI',
    subtitle: 'Find, summarise, and organise faster',
    description: 'Build an AI-assisted research workflow — from finding good sources to synthesising them into structured notes — without losing academic rigour.',
    estimatedMinutes: 25,
    skillTags: ['research', 'prompting', 'verification'],
    role: 'student',
    goalIds: ['stu-research'],
    criticalThinkingPrompts: [
      'Did AI cite real, findable sources — or invent plausible-sounding ones?',
      'Is the summary accurate to what the original source actually said?',
      'What perspective or counterargument is missing from this synthesis?',
    ],
    microtask: 'Take one AI-generated summary of an article. Find the original article and check: did AI get the main argument right? What did it miss or distort?',
    steps: [
      {
        id: 'stu-2-1',
        type: 'text',
        title: 'The research workflow problem',
        content: 'Traditional research is slow: find a source, read it, highlight, transcribe, organise, repeat. AI can compress the "read and transcribe" step dramatically — but it can\'t replace your ability to evaluate whether a source is credible, relevant, or correctly interpreted.\n\n**The AI research workflow:**\n1. Find sources yourself (Google Scholar, library databases, Perplexity with citations)\n2. Paste the text into AI and ask for a structured summary\n3. Verify the summary against the original\n4. Ask AI to identify how this source relates to your argument',
      },
      {
        id: 'stu-2-2',
        type: 'example',
        title: 'The summarisation prompt',
        content: '**Weak:** "Summarise this article"\n\n**Strong:** *"Summarise this academic article in 150 words. Include: the main thesis, the methodology used, the key finding, and one limitation the authors acknowledge. Then tell me one question this source does NOT answer."*\n\nThe second prompt gives you something genuinely useful for a literature review — not just a paragraph that restates the abstract.',
      },
      {
        id: 'stu-2-3',
        type: 'task',
        title: 'Summarise a real source',
        content: 'Paste in a paragraph or two from something you\'re actually reading for a class. Use the strong prompt above to summarise it.',
        placeholder: 'Paste your source text + the AI summary here...',
      },
      {
        id: 'stu-2-4',
        type: 'reflection',
        title: 'Verification check',
        content: 'Compare the AI summary to the original. What did it miss? What did it misrepresent (even slightly)?',
        placeholder: 'Accuracy check: what matched? What was off?',
      },
    ],
  },
  {
    id: 'stu-day-3',
    day: 3,
    title: 'Writing & Editing with AI',
    subtitle: 'Better essays without letting AI write them',
    description: 'Use AI as a writing coach — for feedback, structure, and polish — while keeping the ideas and the authorship yours. This is the most important skill in this course.',
    estimatedMinutes: 25,
    skillTags: ['prompting', 'critical-thinking'],
    role: 'student',
    goalIds: ['stu-writing'],
    criticalThinkingPrompts: [
      'Does this AI feedback change what I\'m actually arguing, or just how I\'m saying it?',
      'Am I using AI to avoid the discomfort of thinking, or to amplify work I\'ve already done?',
      'If I submit this with AI-improved wording, am I confident I could defend every argument in a discussion?',
    ],
    microtask: 'Take a paragraph you\'ve written this week. Ask AI for 3 specific improvement suggestions. Accept only the ones you genuinely agree with after thinking about them.',
    steps: [
      {
        id: 'stu-3-1',
        type: 'text',
        title: 'The authorship line',
        content: 'There\'s a clear line between using AI to improve YOUR writing and using AI to replace YOUR thinking. Staying on the right side means:\n\n**Ethical uses:**\n• Asking AI to identify weak arguments in your draft\n• Getting grammar and clarity feedback\n• Asking AI to steelman your argument (argue against it) so you can strengthen it\n• Asking for alternative structures for an essay you\'ve already outlined\n\n**Integrity risks:**\n• Asking AI to write the intro and just editing it lightly\n• Feeding the essay prompt in without having written anything yourself\n• Accepting AI wording without understanding it',
      },
      {
        id: 'stu-3-2',
        type: 'task',
        title: 'The feedback prompt',
        content: 'Paste a paragraph you\'ve written into this prompt:\n\n*"I\'m a university student writing about [topic]. Here is a paragraph from my draft: [paragraph]. Give me 3 specific improvements I could make. For each suggestion, explain WHY it would improve the argument or clarity. Don\'t rewrite the paragraph for me."*\n\nPaste the feedback below.',
        placeholder: 'Your paragraph + AI\'s 3 suggestions...',
      },
      {
        id: 'stu-3-3',
        type: 'reflection',
        title: 'Your editorial decision',
        content: 'Of the 3 suggestions, which do you actually agree with? Which did you reject, and why?',
        placeholder: 'What you accepted, what you rejected, and your reasoning...',
      },
    ],
  },
  {
    id: 'stu-day-4',
    day: 4,
    title: "Critical Thinking: Don't Trust, Verify",
    subtitle: 'The habit that separates good students from great ones',
    description: 'Build the discipline to interrogate AI outputs before you use them — especially for facts, citations, and arguments. One unchecked AI error in a paper can be costly.',
    estimatedMinutes: 20,
    skillTags: ['critical-thinking', 'verification', 'research'],
    role: 'student',
    goalIds: ['stu-research', 'stu-writing', 'stu-integrity'],
    criticalThinkingPrompts: [
      'What is the most important factual claim in this output — and have you verified it?',
      'What would this argument look like from the opposing side?',
      'If this AI output is confidently wrong, what would the consequences be for your work?',
    ],
    microtask: 'Find one specific claim from an AI output you\'ve generated this week. Verify it using a primary source. Report what you found.',
    steps: [
      {
        id: 'stu-4-1',
        type: 'text',
        title: 'How AI fails students',
        content: 'AI makes three failure modes that can seriously damage student work:\n\n**1. Citation hallucination** — AI invents plausible-sounding academic references that don\'t exist. This is the most common and dangerous error. Always check citations.\n\n**2. Confident oversimplification** — AI presents nuanced debates as settled facts, and complex topics as cleaner than they are.\n\n**3. Outdated information** — AI training data has a cutoff date. For fast-moving fields (technology, politics, medicine), outputs can be months or years out of date.',
      },
      {
        id: 'stu-4-2',
        type: 'text',
        title: 'The verification habit',
        content: 'Every time you use AI for academic work, ask:\n\n**1. Is every fact checkable?** If AI cites a study, find it. If AI states a statistic, trace it to a primary source.\n\n**2. What\'s the date of this knowledge?** Is this a topic where currency matters? When was the AI\'s training cutoff?\n\n**3. What\'s the other side?** AI often presents the mainstream view. Ask: "What\'s the strongest counterargument to this?"',
      },
      {
        id: 'stu-4-3',
        type: 'task',
        title: 'The hallucination test',
        content: 'Ask AI: *"Cite 3 academic papers about [your current essay topic]."* Then try to find each paper in Google Scholar or your library database. Report what you find below.',
        placeholder: 'Paper 1: [AI citation] → Found? Real? Accurate description?\nPaper 2:\nPaper 3:',
      },
    ],
  },
  {
    id: 'stu-day-5',
    day: 5,
    title: 'AI for Study Plans & Exam Prep',
    subtitle: 'Personalised studying that actually sticks',
    description: 'Build an AI-powered study system — from custom flashcards to practice exams — that adapts to what YOU need to learn, not a generic curriculum.',
    estimatedMinutes: 20,
    skillTags: ['prompting', 'tools'],
    role: 'student',
    goalIds: ['stu-study'],
    criticalThinkingPrompts: [
      'Does this practice question actually test understanding, or just memorisation?',
      'Is the AI\'s explanation of why an answer is correct actually accurate?',
      'What topics is AI NOT covering that your professor has emphasised?',
    ],
    microtask: 'Generate 5 practice questions on a topic you\'re studying. Answer them from memory first, then check the AI\'s answers. Where were you wrong?',
    steps: [
      {
        id: 'stu-5-1',
        type: 'text',
        title: 'Why AI study tools work',
        content: 'The best study techniques — spaced repetition, retrieval practice, elaborative interrogation — are exactly what AI can operationalise at scale. Instead of passively rereading notes, AI can quiz you, identify weak spots, and generate explanations tailored to your level.',
      },
      {
        id: 'stu-5-2',
        type: 'task',
        title: 'Build a study session',
        content: 'Use this prompt:\n\n*"I have an exam on [topic] in [timeframe]. Based on these notes/concepts: [paste your notes], create a 10-question practice quiz with a mix of multiple choice and short answer. After I answer, identify which concepts I should focus on most."*\n\nPaste the quiz below.',
        placeholder: 'Your AI-generated practice quiz...',
      },
      {
        id: 'stu-5-3',
        type: 'reflection',
        title: 'Study audit',
        content: 'After doing the quiz: what did you get wrong? What did the AI miss that your professor emphasised in lectures?',
        placeholder: 'Your weak spots + gaps between AI quiz and real exam focus...',
      },
    ],
  },
  {
    id: 'stu-day-6',
    day: 6,
    title: 'Presentations & Content Creation',
    subtitle: 'Slides, visuals, and compelling storytelling',
    description: 'Use AI to structure, script, and enhance presentations — from outline to delivery notes — while making sure the ideas and insight are authentically yours.',
    estimatedMinutes: 20,
    skillTags: ['prompting', 'copywriting'],
    role: 'student',
    goalIds: ['stu-content'],
    criticalThinkingPrompts: [
      'Does this slide structure tell a coherent story, or just list information?',
      'Which slide makes a claim I can\'t fully support with evidence?',
      'If someone asks me a question about slide 3 in Q&A, am I confident I can answer it?',
    ],
    microtask: 'Take one slide from a presentation you\'re building. Ask AI to critique its clarity and persuasiveness. Implement the best suggestion.',
    steps: [
      {
        id: 'stu-6-1',
        type: 'text',
        title: 'The presentation structure problem',
        content: 'Most student presentations fail not because of bad slides, but bad structure. AI is excellent at turning a brain-dump of ideas into a clear narrative arc.\n\n**Ideal prompt structure:**\n1. Give AI your topic and argument\n2. Ask for a 5-7 slide outline with one key point per slide\n3. Ask it to identify the "so what?" for each point\n4. Use the outline to build slides yourself, with AI generating speaker notes',
      },
      {
        id: 'stu-6-2',
        type: 'task',
        title: 'Structure a presentation',
        content: 'Use this prompt:\n\n*"I\'m presenting on [topic] to [audience] for [class/purpose]. My main argument is [thesis]. Create a 6-slide presentation outline. For each slide: title, 3 bullet points, and one question the audience might ask. Identify which slide will be hardest to make compelling."*',
        placeholder: 'Your AI presentation outline...',
      },
    ],
  },
  {
    id: 'stu-day-7',
    day: 7,
    title: 'Academic Integrity & AI',
    subtitle: 'Using AI without crossing the line',
    description: 'Develop your own clear framework for ethical AI use in academic work — one you can defend to any professor, and that actually protects your long-term learning.',
    estimatedMinutes: 25,
    skillTags: ['critical-thinking', 'research'],
    role: 'student',
    goalIds: ['stu-integrity', 'stu-writing'],
    criticalThinkingPrompts: [
      'Could you fully explain and defend this work in a verbal exam without the AI output?',
      'Am I using AI to avoid the discomfort of thinking, or to do more ambitious work?',
      'What would you do if a professor asked you to describe exactly how you used AI in this assignment?',
    ],
    microtask: 'Write your personal AI use policy in 3 sentences. What will you use AI for? What won\'t you use it for? How will you disclose it?',
    steps: [
      {
        id: 'stu-7-1',
        type: 'text',
        title: 'The real risk of AI misuse',
        content: 'The risk isn\'t just academic consequences — it\'s a skills deficit you carry forward. The student who uses AI to avoid writing essays will struggle in job interviews, client meetings, and high-stakes situations where AI isn\'t available.\n\n**A useful test:** Could you pass an oral exam where you defend every argument in your submission? If yes, your AI use is probably fine. If no, you\'ve outsourced your thinking.\n\nMost institutions now have nuanced AI policies — not blanket bans. Understand your institution\'s specific rules, and err on the side of disclosure.',
      },
      {
        id: 'stu-7-2',
        type: 'text',
        title: 'The ethical framework',
        content: '**GREEN ZONE — generally fine:**\n• Using AI to explain concepts you\'re studying\n• Getting feedback on work you drafted\n• Generating practice questions\n• Checking grammar (like Grammarly has done for years)\n\n**YELLOW ZONE — check your institution\'s rules:**\n• Using AI to suggest structural changes to your argument\n• Using AI-generated outlines as the basis for your structure\n• Translating your ideas from notes into polished prose with AI help\n\n**RED ZONE — academic misconduct risk:**\n• Submitting AI-generated text as your own without disclosure\n• Using AI to answer exam questions\n• Fabricating citations AI invented',
      },
      {
        id: 'stu-7-3',
        type: 'task',
        title: 'Write your AI policy',
        content: 'Write a 3-sentence personal AI use policy you\'d be comfortable showing a professor.',
        placeholder: 'I will use AI for...\nI will not use AI for...\nI will disclose AI use by...',
      },
      {
        id: 'stu-7-4',
        type: 'reflection',
        title: 'Course reflection',
        content: 'Looking back at this week: what\'s the most valuable AI habit you\'ve built? What do you still want to get better at?',
        placeholder: 'My biggest takeaway... and what I want to keep improving...',
      },
    ],
  },
];


export const SKILL_TAG_LABELS: Record<string, string> = {
  prompting: 'Prompting',
  verification: 'Verification',
  automation: 'Automation',
  copywriting: 'Copywriting',
  research: 'Research',
  strategy: 'Strategy',
  'critical-thinking': 'Critical Thinking',
  tools: 'Tools Setup',
};

export const SKILL_TAG_COLORS: Record<string, string> = {
  prompting:          'bg-moss-100 text-moss-600',
  verification:       'bg-stone-300 text-ink-700',
  automation:         'bg-moss-100 text-moss-500',
  copywriting:        'bg-stone-200 text-ink-600',
  research:           'bg-stone-200 text-ink-600',
  strategy:           'bg-moss-100 text-moss-600',
  'critical-thinking':'bg-stone-300 text-ink-700',
  tools:              'bg-stone-200 text-ink-600',
};
