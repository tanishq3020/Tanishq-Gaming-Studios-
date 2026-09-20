import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

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

          if (lines.length > 0 && !lines[0].includes(" ") && lines[0].length < 18) {
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

  const lineCount = code.split("\n").length;

  return (
    <div className="my-3 rounded-lg border border-[var(--tgs-blue)]/25 bg-[#050811] overflow-hidden font-mono text-xs shadow-lg shadow-black/40">
      <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/10 text-[11px] text-white/70">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[var(--tgs-blue)]" />
          <span className="uppercase tracking-wider font-semibold text-[var(--tgs-blue)]">{language}</span>
          <span className="text-[10px] text-white/40">({lineCount} lines)</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 hover:text-white transition cursor-pointer text-white/80"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[var(--tgs-blue)]" />
              <span className="text-[var(--tgs-blue)] font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-3.5 overflow-x-auto text-sky-200/95 whitespace-pre font-mono leading-relaxed selection:bg-sky-500/30">
        {code}
      </div>
    </div>
  );
};

const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split("\n");

  // Check if chunk is markdown table
  const isTable = lines.some((l) => l.trim().startsWith("|") && l.trim().endsWith("|"));
  if (isTable && lines.length >= 2) {
    const tableLines = lines.filter((l) => l.trim().startsWith("|"));
    if (tableLines.length >= 2) {
      const headers = tableLines[0].split("|").filter(Boolean).map((h) => h.trim());
      const bodyRows = tableLines.slice(2).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));

      return (
        <div className="my-3 overflow-x-auto rounded-lg border border-white/10 bg-black/40">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/15 bg-white/[0.06]">
                {headers.map((h, i) => (
                  <th key={i} className="py-2.5 px-3 font-semibold text-[var(--tgs-blue)]">
                    {renderInlineStyles(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bodyRows.map((row, ri) => (
                <tr key={ri} className="hover:bg-white/[0.02]">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2 px-3 text-white/80">
                      {renderInlineStyles(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Headers
        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={idx} className="font-display font-bold text-white text-lg mt-3 mb-1 text-[var(--tgs-blue)]">
              {renderInlineStyles(trimmed.slice(2))}
            </h2>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={idx} className="font-display font-bold text-white text-base mt-2.5 mb-1">
              {renderInlineStyles(trimmed.slice(3))}
            </h3>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={idx} className="font-display font-bold text-white text-sm mt-2 mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--tgs-blue)] inline-block" />
              {renderInlineStyles(trimmed.slice(4))}
            </h4>
          );
        }
        if (trimmed.startsWith("#### ")) {
          return (
            <h5 key={idx} className="font-display font-semibold text-white/95 text-xs mt-1.5 mb-0.5 uppercase tracking-wider text-[var(--tgs-blue-electric)]">
              {renderInlineStyles(trimmed.slice(5))}
            </h5>
          );
        }

        // Blockquote
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={idx} className="border-l-2 border-[var(--tgs-blue)] pl-3 py-1 my-1.5 text-white/70 italic text-xs bg-white/[0.02] rounded-r">
              {renderInlineStyles(trimmed.slice(2))}
            </blockquote>
          );
        }

        // Bullet list
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="text-[var(--tgs-blue)] mt-1 text-[10px]">◆</span>
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
              <span className="text-[var(--tgs-blue)] font-mono text-xs mt-0.5">{numMatch[1]}.</span>
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
};

function renderInlineStyles(str: string): React.ReactNode[] {
  // Match `code`, **bold**, and *italic*
  const tokens = str.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return tokens.map((token, i) => {
    if (token.startsWith("`") && token.endsWith("`") && token.length > 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 bg-white/10 text-sky-300 font-mono text-xs rounded border border-white/10"
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
    if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      return (
        <em key={i} className="italic text-white/90">
          {token.slice(1, -1)}
        </em>
      );
    }
    return token;
  });
}
