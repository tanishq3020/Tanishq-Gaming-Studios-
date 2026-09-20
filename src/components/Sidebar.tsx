import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  MessageSquare,
  MoreVertical,
  Trash2,
  Edit2,
  Pin,
  Gamepad2,
  Globe,
  Settings,
  X,
  Sparkles,
  ChevronRight,
  Code2,
  Flame,
  User as UserIcon
} from "lucide-react";
import { Conversation, User } from "../types/chat";
import { TgsLogo } from "./TgsLogo";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onTogglePinConversation: (id: string) => void;
  onClearAll: () => void;
  onOpenGameDev: () => void;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
  onToggleLandingPage: () => void;
  onGoToStudio?: () => void;
  currentUser: User | null;
}

export const Sidebar: React.FC<Props> = ({
  isOpen,
  onClose,
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  onRenameConversation,
  onTogglePinConversation,
  onClearAll,
  onOpenGameDev,
  onOpenSettings,
  onOpenAuth,
  onToggleLandingPage,
  onGoToStudio,
  currentUser
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  // Group conversations by time: Today, Yesterday, Previous 7 Days, Older
  const filteredAndGrouped = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const list = conversations.filter((c) =>
      c.title.toLowerCase().includes(q) ||
      c.messages.some((m) => m.content.toLowerCase().includes(q))
    );

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    const pinned: Conversation[] = [];
    const today: Conversation[] = [];
    const yesterday: Conversation[] = [];
    const previous7Days: Conversation[] = [];
    const older: Conversation[] = [];

    list.forEach((c) => {
      if (c.pinned) {
        pinned.push(c);
        return;
      }
      const diff = now - c.updatedAt;
      if (diff < oneDay) {
        today.push(c);
      } else if (diff < 2 * oneDay) {
        yesterday.push(c);
      } else if (diff < 7 * oneDay) {
        previous7Days.push(c);
      } else {
        older.push(c);
      }
    });

    return { pinned, today, yesterday, previous7Days, older };
  }, [conversations, searchQuery]);

  const startRename = (conv: Conversation) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
    setMenuOpenId(null);
  };

  const saveRename = (id: string) => {
    if (editTitle.trim()) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "code":
        return <Code2 className="w-3.5 h-3.5 text-emerald-400" />;
      case "gamedev":
        return <Gamepad2 className="w-3.5 h-3.5 text-[var(--tgs-blue)]" />;
      case "creative":
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-white/50" />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] sm:w-[300px] bg-[#070c18] border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <TgsLogo size="sm" showTagline={true} />
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded text-white/60 hover:text-white hover:bg-white/10"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action: New Chat Button */}
        <div className="p-3 space-y-2">
          <button
            type="button"
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--tgs-blue)] to-[var(--tgs-blue-electric)] text-[#040814] font-bold text-sm tracking-wide shadow-md shadow-[var(--tgs-blue)]/20 hover:brightness-110 active:scale-[0.98] transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Chat</span>
          </button>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search chats…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[var(--tgs-blue)]/60 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Special Gaming Assistant Shortcut */}
        <div className="px-3 pb-2">
          <button
            type="button"
            onClick={() => {
              onOpenGameDev();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--tgs-red)]/10 hover:bg-[var(--tgs-red)]/20 border border-[var(--tgs-red)]/30 text-white transition group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-[var(--tgs-red-bright)] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Game Dev Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--tgs-red)] animate-ping" />
                </div>
                <div className="text-[10px] text-white/50">Unity • Unreal • Godot • HTML5</div>
              </div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4 text-xs">
          {conversations.length === 0 ? (
            <div className="p-6 text-center text-white/40">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>No chat history yet</p>
              <p className="text-[11px] text-white/30 mt-1">Start a conversation with TGS AI</p>
            </div>
          ) : (
            <>
              {/* Pinned Chats */}
              {filteredAndGrouped.pinned.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-[var(--tgs-blue)] flex items-center gap-1.5">
                    <Pin className="w-3 h-3" /> Pinned
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {filteredAndGrouped.pinned.map((c) => renderChatItem(c))}
                  </div>
                </div>
              )}

              {/* Today */}
              {filteredAndGrouped.today.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Today
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {filteredAndGrouped.today.map((c) => renderChatItem(c))}
                  </div>
                </div>
              )}

              {/* Yesterday */}
              {filteredAndGrouped.yesterday.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Yesterday
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {filteredAndGrouped.yesterday.map((c) => renderChatItem(c))}
                  </div>
                </div>
              )}

              {/* Previous 7 Days */}
              {filteredAndGrouped.previous7Days.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Previous 7 Days
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {filteredAndGrouped.previous7Days.map((c) => renderChatItem(c))}
                  </div>
                </div>
              )}

              {/* Older */}
              {filteredAndGrouped.older.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Older
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {filteredAndGrouped.older.map((c) => renderChatItem(c))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="p-3 border-t border-white/10 bg-[#060913] space-y-2">
          {/* Direct link to Tanishq Gaming Studios Website */}
          {onGoToStudio && (
            <button
              type="button"
              onClick={onGoToStudio}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white text-xs font-bold transition shadow-md shadow-[var(--tgs-red)]/20 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Tanishq Gaming Studios</span>
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleLandingPage}
              className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition text-xs border border-white/10"
              title="View Landing Page"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--tgs-blue)]" />
              <span>Landing Page</span>
            </button>
            <button
              type="button"
              onClick={onOpenSettings}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition border border-white/10"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClearAll}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 transition border border-white/10"
              title="Clear all chat history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* User Account Tile */}
          <div
            onClick={onOpenAuth}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition cursor-pointer"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover border border-[var(--tgs-blue)]/50"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[var(--tgs-blue)]/20 text-[var(--tgs-blue)] flex items-center justify-center font-bold">
                <UserIcon className="w-4 h-4" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate flex items-center gap-1">
                <span>{currentUser?.name || "TGS Developer"}</span>
                {currentUser?.role && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-white/10 text-white/60 font-mono">
                    PRO
                  </span>
                )}
              </div>
              <div className="text-[10px] text-white/40 truncate">
                {currentUser?.email || "Click to sign in / manage"}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );

  function renderChatItem(conv: Conversation) {
    const isActive = conv.id === activeId;
    const isEditing = conv.id === editingId;

    if (isEditing) {
      return (
        <div key={conv.id} className="p-1.5 bg-white/10 rounded-lg">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveRename(conv.id);
              if (e.key === "Escape") setEditingId(null);
            }}
            autoFocus
            className="w-full px-2 py-1 bg-black/60 border border-[var(--tgs-blue)] rounded text-xs text-white focus:outline-none"
          />
          <div className="flex justify-end gap-1 mt-1.5">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="px-2 py-0.5 text-[10px] text-white/60 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => saveRename(conv.id)}
              className="px-2 py-0.5 text-[10px] bg-[var(--tgs-blue)] text-black font-bold rounded"
            >
              Save
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        key={conv.id}
        className={`group relative flex items-center justify-between px-2.5 py-2 rounded-lg transition cursor-pointer select-none ${
          isActive
            ? "bg-[var(--tgs-blue)]/15 text-white border border-[var(--tgs-blue)]/40"
            : "text-white/70 hover:bg-white/[0.05] hover:text-white"
        }`}
        onClick={() => {
          onSelectConversation(conv.id);
          if (window.innerWidth < 768) onClose();
        }}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1 pr-1">
          {getModeIcon(conv.mode)}
          <span className="truncate text-xs font-medium">{conv.title}</span>
        </div>

        {/* Options trigger */}
        <div
          className="relative flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {conv.pinned && (
            <Pin className="w-3 h-3 text-[var(--tgs-blue)] mr-1 opacity-75" />
          )}

          <button
            type="button"
            onClick={() => setMenuOpenId(menuOpenId === conv.id ? null : conv.id)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 text-white/60 hover:text-white transition"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>

          {/* Context Menu */}
          {menuOpenId === conv.id && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-[#0a1122] border border-white/15 rounded-lg shadow-xl py-1 z-30">
              <button
                type="button"
                onClick={() => startRename(conv)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10"
              >
                <Edit2 className="w-3 h-3" /> Rename
              </button>
              <button
                type="button"
                onClick={() => {
                  onTogglePinConversation(conv.id);
                  setMenuOpenId(null);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-white/80 hover:text-white hover:bg-white/10"
              >
                <Pin className="w-3 h-3" /> {conv.pinned ? "Unpin" : "Pin to top"}
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteConversation(conv.id);
                  setMenuOpenId(null);
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
};
