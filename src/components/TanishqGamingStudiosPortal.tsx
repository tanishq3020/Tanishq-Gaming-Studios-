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
  X,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  MapPin,
  Copy,
  Check,
  Send,
  MessageSquare
} from "lucide-react";
import {
  DEFAULT_GAMES,
  ACADEMY_COURSES,
  STORE,
  TEAM,
  DEFAULT_JOBS,
  GameItem,
  SOCIAL_LINKS,
  CONTACT_INFO
} from "../data/siteContent";
import { GamesPreviewTab } from "./GamesPreviewTab";
import { PlayableGamesModal } from "./PlayableGamesModal";
import { toast } from "sonner";

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
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    toast.success("Studio email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Message dispatched to Tanishq Gaming Studios!");
    }, 750);
  };

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
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="hover:text-[var(--tgs-red-bright)] transition text-[var(--tgs-red)] font-bold"
          >
            Contact
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

      {/* Contact & Socials Section */}
      <section id="contact" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[var(--tgs-red)]/15 border border-[var(--tgs-red)]/35 text-[var(--tgs-red-bright)] text-xs font-mono uppercase mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            Official Contact & Socials
          </h3>
          <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg mx-auto">
            Follow Tanishq Gaming Studios across social media, pitch games, or get in touch with our leadership.
          </p>
        </div>

        {/* 4 Official Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-transparent border border-pink-500/30 hover:border-pink-500/70 hover:bg-pink-500/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-pink-500/5 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                  <Instagram className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-pink-300 group-hover:translate-x-0.5 transition" />
              </div>
              <h4 className="font-display font-bold text-base text-white group-hover:text-pink-300 transition">
                Instagram
              </h4>
              <p className="text-xs text-pink-300/80 font-mono mt-0.5">@tanishq_3_0_1</p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Behind-the-scenes game dev reels, gameplay teasers, and studio stories.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-xs font-bold text-pink-400 group-hover:text-pink-300">
              <span>Follow on Instagram →</span>
            </div>
          </a>

          {/* YouTube */}
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-red-600/10 border border-red-500/30 hover:border-red-500/70 hover:bg-red-600/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-red-500/5 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                  <Youtube className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-red-300 group-hover:translate-x-0.5 transition" />
              </div>
              <h4 className="font-display font-bold text-base text-white group-hover:text-red-300 transition">
                YouTube
              </h4>
              <p className="text-xs text-red-300/80 font-mono mt-0.5">Tanishq Gaming Studios</p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Official gameplay trailers, speed-runs, engine demos, and tutorials.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-xs font-bold text-red-400 group-hover:text-red-300">
              <span>Subscribe on YouTube →</span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-sky-600/10 border border-sky-500/30 hover:border-sky-500/70 hover:bg-sky-600/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-sky-500/5 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0a66c2] flex items-center justify-center text-white shadow-md">
                  <Linkedin className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-sky-300 group-hover:translate-x-0.5 transition" />
              </div>
              <h4 className="font-display font-bold text-base text-white group-hover:text-sky-300 transition">
                LinkedIn
              </h4>
              <p className="text-xs text-sky-300/80 font-mono mt-0.5">Tanishq Gaming Studios</p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Studio hiring, executive updates, business partnerships, and tech talks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-xs font-bold text-sky-400 group-hover:text-sky-300">
              <span>Connect on LinkedIn →</span>
            </div>
          </a>

          {/* Facebook */}
          <a
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-blue-600/10 border border-blue-500/30 hover:border-blue-500/70 hover:bg-blue-600/20 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg shadow-blue-500/5 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1877f2] flex items-center justify-center text-white shadow-md">
                  <Facebook className="w-6 h-6" />
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-blue-300 group-hover:translate-x-0.5 transition" />
              </div>
              <h4 className="font-display font-bold text-base text-white group-hover:text-blue-300 transition">
                Facebook
              </h4>
              <p className="text-xs text-blue-300/80 font-mono mt-0.5">Tanishq Gaming Studios</p>
              <p className="text-xs text-white/60 mt-2 leading-relaxed">
                Community announcements, player tournaments, and studio releases.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:text-blue-300">
              <span>Follow on Facebook →</span>
            </div>
          </a>
        </div>

        {/* Contact Details & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact Details Cards (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Primary Email */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[var(--tgs-red)] font-bold">
                <Mail className="w-4 h-4" />
                <span>Direct Studio Email</span>
              </div>
              <div className="font-mono text-sm text-white font-semibold break-all">
                {CONTACT_INFO.email}
              </div>
              <p className="text-xs text-white/60">
                Direct point of contact for executive inquiries, publishing deals, and recruitment.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/90 border border-white/10 transition cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-xs font-bold text-white transition text-center shadow-md shadow-[var(--tgs-red)]/20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Headquarters Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[var(--tgs-blue)] font-bold">
                <MapPin className="w-4 h-4" />
                <span>Bengaluru Headquarters</span>
              </div>
              <div className="text-sm font-bold text-white">
                {CONTACT_INFO.location}
              </div>
              <p className="text-xs text-white/60">
                Operating in the silicon hub of India. Powering next-generation gaming engines and generative AI tools.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Office Open: {CONTACT_INFO.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Contact Message Form (3 cols) */}
          <div className="lg:col-span-3 p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="font-display font-bold text-lg text-white mb-1">
              Send an Inquiry to TGS
            </h4>
            <p className="text-xs text-white/60 mb-5">
              Submit your message below. Our communications team responds within 24–48 hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-bold text-white text-base">Inquiry Transmitted!</div>
                <p className="text-xs text-white/70 max-w-sm mx-auto">
                  Thank you for reaching out to Tanishq Gaming Studios. We will reply to {contactForm.email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setContactForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-semibold cursor-pointer transition"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/70 mb-1.5 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Hunter"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[var(--tgs-red)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1.5 font-medium">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@domain.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[var(--tgs-red)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1.5 font-medium">Subject</label>
                  <input
                    type="text"
                    placeholder="Game proposal, collaboration, or feedback"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[var(--tgs-red)]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-white/70 mb-1.5 font-medium">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your message here…"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-[var(--tgs-red)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[var(--tgs-red)]/30 active:scale-95 transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>
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

      {/* Studio Footer with Social Links */}
      <footer className="border-t border-white/10 bg-black/80 py-12 px-4 sm:px-8 text-center text-xs text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-white text-sm uppercase">Tanishq Gaming Studios</span>
              <span className="w-2 h-2 rounded-full bg-[var(--tgs-red)]" />
            </div>
            <p className="text-[11px] text-white/40">
              Bengaluru, Karnataka, India • Contact: {CONTACT_INFO.email}
            </p>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-3">
            {/* Instagram */}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tanishq Gaming Studios on Instagram"
              className="w-10 h-10 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 hover:border-pink-500/60 flex items-center justify-center text-pink-400 hover:text-white transition active:scale-95 shadow-sm"
              title="Instagram: @tanishq_3_0_1"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* YouTube */}
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tanishq Gaming Studios on YouTube"
              className="w-10 h-10 rounded-xl bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 hover:border-red-500/60 flex items-center justify-center text-red-500 hover:text-white transition active:scale-95 shadow-sm"
              title="YouTube: Tanishq Gaming Studios"
            >
              <Youtube className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tanishq Gaming Studios on LinkedIn"
              className="w-10 h-10 rounded-xl bg-sky-600/10 hover:bg-sky-600/20 border border-sky-500/30 hover:border-sky-500/60 flex items-center justify-center text-sky-400 hover:text-white transition active:scale-95 shadow-sm"
              title="LinkedIn: Tanishq Gaming Studios"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Facebook */}
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tanishq Gaming Studios on Facebook"
              className="w-10 h-10 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 hover:border-blue-500/60 flex items-center justify-center text-blue-400 hover:text-white transition active:scale-95 shadow-sm"
              title="Facebook: Tanishq Gaming Studios"
            >
              <Facebook className="w-4 h-4" />
            </a>

            {/* Email mailto */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              aria-label="Email Tanishq Gaming Studios"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition active:scale-95 shadow-sm"
              title={`Email: ${CONTACT_INFO.email}`}
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button type="button" onClick={onBackToChat} className="text-[var(--tgs-blue)] hover:underline cursor-pointer">
              TGS AI Chat
            </button>
            <button type="button" onClick={() => scrollToSection("arcade")} className="hover:text-white cursor-pointer">
              Arcade
            </button>
            <button type="button" onClick={() => scrollToSection("games")} className="hover:text-white cursor-pointer">
              Games
            </button>
            <button type="button" onClick={() => scrollToSection("contact")} className="hover:text-white cursor-pointer">
              Contact
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 text-[11px] text-white/40">
          © 2026 Tanishq Gaming Studios. All rights reserved. • Follow us on Instagram @tanishq_3_0_1, YouTube, LinkedIn & Facebook.
        </div>
      </footer>
    </div>
  );
};
