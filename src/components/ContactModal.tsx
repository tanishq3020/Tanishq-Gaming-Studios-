import React, { useState } from "react";
import {
  X,
  Instagram,
  Youtube,
  Linkedin,
  Facebook,
  Mail,
  MapPin,
  Send,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Phone
} from "lucide-react";
import { SOCIAL_LINKS, CONTACT_INFO } from "../data/siteContent";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Message transmitted to Tanishq Gaming Studios!");
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#070c18] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--tgs-red)] to-[var(--tgs-blue)] flex items-center justify-center text-white shadow-lg shadow-[var(--tgs-red)]/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-base sm:text-lg uppercase tracking-wide">
                Contact & Connect
              </h2>
              <p className="text-xs text-white/50">Tanishq Gaming Studios • Official Communications</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Social Channels Showcase */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--tgs-blue)] font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Social Channels</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/30 hover:border-pink-500/60 hover:bg-pink-500/15 transition-all duration-200 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-pink-300 transition">
                      Instagram
                    </div>
                    <div className="text-[11px] text-white/60">@tanishq_3_0_1</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-pink-400 group-hover:translate-x-0.5 transition" />
              </a>

              {/* YouTube */}
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 hover:border-red-500/60 hover:bg-red-500/15 transition-all duration-200 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-red-300 transition">
                      YouTube
                    </div>
                    <div className="text-[11px] text-white/60">Tanishq Gaming Studios</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-red-400 group-hover:translate-x-0.5 transition" />
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 hover:border-sky-500/60 hover:bg-sky-500/15 transition-all duration-200 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0a66c2] flex items-center justify-center text-white shadow-md">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-sky-300 transition">
                      LinkedIn
                    </div>
                    <div className="text-[11px] text-white/60">Tanishq Gaming Studios</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-sky-400 group-hover:translate-x-0.5 transition" />
              </a>

              {/* Facebook */}
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-blue-600/10 border border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-600/15 transition-all duration-200 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1877f2] flex items-center justify-center text-white shadow-md">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-blue-300 transition">
                      Facebook
                    </div>
                    <div className="text-[11px] text-white/60">Tanishq Gaming Studios</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
              </a>
            </div>
          </div>

          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email Card */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div className="flex items-center gap-2.5 text-xs text-white/50 mb-2">
                <Mail className="w-4 h-4 text-[var(--tgs-red)]" />
                <span>Primary Email</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-white font-semibold truncate mb-3">
                {CONTACT_INFO.email}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-white/80 transition cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-xs font-bold text-white transition text-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
              <div className="flex items-center gap-2.5 text-xs text-white/50 mb-2">
                <MapPin className="w-4 h-4 text-[var(--tgs-blue)]" />
                <span>Studio Headquarters</span>
              </div>
              <div className="text-xs sm:text-sm text-white font-semibold mb-1">
                {CONTACT_INFO.location}
              </div>
              <p className="text-[11px] text-white/50 mb-3">
                {CONTACT_INFO.businessHours}
              </p>
              <div className="text-[10px] font-mono text-[var(--tgs-blue)] bg-[var(--tgs-blue)]/10 py-1 px-2 rounded w-fit border border-[var(--tgs-blue)]/30">
                ACTIVE STUDIO
              </div>
            </div>
          </div>

          {/* Interactive Message Form */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <h3 className="text-sm font-bold text-white mb-1">Send a Message to the Studio</h3>
            <p className="text-xs text-white/50 mb-4">
              Game proposals, partnerships, media inquiries, or general questions.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div className="font-bold text-white text-sm">Message Sent Successfully!</div>
                <p className="text-xs text-white/60">
                  Thank you! Our studio team will review your message and reply to {formState.email}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-2 text-xs text-[var(--tgs-blue)] hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-white/60 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Hunter"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-white/60 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-white/60 mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Game partnership, feedback, or inquiry"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-white/60 mb-1">Message *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us what you have in mind…"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--tgs-blue)] resize-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--tgs-red)] to-[var(--tgs-red-bright)] text-white font-bold text-xs tracking-wide shadow-lg shadow-[var(--tgs-red)]/20 hover:brightness-110 active:scale-95 transition cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Sending..." : "Transmit Message"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-white/10 bg-black/30 flex items-center justify-between text-[11px] text-white/40 px-5">
          <span>© 2026 Tanishq Gaming Studios</span>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
