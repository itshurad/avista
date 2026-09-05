"use client";

import { useRef, useState } from "react";
import { toBlob, toPng } from "html-to-image";
import {
  Check,
  Copy,
  Download,
  Share2,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import Button from "./Button";

export default function ShareCard({ character }) {
  const exportCardRef = useRef(null);
  const [themeMode, setThemeMode] = useState("dark"); // 'dark' | 'light'
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!character) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const waitForFonts = async () => {
    if (typeof document === "undefined") return;
    try {
      if ("fonts" in document) {
        await document.fonts.ready;
      }
    } catch {}
  };

  const generateBlob = async () => {
    if (!exportCardRef.current) return null;
    try {
      await waitForFonts();
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(null)),
      );

      const blob = await toBlob(exportCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        width: 1080,
        height: 1350,
        skipFonts: false,
        backgroundColor: themeMode === "dark" ? "#070B12" : "#F8FAFC",
      });
      return blob;
    } catch (err) {
      console.error("Export generation error:", err);
      return null;
    }
  };

  const handleDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const blob = await generateBlob();
      if (!blob) {
        // روش فال‌بک
        const dataUrl = await toPng(exportCardRef.current, {
          cacheBust: true,
          pixelRatio: 2,
          width: 1080,
          height: 1350,
          backgroundColor: themeMode === "dark" ? "#070B12" : "#F8FAFC",
        });
        const link = document.createElement("a");
        link.download = `avista-${character.transliteration || "character"}-${themeMode}.png`;
        link.href = dataUrl;
        link.click();
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `avista-${character.transliteration || "character"}-${themeMode}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const blob = await generateBlob();
      if (!blob) {
        await handleDownload();
        return;
      }

      const filename = `avista-${character.transliteration || "character"}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      if (
        typeof navigator !== "undefined" &&
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: `نویسهٔ اوستایی ${character.name}`,
          text: `آموزش نویسهٔ ${character.name} در آویستا: ${currentUrl}`,
        });
      } else {
        await handleDownload();
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      await handleDownload();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1800);
    }
  };

  const isDark = themeMode === "dark";

  return (
    <section className="space-y-6">
      {/* سربرگ بخش اشتراک و سوییچر رنگ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[var(--av-brand)]" />
            <span className="text-xs   font-bold uppercase tracking-wider text-[var(--av-brand)]">
              Avista Story Card
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--av-text)] sm:text-2xl">
            کارت اشتراک‌گذاری استوری
          </h2>
        </div>

        {/* سوییچ تم کارت: سیاه / سفید */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-[var(--av-text-muted)]">
            پوستهٔ کارت:
          </span>
          <div className="flex items-center rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)] p-1">
            <button
              type="button"
              onClick={() => setThemeMode("dark")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                isDark
                  ? "bg-[#090D14] text-white shadow-xs"
                  : "text-[var(--av-text-secondary)] hover:text-[var(--av-text)]"
              }`}
            >
              <Moon className="h-3 w-3" />
              <span>تیره</span>
            </button>
            <button
              type="button"
              onClick={() => setThemeMode("light")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                !isDark
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-[var(--av-text-secondary)] hover:text-[var(--av-text)]"
              }`}
            >
              <Sun className="h-3 w-3 text-amber-500" />
              <span>سفید</span>
            </button>
          </div>
        </div>
      </div>

      {/* محفظه پیش‌نمایش در صفحه (طراحی صددرصد ریسپانسیو و همیشه نمایان) */}
      <div className="relative flex justify-center overflow-hidden rounded-3xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] p-4 sm:p-8 shadow-[var(--av-card-shadow)]">
        <div
          className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] rounded-[28px] p-7 sm:p-9 flex flex-col justify-between overflow-hidden shadow-2xl select-none transition-all duration-300"
          style={{
            background: isDark
              ? "linear-gradient(145deg, #070B12 0%, #0E1522 55%, #080D15 100%)"
              : "linear-gradient(145deg, #FFFFFF 0%, #F4F6FB 55%, #EBF0F8 100%)",
            color: isDark ? "#F8FAFC" : "#0A0E17",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* هاله نور اتمسفریک آبی برند */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-40"
            style={{
              background: isDark
                ? "rgba(0, 109, 255, 0.35)"
                : "rgba(0, 109, 255, 0.18)",
            }}
          />

          {/* سربرگ کارت: لوگوی دایره‌ای با نام برند */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full p-1.5 shadow-md border"
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.06)" : "#FFFFFF",
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.15)"
                    : "rgba(15, 23, 42, 0.08)",
                }}
              >
                <img
                  src="/logo.png"
                  alt="آویستا"
                  className="h-full w-full object-contain rounded-full"
                  crossOrigin="anonymous"
                />
              </div>

              <div>
                <div className="text-base font-extrabold tracking-tight">
                  آویستا
                </div>
                <div className="text-[10px]   tracking-widest uppercase opacity-50">
                  AVISTA · DIN DABIREH
                </div>
              </div>
            </div>

            <span
              className="  text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{
                borderColor: isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(15, 23, 42, 0.1)",
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.04)"
                  : "rgba(15, 23, 42, 0.03)",
                color: isDark
                  ? "rgba(255, 255, 255, 0.6)"
                  : "rgba(15, 23, 42, 0.6)",
              }}
            >
              {character.unicode}
            </span>
          </div>

          {/* بخش مرکزی: نویسه اوستایی */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
            <span
              className="avestan-glyph text-8xl sm:text-9xl leading-none select-none transition-transform"
              style={{
                color: isDark ? "#F8FAFC" : "#090D16",
                textShadow: isDark
                  ? "0 10px 40px rgba(0, 109, 255, 0.45)"
                  : "0 10px 30px rgba(0, 109, 255, 0.25)",
              }}
            >
              {character.glyph}
            </span>

            <div className="mt-5 text-center">
              <span className="  text-xs sm:text-sm font-bold tracking-wider text-[#006DFF]">
                {character.transliteration}
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-1">
                نویسهٔ {character.name}
              </h3>
              {character.soundIpa && (
                <div className="mt-1   text-xs opacity-50" dir="ltr">
                  /{character.soundIpa}/
                </div>
              )}
            </div>
          </div>

          {/* پانویس کارت */}
          <div
            className="relative z-10 pt-3 flex items-center justify-between text-xs border-t"
            style={{
              borderColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(15, 23, 42, 0.08)",
            }}
          >
            <span className="opacity-50 text-[11px]">
              آموزش دین‌دبیره اوستایی
            </span>
            <span className="  font-bold text-[#006DFF]">
              avista.ir
            </span>
          </div>
        </div>
      </div>

      {/* المان رندر خروجی ۱۰۸۰ در ۱۳۵۰ برای فایل دانلودی (در بک‌گراند مخفی و ایزوله) */}
      <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
        <div
          ref={exportCardRef}
          style={{
            width: "1080px",
            height: "1350px",
            background: isDark
              ? "linear-gradient(145deg, #070B12 0%, #0E1522 55%, #080D15 100%)"
              : "linear-gradient(145deg, #FFFFFF 0%, #F4F6FB 55%, #EBF0F8 100%)",
            color: isDark ? "#F8FAFC" : "#0A0E17",
            padding: "86px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            fontFamily: "var(--font-vazirmatn), system-ui, sans-serif",
          }}
        >
          {/* هاله نور در خروجی */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: isDark
                ? "rgba(0, 109, 255, 0.28)"
                : "rgba(0, 109, 255, 0.16)",
              filter: "blur(140px)",
              pointerEvents: "none",
            }}
          />

          {/* سربرگ خروجی با لوگوی دایره‌ای */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  padding: "10px",
                  background: isDark ? "rgba(255,255,255,0.08)" : "#FFFFFF",
                  border: isDark
                    ? "2px solid rgba(255,255,255,0.2)"
                    : "2px solid rgba(15,23,42,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src="/logo.png"
                  alt="آویستا"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                  crossOrigin="anonymous"
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "900",
                    letterSpacing: "-0.02em",
                  }}
                >
                  آویستا
                </div>
                <div
                  style={{
                    fontSize: "17px",
                    fontFamily: "monospace",
                    letterSpacing: "0.18em",
                    opacity: 0.5,
                  }}
                >
                  AVISTA · DIN DABIREH
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: "monospace",
                fontSize: "22px",
                fontWeight: "bold",
                padding: "10px 22px",
                borderRadius: "999px",
                border: isDark
                  ? "2px solid rgba(255,255,255,0.12)"
                  : "2px solid rgba(15,23,42,0.12)",
                opacity: 0.7,
              }}
            >
              {character.unicode}
            </div>
          </div>

          {/* نویسه مرکزی خروجی */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <span
              className="avestan-glyph"
              style={{
                fontSize: "300px",
                lineHeight: "1",
                textShadow: isDark
                  ? "0 25px 80px rgba(0, 109, 255, 0.5)"
                  : "0 20px 50px rgba(0, 109, 255, 0.25)",
              }}
            >
              {character.glyph}
            </span>

            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <div
                style={{
                  fontSize: "28px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  color: "#006DFF",
                  letterSpacing: "0.14em",
                }}
              >
                {character.transliteration}
              </div>
              <div
                style={{
                  fontSize: "56px",
                  fontWeight: "900",
                  marginTop: "8px",
                }}
              >
                نویسهٔ {character.name}
              </div>
              {character.soundIpa && (
                <div
                  style={{
                    fontSize: "28px",
                    fontFamily: "monospace",
                    opacity: 0.5,
                    marginTop: "8px",
                  }}
                  dir="ltr"
                >
                  /{character.soundIpa}/
                </div>
              )}
            </div>
          </div>

          {/* پانویس خروجی */}
          <div
            style={{
              paddingTop: "28px",
              borderTop: isDark
                ? "2px solid rgba(255,255,255,0.1)"
                : "2px solid rgba(15,23,42,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "20px",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div style={{ opacity: 0.5 }}>
              آموزش علمی و تعاملی دبیرهٔ اوستایی
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                color: "#006DFF",
                letterSpacing: "0.1em",
              }}
            >
              avista.ir
            </div>
          </div>
        </div>
      </div>

      {/* دکمه‌های اقدام */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        <Button
          onClick={handleShare}
          disabled={isGenerating}
          variant="primary"
          size="md"
          className="w-full"
        >
          <Share2 className="ml-1.5 h-4 w-4" />
          <span>
            {isGenerating ? "در حال پردازش..." : "اشتراک‌گذاری در استوری"}
          </span>
        </Button>

        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          variant="secondary"
          size="md"
          className="w-full"
        >
          <Download className="ml-1.5 h-4 w-4" />
          <span>ذخیره تصویر ({isDark ? "تیره" : "سفید"})</span>
        </Button>

        <Button
          onClick={handleCopyLink}
          variant="ghost"
          size="md"
          className="w-full"
        >
          {copiedLink ? (
            <>
              <Check className="ml-1.5 h-4 w-4 text-emerald-500" />
              <span>لینک کپی شد</span>
            </>
          ) : (
            <>
              <Copy className="ml-1.5 h-4 w-4" />
              <span>کپی لینک</span>
            </>
          )}
        </Button>
      </div>
    </section>
  );
}
