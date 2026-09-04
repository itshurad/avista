"use client";

import { useRef, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import Button from "./Button";
import { Download, Share2, Sparkles, Check, Copy } from "lucide-react";

export default function ShareCard({ character }) {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!character) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // استخراج مستقیم Blob بدون استفاده از fetch
  const generateBlobDirectly = async () => {
    if (!cardRef.current) return null;

    try {
      const blob = await toBlob(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        skipFonts: false,
      });
      return blob;
    } catch (err) {
      console.error("toBlob error:", err);
      return null;
    }
  };

  // اشتراک‌گذاری مستقیم تصویر در استوری/سیستم‌عامل
  const handleShareStory = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateBlobDirectly();
      if (!blob) {
        // روش جایگزین در صورت خطا در اشتراک مسقیم
        await handleDownloadImage();
        return;
      }

      const file = new File([blob], `avista-${character.transliteration}.png`, {
        type: "image/png",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `نویسهٔ اوستایی ${character.name}`,
          text: `آموزش دین‌دبیره در پلتفرم آویستا: ${currentUrl}`,
        });
      } else {
        await handleDownloadImage();
      }
    } catch (error) {
      console.error("خطا در هم‌رسانی:", error);
      await handleDownloadImage();
    } finally {
      setIsGenerating(false);
    }
  };

  // دانلود مستقیم فایل تصویر PNG بدون fetch
  const handleDownloadImage = async () => {
    setIsGenerating(true);
    try {
      if (!cardRef.current) return;

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `avista-${character.transliteration}-story.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("خطا در ساخت تصویر:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-6 sm:p-8 shadow-[var(--av-card-shadow)] space-y-6">
      {/* سربرگ بخش اشتراک */}
      <div className="flex items-center justify-between border-b border-[var(--av-surface-border)] pb-4">
        <span className="text-xs font-mono font-bold text-[var(--av-brand)] uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          کارت استوری و شبکه‌های اجتماعی
        </span>
        <span className="text-xs text-[var(--av-text-muted)]">
          خروجی باکیفیت گرافیکی
        </span>
      </div>

      {/* لوح پوستر استوری */}
      <div className="flex justify-center">
        <div
          ref={cardRef}
          className="relative w-full max-w-[340px] aspect-[4/5] rounded-[28px] p-8 flex flex-col justify-between overflow-hidden shadow-2xl select-none"
          style={{
            background:
              "linear-gradient(145deg, #070B12 0%, #0C121C 50%, #080D17 100%)",
            color: "#F8FAFC",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* هاله نور اتمسفریک آبی برند */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none blur-3xl"
            style={{ background: "rgba(0, 109, 255, 0.25)" }}
          />

          {/* سربرگ پوستر */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[rgba(0,109,255,0.15)] border border-[rgba(0,109,255,0.3)] text-xs font-bold text-[#006DFF]">
                𐬀
              </span>
              <span className="text-xs font-bold tracking-tight text-white/90 font-sans">
                آویستا · Avista
              </span>
            </div>

            <span className="font-mono text-[11px] text-white/40 tracking-wider">
              {character.unicode}
            </span>
          </div>

          {/* کاراکتر مرکزی اوستایی */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <span className="avestan-glyph text-8xl leading-none text-white drop-shadow-[0_10px_25px_rgba(0,109,255,0.4)]">
              {character.glyph}
            </span>

            <div className="mt-5 flex items-center gap-2 font-mono text-sm">
              <span className="font-bold text-[#006DFF] tracking-wider text-base">
                {character.transliteration}
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/70">{character.soundIpa}</span>
            </div>

            <span className="text-xs text-white/50 mt-1 font-sans">
              {character.name}
            </span>
          </div>

          {/* پانویس پوستر با متادیتا */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-white/40 font-mono">
              دین‌دبیره · Avestan Script
            </span>
            <span className="text-[#006DFF] font-mono font-semibold">
              avista.ir
            </span>
          </div>
        </div>
      </div>

      {/* دکمه‌های اقدام انتشار */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
        <Button
          onClick={handleShareStory}
          disabled={isGenerating}
          variant="primary"
          size="md"
        >
          <Share2 className="h-4 w-4 ml-1.5" />
          <span>
            {isGenerating ? "در حال آماده‌سازی..." : "اشتراک تصویر در استوری"}
          </span>
        </Button>

        <Button
          onClick={handleDownloadImage}
          disabled={isGenerating}
          variant="secondary"
          size="md"
        >
          <Download className="h-4 w-4 ml-1.5" />
          <span>ذخیره تصویر (PNG)</span>
        </Button>

        <Button onClick={handleCopyLink} variant="ghost" size="md">
          {copiedLink ? (
            <>
              <Check className="h-4 w-4 ml-1.5 text-emerald-500" />
              <span>کپی شد</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 ml-1.5" />
              <span>کپی لینک</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
