"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Download,
  ImagePlus,
  Palette,
  ChevronLeft,
  Share2,
} from "lucide-react";
import { toBlob, toPng } from "html-to-image";
import AvestanKeyboard from "@/components/keyboard/AvestanKeyboard";
import Postcard, {
  getPostcardExportBackground,
} from "@/components/postcard/Postcard";
import Button from "@/components/shared/Button";

const MAX_POSTCARDS = 50;
const POSTCARD_BASE = "/kartpostal";

const THEME_OPTIONS = [
  { id: "classic", label: "کلاسیک" },
  { id: "heritage", label: "عتیقه" },
  { id: "modern", label: "تیره" },
  { id: "fantasy", label: "فانتزی" },
  { id: "royal", label: "سلطنتی" },
  { id: "festive", label: "جشن" },
  { id: "night", label: "شب" },
  { id: "botanical", label: "گیاهی" },
  { id: "sunset", label: "غروب" },
  { id: "ocean", label: "دریایی" },
  { id: "desert", label: "کویری" },
  { id: "winter", label: "زمستانی" },
  { id: "cyber", label: "سایبری" },
  // ---- تم‌های جدید ----
  { id: "autumn", label: "پاییزی" },
  { id: "mint", label: "نعنایی" },
  { id: "rose", label: "رز" },
  { id: "midnight", label: "نیمه‌شب" },
  { id: "gold", label: "طلایی" },
  { id: "lavender", label: "اسطوخودوس" },
];

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((value) =>
      Math.max(0, Math.min(255, Math.round(value)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

function mixWithWhite({ r, g, b }, amount = 0.8) {
  return {
    r: r + (255 - r) * amount,
    g: g + (255 - g) * amount,
    b: b + (255 - b) * amount,
  };
}

function getImagePalette(src) {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const width = 64;
        canvas.width = width;
        canvas.height = Math.max(
          1,
          Math.round((image.height / image.width) * width),
        );
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const buckets = new Map();

        for (let index = 0; index < pixels.length; index += 24) {
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max ? (max - min) / max : 0;
          if (
            brightness < 25 ||
            brightness > 250 ||
            (saturation < 0.07 && brightness > 200)
          )
            continue;
          const key = [
            Math.round(r / 32),
            Math.round(g / 32),
            Math.round(b / 32),
          ].join(",");
          buckets.set(key, (buckets.get(key) || 0) + 1);
        }

        let best = [140, 150, 160];
        let bestCount = 0;
        for (const [key, count] of buckets) {
          if (count > bestCount) {
            bestCount = count;
            best = key.split(",").map((value) => Number(value) * 32);
          }
        }

        const base = { r: best[0], g: best[1], b: best[2] };
        const bg = mixWithWhite(base, 0.85);
        const luminance = (bg.r * 299 + bg.g * 587 + bg.b * 114) / 1000;
        resolve({
          bg: rgbToHex(bg),
          ink: luminance < 145 ? "#F8FAFC" : "#0F172A",
          line:
            luminance < 145
              ? "rgba(255,255,255,.22)"
              : `rgba(${base.r},${base.g},${base.b},.2)`,
          accent: rgbToHex(base),
        });
      } catch {
        resolve({
          bg: "#0C121C",
          ink: "#F8FAFC",
          line: "rgba(255,255,255,.15)",
          accent: "#006DFF",
        });
      }
    };
    image.onerror = () =>
      resolve({
        bg: "#0C121C",
        ink: "#F8FAFC",
        line: "rgba(255,255,255,.15)",
        accent: "#006DFF",
      });
    image.src = src;
  });
}

async function findPostcardImages() {
  const found = [];
  for (let index = 1; index <= MAX_POSTCARDS; index += 1) {
    const candidates = [
      `${POSTCARD_BASE}/kartpostal-${index}.webp`,
      `${POSTCARD_BASE}/kartpostal-${index}.webpg`,
    ];
    let resolved = null;
    for (const src of candidates) {
      const exists = await new Promise((resolve) => {
        const image = new window.Image();
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
        image.src = src;
      });
      if (exists) {
        resolved = src;
        break;
      }
    }
    if (!resolved) break;
    found.push({ id: index, src: resolved });
  }
  return found;
}

// تشخیص پلتفرم برای انتخاب رفتار درست دکمه‌ی دانلود:
// - iOS: دانلود مستقیم فایل امکان «ذخیره در گالری» نمی‌دهد، پس باید از
//   Web Share API استفاده کرد (که در سافاری گزینه‌ی «Save Image» را می‌آورد).
// - اندروید/دسکتاپ: به‌جای شیت اشتراک‌گذاری، باید فایل مستقیماً دانلود شود.
function detectPlatform() {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes("Macintosh") && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

export default function KeyboardPage() {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);
  const [palettes, setPalettes] = useState({});
  const [selected, setSelected] = useState(1);
  const [postcardTheme, setPostcardTheme] = useState("classic");
  const [loadingCards, setLoadingCards] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [platform, setPlatform] = useState("desktop");
  const cardRefs = useRef({});

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoadingCards(true);
    findPostcardImages().then(async (items) => {
      if (cancelled) return;
      setCards(items);
      if (items.length && !items.some((item) => item.id === selected)) {
        setSelected(items[0].id);
      }
      const entries = await Promise.all(
        items.map(async (item) => [item.id, await getImagePalette(item.src)]),
      );
      if (!cancelled) {
        setPalettes(Object.fromEntries(entries));
        setLoadingCards(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selected) || cards[0],
    [cards, selected],
  );

  const downloadCard = async (card) => {
    const node = cardRefs.current[card.id];
    if (!node) return;
    setDownloading(true);
    const fileName = `avista-kartpostal-${card.id}.png`;

    try {
      // اطمینان از بارگذاری کامل فونت‌ها قبل از رندر (مخصوصاً برای گلیف‌های اوستایی)
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      // اطمینان از دیکود کامل تمام عکس‌های داخل کارت (رفع باگ افتادن عکس در سافاری)
      const images = Array.from(node.querySelectorAll("img"));
      await Promise.all(
        images.map((img) =>
          img.decode ? img.decode().catch(() => {}) : Promise.resolve(),
        ),
      );

      // اندازه واقعی المان را صریح می‌گیریم؛ سافاری با aspect-ratio داخل
      // foreignObject درست محاسبه نمی‌کند، پس عرض/ارتفاع را دستی می‌دهیم
      const rect = node.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      // نکته‌ی مهم: پس‌زمینه‌ی خروجی باید رنگ واقعیِ پوسته‌ی انتخاب‌شده
      // باشد، نه رنگ پالت استخراج‌شده از خود عکس. قبلاً همیشه از پالت
      // استفاده می‌شد که فقط برای تم «کلاسیک» درست بود و برای تم‌هایی
      // مثل «سلطنتی» رنگ خروجی را عوض می‌کرد.
      const exportBackground = getPostcardExportBackground(
        postcardTheme,
        palettes[card.id],
      );

      const blob = await toBlob(node, {
        cacheBust: true,
        pixelRatio: 2,
        width,
        height,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          margin: "0",
        },
        backgroundColor: exportBackground,
        fetchRequestInit: { cache: "no-store" },
      });
      if (!blob) throw new Error("blob-generation-failed");

      const file = new File([blob], fileName, { type: "image/png" });

      // فقط در iOS از شیت اشتراک‌گذاری استفاده می‌کنیم؛ در اندروید/دسکتاپ
      // کاربر دکمه‌ی «دانلود» را می‌زند و باید مستقیماً فایل ذخیره شود،
      // نه اینکه شیت Share باز شود.
      if (platform === "ios" && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "کارت‌پستال آویستا" });
        } catch (shareError) {
          if (shareError?.name !== "AbortError") throw shareError;
        }
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (error) {
      console.error("خطا در خروجی کارت‌پستال:", error);
      try {
        const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 2 });
        window.open(dataUrl, "_blank");
      } catch {}
    } finally {
      setDownloading(false);
    }
  };

  const palette = selectedCard
    ? palettes[selectedCard.id] || {
        bg: "#0C121C",
        ink: "#F8FAFC",
        line: "rgba(255,255,255,.15)",
        accent: "#006DFF",
      }
    : null;

  const isIOSPlatform = platform === "ios";

  return (
    <div className="relative overflow-hidden py-4 sm:py-10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[200px] sm:h-[250px] bg-[var(--av-brand)]/8 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-2xl px-2.5 sm:px-6 space-y-6 sm:space-y-8">
        {/* سربرگ */}
        {/* سربرگ استودیو خط اوستایی */}
        <div className="relative text-center space-y-2 sm:space-y-3 pt-2 pb-1">
          {/* نشان کپسولی شناور */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface)]/70 backdrop-blur-md text-[11px] font-medium text-[var(--av-brand)] shadow-2xs">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--av-brand)] animate-pulse" />
            <span>استودیوی خوش‌نویسی و کارت‌پستال</span>
          </div>

          {/* تیتر اصلی */}
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--av-text)] leading-tight">
            کارگاه نگارش{" "}
            <span className="text-[var(--av-brand)] inline-block">
              دین‌دبیره
            </span>
          </h1>

          {/* توضیح کوتاه و متوازن */}
          <p className="max-w-md mx-auto text-xs sm:text-sm text-[var(--av-text-secondary)] leading-relaxed">
            با صفحه‌کلید تعاملی بنویسید و پیام خود را روی تمبر و کارت‌پستال‌های
            تاریخی دریافت کنید.
          </p>
        </div>

        {/* کیبورد کامپکت */}
        <AvestanKeyboard onTextChange={setText} />

        {/* بخش کارت‌پستال */}
        <section className="pt-4 border-t border-[var(--av-surface-border)] space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Palette className="h-3.5 w-3.5 text-[var(--av-brand)]" />
              <h2 className="text-xs sm:text-sm font-bold text-[var(--av-text)]">
                کارت‌پستال تمبردار
              </h2>
            </div>

            {selectedCard && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => downloadCard(selectedCard)}
                disabled={downloading}
                className="h-8 px-3 text-xs"
              >
                {isIOSPlatform ? (
                  <Share2 className="h-3 w-3 ml-1" />
                ) : (
                  <Download className="h-3 w-3 ml-1" />
                )}
                <span>
                  {downloading
                    ? "در حال ساخت…"
                    : isIOSPlatform
                      ? "اشتراک‌گذاری / ذخیره"
                      : "دانلود کارت"}
                </span>
              </Button>
            )}
          </div>

          {/* بخش انتخاب پوسته با برچسب ثابت و اسکرول مجزا و واضح برای آیتم‌ها */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)]">
            <span className="text-[11px] font-medium text-[var(--av-text-secondary)] shrink-0 px-1.5 flex items-center gap-1">
              <span>پوسته:</span>
              <ChevronLeft className="h-3 w-3 text-[var(--av-text-muted)] sm:hidden" />
            </span>

            {/* محفظهٔ اختصاصی اسکرول‌دار همراه با سایه‌های راهنما */}
            <div className="relative flex-1 overflow-hidden">
              <div
                className="flex items-center gap-1 overflow-x-auto py-1 px-1 scroll-smooth overscroll-x-contain"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "var(--av-brand) transparent",
                }}
              >
                {THEME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPostcardTheme(t.id)}
                    className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap shrink-0 transition-all cursor-pointer touch-manipulation ${
                      postcardTheme === t.id
                        ? "bg-[var(--av-brand)] text-white font-bold shadow-xs"
                        : "text-[var(--av-text-secondary)] hover:bg-[var(--av-surface)]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* سکوی نمایش کارت */}
          {loadingCards ? (
            <div className="p-6 text-center text-xs text-[var(--av-text-muted)] rounded-xl border border-[var(--av-surface-border)] bg-[var(--av-surface)]">
              در حال آماده‌سازی…
            </div>
          ) : cards.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--av-text-muted)] rounded-xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] space-y-1">
              <ImagePlus className="mx-auto h-5 w-5 opacity-40 text-[var(--av-brand)]" />
              <p className="font-bold text-[var(--av-text)]">
                تصویری یافت نشد.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-1 sm:p-3 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface-subtle)]/30 flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {selectedCard && (
                    <motion.div
                      key={selectedCard.id}
                      initial={
                        reduceMotion ? false : { opacity: 0, scale: 0.98 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={
                        reduceMotion ? undefined : { opacity: 0, scale: 0.98 }
                      }
                      transition={{ duration: 0.2 }}
                      className="w-full flex justify-center"
                    >
                      <Postcard
                        card={selectedCard}
                        text={text}
                        palette={palette}
                        theme={postcardTheme}
                        cardRef={(node) => {
                          cardRefs.current[selectedCard.id] = node;
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* گالری انتخاب عکس: تا ۵۰ تصویر پشتیبانی می‌شود، پس اسکرول
                  باید واضح و همراه با نشانه‌ی بصری باشد تا صفحه بهم نریزد */}
              <div className="space-y-1">
                <div className="flex items-center justify-between px-0.5">
                  <span className="text-[10px] text-[var(--av-text-muted)]">
                    {cards.length} تصویر — برای دیدن بقیه اسکرول کنید
                  </span>
                </div>
                <div className="relative">
                  <div
                    className="flex gap-1.5 overflow-x-auto py-1 px-0.5 snap-x snap-mandatory scroll-smooth"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "var(--av-brand) transparent",
                    }}
                    dir="ltr"
                  >
                    {cards.map((card) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setSelected(card.id)}
                        className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 snap-start touch-manipulation ${
                          selected === card.id
                            ? "border-[var(--av-brand)] scale-105 shadow-xs"
                            : "border-[var(--av-surface-border)] opacity-60"
                        }`}
                      >
                        <img
                          src={card.src}
                          alt=""
                          className="h-full w-full p-0.5 object-contain"
                        />
                      </button>
                    ))}
                  </div>
                  {/* سایه‌های راهنما در دو طرف برای نشان دادن قابل‌اسکرول بودن ردیف */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[var(--av-surface)] to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[var(--av-surface)] to-transparent" />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
