"use client";

import { useMemo, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { dictionaryData, dictionaryCategories } from "@/data/dictionary";
import Button from "@/components/shared/Button";
import {
  Search,
  Sparkles,
  BookMarked,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

function DictionaryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const activeCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";

  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (key === "page" && value === 1) ||
        (key === "category" && value === "all")
      ) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  const filteredWords = useMemo(() => {
    return dictionaryData.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.avestan.includes(q) ||
        item.transliteration.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        item.pronunciation.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedWords = useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredWords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredWords, validPage]);

  const handleCategoryChange = (catId) => {
    updateParams({ category: catId, page: 1 });
  };

  const handleSearchChange = (e) => {
    updateParams({ q: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 sm:px-6 space-y-10">
      {/* سربرگ واژه‌نامه */}
      <div className="border-b border-[var(--av-surface-border)] pb-8 text-center sm:text-right">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface)] text-xs text-[var(--av-brand)] font-medium mb-3 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" />
          <span>پیکرهٔ جامع 4000 واژهٔ گاهانی و یسنا</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--av-text)]">
          فرهنگ واژگان اوستایی
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-secondary)] max-w-2xl leading-relaxed">
          دانشنامهٔ واژگان اصیل دین‌دبیره بر پایهٔ ریشه‌شناسی کریستیان
          بارتولومه، همراه با ترانویسی، آواشناسی و ارجاع مستقیم به متون گاهان.
        </p>

        {/* فیلد جستجوی مدرن */}
        <div className="mt-6 relative max-w-lg">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[var(--av-text-muted)]">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="جستجوی واژه (اوستایی، پارسی، ترانویسی)..."
            className="w-full h-11 pr-11 pl-4 text-xs sm:text-sm rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface)] text-[var(--av-text)] placeholder-[var(--av-text-muted)] focus:outline-none focus:border-[var(--av-brand)] transition-colors shadow-xs"
          />
        </div>

        {/* فیلتر دسته‌بندی‌های کپسولی */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 justify-center sm:justify-start">
          {dictionaryCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1 text-xs rounded-full border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--av-brand)] border-[var(--av-brand)] text-white font-bold"
                    : "bg-[var(--av-surface)] border-[var(--av-surface-border)] text-[var(--av-text-secondary)] hover:text-[var(--av-text)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* آمار نتایج */}
      <div className="flex items-center justify-between text-xs text-[var(--av-text-muted)] px-1">
        <span>
          نمایش {paginatedWords.length} از {filteredWords.length} واژه
        </span>
        <span>
          برگهٔ {validPage} از {totalPages}
        </span>
      </div>

      {/* فهرست واژگان با استایل شیک و فلوید */}
      <div className="space-y-4">
        {paginatedWords.length > 0 ? (
          paginatedWords.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] hover:border-[var(--av-brand)]/30 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* لوح گلیف اوستایی */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] text-center">
                  <span className="avestan-glyph text-4xl sm:text-5xl text-[var(--av-text)] mb-2">
                    {item.avestan}
                  </span>
                  <span className="text-xs   font-bold text-[var(--av-brand)] tracking-wider">
                    {item.transliteration}
                  </span>
                  <span className="text-[11px] text-[var(--av-text-muted)] mt-0.5">
                    تلفظ: {item.pronunciation}
                  </span>
                </div>

                {/* معانی و ریشه‌شناسی */}
                <div className="md:col-span-8 space-y-2.5 text-right">
                  <div className="flex items-center justify-between border-b border-[var(--av-surface-border)] pb-2">
                    <h2 className="text-base font-bold text-[var(--av-text)]">
                      {item.meaning}
                    </h2>
                    <span className="text-[11px]   text-[var(--av-text-muted)] bg-[var(--av-surface-subtle)] px-2 py-0.5 rounded-full">
                      ریشه: {item.root}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--av-text-secondary)] leading-relaxed">
                    {item.analysis}
                  </p>

                  <div className="text-xs text-[var(--av-text-muted)]">
                    <span className="text-[var(--av-brand)] font-medium">
                      مرجع متن:{" "}
                    </span>
                    {item.gathicContext}
                  </div>

                  {/* نویسه‌های تشکیل‌دهنده */}
                  <div className="flex items-center gap-2 pt-2 text-[11px] text-[var(--av-text-muted)]">
                    <BookMarked className="h-3.5 w-3.5 text-[var(--av-brand)]" />
                    <span>نویسه‌های واژه:</span>
                    <div className="flex items-center gap-1">
                      {item.relatedCharacters.map((c, i) => (
                        <span
                          key={i}
                          className="avestan-glyph text-sm px-1.5 py-0.5 rounded-md bg-[var(--av-surface-subtle)] border border-[var(--av-surface-border)] text-[var(--av-text)]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-12 text-center rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] text-xs text-[var(--av-text-secondary)]">
            هیچ واژه‌ای منطبق با عبارت مورد نظر پیدا نشد.
          </div>
        )}
      </div>

      {/* ناوبری صفحات پایدار */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-[var(--av-surface-border)]">
          <Button
            variant="secondary"
            size="sm"
            disabled={validPage === 1}
            onClick={() => handlePageChange(validPage - 1)}
          >
            <ChevronRight className="h-3.5 w-3.5 ml-1" />
            برگهٔ پیشین
          </Button>

          <span className="text-xs   text-[var(--av-text-muted)] px-3">
            {validPage} / {totalPages}
          </span>

          <Button
            variant="secondary"
            size="sm"
            disabled={validPage === totalPages}
            onClick={() => handlePageChange(validPage + 1)}
          >
            برگهٔ پسین
            <ChevronLeft className="h-3.5 w-3.5 mr-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function DictionaryPage() {
  return (
    <Suspense
      fallback={
        <div className="p-16 text-center text-xs text-[var(--av-text-muted)]">
          در حال بارگذاری فرهنگ واژگان...
        </div>
      }
    >
      <DictionaryContent />
    </Suspense>
  );
}
