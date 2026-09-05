"use client";

import { useMemo } from "react";

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

const THEME_PRESETS = {
  heritage: {
    bg: "#F4EFE6",
    ink: "#241D17",
    line: "rgba(36, 29, 23, 0.18)",
    accent: "#8C4A2F",
    stampBg: "#FBF6EC",
    texture: "paper",
    motif: "leaf",
  },
  modern: {
    bg: "#0A0F18",
    ink: "#F8FAFC",
    line: "rgba(255, 255, 255, 0.12)",
    accent: "#006DFF",
    stampBg: "rgba(255,255,255,0.06)",
    texture: "grid",
    motif: "dot",
  },
  fantasy: {
    bg: "#241535",
    ink: "#F4E9FF",
    line: "rgba(244, 233, 255, 0.18)",
    accent: "#C79CFF",
    stampBg: "rgba(199,156,255,0.12)",
    texture: "stars",
    motif: "star",
  },
  royal: {
    bg: "#123524",
    ink: "#F6E9C9",
    line: "rgba(246, 233, 201, 0.22)",
    accent: "#D4AF37",
    stampBg: "rgba(212,175,55,0.12)",
    texture: "damask",
    motif: "crown",
  },
  festive: {
    bg: "#FFF3E4",
    ink: "#5B2E1F",
    line: "rgba(91, 46, 31, 0.18)",
    accent: "#E0533D",
    stampBg: "#FFFFFF",
    texture: "confetti",
    motif: "spark",
  },
  night: {
    bg: "#0B1220",
    ink: "#E7ECFA",
    line: "rgba(231, 236, 250, 0.15)",
    accent: "#7FB4FF",
    stampBg: "rgba(127,180,255,0.1)",
    texture: "stars",
    motif: "star",
  },
  botanical: {
    bg: "#EEF1E6",
    ink: "#2E3B22",
    line: "rgba(46, 59, 34, 0.18)",
    accent: "#5B7A3A",
    stampBg: "#FFFFFF",
    texture: "paper",
    motif: "leaf",
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
      motif: "dot",
    };
  }
  return THEME_PRESETS[theme];
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
          radial-gradient(1.5px 1.5px at 82% 20%, ${accent}40, transparent),
          radial-gradient(1.5px 1.5px at 35% 75%, ${accent}60, transparent)`,
        opacity: 0.7,
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

  return (
    <div className="relative mx-auto w-full max-w-[580px]" dir="rtl">
      {/* ساختار اصیل کارت‌پستال: همواره دو ستونه، افقی و متناسب با ابعاد پاکت نامه */}
      <article
        ref={cardRef}
        className="relative mx-auto w-full aspect-[1.52/1] rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 shadow-2xl overflow-hidden flex select-none transition-all duration-300"
        style={{
          backgroundColor: styles.bg,
          color: styles.ink,
          border: `1px solid ${styles.line}`,
        }}
      >
        {/* بافت لطیف پس‌زمینه */}
        {texture && (
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={texture}
          />
        )}

        {/* کادر باریک حاشیه کارت */}
        <div
          className="absolute inset-1.5 sm:inset-2.5 rounded-xl sm:rounded-2xl border pointer-events-none z-10"
          style={{ borderColor: styles.line }}
        />

        {/* تقسیم‌بندی دو ستونه پستی در تمام رزولوشن‌ها */}
        <div className="relative z-10 grid grid-cols-12 gap-2 sm:gap-4 w-full h-full items-center p-0.5 sm:p-1">
          {/* ۱. ستون قاب عکس سمت چپ */}
          <div
            className="col-span-5 h-full relative rounded-lg sm:rounded-xl overflow-hidden p-0.5 sm:p-1 bg-white/40 shadow-xs border"
            style={{ borderColor: styles.line }}
          >
            <div className="w-full h-full relative rounded-md sm:rounded-lg overflow-hidden">
              <img
                src={card.src}
                alt="کارت‌پستال آویستا"
                crossOrigin="anonymous"
                className="w-full h-full object-cover object-center filter contrast-[1.02]"
              />
            </div>
          </div>

          {/* ۲. خط پرفراژ میانی تمبر */}
          <div
            className="absolute right-[42%] top-3 bottom-3 w-px border-r border-dashed pointer-events-none"
            style={{ borderColor: styles.line }}
          />

          {/* ۳. ستون نگارش، تمبر و مهر پستی سمت راست */}
          <div className="col-span-7 h-full flex flex-col justify-between pr-1 sm:pr-2 py-0.5">
            {/* سربرگ: تمبر پستی و مهر تاریخ‌دار */}
            <div className="flex items-start justify-between">
              {/* مهر پست مدور */}
              <div
                className="flex items-center gap-0.5 sm:gap-1 opacity-70"
                style={{ color: styles.accent }}
              >
                <div
                  className="w-6 h-6 sm:w-9 sm:h-9 rounded-full border border-dashed flex flex-col items-center justify-center -rotate-12 text-[5px] sm:text-[7px] leading-none shrink-0"
                  style={{ borderColor: styles.accent }}
                >
                  <span className="font-bold">AVISTA</span>
                  <span className="text-[4px] sm:text-[5px] my-0.5">POST</span>
                  <span>YASNA</span>
                </div>
                <svg
                  className="w-4 h-3 sm:w-6 sm:h-4 stroke-current fill-none stroke-[1.2]"
                  viewBox="0 0 40 24"
                >
                  <path d="M0 6 Q 10 0, 20 6 T 40 6" />
                  <path d="M0 12 Q 10 6, 20 12 T 40 12" />
                  <path d="M0 18 Q 10 12, 20 18 T 40 18" />
                </svg>
              </div>

              {/* تمبر با لوگوی آویستا */}
              <div
                className="relative w-7 h-9 sm:w-10 sm:h-13 rounded sm:rounded-lg p-0.5 sm:p-1 flex flex-col items-center justify-between shadow-xs border shrink-0"
                style={{
                  backgroundColor: styles.stampBg,
                  borderColor: `${styles.accent}55`,
                }}
              >
                <div className="flex items-center justify-between w-full px-0.5 text-[5px] sm:text-[7px] leading-none">
                  <span className="font-bold" style={{ color: styles.accent }}>
                    50D
                  </span>
                  <span className="opacity-40">IR</span>
                </div>

                <div className="relative rounded-full h-3.5 w-3.5 sm:h-5 sm:w-5 my-auto overflow-hidden">
                  <img
                    src="/logo.png"
                    alt="تمبر آویستا"
                    crossOrigin="anonymous"
                    className="h-full w-full object-contain filter drop-shadow-xs rounded-full"
                  />
                </div>

                <span className="text-[4px] sm:text-[5.5px] tracking-tight opacity-50 uppercase leading-none">
                  Avista
                </span>
              </div>
            </div>

            {/* خطوط سطرنویسی خوش‌نویسی اوستایی */}
            <div className="space-y-1 sm:space-y-2 my-auto" dir="rtl">
              {lines.map((line, index) => (
                <div
                  key={index}
                  className="pb-0.5 min-h-[14px] sm:min-h-[19px] flex items-center justify-start border-b border-dashed"
                  style={{ borderColor: styles.line }}
                >
                  <span className="avestan-glyph text-xs sm:text-[16px] leading-none text-right w-full tracking-wide truncate">
                    {line}
                  </span>
                </div>
              ))}
            </div>

            {/* پانویس پستی */}
            <div
              className="pt-1 border-t flex items-center justify-between text-[6px] sm:text-[8px] opacity-60"
              style={{ borderColor: styles.line }}
            >
              <span>دین‌دبیره · DIN DABIREH</span>
              <span style={{ color: styles.accent }}>AVISTA.IR</span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
