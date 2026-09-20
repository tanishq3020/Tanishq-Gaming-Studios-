export type AiMode = 'general' | 'code' | 'gamedev' | 'creative';

export type AiModelId = 'gemini-3.8-flash' | 'tgs-quantum' | 'tgs-turbo' | 'tgs-ultra';

export type ThemeMode = 'dark' | 'navy' | 'cyber' | 'light';

export type LanguageOption = 'en' | 'es' | 'hi' | 'ja' | 'fr' | 'de';

export interface UserPreferences {
  theme: ThemeMode;
  model: AiModelId;
  creativity: number;
  language: LanguageOption;
  autoSave: boolean;
  historyRetentionDays?: number;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size?: number;
  dataUrl?: string; // base64 for images/files
  textContent?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  attachments?: Attachment[];
  mode?: AiMode;
  model?: string;
  isLiked?: boolean;
  isDisliked?: boolean;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  mode: AiMode;
  model: AiModelId;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
  pinned?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isGuest?: boolean;
  role?: string;
  bio?: string;
}

export interface UserSettings {
  theme: ThemeMode;
  aiModel: AiModelId;
  language: string;
  temperature: number;
  autoSaveHistory: boolean;
  soundEffects: boolean;
  streamResponses: boolean;
}
