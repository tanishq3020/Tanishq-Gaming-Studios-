import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Props {
  content: string;
}

export const ChatMessageRenderer: React.FC<Props> = ({ content }) => {
  // Split content by code blocks ```...```
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 leading-relaxed text-sm">
      {parts.map((part, index) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n");
          let language = "";
          let codeBody = part.slice(3, -3);

          if (lines.length > 0 && !lines[0].includes(" ") && lines[0].length < 15) {
            language = lines[0].trim();
            codeBody = lines.slice(1).join("\n");
          }

          return (
            <CodeSnippetBlock
              key={index}
              code={codeBody.trim()}
              language={language || "code"}
            />
          );
        }

        return <FormattedText key={index} text={part} />;
      })}
    </div>
  );
};

const CodeSnippetBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 border border-white/15 bg-black/90 overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/10 text-[11px] text-white/60">
        <span className="uppercase tracking-wider font-semibold text-[var(--tgs-green)]">{language}</span>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-white/10 hover:text-white transition cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[var(--tgs-green)]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3 overflow-x-auto text-emerald-300/90 whitespace-pre font-mono leading-relaxed">
        {code}
      </div>
    </div>
  );
};

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />;
        }

        // Headers
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={idx} className="font-display font-bold text-white text-base mt-2 mb-1">
              {renderInlineStyles(trimmed.slice(4))}
            </h4>
          );
        }
        if (trimmed.startsWith("#### ")) {
          return (
            <h5 key={idx} className="font-display font-semibold text-white/95 text-sm mt-1.5 mb-0.5">
              {renderInlineStyles(trimmed.slice(5))}
            </h5>
          );
        }

        // Bullet list
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-[var(--tgs-green)] mt-0.5 text-xs">▪</span>
              <div className="flex-1 text-white/85">
                {renderInlineStyles(trimmed.slice(2))}
              </div>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-[var(--tgs-green)] font-mono text-xs mt-0.5">{numMatch[1]}.</span>
              <div className="flex-1 text-white/85">
                {renderInlineStyles(numMatch[2])}
              </div>
            </div>
          );
        }

        // Normal paragraph line
        return (
          <p key={idx} className="text-white/85 leading-relaxed">
            {renderInlineStyles(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineStyles(str: string): React.ReactNode[] {
  // Match `code` and **bold**
  const tokens = str.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return tokens.map((token, i) => {
    if (token.startsWith("`") && token.endsWith("`") && token.length > 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 bg-white/10 text-emerald-300 font-mono text-xs rounded border border-white/10"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={i} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    }
    return token;
  });
}
