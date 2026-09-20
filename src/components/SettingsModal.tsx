import React, { useState } from "react";
import {
  X,
  Palette,
  Cpu,
  Globe,
  Database,
  Shield,
  Trash2,
  Download,
  Info,
  Sliders,
  Check
} from "lucide-react";
import { UserPreferences, AiModelId, ThemeMode, LanguageOption } from "../types/chat";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (prefs: Partial<UserPreferences>) => void;
  onExportChat: (format: "json" | "markdown") => void;
  onClearAllData: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onExportChat,
  onClearAllData
}) => {
  const [activeTab, setActiveTab] = useState<"theme" | "model" | "language" | "data" | "about">("theme");

  if (!isOpen) return null;

  const themes: Array<{ id: ThemeMode; label: string; preview: string; desc: string }> = [
    { id: "dark", label: "Midnight Dark", preview: "bg-[#060913] border-[#00d2ff]", desc: "Standard deep black & blue accents" },
    { id: "navy", label: "Cobalt Navy", preview: "bg-[#040817] border-[#00d2ff]", desc: "Deep gaming studio ocean palette" },
    { id: "cyber", label: "Cyber Neon", preview: "bg-[#02040a] border-[#ff3344]", desc: "Electric cyan with hot neon red glows" },
    { id: "light", label: "Clean Studio Light", preview: "bg-[#f8fafc] border-[#0284c7]", desc: "High contrast daytime readability" }
  ];

  const models: Array<{ id: AiModelId; name: string; tag: string; desc: string }> = [
    { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash", tag: "RECOMMENDED", desc: "Ultra-fast response latency, multimodal comprehension, and superior gaming logic." },
    { id: "tgs-quantum", name: "TGS Quantum Core", tag: "STUDIO SPECIAL", desc: "Specialized in real-time game architecture, GDScript, Unity C#, and Unreal Blueprints." },
    { id: "tgs-ultra", name: "TGS Ultra Turbo", tag: "FASTEST", desc: "Instant reasoning for quick syntax checks and interactive brainstorms." }
  ];

  const languages: Array<{ id: LanguageOption; label: string; native: string }> = [
    { id: "en", label: "English", native: "English (US/UK)" },
    { id: "es", label: "Spanish", native: "Español" },
    { id: "hi", label: "Hindi", native: "हिन्दी" },
    { id: "ja", label: "Japanese", native: "日本語" },
    { id: "fr", label: "French", native: "Français" },
    { id: "de", label: "German", native: "Deutsch" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-[#070c18] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--tgs-blue)]/20 border border-[var(--tgs-blue)]/40 flex items-center justify-center text-[var(--tgs-blue)]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg">TGS AI Settings</h2>
              <p className="text-xs text-white/50">Configure visual themes, intelligence models, and data privacy.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Layout: Sidebar tabs + Content area */}
        <div className="flex-1 flex flex-col sm:flex-row min-h-0 overflow-hidden">
          {/* Tabs */}
          <div className="w-full sm:w-48 p-2.5 border-r border-white/10 bg-black/30 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-y-auto shrink-0">
            {[
              { id: "theme", label: "Theme & Display", icon: <Palette className="w-4 h-4" /> },
              { id: "model", label: "AI Model & Engine", icon: <Cpu className="w-4 h-4" /> },
              { id: "language", label: "Language", icon: <Globe className="w-4 h-4" /> },
              { id: "data", label: "Data & History", icon: <Database className="w-4 h-4" /> },
              { id: "about", label: "About TGS AI", icon: <Info className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer text-left w-full ${
                  activeTab === tab.id
                    ? "bg-[var(--tgs-blue)]/20 text-[var(--tgs-blue)] border border-[var(--tgs-blue)]/40"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-[#070c18] space-y-5 text-left text-xs">
            {/* Theme Tab */}
            {activeTab === "theme" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Visual Theme</h3>
                  <p className="text-white/60">Choose your favorite studio aesthetic:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {themes.map((th) => {
                    const isSelected = preferences.theme === th.id;
                    return (
                      <div
                        key={th.id}
                        onClick={() => {
                          onUpdatePreferences({ theme: th.id });
                          toast.success(`Theme set to ${th.label}`);
                        }}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-white/10 border-[var(--tgs-blue)] shadow-lg shadow-[var(--tgs-blue)]/10"
                            : "bg-white/[0.03] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 ${th.preview}`} />
                            <span className="font-bold text-white">{th.label}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[var(--tgs-blue)]" />}
                        </div>
                        <p className="text-[11px] text-white/50">{th.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Model Tab */}
            {activeTab === "model" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">AI Model Engine</h3>
                  <p className="text-white/60">Select the cognitive core for answering prompts:</p>
                </div>

                <div className="space-y-3">
                  {models.map((mod) => {
                    const isSelected = preferences.model === mod.id;
                    return (
                      <div
                        key={mod.id}
                        onClick={() => {
                          onUpdatePreferences({ model: mod.id });
                          toast.success(`Active model: ${mod.name}`);
                        }}
                        className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-white/10 border-[var(--tgs-blue)]"
                            : "bg-white/[0.03] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{mod.name}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--tgs-blue)]/20 text-[var(--tgs-blue)] font-mono font-bold">
                              {mod.tag}
                            </span>
                          </div>
                          <p className="text-xs text-white/60 mt-1">{mod.desc}</p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[var(--tgs-blue)] shrink-0 ml-3" />}
                      </div>
                    );
                  })}
                </div>

                {/* Creativity / Temperature Slider */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white">Creativity Temperature</span>
                    <span className="font-mono text-[var(--tgs-blue)]">{preferences.creativity.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={preferences.creativity}
                    onChange={(e) => onUpdatePreferences({ creativity: parseFloat(e.target.value) })}
                    className="w-full accent-[var(--tgs-blue)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 mt-1">
                    <span>Precise Code & Math (0.1)</span>
                    <span>Balanced (0.7)</span>
                    <span>High Worldbuilding (1.0)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Language Tab */}
            {activeTab === "language" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Language Selection</h3>
                  <p className="text-white/60">TGS AI can respond in multiple global languages:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {languages.map((lang) => {
                    const isSelected = preferences.language === lang.id;
                    return (
                      <div
                        key={lang.id}
                        onClick={() => {
                          onUpdatePreferences({ language: lang.id });
                          toast.success(`Language set to ${lang.label}`);
                        }}
                        className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-white/10 border-[var(--tgs-blue)]"
                            : "bg-white/[0.03] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-white">{lang.label}</div>
                          <div className="text-[10px] text-white/50">{lang.native}</div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[var(--tgs-blue)]" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Data & History Tab */}
            {activeTab === "data" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Data & Privacy</h3>
                  <p className="text-white/60">Manage your local chat sessions and exports:</p>
                </div>

                {/* Auto-save toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div>
                    <div className="font-bold text-white">Auto-Save History</div>
                    <div className="text-white/50 text-[11px]">Save chats automatically to browser local memory.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.autoSave}
                    onChange={(e) => onUpdatePreferences({ autoSave: e.target.checked })}
                    className="w-4 h-4 accent-[var(--tgs-blue)] cursor-pointer"
                  />
                </div>

                {/* Export Options */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <div className="font-bold text-white">Export Conversations</div>
                  <div className="text-white/50 text-[11px]">Download your entire chat history for offline backup.</div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onExportChat("markdown")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[var(--tgs-blue)]" />
                      <span>Export as Markdown</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onExportChat("json")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Export as JSON</span>
                    </button>
                  </div>
                </div>

                {/* Clear All Data */}
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-red-400">Clear All Chat Data</div>
                    <div className="text-white/50 text-[11px]">Irreversibly delete all stored conversations.</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Are you sure you want to clear all conversation data?")) {
                        onClearAllData();
                        toast.success("All data erased");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">About TGS AI</h3>
                  <p className="text-white/60">Tanishq Gaming Studios — Interactive Intelligence</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-white/80 leading-relaxed">
                  <p>
                    <strong>TGS AI Chat</strong> is the official flagship AI assistant designed and engineered by <strong>Tanishq Gaming Studios</strong> (Bengaluru, Karnataka, India).
                  </p>
                  <p className="text-white/60 text-[11px]">
                    Built to supercharge game developers, programmers, and creators across the world. Specializing in game math, Unity, Unreal Engine 5, Godot 4, WebGL, clean code synthesis, and high-concept creative design.
                  </p>
                  <div className="pt-2 border-t border-white/10 flex flex-wrap gap-4 text-[11px] font-mono text-white/40">
                    <span>Version: 2.5.0-PRO</span>
                    <span>Engine: Gemini 3.8 Flash + TGS Core</span>
                    <span>Studio: Bengaluru, India</span>
                  </div>
                </div>

                <div className="text-center text-white/40 text-[11px] pt-2">
                  © 2026 Tanishq Gaming Studios. All rights reserved.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-black/30 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[var(--tgs-blue)] text-black font-bold text-xs hover:bg-[var(--tgs-blue-electric)] transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
