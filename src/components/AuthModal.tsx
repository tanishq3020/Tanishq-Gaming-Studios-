import React, { useState } from "react";
import {
  X,
  User as UserIcon,
  Mail,
  Lock,
  ArrowRight,
  LogOut,
  Shield,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { User } from "../types/chat";
import { TgsLogo } from "./TgsLogo";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLogin: (email: string, pass: string) => Promise<boolean>;
  onRegister: (name: string, email: string, pass: string) => Promise<boolean>;
  onLogout: () => void;
  onUpdateProfile: (updated: Partial<User>) => void;
}

export const AuthModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onRegister,
  onLogout,
  onUpdateProfile
}) => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot" | "profile">(
    currentUser ? "profile" : "login"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Profile edit state
  const [profileName, setProfileName] = useState(currentUser?.name || "TGS Developer");
  const [profileAvatar, setProfileAvatar] = useState(
    currentUser?.avatar || "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80"
  );
  const [profileBio, setProfileBio] = useState(currentUser?.bio || "Game Architect & Gameplay Programmer");

  if (!isOpen) return null;

  const avatars = [
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in email and password");
      return;
    }
    setLoading(true);
    const success = await onLogin(email, password);
    setLoading(false);
    if (success) {
      toast.success("Welcome back to TGS AI!");
      onClose();
    } else {
      toast.error("Login failed. Check credentials.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in name, email, and password");
      return;
    }
    setLoading(true);
    const success = await onRegister(name, email, password);
    setLoading(false);
    if (success) {
      toast.success("Account created successfully!");
      onClose();
    } else {
      toast.error("Registration failed.");
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter your email address");
      return;
    }
    toast.success(`Password reset link dispatched to ${email}`);
    setMode("login");
  };

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: profileName,
      avatar: profileAvatar,
      bio: profileBio
    });
    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#070c18] border border-white/15 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand visual header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-2">
            <TgsLogo size="md" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">
            {mode === "login" && "Sign In to TGS AI"}
            {mode === "signup" && "Create TGS AI Account"}
            {mode === "forgot" && "Recover Password"}
            {mode === "profile" && "Developer Profile"}
          </h3>
          <p className="text-xs text-white/60 mt-1">
            {mode === "profile"
              ? "Manage your studio credentials and AI preferences"
              : "Sync chat history across devices & unlock PRO capabilities"}
          </p>
        </div>

        {/* Profile Mode */}
        {mode === "profile" && currentUser && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-3">
              <img
                src={profileAvatar}
                alt={profileName}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--tgs-blue)] shadow-lg shadow-[var(--tgs-blue)]/20"
              />
              <div className="flex items-center gap-2">
                {avatars.map((av, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setProfileAvatar(av)}
                    className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                      profileAvatar === av ? "border-[var(--tgs-blue)] scale-110" : "border-white/20 opacity-70"
                    }`}
                  >
                    <img src={av} alt="avatar option" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 text-left text-xs">
              <div>
                <label className="block text-white/60 font-semibold mb-1">Display Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                />
              </div>

              <div>
                <label className="block text-white/60 font-semibold mb-1">Studio Role / Bio</label>
                <input
                  type="text"
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                />
              </div>

              <div>
                <label className="block text-white/60 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-white/50 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="flex-1 py-2.5 rounded-xl bg-[var(--tgs-blue)] text-black font-bold text-xs hover:bg-[var(--tgs-blue-electric)] transition cursor-pointer"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  toast.info("Logged out");
                  setMode("login");
                }}
                className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-3.5 text-left">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="developer@tgs.games"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-white/70">Password</label>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-[11px] text-[var(--tgs-blue)] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--tgs-blue)] to-[var(--tgs-blue-electric)] text-[#040814] font-bold text-xs shadow-md shadow-[var(--tgs-blue)]/20 hover:brightness-110 transition cursor-pointer"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>

            <div className="text-center text-xs text-white/60 pt-2 border-t border-white/10">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-[var(--tgs-blue)] font-semibold hover:underline"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}

        {/* Sign Up Form */}
        {mode === "signup" && (
          <form onSubmit={handleRegister} className="space-y-3.5 text-left">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Developer Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  required
                  placeholder="Tanishq Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="tanishq@tgs.games"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white font-bold text-xs shadow-md shadow-[var(--tgs-red)]/20 transition cursor-pointer"
            >
              {loading ? "Creating Account…" : "Join TGS AI"}
            </button>

            <div className="text-center text-xs text-white/60 pt-2 border-t border-white/10">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-[var(--tgs-blue)] font-semibold hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Forgot Password */}
        {mode === "forgot" && (
          <form onSubmit={handleForgot} className="space-y-3.5 text-left">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1">Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  placeholder="developer@tgs.games"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[var(--tgs-blue)] text-black font-bold text-xs transition cursor-pointer"
            >
              Send Reset Code
            </button>

            <div className="text-center text-xs text-white/60 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-[var(--tgs-blue)] font-semibold hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
