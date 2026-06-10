/* ══════════════════════════════════════════════
   ASSC PORTFOLIO — CHATBOT.JS
   Justin's AI Assistant — Resume-Based Q&A
   ══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     KNOWLEDGE BASE — Built from Justin's Resume
  ───────────────────────────────────────────── */
  const KB = {
    name: 'Justin Gerald Loleng',
    role: 'Aspiring Software Engineer / Full-Stack Developer',
    email: 'lolengjustingerald@gmail.com',
    github: 'https://github.com/justinloleng',
    linkedin: 'https://www.linkedin.com/in/justin-gerald-loleng-b0134834a/',

    education: {
      degree: 'Bachelor of Science in Information Technology',
      major: 'Major in Mobile and Web Technologies',
      school: 'Pangasinan State University Urdaneta Campus',
      location: 'Urdaneta, Pangasinan, Philippines',
      graduated: '2025',
      relevantCourses: ['Mobile App Development', 'Web Development', 'Data Structures & Algorithms', 'Database Management', 'Software Engineering']
    },

    summary: `Aspiring Software Engineer passionate about building dynamic and user-friendly web applications. 
Specializes in the MERN stack — MongoDB, Express.js, React, Node.js. 
Recently completed studies and is eager to apply knowledge in a professional team environment and contribute to impactful projects. 
Crafting digital experiences with a touch of street culture.`,

    skills: {
      languages: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Dart', 'HTML', 'CSS'],
      frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'Flutter', 'GSAP', 'Bootstrap'],
      backend: ['Node.js', 'Express.js', 'Flask', 'Laravel'],
      databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLAlchemy'],
      tools: ['Git', 'GitHub', 'Figma', 'Postman', 'Socket.io', 'REST APIs', 'Monaco Editor'],
      other: ['OpenAI API', 'Stripe API', 'Chart.js', 'WebSockets']
    },

    projects: [
      {
        name: 'PVP Coding Wars',
        id: '747',
        type: 'Real-time / Competitive',
        description: 'A real-time competitive coding platform. Live code execution environment allowing users to solve challenges against opponents in synchronized battle rooms.',
        tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Socket.io', 'Monaco Editor'],
        highlights: ['Real-time battle rooms', 'Live code execution', 'WebSocket synchronization', 'MERN stack']
      },
      {
        name: 'WebPath',
        type: 'AI / E-Learning',
        description: 'An adaptive learning platform generating personalized educational paths. RESTful API with OpenAI integration for custom quiz question generation based on user progress.',
        tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'OpenAI API'],
        link: 'https://webpaths-vtjf.vercel.app',
        highlights: ['OpenAI integration', 'Adaptive learning paths', 'Custom quiz generation', 'RESTful API']
      },
      {
        name: 'SatisTrack',
        type: 'HR / Analytics',
        description: 'Internal HR tool for anonymous pulse surveys and company morale tracking. Dynamic Chart.js visualizations of satisfaction trends providing clear, actionable data.',
        tech: ['PHP', 'Laravel', 'MySQL', 'Chart.js'],
        link: 'https://github.com/justinloleng/SatisTrack',
        highlights: ['Anonymous surveys', 'Chart.js visualizations', 'HR analytics', 'Laravel backend']
      },
      {
        name: 'E-Commerce Platform',
        id: '747-B',
        type: 'E-Commerce / Payments',
        description: 'A robust e-commerce prototype with core marketplace features. Secure auth, product catalog, Stripe sandbox payment processing, and full shopping cart workflow.',
        tech: ['Python', 'Flask', 'SQLAlchemy', 'Stripe API'],
        link: 'https://github.com/justinloleng/ecommerce',
        highlights: ['Stripe payment integration', 'Secure authentication', 'Product catalog', 'Shopping cart']
      }
    ],

    experience: {
      current: 'Seeking first professional role as Junior Software Engineer or Web Developer',
      type: 'Fresh graduate / Entry-level',
      openTo: ['Full-time positions', 'Internships', 'Freelance projects', 'Remote work', 'On-site roles']
    },

    interests: [
      'UI/UX Design', 'Streetwear culture', 'Street photography', 'New technologies',
      'Problem solving', 'Cloud computing (AWS)', 'TypeScript', 'Open source'
    ],

    personality: [
      'Passionate about turning ideas into functional, polished products',
      'Enjoys the problem-solving aspect of development',
      'Currently exploring TypeScript and AWS',
      'Inspired by street culture and aesthetics'
    ]
  };

  /* ─────────────────────────────────────────────
     RESPONSE ENGINE
  ───────────────────────────────────────────── */

  const responses = [
    {
      keys: ['hello', 'hi', 'hey', 'sup', 'yo', 'what\'s up', 'greetings', 'start'],
      reply: () => `Yo, what's good? I'm Justin's AI — I only know stuff about him though, so ask me anything about his skills, projects, background, or how to reach him. 🏴`
    },
    {
      keys: ['who are you', 'who is this', 'what are you', 'tell me about yourself', 'introduce', 'introduction'],
      reply: () => `I'm a chatbot built for <strong>${KB.name}'s</strong> portfolio. I can answer questions about Justin — his background, projects, skills, education, and contact info. Ask away.`
    },
    {
      keys: ['who is justin', 'about justin', 'tell me about justin', 'justin loleng', 'bio', 'background'],
      reply: () => `<strong>${KB.name}</strong> is an aspiring <em>Software Engineer & Full-Stack Developer</em> based in the Philippines. He specializes in the <strong>MERN stack</strong> and builds high-performance web apps with a touch of street culture aesthetic. Fresh grad, hungry to ship real products. 🔥`
    },
    {
      keys: ['education', 'degree', 'school', 'university', 'college', 'study', 'studied', 'graduate', 'graduated', 'pangasinan', 'urdaneta', 'psu'],
      reply: () => `Justin graduated with a <strong>Bachelor of Science in Information Technology</strong>, <strong>${KB.education.major}</strong> from <strong>${KB.education.school}</strong> in ${KB.education.location} 🎓<br><br>His coursework centered around mobile & web development, building a strong foundation across front-end, back-end, databases, and software engineering.`
    },
    {
      keys: ['skills', 'tech', 'technology', 'technologies', 'know', 'languages', 'stack', 'tools', 'expertise', 'what can he do'],
      reply: () => `Justin's technical stack:<br><br>
<strong>🔤 Languages:</strong> ${KB.skills.languages.join(', ')}<br>
<strong>🎨 Frontend:</strong> ${KB.skills.frontend.join(', ')}<br>
<strong>⚙️ Backend:</strong> ${KB.skills.backend.join(', ')}<br>
<strong>🗄️ Databases:</strong> ${KB.skills.databases.join(', ')}<br>
<strong>🛠️ Tools:</strong> ${KB.skills.tools.join(', ')}`
    },
    {
      keys: ['javascript', 'js', 'typescript', 'ts', 'python', 'php', 'dart'],
      reply: () => `Yep, Justin codes in <strong>JavaScript</strong> (his primary), <strong>TypeScript</strong>, <strong>Python</strong>, <strong>PHP</strong>, and <strong>Dart</strong>. JS & TS are his bread and butter for full-stack work.`
    },
    {
      keys: ['react', 'next', 'frontend', 'front end', 'front-end', 'ui', 'interface'],
      reply: () => `Justin works with <strong>React.js</strong>, <strong>Next.js</strong>, <strong>Tailwind CSS</strong>, <strong>GSAP</strong> for animations, and <strong>Flutter</strong> for mobile. He has a strong eye for UI/UX design too — check out this portfolio as evidence. 😎`
    },
    {
      keys: ['node', 'express', 'backend', 'back end', 'back-end', 'server', 'api'],
      reply: () => `Justin's backend game: <strong>Node.js + Express.js</strong> (MERN stack), <strong>Flask</strong> (Python), and <strong>Laravel</strong> (PHP). He's built RESTful APIs and real-time socket-based systems.`
    },
    {
      keys: ['mongodb', 'mysql', 'database', 'sql', 'postgres', 'postgresql', 'db'],
      reply: () => `Databases Justin has worked with: <strong>MongoDB</strong>, <strong>MySQL</strong>, <strong>PostgreSQL</strong>, and <strong>SQLAlchemy</strong> with Flask. He's comfortable with both NoSQL and relational databases.`
    },
    {
      keys: ['mern', 'full stack', 'fullstack', 'full-stack'],
      reply: () => `Justin's primary stack is <strong>MERN</strong> — MongoDB, Express.js, React, Node.js. He's built full-stack applications end-to-end, including auth, APIs, real-time features, and front-end UIs.`
    },
    {
      keys: ['projects', 'project', 'built', 'work', 'portfolio', 'apps', 'app', 'what has he built'],
      reply: () => `Justin has <strong>4 featured projects</strong> and 10+ total codebases:<br><br>
<strong>⚔️ PVP Coding Wars</strong> — Real-time competitive coding platform with Socket.io<br>
<strong>🤖 WebPath</strong> — AI-powered adaptive learning platform with OpenAI<br>
<strong>📊 SatisTrack</strong> — HR pulse survey & analytics tool with Chart.js<br>
<strong>🛒 E-Commerce Platform</strong> — Full marketplace with Stripe payments<br><br>
Ask about any of these for more details!`
    },
    {
      keys: ['pvp', 'coding wars', 'battle', 'competitive coding', 'socket'],
      reply: () => `<strong>PVP Coding Wars</strong> — Justin's most technically impressive project.<br><br>
It's a real-time competitive coding platform where two users battle in synchronized rooms. Features live code execution using the <strong>Monaco Editor</strong> (same as VS Code), <strong>Socket.io</strong> for real-time sync, and a full MERN stack backend.<br><br>
Project code: <strong>747</strong> 🔥`
    },
    {
      keys: ['webpath', 'web path', 'learning', 'openai', 'ai project', 'quiz', 'adaptive'],
      reply: () => `<strong>WebPath</strong> — Justin's AI-powered learning platform.<br><br>
It generates personalized educational paths and creates custom quiz questions using the <strong>OpenAI API</strong> based on user progress. Built with React, Node.js, Express, MongoDB, and Tailwind CSS.<br><br>
🔗 Live: <a href="https://webpaths-vtjf.vercel.app" target="_blank" style="color: var(--pink)">webpaths-vtjf.vercel.app</a>`
    },
    {
      keys: ['satistrack', 'satis', 'hr', 'survey', 'morale', 'chart', 'analytics'],
      reply: () => `<strong>SatisTrack</strong> — An internal HR tool Justin built.<br><br>
It runs anonymous pulse surveys and tracks company morale over time. Dynamic <strong>Chart.js</strong> visualizations show satisfaction trends. Built with <strong>PHP + Laravel + MySQL</strong>.<br><br>
🔗 GitHub: <a href="https://github.com/justinloleng/SatisTrack" target="_blank" style="color: var(--pink)">github.com/justinloleng/SatisTrack</a>`
    },
    {
      keys: ['ecommerce', 'e-commerce', 'shop', 'store', 'stripe', 'payment', 'flask'],
      reply: () => `<strong>E-Commerce Platform</strong> — Justin's Python-based marketplace.<br><br>
Features secure auth, a full product catalog, <strong>Stripe sandbox</strong> payment processing, and a complete shopping cart workflow. Built with <strong>Python + Flask + SQLAlchemy</strong>.<br><br>
🔗 GitHub: <a href="https://github.com/justinloleng/ecommerce" target="_blank" style="color: var(--pink)">github.com/justinloleng/ecommerce</a>`
    },
    {
      keys: ['contact', 'reach', 'hire', 'email', 'message', 'get in touch', 'connect'],
      reply: () => `Hit Justin up here:<br><br>
📧 <strong>Email:</strong> <a href="mailto:${KB.email}" style="color: var(--pink)">${KB.email}</a><br>
💼 <strong>LinkedIn:</strong> <a href="${KB.linkedin}" target="_blank" style="color: var(--pink)">Justin Gerald Loleng</a><br>
💻 <strong>GitHub:</strong> <a href="${KB.github}" target="_blank" style="color: var(--pink)">github.com/justinloleng</a><br><br>
He's actively looking for opportunities as a Junior Software Engineer or Web Developer. Don't sleep on it. 👀`
    },
    {
      keys: ['email', 'mail', 'gmail'],
      reply: () => `Justin's email: <a href="mailto:${KB.email}" style="color: var(--pink)">${KB.email}</a> — shoot him a message, he's open to work! 📬`
    },
    {
      keys: ['github', 'git', 'code', 'repo', 'repository'],
      reply: () => `Justin's GitHub: <a href="${KB.github}" target="_blank" style="color: var(--pink)">github.com/justinloleng</a> — check out his repos there. 💻`
    },
    {
      keys: ['linkedin', 'professional', 'network'],
      reply: () => `Connect on LinkedIn: <a href="${KB.linkedin}" target="_blank" style="color: var(--pink)">Justin Gerald Loleng</a> 🤝`
    },
    {
      keys: ['available', 'hire', 'hiring', 'job', 'work', 'opportunities', 'open to', 'looking for', 'freelance', 'intern', 'internship'],
      reply: () => `<strong>Yes — actively available right now.</strong> Justin is currently looking for his next opportunity as a Junior Software Engineer or Web Developer. Open to:<br><br>
✅ Full-time positions<br>
✅ Internships<br>
✅ Freelance / project-based work<br>
✅ Remote or on-site<br><br>
📧 <a href="mailto:${KB.email}" style="color: var(--pink)">${KB.email}</a><br>
💼 <a href="${KB.linkedin}" target="_blank" style="color: var(--pink)">LinkedIn</a> · 💻 <a href="${KB.github}" target="_blank" style="color: var(--pink)">GitHub</a><br><br>
Don't sleep — <a href="Loleng, Justin- Resume.pdf" download style="color: var(--pink)">grab his resume here ↓</a> 🚀`
    },
    {
      keys: ['resume', 'cv', 'download', 'pdf'],
      reply: () => `You can <a href="Loleng, Justin- Resume.pdf" download="Justin_Loleng_Resume.pdf" style="color: var(--pink); font-weight: bold;">↓ download Justin's resume here</a> or use the button in the nav bar. It covers his education, skills, and project experience. 📄`
    },
    {
      keys: ['location', 'based', 'where', 'country', 'philippines', 'pangasinan', 'urdaneta', 'manila'],
      reply: () => `Justin is based in the <strong>Philippines</strong> 🇵🇭 — he studied at <strong>Pangasinan State University Urdaneta Campus</strong> in Pangasinan. Open to remote work and relocation opportunities.`
    },
    {
      keys: ['interests', 'hobbies', 'outside', 'fun', 'passion', 'like', 'free time'],
      reply: () => `Outside of code, Justin is into:<br><br>
🎨 UI/UX design exploration<br>
📸 Street photography<br>
👕 Streetwear culture (ASSC, Undefeated — as you can tell from the portfolio aesthetic)<br>
☁️ Currently exploring <strong>AWS</strong> and cloud computing<br>
📘 Deepening his <strong>TypeScript</strong> skills`
    },
    {
      keys: ['gsap', 'animation', 'motion'],
      reply: () => `Justin uses <strong>GSAP (GreenSock Animation Platform)</strong> for advanced animations — scroll triggers, staggered reveals, parallax effects. This entire portfolio is powered by GSAP! He loves making interfaces that feel alive.`
    },
    {
      keys: ['figma', 'design', 'ui ux', 'ux', 'ui/ux'],
      reply: () => `Justin uses <strong>Figma</strong> for design and has a strong eye for UI/UX — just look at this portfolio. He aims for premium, polished interfaces inspired by streetwear brand aesthetics.`
    },
    {
      keys: ['aws', 'cloud', 'learning now', 'currently', 'studying'],
      reply: () => `Justin is currently <strong>exploring Cloud Computing with AWS</strong> and deepening his <strong>TypeScript</strong> knowledge. Always leveling up. 📈`
    },
    {
      keys: ['assc', 'anti social social club', 'streetwear', 'aesthetic', 'design inspiration'],
      reply: () => `This portfolio takes heavy inspiration from <strong>Anti Social Social Club (ASSC)</strong> and <strong>Undefeated</strong> streetwear aesthetics. Justin loves the raw, editorial, typography-heavy style. The whole vibe is intentional — code meets culture. 🏴`
    },
    {
      keys: ['experience', 'years', 'senior', 'junior', 'level', 'how long', 'how much'],
      reply: () => `Justin is a <strong>fresh graduate (2025)</strong> entering the field as a Junior-level developer. While he doesn't have formal work experience yet, he's built <strong>4 full-stack projects</strong> covering real-time systems, AI integrations, e-commerce, and HR tools — shipping real products speaks louder than titles.`
    },
    {
      keys: ['thank', 'thanks', 'thx', 'ty', 'appreciate', 'nice', 'cool', 'great', 'awesome'],
      reply: () => `Anytime. If you want to know anything else about Justin, just ask — or better yet, reach out to him directly at <a href="mailto:${KB.email}" style="color: var(--pink)">${KB.email}</a>. 🤙`
    },
    {
      keys: ['bye', 'goodbye', 'later', 'see ya', 'cya', 'peace', 'done'],
      reply: () => `Peace ✌️. If you ever want to learn more about Justin or work with him, hit him up at <a href="mailto:${KB.email}" style="color: var(--pink)">${KB.email}</a>.`
    }
  ];

  const fallbacks = [
    `Hmm, I'm only wired to talk about Justin. Try asking about his <strong>projects</strong>, <strong>skills</strong>, <strong>education</strong>, or <strong>contact info</strong>. 🤷`,
    `That's outside my knowledge zone — I only know Justin's resume cold. Ask me about his stack, projects, or how to hire him. 💼`,
    `I can't answer that, but I can tell you Justin is a <strong>MERN stack dev</strong> open to work. Try asking about his projects or skills! 🔥`,
    `Not in my database. But if you ask about Justin's background, experience, or how to reach him — I've got you covered. 📋`
  ];

  let fallbackIdx = 0;
  function getFallback() {
    const msg = fallbacks[fallbackIdx % fallbacks.length];
    fallbackIdx++;
    return msg;
  }

  function getResponse(input) {
    const text = input.toLowerCase().trim();
    if (!text) return null;

    for (const entry of responses) {
      if (entry.keys.some(k => text.includes(k))) {
        return entry.reply();
      }
    }
    return getFallback();
  }

  /* ─────────────────────────────────────────────
     SUGGESTED QUESTIONS
  ───────────────────────────────────────────── */
  const suggestions = [
    'Tell me about Justin 👤',
    'What projects has he built? 🚀',
    'What\'s his tech stack? 💻',
    'Is he available for hire? 💼',
    'How do I contact him? 📧',
    'What\'s his educational background? 🎓'
  ];

  /* ─────────────────────────────────────────────
     DOM BUILDING
  ───────────────────────────────────────────── */
  function buildChatbot() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      /* ── CHATBOT WIDGET ── */
      #jgl-chat-btn {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 9000;
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background: var(--pink);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 32px rgba(232,160,191,0.35), 0 0 0 0 rgba(232,160,191,0.3);
        transition: transform 0.3s var(--ease-snap), box-shadow 0.3s;
        animation: chatPulse 3s ease-in-out infinite;
      }
      @keyframes chatPulse {
        0%, 100% { box-shadow: 0 8px 32px rgba(232,160,191,0.35), 0 0 0 0 rgba(232,160,191,0.3); }
        50% { box-shadow: 0 8px 32px rgba(232,160,191,0.5), 0 0 0 12px rgba(232,160,191,0); }
      }
      #jgl-chat-btn:hover { transform: scale(1.1); }
      #jgl-chat-btn svg { width: 26px; height: 26px; fill: #0a0a0a; transition: opacity 0.2s; }
      #jgl-chat-btn .icon-close { display: none; }
      #jgl-chat-btn.open .icon-open { display: none; }
      #jgl-chat-btn.open .icon-close { display: block; }
      #jgl-chat-btn.open { animation: none; background: var(--gray-dark); border: 1.5px solid var(--pink); }
      #jgl-chat-btn.open svg { fill: var(--pink); }

      /* Badge */
      #jgl-chat-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 18px;
        height: 18px;
        background: #ff69b4;
        border-radius: 50%;
        font-family: var(--font-mono);
        font-size: 0.55rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0;
        border: 2px solid var(--black);
        animation: badgePop 0.4s var(--ease-snap);
      }
      @keyframes badgePop {
        from { transform: scale(0); }
        to   { transform: scale(1); }
      }

      /* ── CHAT PANEL ── */
      #jgl-chat-panel {
        position: fixed;
        bottom: 5.5rem;
        right: 2rem;
        z-index: 8999;
        width: 380px;
        max-height: 560px;
        display: flex;
        flex-direction: column;
        background: rgba(16,16,16,0.97);
        border: 1px solid rgba(232,160,191,0.2);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        box-shadow: 0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,160,191,0.05);
        transform-origin: bottom right;
        transform: scale(0.85) translateY(20px);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.35s var(--ease-out), opacity 0.35s var(--ease-out);
        overflow: hidden;
      }
      #jgl-chat-panel.visible {
        transform: scale(1) translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      /* Header */
      .chat-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem 1.2rem;
        border-bottom: 1px solid rgba(232,160,191,0.12);
        background: rgba(26,26,26,0.8);
        flex-shrink: 0;
      }
      .chat-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--pink) 0%, var(--pink-hot) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-display);
        font-size: 1rem;
        color: #0a0a0a;
        font-weight: 900;
        flex-shrink: 0;
      }
      .chat-header-info { flex: 1; }
      .chat-header-name {
        font-family: var(--font-display);
        font-size: 0.95rem;
        letter-spacing: 0.1em;
        color: var(--white-pure);
        line-height: 1;
      }
      .chat-header-status {
        font-family: var(--font-mono);
        font-size: 0.5rem;
        letter-spacing: 2px;
        color: #4ade80;
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }
      .status-dot {
        width: 5px;
        height: 5px;
        background: #4ade80;
        border-radius: 50%;
        animation: statusPulse 2s ease-in-out infinite;
      }
      @keyframes statusPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      .chat-header-tag {
        font-family: var(--font-mono);
        font-size: 0.5rem;
        letter-spacing: 2px;
        color: var(--pink);
        background: rgba(232,160,191,0.1);
        border: 1px solid rgba(232,160,191,0.2);
        padding: 0.2rem 0.5rem;
      }

      /* Messages */
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        scrollbar-width: thin;
        scrollbar-color: rgba(232,160,191,0.2) transparent;
      }
      .chat-messages::-webkit-scrollbar { width: 4px; }
      .chat-messages::-webkit-scrollbar-track { background: transparent; }
      .chat-messages::-webkit-scrollbar-thumb { background: rgba(232,160,191,0.2); border-radius: 2px; }

      .chat-msg {
        display: flex;
        gap: 0.5rem;
        animation: msgSlideIn 0.3s var(--ease-out);
        max-width: 88%;
      }
      @keyframes msgSlideIn {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .chat-msg.user { align-self: flex-end; flex-direction: row-reverse; }
      .chat-msg.bot  { align-self: flex-start; }

      .msg-bubble {
        padding: 0.65rem 0.9rem;
        font-family: var(--font-clean);
        font-size: 0.78rem;
        line-height: 1.65;
        max-width: 100%;
        word-break: break-word;
      }
      .bot .msg-bubble {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.06);
        color: var(--gray-light);
        border-radius: 2px 12px 12px 2px;
      }
      .user .msg-bubble {
        background: var(--pink);
        color: #0a0a0a;
        font-weight: 600;
        border-radius: 12px 2px 2px 12px;
      }
      .msg-bubble a { color: var(--pink); text-decoration: underline; }
      .user .msg-bubble a { color: #0a0a0a; }

      /* Typing indicator */
      .typing-indicator {
        display: flex;
        gap: 4px;
        padding: 0.65rem 0.9rem;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.06);
        border-radius: 2px 12px 12px 2px;
        width: fit-content;
        animation: msgSlideIn 0.3s var(--ease-out);
      }
      .typing-dot {
        width: 5px;
        height: 5px;
        background: var(--pink);
        border-radius: 50%;
        animation: typingBounce 1.2s ease-in-out infinite;
      }
      .typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes typingBounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-6px); opacity: 1; }
      }

      /* Suggestions */
      .chat-suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        padding: 0 1rem 0.6rem;
        flex-shrink: 0;
      }
      .suggestion-chip {
        font-family: var(--font-mono);
        font-size: 0.55rem;
        letter-spacing: 1px;
        color: var(--gray-text);
        border: 1px solid rgba(255,255,255,0.08);
        background: rgba(255,255,255,0.03);
        padding: 0.35rem 0.65rem;
        cursor: pointer;
        transition: border-color 0.25s, color 0.25s, background 0.25s;
        white-space: nowrap;
      }
      .suggestion-chip:hover {
        border-color: var(--pink);
        color: var(--pink);
        background: rgba(232,160,191,0.05);
      }

      /* Input area */
      .chat-input-area {
        display: flex;
        gap: 0.5rem;
        padding: 0.75rem 1rem;
        border-top: 1px solid rgba(232,160,191,0.1);
        background: rgba(20,20,20,0.9);
        flex-shrink: 0;
      }
      #jgl-chat-input {
        flex: 1;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        color: var(--white);
        font-family: var(--font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.05em;
        padding: 0.6rem 0.8rem;
        outline: none;
        transition: border-color 0.25s;
        resize: none;
      }
      #jgl-chat-input:focus { border-color: rgba(232,160,191,0.4); }
      #jgl-chat-input::placeholder { color: rgba(255,255,255,0.2); }
      #jgl-chat-send {
        width: 40px;
        height: 40px;
        background: var(--pink);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background 0.25s, transform 0.2s;
      }
      #jgl-chat-send:hover { background: var(--pink-hot); transform: scale(1.05); }
      #jgl-chat-send:active { transform: scale(0.95); }
      #jgl-chat-send svg { width: 16px; height: 16px; fill: #0a0a0a; }

      /* Divider label */
      .chat-date-label {
        align-self: center;
        font-family: var(--font-mono);
        font-size: 0.45rem;
        letter-spacing: 3px;
        color: rgba(255,255,255,0.15);
        margin: 0.25rem 0;
      }

      /* ── RESPONSIVE ── */
      @media (max-width: 600px) {
        #jgl-chat-panel {
          right: 0.75rem;
          left: 0.75rem;
          width: auto;
          bottom: 5rem;
          max-height: 70vh;
        }
        #jgl-chat-btn {
          right: 1.2rem;
          bottom: 1.5rem;
        }
      }
    `;
    document.head.appendChild(style);

    // Toggle button
    const btn = document.createElement('button');
    btn.id = 'jgl-chat-btn';
    btn.setAttribute('aria-label', 'Open AI chat assistant');
    btn.setAttribute('title', 'Chat with Justin\'s AI');
    btn.innerHTML = `
      <span class="icon-open" style="font-family:'Bebas Neue',Impact,sans-serif;font-size:1.15rem;letter-spacing:2px;color:#0a0a0a;line-height:1;font-weight:900;">JGL</span>
      <svg class="icon-close" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
      <span id="jgl-chat-badge">1</span>
    `;
    document.body.appendChild(btn);

    // Chat panel
    const panel = document.createElement('div');
    panel.id = 'jgl-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Justin\'s AI Chat Assistant');
    panel.innerHTML = `
      <div class="chat-header">
        <div class="chat-avatar">JGL</div>
        <div class="chat-header-info">
          <div class="chat-header-name">JUSTIN'S AI</div>
          <div class="chat-header-status">
            <span class="status-dot"></span>
            ONLINE — KNOWS JUSTIN COLD
          </div>
        </div>
        <div class="chat-header-tag">AI ASSISTANT</div>
      </div>
      <div class="chat-messages" id="jgl-messages" role="log" aria-live="polite"></div>
      <div class="chat-suggestions" id="jgl-suggestions"></div>
      <div class="chat-input-area">
        <input
          type="text"
          id="jgl-chat-input"
          placeholder="ASK ABOUT JUSTIN..."
          maxlength="200"
          autocomplete="off"
          aria-label="Chat message input"
        />
        <button id="jgl-chat-send" aria-label="Send message">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    return { btn, panel };
  }

  /* ─────────────────────────────────────────────
     CONTROLLER
  ───────────────────────────────────────────── */
  function initChatbot() {
    const { btn, panel } = buildChatbot();
    const messagesEl = document.getElementById('jgl-messages');
    const inputEl    = document.getElementById('jgl-chat-input');
    const sendBtn    = document.getElementById('jgl-chat-send');
    const suggestionsEl = document.getElementById('jgl-suggestions');
    const badge      = document.getElementById('jgl-chat-badge');

    let isOpen = false;
    let welcomeShown = false;

    /* ── TOGGLE PANEL ── */
    function openPanel() {
      isOpen = true;
      btn.classList.add('open');
      panel.classList.add('visible');
      btn.setAttribute('aria-expanded', 'true');
      if (badge) badge.remove();
      if (!welcomeShown) {
        showWelcome();
        welcomeShown = true;
      }
      setTimeout(() => inputEl.focus(), 350);
    }

    function closePanel() {
      isOpen = false;
      btn.classList.remove('open');
      panel.classList.remove('visible');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', () => isOpen ? closePanel() : openPanel());

    // Close on outside click
    document.addEventListener('click', e => {
      if (isOpen && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        closePanel();
      }
    });

    /* ── WELCOME MESSAGE ── */
    function showWelcome() {
      addDateLabel('NOW ONLINE');
      addBotMessage(`Yo! 👋 I'm Justin's personal AI — I only talk about him, so ask me anything. His projects, skills, background, how to hire him — I've got it all.`);
      buildSuggestions();
    }

    /* ── SUGGESTIONS ── */
    function buildSuggestions() {
      suggestionsEl.innerHTML = '';
      suggestions.forEach(s => {
        const chip = document.createElement('button');
        chip.className = 'suggestion-chip';
        chip.textContent = s;
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          sendMessage(s);
          suggestionsEl.innerHTML = '';
        });
        suggestionsEl.appendChild(chip);
      });
    }

    /* ── MESSAGES ── */
    function addDateLabel(text) {
      const label = document.createElement('div');
      label.className = 'chat-date-label';
      label.textContent = `— ${text} —`;
      messagesEl.appendChild(label);
    }

    function addUserMessage(text) {
      const wrap = document.createElement('div');
      wrap.className = 'chat-msg user';
      wrap.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
      messagesEl.appendChild(wrap);
      scrollToBottom();
    }

    function addBotMessage(html) {
      const wrap = document.createElement('div');
      wrap.className = 'chat-msg bot';
      wrap.innerHTML = `<div class="msg-bubble">${html}</div>`;
      messagesEl.appendChild(wrap);
      scrollToBottom();
    }

    function addTyping() {
      const typing = document.createElement('div');
      typing.className = 'chat-msg bot';
      typing.id = 'jgl-typing';
      typing.innerHTML = `
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>`;
      messagesEl.appendChild(typing);
      scrollToBottom();
      return typing;
    }

    function removeTyping() {
      const el = document.getElementById('jgl-typing');
      if (el) el.remove();
    }

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    /* ── SEND ── */
    function sendMessage(text) {
      const msg = text.trim();
      if (!msg) return;

      inputEl.value = '';
      addUserMessage(msg);

      // Typing delay for realism
      const typingEl = addTyping();
      const delay = 600 + Math.random() * 500;

      setTimeout(() => {
        removeTyping();
        const reply = getResponse(msg);
        addBotMessage(reply);
      }, delay);
    }

    sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(inputEl.value);
      }
    });

    // Show badge after 3s to attract attention
    setTimeout(() => {
      if (!isOpen && badge) {
        badge.style.display = 'flex';
      }
    }, 3000);
  }

  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

})();
