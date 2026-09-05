"use client";

import { useMemo } from "react";

function splitAvestanLines(text, count = 5) {
  const value = text.replace(/\r\n/g, "\n");
  if (!value.trim()) {
    return ["𐬀𐬴𐬀⸱𐬎𐬴𐬙𐬀", "𐬵𐬎𐬨𐬀𐬙𐬀⸱𐬵𐬏𐬑𐬙𐬀⸱𐬵𐬎𐬎𐬀𐬭𐬱𐬙𐬀", "", "", ""];
  }

  const maxChars = 20;
  const paragraphs = value.split("\n");
  const lines = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);

    if (!words.length) {
      lines.push(""); // اینتر خالی هم یک خط جدا حساب می‌شود
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
        backgroundSize: "18px 18px",
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
          radial-gradient(1px 1px at 42% 82%, ${accent}77, transparent),
          radial-gradient(1.5px 1.5px at 63% 14%, ${accent}44, transparent),
          radial-gradient(1px 1px at 90% 30%, ${accent}55, transparent)`,
        opacity: 0.8,
      };
    case "confetti":
      return {
        backgroundImage: `radial-gradient(2px 2px at 15% 25%, ${accent}55, transparent),
          radial-gradient(2px 2px at 82% 20%, ${accent}40, transparent),
          radial-gradient(1.5px 1.5px at 35% 75%, ${accent}60, transparent),
          radial-gradient(2px 2px at 68% 68%, ${accent}45, transparent),
          radial-gradient(1.5px 1.5px at 92% 82%, ${accent}50, transparent)`,
        opacity: 0.7,
      };
    case "none":
    default:
      return null;
  }
}

function CornerMotif({ type, color }) {
  const common = { width: 15, height: 15, fill: color, opacity: 0.55 };
  switch (type) {
    case "star":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 1l2.6 7.2L22 11l-7.4 2.8L12 21l-2.6-7.2L2 11l7.4-2.8z" />
        </svg>
      );
    case "leaf":
      return (
        <svg
          viewBox="0 0 24 24"
          {...common}
          fill="none"
          stroke={color}
          strokeWidth="1.6"
        >
          <path d="M4 20c8-1 14-7 15-16-9 1-15 7-15 16z" />
          <path d="M6 18c3-3 6-6 12-13" />
        </svg>
      );
    case "crown":
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" />
        </svg>
      );
    case "spark":
      return (
        <svg
          viewBox="0 0 24 24"
          {...common}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M18 6l-3 3M6 18l3-3M18 18l-3-3" />
        </svg>
      );
    case "dot":
    default:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
  }
}

export default function Postcard({
  card,
  text,
  palette,
  cardRef,
  theme = "classic", // classic | heritage | modern | fantasy | royal | festive | night | botanical
}) {
  const lines = splitAvestanLines(text);

  const styles = useMemo(() => resolveStyles(theme, palette), [theme, palette]);
  const texture = useMemo(
    () => getTextureStyle(styles.texture, styles.accent, styles.line),
    [styles],
  );

  return (
    <div className="relative mx-auto w-full max-w-[580px] p-2" dir="rtl">
      <article
        ref={cardRef}
        className="relative mx-auto w-full aspect-[1.52/1] rounded-[20px] p-5 shadow-2xl overflow-hidden flex transition-all duration-300 select-none"
        style={{
          backgroundColor: styles.bg,
          color: styles.ink,
          border: `1px solid ${styles.line}`,
        }}
      >
        {/* بافت ظریف پس‌زمینه مخصوص هر پوسته */}
        {texture && (
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={texture}
          />
        )}

        {/* قاب پرفراژ کلاسیک تمبر — یک مسیر واحد، بدون افت کیفیت در گوشه‌ها */}

        {/* کادر باریک دوخطی دور فضای چاپ */}
        <div
          className="absolute inset-2.5 rounded-[14px] border pointer-events-none z-10"
          style={{ borderColor: styles.line }}
        />

        {/* نمادهای کوچک تزیینی گوشه‌های پایین، متناسب با پوسته */}
        <div className="absolute bottom-4 left-4 z-10">
          <CornerMotif type={styles.motif} color={styles.accent} />
        </div>
        <div className="absolute bottom-4 right-4 z-10 rotate-180">
          <CornerMotif type={styles.motif} color={styles.accent} />
        </div>

        <div className="relative z-10 grid grid-cols-12 gap-4 w-full h-full items-center p-1">
          {/* ستون عکس */}
          <div
            className="col-span-5 h-full relative rounded-xl overflow-hidden p-1 bg-white/40 shadow-sm border"
            style={{ borderColor: styles.line }}
          >
            <div className="w-full h-full relative rounded-lg overflow-hidden">
              <img
                src={card.src}
                alt="کارت‌پستال آویستا"
                crossOrigin="anonymous"
                className="w-full h-full object-cover object-center filter contrast-[1.02]"
              />
            </div>
          </div>

          {/* خط جداکنندهٔ عمودی وسط کارت */}
          <div
            className="hidden sm:block absolute right-[43%] top-5 bottom-5 w-px border-r border-dashed"
            style={{ borderColor: styles.line }}
          />

          {/* ستون راست: متن اوستایی، تمبر و مهر پستی */}
          <div className="col-span-7 h-full flex flex-col justify-between pr-1">
            <div className="flex items-start justify-between">
              {/* مهر ابطال پستی */}
              <div
                className="flex items-center gap-1 opacity-70"
                style={{ color: styles.accent }}
              >
                <div
                  className="w-10 h-10 rounded-full border-2 border-dashed flex flex-col items-center justify-center -rotate-12 text-[7px] leading-none"
                  style={{ borderColor: styles.accent }}
                >
                  <span className="font-bold">AVISTA</span>
                  <span className="text-[6px] my-0.5">POST</span>
                  <span>YASNA</span>
                </div>
                <svg
                  className="w-8 h-6 stroke-current fill-none stroke-[1.5]"
                  viewBox="0 0 40 24"
                >
                  <path d="M0 6 Q 10 0, 20 6 T 40 6" />
                  <path d="M0 12 Q 10 6, 20 12 T 40 12" />
                  <path d="M0 18 Q 10 12, 20 18 T 40 18" />
                </svg>
              </div>

              {/* تمبر اختصاصی */}
              <div
                className="relative w-11 h-14 rounded p-1 flex flex-col items-center justify-between shadow-xs border"
                style={{
                  backgroundColor: styles.stampBg,
                  borderColor: `${styles.accent}55`,
                }}
              >
                <div className="flex items-center justify-between w-full px-0.5">
                  <span
                    className="text-[7px] font-bold"
                    style={{ color: styles.accent }}
                  >
                    50D
                  </span>
                  <span className="text-[6px] opacity-40">IR</span>
                </div>
                <div className="relative rounded-full h-6 w-6 my-auto">
                  <img
                    src="/logo.png"
                    alt="تمبر آویستا"
                    crossOrigin="anonymous"
                    className="h-full w-full object-contain filter drop-shadow-xs rounded-full"
                  />
                </div>
                <span className="text-[6px] tracking-tight opacity-50 uppercase">
                  Avista
                </span>
              </div>
            </div>

            {/* خطوط نگارش دین‌دبیره */}
            <div className="my-auto space-y-2 sm:space-y-2.5" dir="rtl">
              {lines.map((line, index) => (
                <div
                  key={index}
                  className="pb-0.5 min-h-[18px] sm:min-h-[20px] flex items-center justify-start border-b border-dashed"
                  style={{ borderColor: styles.line }}
                >
                  <span className="avestan-glyph text-base sm:text-[17px] leading-none text-right w-full tracking-wide">
                    {line}
                  </span>
                </div>
              ))}
            </div>

            {/* پانویس */}
            <div
              className="pt-1.5 border-t flex items-center justify-between text-[8px] opacity-55"
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
