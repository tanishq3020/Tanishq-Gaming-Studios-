import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import {
  Gamepad2, Menu, X, ArrowUpRight, Play, Star, ChevronDown,
  Mail, MapPin, Twitter, Youtube, Twitch, Instagram, Github,
  Plus, Zap, GraduationCap, Check, ExternalLink,
  Sparkles, Code2, Bot, Copy, Send, Film, Video, Loader2, ShoppingCart, Info, BookOpen,
  RotateCcw
} from "lucide-react";
import {
  TEAM, GAMEPLAYS, STORE, BLOG, PARTNERS, ACADEMY_URL, ACADEMY_COURSES,
  STREAMING_URL, CHATVIDEO_REPO_URL, CHATVIDEO_LIVE_URL, CODE_GEN_PRESETS,
  DEFAULT_GAMES, DEFAULT_JOBS, GameItem, JobItem, StoreItem, BlogPost
} from "./data/siteContent";
import { PlayableGamesModal } from "./components/PlayableGamesModal";
import { GamesPreviewTab } from "./components/GamesPreviewTab";
import { ChatMessageRenderer } from "./components/ChatMessageRenderer";
import { generateTgsAiAnswer } from "./utils/tgsAiEngine";
import { Toaster, toast } from "sonner";

const API = "/api";

const NAV_LINKS = [
  { id: "game-preview", label: "Previews" },
  { id: "games", label: "Games" },
  { id: "ai-lab", label: "AI Lab" },
  { id: "gameplays", label: "Gameplays" },
  { id: "store", label: "Store" },
  { id: "academy", label: "Academy" },
  { id: "apps", label: "Apps" },
  { id: "team", label: "Team" },
  { id: "blog", label: "Blog" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" }
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (id === "game-preview") {
      const btn = document.querySelector('[data-testid="view-toggle-preview"]') as HTMLButtonElement | null;
      if (btn) btn.click();
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "glass-nav" : ""}`}
    >
      <div className="tgs-container flex items-center justify-between py-4">
        <button
          data-testid="logo-button"
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 group cursor-pointer bg-transparent border-none text-left p-0"
        >
          <span className="w-9 h-9 grid place-items-center bg-[var(--tgs-red)] group-hover:bg-white transition-colors">
            <Gamepad2 className="w-5 h-5 text-white group-hover:text-[var(--tgs-red)]" strokeWidth={2.5} />
          </span>
          <span className="font-display font-black text-sm tracking-tight uppercase hidden sm:block text-white">
            Tanishq Gaming<span className="text-[var(--tgs-red)]">.</span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => scrollTo(l.id)}
              className="nav-link"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs text-white/60 uppercase tracking-widest font-display">
            <span className="dot-live" /> Live
          </span>
          <button
            data-testid="nav-cta-play"
            onClick={() => scrollTo("games")}
            className="btn-ghost"
          >
            Play Now <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          className="lg:hidden text-white bg-transparent border-none cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden glass-nav border-t border-white/5">
          <div className="tgs-container flex flex-col gap-4 py-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`mobile-nav-link-${l.id}`}
                onClick={() => scrollTo(l.id)}
                className="nav-link text-left w-full"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-end overflow-hidden pt-28"
    >
      <img
        src="https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=2200"
        alt="Tanishq Gaming Studios"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="tgs-container relative z-10 pb-24 md:pb-32 w-full">
        <div className="flex items-center gap-3 mb-6 fade-up">
          <span className="dot-live" />
          <span className="eyebrow">Independent Game Studio · Est. 2019</span>
        </div>

        <h1
          data-testid="hero-title"
          className="font-display font-black uppercase text-5xl sm:text-6xl md:text-7xl lg:text-[8.5rem] leading-[0.85] tracking-tighter fade-up delay-1 text-white"
        >
          Tanishq<br />
          <span className="text-[var(--tgs-red)] glitch">Gaming</span> Studios
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-xl text-white/70 fade-up delay-2">
          Play our collection of fast, addictive, 100% free games in your browser — Bubble Shooter, Cricket Smash, and Football Strike. No downloads or paywalls.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 fade-up delay-3">
          <button
            data-testid="hero-cta-preview"
            onClick={() => document.getElementById("game-preview")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" /> Live Game Previews <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            data-testid="hero-cta-portfolio"
            onClick={() => document.getElementById("games")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-secondary"
          >
            All Free Games Catalog
          </button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 md:gap-12 max-w-2xl fade-up delay-4">
          {[
            { k: "100%", v: "Free to Play" },
            { k: "Instant", v: "Browser Play" },
            { k: "6+", v: "Arcade Games" }
          ].map((s, i) => (
            <div key={i} data-testid={`hero-stat-${i}`}>
              <div className="font-display font-black text-3xl md:text-5xl text-white">{s.k}</div>
              <div className="text-xs md:text-sm text-white/55 uppercase tracking-widest mt-2">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 hidden md:flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section data-testid="partners-marquee" className="border-y border-white/5 bg-black py-6 overflow-hidden">
      <div className="marquee">
        <div className="marquee-track font-display uppercase font-bold text-white/35 text-sm tracking-[0.3em]">
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className="flex items-center gap-12">
              {p}
              <span className="text-[var(--tgs-red)]">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Games() {
  const [viewMode, setViewMode] = useState<"preview" | "cards">("preview");
  const [tab, setTab] = useState<"all" | "bubble-shooter" | "cricket" | "football" | "pc" | "mobile">("all");
  const [games, setGames] = useState<GameItem[]>(DEFAULT_GAMES);
  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [playableGame, setPlayableGame] = useState<GameItem | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/games`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length > 0) {
          setGames(r.data);
        }
      })
      .catch(() => {
        // Fallback already in initial state
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = tab === "all"
    ? games
    : tab === "pc" || tab === "mobile"
    ? games.filter((g) => g.platform === tab)
    : games.filter((g) => g.gameType === tab || g.title.toLowerCase().includes(tab.replace("-", " ")));

  return (
    <section id="games" data-testid="games-section" className="section-pad">
      <div className="tgs-container">
        {/* Section Heading & Mode Switcher */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
          <div>
            <p className="eyebrow mb-3">/01 — Free In-Browser Games</p>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white">
              Our Free <span className="text-[var(--tgs-red)]">Games</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl mt-3">
              Play small, fast arcade games right in your browser. Choose between our live interactive preview station or explore full game specs below.
            </p>
          </div>

          {/* Primary View Toggle: Live Preview Tab vs Cards Catalog */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              data-testid="view-toggle-preview"
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-2 px-4 py-2 font-display font-bold uppercase text-xs sm:text-sm tracking-wider cursor-pointer border transition ${
                viewMode === "preview"
                  ? "bg-[var(--tgs-red)] text-white border-[var(--tgs-red)] shadow-lg"
                  : "bg-black/50 text-white/70 border-white/15 hover:text-white hover:border-white/40"
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Live Preview Hub
            </button>
            <button
              data-testid="view-toggle-cards"
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-4 py-2 font-display font-bold uppercase text-xs sm:text-sm tracking-wider cursor-pointer border transition ${
                viewMode === "cards"
                  ? "bg-white text-black border-white shadow-lg"
                  : "bg-black/50 text-white/70 border-white/15 hover:text-white hover:border-white/40"
              }`}
            >
              📋 All Game Cards ({games.length})
            </button>
          </div>
        </div>

        {/* 1. LIVE PREVIEW TAB STATION */}
        {viewMode === "preview" && (
          <div className="mb-12">
            <GamesPreviewTab
              games={games}
              onOpenFullModal={(g) => setPlayableGame(g)}
            />
          </div>
        )}

        {/* 2. GAME CARDS CATALOG */}
        <div className={`transition-all ${viewMode === "preview" ? "pt-8 border-t border-white/10" : ""}`}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h3 className="font-display font-bold uppercase text-lg sm:text-xl text-white">
                Game Titles Catalog
              </h3>
              <span className="text-xs text-white/50">
                ({filtered.length} {filtered.length === 1 ? "game" : "games"})
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
              {[
                { id: "all", label: "All Free" },
                { id: "bubble-shooter", label: "Bubble Shooter" },
                { id: "cricket", label: "Cricket" },
                { id: "football", label: "Football" },
                { id: "pc", label: "PC" },
                { id: "mobile", label: "Mobile" }
              ].map((t) => (
                <button
                  key={t.id}
                  data-testid={`games-tab-${t.id}`}
                  onClick={() => {
                    setTab(t.id as any);
                    if (viewMode !== "cards") {
                      // Keep on viewMode or switch if desired
                    }
                  }}
                  className={`font-display font-bold uppercase text-[11px] sm:text-xs tracking-wider px-3 py-1 cursor-pointer border ${
                    tab === t.id
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white/70 border-white/15 hover:text-white hover:border-white/40"
                  } transition`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

        {loading && games.length === 0 ? (
          <div className="text-white/50 font-display uppercase tracking-widest">Loading…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((g) => (
              <article
                key={g.id}
                data-testid={`game-card-${g.id}`}
                className="game-card tgs-card relative overflow-hidden group border border-white/15 bg-black/40"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={g.cover_image}
                    alt={g.title}
                    className="game-cover absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[var(--tgs-green)] text-black text-[10px] uppercase tracking-widest font-display font-black shadow">
                        {g.badge || "100% FREE"}
                      </span>
                      <span className="px-2 py-1 bg-black/60 backdrop-blur text-[10px] uppercase tracking-widest font-display font-bold border border-white/15 text-white">
                        {g.platform === "pc" ? "PC" : "Mobile"}
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-black/60 backdrop-blur text-[10px] uppercase tracking-widest font-display font-bold border border-white/15 flex items-center gap-1 text-white">
                      <Star className="w-3 h-3 fill-[var(--tgs-red)] text-[var(--tgs-red)]" /> {g.rating}
                    </span>
                  </div>

                  {/* Card Bottom Details */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--tgs-green)] font-display mb-1 font-bold">
                      {g.genre}
                    </div>
                    <h3 className="font-display font-black text-2xl uppercase leading-tight text-white mb-3">
                      {g.title}
                    </h3>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <button
                        data-testid={`game-play-${g.id}`}
                        onClick={() => setPlayableGame(g)}
                        className="btn-primary py-2 px-3.5 text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Play Free Now
                      </button>
                      <button
                        data-testid={`game-cta-${g.id}`}
                        onClick={() => setSelectedGame(g)}
                        className="text-xs font-display uppercase tracking-widest flex items-center gap-1 text-white/70 hover:text-white transition bg-transparent border-none cursor-pointer"
                      >
                        Details <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Game Details Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tgs-card max-w-2xl w-full bg-[var(--tgs-surface)] border border-white/20 p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedGame(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 bg-[var(--tgs-green)] text-black text-[10px] uppercase tracking-widest font-display font-black">
                100% Free Game
              </span>
              <span className="px-2.5 py-1 bg-[var(--tgs-red)] text-white text-[10px] uppercase tracking-widest font-display font-bold">
                {selectedGame.platform === 'pc' ? 'PC Ready' : 'Mobile Ready'}
              </span>
              <span className="text-white/60 text-xs font-display uppercase tracking-widest">
                {selectedGame.engine || 'Web Engine'}
              </span>
            </div>
            <h3 className="font-display font-black uppercase text-3xl text-white">{selectedGame.title}</h3>
            <p className="text-white/60 text-sm mt-1">{selectedGame.genre} · {selectedGame.release_date || 'Instant Play'}</p>
            
            <div className="mt-6 aspect-video overflow-hidden border border-white/10 relative">
              <img src={selectedGame.cover_image} alt={selectedGame.title} className="w-full h-full object-cover" />
            </div>

            <p className="mt-5 text-white/80 leading-relaxed text-sm">
              {selectedGame.description || 'An instant free arcade game by Tanishq Gaming Studios.'}
            </p>

            {selectedGame.features && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <h4 className="text-xs uppercase tracking-widest font-display text-[var(--tgs-green)] mb-3">Game Features</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  {selectedGame.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[var(--tgs-green)] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-display font-black text-2xl text-[var(--tgs-green)]">
                Free to Play
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const g = selectedGame;
                    setSelectedGame(null);
                    setPlayableGame(g);
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" /> Play In Browser Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Playable Mini-Game Modal */}
      {playableGame && (
        <PlayableGamesModal
          game={playableGame}
          onClose={() => setPlayableGame(null)}
        />
      )}
    </section>
  );
}

function AILab() {
  const [engine, setEngine] = useState("unity");
  const [prompt, setPrompt] = useState(CODE_GEN_PRESETS[0].prompt);
  const [code, setCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi. I'm TGS-AI, the engineering intelligence of Tanishq Gaming Studios. Ask me anything — game mechanics, engine debugging (Unity / Unreal / Godot), math, monetization, or TGS lore." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages, chatLoading]);

  const sendChatMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || chatLoading) return;

    const userMsg = { role: "user" as const, content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const { data } = await axios.post(`${API}/ai/chat`, {
        session_id: sessionId,
        message: text,
        history: updatedMessages
      });
      if (data?.session_id) setSessionId(data.session_id);
      if (data?.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      } else {
        const fallback = generateTgsAiAnswer(text, updatedMessages);
        setMessages((m) => [...m, { role: "assistant", content: fallback }]);
      }
    } catch {
      // Immediate fallback to local intelligence engine
      const fallback = generateTgsAiAnswer(text, updatedMessages);
      setMessages((m) => [...m, { role: "assistant", content: fallback }]);
    } finally {
      setChatLoading(false);
    }
  };

  const sendChat = (e: React.FormEvent) => {
    e.preventDefault();
    sendChatMessage(chatInput);
  };

  const resetChat = () => {
    setMessages([
      { role: "assistant", content: "Chat history cleared. I'm TGS-AI — what game development challenge or question can I assist you with?" }
    ]);
    setSessionId(null);
    toast.success("Chat reset");
  };

  const promptSuggestions = [
    "Quaternions & Math",
    "Optimize Unity Draw Calls",
    "Unreal GAS Architecture",
    "Hitstop & Game Juice",
    "TGS Games Roster",
    "Steam Wishlist Strategy"
  ];

  const runCodeGen = async () => {
    if (!prompt.trim()) return;
    setCodeLoading(true);
    setCode("");
    try {
      const { data } = await axios.post(`${API}/ai/code-gen`, { prompt, engine });
      setCode(data.reply);
      toast.success("Game code generated!");
    } catch {
      toast.error("AI code-gen failed. Try again.");
    } finally {
      setCodeLoading(false);
    }
  };

  const copyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard.");
  };

  const engines = [
    { id: "unity", label: "Unity" },
    { id: "unreal", label: "Unreal" },
    { id: "godot", label: "Godot" },
    { id: "web", label: "Web / JS" },
    { id: "python", label: "Python" }
  ];

  return (
    <section id="ai-lab" data-testid="ai-lab-section" className="section-pad bg-[var(--tgs-surface)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-[130px] bg-[var(--tgs-green)]/15" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[130px] bg-[var(--tgs-red)]/20" />
      </div>

      <div className="tgs-container relative">
        <div className="mb-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Sparkles className="w-4 h-4" /> /02 — AI Lab · Powered by ChatGPT & Gemini
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase leading-[0.9] text-white">
            Build Games with <span className="text-[var(--tgs-red)]">AI</span>.<br />
            Solve any <span className="text-[var(--tgs-green)]">Problem</span>.
          </h2>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">
            An in-house AI toolkit for our devs and academy students. Generate
            production-ready game code with one click, or ask TGS-AI to debug,
            explain and design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Code Generator */}
          <div className="lg:col-span-7 tgs-card p-6 md:p-8">
            <div className="flex items-center gap-2 mb-1">
              <Code2 className="w-4 h-4 text-[var(--tgs-red)]" />
              <span className="eyebrow">AI Code Generator</span>
            </div>
            <h3 className="font-display font-bold uppercase text-2xl mt-1 text-white">Prompt → Playable code</h3>

            <div className="mt-6 flex flex-wrap gap-2">
              {engines.map((e) => (
                <button
                  key={e.id}
                  data-testid={`ai-engine-${e.id}`}
                  onClick={() => setEngine(e.id)}
                  className={`px-3 py-1.5 text-xs font-display uppercase tracking-widest border transition cursor-pointer ${
                    engine === e.id
                      ? "bg-[var(--tgs-red)] border-[var(--tgs-red)] text-white"
                      : "bg-transparent border-white/15 text-white/70 hover:border-[var(--tgs-red)]"
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>

            <textarea
              data-testid="ai-code-prompt"
              rows={3}
              className="input-sharp mt-4 resize-none"
              placeholder="e.g. Unity C# script for a wall-jump platformer character"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="mt-3 flex flex-wrap gap-2">
              {CODE_GEN_PRESETS.map((p) => (
                <button
                  key={p.id}
                  data-testid={`ai-preset-${p.id}`}
                  onClick={() => { setPrompt(p.prompt); setEngine(p.engine); }}
                  className="text-[11px] font-display uppercase tracking-widest px-3 py-1.5 border border-white/10 text-white/60 hover:border-[var(--tgs-green)] hover:text-[var(--tgs-green)] transition bg-transparent cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                data-testid="ai-generate-btn"
                onClick={runCodeGen}
                disabled={codeLoading}
                className="btn-primary disabled:opacity-50"
              >
                {codeLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate Code</>
                )}
              </button>

              {code && (
                <button data-testid="ai-copy-btn" onClick={copyCode} className="btn-ghost">
                  <Copy className="w-4 h-4" /> Copy
                </button>
              )}
            </div>

            {code && (
              <pre
                data-testid="ai-code-output"
                className="mt-5 p-4 bg-black border border-white/10 text-[13px] leading-relaxed text-white/85 overflow-auto max-h-[420px] font-mono whitespace-pre-wrap"
              >
                {code}
              </pre>
            )}
          </div>

          {/* Chat Assistant */}
          <div className="lg:col-span-5 tgs-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-[var(--tgs-green)]" />
                    <span className="eyebrow" style={{ color: "var(--tgs-green)" }}>TGS-AI Chat</span>
                  </div>
                  <h3 className="font-display font-bold uppercase text-2xl mt-1 text-white">Ask. Solve. Ship.</h3>
                </div>
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-2.5 py-1.5 rounded transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              <div
                ref={chatLogRef}
                data-testid="ai-chat-log"
                className="mt-5 bg-black/90 border border-white/10 p-4 h-[380px] overflow-y-auto space-y-4 rounded-sm"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    data-testid={`ai-chat-msg-${m.role}`}
                    className={`text-sm ${m.role === "user" ? "text-white" : "text-white/85"}`}
                  >
                    <div className={`text-[10px] uppercase tracking-widest font-display mb-1 flex items-center justify-between ${m.role === "user" ? "text-[var(--tgs-red)]" : "text-[var(--tgs-green)]"}`}>
                      <span>{m.role === "user" ? "You" : "TGS-AI"}</span>
                      <span className="text-[9px] text-white/30 font-mono">
                        {m.role === "assistant" ? "interactive engine" : "dev"}
                      </span>
                    </div>
                    <div className="leading-relaxed">
                      <ChatMessageRenderer content={m.content} />
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="text-xs text-emerald-400 flex items-center gap-2 bg-emerald-950/20 border border-emerald-500/20 p-2.5 rounded">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                    <span>Synthesizing game engineering analysis…</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="mt-3">
                <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1.5 font-display">Suggested Prompts:</div>
                <div className="flex flex-wrap gap-1.5">
                  {promptSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => sendChatMessage(s)}
                      disabled={chatLoading}
                      className="text-[11px] px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[var(--tgs-green)] text-white/70 hover:text-white transition cursor-pointer disabled:opacity-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <form onSubmit={sendChat} className="mt-4 flex gap-2" data-testid="ai-chat-form">
              <input
                data-testid="ai-chat-input"
                className="input-sharp flex-1"
                placeholder="Ask about Unity, Unreal, math, publishing, lore…"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button
                data-testid="ai-chat-send"
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="btn-primary disabled:opacity-50 px-5"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gameplays() {
  return (
    <section id="gameplays" data-testid="gameplays-section" className="section-pad bg-[var(--tgs-surface)]">
      <div className="tgs-container">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">/02 — Quick Gameplays</p>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white">
              Watch the <span className="text-[var(--tgs-green)]">Action</span>
            </h2>
          </div>
          <a
            data-testid="youtube-channel-link"
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            <Youtube className="w-4 h-4" /> Our YouTube Channels
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {GAMEPLAYS.map((v) => (
            <div
              key={v.id}
              data-testid={`gameplay-${v.id}`}
              className="tgs-card overflow-hidden"
            >
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full border-0"
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold uppercase text-lg leading-tight text-white">{v.title}</h3>
                  <p className="text-xs text-white/55 mt-1 uppercase tracking-widest font-display">{v.channel}</p>
                </div>
                <span className="dot-live" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Store() {
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);

  const handleQuickAdd = (item: StoreItem) => {
    toast.success(`Added ${item.title} ($${item.price.toFixed(2)}) to your cart!`);
  };

  return (
    <section id="store" data-testid="store-section" className="section-pad">
      <div className="tgs-container">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">/03 — Studio Store</p>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white">
              Gear <span className="text-[var(--tgs-red)]">Up</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              Pro gaming chairs, mechanical keyboards, apparel — built for the players who never quit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {STORE.map((item) => (
            <article
              key={item.id}
              data-testid={`store-item-${item.id}`}
              className={`tgs-card relative overflow-hidden group ${item.span}`}
            >
              <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <span
                  className={`absolute top-4 left-4 px-2 py-1 text-[10px] uppercase tracking-widest font-display font-bold border ${
                    item.tag === "In Stock"
                      ? "text-[var(--tgs-green)] border-[var(--tgs-green)]/60 bg-black/60"
                      : item.tag === "Limited"
                      ? "text-[var(--tgs-red)] border-[var(--tgs-red)]/60 bg-black/60"
                      : "text-white/80 border-white/30 bg-black/60"
                  }`}
                >
                  {item.tag}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <div>
                    <h3 className="font-display font-black uppercase text-xl md:text-2xl leading-tight text-white">{item.title}</h3>
                    <div className="mt-2 font-display font-black text-2xl text-[var(--tgs-green)]" data-testid={`store-price-${item.id}`}>
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <button
                    data-testid={`store-cta-${item.id}`}
                    onClick={() => handleQuickAdd(item)}
                    className="w-12 h-12 grid place-items-center bg-[var(--tgs-red)] hover:bg-white hover:text-[var(--tgs-red)] text-white transition border-none cursor-pointer"
                    aria-label={`Add ${item.title} to cart`}
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Academy() {
  return (
    <section id="academy" data-testid="academy-section" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-[120px] bg-[var(--tgs-red)]/25" />
        <div className="absolute -bottom-32 -right-24 w-[520px] h-[520px] rounded-full blur-[120px] bg-[var(--tgs-green)]/20" />
      </div>

      <div className="tgs-container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4 flex items-center gap-3">
              <GraduationCap className="w-4 h-4" /> /04 — Master Academy
            </p>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase leading-[0.9] text-white">
              Learn. Build. Play. <span className="text-[var(--tgs-green)]">Earn.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-white/70 text-lg">
              The <span className="text-[var(--tgs-red)] font-semibold">Tanishq Gaming Course Master Academy</span> —
              our official school of game development. From your first
              &quot;Hello World&quot; in Unity to shipping a monetized title on Steam,
              four tiers take you from zero to shipped.
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a
              data-testid="academy-visit-hero"
              href={ACADEMY_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Visit Academy <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {ACADEMY_COURSES.map((c, i) => (
            <article
              key={c.id}
              data-testid={`academy-course-${c.id}`}
              className={`tgs-card p-6 relative flex flex-col ${c.id === "popular" ? "border-[var(--tgs-red)]/60" : ""}`}
            >
              {c.id === "popular" && (
                <span className="absolute -top-3 left-6 px-2 py-1 bg-[var(--tgs-red)] text-white text-[10px] uppercase tracking-widest font-display font-bold">
                  Most Popular
                </span>
              )}
              <div className="text-[10px] uppercase tracking-[0.25em] font-display text-[var(--tgs-green)]">{c.tier}</div>
              <h3 className="font-display font-bold uppercase text-xl mt-2 leading-tight text-white">{c.title}</h3>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display font-black text-4xl text-white">${c.price}</span>
                <span className="text-white/50 text-xs uppercase tracking-widest font-display">/ course</span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-widest font-display text-white/50">{c.badge}</div>

              <ul className="mt-6 space-y-2 text-sm text-white/70 flex-1">
                {c.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 mt-0.5 text-[var(--tgs-green)] shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <a
                data-testid={`academy-enroll-${c.id}`}
                href={ACADEMY_URL}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 ${i === 1 ? "btn-primary" : "btn-secondary"} justify-center w-full`}
              >
                Enroll Now <ArrowUpRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>

        {/* Embedded preview + CTA */}
        <div className="tgs-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative bg-black">
              <div className="aspect-[16/10] w-full">
                <iframe
                  data-testid="academy-iframe"
                  src={ACADEMY_URL}
                  title="Tanishq Gaming Course Master Academy"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
              <span className="absolute top-4 left-4 px-2 py-1 bg-black/70 backdrop-blur text-[10px] uppercase tracking-widest font-display font-bold border border-white/15 text-white">
                Live Preview
              </span>
            </div>

            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center">
              <p className="eyebrow mb-3">Official Academy</p>
              <h3 className="font-display font-black uppercase text-3xl md:text-4xl leading-[0.95] text-white">
                Enroll in the<br />
                <span className="text-[var(--tgs-red)]">Skill Forge</span>.
              </h3>
              <p className="mt-5 text-white/70">
                Interactive courses, real projects, and mentor feedback from
                shipping devs at Tanishq Gaming Studios. Start free, upgrade
                any time.
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/75">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--tgs-green)]" /> 4 tiers · Beginner to Expert</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--tgs-green)]" /> Unity + Unreal covered</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[var(--tgs-green)]" /> Publish & monetize your own game</div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  data-testid="academy-open-btn"
                  href={ACADEMY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Open Academy <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  data-testid="academy-copy-link"
                  href={ACADEMY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  {ACADEMY_URL.replace("https://", "")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Apps() {
  return (
    <section id="apps" data-testid="apps-section" className="section-pad">
      <div className="tgs-container">
        <div className="mb-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <Zap className="w-4 h-4" /> /05 — Studio Apps
          </p>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase leading-[0.9] text-white">
            More from the <span className="text-[var(--tgs-red)]">Lab</span>
          </h2>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">
            Side projects, tools and demos shipped by the studio and the community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Streaming Hub */}
          <article data-testid="app-streaming" className="tgs-card overflow-hidden group">
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1400"
                alt="TGS Streaming Hub"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <span className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 bg-black/70 backdrop-blur text-[10px] uppercase tracking-widest font-display font-bold border border-white/15 text-[var(--tgs-red)]">
                <Film className="w-3 h-3" /> Streaming Hub
              </span>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-tight text-white">TGS Streaming Hub</h3>
                <p className="text-white/70 text-sm mt-2 max-w-md">
                  Our showcase reel of story-driven titles and cinematic worlds — Netflix-style browse for game universes.
                </p>
              </div>
            </div>
            <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-[11px] font-display uppercase tracking-widest text-white/50 truncate">
                {STREAMING_URL.replace("https://", "")}
              </span>
              <a
                data-testid="app-streaming-open"
                href={STREAMING_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                Open App <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </article>

          {/* ChatVideo */}
          <article data-testid="app-chatvideo" className="tgs-card overflow-hidden group">
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1400"
                alt="ChatVideo"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <span className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 bg-black/70 backdrop-blur text-[10px] uppercase tracking-widest font-display font-bold border border-white/15 text-[var(--tgs-green)]">
                <Video className="w-3 h-3" /> ChatVideo
              </span>
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-tight text-white">ChatVideo — AI Video Chat</h3>
                <p className="text-white/70 text-sm mt-2 max-w-md">
                  AI-powered video chat app built by Tanishq — real-time video, smart transcripts, and human-first UX.
                </p>
              </div>
            </div>
            <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
              <span className="text-[11px] font-display uppercase tracking-widest text-white/50 truncate">
                github.com/tanishq3020/ChatVideo
              </span>
              <div className="flex gap-2">
                <a
                  data-testid="app-chatvideo-repo"
                  href={CHATVIDEO_LIVE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <Github className="w-4 h-4" /> Repo
                </a>
                <a
                  data-testid="app-chatvideo-clone"
                  href={CHATVIDEO_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  Clone <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" data-testid="team-section" className="section-pad bg-[var(--tgs-surface)]">
      <div className="tgs-container">
        <div className="mb-12">
          <p className="eyebrow mb-4">/05 — The Crew</p>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white">
            Meet the <span className="text-[var(--tgs-red)]">Studio</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <div
              key={m.id}
              data-testid={`team-card-${m.id}`}
              className="team-card tgs-card overflow-hidden group"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={m.image}
                  alt={m.name}
                  className="portrait w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[10px] uppercase tracking-widest font-display text-[var(--tgs-red)]">{m.role}</div>
                  <h3 className="font-display font-black uppercase text-xl mt-1 text-white">{m.name}</h3>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed">{m.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" data-testid="blog-section" className="section-pad">
      <div className="tgs-container">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">/06 — News & Devlog</p>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white">
              Latest <span className="text-[var(--tgs-green)]">Drops</span>
            </h2>
          </div>
          <button
            data-testid="blog-view-all"
            onClick={() => toast.info("All latest devlogs are displayed below.")}
            className="btn-ghost"
          >
            All Posts <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG.map((p) => (
            <article key={p.id} data-testid={`blog-post-${p.id}`} className="tgs-card overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-display">
                  <span className="text-[var(--tgs-red)] font-bold">{p.tag}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/60">{p.date}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/60">{p.readTime}</span>
                </div>
                <h3 className="font-display font-bold uppercase text-xl leading-tight mt-3 text-white">{p.title}</h3>
                <p className="text-sm text-white/60 mt-3">{p.excerpt}</p>
                <button
                  data-testid={`blog-read-${p.id}`}
                  onClick={() => setSelectedPost(p)}
                  className="mt-5 text-xs font-display uppercase tracking-widest flex items-center gap-1 text-white hover:text-[var(--tgs-red)] transition bg-transparent border-none cursor-pointer"
                >
                  Read More <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="tgs-card max-w-2xl w-full bg-[var(--tgs-surface)] border border-white/20 p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white bg-transparent border-none cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest font-display mb-3">
              <span className="text-[var(--tgs-red)] font-bold">{selectedPost.tag}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">{selectedPost.date}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">{selectedPost.readTime}</span>
            </div>
            <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-white">{selectedPost.title}</h3>
            
            <div className="mt-6 aspect-video overflow-hidden border border-white/10">
              <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            <div className="mt-6 text-white/80 leading-relaxed space-y-4 text-sm whitespace-pre-wrap">
              {selectedPost.content || selectedPost.excerpt}
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
              <button onClick={() => setSelectedPost(null)} className="btn-secondary">
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Careers({ onApplyJob }: { onApplyJob: (jobTitle: string) => void }) {
  const [jobs, setJobs] = useState<JobItem[]>(DEFAULT_JOBS);

  useEffect(() => {
    axios.get(`${API}/jobs`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length > 0) {
          setJobs(r.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="careers" data-testid="careers-section" className="section-pad bg-[var(--tgs-surface)]">
      <div className="tgs-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">/07 — Careers</p>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase leading-[0.9] text-white">
              Join the<br />
              <span className="text-[var(--tgs-red)]">Rebellion</span>.
            </h2>
            <p className="mt-6 text-white/65 max-w-md">
              We don&apos;t make boring games. We don&apos;t hire boring people. If you
              live and breathe games, we&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex items-center gap-3 text-white/55">
              <Zap className="w-4 h-4 text-[var(--tgs-green)]" />
              <span className="text-sm uppercase tracking-widest font-display">{jobs.length} open positions</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {jobs.map((j) => (
              <details key={j.id} data-testid={`job-${j.id}`} className="tgs-accordion tgs-card p-6">
                <summary className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold uppercase text-xl leading-tight text-white">{j.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-3 text-[10px] uppercase tracking-widest font-display text-white/60">
                      <span className="text-[var(--tgs-green)]">{j.department}</span>
                      <span>·</span>
                      <span>{j.location}</span>
                      <span>·</span>
                      <span>{j.type}</span>
                    </div>
                  </div>
                  <span className="chev w-10 h-10 grid place-items-center border border-white/20 text-white/70 shrink-0">
                    <Plus className="w-4 h-4" />
                  </span>
                </summary>
                <p className="mt-5 text-white/65">{j.description}</p>
                <button
                  data-testid={`job-apply-${j.id}`}
                  onClick={() => onApplyJob(j.title)}
                  className="btn-primary mt-6"
                >
                  Apply Now <ArrowUpRight className="w-4 h-4" />
                </button>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ initialSubject = "" }: { initialSubject?: string }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      setForm((prev) => ({ ...prev, subject: `Application: ${initialSubject}` }));
    }
  }, [initialSubject]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent. We'll be in touch.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="section-pad">
      <div className="tgs-container grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">/08 — Contact</p>
          <h2 className="font-display font-black text-5xl md:text-7xl uppercase leading-[0.9] text-white">
            Drop a<br /><span className="text-[var(--tgs-red)]">Line</span>.
          </h2>
          <p className="mt-6 text-white/65 max-w-md">
            Press, partnerships, fan mail, or applications — we read everything.
          </p>

          <div className="mt-10 space-y-4 text-white/75">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[var(--tgs-red)]" />
              <span className="font-display text-sm uppercase tracking-widest">hello@tanishqgaming.studio</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[var(--tgs-red)]" />
              <span className="font-display text-sm uppercase tracking-widest">Bengaluru, India</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={submit}
          data-testid="contact-form"
          className="lg:col-span-7 tgs-card p-8 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-display text-white/60 mb-2">Name</label>
              <input
                data-testid="contact-input-name"
                required
                className="input-sharp"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-display text-white/60 mb-2">Email</label>
              <input
                data-testid="contact-input-email"
                required
                type="email"
                className="input-sharp"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-display text-white/60 mb-2">Subject</label>
            <input
              data-testid="contact-input-subject"
              className="input-sharp"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest font-display text-white/60 mb-2">Message</label>
            <textarea
              data-testid="contact-input-message"
              required
              rows={6}
              className="input-sharp resize-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <button
            data-testid="contact-submit"
            type="submit"
            disabled={submitting}
            className="btn-primary disabled:opacity-50"
          >
            {submitting ? "Sending…" : "Send Message"} <ArrowUpRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await axios.post(`${API}/subscribe`, { email });
      toast.success("Welcome to the squad.");
      setEmail("");
    } catch (err: any) {
      if (err.response?.status === 409) toast.message("Already subscribed.");
      else toast.error("Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section data-testid="newsletter-section" className="border-y border-white/10 bg-black">
      <div className="tgs-container py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="eyebrow mb-3">Newsletter</p>
          <h3 className="font-display font-black text-3xl md:text-5xl uppercase leading-[0.95] text-white">
            Get launch alerts.<br />
            <span className="text-[var(--tgs-green)]">Free credits.</span> No spam.
          </h3>
        </div>

        <form onSubmit={submit} data-testid="newsletter-form" className="flex w-full md:w-auto items-stretch gap-0">
          <input
            data-testid="newsletter-email"
            type="email"
            required
            placeholder="your@email.com"
            className="input-sharp md:w-80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button data-testid="newsletter-submit" type="submit" disabled={busy} className="btn-primary disabled:opacity-50">
            {busy ? "…" : "Join"} <ArrowUpRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [
    { icon: Twitter, href: "https://twitter.com", id: "twitter" },
    { icon: Youtube, href: "https://youtube.com", id: "youtube" },
    { icon: Twitch, href: "https://twitch.tv", id: "twitch" },
    { icon: Instagram, href: "https://instagram.com", id: "instagram" },
    { icon: Github, href: "https://github.com", id: "github" }
  ];

  return (
    <footer data-testid="site-footer" className="bg-black pt-20">
      <div className="tgs-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-9 h-9 grid place-items-center bg-[var(--tgs-red)]">
                <Gamepad2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              </span>
              <span className="font-display font-black text-sm tracking-tight uppercase text-white">
                Tanishq Gaming<span className="text-[var(--tgs-red)]">.</span>
              </span>
            </div>
            <p className="text-white/55 max-w-sm">
              An independent studio building cinematic worlds for PC and mobile.
              Bengaluru. Worldwide.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    data-testid={`social-${s.id}`}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 grid place-items-center border border-white/15 text-white/70 hover:border-[var(--tgs-red)] hover:text-[var(--tgs-red)] transition"
                    aria-label={`Visit our ${s.id}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-display uppercase text-xs tracking-widest text-[var(--tgs-red)] mb-4">Studio</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a data-testid="footer-link-about" href="#team" className="hover:text-white transition">About</a></li>
              <li><a data-testid="footer-link-careers" href="#careers" className="hover:text-white transition">Careers</a></li>
              <li><a data-testid="footer-link-blog" href="#blog" className="hover:text-white transition">Blog</a></li>
              <li><a data-testid="footer-link-press" href="#contact" className="hover:text-white transition">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase text-xs tracking-widest text-[var(--tgs-red)] mb-4">Games</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a data-testid="footer-link-pc" href="#games" className="hover:text-white transition">PC Titles</a></li>
              <li><a data-testid="footer-link-mobile" href="#games" className="hover:text-white transition">Mobile Titles</a></li>
              <li><a data-testid="footer-link-gameplays" href="#gameplays" className="hover:text-white transition">Gameplays</a></li>
              <li><a data-testid="footer-link-store" href="#store" className="hover:text-white transition">Store</a></li>
              <li><a data-testid="footer-link-academy" href="#academy" className="hover:text-white transition">Academy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display uppercase text-xs tracking-widest text-[var(--tgs-red)] mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a data-testid="footer-link-contact" href="#contact" className="hover:text-white transition">Contact</a></li>
              <li><a data-testid="footer-link-faq" href="#contact" className="hover:text-white transition">FAQ</a></li>
              <li><a data-testid="footer-link-terms" href="#contact" className="hover:text-white transition">Terms</a></li>
              <li><a data-testid="footer-link-privacy" href="#contact" className="hover:text-white transition">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="watermark text-[18vw] md:text-[16rem] text-center select-none pointer-events-none">
          TANISHQ
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/45 font-display uppercase tracking-widest">
          <span>© {new Date().getFullYear()} Tanishq Gaming Studios. All rights reserved.</span>
          <span>Made with <span className="text-[var(--tgs-red)]">♦</span> in Bengaluru</span>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  const [applyJobTitle, setApplyJobTitle] = useState("");

  useEffect(() => {
    axios.get(`${API}/`).catch(() => {});
  }, []);

  const handleApplyJob = (jobTitle: string) => {
    setApplyJobTitle(jobTitle);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App grain">
      <Toaster theme="dark" position="bottom-right" richColors />
      <Navbar />
      <Hero />
      <Marquee />
      <Games />
      <AILab />
      <Gameplays />
      <Store />
      <Academy />
      <Apps />
      <Team />
      <Blog />
      <Careers onApplyJob={handleApplyJob} />
      <Newsletter />
      <Contact initialSubject={applyJobTitle} />
      <Footer />
    </div>
  );
}

export default App;
