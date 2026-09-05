"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Clipboard,
  Delete,
  RotateCcw,
  Sparkles,
  Undo2,
  SlidersHorizontal,
  CornerDownLeft,
} from "lucide-react";
import {
  charactersData,
  avestanMarks,
  avestanLigatures,
} from "@/data/characters";

const TOP_NUMBERS = [
  { val: "۱", raw: "1" },
  { val: "۲", raw: "2" },
  { val: "۳", raw: "3" },
  { val: "۴", raw: "4" },
  { val: "۵", raw: "5" },
  { val: "۶", raw: "6" },
  { val: "۷", raw: "7" },
  { val: "۸", raw: "8" },
  { val: "۹", raw: "9" },
  { val: "۰", raw: "0" },
];

const PRIMARY_ROWS = [
  ["av_a", "av_aa", "av_e", "av_i", "av_o", "av_u", "av_schwa", "av_ao"],
  ["av_k", "av_x", "av_g", "av_c", "av_j", "av_t", "av_d", "av_p", "av_b"],
  ["av_f", "av_n", "av_m", "av_y", "av_v", "av_r", "av_s", "av_h"],
];

const ALT_KEYS = {
  av_a: ["𐬀", "𐬁", "𐬂", "𐬃", "𐬄"],
  av_aa: ["𐬁", "𐬀"],
  av_e: ["𐬈", "𐬉"],
  av_i: ["𐬌", "𐬍"],
  av_o: ["𐬊", "𐬋"],
  av_u: ["𐬆", "𐬇"],
  av_schwa: ["𐬆", "𐬇"],
  av_s: ["𐬯", "𐬰", "𐬱", "𐬲", "𐬳", "𐬴"],
  av_n: ["𐬥", "𐬦", "𐬧", "𐬢", "𐬣", "𐬤"],
  av_t: ["𐬙", "𐬚", "𐬝"],
  av_k: ["𐬐", "𐬑", "𐬒", "𐬓"],
  av_g: ["𐬔", "𐬕", "𐬖"],
  av_d: ["𐬛", "𐬜"],
  av_p: ["𐬞", "𐬟"],
  av_b: ["𐬠", "𐬡"],
};

function haptic(ms = 8) {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(ms);
  }
}

function Key({
  children,
  className = "",
  onClick,
  ariaLabel,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onPointerLeave,
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92, y: 1 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
      className={`touch-manipulation select-none outline-none focus:outline-none flex items-center justify-center rounded-xl font-medium cursor-pointer transition-all ${className}`}
      onClick={(e) => {
        // حذف فوکوس بلافاصله بعد از کلیک برای جلوگیری از رنگی ماندن دکمه
        e.currentTarget.blur();
        onClick?.(e);
      }}
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onPointerUp={(e) => {
        e.currentTarget.blur();
        onPointerUp?.(e);
      }}
      onPointerCancel={(e) => {
        e.currentTarget.blur();
        onPointerCancel?.(e);
      }}
      onPointerLeave={(e) => {
        e.currentTarget.blur();
        onPointerLeave?.(e);
      }}
    >
      {children}
    </motion.button>
  );
}

function CharacterKey({ character, onInsert, onLongPress }) {
  const timerRef = useRef(null);
  const isLongPressedRef = useRef(false);
  const alternatives = ALT_KEYS[character.id];

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handlePointerDown = () => {
    clearTimer();
    isLongPressedRef.current = false;
    if (!alternatives?.length) return;

    timerRef.current = setTimeout(() => {
      isLongPressedRef.current = true;
      haptic(16);
      onLongPress(character.id, alternatives);
    }, 380);
  };

  const handlePointerUp = () => {
    clearTimer();
  };

  const handlePointerCancel = () => {
    clearTimer();
    isLongPressedRef.current = false;
  };

  const handleClick = (e) => {
    if (isLongPressedRef.current) {
      isLongPressedRef.current = false;
      return;
    }
    clearTimer();
    onInsert(character.glyph);
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return (
    <Key
      ariaLabel={`درج ${character.name}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
      onClick={handleClick}
      className="av-glass-key h-10 sm:h-11 min-w-0 flex-1 relative"
    >
      <span className="avestan-glyph text-lg sm:text-2xl leading-none text-[var(--av-text)] pointer-events-none">
        {character.glyph}
      </span>
      {alternatives?.length ? (
        <span className="absolute top-1 left-1 sm:left-1.5 text-[6px] sm:text-[7px] text-[var(--av-brand)] opacity-60 pointer-events-none">
          •
        </span>
      ) : null}
    </Key>
  );
}

export default function AvestanKeyboard({ onTextChange }) {
  const textareaRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [mode, setMode] = useState("primary");
  const [recent, setRecent] = useState([]);
  const [popup, setPopup] = useState(null);
  const [copied, setCopied] = useState(false);

  const chars = useMemo(
    () => new Map(charactersData.map((item) => [item.id, item])),
    [],
  );

  const allLetters = useMemo(
    () =>
      charactersData.filter((item) =>
        ["vowel", "consonant", "supplementary"].includes(item.classification),
      ),
    [],
  );

  const allPunctuation = useMemo(
    () =>
      charactersData.filter((item) => item.classification === "punctuation"),
    [],
  );

  const otherLetters = useMemo(
    () => allLetters.filter((item) => !PRIMARY_ROWS.flat().includes(item.id)),
    [allLetters],
  );

  const emit = (next) => {
    setText(next);
    onTextChange?.(next);
  };

  // فوکوس نرم بدون اسکرول و پرش صفحه
  const focusAt = (position) => {
    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.focus({ preventScroll: true });
      el.setSelectionRange(position, position);
    });
  };

  const insertAtCursor = (value) => {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? text.length;
    const end = el?.selectionEnd ?? text.length;
    const next = `${text.slice(0, start)}${value}${text.slice(end)}`;
    emit(next);
    setRecent((items) =>
      [value, ...items.filter((item) => item !== value)].slice(0, 6),
    );
    haptic();
    focusAt(start + value.length);
  };

  const removePrevious = () => {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? text.length;
    const end = el?.selectionEnd ?? text.length;

    if (start !== end) {
      emit(text.slice(0, start) + text.slice(end));
      focusAt(start);
      haptic();
      return;
    }

    if (!start) return;
    const before = Array.from(text.slice(0, start));
    const removed = before.pop();
    const next = `${before.join("")}${text.slice(end)}`;
    emit(next);
    focusAt(start - (removed ? removed.length : 1));
    haptic(10);
  };

  const clear = () => {
    emit("");
    focusAt(0);
    haptic(12);
  };

  const copy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
      haptic(14);
    } catch {}
  };

  useEffect(() => {
    const close = () => setPopup(null);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const handleLongPress = (keyId, items) => {
    setPopup({ keyId, items });
  };

  const renderCharacter = (id) => {
    const character = chars.get(id);
    if (!character) return null;
    return (
      <CharacterKey
        key={id}
        character={character}
        onInsert={insertAtCursor}
        onLongPress={handleLongPress}
      />
    );
  };

  return (
    <section
      className="relative w-full max-w-xl mx-auto px-0"
      dir="rtl"
      aria-label="صفحه‌کلید اوستایی"
    >
      <div className="av-glass-panel relative overflow-hidden rounded-2xl sm:rounded-[24px] p-2.5 sm:p-4 shadow-xl">
        {/* جعبه نوشتار */}
        <div className="relative mb-2.5 rounded-xl sm:rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)]/75 backdrop-blur-md p-2.5 sm:p-3.5 focus-within:border-[var(--av-brand)] transition-colors">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(event) => emit(event.target.value)}
            dir="rtl"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder="متن اوستایی خود را بنویسید…"
            className="w-full min-h-[65px] sm:min-h-[85px] max-h-[120px] text-right text-lg sm:text-2xl avestan-glyph leading-relaxed text-[var(--av-text)] placeholder:font-sans placeholder:text-xs placeholder:text-[var(--av-text-muted)] bg-transparent outline-none resize-none"
          />

          <div className="flex items-center justify-between pt-1.5 border-t border-[var(--av-surface-border)]/60 text-[11px] text-[var(--av-text-muted)]">
            <div className="flex items-center gap-1 font-mono">
              <span className="font-bold text-[var(--av-brand)]">
                {text.length}
              </span>
              <span>نویسه</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clear}
                disabled={!text}
                className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 transition-colors disabled:opacity-20 cursor-pointer"
                aria-label="پاک کردن متن"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden xs:inline">پاکسازی</span>
              </button>

              <button
                type="button"
                onClick={copy}
                disabled={!text}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--av-brand-soft)] text-[var(--av-brand)] font-semibold transition-all disabled:opacity-20 cursor-pointer"
                aria-label="کپی متن"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Clipboard className="h-3.5 w-3.5" />
                )}
                <span>{copied ? "کپی شد" : "کپی"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* تاریخچه گلیف‌های اخیر */}
        {recent.length > 0 && (
          <div className="flex items-center gap-1 mb-2 px-0.5 overflow-x-auto [scrollbar-width:none]">
            <span className="text-[10px] text-[var(--av-text-muted)] shrink-0 flex items-center gap-1 pl-1">
              <Sparkles className="h-3 w-3 text-[var(--av-brand)]" />
              اخیر:
            </span>
            {recent.map((glyph, index) => (
              <motion.button
                key={`${glyph}-${index}`}
                whileTap={{ scale: 0.88 }}
                onClick={() => insertAtCursor(glyph)}
                className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md bg-[var(--av-brand-soft)] border border-[var(--av-brand)]/20 text-[var(--av-brand)] cursor-pointer text-xs sm:text-sm"
              >
                <span className="avestan-glyph">{glyph}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* بدنه کلیدها */}
        <div className="space-y-1 sm:space-y-1.5" dir="rtl">
          {/* ردیف اعداد بالای کیبورد */}
          <div className="flex gap-0.5 sm:gap-1 justify-between w-full pb-1 border-b border-[var(--av-surface-border)]/60">
            {TOP_NUMBERS.map((num) => (
              <Key
                key={num.val}
                onClick={() => insertAtCursor(num.val)}
                ariaLabel={`درج عدد ${num.val}`}
                className="av-glass-key h-8 sm:h-9 flex-1 min-w-0"
              >
                <span className="text-xs sm:text-sm font-bold text-[var(--av-brand)] font-sans pointer-events-none">
                  {num.val}
                </span>
              </Key>
            ))}
          </div>

          {/* حروف پرکاربرد */}
          {mode === "primary" && (
            <div className="space-y-1 sm:space-y-1.5">
              {PRIMARY_ROWS.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="flex gap-0.5 sm:gap-1 justify-center w-full"
                >
                  {row.map(renderCharacter)}
                </div>
              ))}
            </div>
          )}

          {/* سایر حروف */}
          {mode === "otherLetters" && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-6 sm:grid-cols-8 gap-1 py-0.5"
            >
              {otherLetters.map((character) => (
                <CharacterKey
                  key={character.id}
                  character={character}
                  onInsert={insertAtCursor}
                  onLongPress={handleLongPress}
                />
              ))}
            </motion.div>
          )}

          {/* علائم و لیگچرها */}
          {mode === "symbols" && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2 py-0.5"
            >
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1">
                {allPunctuation.map((item) => (
                  <Key
                    key={item.id}
                    onClick={() => insertAtCursor(item.glyph)}
                    ariaLabel={item.name}
                    className="av-glass-key h-9 sm:h-10 px-2"
                  >
                    <span className="avestan-glyph text-base sm:text-lg pointer-events-none">
                      {item.glyph}
                    </span>
                  </Key>
                ))}
              </div>

              <div className="pt-1 border-t border-[var(--av-surface-border)]/60">
                <span className="text-[10px] text-[var(--av-text-muted)] block mb-1">
                  لیگچرها:
                </span>
                <div className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
                  {avestanLigatures.map((item) => (
                    <Key
                      key={item.id}
                      onClick={() => insertAtCursor(item.glyph)}
                      ariaLabel={item.name}
                      className="av-glass-key h-8 px-2.5 shrink-0"
                    >
                      <span className="avestan-glyph text-sm sm:text-base pointer-events-none">
                        {item.glyph}
                      </span>
                    </Key>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ردیف پایین کلیدها */}
          <div className="flex items-center gap-1 pt-1">
            {mode === "primary" ? (
              <Key
                onClick={() => setMode("otherLetters")}
                ariaLabel="باقی حروف"
                className="av-glass-key-special h-10 sm:h-11 px-2 sm:px-2.5 text-xs shrink-0"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--av-brand)] pointer-events-none" />
                <span className="text-[10px] sm:text-[11px] font-sans mr-0.5 hidden xs:inline pointer-events-none">
                  باقی
                </span>
              </Key>
            ) : (
              <Key
                onClick={() => setMode("primary")}
                ariaLabel="حروف اصلی"
                className="av-glass-key-special h-10 sm:h-11 px-2 sm:px-2.5 text-xs shrink-0"
              >
                <Undo2 className="h-3.5 w-3.5 pointer-events-none" />
                <span className="text-[10px] sm:text-[11px] font-sans mr-0.5 hidden xs:inline pointer-events-none">
                  اصلی
                </span>
              </Key>
            )}

            {mode === "symbols" ? (
              <Key
                onClick={() => setMode("primary")}
                ariaLabel="حروف اصلی"
                className="av-glass-key-special h-10 sm:h-11 px-1.5 sm:px-2 text-xs shrink-0 font-sans font-bold"
              >
                حروف
              </Key>
            ) : (
              <Key
                onClick={() => setMode("symbols")}
                ariaLabel="علائم نگارشی"
                className="av-glass-key-special h-10 sm:h-11 px-1.5 sm:px-2 text-xs shrink-0 font-mono"
              >
                ؟/𐬹
              </Key>
            )}

            <Key
              onClick={() => insertAtCursor("⸱")}
              ariaLabel="جداکننده میانی"
              className="av-glass-key h-10 sm:h-11 w-7 sm:w-9 text-sm sm:text-base shrink-0"
            >
              <span className="avestan-glyph pointer-events-none">⸱</span>
            </Key>

            <Key
              onClick={() => insertAtCursor(" ")}
              ariaLabel="فاصله"
              className="av-glass-key h-10 sm:h-11 flex-1 text-[11px] sm:text-xs text-[var(--av-text-secondary)] font-sans"
            >
              فاصله
            </Key>

            <Key
              onClick={() => insertAtCursor("𐬹")}
              ariaLabel="جداکننده واژه اوستایی"
              className="av-glass-key h-10 sm:h-11 w-7 sm:w-9 text-sm sm:text-base shrink-0"
            >
              <span className="avestan-glyph text-[var(--av-brand)] pointer-events-none">
                𐬹
              </span>
            </Key>

            <Key
              onClick={() => insertAtCursor("\n")}
              ariaLabel="خط جدید"
              className="av-glass-key h-10 sm:h-11 w-8 sm:w-10 text-[var(--av-brand)] shrink-0"
            >
              <CornerDownLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 pointer-events-none" />
            </Key>

            <Key
              onClick={removePrevious}
              ariaLabel="حذف نویسه"
              className="av-glass-key h-10 sm:h-11 w-8 sm:w-10 text-rose-500 hover:bg-rose-500/10 shrink-0"
            >
              <Delete className="h-3.5 w-3.5 sm:h-4 sm:w-4 pointer-events-none" />
            </Key>
          </div>

          {/* پاپ‌اور لمس طولانی */}
          <AnimatePresence>
            {popup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-14 z-30 flex gap-1 p-1 rounded-xl border border-[var(--av-brand)]/30 bg-[var(--av-surface)]/95 backdrop-blur-xl shadow-2xl"
              >
                {popup.items.map((glyph, index) => (
                  <button
                    key={`${popup.keyId}-${glyph}-${index}`}
                    type="button"
                    onClick={(e) => {
                      e.currentTarget.blur();
                      insertAtCursor(glyph);
                      setPopup(null);
                    }}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[var(--av-surface-subtle)] hover:bg-[var(--av-brand)] hover:text-white text-lg sm:text-xl transition-all cursor-pointer"
                  >
                    <span className="avestan-glyph pointer-events-none">
                      {glyph}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
