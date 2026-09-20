import React, { useState } from "react";
import {
  Gamepad2,
  Code2,
  Sparkles,
  Bot,
  FileSearch,
  ArrowRight,
  ShieldCheck,
  Zap,
  Terminal,
  Cpu,
  Layers,
  Send,
  MessageSquare,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Mail
} from "lucide-react";
import { TgsLogo } from "./TgsLogo";
import { SOCIAL_LINKS, CONTACT_INFO } from "../data/siteContent";

interface Props {
  onStartChatting: () => void;
  onOpenGameDev: () => void;
  onGoToStudio: () => void;
  onOpenContact?: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStartChatting, onOpenGameDev, onGoToStudio, onOpenContact }) => {
  const [demoPrompt, setDemoPrompt] = useState("How does TGS AI optimize Unity draw calls?");
  const [demoAnswer, setDemoAnswer] = useState<string | null>(
    "TGS AI implements dynamic occlusion culling, GPU instancing batches, texture atlasing, and LOD groups—reducing draw calls by up to 74% in mobile and PC titles."
  );

  const features = [
    {
      icon: <Bot className="w-6 h-6 text-[var(--tgs-blue)]" />,
      title: "AI Chat Intelligence",
      tag: "Every Prompt Answered",
      desc: "Instant, authoritative answers to each and every question with complete markdown clarity, math equations, and technical depth."
    },
    {
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      title: "Coding Assistant",
      tag: "Syntax & Architecture",
      desc: "Generate robust, bug-free code in TypeScript, Python, C++, C#, Rust, and JavaScript with inline explanations and syntax highlighting."
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-[var(--tgs-red-bright)]" />,
      title: "Game Development Assistant",
      tag: "Unity • UE5 • Godot",
      desc: "Specialized in 3D physics, quaternions, character controllers, enemy AI state machines, and gameplay loops."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Creative AI & Worldbuilding",
      tag: "Lore & Narrative",
      desc: "Draft gripping story arcs, game design documents (GDD), NPC dialogues, item descriptions, and atmospheric lore."
    },
    {
      icon: <FileSearch className="w-6 h-6 text-sky-400" />,
      title: "File & Image Analysis",
      tag: "Multimodal Deep Dive",
      desc: "Attach code snippets, log files, design mockups, and gameplay screenshots for real-time architectural review."
    }
  ];

  const handleRunDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoPrompt.trim()) return;
    setDemoAnswer(`Analyzing "${demoPrompt}"... TGS AI delivers comprehensive code snippets and game architectures instantly.`);
  };

  return (
    <div className="min-h-screen bg-[#060913] text-white flex flex-col selection:bg-[var(--tgs-blue)] selection:text-black">
      {/* Top Navbar */}
      <header className="h-20 px-4 sm:px-8 border-b border-white/10 bg-[#060913]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        <TgsLogo size="md" showTagline={true} />

        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenContact && (
            <button
              type="button"
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 text-xs font-semibold border border-white/10 transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--tgs-red)]" />
              <span className="hidden sm:inline">Contact</span>
            </button>
          )}

          <button
            type="button"
            onClick={onGoToStudio}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white text-xs font-bold transition cursor-pointer shadow-sm shadow-[var(--tgs-red)]/20"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Tanishq Gaming Studios</span>
          </button>

          <button
            type="button"
            onClick={onStartChatting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--tgs-blue)] to-[var(--tgs-blue-electric)] text-[#040814] font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[var(--tgs-blue)]/20 hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <span>Launch Chat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto text-center flex flex-col items-center justify-center overflow-hidden">
        {/* Ambient neon radial glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.18),transparent_70%)] pointer-events-none" />
        <div className="absolute top-12 left-1/4 w-[300px] h-[250px] bg-[radial-gradient(ellipse_at_center,rgba(255,51,68,0.12),transparent_70%)] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[var(--tgs-blue)] mb-6 font-mono">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Tanishq Gaming Studios Official Intelligence</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase">
          Meet <span className="text-[var(--tgs-blue)] text-glow-blue">TGS AI</span>
        </h1>

        <p className="mt-4 font-display font-semibold text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-white/70 max-w-2xl">
          Create. Code. Game. Imagine.
        </p>

        <p className="mt-4 text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
          The next-generation AI assistant purpose-built for game engineers, creators, and developers. Answering each and every prompt with precision.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
          <button
            type="button"
            onClick={onStartChatting}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[var(--tgs-blue)] to-[var(--tgs-blue-electric)] text-[#040814] font-extrabold text-sm sm:text-base shadow-xl shadow-[var(--tgs-blue)]/30 hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <span>Start Chatting</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onGoToStudio}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white font-bold text-sm sm:text-base shadow-lg shadow-[var(--tgs-red)]/25 transition active:scale-95 cursor-pointer"
          >
            <Gamepad2 className="w-5 h-5 text-white" />
            <span>Explore Tanishq Gaming Studios</span>
          </button>
        </div>

        {/* Live Interactive Preview Card */}
        <div className="mt-14 w-full max-w-3xl glass-panel rounded-2xl border border-white/15 p-5 text-left shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 font-mono text-[var(--tgs-blue)]">TGS-AI-Console-v2.5</span>
            </div>
            <span className="font-mono">Live Interactive Demo</span>
          </div>

          <form onSubmit={handleRunDemo} className="flex gap-2 mb-3">
            <input
              type="text"
              value={demoPrompt}
              onChange={(e) => setDemoPrompt(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[var(--tgs-blue)]"
              placeholder="Ask anything about game development or code…"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[var(--tgs-blue)] text-black font-bold text-xs hover:bg-[var(--tgs-blue-electric)] transition cursor-pointer flex items-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>

          {demoAnswer && (
            <div className="p-3.5 rounded-xl bg-black/60 border border-[var(--tgs-blue)]/30 text-xs sm:text-sm text-sky-100/90 leading-relaxed font-sans">
              <div className="flex items-center gap-2 mb-1.5 text-[11px] font-bold text-[var(--tgs-blue)]">
                <Bot className="w-3.5 h-3.5" />
                <span>TGS AI Response:</span>
              </div>
              <p>{demoAnswer}</p>
            </div>
          )}
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Engineered for Modern Creators & Game Studios
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-md mx-auto">
            From algorithmic shader math to deep narrative worldbuilding, TGS AI powers your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl glass-panel border border-white/10 hover:border-[var(--tgs-blue)]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-md hover:shadow-[var(--tgs-blue)]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-[var(--tgs-blue)]/40 transition">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-white/50">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-white group-hover:text-[var(--tgs-blue)] transition">
                  {feat.title}
                </h3>
                <p className="text-xs text-white/65 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center text-[11px] font-bold text-[var(--tgs-blue)] group-hover:translate-x-1 transition-transform">
                <span>Explore capability →</span>
              </div>
            </div>
          ))}

          {/* Bonus CTA card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--tgs-red)]/20 via-[var(--tgs-navy)] to-[var(--tgs-blue)]/20 border border-[var(--tgs-red)]/40 flex flex-col justify-between">
            <div>
              <div className="p-3 w-fit rounded-xl bg-[var(--tgs-red)]/30 border border-[var(--tgs-red)]/50 mb-4">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                TGS Master Academy & Games
              </h3>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">
                Connect directly with Tanishq Gaming Studios' original releases including Bubble Shooter Blitz, Cricket Smash, Football Strike, and Cyber Samurai.
              </p>
            </div>
            <button
              type="button"
              onClick={onStartChatting}
              className="mt-6 w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-white/90 transition cursor-pointer"
            >
              Launch TGS AI Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Social Links */}
      <footer className="mt-auto border-t border-white/10 bg-[#050811] py-8 px-4 sm:px-8 text-center text-xs text-white/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <TgsLogo size="sm" showTagline={true} />

          {/* Social Links Row */}
          <div className="flex items-center gap-2.5">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram: @tanishq_3_0_1"
              className="w-8 h-8 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 hover:text-white transition"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              title="YouTube: Tanishq Gaming Studios"
              className="w-8 h-8 rounded-lg bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 hover:text-white transition"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn: Tanishq Gaming Studios"
              className="w-8 h-8 rounded-lg bg-sky-600/10 hover:bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400 hover:text-white transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook: Tanishq Gaming Studios"
              className="w-8 h-8 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:text-white transition"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-5 text-xs text-white/60">
            <button type="button" onClick={onStartChatting} className="hover:text-white cursor-pointer">
              Chat
            </button>
            <button type="button" onClick={onOpenGameDev} className="hover:text-white cursor-pointer">
              Game Dev
            </button>
            <button type="button" onClick={onGoToStudio} className="hover:text-white cursor-pointer">
              Studio
            </button>
            {onOpenContact && (
              <button type="button" onClick={onOpenContact} className="text-[var(--tgs-red-bright)] hover:underline cursor-pointer font-bold">
                Contact
              </button>
            )}
            <span className="text-white/30">•</span>
            <span>Bengaluru, India</span>
          </div>

          <div className="text-[11px] text-white/40">
            © 2026 Tanishq Gaming Studios.
          </div>
        </div>
      </footer>
    </div>
  );
};
