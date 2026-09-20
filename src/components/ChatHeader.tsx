import React from "react";
import {
  Menu,
  Gamepad2,
  Code2,
  Sparkles,
  Bot,
  Settings,
  Trash2,
  Globe,
  Cpu
} from "lucide-react";
import { AiMode, AiModelId } from "../types/chat";
import { TgsLogo } from "./TgsLogo";

interface Props {
  onToggleSidebar: () => void;
  activeMode: AiMode;
  onChangeMode: (mode: AiMode) => void;
  activeModel: AiModelId;
  onChangeModel: (model: AiModelId) => void;
  onOpenGameDev: () => void;
  onOpenSettings: () => void;
  onClearConversation: () => void;
  onToggleLandingPage: () => void;
  onGoToStudio: () => void;
  hasMessages: boolean;
}

export const ChatHeader: React.FC<Props> = ({
  onToggleSidebar,
  activeMode,
  onChangeMode,
  activeModel,
  onChangeModel,
  onOpenGameDev,
  onOpenSettings,
  onClearConversation,
  onToggleLandingPage,
  onGoToStudio,
  hasMessages
}) => {
  const modes: Array<{ id: AiMode; label: string; desc: string; icon: React.ReactNode }> = [
    {
      id: "general",
      label: "TGS AI",
      desc: "General AI assistant",
      icon: <Bot className="w-3.5 h-3.5" />
    },
    {
      id: "code",
      label: "TGS Code",
      desc: "Programming & debugging",
      icon: <Code2 className="w-3.5 h-3.5" />
    },
    {
      id: "gamedev",
      label: "TGS Game Dev",
      desc: "Unity, Unreal, Godot",
      icon: <Gamepad2 className="w-3.5 h-3.5" />
    },
    {
      id: "creative",
      label: "TGS Creative",
      desc: "Ideas, stories & lore",
      icon: <Sparkles className="w-3.5 h-3.5" />
    }
  ];

  return (
    <header className="h-16 px-3 sm:px-5 border-b border-white/10 bg-[#070c18]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-30">
      {/* Left section: Sidebar trigger & Mobile Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block md:hidden">
          <TgsLogo size="sm" />
        </div>
      </div>

      {/* Center: AI Mode Selector */}
      <div className="flex items-center bg-[#050811] p-1 rounded-xl border border-white/10 overflow-x-auto max-w-[520px] scrollbar-none">
        {modes.map((m) => {
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChangeMode(m.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-[var(--tgs-blue)]/25 to-[var(--tgs-blue-electric)]/20 text-white border border-[var(--tgs-blue)]/40 shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
              title={m.desc}
            >
              <span className={isActive ? "text-[var(--tgs-blue)]" : "text-white/50"}>
                {m.icon}
              </span>
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Go to Tanishq Gaming Studios Portal Button */}
        <button
          type="button"
          onClick={onGoToStudio}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white text-xs font-extrabold transition active:scale-95 cursor-pointer shadow-md shadow-[var(--tgs-red)]/25"
          title="Go to Tanishq Gaming Studios Website & Arcade"
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Tanishq Gaming Studios</span>
          <span className="md:hidden">Studio</span>
        </button>

        {/* Game Dev Assistant Button */}
        <button
          type="button"
          onClick={onOpenGameDev}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition active:scale-95 cursor-pointer"
        >
          <span>Game Dev Presets</span>
        </button>

        {/* Model Selector Badge */}
        <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-white/60">
          <Cpu className="w-3 h-3 text-[var(--tgs-blue)]" />
          <span>Gemini 3.8 Flash</span>
        </div>

        {/* Landing Page */}
        <button
          type="button"
          onClick={onToggleLandingPage}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
          title="Explore TGS Landing Page"
        >
          <Globe className="w-4 h-4" />
        </button>

        {/* Clear current conversation */}
        {hasMessages && (
          <button
            type="button"
            onClick={onClearConversation}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition"
            title="Clear current messages"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {/* Settings */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
