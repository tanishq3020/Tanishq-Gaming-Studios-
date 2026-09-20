import React, { useState } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Edit2,
  FileText,
  Code,
  User as UserIcon,
  Sparkles,
  Gamepad2,
  Bot
} from "lucide-react";
import { Message, AiMode } from "../types/chat";
import { ChatMessageRenderer } from "./ChatMessageRenderer";
import { toast } from "sonner";

interface Props {
  message: Message;
  isLastAssistant: boolean;
  onRegenerate?: () => void;
  onFeedback?: (id: string, isLike: boolean) => void;
  onEditMessage?: (id: string, newContent: string) => void;
  userAvatar?: string;
}

export const ChatMessageItem: React.FC<Props> = ({
  message,
  isLastAssistant,
  onRegenerate,
  onFeedback,
  onEditMessage,
  userAvatar
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    toast.success("Message copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== message.content && onEditMessage) {
      onEditMessage(message.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const formatTime = (timestamp: number) => {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getAssistantRoleBadge = (mode?: AiMode) => {
    switch (mode) {
      case "code":
        return { label: "TGS Code", icon: <Code className="w-3 h-3 text-emerald-400" /> };
      case "gamedev":
        return { label: "TGS Game Dev", icon: <Gamepad2 className="w-3 h-3 text-[var(--tgs-blue)]" /> };
      case "creative":
        return { label: "TGS Creative", icon: <Sparkles className="w-3 h-3 text-amber-400" /> };
      default:
        return { label: "TGS AI", icon: <Bot className="w-3 h-3 text-[var(--tgs-blue)]" /> };
    }
  };

  const roleInfo = getAssistantRoleBadge(message.mode);

  return (
    <div
      className={`group w-full max-w-4xl mx-auto px-3 sm:px-5 py-4 transition-colors ${
        isUser ? "flex flex-col items-end" : "flex flex-col items-start"
      }`}
    >
      <div className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            userAvatar ? (
              <img
                src={userAvatar}
                alt="User"
                className="w-8 h-8 rounded-xl object-cover border border-[var(--tgs-red)]/50 shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-xl bg-[var(--tgs-red)]/20 border border-[var(--tgs-red)]/50 text-[var(--tgs-red)] flex items-center justify-center font-bold text-xs">
                <UserIcon className="w-4 h-4" />
              </div>
            )
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b1427] to-[#122244] border border-[var(--tgs-blue)]/50 flex items-center justify-center text-[var(--tgs-blue)] shadow-md shadow-[var(--tgs-blue)]/20">
              <span className="font-display font-black text-xs text-[var(--tgs-blue)]">T</span>
            </div>
          )}
        </div>

        {/* Message Bubble Content */}
        <div className="flex-1 min-w-0">
          {/* Header row: Author + Timestamp */}
          <div className={`flex items-center gap-2 mb-1.5 text-xs text-white/50 ${isUser ? "justify-end" : "justify-start"}`}>
            {!isUser && (
              <span className="flex items-center gap-1 font-display font-bold text-[var(--tgs-blue)] uppercase tracking-wider text-[11px]">
                {roleInfo.icon}
                <span>{roleInfo.label}</span>
              </span>
            )}
            {isUser && <span className="font-bold text-white/70">You</span>}
            <span className="text-[10px] font-mono text-white/40">
              {formatTime(message.timestamp)}
            </span>
          </div>

          {/* Attachments rendering */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2.5">
              {message.attachments.map((att) => (
                <div
                  key={att.id}
                  className="rounded-xl overflow-hidden border border-white/15 bg-black/40 text-xs"
                >
                  {att.dataUrl ? (
                    <div className="relative group/img">
                      <img
                        src={att.dataUrl}
                        alt={att.name}
                        className="max-h-56 max-w-sm rounded-lg object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/70 text-[9px] px-1.5 py-0.5 rounded text-white/70">
                        {att.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-2.5 bg-white/5">
                      <FileText className="w-4 h-4 text-[var(--tgs-blue)]" />
                      <div className="truncate max-w-[180px]">
                        <p className="font-semibold text-white truncate">{att.name}</p>
                        <p className="text-[10px] text-white/40">
                          {att.size ? `${Math.round(att.size / 1024)} KB` : "Document"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Message Content or Edit Input */}
          <div
            className={`rounded-2xl p-4 transition-shadow ${
              isUser
                ? "bg-gradient-to-r from-[var(--tgs-navy)] to-[var(--tgs-navy-surface)] border border-[var(--tgs-red)]/25 text-white shadow-md shadow-black/30"
                : "glass-panel border border-white/10 text-white/90"
            }`}
          >
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  className="w-full bg-black/60 border border-[var(--tgs-blue)] rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none resize-y font-sans"
                />
                <div className="flex justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 rounded bg-white/10 text-xs text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="px-3 py-1 rounded bg-[var(--tgs-blue)] text-black text-xs font-bold hover:brightness-110"
                  >
                    Save & Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className="break-words">
                {isUser ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-white">
                    {message.content}
                  </p>
                ) : (
                  <ChatMessageRenderer content={message.content} />
                )}
              </div>
            )}
          </div>

          {/* Message Toolbar Buttons */}
          <div
            className={`flex items-center gap-1.5 mt-1.5 text-white/50 text-xs ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 rounded hover:bg-white/10 hover:text-white transition cursor-pointer"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[var(--tgs-blue)]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Edit Button for user */}
            {isUser && onEditMessage && !isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="p-1 rounded hover:bg-white/10 hover:text-white transition cursor-pointer"
                title="Edit message"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Assistant specific controls: Regenerate, Like, Dislike */}
            {!isUser && (
              <>
                {isLastAssistant && onRegenerate && (
                  <button
                    type="button"
                    onClick={onRegenerate}
                    className="p-1 rounded hover:bg-white/10 hover:text-white transition cursor-pointer flex items-center gap-1 text-[11px]"
                    title="Regenerate response"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Regenerate</span>
                  </button>
                )}

                {onFeedback && (
                  <>
                    <button
                      type="button"
                      onClick={() => onFeedback(message.id, true)}
                      className={`p-1 rounded hover:bg-white/10 transition cursor-pointer ${
                        message.isLiked ? "text-[var(--tgs-blue)]" : "hover:text-white"
                      }`}
                      title="Good response"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onFeedback(message.id, false)}
                      className={`p-1 rounded hover:bg-white/10 transition cursor-pointer ${
                        message.isDisliked ? "text-[var(--tgs-red)]" : "hover:text-white"
                      }`}
                      title="Bad response"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
