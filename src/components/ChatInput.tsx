import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Square,
  Mic,
  MicOff,
  Paperclip,
  Image as ImageIcon,
  X,
  FileText,
  Code,
  Loader2
} from "lucide-react";
import { Attachment } from "../types/chat";
import { toast } from "sonner";

interface Props {
  onSendMessage: (text: string, attachments: Attachment[]) => void;
  onStopGenerating: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<Props> = ({
  onSendMessage,
  onStopGenerating,
  isGenerating,
  disabled = false
}) => {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [text]);

  // Setup Web Speech API for voice dictation
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Listening… Speak your prompt");
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          toast.success("Speech captured");
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error !== "no-speech") {
          toast.error("Microphone error: " + event.error);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!speechRecognitionRef.current) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.start();
      } catch (err) {
        toast.error("Could not activate microphone");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (isGenerating) return;
    const trimmed = text.trim();
    if (!trimmed && attachments.length === 0) return;

    onSendMessage(trimmed, attachments);
    setText("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isImage: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();

      if (isImage || file.type.startsWith("image/")) {
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          setAttachments((prev) => [
            ...prev,
            {
              id: "att_" + Math.random().toString(36).substring(2, 9),
              name: file.name,
              type: file.type || "image/jpeg",
              size: file.size,
              dataUrl
            }
          ]);
          toast.success(`Attached image: ${file.name}`);
        };
        reader.readAsDataURL(file);
      } else {
        // Text / code / document file
        reader.onload = (event) => {
          const textContent = event.target?.result as string;
          setAttachments((prev) => [
            ...prev,
            {
              id: "att_" + Math.random().toString(36).substring(2, 9),
              name: file.name,
              type: file.type || "text/plain",
              size: file.size,
              textContent: textContent.slice(0, 15000) // cap for memory
            }
          ]);
          toast.success(`Attached file: ${file.name}`);
        };
        reader.readAsText(file);
      }
    });

    e.target.value = "";
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-5 pb-4 pt-2">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileUpload(e, false)}
        multiple
        accept=".txt,.pdf,.docx,.doc,.json,.js,.ts,.tsx,.jsx,.cs,.cpp,.py,.html,.css,.md"
        className="hidden"
      />
      <input
        type="file"
        ref={imageInputRef}
        onChange={(e) => handleFileUpload(e, true)}
        multiple
        accept="image/*"
        className="hidden"
      />

      {/* Attachment Previews */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 px-2 animate-in fade-in duration-200">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="group relative flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white"
            >
              {att.dataUrl ? (
                <img
                  src={att.dataUrl}
                  alt={att.name}
                  className="w-10 h-10 object-cover rounded-lg border border-white/20"
                />
              ) : att.name.endsWith(".cs") || att.name.endsWith(".ts") || att.name.endsWith(".cpp") ? (
                <div className="w-10 h-10 rounded-lg bg-[var(--tgs-blue)]/20 border border-[var(--tgs-blue)]/40 flex items-center justify-center text-[var(--tgs-blue)]">
                  <Code className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                  <FileText className="w-5 h-5" />
                </div>
              )}
              <div className="max-w-[130px] truncate">
                <p className="truncate font-semibold">{att.name}</p>
                <p className="text-[10px] text-white/50">
                  {att.size ? `${Math.round(att.size / 1024)} KB` : "File"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeAttachment(att.id)}
                className="p-1 rounded-full bg-black/60 hover:bg-red-500 text-white/70 hover:text-white transition ml-1"
                aria-label="Remove attachment"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Voice Listening indicator */}
      {isListening && (
        <div className="mb-2 px-3 py-1.5 rounded-lg bg-[var(--tgs-red)]/15 border border-[var(--tgs-red)]/40 text-[var(--tgs-red-bright)] text-xs flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--tgs-red-bright)] animate-ping" />
            <span>Listening to microphone… speak clearly into your device</span>
          </div>
          <button
            type="button"
            onClick={toggleMic}
            className="text-[11px] underline hover:text-white"
          >
            Done
          </button>
        </div>
      )}

      {/* Main Glass Input Container */}
      <div className="relative rounded-2xl glass-input border border-white/15 focus-within:border-[var(--tgs-blue)]/60 focus-within:shadow-[0_0_20px_rgba(0,210,255,0.2)] transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message TGS AI…"
          rows={1}
          disabled={disabled}
          className="w-full bg-transparent text-white placeholder-white/40 text-sm sm:text-base p-3.5 sm:p-4 pb-12 focus:outline-none resize-none leading-relaxed"
        />

        {/* Action Toolbar on Bottom */}
        <div className="absolute left-3 right-3 bottom-2.5 flex items-center justify-between pointer-events-auto">
          {/* Left tools: Files, Images, Mic */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* File Upload */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              title="Attach Document or Code (TXT, PDF, DOCX, Code)"
              aria-label="Upload document or code file"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Image Upload */}
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
              title="Attach Image"
              aria-label="Upload image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {/* Microphone */}
            <button
              type="button"
              onClick={toggleMic}
              className={`p-2 rounded-lg transition ${
                isListening
                  ? "bg-[var(--tgs-red)] text-white animate-bounce"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
              title={isListening ? "Stop listening" : "Voice input"}
              aria-label="Voice input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          {/* Right tool: Stop generating OR Send */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[11px] text-white/40 mr-1 font-mono select-none">
              Enter ↵ to send
            </span>

            {isGenerating ? (
              <button
                type="button"
                onClick={onStopGenerating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--tgs-red)] hover:bg-[var(--tgs-red-bright)] text-white text-xs font-bold transition cursor-pointer shadow-md shadow-[var(--tgs-red)]/20"
                title="Stop generating"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSend}
                disabled={!text.trim() && attachments.length === 0}
                className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                  text.trim() || attachments.length > 0
                    ? "bg-gradient-to-r from-[var(--tgs-blue)] to-[var(--tgs-blue-electric)] text-[#040814] shadow-md shadow-[var(--tgs-blue)]/25 hover:brightness-110"
                    : "bg-white/5 text-white/30 cursor-not-allowed"
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mt-2">
        <p className="text-[11px] text-white/35">
          TGS AI can assist with code, design & gaming mechanics. Verify critical production logic.
        </p>
      </div>
    </div>
  );
};
