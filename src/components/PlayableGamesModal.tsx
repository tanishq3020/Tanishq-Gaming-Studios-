import React, { useEffect, useRef, useState } from "react";
import { X, RotateCcw, Volume2, VolumeX, Trophy, Sparkles, Flame, Play, ExternalLink } from "lucide-react";
import { GameItem } from "../data/siteContent";

// Web Audio API Synthesizer for zero-dependency retro sounds
class SoundFX {
  ctx: AudioContext | null = null;
  muted: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playBatCrack() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playCheer() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    // Pleasant chord arpeggio for cheer/goal
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.07);
      gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.07 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(this.ctx!.currentTime + idx * 0.07);
      osc.stop(this.ctx!.currentTime + idx * 0.07 + 0.35);
    });
  }

  playWhistle() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
    osc.frequency.setValueAtTime(2200, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  playMiss() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(240, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }
}

export const sfx = new SoundFX();

interface PlayableGamesModalProps {
  game: GameItem;
  onClose: () => void;
}

export function PlayableGamesModal({ game, onClose }: PlayableGamesModalProps) {
  const [muted, setMuted] = useState(false);
  const toggleMute = () => {
    sfx.muted = !muted;
    setMuted(!muted);
  };

  const gameType = game.gameType || (
    game.title.toLowerCase().includes("bubble") ? "bubble-shooter" :
    game.title.toLowerCase().includes("cricket") ? "cricket" : "football"
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="w-full max-w-4xl bg-[var(--tgs-surface)] border border-white/20 p-4 sm:p-6 relative flex flex-col shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-[var(--tgs-green)] text-black font-display font-black text-xs uppercase tracking-widest">
              100% FREE
            </span>
            <h3 className="font-display font-black uppercase text-xl sm:text-2xl text-white tracking-tight">
              {game.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX className="w-4 h-4 text-[var(--tgs-red)]" /> : <Volume2 className="w-4 h-4 text-[var(--tgs-green)]" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
              aria-label="Close game"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Playable Game Engine */}
        <div className="flex-1 flex justify-center items-center w-full">
          {gameType === "bubble-shooter" && <BubbleShooterEngine isNeon={game.id === "neon-bubble-pop"} />}
          {gameType === "cricket" && <CricketEngine isStreet={game.id === "street-cricket-champions"} />}
          {gameType === "football" && <FootballEngine isFreeKick={game.id === "super-football-kickoff"} />}
          {(gameType === "skill-forge" || game.external_url) && (
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-2 mb-2 text-xs text-white/70">
                <span className="flex items-center gap-1.5 font-display text-[11px] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[var(--tgs-green)] animate-pulse" />
                  Emergent Sandbox: <code className="text-white">gaming-skill-forge.preview.emergentagent.com</code>
                </span>
                <a
                  href={game.external_url || "https://gaming-skill-forge.preview.emergentagent.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-[var(--tgs-green)] text-black font-display font-black text-[11px] uppercase tracking-wider hover:opacity-90 transition flex items-center gap-1.5"
                >
                  Open in New Tab <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <iframe
                src={game.external_url || "https://gaming-skill-forge.preview.emergentagent.com/"}
                className="w-full h-[600px] border border-white/15 bg-black"
                title={game.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   1. BUBBLE SHOOTER GAME ENGINE
   ========================================================================= */
const BUBBLE_COLORS = ["#FF3B30", "#34C759", "#007AFF", "#FFCC00", "#AF52DE"];
const NEON_COLORS = ["#FF0055", "#00FF66", "#00E5FF", "#FFFF00", "#D000FF"];

export function BubbleShooterEngine({ isNeon = false }: { isNeon?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [shotsLeft, setShotsLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const colors = isNeon ? NEON_COLORS : BUBBLE_COLORS;

  const stateRef = useRef({
    grid: [] as (string | null)[][],
    rows: 6,
    cols: 10,
    bubbleRadius: 18,
    angle: -Math.PI / 2,
    currentBubbleColor: colors[0],
    nextBubbleColor: colors[1],
    flyingBubble: null as { x: number; y: number; vx: number; vy: number; color: string } | null,
    score: 0,
    shots: 30,
    width: 420,
    height: 520,
    mousePos: { x: 210, y: 460 },
  });

  const initGrid = () => {
    const s = stateRef.current;
    const grid: (string | null)[][] = [];
    for (let r = 0; r < s.rows; r++) {
      const row: (string | null)[] = [];
      for (let c = 0; c < s.cols; c++) {
        // Upper rows filled with random colors
        if (r < 4) {
          row.push(colors[Math.floor(Math.random() * colors.length)]);
        } else {
          row.push(null);
        }
      }
      grid.push(row);
    }
    s.grid = grid;
    s.score = 0;
    s.shots = 30;
    s.currentBubbleColor = colors[Math.floor(Math.random() * colors.length)];
    s.nextBubbleColor = colors[Math.floor(Math.random() * colors.length)];
    s.flyingBubble = null;
    setScore(0);
    setShotsLeft(30);
    setGameOver(false);
    setGameWon(false);
  };

  useEffect(() => {
    initGrid();
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);
      stateRef.current.mousePos = { x, y };

      const originX = canvas.width / 2;
      const originY = canvas.height - 35;
      const dx = x - originX;
      const dy = y - originY;
      let angle = Math.atan2(dy, dx);
      // Restrict aim upwards
      if (angle > -0.15) angle = -0.15;
      if (angle < -Math.PI + 0.15) angle = -Math.PI + 0.15;
      stateRef.current.angle = angle;
    };

    const handleClick = () => {
      const s = stateRef.current;
      if (s.flyingBubble || gameOver || gameWon) return;

      const originX = canvas.width / 2;
      const originY = canvas.height - 35;
      const speed = 12;
      s.flyingBubble = {
        x: originX,
        y: originY,
        vx: Math.cos(s.angle) * speed,
        vy: Math.sin(s.angle) * speed,
        color: s.currentBubbleColor
      };
      s.currentBubbleColor = s.nextBubbleColor;
      s.nextBubbleColor = colors[Math.floor(Math.random() * colors.length)];
      s.shots--;
      setShotsLeft(s.shots);
      sfx.playPop();
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    const updateGame = () => {
      const s = stateRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear
      ctx.fillStyle = isNeon ? "#06060c" : "#0d0d12";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background guides
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      for (let y = 0; y < canvas.height - 60; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Ceiling Bar
      ctx.fillStyle = isNeon ? "#FF0055" : "var(--tgs-red)";
      ctx.fillRect(0, 0, canvas.width, 4);

      // Draw Grid Bubbles
      const r = s.bubbleRadius;
      const startY = 24;
      let hasBubblesLeft = false;

      for (let row = 0; row < s.rows; row++) {
        const offset = (row % 2 === 1) ? r : 0;
        for (let col = 0; col < s.cols; col++) {
          const color = s.grid[row]?.[col];
          if (color) {
            hasBubblesLeft = true;
            const bx = col * (r * 2 + 2) + r + offset + 10;
            const by = row * (r * 2) + r + startY;

            ctx.beginPath();
            ctx.arc(bx, by, r, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();

            // Bubble shine highlight
            ctx.beginPath();
            ctx.arc(bx - r * 0.3, by - r * 0.3, r * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.35)";
            ctx.fill();

            if (isNeon) {
              ctx.shadowColor = color;
              ctx.shadowBlur = 8;
            }
          }
        }
      }
      ctx.shadowBlur = 0;

      if (!hasBubblesLeft && s.score > 0) {
        setGameWon(true);
      }

      // Update Flying Bubble
      if (s.flyingBubble) {
        const fb = s.flyingBubble;
        fb.x += fb.vx;
        fb.y += fb.vy;

        // Bounce off side walls
        if (fb.x - r <= 0) {
          fb.x = r;
          fb.vx = -fb.vx;
          sfx.playPop();
        } else if (fb.x + r >= canvas.width) {
          fb.x = canvas.width - r;
          fb.vx = -fb.vx;
          sfx.playPop();
        }

        // Check collision with top ceiling
        let collided = false;
        if (fb.y - r <= 4) {
          collided = true;
        }

        // Check collision with existing bubbles
        if (!collided) {
          for (let row = 0; row < s.rows; row++) {
            const offset = (row % 2 === 1) ? r : 0;
            for (let col = 0; col < s.cols; col++) {
              if (s.grid[row]?.[col]) {
                const bx = col * (r * 2 + 2) + r + offset + 10;
                const by = row * (r * 2) + r + startY;
                const dist = Math.hypot(fb.x - bx, fb.y - by);
                if (dist <= r * 1.85) {
                  collided = true;
                  break;
                }
              }
            }
            if (collided) break;
          }
        }

        // Snap to grid
        if (collided) {
          // Find closest empty slot in grid
          let bestRow = 0;
          let bestCol = 0;
          let minDist = 99999;

          for (let row = 0; row < s.rows; row++) {
            const offset = (row % 2 === 1) ? r : 0;
            for (let col = 0; col < s.cols; col++) {
              if (!s.grid[row][col]) {
                const bx = col * (r * 2 + 2) + r + offset + 10;
                const by = row * (r * 2) + r + startY;
                const dist = Math.hypot(fb.x - bx, fb.y - by);
                if (dist < minDist) {
                  minDist = dist;
                  bestRow = row;
                  bestCol = col;
                }
              }
            }
          }

          s.grid[bestRow][bestCol] = fb.color;
          s.flyingBubble = null;

          // Check match 3 or more BFS
          const matched = findMatches(s.grid, bestRow, bestCol, fb.color, s.rows, s.cols);
          if (matched.length >= 3) {
            matched.forEach(([mr, mc]) => {
              s.grid[mr][mc] = null;
            });
            const earned = matched.length * 100;
            s.score += earned;
            setScore(s.score);
            setHighScore(prev => Math.max(prev, s.score));
            sfx.playCheer();
          }

          // Check if bottom row reached
          const hasBottom = s.grid[s.rows - 1].some(cell => cell !== null);
          if (hasBottom || s.shots <= 0) {
            setGameOver(true);
          }
        } else {
          // Draw flying bubble
          ctx.beginPath();
          ctx.arc(fb.x, fb.y, r, 0, Math.PI * 2);
          ctx.fillStyle = fb.color;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(fb.x - r * 0.3, fb.y - r * 0.3, r * 0.35, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.4)";
          ctx.fill();
        }
      }

      // Draw Launcher Base & Cannon
      const originX = canvas.width / 2;
      const originY = canvas.height - 35;

      // Aim dotted guideline
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX + Math.cos(s.angle) * 140, originY + Math.sin(s.angle) * 140);
      ctx.strokeStyle = isNeon ? "#00E5FF" : "rgba(255,255,255,0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Cannon Pointer
      ctx.save();
      ctx.translate(originX, originY);
      ctx.rotate(s.angle);
      ctx.fillStyle = "#222";
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 2;
      ctx.fillRect(0, -7, 42, 14);
      ctx.strokeRect(0, -7, 42, 14);
      ctx.restore();

      // Current Loaded Bubble
      ctx.beginPath();
      ctx.arc(originX, originY, r, 0, Math.PI * 2);
      ctx.fillStyle = s.currentBubbleColor;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(originX - r * 0.3, originY - r * 0.3, r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fill();

      // Next Bubble Preview
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "10px monospace";
      ctx.fillText("NEXT", 35, canvas.height - 30);
      ctx.beginPath();
      ctx.arc(75, canvas.height - 35, r * 0.75, 0, Math.PI * 2);
      ctx.fillStyle = s.nextBubbleColor;
      ctx.fill();

      animId = requestAnimationFrame(updateGame);
    };

    animId = requestAnimationFrame(updateGame);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
    };
  }, [isNeon]);

  // BFS Cluster Match Finder
  const findMatches = (
    grid: (string | null)[][],
    startR: number,
    startC: number,
    targetColor: string,
    maxR: number,
    maxC: number
  ) => {
    const visited = new Set<string>();
    const queue = [[startR, startC]];
    const matches: [number, number][] = [];
    visited.add(`${startR},${startC}`);

    while (queue.length > 0) {
      const [cr, cc] = queue.shift()!;
      matches.push([cr, cc]);

      // Neighbors (hexagonal offset)
      const isOdd = cr % 2 === 1;
      const neighbors: [number, number][] = [
        [cr, cc - 1], [cr, cc + 1],
        [cr - 1, isOdd ? cc : cc - 1], [cr - 1, isOdd ? cc + 1 : cc],
        [cr + 1, isOdd ? cc : cc - 1], [cr + 1, isOdd ? cc + 1 : cc],
      ];

      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < maxR && nc >= 0 && nc < maxC) {
          const key = `${nr},${nc}`;
          if (!visited.has(key) && grid[nr][nc] === targetColor) {
            visited.add(key);
            queue.push([nr, nc]);
          }
        }
      }
    }
    return matches;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-between w-full max-w-[420px] mb-3 px-2 text-xs font-display uppercase tracking-widest text-white/80">
        <div className="flex items-center gap-4">
          <span>Score: <strong className="text-[var(--tgs-green)] text-sm">{score}</strong></span>
          <span>High: <strong className="text-white text-sm">{highScore}</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span>Shots: <strong className={shotsLeft <= 5 ? "text-[var(--tgs-red)]" : "text-white"}>{shotsLeft}</strong></span>
          <button
            onClick={initGrid}
            className="flex items-center gap-1 text-[10px] px-2 py-1 bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
      </div>

      <div className="relative border border-white/20 bg-black shadow-inner overflow-hidden">
        <canvas
          ref={canvasRef}
          width={420}
          height={520}
          className="cursor-crosshair max-w-full h-auto"
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center">
            <Trophy className="w-12 h-12 text-[var(--tgs-red)] mb-2 animate-bounce" />
            <h4 className="font-display font-black text-2xl uppercase text-white">Game Over</h4>
            <p className="text-white/60 text-xs mt-1">Final Score: {score}</p>
            <button onClick={initGrid} className="mt-4 btn-primary">
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
          </div>
        )}

        {/* Game Won Overlay */}
        {gameWon && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-12 h-12 text-[var(--tgs-green)] mb-2 animate-pulse" />
            <h4 className="font-display font-black text-2xl uppercase text-[var(--tgs-green)]">You Cleared It!</h4>
            <p className="text-white/80 text-xs mt-1">Outstanding shooting! Score: {score}</p>
            <button onClick={initGrid} className="mt-4 btn-primary">
              <Play className="w-4 h-4 fill-current" /> Next Round
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] text-white/50 mt-3 text-center">
        Move cursor to aim angle · Click or tap to shoot bubble · Connect 3 matching colors to pop!
      </p>
    </div>
  );
}

/* =========================================================================
   2. CRICKET SMASH MINI-GAME ENGINE
   ========================================================================= */
export function CricketEngine({ isStreet = false }: { isStreet?: boolean }) {
  const [runs, setRuns] = useState(0);
  const [balls, setBalls] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [fours, setFours] = useState(0);
  const [sixes, setSixes] = useState(0);
  const [lastShotText, setLastShotText] = useState("Tap 'Bowl Next Ball' to start!");
  const [bowlerState, setBowlerState] = useState<"ready" | "bowling" | "result">("ready");
  const [timingPercent, setTimingPercent] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballAnimRef = useRef<{
    active: boolean;
    x: number;
    y: number;
    progress: number;
    speed: number;
    type: string;
    hasHit: boolean;
  }>({
    active: false,
    x: 210,
    y: 60,
    progress: 0,
    speed: 0.022,
    type: "Fast Pace",
    hasHit: false
  });

  const resetGame = () => {
    setRuns(0);
    setBalls(0);
    setWickets(0);
    setFours(0);
    setSixes(0);
    setLastShotText("New Super Over started! Chase 18 runs.");
    setBowlerState("ready");
    ballAnimRef.current.active = false;
  };

  const bowlNextBall = () => {
    if (balls >= 6 || wickets >= 2) return;
    setBowlerState("bowling");
    setLastShotText("Bowler running in... Watch the delivery!");
    
    const types = ["Fast Pace", "Yorker", "Off-Cutter", "Bouncer"];
    const chosenType = types[Math.floor(Math.random() * types.length)];
    const speed = chosenType === "Yorker" ? 0.028 : chosenType === "Fast Pace" ? 0.024 : 0.019;

    ballAnimRef.current = {
      active: true,
      x: 210,
      y: 60,
      progress: 0,
      speed,
      type: chosenType,
      hasHit: false
    };
  };

  const hitBat = () => {
    const ball = ballAnimRef.current;
    if (!ball.active || ball.hasHit || bowlerState !== "bowling") return;

    ball.hasHit = true;
    sfx.playBatCrack();

    // Timing evaluation based on ball progress (sweet spot is 0.72 - 0.88)
    const p = ball.progress;
    setTimingPercent(Math.round(p * 100));

    if (p >= 0.74 && p <= 0.86) {
      // Perfect Sweet Spot -> SIX!
      setRuns(r => r + 6);
      setSixes(s => s + 1);
      setLastShotText("🚀 HUGE SIX! 108m Maximum into the top stands!");
      sfx.playCheer();
    } else if (p >= 0.65 && p < 0.74) {
      // Good Early -> FOUR!
      setRuns(r => r + 4);
      setFours(f => f + 1);
      setLastShotText("🏏 CRACKING FOUR! Smashed past mid-wicket!");
      sfx.playCheer();
    } else if (p > 0.86 && p <= 0.93) {
      // Good Late -> 2 Runs
      setRuns(r => r + 2);
      setLastShotText("⚡ 2 Runs! Quick running between wickets.");
    } else if (p < 0.50) {
      // Way too early -> Air miss / Caught
      setWickets(w => w + 1);
      setLastShotText("🧤 CAUGHT OUT! Swung way too early in the air!");
      sfx.playMiss();
    } else {
      // Too late -> Bowled out / Stumps shattered
      setWickets(w => w + 1);
      setLastShotText("💥 BOWLED OUT! Timber! Yorker crashed into off-stump!");
      sfx.playMiss();
    }

    setBalls(b => b + 1);
    ball.active = false;
    setBowlerState("result");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let animId: number;

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Pitch Grass Background
      ctx.fillStyle = isStreet ? "#2b2a27" : "#1a3b1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pitch strip
      ctx.fillStyle = isStreet ? "#443e39" : "#cbb682";
      ctx.fillRect(150, 40, 120, 360);

      // Bowling Crease (Top)
      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(150, 80);
      ctx.lineTo(270, 80);
      ctx.stroke();

      // Batting Popping Crease (Bottom)
      ctx.beginPath();
      ctx.moveTo(140, 340);
      ctx.lineTo(280, 340);
      ctx.stroke();

      // Top Wickets (Bowler end)
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(202 + i * 7, 65, 4, 15);
      }

      // Bottom Wickets (Batter end)
      ctx.fillStyle = "#fff";
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(202 + i * 7, 348, 4, 18);
      }

      // Sweet Spot Indicator Zone
      ctx.fillStyle = "rgba(57, 255, 20, 0.15)";
      ctx.fillRect(160, 270, 100, 50);
      ctx.strokeStyle = "rgba(57, 255, 20, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(160, 270, 100, 50);
      ctx.fillStyle = "rgba(57, 255, 20, 0.7)";
      ctx.font = "9px monospace";
      ctx.fillText("SWEET SPOT", 185, 298);

      // Batter Figure (Bottom)
      ctx.fillStyle = isStreet ? "#ff4757" : "#2ed573";
      ctx.beginPath();
      ctx.arc(235, 335, 14, 0, Math.PI * 2);
      ctx.fill();

      // Bat
      ctx.save();
      ctx.translate(225, 335);
      ctx.rotate(-0.4);
      ctx.fillStyle = "#d35400";
      ctx.fillRect(-4, -20, 8, 26);
      ctx.restore();

      // Bowler Figure (Top)
      ctx.fillStyle = "#3742fa";
      ctx.beginPath();
      ctx.arc(210, 50, 12, 0, Math.PI * 2);
      ctx.fill();

      // Ball Animation
      const ball = ballAnimRef.current;
      if (ball.active) {
        ball.progress += ball.speed;
        ball.y = 70 + ball.progress * 280;

        // Draw ball shadow
        ctx.beginPath();
        ctx.arc(ball.x, ball.y + 4, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fill();

        // Draw Cricket Ball (Red leather)
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#c0392b";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
        ctx.stroke();

        // If ball passed batter without swing
        if (ball.progress >= 1.05 && !ball.hasHit) {
          ball.active = false;
          setWickets(w => w + 1);
          setBalls(b => b + 1);
          setLastShotText("💥 CLEAN BOWLED! Ball crashed into middle stump!");
          sfx.playMiss();
          setBowlerState("result");
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [bowlerState, isStreet]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Cricket Scoreboard */}
      <div className="grid grid-cols-4 gap-2 w-full max-w-[420px] mb-3 text-center">
        <div className="p-2 bg-black/60 border border-white/10">
          <div className="text-[10px] text-white/50 font-display uppercase">Score</div>
          <div className="text-xl font-display font-black text-[var(--tgs-green)]">{runs}/{wickets}</div>
        </div>
        <div className="p-2 bg-black/60 border border-white/10">
          <div className="text-[10px] text-white/50 font-display uppercase">Balls</div>
          <div className="text-xl font-display font-black text-white">{balls}/6</div>
        </div>
        <div className="p-2 bg-black/60 border border-white/10">
          <div className="text-[10px] text-white/50 font-display uppercase">Boundaries</div>
          <div className="text-xl font-display font-black text-white">{fours}x4 · {sixes}x6</div>
        </div>
        <div className="p-2 bg-black/60 border border-white/10">
          <div className="text-[10px] text-white/50 font-display uppercase">Target</div>
          <div className="text-xl font-display font-black text-[var(--tgs-red)]">18 Runs</div>
        </div>
      </div>

      {/* Action Banner */}
      <div className="w-full max-w-[420px] p-2 bg-black border border-white/15 text-center text-xs font-display mb-3">
        <span className="text-white font-bold">{lastShotText}</span>
      </div>

      {/* Canvas Stadium Pitch */}
      <div className="relative border border-white/20 bg-black shadow-lg">
        <canvas ref={canvasRef} width={420} height={420} className="max-w-full h-auto" />

        {/* End of Super Over */}
        {(balls >= 6 || wickets >= 2) && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center">
            {runs >= 18 ? (
              <>
                <Trophy className="w-14 h-14 text-[var(--tgs-green)] mb-2 animate-bounce" />
                <h4 className="font-display font-black text-2xl uppercase text-[var(--tgs-green)]">Victory! Target Chased!</h4>
                <p className="text-white/80 text-xs mt-1">You scored {runs} runs with {sixes} sixes!</p>
              </>
            ) : (
              <>
                <Flame className="w-14 h-14 text-[var(--tgs-red)] mb-2" />
                <h4 className="font-display font-black text-2xl uppercase text-white">Innings Over</h4>
                <p className="text-white/60 text-xs mt-1">You scored {runs} runs. Needed 18.</p>
              </>
            )}
            <button onClick={resetGame} className="mt-5 btn-primary">
              <RotateCcw className="w-4 h-4" /> Play Another Over
            </button>
          </div>
        )}
      </div>

      {/* Batting Controls */}
      <div className="flex gap-3 mt-4 w-full max-w-[420px]">
        {bowlerState === "bowling" ? (
          <button
            onClick={hitBat}
            className="flex-1 py-4 bg-[var(--tgs-red)] hover:bg-white hover:text-[var(--tgs-red)] text-white font-display font-black text-base uppercase tracking-widest transition cursor-pointer border-none shadow-lg animate-pulse"
          >
            🏏 SWING BAT NOW!
          </button>
        ) : (
          <button
            onClick={bowlNextBall}
            disabled={balls >= 6 || wickets >= 2}
            className="flex-1 py-3 btn-primary justify-center disabled:opacity-40 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" /> Bowl Ball ({6 - balls} Remaining)
          </button>
        )}
      </div>

      <p className="text-[11px] text-white/50 mt-3 text-center">
        Bowl the delivery, then click &quot;SWING BAT NOW&quot; when the ball hits the green sweet spot zone!
      </p>
    </div>
  );
}

/* =========================================================================
   3. FOOTBALL STRIKE (PENALTY SHOOTOUT) MINI-GAME ENGINE
   ========================================================================= */
export function FootballEngine({ isFreeKick = false }: { isFreeKick?: boolean }) {
  const [goals, setGoals] = useState(0);
  const [shotsTaken, setShotsTaken] = useState(0);
  const [lastEvent, setLastEvent] = useState("Pick your corner and strike!");
  const [results, setResults] = useState<("goal" | "miss")[]>([]);
  const [isKicking, setIsKicking] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const ballState = useRef({
    x: 210,
    y: 380,
    radius: 16,
    targetX: 210,
    targetY: 140,
    progress: 0,
    active: false,
    keeperX: 210,
    keeperTargetX: 210,
    keeperDiving: false
  });

  const resetTournament = () => {
    setGoals(0);
    setShotsTaken(0);
    setResults([]);
    setLastEvent("New 5-Penalty Tournament started! Aim & shoot.");
    ballState.current = {
      x: 210,
      y: 380,
      radius: 16,
      targetX: 210,
      targetY: 140,
      progress: 0,
      active: false,
      keeperX: 210,
      keeperTargetX: 210,
      keeperDiving: false
    };
  };

  const kickTo = (targetX: number, targetY: number) => {
    if (shotsTaken >= 5 || isKicking) return;

    setIsKicking(true);
    sfx.playWhistle();

    // AI Goalkeeper dive direction
    const keeperOptions = [100, 160, 210, 260, 320];
    const keeperDive = keeperOptions[Math.floor(Math.random() * keeperOptions.length)];

    const b = ballState.current;
    b.targetX = targetX;
    b.targetY = targetY;
    b.progress = 0;
    b.active = true;
    b.keeperTargetX = keeperDive;
    b.keeperDiving = true;

    // Simulate kick trajectory
    const step = () => {
      b.progress += 0.05;
      b.x = 210 + (b.targetX - 210) * b.progress;
      b.y = 380 + (b.targetY - 380) * b.progress;
      b.radius = 16 - b.progress * 6; // Perspective shrink

      // Keeper movement
      b.keeperX += (b.keeperTargetX - b.keeperX) * 0.15;

      if (b.progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Evaluate Goal vs Save
        const distToKeeper = Math.abs(b.targetX - b.keeperX);
        const hitPost = (b.targetX <= 62 || b.targetX >= 358 || b.targetY <= 75);

        if (hitPost) {
          setLastEvent("💥 OFF THE POST! Unlucky strike off the woodwork!");
          setResults(prev => [...prev, "miss"]);
          sfx.playMiss();
        } else if (distToKeeper < 38) {
          setLastEvent("🧤 WHAT A SAVE! Goalkeeper parries it away!");
          setResults(prev => [...prev, "miss"]);
          sfx.playMiss();
        } else {
          setGoals(g => g + 1);
          setResults(prev => [...prev, "goal"]);
          setLastEvent("⚽ GOAL! Clean top-corner finish past the keeper!");
          sfx.playCheer();
        }

        setShotsTaken(s => s + 1);
        setTimeout(() => {
          b.active = false;
          b.x = 210;
          b.y = 380;
          b.radius = 16;
          b.keeperX = 210;
          b.keeperDiving = false;
          setIsKicking(false);
        }, 1100);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let animId: number;

    const render = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Pitch Grass
      ctx.fillStyle = "#1e7e34";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pitch Markings (Penalty Box Arc)
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(210, 420, 110, Math.PI, Math.PI * 2);
      ctx.stroke();

      // Penalty Spot
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(210, 380, 4, 0, Math.PI * 2);
      ctx.fill();

      // Goal Frame (Posts & Net)
      const goalLeft = 60;
      const goalRight = 360;
      const crossbarY = 70;
      const groundY = 220;

      // Goal Net Mesh
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      for (let x = goalLeft; x <= goalRight; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, crossbarY);
        ctx.lineTo(x, groundY);
        ctx.stroke();
      }
      for (let y = crossbarY; y <= groundY; y += 15) {
        ctx.beginPath();
        ctx.moveTo(goalLeft, y);
        ctx.lineTo(goalRight, y);
        ctx.stroke();
      }

      // Goal Posts (White Metal)
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(goalLeft, groundY);
      ctx.lineTo(goalLeft, crossbarY);
      ctx.lineTo(goalRight, crossbarY);
      ctx.lineTo(goalRight, groundY);
      ctx.stroke();

      // Goalkeeper Figure
      const b = ballState.current;
      ctx.fillStyle = "#f39c12"; // Keeper jersey
      ctx.beginPath();
      ctx.arc(b.keeperX, 150, 16, 0, Math.PI * 2);
      ctx.fill();

      // Keeper gloves
      ctx.fillStyle = "#e74c3c";
      ctx.beginPath();
      ctx.arc(b.keeperX - 20, 145, 7, 0, Math.PI * 2);
      ctx.arc(b.keeperX + 20, 145, 7, 0, Math.PI * 2);
      ctx.fill();

      // Draw Football
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Football pentagon pattern
      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Penalty Round Tracker */}
      <div className="flex items-center justify-between w-full max-w-[420px] mb-3 px-2">
        <div className="text-xs font-display text-white">
          Goals: <strong className="text-[var(--tgs-green)] text-base">{goals} / 5</strong>
        </div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => {
            const res = results[i];
            return (
              <span
                key={i}
                className={`w-5 h-5 rounded-full grid place-items-center text-[10px] border ${
                  res === "goal"
                    ? "bg-[var(--tgs-green)] text-black border-[var(--tgs-green)]"
                    : res === "miss"
                    ? "bg-[var(--tgs-red)] text-white border-[var(--tgs-red)]"
                    : "bg-black/60 border-white/30 text-white/40"
                }`}
              >
                {res === "goal" ? "⚽" : res === "miss" ? "✕" : i + 1}
              </span>
            );
          })}
        </div>
      </div>

      {/* Action Notification */}
      <div className="w-full max-w-[420px] p-2 bg-black border border-white/15 text-center text-xs font-display mb-3">
        <span className="text-white font-bold">{lastEvent}</span>
      </div>

      {/* Goal Canvas */}
      <div className="relative border border-white/20 bg-black shadow-lg">
        <canvas ref={canvasRef} width={420} height={420} className="max-w-full h-auto" />

        {/* Click Target Zones Overlaid on Goal */}
        {!isKicking && shotsTaken < 5 && (
          <div className="absolute top-[70px] left-[60px] w-[300px] h-[150px] grid grid-cols-3 grid-rows-2 gap-2 p-2">
            <button
              onClick={() => kickTo(90, 95)}
              className="border border-dashed border-white/30 hover:border-[var(--tgs-green)] hover:bg-[var(--tgs-green)]/20 text-[10px] text-white font-display uppercase tracking-wider flex items-center justify-center transition cursor-pointer bg-transparent"
            >
              Top Left
            </button>
            <button
              onClick={() => kickTo(210, 95)}
              className="border border-dashed border-white/30 hover:border-[var(--tgs-green)] hover:bg-[var(--tgs-green)]/20 text-[10px] text-white font-display uppercase tracking-wider flex items-center justify-center transition cursor-pointer bg-transparent"
            >
              Top Center
            </button>
            <button
              onClick={() => kickTo(330, 95)}
              className="border border-dashed border-white/30 hover:border-[var(--tgs-green)] hover:bg-[var(--tgs-green)]/20 text-[10px] text-white font-display uppercase tracking-wider flex items-center justify-center transition cursor-pointer bg-transparent"
            >
              Top Right
            </button>
            <button
              onClick={() => kickTo(90, 180)}
              className="border border-dashed border-white/30 hover:border-[var(--tgs-green)] hover:bg-[var(--tgs-green)]/20 text-[10px] text-white font-display uppercase tracking-wider flex items-center justify-center transition cursor-pointer bg-transparent"
            >
              Bottom Left
            </button>
            <button
              onClick={() => kickTo(210, 180)}
              className="border border-dashed border-white/30 hover:border-[var(--tgs-green)] hover:bg-[var(--tgs-green)]/20 text-[10px] text-white font-display uppercase tracking-wider flex items-center justify-center transition cursor-pointer bg-transparent"
            >
              Panenka Low
            </button>
            <button
              onClick={() => kickTo(330, 180)}
              className="border border-dashed border-white/30 hover:border-[var(--tgs-green)] hover:bg-[var(--tgs-green)]/20 text-[10px] text-white font-display uppercase tracking-wider flex items-center justify-center transition cursor-pointer bg-transparent"
            >
              Bottom Right
            </button>
          </div>
        )}

        {/* Tournament Result Screen */}
        {shotsTaken >= 5 && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center">
            {goals >= 3 ? (
              <>
                <Trophy className="w-14 h-14 text-[var(--tgs-green)] mb-2 animate-bounce" />
                <h4 className="font-display font-black text-2xl uppercase text-[var(--tgs-green)]">Cup Champions!</h4>
                <p className="text-white/80 text-xs mt-1">You converted {goals} out of 5 penalty kicks!</p>
              </>
            ) : (
              <>
                <Flame className="w-14 h-14 text-[var(--tgs-red)] mb-2" />
                <h4 className="font-display font-black text-2xl uppercase text-white">Shootout Lost</h4>
                <p className="text-white/60 text-xs mt-1">{goals}/5 penalties scored. Try again!</p>
              </>
            )}
            <button onClick={resetTournament} className="mt-5 btn-primary">
              <RotateCcw className="w-4 h-4" /> Play Shootout Again
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] text-white/50 mt-3 text-center">
        Click any of the 6 target zones inside the goal net to strike your penalty kick past the keeper!
      </p>
    </div>
  );
}
