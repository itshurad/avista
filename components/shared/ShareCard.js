"use client";

import { useState } from "react";
import { shareCharacter, getShareUrls } from "@/lib/share/shareActions";
import Button from "./Button";
import { Share2, Check, Copy, Send } from "lucide-react";

export default function ShareCard({ character }) {
  const [copied, setCopied] = useState(false);

  if (!character) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const { telegram, x } = getShareUrls({
    glyph: character.glyph,
    name: character.name,
    url: currentUrl,
  });

  const handleCopy = async () => {
    const textToCopy = `نویسهٔ اوستایی: ${character.glyph} (${character.name})\n${currentUrl}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    await shareCharacter({
      glyph: character.glyph,
      name: character.name,
      url: currentUrl,
    });
  };

  return (
    <div className="rounded-[8px] border border-[var(--av-border)] bg-[var(--av-surface)] p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-[var(--av-border)] pb-3">
        <span className="text-xs font-bold text-[var(--av-accent)]">
          اشتراک دانش
        </span>
        <span className="text-[11px] text-[var(--av-text-muted)]">
          بازنشر این نویسه
        </span>
      </div>

      {/* پیش‌نمایش مینیمال لوح کتیبه برای اشتراک */}
      <div className="rounded-[6px] border border-[var(--av-border)] bg-[var(--av-bg)] p-6 text-center space-y-2">
        <span className="text-[10px] tracking-widest text-[var(--av-text-muted)] uppercase block">
          AVISTA · دین‌دبیره
        </span>
        <span className="avestan-glyph text-6xl text-[var(--av-text)] block my-2">
          {character.glyph}
        </span>
        <span className="text-xs font-bold text-[var(--av-text)] block">
          نویسهٔ {character.name} ({character.transliteration})
        </span>
        <span className="text-[10px] text-[var(--av-text-muted)] block">
          avista.ir/learn/{character.id}
        </span>
      </div>

      {/* کلیدهای تعاملی بازنشر */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <Button onClick={handleNativeShare} variant="outline" size="sm">
          <Share2 className="h-3.5 w-3.5 ml-1.5" />
          هم‌رسانی
        </Button>

        <Button onClick={handleCopy} variant="secondary" size="sm">
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 ml-1.5 text-[var(--av-success)]" />
              کپی شد
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 ml-1.5" />
              کپی پیوند
            </>
          )}
        </Button>

        <a href={telegram} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm">
            <Send className="h-3.5 w-3.5 ml-1.5" />
            تلگرام
          </Button>
        </a>

        <a href={x} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm">
            X (توییتر)
          </Button>
        </a>
      </div>
    </div>
  );
}
