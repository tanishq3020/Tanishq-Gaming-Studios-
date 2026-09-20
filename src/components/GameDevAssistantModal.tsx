import React, { useState } from "react";
import {
  Gamepad2,
  X,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  Play,
  Zap,
  Check
} from "lucide-react";
import { AiMode } from "../types/chat";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyPrompt: (promptText: string, mode: AiMode) => void;
}

export const GameDevAssistantModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onApplyPrompt
}) => {
  const [selectedEngine, setSelectedEngine] = useState<"unity" | "unreal" | "godot" | "webgl">("unity");
  const [selectedCategory, setSelectedCategory] = useState<string>("controller");

  if (!isOpen) return null;

  const engines = [
    { id: "unity", name: "Unity 3D / 2D", lang: "C#" },
    { id: "unreal", name: "Unreal Engine 5", lang: "C++ / Blueprints / GAS" },
    { id: "godot", name: "Godot 4", lang: "GDScript 2.0" },
    { id: "webgl", name: "WebGL / HTML5", lang: "JS / Three.js / Canvas" }
  ];

  const presets: Record<string, Array<{ title: string; desc: string; prompt: string }>> = {
    controller: [
      {
        title: "3D Third-Person Character Controller",
        desc: "Smooth camera relative movement, coyote time jumping, slope handling & physics.",
        prompt: `Create a complete production-ready 3D Third-Person Character Controller in ${
          selectedEngine === "unity"
            ? "Unity C# with CharacterController component, Cinemachine camera-relative orientation, variable jump height, and ground gravity check."
            : selectedEngine === "unreal"
            ? "Unreal Engine 5 C++ extending ACharacter, using the Enhanced Input Subsystem and SpringArmComponent."
            : selectedEngine === "godot"
            ? "Godot 4 GDScript using CharacterBody3D, with move_and_slide(), camera rotation sync, and acceleration smoothing."
            : "HTML5 Canvas & JavaScript using requestAnimationFrame, vector math, and keyboard listeners."
        }`
      },
      {
        title: "2D Precision Platformer Controller",
        desc: "Celeste-style tight controls, wall jumps, dash mechanics, and buffer windows.",
        prompt: `Generate a high-feel 2D Precision Platformer Controller in ${selectedEngine} including jump buffering (0.15s), coyote time (0.1s), wall sliding, wall jumping, and horizontal deceleration.`
      },
      {
        title: "Top-Down Twin-Stick Shooter Controller",
        desc: "Independent WASD motion and mouse cursor aiming with weapon recoil.",
        prompt: `Write a Top-Down Twin-Stick Shooter Controller in ${selectedEngine} with independent motion vectors, raycast mouse cursor aiming, and projectile spawning with recoil kickback.`
      }
    ],
    ai: [
      {
        title: "Finite State Machine (FSM) Enemy AI",
        desc: "Patrol, Chase, Attack, and Search states with sight cones and line-of-sight checks.",
        prompt: `Build an Enemy AI Finite State Machine in ${selectedEngine} with Patrol, Chase, Attack, and Return states, using raycast sight lines and pathfinding.`
      },
      {
        title: "Swarm Flocking & Boid Simulation",
        desc: "Reynolds rules: Separation, Alignment, Cohesion with obstacle avoidance.",
        prompt: `Implement a 3D Swarm Flocking (Boid) simulation in ${selectedEngine} implementing Separation, Alignment, Cohesion, and bounds containment.`
      }
    ],
    systems: [
      {
        title: "Modular Inventory & Item Data Architecture",
        desc: "ScriptableObject/DataTable driven slots, item stacking, and equipment slots.",
        prompt: `Architect a modular, extensible Inventory & Item system in ${selectedEngine} supporting stackable consumables, equipment slots, weight limits, and JSON persistence.`
      },
      {
        title: "Dynamic Dialogue & Quest Tracker",
        desc: "Branching dialogues with condition triggers and quest step updates.",
        prompt: `Implement an interactive Branching Dialogue and Quest Tracking system in ${selectedEngine} with node-based conditions, quest markers, and callback events.`
      }
    ],
    math: [
      {
        title: "Quaternion Orientation & Slerp Trajectory",
        desc: "Gimbal lock prevention, smooth camera slerp, and angular velocity dampening.",
        prompt: `Explain and implement Quaternion rotation and Slerp interpolation in ${selectedEngine} for aiming a turret or camera smoothly without gimbal lock.`
      },
      {
        title: "Quadratic & Cubic Bezier Curve Trajectories",
        desc: "Grenade arcs, homing missiles, and roller-coaster rail calculations.",
        prompt: `Write a Bezier Curve trajectory calculation in ${selectedEngine} for projectile arcs (grenade throw / homing rocket) with gizmo visualization.`
      }
    ],
    tgs_studios: [
      {
        title: "Bubble Shooter Blitz Ballistics Matcher",
        desc: "TGS studio physics engine: hex grid snapping, angle bouncing, and bubble chain clusters.",
        prompt: "Provide the complete math and algorithm for a Bubble Shooter game: raycast ray bouncing off walls, hex grid coordinate snapping, and flood-fill cluster matching for popping bubbles."
      },
      {
        title: "Cricket Smash Ball Trajectory & Bat Swing Physics",
        desc: "TGS studio sports mechanic: spin velocity, pitch bounce decay, and bat collision impact.",
        prompt: "Write a Cricket physics simulation in Unity/WebGL: bowling trajectory with aerodynamic swing, pitch friction, bounce coefficient, and sweet-spot bat collision response."
      },
      {
        title: "Cyber Samurai Slow-Mo Katana Parrying",
        desc: "TGS combat engine: tight parry window (0.12s), time dilation, and spark VFX trigger.",
        prompt: "Implement a Katana Parrying and Time Dilation (slow-mo) combat system in Unity/Unreal: precise input frame window, projectile deflecting, and kinematic stagger."
      }
    ]
  };

  const activePresets = presets[selectedCategory] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#070c18] border border-[var(--tgs-blue)]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[var(--tgs-red)]/10 via-[var(--tgs-navy)] to-[var(--tgs-blue)]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--tgs-red)]/20 border border-[var(--tgs-red)]/50 flex items-center justify-center shadow-lg shadow-[var(--tgs-red)]/20">
              <Gamepad2 className="w-5 h-5 text-[var(--tgs-red-bright)]" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
                <span>TGS Game Dev Assistant</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--tgs-red)] text-white font-mono uppercase">
                  Studio Special
                </span>
              </h2>
              <p className="text-xs text-white/60">
                Architectural presets, mechanics, algorithms and production code for game studios.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Engine Switcher Ribbon */}
        <div className="px-4 py-3 bg-[#050811] border-b border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-white/40 mr-1">
            Target Engine:
          </span>
          {engines.map((eng) => (
            <button
              key={eng.id}
              type="button"
              onClick={() => setSelectedEngine(eng.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedEngine === eng.id
                  ? "bg-[var(--tgs-blue)] text-black shadow-md shadow-[var(--tgs-blue)]/25"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{eng.name}</span>
              <span className="text-[10px] opacity-70 font-mono">({eng.lang})</span>
            </button>
          ))}
        </div>

        {/* Body Layout: Categories Sidebar + Preset Cards */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          {/* Categories Tab */}
          <div className="w-full md:w-56 p-3 border-r border-white/10 bg-black/20 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
            {[
              { id: "controller", label: "Character Controls", icon: <Layers className="w-3.5 h-3.5" /> },
              { id: "ai", label: "Enemy AI & Behavior", icon: <Cpu className="w-3.5 h-3.5" /> },
              { id: "systems", label: "RPG & Inventory Systems", icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: "math", label: "Game Math & Physics", icon: <Code2 className="w-3.5 h-3.5" /> },
              { id: "tgs_studios", label: "TGS Studio Games", icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer text-left w-full ${
                  selectedCategory === cat.id
                    ? "bg-white/10 text-white border-l-2 border-[var(--tgs-red)]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Preset Cards List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#070c18]">
            <div className="text-xs text-white/50 mb-2">
              Select a blueprint to load into TGS AI Chat:
            </div>

            {activePresets.map((preset, idx) => (
              <div
                key={idx}
                className="group p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--tgs-blue)]/50 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-white group-hover:text-[var(--tgs-blue)] transition">
                    {preset.title}
                  </h4>
                  <p className="text-xs text-white/60 mt-1">{preset.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onApplyPrompt(preset.prompt, "gamedev");
                    onClose();
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--tgs-blue)] hover:bg-[var(--tgs-blue-electric)] text-black font-bold text-xs transition active:scale-95 whitespace-nowrap cursor-pointer shadow-md shadow-[var(--tgs-blue)]/20"
                >
                  <span>Use Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-white/10 bg-[#050811] flex items-center justify-between text-xs text-white/50">
          <span>Engine: <strong className="text-white">{selectedEngine.toUpperCase()}</strong></span>
          <span>TGS AI will provide complete runnable code & architectures.</span>
        </div>
      </div>
    </div>
  );
};
