import React, { useState } from "react";
import {
  Gamepad2,
  Bot,
  Sparkles,
  ArrowRight,
  Play,
  Star,
  ExternalLink,
  GraduationCap,
  ShoppingCart,
  Users,
  Briefcase,
  Mail,
  Flame,
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import {
  DEFAULT_GAMES,
  ACADEMY_COURSES,
  STORE,
  TEAM,
  DEFAULT_JOBS,
  GameItem
} from "../data/siteContent";
import { GamesPreviewTab } from "./GamesPreviewTab";
import { PlayableGamesModal } from "./PlayableGamesModal";

interface Props {
  onBackToChat: () => void;
  onOpenGameDev: () => void;
}

export const TanishqGamingStudiosPortal: React.FC<Props> = ({
  onBackToChat,
  onOpenGameDev
}) => {
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [activeSection, setActiveSection] = useState<string>("games");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#040711] text-white selection:bg-[var(--tgs-red)] selection:text-white">
      {/* Playable Games Modal */}
      {selectedGame && (
        <PlayableGamesModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}

      {/* Top Studio Navbar */}
      <header className="sticky top-0 z-50 h-20 px-4 sm:px-8 bg-[#040711]/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--tgs-red)] flex items-center justify-center shadow-lg shadow-[var(--tgs-red)]/30">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-black text-lg sm:text-xl uppercase tracking-wider text-white flex items-center gap-1.5">
              <span>Tanishq Gaming Studios</span>
              <span className="w-2 h-2 rounded-full bg-[var(--tgs-red)] animate-pulse" />
            </h1>
            <p className="text-[10px] text-white/50 tracking-widest font-mono uppercase">
              Bengaluru, India • Interactive Entertainment
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-white/70">
          <button
            type="button"
            onClick={() => scrollToSection("arcade")}
            className="hover:text-[var(--tgs-red-bright)] transition"
          >
            Playable Arcade
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("games")}
            className="hover:text-[var(--tgs-red-bright)] transition"
          >
            Games
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("academy")}
            className="hover:text-[var(--tgs-red-bright)] transition"
          >
            Academy
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("store")}
            className="hover:text-[var(--tgs-red-bright)] transition"
          >
            Store
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("team")}
            className="hover:text-[var(--tgs-red-bright)] transition"
          >
            Team
          </button>
        </nav>

        {/* Action: Switch directly to TGS AI Chat */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToChat}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--tgs-blue)] to-[var(--tgs-blue-electric)] text-[#040814] font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-[var(--tgs-blue)]/20 hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Launch TGS AI Chat</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,51,68,0.15),transparent_70%)] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--tgs-red)]/15 border border-[var(--tgs-red)]/40 text-[var(--tgs-red-bright)] text-xs font-mono uppercase mb-4">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>Next-Gen Gaming from Bengaluru</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase text-white tracking-tight">
          Tanishq Gaming <span className="text-[var(--tgs-red)]">Studios</span>
        </h2>

        <p className="mt-4 text-base sm:text-xl text-white/70 max-w-2xl font-light">
          We craft thrilling, physics-driven mobile, PC, and WebGL games paired with artificial intelligence.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <button
            type="button"
            onClick={() => scrollToSection("arcade")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[var(--tgs-red)]/30 active:scale-95 transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play Arcade Games</span>
          </button>

          <button
            type="button"
            onClick={onBackToChat}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm tracking-wide active:scale-95 transition cursor-pointer"
          >
            <Bot className="w-4 h-4 text-[var(--tgs-blue)]" />
            <span>Go to TGS AI Chat</span>
          </button>
        </div>
      </section>

      {/* Playable Arcade Station Section */}
      <section id="arcade" className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <GamesPreviewTab
          games={DEFAULT_GAMES}
          onOpenFullModal={(game) => setSelectedGame(game)}
        />
      </section>

      {/* Studio Games Catalog */}
      <section id="games" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[var(--tgs-red)] font-bold">
              Production Releases
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase mt-1">
              Studio Games Catalog
            </h3>
          </div>
          <p className="text-xs text-white/50 max-w-sm mt-2 sm:mt-0">
            Instant playable WebGL games created by Tanishq Gaming Studios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEFAULT_GAMES.map((game) => (
            <div
              key={game.id}
              className="group rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[var(--tgs-red)]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.cover_image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold uppercase text-[var(--tgs-blue)] border border-white/10">
                  {game.genre}
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{game.rating}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-[var(--tgs-red)] transition">
                    {game.title}
                  </h4>
                  <p className="text-xs text-white/60 mt-2 line-clamp-2">
                    {game.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {game.price_usd === 0 ? "FREE TO PLAY" : `$${game.price_usd}`}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedGame(game)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white text-xs font-bold transition active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Game</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academy Section */}
      <section id="academy" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto bg-black/40 border-y border-white/10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--tgs-blue)]/10 text-[var(--tgs-blue)] border border-[var(--tgs-blue)]/30 text-xs font-mono uppercase mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>TGS Master Academy</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
            Master Game Engineering
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-xl mx-auto">
            From Unity C# mechanics to Unreal Engine 5 multiplayer architecture. Taught directly by Tanishq Gaming Studios leads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACADEMY_COURSES.map((course) => (
            <div
              key={course.id}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--tgs-blue)] font-bold">
                  {course.tier}
                </span>
                <h4 className="font-display font-bold text-lg text-white mt-1">
                  {course.title}
                </h4>
                <div className="text-2xl font-black text-white my-3">
                  ${course.price} <span className="text-xs font-normal text-white/50">USD</span>
                </div>
                <ul className="space-y-2 text-xs text-white/70 mt-4">
                  {course.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--tgs-blue)]">✓</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={onBackToChat}
                className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition cursor-pointer"
              >
                Enroll via TGS Portal
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase">
            The Studio Leads
          </h3>
          <p className="text-xs text-white/50 mt-2">
            The engineers and creatives behind TGS games & intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center flex flex-col items-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-2xl object-cover mb-4 border-2 border-[var(--tgs-red)]/40 shadow-lg"
              />
              <h4 className="font-bold text-white text-base">{member.name}</h4>
              <p className="text-xs text-[var(--tgs-red)] font-semibold mt-0.5">{member.role}</p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Quick Action: Switch to TGS AI Chat */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={onBackToChat}
          className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[var(--tgs-blue)] to-[var(--tgs-blue-electric)] text-[#040814] font-black text-xs sm:text-sm tracking-wide shadow-2xl shadow-[var(--tgs-blue)]/40 hover:brightness-110 active:scale-95 transition cursor-pointer"
        >
          <Bot className="w-5 h-5" />
          <span>Return to TGS AI Chat</span>
        </button>
      </div>

      {/* Studio Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-10 px-4 sm:px-8 text-center text-xs text-white/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-white">Tanishq Gaming Studios</span>
            <span>• Bengaluru, India</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button type="button" onClick={onBackToChat} className="text-[var(--tgs-blue)] hover:underline">
              TGS AI Chat
            </button>
            <button type="button" onClick={() => scrollToSection("arcade")} className="hover:text-white">
              Arcade
            </button>
            <button type="button" onClick={() => scrollToSection("games")} className="hover:text-white">
              Games
            </button>
          </div>

          <div className="text-[11px] text-white/40">
            © 2026 Tanishq Gaming Studios. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
