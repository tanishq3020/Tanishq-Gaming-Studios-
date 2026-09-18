// Static site content for Tanishq Gaming Studios

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface GameplayVideo {
  id: string;
  title: string;
  channel: string;
  youtubeId: string;
}

export interface StoreItem {
  id: string;
  title: string;
  price: number;
  tag: string;
  image: string;
  span: string;
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  tag: string;
  content?: string;
}

export interface AcademyCourse {
  id: string;
  tier: string;
  title: string;
  badge: string;
  price: number;
  highlights: string[];
}

export interface GameItem {
  id: string;
  title: string;
  platform: 'pc' | 'mobile';
  genre: string;
  price_usd: number;
  rating: number;
  cover_image: string;
  description?: string;
  features?: string[];
  release_date?: string;
  engine?: string;
  gameType?: 'bubble-shooter' | 'cricket' | 'football' | 'skill-forge' | string;
  badge?: string;
  external_url?: string;
}

export interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export const TEAM: TeamMember[] = [
  {
    id: "tanishq",
    name: "Tanishq Verma",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1655373325205-bbae7ede0e21?w=900",
    bio: "Visionary behind TGS. 12+ years shipping cult favorites."
  },
  {
    id: "ria",
    name: "Ria Kapoor",
    role: "Lead Game Designer",
    image: "https://images.unsplash.com/photo-1708616748538-bdd66d6a9e25?w=900",
    bio: "Crafts mechanics that feel inevitable, never obvious."
  },
  {
    id: "arjun",
    name: "Arjun Mehta",
    role: "Engine Architect",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900",
    bio: "Wrote the renderer powering our open worlds."
  },
  {
    id: "neha",
    name: "Neha Iyer",
    role: "Art Director",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900",
    bio: "Defines the visual signature of every TGS title."
  }
];

export const GAMEPLAYS: GameplayVideo[] = [
  { id: "gp1", title: "Cyber Void — Launch Trailer", channel: "Tanishq Gaming Studios", youtubeId: "dQw4w9WgXcQ" },
  { id: "gp2", title: "Velocity Drift — Speed Run Highlights", channel: "TGS Mobile", youtubeId: "ScMzIvxBSi4" },
  { id: "gp3", title: "Shadow Protocol — Stealth Gameplay", channel: "Tanishq Gaming Studios", youtubeId: "5qap5aO4i9A" },
  { id: "gp4", title: "Blade of Aether — Boss Fight", channel: "TGS Combat Club", youtubeId: "jfKfPfyJRdk" }
];

export const STORE: StoreItem[] = [
  {
    id: "chair-1",
    title: "TGS Throne — Pro Gaming Chair",
    price: 349.00,
    tag: "In Stock",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200",
    span: "md:col-span-7",
    description: "Ergonomic high-density cold-cure foam, 4D armrests, full steel framework and magnetic memory foam lumbar pillow."
  },
  {
    id: "kb-1",
    title: "Crimson Mechanical Keyboard",
    price: 159.00,
    tag: "In Stock",
    image: "https://images.unsplash.com/photo-1636036769389-343bb250f013?w=1200",
    span: "md:col-span-5",
    description: "Custom pre-lubed TGS Red linear switches, CNC machined aluminum chassis, sound-dampening silicone gasket mount."
  },
  {
    id: "hp-1",
    title: "Neon Surround Headset",
    price: 129.00,
    tag: "Pre-Order",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=1200",
    span: "md:col-span-5",
    description: "Planar magnetic 50mm drivers, low-latency 2.4GHz wireless connection, detachable broadcast-grade condenser mic."
  },
  {
    id: "ap-1",
    title: "TGS Studio Hoodie",
    price: 79.00,
    tag: "Limited",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200",
    span: "md:col-span-7",
    description: "480 GSM heavy french terry cotton, embossed silicone TGS chest glyph, ribbed cuffs and double-layered thermal hood."
  }
];

export const BLOG: BlogPost[] = [
  {
    id: "b1",
    title: "Building Cyber Void: A Year of World-Building",
    excerpt: "An inside look at how a sprawling neo-city was forged from scratch.",
    date: "Jan 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
    tag: "Devlog",
    content: "When we started world-building for Cyber Void, our mandate was simple: avoid the cliché rain-soaked blue neon trope. Instead, we drew architectural inspiration from high-density megacities like Chongqing and Old Delhi, layering ancient temple shrines with brutalist megastructures and optical cabling.\n\nOur custom procedural streaming system handles seamless transitions between subterranean undercities and kilometer-tall corporate spires without loading screens."
  },
  {
    id: "b2",
    title: "Why We Chose Unreal Engine 5 for Our Next AAA",
    excerpt: "Lumen, Nanite, and the studio philosophy that drove our switch.",
    date: "Jan 04, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
    tag: "Engineering",
    content: "Migrating from our internal proprietary tech to Unreal Engine 5.4 was a monumental studio milestone. Nanite eliminated tedious LOD authoring and allowed our environmental artists to import cinema-quality sculpts directly into the engine.\n\nCoupled with hardware Lumen and Chaos destruction, physics simulations run at a steady 60 FPS on current-gen consoles and PC hardware."
  },
  {
    id: "b3",
    title: "Velocity Drift Crosses 5 Million Downloads",
    excerpt: "Our arcade racer is now the #1 indie mobile racer of the year.",
    date: "Dec 22, 2025",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1723360480597-d21deccaf3d0?w=1200",
    tag: "News",
    content: "We never anticipated the wild enthusiasm the mobile drifting community would show for Velocity Drift. Reaching 5 million active drivers across 140 countries is humbling.\n\nOur upcoming Season 3 update introduces mountain downhill touge tracks, synchronized multiplayer lobbies, and 12 community-designed custom bodykits."
  }
];

export const ACADEMY_URL = "https://gaming-skill-forge.preview.emergentagent.com/";

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: "starter",
    tier: "Beginner",
    title: "Advanced Game Development",
    badge: "Starter",
    price: 25,
    highlights: [
      "Introduction to Game Development",
      "Game Dev Career Overview",
      "Types of Games (2D, 3D, Mobile, PC)",
      "Basics of Programming for Games",
      "Intro to Unity & Unreal"
    ]
  },
  {
    id: "popular",
    tier: "Intermediate",
    title: "Interactive Game Mechanics",
    badge: "Popular",
    price: 50,
    highlights: [
      "Game Loop & Logic Basics",
      "Game Objects & Components",
      "Working with Sprites & Assets",
      "Player Movement",
      "Event Handling & Input Systems"
    ]
  },
  {
    id: "pro",
    tier: "Advanced",
    title: "Physics & Animation Mastery",
    badge: "Pro",
    price: 75,
    highlights: [
      "Game Physics",
      "Collision Detection",
      "Simple Animations",
      "Sound Effects & BGM",
      "Advanced Scripting"
    ]
  },
  {
    id: "master",
    tier: "Expert",
    title: "Polish, Publish & Monetize",
    badge: "Master",
    price: 100,
    highlights: [
      "Advanced Game UI Design",
      "Level Design Principles",
      "Performance Optimization",
      "Publishing Your Game",
      "Monetization Strategies"
    ]
  }
];

export const SKILL_FORGE_URL = "https://gaming-skill-forge.preview.emergentagent.com/";
export const STREAMING_URL = "https://airbnb-clone-90.preview.emergentagent.com/";
export const CHATVIDEO_REPO_URL = "https://github.com/tanishq3020/ChatVideo.git";
export const CHATVIDEO_LIVE_URL = "https://github.com/tanishq3020/ChatVideo";

export const CODE_GEN_PRESETS = [
  { id: "unity-jump", label: "Unity — Double Jump", prompt: "Unity C# script for smooth player movement + double jump using Rigidbody2D", engine: "unity" },
  { id: "unreal-health", label: "Unreal — Health System", prompt: "Unreal Engine 5 C++ actor component for player health, damage, regen and death broadcast", engine: "unreal" },
  { id: "godot-inv", label: "Godot — Inventory", prompt: "Godot 4 GDScript inventory system with stackable items, drag & drop, and JSON save/load", engine: "godot" },
  { id: "web-shooter", label: "Web — Space Shooter", prompt: "Complete HTML5 canvas + vanilla JS space shooter with enemies, bullets and score", engine: "web" },
  { id: "py-flappy", label: "Python — Flappy Clone", prompt: "Full pygame Flappy Bird clone with gravity, pipes, score and game over screen", engine: "python" }
];

export const PARTNERS = [
  "Steam", "Epic Games", "PlayStation", "Xbox", "Apple Arcade", "Google Play", "Razer", "NVIDIA"
];

export const DEFAULT_GAMES: GameItem[] = [
  {
    id: "bubble-shooter-blitz",
    title: "Bubble Shooter Blitz",
    platform: "mobile",
    genre: "Arcade Bubble Matcher",
    price_usd: 0.00,
    rating: 4.9,
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200",
    description: "Classic bubble popping arcade action! Aim your bubble cannon, bounce shots off the walls, and match 3 or more bubbles of the same color to trigger satisfying chain reactions and clear the board.",
    features: ["100% Free - Instant In-Browser Play", "Precision angle aimer with wall-bounce physics", "Satisfying chain pops & floating cluster drop bonuses", "Endless replayability & high-score tracker"],
    release_date: "Free Edition · Play Now",
    engine: "HTML5 Canvas / Web Arcade",
    gameType: "bubble-shooter",
    badge: "Most Popular"
  },
  {
    id: "tgs-cricket-smash",
    title: "TGS Cricket Smash",
    platform: "pc",
    genre: "Quick Arcade Cricket",
    price_usd: 0.00,
    rating: 4.9,
    cover_image: "https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=1200",
    description: "Step onto the pitch for an electrifying over of cricket! Watch the bowler's run-up, read the delivery (Fast, Spin, Yorker, Bouncer), and time your swing to send the ball sailing over the ropes for massive Sixes!",
    features: ["100% Free - Instant In-Browser Play", "Dynamic bowler AI with varied lengths and spin", "Sweet-spot timing meter with 4s, 6s, and wickets", "6-Ball Super Over Chase & Endless Run modes"],
    release_date: "Free Edition · Play Now",
    engine: "HTML5 Canvas / Arcade Sports",
    gameType: "cricket",
    badge: "Hot Title"
  },
  {
    id: "football-strike",
    title: "Football Strike: Penalty Shootout",
    platform: "mobile",
    genre: "Sports Penalty Shootout",
    price_usd: 0.00,
    rating: 4.9,
    cover_image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200",
    description: "Take the crucial penalty kick in front of a packed stadium! Aim your shot into the top bins, pick your power and curve, and beat the diving goalkeeper in high-stakes sudden death penalty shootouts.",
    features: ["100% Free - Instant In-Browser Play", "Goalkeeper AI with reaction time & diving physics", "Curve shot targeting into top corners & Panenkas", "5-Penalty championship cup tournament mode"],
    release_date: "Free Edition · Play Now",
    engine: "HTML5 Canvas / 2D Physics",
    gameType: "football",
    badge: "Featured"
  },
  {
    id: "neon-bubble-pop",
    title: "Neon Bubble Pop",
    platform: "pc",
    genre: "Retro Bubble Shooter",
    price_usd: 0.00,
    rating: 4.8,
    cover_image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200",
    description: "A dark cyberpunk twist on classic bubble shooting with neon glowing orbs, laser targeting lines, and explosive cluster bombs under synthwave vibes.",
    features: ["100% Free - Instant In-Browser Play", "Cyberpunk neon visual aesthetic & glowing particles", "Laser guide line with multi-bank wall reflections", "Bomb power-ups & color lightning clears"],
    release_date: "Free Edition · Play Now",
    engine: "HTML5 / WebGL",
    gameType: "bubble-shooter"
  },
  {
    id: "street-cricket-champions",
    title: "Street Cricket Champions",
    platform: "mobile",
    genre: "Gully Cricket Blitz",
    price_usd: 0.00,
    rating: 4.8,
    cover_image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
    description: "Experience the adrenaline of authentic street & rooftop cricket! Tight boundaries, fast tape-ball swing, and one-touch power swings. One tip, one hand catches!",
    features: ["100% Free - Instant In-Browser Play", "Tape-ball bounce & unpredictable swing physics", "One-touch responsive tap & swipe controls", "Quick 1-over blitz challenges"],
    release_date: "Free Edition · Play Now",
    engine: "Web Arcade Engine",
    gameType: "cricket"
  },
  {
    id: "super-football-kickoff",
    title: "Super Football Kickoff",
    platform: "pc",
    genre: "Arcade Free-Kicks",
    price_usd: 0.00,
    rating: 4.9,
    cover_image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200",
    description: "Bend it past the defensive wall! Pick your strike spot from 25 yards out, swerve the ball around jumping defenders, and find the back of the net.",
    features: ["100% Free - Instant In-Browser Play", "Defensive wall jumping mechanics", "Wind deflection & swerve ball trajectory", "Target challenge and crossbar challenge modes"],
    release_date: "Free Edition · Play Now",
    engine: "HTML5 Canvas / Vector Physics",
    gameType: "football"
  }
];

export const DEFAULT_JOBS: JobItem[] = [
  {
    id: "job-1",
    title: "Senior Gameplay Programmer (Unreal / C++)",
    department: "Engineering",
    location: "Bengaluru / Remote",
    type: "Full-Time",
    description: "Looking for an experienced Unreal Engine C++ programmer to build tight, responsive character locomotion and combat mechanics for our upcoming AAA action RPG."
  },
  {
    id: "job-2",
    title: "Lead Environment & Lighting Artist",
    department: "Art & Worldbuilding",
    location: "Bengaluru (Hybrid)",
    type: "Full-Time",
    description: "Shape the neo-noir visual identity of our worlds using Lumen, Nanite, and custom shaders. Lead a team of 5 world artists."
  },
  {
    id: "job-3",
    title: "Combat & Level Designer",
    department: "Game Design",
    location: "Remote",
    type: "Full-Time",
    description: "Design memorable boss encounter arenas, spatial pacing, and enemy choreography for our soulslike title Blade of Aether."
  },
  {
    id: "job-4",
    title: "Mobile Performance Engineer (Unity / Vulkan)",
    department: "Mobile Tech",
    location: "Bengaluru",
    type: "Full-Time",
    description: "Optimize memory budgets, frame times, and thermal throttle headroom for Velocity Drift across low-end to flagship mobile hardware."
  }
];
