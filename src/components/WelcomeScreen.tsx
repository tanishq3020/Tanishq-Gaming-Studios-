import React from "react";
import { Gamepad2, Code2, Brain, Rocket, Sparkles, Terminal, Flame, Zap } from "lucide-react";
import { TgsLogo } from "./TgsLogo";
import { AiMode } from "../types/chat";

interface Props {
  onSelectPrompt: (promptText: string, suggestedMode?: AiMode) => void;
  onOpenGameDev: () => void;
  onGoToStudio?: () => void;
  activeMode: AiMode;
}

export const WelcomeScreen: React.FC<Props> = ({
  onSelectPrompt,
  onOpenGameDev,
  onGoToStudio,
  activeMode
}) => {
  const suggestedPrompts = [
    {
      icon: <Gamepad2 className="w-5 h-5 text-[var(--tgs-blue)]" />,
      title: "Help me create a Unity game",
      tag: "Unity 3D / 2D",
      desc: "Player controllers, camera follow scripts, and physics configuration",
      prompt: "Help me create a Unity game from scratch. Provide the core C# player controller, jumping mechanics, and component setup.",
      mode: "gamedev" as AiMode
    },
    {
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      title: "Write HTML, CSS and JavaScript code",
      tag: "Full-Stack Web",
      desc: "Responsive cyber UI, interactive canvas graphics, and animations",
      prompt: "Write clean HTML, CSS and JavaScript code for a futuristic gaming dashboard with glowing cards and interactive buttons.",
      mode: "code" as AiMode
    },
    {
      icon: <Brain className="w-5 h-5 text-violet-400" />,
      title: "Explain this programming concept",
      tag: "Deep Architecture",
      desc: "Quaternions, memory management, garbage collection, and ECS",
      prompt: "Explain how 3D Quaternions prevent gimbal lock in game engines compared to Euler angles, with a practical code example.",
      mode: "code" as AiMode
    },
    {
      icon: <Rocket className="w-5 h-5 text-[var(--tgs-red-bright)]" />,
      title: "Give me a game development idea",
      tag: "High Concept",
      desc: "Innovative gameplay loops, narrative hooks, and monetization",
      prompt: "Give me a high-concept indie game development idea with unique core mechanics, art style, and target audience.",
      mode: "creative" as AiMode
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 max-w-4xl mx-auto text-center select-none animate-in fade-in duration-500">
      {/* Glowing TGS AI Logo Hero */}
      <div className="mb-4">
        <TgsLogo size="lg" showTagline={false} />
      </div>

      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
        Welcome to <span className="text-[var(--tgs-blue)] text-glow-blue">TGS AI</span>
      </h1>

      <p className="mt-2 text-sm sm:text-base text-white/70 max-w-md mx-auto">
        Your AI gaming, coding and creativity assistant.
      </p>

      {/* Mode Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-white/60">
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-[var(--tgs-blue)]" /> Powered by Gemini & TGS Engine
        </span>
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5">
          <Flame className="w-3 h-3 text-[var(--tgs-red)]" /> Zero API exposure
        </span>
      </div>

      {/* Suggested Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 w-full text-left">
        {suggestedPrompts.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelectPrompt(item.prompt, item.mode)}
            className="group p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[var(--tgs-blue)]/50 transition-all duration-200 cursor-pointer text-left flex items-start gap-3.5 shadow-sm hover:shadow-[var(--tgs-blue)]/10 hover:-translate-y-0.5"
          >
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 group-hover:border-[var(--tgs-blue)]/40 transition">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white group-hover:text-[var(--tgs-blue)] transition">
                  {item.title}
                </h3>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/50">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1 line-clamp-1">
                {item.desc}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Special Game Dev Assistant Callout & Tanishq Gaming Studios Link */}
      <div className="mt-6 w-full p-4 rounded-xl bg-gradient-to-r from-[var(--tgs-red)]/10 via-[var(--tgs-navy)] to-[var(--tgs-blue)]/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--tgs-red)]/20 border border-[var(--tgs-red)]/40 flex items-center justify-center">
            <Gamepad2 className="w-5 h-5 text-[var(--tgs-red-bright)]" />
          </div>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Tanishq Gaming Studios Portal</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--tgs-red)] text-white font-mono">
                OFFICIAL STUDIO
              </span>
            </div>
            <p className="text-xs text-white/70 mt-0.5">
              Explore playable arcade games, studio releases, academy courses, and studio news.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onGoToStudio && (
            <button
              type="button"
              onClick={onGoToStudio}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[var(--tgs-red)] text-white font-bold text-xs hover:bg-[var(--tgs-red-bright)] transition active:scale-95 whitespace-nowrap cursor-pointer shadow-md shadow-[var(--tgs-red)]/30"
            >
              🎮 Go to Studio
            </button>
          )}
          <button
            type="button"
            onClick={onOpenGameDev}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Presets
          </button>
        </div>
      </div>
    </div>
  );
};
