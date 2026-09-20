import React, { useRef, useEffect, useState } from "react";
import { ArrowDown, Bot, Loader2 } from "lucide-react";
import { Message, AiMode } from "../types/chat";
import { ChatMessageItem } from "./ChatMessageItem";

interface Props {
  messages: Message[];
  isGenerating: boolean;
  streamingContent: string;
  streamingMode?: AiMode;
  onRegenerate: () => void;
  onFeedback: (id: string, isLike: boolean) => void;
  onEditMessage: (id: string, newContent: string) => void;
  userAvatar?: string;
}

export const ChatMessageList: React.FC<Props> = ({
  messages,
  isGenerating,
  streamingContent,
  streamingMode,
  onRegenerate,
  onFeedback,
  onEditMessage,
  userAvatar
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // Auto-scroll when messages or streaming content changes
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    bottomAnchorRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom(isGenerating ? "auto" : "smooth");
  }, [messages.length, streamingContent, isGenerating]);

  // Monitor scroll position to show/hide scroll button
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setShowScrollBottom(distanceFromBottom > 150);
  };

  const lastAssistantIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  })();

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto w-full relative divide-y divide-white/[0.03] scroll-smooth"
    >
      {messages.map((msg, index) => (
        <ChatMessageItem
          key={msg.id}
          message={msg}
          isLastAssistant={index === lastAssistantIndex}
          onRegenerate={onRegenerate}
          onFeedback={onFeedback}
          onEditMessage={onEditMessage}
          userAvatar={userAvatar}
        />
      ))}

      {/* Live Streaming Message Bubble */}
      {isGenerating && streamingContent && (
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-5 py-4 flex flex-col items-start">
          <div className="flex gap-3 max-w-[92%] sm:max-w-[85%]">
            <div className="shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0b1427] to-[#122244] border border-[var(--tgs-blue)]/50 flex items-center justify-center text-[var(--tgs-blue)] shadow-md shadow-[var(--tgs-blue)]/20 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 text-xs text-white/50">
                <span className="font-display font-bold text-[var(--tgs-blue)] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span>TGS AI</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--tgs-blue)] animate-ping" />
                </span>
                <span className="text-[10px] font-mono text-white/40">Thinking…</span>
              </div>
              <div className="glass-panel rounded-2xl p-4 border border-white/10 text-white/90">
                <ChatMessageItem
                  message={{
                    id: "temp_streaming",
                    role: "assistant",
                    content: streamingContent,
                    timestamp: Date.now(),
                    mode: streamingMode || "general"
                  }}
                  isLastAssistant={false}
                />
                <span className="inline-block w-2 h-4 bg-[var(--tgs-blue)] animate-pulse ml-1 align-middle" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Pulsing Dot Indicator if generating but no chunks yet */}
      {isGenerating && !streamingContent && (
        <div className="w-full max-w-4xl mx-auto px-3 sm:px-5 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0b1427] border border-[var(--tgs-blue)]/40 flex items-center justify-center text-[var(--tgs-blue)]">
            <Loader2 className="w-4 h-4 animate-spin text-[var(--tgs-blue)]" />
          </div>
          <div className="glass-panel px-4 py-2.5 rounded-2xl border border-white/10 text-xs text-white/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--tgs-blue)] animate-ping" />
            <span>TGS AI is computing response…</span>
          </div>
        </div>
      )}

      <div ref={bottomAnchorRef} className="h-4" />

      {/* Scroll to bottom button */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom("smooth")}
          className="fixed bottom-24 right-6 sm:right-10 p-2.5 rounded-full bg-[#0a1122] border border-[var(--tgs-blue)]/50 text-[var(--tgs-blue)] shadow-xl shadow-black/80 hover:bg-[var(--tgs-blue)] hover:text-black transition active:scale-95 cursor-pointer z-30"
          title="Scroll to latest message"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
