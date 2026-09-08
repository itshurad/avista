"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// نسبت ابعاد کارت‌پستال؛ همیشه از این عدد برای محاسبه‌ی صریح ارتفاع
// به پیکسل استفاده می‌شود (به‌جای تکیه بر CSS aspect-ratio که در
// رندر داخل foreignObject سافاری/iOS به‌درستی محاسبه نمی‌شود و باعث
// به‌هم‌ریختن قالب کارت هم در نمایش زنده و هم در خروجی دانلود می‌شود).
const CARD_RATIO = 1.52; // width / height

function splitAvestanLines(text, count = 5) {
  const value = text.replace(/\r\n/g, "\n");
  if (!value.trim()) {
    return ["𐬀𐬴𐬀⸱𐬎𐬴𐬙𐬀", "𐬵𐬎𐬨𐬀𐬙𐬀⸱𐬵𐬏𐬑𐬙𐬀⸱𐬵𐬎𐬎𐬀𐬭𐬱𐬙𐬀", "", "", ""];
  }

  const maxChars = 16;
  const paragraphs = value.split("\n");
  const lines = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);

    if (!words.length) {
      lines.push("");
      continue;
    }

    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (Array.from(candidate).length > maxChars && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
  }

  if (lines.length > count) {
    const compact = lines.slice(0, count - 1);
    compact.push(lines.slice(count - 1).join(" "));
    return compact;
  }
  return [...lines, ...Array.from({ length: count - lines.length }, () => "")];
}

/* --------------------------------------------------------------------- */
/*                        پوسته‌ها (پالت رنگ + بافت)                       */
/* --------------------------------------------------------------------- */
const THEME_PRESETS = {
  heritage: {
    bg: "#F4EFE6",
    ink: "#241D17",
    line: "rgba(36, 29, 23, 0.18)",
    accent: "#8C4A2F",
    stampBg: "#FBF6EC",
    texture: "paper",
  },
  modern: {
    bg: "#0A0F18",
    ink: "#F8FAFC",
    line: "rgba(255, 255, 255, 0.12)",
    accent: "#006DFF",
    stampBg: "rgba(255,255,255,0.06)",
    texture: "grid",
  },
  fantasy: {
    bg: "#241535",
    ink: "#F4E9FF",
    line: "rgba(244, 233, 255, 0.18)",
    accent: "#C79CFF",
    stampBg: "rgba(199,156,255,0.12)",
    texture: "stars",
  },
  royal: {
    bg: "#123524",
    ink: "#F6E9C9",
    line: "rgba(246, 233, 201, 0.22)",
    accent: "#D4AF37",
    stampBg: "rgba(212,175,55,0.12)",
    texture: "damask",
  },
  festive: {
    bg: "#FFF3E4",
    ink: "#5B2E1F",
    line: "rgba(91, 46, 31, 0.18)",
    accent: "#E0533D",
    stampBg: "#FFFFFF",
    texture: "confetti",
  },
  night: {
    bg: "#0B1220",
    ink: "#E7ECFA",
    line: "rgba(231, 236, 250, 0.15)",
    accent: "#7FB4FF",
    stampBg: "rgba(127,180,255,0.1)",
    texture: "stars",
  },
  botanical: {
    bg: "#EEF1E6",
    ink: "#2E3B22",
    line: "rgba(46, 59, 34, 0.18)",
    accent: "#5B7A3A",
    stampBg: "#FFFFFF",
    texture: "paper",
  },
  sunset: {
    bg: "#FFE8D6",
    ink: "#5C2A0A",
    line: "rgba(92, 42, 10, 0.18)",
    accent: "#FF7A45",
    stampBg: "#FFFFFF",
    texture: "rays",
  },
  ocean: {
    bg: "#E6F4F6",
    ink: "#0B3B44",
    line: "rgba(11, 59, 68, 0.16)",
    accent: "#1197B0",
    stampBg: "#FFFFFF",
    texture: "waves",
  },
  desert: {
    bg: "#F1E4C9",
    ink: "#5A3B1E",
    line: "rgba(90, 59, 30, 0.18)",
    accent: "#C98A3B",
    stampBg: "#FFF8EA",
    texture: "dune",
  },
  winter: {
    bg: "#EAF3FB",
    ink: "#1E3A52",
    line: "rgba(30, 58, 82, 0.15)",
    accent: "#4C8FD1",
    stampBg: "#FFFFFF",
    texture: "frost",
  },
  cyber: {
    bg: "#0C0F1A",
    ink: "#E5FBFF",
    line: "rgba(229, 251, 255, 0.14)",
    accent: "#00F5D4",
    stampBg: "rgba(0,245,212,0.08)",
    texture: "circuit",
  },
  // ---- پوسته‌های جدید ----
  autumn: {
    bg: "#FBEADC",
    ink: "#4A2311",
    line: "rgba(74, 35, 17, 0.18)",
    accent: "#C2571B",
    stampBg: "#FFF7EE",
    texture: "dune",
  },
  mint: {
    bg: "#E7F6EF",
    ink: "#0F3D30",
    line: "rgba(15, 61, 48, 0.16)",
    accent: "#1FA37B",
    stampBg: "#FFFFFF",
    texture: "waves",
  },
  rose: {
    bg: "#FCE9EF",
    ink: "#5C1B33",
    line: "rgba(92, 27, 51, 0.16)",
    accent: "#D6437B",
    stampBg: "#FFFFFF",
    texture: "confetti",
  },
  midnight: {
    bg: "#0A0E27",
    ink: "#DCE3FF",
    line: "rgba(220, 227, 255, 0.14)",
    accent: "#5B6EF5",
    stampBg: "rgba(91,110,245,0.1)",
    texture: "stars",
  },
  gold: {
    bg: "#141210",
    ink: "#F3E3B8",
    line: "rgba(243, 227, 184, 0.18)",
    accent: "#E8C468",
    stampBg: "rgba(232,196,104,0.12)",
    texture: "damask",
  },
  lavender: {
    bg: "#F1ECFB",
    ink: "#3A2A5C",
    line: "rgba(58, 42, 92, 0.16)",
    accent: "#8B6FD9",
    stampBg: "#FFFFFF",
    texture: "grid",
  },
};

function resolveStyles(theme, palette) {
  if (theme === "classic" || !THEME_PRESETS[theme]) {
    return {
      bg: palette?.bg || "#EFECE6",
      ink: palette?.ink || "#181E29",
      line: palette?.line || "rgba(24, 30, 41, 0.16)",
      accent: palette?.accent || "#006DFF",
      stampBg: "#FFFFFF",
      texture: "none",
    };
  }
  return THEME_PRESETS[theme];
}

// این تابع را از بیرون (صفحه‌ی دانلود) هم صدا می‌زنیم تا رنگ پس‌زمینه‌ی
// خروجی PNG دقیقاً همان رنگ پوسته‌ی انتخاب‌شده باشد، نه رنگ پالت
// استخراج‌شده از عکس (که قبلاً باعث می‌شد تم‌هایی مثل «سلطنتی» موقع
// دانلود رنگ‌شان عوض شود).
export function getPostcardExportBackground(theme, palette) {
  return resolveStyles(theme, palette).bg;
}

function getTextureStyle(texture, accent, line) {
  switch (texture) {
    case "paper":
      return {
        backgroundImage: `repeating-linear-gradient(135deg, ${line} 0px, ${line} 1px, transparent 1px, transparent 7px)`,
        opacity: 0.5,
      };
    case "grid":
      return {
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: "14px 14px",
        opacity: 0.6,
      };
    case "damask":
      return {
        backgroundImage: `repeating-linear-gradient(45deg, ${line} 0 1px, transparent 1px 11px), repeating-linear-gradient(-45deg, ${line} 0 1px, transparent 1px 11px)`,
        opacity: 0.55,
      };
    case "stars":
      return {
        backgroundImage: `radial-gradient(1px 1px at 12% 22%, ${accent}66, transparent),
          radial-gradient(1.5px 1.5px at 78% 58%, ${accent}55, transparent),
          radial-gradient(1px 1px at 42% 82%, ${accent}77, transparent)`,
        opacity: 0.8,
      };
    case "confetti":
      return {
        backgroundImage: `radial-gradient(1.5px 1.5px at 15% 25%, ${accent}55, transparent),
          radial-gradient(1.5px 1.5px at 82% 20%, ${accent}40, transparent)`,
        opacity: 0.7,
      };
    case "rays":
      return {
        backgroundImage: `repeating-conic-gradient(from 0deg at 100% 0%, ${line} 0deg 2deg, transparent 2deg 14deg)`,
        opacity: 0.5,
      };
    case "waves":
      return {
        backgroundImage: `radial-gradient(circle at 50% 100%, transparent 65%, ${line} 66%, ${line} 68%, transparent 69%)`,
        backgroundSize: "22px 14px",
        opacity: 0.6,
      };
    case "dune":
      return {
        backgroundImage: `repeating-linear-gradient(198deg, ${line} 0px, ${line} 1px, transparent 1px, transparent 14px)`,
        opacity: 0.45,
      };
    case "frost":
      return {
        backgroundImage: `radial-gradient(1.4px 1.4px at 18% 20%, ${accent}70, transparent),
          radial-gradient(1px 1px at 55% 35%, ${accent}55, transparent),
          radial-gradient(1.6px 1.6px at 82% 70%, ${accent}60, transparent),
          radial-gradient(1px 1px at 30% 80%, ${accent}45, transparent)`,
        opacity: 0.7,
      };
    case "circuit":
      return {
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px), radial-gradient(${accent}55 1px, transparent 1px)`,
        backgroundSize: "16px 16px, 16px 16px, 16px 16px",
        opacity: 0.5,
      };
    case "none":
    default:
      return null;
  }
}

export default function Postcard({
  card,
  text,
  palette,
  cardRef,
  theme = "classic",
}) {
  const lines = splitAvestanLines(text);
  const styles = useMemo(() => resolveStyles(theme, palette), [theme, palette]);
  const texture = useMemo(
    () => getTextureStyle(styles.texture, styles.accent, styles.line),
    [styles],
  );

  // به‌جای CSS aspect-ratio (که در Safari/iOS داخل foreignObject درست
  // محاسبه نمی‌شود و باعث بهم‌ریختن کل قالب می‌شود)، ارتفاع کارت را
  // همیشه به‌صورت یک عدد صریح پیکسلی نگه می‌داریم. هم نمایش زنده و هم
  // خروجی دانلود از همین ارتفاع استفاده می‌کنند، پس رفتار هر دو یکسان
  // و قابل پیش‌بینی می‌شود.
  const wrapperRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      if (width) setCardHeight(Math.round(width / CARD_RATIO));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("orientationchange", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto w-full max-w-[580px]"
      dir="rtl"
    >
      {/* ابعاد ایزوله برای ثبات کامل در موبایل و دسکتاپ سافاری */}
      <article
        ref={cardRef}
        className="relative mx-auto w-full rounded-2xl sm:rounded-3xl p-2.5 xs:p-3.5 sm:p-5 shadow-2xl overflow-hidden select-none transition-all duration-300"
        style={{
          backgroundColor: styles.bg,
          color: styles.ink,
          border: `1px solid ${styles.line}`,
          // تا وقتی ارتفاع دقیق اندازه‌گیری نشده از aspect-ratio به‌عنوان
          // فقط یک fallback موقت برای اولین رندر استفاده می‌کنیم؛ به محض
          // اندازه‌گیری، عدد پیکسلی صریح جایگزینش می‌شود.
          height: cardHeight ? `${cardHeight}px` : undefined,
          aspectRatio: cardHeight ? undefined : `${CARD_RATIO} / 1`,
          display: "flex",
        }}
      >
        {/* بافت پس‌زمینه */}
        {texture && (
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={texture}
          />
        )}

        {/* کادر داخلی */}
        <div
          className="absolute inset-1.5 xs:inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border pointer-events-none z-10"
          style={{ borderColor: styles.line }}
        />

        {/* ساختار محتوایی پایدار دو ستونه */}
        <div className="relative z-10 flex w-full h-full items-center justify-between gap-2 xs:gap-3 sm:gap-4 p-0.5 xs:p-1">
          {/* ۱. قاب عکس */}
          <div
            className="w-[34%] xs:w-[36%] sm:w-[38%] h-full relative rounded-lg xs:rounded-xl overflow-hidden p-0.5 xs:p-1 bg-white/40 shadow-xs border shrink-0"
            style={{ borderColor: styles.line }}
          >
            <div className="w-full h-full relative rounded-md xs:rounded-lg overflow-hidden">
              <img
                src={card.src}
                alt="کارت‌پستال آویستا"
                crossOrigin="anonymous"
                decoding="sync"
                className="w-full h-full object-cover object-center"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </div>

          {/* ۲. خط جداکننده */}
          <div
            className="h-[85%] w-px border-r border-dashed shrink-0"
            style={{ borderColor: styles.line }}
          />

          {/* ۳. متن و تمبر */}
          <div className="flex-1 min-w-0 h-full flex flex-col justify-between py-0.5 xs:py-1 px-0.5 xs:px-1">
            {/* سربرگ: مهر و تمبر */}
            <div className="flex items-start justify-between">
              <div
                className="flex items-center gap-1 opacity-70 min-w-0"
                style={{ color: styles.accent }}
              >
                <div
                  className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 rounded-full border border-dashed flex flex-col items-center justify-center -rotate-12 text-[4.5px] xs:text-[5px] sm:text-[7px] leading-none shrink-0"
                  style={{ borderColor: styles.accent }}
                >
                  <span className="font-bold">AVISTA</span>
                  <span className="text-[3.5px] xs:text-[4px] my-0.5">
                    POST
                  </span>
                  <span>YASNA</span>
                </div>
                <svg
                  className="hidden xs:block w-5 h-4 sm:w-6 sm:h-4 stroke-current fill-none stroke-[1.2] shrink-0"
                  viewBox="0 0 40 24"
                >
                  <path d="M0 6 Q 10 0, 20 6 T 40 6" />
                  <path d="M0 12 Q 10 6, 20 12 T 40 12" />
                  <path d="M0 18 Q 10 12, 20 18 T 40 18" />
                </svg>
              </div>

              {/* تمبر */}
              <div
                className="relative w-7 h-9 xs:w-8 xs:h-10 sm:w-10 sm:h-[52px] rounded-lg p-1 flex flex-col items-center justify-between shadow-xs border shrink-0"
                style={{
                  backgroundColor: styles.stampBg,
                  borderColor: `${styles.accent}55`,
                }}
              >
                <div className="flex items-center justify-between w-full px-0.5 text-[5.5px] xs:text-[6px] sm:text-[7px] leading-none">
                  <span className="font-bold" style={{ color: styles.accent }}>
                    50D
                  </span>
                  <span className="opacity-40">IR</span>
                </div>

                <div className="relative rounded-full h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 my-auto overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="تمبر آویستا"
                    crossOrigin="anonymous"
                    decoding="sync"
                    className="h-full w-full object-contain filter drop-shadow-xs rounded-full"
                  />
                </div>

                <span className="text-[4px] xs:text-[4.5px] sm:text-[5.5px] tracking-tight opacity-50 uppercase leading-none">
                  Avista
                </span>
              </div>
            </div>

            {/* خطوط متن اوستایی */}
            <div
              className="space-y-1 xs:space-y-1.5 sm:space-y-2.5 my-auto min-w-0"
              dir="rtl"
            >
              {lines.map((line, index) => (
                <div
                  key={index}
                  className="pb-0.5 min-h-[17px] xs:min-h-[21px] sm:min-h-[27px] flex items-center justify-start border-b border-dashed overflow-visible"
                  style={{ borderColor: styles.line }}
                >
                  {/* درخواست بولد شدن فونت اوستایی: هم کلاس font-bold و هم
                      fontWeight صریح، تا در خروجی html-to-image هم اعمال شود.
                      leading-none قبلاً باکس خط را آنقدر کوتاه می‌کرد که
                      دنباله‌ی زیرین بعضی گلیف‌های اوستایی (مثل حروفی که
                      انحنای پایین‌رو دارند) بریده می‌شد؛ حالا line-height
                      باز است و overflow هم دیگر hidden نیست تا کل انحنای
                      حرف نمایش داده شود. whitespace-nowrap جای truncate
                      نشسته چون طول خط از قبل توسط splitAvestanLines
                      محدود شده و نیازی به قطع با overflow-hidden نیست. */}
                  <span
                    className="avestan-glyph font-bold text-xs xs:text-sm sm:text-[17px] text-right w-full tracking-wide whitespace-nowrap block"
                    style={{
                      fontWeight: 700,
                      lineHeight: 1.6,
                      overflow: "visible",
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>

            {/* پانویس */}
            <div
              className="pt-0.5 xs:pt-1 border-t flex items-center justify-between text-[6px] xs:text-[7px] sm:text-[8px] opacity-60 min-w-0"
              style={{ borderColor: styles.line }}
            >
              <span className="truncate">دین‌دبیره · DIN DABIREH</span>
              <span style={{ color: styles.accent }} className="shrink-0 pr-1">
                AVISTA
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
