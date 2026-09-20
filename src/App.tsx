import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import {
  Conversation,
  Message,
  User,
  AiMode,
  AiModelId,
  Attachment,
  UserPreferences,
  ThemeMode
} from "./types/chat";
import { Sidebar } from "./components/Sidebar";
import { ChatHeader } from "./components/ChatHeader";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ChatMessageList } from "./components/ChatMessageList";
import { ChatInput } from "./components/ChatInput";
import { GameDevAssistantModal } from "./components/GameDevAssistantModal";
import { SettingsModal } from "./components/SettingsModal";
import { AuthModal } from "./components/AuthModal";
import { LandingPage } from "./components/LandingPage";
import { TanishqGamingStudiosPortal } from "./components/TanishqGamingStudiosPortal";

const STORAGE_KEY_CONVERSATIONS = "tgs_ai_conversations_v2";
const STORAGE_KEY_PREFS = "tgs_ai_preferences_v2";
const STORAGE_KEY_USER = "tgs_ai_user_v2";

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "dark",
  model: "gemini-3.8-flash",
  creativity: 0.7,
  language: "en",
  autoSave: true,
  historyRetentionDays: 30
};

export function App() {
  // Navigation / View state
  const [view, setView] = useState<"chat" | "landing" | "studio">("chat");

  // Chat Conversations State
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONVERSATIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse saved conversations", e);
    }
    return [];
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(() => {
    return conversations.length > 0 ? conversations[0].id : null;
  });

  // Active AI Mode & Model
  const [activeMode, setActiveMode] = useState<AiMode>("general");
  const [activeModel, setActiveModel] = useState<AiModelId>("gemini-3.8-flash");

  // User Profile & Preferences
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not parse saved user", e);
    }
    return {
      id: "usr_developer",
      name: "Tanishq Sharma",
      email: "tanishq@tgs.games",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
      role: "Studio Director & Game Architect",
      bio: "Founder of TGS. Building next-gen game engines & interactive AI."
    };
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PREFS);
      if (saved) return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
    } catch (e) {
      console.warn("Could not parse saved preferences", e);
    }
    return DEFAULT_PREFERENCES;
  });

  // UI Modals & Drawers
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGameDevModalOpen, setIsGameDevModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Streaming & Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  // Apply Theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", preferences.theme);
  }, [preferences.theme]);

  // Persist conversations
  useEffect(() => {
    if (preferences.autoSave) {
      localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(conversations));
    }
  }, [conversations, preferences.autoSave]);

  // Persist preferences
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(preferences));
  }, [preferences]);

  // Persist user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  // Active conversation object
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  // Sync mode with active conversation if exists
  useEffect(() => {
    if (activeConversation && activeConversation.mode) {
      setActiveMode(activeConversation.mode);
    }
  }, [activeConversationId]);

  // Create New Chat
  const handleNewChat = (customMode?: AiMode) => {
    const newMode = customMode || activeMode || "general";
    const newConv: Conversation = {
      id: "conv_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now(),
      title: "New Conversation",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      mode: newMode,
      model: preferences.model,
      pinned: false,
      messages: []
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setActiveMode(newMode);
    setView("chat");
    setStreamingContent("");
  };

  // Switch Conversation
  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setActiveMode(conv.mode);
    }
    setView("chat");
    setStreamingContent("");
  };

  // Delete Conversation
  const handleDeleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeConversationId === id) {
      const remaining = conversations.filter((c) => c.id !== id);
      setActiveConversationId(remaining.length > 0 ? remaining[0].id : null);
    }
    toast.success("Conversation deleted");
  };

  // Rename Conversation
  const handleRenameConversation = (id: string, newTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle, updatedAt: Date.now() } : c))
    );
    toast.success("Chat renamed");
  };

  // Toggle Pin
  const handleTogglePinConversation = (id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    );
  };

  // Clear current active conversation messages
  const handleClearActiveConversation = () => {
    if (!activeConversationId) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? { ...c, messages: [], updatedAt: Date.now() }
          : c
      )
    );
    toast.info("Conversation cleared");
  };

  // Clear all conversations
  const handleClearAllConversations = () => {
    setConversations([]);
    setActiveConversationId(null);
    localStorage.removeItem(STORAGE_KEY_CONVERSATIONS);
    toast.info("All conversations erased");
  };

  // Stop Generation
  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);

    // If there was partial streaming content, append it
    if (streamingContent.trim() && activeConversationId) {
      const finalMsg: Message = {
        id: "msg_" + Math.random().toString(36).substring(2, 9),
        role: "assistant",
        content: streamingContent + " *(Response stopped)*",
        timestamp: Date.now(),
        mode: activeMode
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversationId
            ? { ...c, messages: [...c.messages, finalMsg], updatedAt: Date.now() }
            : c
        )
      );
    }

    setStreamingContent("");
    toast.info("Generation stopped");
  };

  // Send Message with Streaming & Fallback
  const handleSendMessage = async (
    text: string,
    attachments: Attachment[] = [],
    forcedMode?: AiMode
  ) => {
    if (isGenerating) return;

    const modeToUse = forcedMode || activeMode || "general";
    let targetConvId = activeConversationId;
    let currentConv = conversations.find((c) => c.id === targetConvId);

    // If no active conversation, create one
    if (!targetConvId || !currentConv) {
      const title = text.length > 32 ? text.slice(0, 32) + "…" : text || "New Conversation";
      const newConv: Conversation = {
        id: "conv_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now(),
        title,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        mode: modeToUse,
        model: preferences.model,
        pinned: false,
        messages: []
      };

      targetConvId = newConv.id;
      currentConv = newConv;
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    } else if (currentConv.messages.length === 0 && text) {
      // Auto-title conversation on first message
      const title = text.length > 32 ? text.slice(0, 32) + "…" : text;
      handleRenameConversation(targetConvId, title);
    }

    // Append User Message
    const userMsg: Message = {
      id: "msg_" + Math.random().toString(36).substring(2, 9),
      role: "user",
      content: text,
      timestamp: Date.now(),
      attachments: attachments.length > 0 ? attachments : undefined
    };

    const updatedMessages = [...currentConv.messages, userMsg];

    setConversations((prev) =>
      prev.map((c) =>
        c.id === targetConvId
          ? { ...c, messages: updatedMessages, updatedAt: Date.now() }
          : c
      )
    );

    // Prepare for streaming
    setIsGenerating(true);
    setStreamingContent("");

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const historyForApi = updatedMessages.map((m) => ({
      role: m.role,
      content: m.content
    }));

    try {
      // Attempt SSE streaming from /api/ai/chat/stream
      const response = await fetch("/api/ai/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyForApi,
          mode: modeToUse,
          model: preferences.model,
          attachments
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedReply = "";

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunkText = decoder.decode(value, { stream: true });
            const lines = chunkText.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.chunk) {
                    accumulatedReply += data.chunk;
                    setStreamingContent(accumulatedReply);
                  }
                  if (data.done && data.full) {
                    accumulatedReply = data.full;
                    setStreamingContent(accumulatedReply);
                  }
                } catch (err) {
                  // partial JSON chunk
                }
              }
            }
          }
        }
      }

      const finalAssistantMsg: Message = {
        id: "msg_" + Math.random().toString(36).substring(2, 9),
        role: "assistant",
        content: accumulatedReply || "TGS AI completed analysis successfully.",
        timestamp: Date.now(),
        mode: modeToUse
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === targetConvId
            ? { ...c, messages: [...updatedMessages, finalAssistantMsg], updatedAt: Date.now() }
            : c
        )
      );
    } catch (err: any) {
      if (err.name === "AbortError") {
        return; // User clicked Stop
      }

      console.warn("Streaming fetch failed, invoking fallback JSON chat:", err?.message);

      // Fallback: standard POST request
      try {
        const fallbackRes = await axios.post("/api/ai/chat", {
          message: text,
          history: historyForApi,
          mode: modeToUse,
          model: preferences.model,
          attachments
        });

        const reply = fallbackRes.data?.reply || "TGS AI answer computed.";

        const finalAssistantMsg: Message = {
          id: "msg_" + Math.random().toString(36).substring(2, 9),
          role: "assistant",
          content: reply,
          timestamp: Date.now(),
          mode: modeToUse
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.id === targetConvId
              ? { ...c, messages: [...updatedMessages, finalAssistantMsg], updatedAt: Date.now() }
              : c
          )
        );
      } catch (fallbackErr: any) {
        toast.error("Failed to generate response. Please try again.");
      }
    } finally {
      setIsGenerating(false);
      setStreamingContent("");
      abortControllerRef.current = null;
    }
  };

  // Regenerate Response
  const handleRegenerate = () => {
    if (!activeConversation || activeConversation.messages.length === 0 || isGenerating) return;

    // Find the last user message
    const messages = activeConversation.messages;
    let lastUserIndex = -1;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "user") {
        lastUserIndex = i;
        break;
      }
    }

    if (lastUserIndex === -1) return;

    const userMessage = messages[lastUserIndex];
    // Trim conversation back to user message
    const trimmed = messages.slice(0, lastUserIndex);

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id ? { ...c, messages: trimmed } : c
      )
    );

    // Resend
    handleSendMessage(userMessage.content, userMessage.attachments, activeConversation.mode);
  };

  // Feedback on message
  const handleFeedback = (id: string, isLike: boolean) => {
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        messages: c.messages.map((m) => {
          if (m.id === id) {
            return {
              ...m,
              isLiked: isLike ? !m.isLiked : false,
              isDisliked: !isLike ? !m.isDisliked : false
            };
          }
          return m;
        })
      }))
    );
    toast.success(isLike ? "Thanks for your feedback!" : "Feedback recorded. We'll improve!");
  };

  // Edit User Message
  const handleEditMessage = (id: string, newContent: string) => {
    if (!activeConversation) return;
    const msgIndex = activeConversation.messages.findIndex((m) => m.id === id);
    if (msgIndex === -1) return;

    // Cut off all messages after this edit point and re-run
    const attachments = activeConversation.messages[msgIndex].attachments || [];
    const trimmed = activeConversation.messages.slice(0, msgIndex);

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id ? { ...c, messages: trimmed } : c
      )
    );

    handleSendMessage(newContent, attachments, activeConversation.mode);
  };

  // Export conversations
  const handleExportChat = (format: "json" | "markdown") => {
    if (!activeConversation) {
      toast.error("No active conversation to export");
      return;
    }

    let fileData: string;
    let fileName: string;
    let mimeType: string;

    if (format === "json") {
      fileData = JSON.stringify(activeConversation, null, 2);
      fileName = `${activeConversation.title.replace(/[^a-z0-9]/gi, "_")}.json`;
      mimeType = "application/json";
    } else {
      fileData = `# ${activeConversation.title}\n*Exported from TGS AI on ${new Date().toLocaleString()}*\n\n---\n\n`;
      activeConversation.messages.forEach((m) => {
        fileData += `### ${m.role === "user" ? "You" : "TGS AI"} (${new Date(
          m.timestamp
        ).toLocaleTimeString()})\n\n${m.content}\n\n---\n\n`;
      });
      fileName = `${activeConversation.title.replace(/[^a-z0-9]/gi, "_")}.md`;
      mimeType = "text/markdown";
    }

    const blob = new Blob([fileData], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${format.toUpperCase()}`);
  };

  // Auth Operations
  const handleLogin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await axios.post("/api/auth/login", { email, password: pass });
      if (res.data?.user) {
        setCurrentUser(res.data.user);
        return true;
      }
    } catch (e) {
      // Fallback demo user
      setCurrentUser({
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0],
        email,
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
        role: "Game Architect"
      });
      return true;
    }
    return false;
  };

  const handleRegister = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const res = await axios.post("/api/auth/register", { name, email, password: pass });
      if (res.data?.user) {
        setCurrentUser(res.data.user);
        return true;
      }
    } catch (e) {
      setCurrentUser({
        id: "usr_" + Math.random().toString(36).substring(2, 9),
        name,
        email,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "TGS Developer"
      });
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateProfile = (updated: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updated });
    }
  };

  // Render Studio Portal if toggled
  if (view === "studio") {
    return (
      <>
        <Toaster position="top-right" richColors />
        <TanishqGamingStudiosPortal
          onBackToChat={() => setView("chat")}
          onOpenGameDev={() => {
            setView("chat");
            setIsGameDevModalOpen(true);
          }}
        />
        <GameDevAssistantModal
          isOpen={isGameDevModalOpen}
          onClose={() => setIsGameDevModalOpen(false)}
          onApplyPrompt={(prompt, mode) => {
            setView("chat");
            handleNewChat(mode);
            handleSendMessage(prompt, [], mode);
          }}
        />
      </>
    );
  }

  // Render Landing Page if toggled
  if (view === "landing") {
    return (
      <>
        <Toaster position="top-right" richColors />
        <LandingPage
          onStartChatting={() => setView("chat")}
          onOpenGameDev={() => {
            setView("chat");
            setIsGameDevModalOpen(true);
          }}
          onGoToStudio={() => setView("studio")}
        />
        <GameDevAssistantModal
          isOpen={isGameDevModalOpen}
          onClose={() => setIsGameDevModalOpen(false)}
          onApplyPrompt={(prompt, mode) => {
            setView("chat");
            handleNewChat(mode);
            handleSendMessage(prompt, [], mode);
          }}
        />
      </>
    );
  }

  const activeMessages = activeConversation?.messages || [];
  const hasMessages = activeMessages.length > 0;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060913] text-white select-none selection:bg-[var(--tgs-blue)] selection:text-black font-sans">
      <Toaster position="top-right" richColors />

      {/* Sidebar (Desktop fixed 280-300px, Mobile drawer) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        conversations={conversations}
        activeId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={() => handleNewChat()}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={handleRenameConversation}
        onTogglePinConversation={handleTogglePinConversation}
        onClearAll={handleClearAllConversations}
        onOpenGameDev={() => setIsGameDevModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onToggleLandingPage={() => setView("landing")}
        onGoToStudio={() => setView("studio")}
        currentUser={currentUser}
      />

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col min-w-0 md:ml-[280px] sm:md:ml-[300px] h-full bg-[#060913] relative">
        {/* Chat Top Header */}
        <ChatHeader
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          activeMode={activeMode}
          onChangeMode={(mode) => {
            setActiveMode(mode);
            if (activeConversationId) {
              setConversations((prev) =>
                prev.map((c) =>
                  c.id === activeConversationId ? { ...c, mode } : c
                )
              );
            }
          }}
          activeModel={preferences.model}
          onChangeModel={(model) => setPreferences({ ...preferences, model })}
          onOpenGameDev={() => setIsGameDevModalOpen(true)}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          onClearConversation={handleClearActiveConversation}
          onToggleLandingPage={() => setView("landing")}
          onGoToStudio={() => setView("studio")}
          hasMessages={hasMessages}
        />

        {/* Conversation Feed or Welcome Screen */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
          {!hasMessages && !isGenerating ? (
            <div className="flex-1 overflow-y-auto">
              <WelcomeScreen
                onSelectPrompt={(promptText, suggestedMode) => {
                  if (suggestedMode) setActiveMode(suggestedMode);
                  handleSendMessage(promptText, [], suggestedMode);
                }}
                onOpenGameDev={() => setIsGameDevModalOpen(true)}
                onGoToStudio={() => setView("studio")}
                activeMode={activeMode}
              />
            </div>
          ) : (
            <ChatMessageList
              messages={activeMessages}
              isGenerating={isGenerating}
              streamingContent={streamingContent}
              streamingMode={activeMode}
              onRegenerate={handleRegenerate}
              onFeedback={handleFeedback}
              onEditMessage={handleEditMessage}
              userAvatar={currentUser?.avatar}
            />
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="shrink-0 bg-gradient-to-t from-[#060913] via-[#060913]/95 to-transparent pt-2">
          <ChatInput
            onSendMessage={handleSendMessage}
            onStopGenerating={handleStopGenerating}
            isGenerating={isGenerating}
          />
        </div>
      </main>

      {/* Game Dev Assistant Modal */}
      <GameDevAssistantModal
        isOpen={isGameDevModalOpen}
        onClose={() => setIsGameDevModalOpen(false)}
        onApplyPrompt={(prompt, mode) => {
          setActiveMode(mode);
          handleSendMessage(prompt, [], mode);
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        preferences={preferences}
        onUpdatePreferences={(newPrefs) => setPreferences((p) => ({ ...p, ...newPrefs }))}
        onExportChat={handleExportChat}
        onClearAllData={handleClearAllConversations}
      />

      {/* Auth & User Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
}

export default App;
