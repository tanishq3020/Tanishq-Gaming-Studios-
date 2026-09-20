import React from "react";

interface Props {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export const TgsLogo: React.FC<Props> = ({ size = "md", showTagline = false, className = "" }) => {
  const iconSize = size === "sm" ? "w-7 h-7" : size === "lg" ? "w-11 h-11" : "w-9 h-9";
  const titleSize = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Futuristic Glowing Hexagonal Core */}
      <div className={`relative ${iconSize} flex items-center justify-center`}>
        {/* Outer neon ring glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[var(--tgs-red)] via-[var(--tgs-blue)] to-[var(--tgs-blue-electric)] opacity-75 blur-[6px] animate-pulse" />
        
        {/* Core emblem */}
        <div className="relative w-full h-full rounded-xl bg-[#060a14] border border-[var(--tgs-blue)]/50 flex items-center justify-center shadow-inner overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.25),transparent_70%)]" />
          
          {/* Stylized TGS Gaming Glyphs */}
          <svg viewBox="0 0 24 24" fill="none" className="w-5/6 h-5/6 relative z-10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 7L12 2L21 7V17L12 22L3 17V7Z"
              stroke="#00d2ff"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center Core cross & game dot */}
            <path
              d="M12 7V17M7 12H17"
              stroke="#ff3344"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="2.2" fill="#00d2ff" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display font-extrabold uppercase tracking-wider text-white ${titleSize}`}>
            TGS <span className="text-[var(--tgs-blue)] text-glow-blue">AI</span>
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase bg-[var(--tgs-blue)]/10 text-[var(--tgs-blue)] border border-[var(--tgs-blue)]/30">
            PRO
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-white/50 tracking-widest uppercase font-mono mt-0.5">
            Tanishq Gaming Studios
          </span>
        )}
      </div>
    </div>
  );
};
