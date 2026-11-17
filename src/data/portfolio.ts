export const profile = {
  name: "Margus Mägi",
  title: "Senior Unreal Engine Developer",
  roles: ["Gameplay", "Multiplayer", "Tech Lead"],
  founderLine: "Founder, Dynamic Render Interactive OÜ",
  location: "Keila, Estonia",
  intro:
    "Unreal Engine developer with 8+ years of professional experience building games, multiplayer systems, VR experiences and real-time applications. Experienced in gameplay development, networking, performance optimization, backend integration, development tools and technical leadership.",
  heroTags: ["UE5", "C++", "Multiplayer", "AWS", "Gameplay", "Technical Leadership"],
  email: "margus@dynamicrenderinteractive.com",
  links: {
    linkedin: "https://linkedin.com/in/margusmagi-unreal",
    company: "https://dynamicrenderinteractive.com/",
    portfolio: "https://kanemount.github.io/portfolio/",
  },
  // Set to a file path once the PDF exists. While null, no CV button is rendered anywhere.
  cvUrl: null as string | null,
  availability: ["Remote", "Full-time / part-time", "Employment", "Contract / freelance", "B2B"],
  languages: [
    { name: "Estonian", level: "Fluent" },
    { name: "English", level: "Fluent" },
  ],
  about: [
    "I'm an Unreal Engine developer based in Keila, Estonia. I have worked professionally with UE4 and UE5 for 8+ years, 4+ of them as a Tech Lead, across games, VR, multiplayer and real-time interactive projects.",
    "In 2024 I founded Dynamic Render Interactive OÜ for Unreal Engine development, contract work and independent projects.",
    "I enjoy solving hard technical problems and building robust systems that a team can rely on: gameplay, networking, backend, tools and the development infrastructure around them.",
  ],
  interests: [
    { title: "Disc golf", detail: "Estonian Doubles Amateur Champion (2025)" },
    { title: "Music", detail: "Piano, guitar, electronic music production" },
  ],
};

// For type "youtube", src is the YouTube video ID only (not a full URL).
export type ProjectMedia =
  | { type: "image" | "video"; src: string; alt: string }
  | { type: "youtube"; src: string; alt: string; poster?: string };

export type Project = {
  id: string;
  title: string;
  category: string;
  size: "featured" | "large" | "standard";
  status?: string;
  role?: string;
  period?: string;
  context?: string;
  summary: string;
  contributions: string[];
  tags: string[];
  link: { label: string; url: string };
  media: ProjectMedia[]; // empty array = render the labeled placeholder
  caseStudy?: { title: string; points: string[] }[];
};

export const projects: Project[] = [
  {
    id: "cradle-of-sins",
    title: "Cradle of Sins",
    category: "Professional Game Development",
    size: "featured",
    status: "Unreleased · Closed playtesting",
    role: "Tech Lead / Senior Unreal Engine Developer",
    period: "Apr 2024 – Dec 2025",
    summary:
      "PC/VR cross-play multiplayer MOBA that reached closed playtesting on Steam. As Tech Lead I worked on dedicated-server gameplay, the migration of the online backend from GameSparks to AWS, and a browser-based interactive spectator system built on Unreal Engine Pixel Streaming.",
    contributions: [
      "Multiplayer gameplay systems on dedicated servers",
      "Backend migration from GameSparks to AWS",
      "Browser-based interactive spectator system",
      "Game and render thread optimization",
      "Editor tools and technical leadership",
    ],
    tags: [
      "PC/VR cross-play",
      "Dedicated servers",
      "Replication",
      "AWS / GameLift",
      "Pixel Streaming",
      "Performance optimization",
      "Gameplay systems",
      "Editor tools",
    ],
    link: {
      label: "View case study",
      url: "https://www.dynamicrenderinteractive.com/work/case-study-2",
    },
    media: [
      { type: "youtube", src: "E5levOlcmms", alt: "Cradle of Sins official trailer" },
      { type: "youtube", src: "gsfzphAT3tg", alt: "Browser spectator triggering a meteor shower in a live Cradle of Sins match through Unreal Engine Pixel Streaming" },
      { type: "youtube", src: "758txZn6fWg", alt: "Recap of a Cradle of Sins tournament from the game's VR MOBA phase" },
      { type: "image", src: "media/cradle-of-sins/bongo-tower.jpg", alt: "Bongo Tower, the PC/VR platformer game mode of Cradle of Sins" },
      { type: "image", src: "media/cradle-of-sins/serpents-rest.jpg", alt: "Serpent's Rest, the PC/VR MOBA game mode of Cradle of Sins" },
    ],
    caseStudy: [
      {
        title: "Multiplayer",
        points: [
          "Built and maintained multiplayer gameplay systems for a PC/VR cross-play title using dedicated servers, replication, authority and RPC patterns.",
        ],
      },
      {
        title: "Cloud & Backend",
        points: [
          "Migrated online/backend functionality from GameSparks to AWS using Cognito, API Gateway REST/WebSocket, DynamoDB, Lambda, GameLift and EC2.",
          "Built the supporting AWS automation using Lambda, EC2 and Python/Bash, covering instance launch and configuration, session lifecycle and cleanup, GameLift connection, and reporting gameplay-event results and match statistics back to web/backend services.",
        ],
      },
      {
        title: "Interactive Spectator",
        points: [
          "Designed and implemented a browser-based interactive spectator system using Unreal Engine Pixel Streaming/WebRTC, with cloud-hosted spectator clients connecting to active GameLift sessions and streaming the live Unreal session to web viewers.",
          "Implemented bidirectional browser-to-Unreal interaction, allowing an authorized viewer to trigger gameplay events such as meteor showers, player buffs and item spawns directly through the streamed game view.",
          "Collaborated with the web developer on browser-side integration.",
        ],
      },
      {
        title: "Performance & Tools",
        points: [
          "Profiled and optimized game and render threads; delivered stability and performance improvements.",
          "Refactored legacy systems toward data-oriented architecture and built editor tools to speed up designer iteration.",
        ],
      },
      {
        title: "Leadership",
        points: ["Led task planning with a small team, code reviews and Perforce/Jira workflows."],
      },
    ],
  },
  {
    id: "god-machine",
    title: "God Machine",
    category: "Game Jam · Epic AI MegaJam 2026",
    size: "large",
    role: "Gameplay design / Systems architecture",
    context: "Five-person team, game jam project",
    summary:
      "A time-loop FPS where previous attempts return as allied soldiers. Built in Unreal Engine by a five-person team for the Epic AI MegaJam 2026.",
    contributions: [
      "Designed the core gameplay loop",
      "Designed the take/ghost systems and their architecture",
      "Established Perforce and Trello workflows for the team",
      "Set up human-reviewed AI-assisted changelists",
    ],
    tags: ["Unreal Engine", "FPS", "Time loop", "Gameplay systems", "Architecture", "Perforce", "Game jam"],
    link: { label: "Play on itch.io", url: "https://khuzdul.itch.io/god-machine" },
    media: [
      { type: "youtube", src: "MPeXPTN0FZI", alt: "Short God Machine gameplay video" },
      { type: "image", src: "media/god-machine/god-machine.jpg", alt: "God Machine in-game screenshot" },
    ],
  },
  {
    id: "slum-ball",
    title: "Slum Ball",
    category: "Released VR Game",
    size: "standard",
    role: "Gameplay / Optimization",
    context: "Developed at U24 Solutions",
    summary:
      "Released single-player VR title. I worked on gameplay implementation and performance optimization.",
    contributions: ["VR gameplay features in Blueprint/C++", "Performance profiling and optimization"],
    tags: ["VR", "Unreal Engine", "Blueprint / C++", "Gameplay", "Optimization"],
    link: {
      label: "View on Steam",
      url: "https://store.steampowered.com/app/850500/Slum_Ball_VR_Tournament/",
    },
    media: [
      { type: "image", src: "media/slum-ball/slum-ball.jpg", alt: "Slum Ball VR gameplay: a sewer tunnel lane with targets at the far end" },
    ],
  },
  {
    id: "gscan",
    title: "GScan",
    category: "Unreal Engine Cinematic",
    size: "standard",
    role: "Cinematic production",
    context: "Client project at Dynamic Render Interactive",
    summary:
      "Promotional renders and footage for GScan, a company developing muon tomography for non-destructive inspection of infrastructure. Made for investor presentations to visualise the technology and its workflow, produced with an Unreal Engine cinematic pipeline.",
    contributions: ["Scene setup and lighting", "Cameras and sequencing", "Rendered output"],
    tags: ["Product visualization", "Scene setup", "Lighting", "Cameras", "Sequencer", "Rendered output"],
    link: {
      label: "View case study",
      url: "https://www.dynamicrenderinteractive.com/work/case-study-1",
    },
    media: [
      { type: "image", src: "media/gscan/gscan-docks.jpg", alt: "GScan promotional render of the scanner at a container port" },
    ],
  },
];

// For use in the next step (not rendered yet).
export const expertise = [
  { name: "Unreal Engine", items: ["UE4 / UE5", "C++", "Blueprint", "Gameplay systems", "Editor tools"] },
  { name: "Multiplayer & Networking", items: ["Dedicated servers", "Replication", "Authority", "RPC patterns"] },
  { name: "Cloud & Backend", items: ["AWS", "GameLift", "Cognito", "API Gateway", "Lambda", "DynamoDB", "EC2", "Linux server environments"] },
  { name: "Real-time Streaming", items: ["Unreal Engine Pixel Streaming", "WebRTC"] },
  { name: "Performance", items: ["Profiling", "Optimization", "Refactoring"] },
  { name: "Development Infrastructure", items: ["Perforce", "UnrealGameSync", "Horde", "Backups / automation"] },
  { name: "Scripting", items: ["Python", "Bash"] },
  { name: "Leadership & Workflow", items: ["Architecture", "Task planning", "Code reviews", "Jira", "Remote team collaboration"] },
  { name: "AI-assisted Development", items: ["Claude Code", "ChatGPT", "Coding", "Debugging", "Research"] },
];

export const experience = [
  {
    company: "Dynamic Render Interactive OÜ",
    url: "https://dynamicrenderinteractive.com/",
    role: "Founder / Senior Unreal Engine Developer",
    period: "Apr 2024 – Present",
    location: "Keila, Estonia",
    points: [
      "Founded the company for Unreal Engine development, contract work and independent projects.",
      "Built and maintain a small-studio Unreal development stack using Perforce, UnrealGameSync and Horde, including automated NAS backups and supporting scripts.",
      "Tech Lead on Cradle of Sins (Apr 2024 – Dec 2025).",
    ],
    relatedProjectIds: ["cradle-of-sins", "gscan"],
  },
  {
    company: "U24 Solutions",
    url: null,
    role: "Unreal Engine Developer → Tech Lead",
    period: "Sep 2017 – Apr 2024",
    location: "Tallinn, Estonia",
    points: [
      "Unreal Engine development across released VR projects and interactive experiences; implemented gameplay features in Blueprint/C++.",
      "Profiled and optimized performance; refactored and maintained production codebases.",
      "As Tech Lead: task planning, code reviews, technical direction and team workflows.",
    ],
    relatedProjectIds: ["slum-ball"],
    extraLink: {
      label: "U24 Solutions on Steam",
      url: "https://store.steampowered.com/search/?developer=U24%20Solutions",
    },
  },
];
