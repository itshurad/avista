"use client";

import { useMemo, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { dictionaryData, dictionaryCategories } from "@/data/dictionary";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
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

  // بازخوانی وضعیت مستقیم از پارامترهای آدرس
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const activeCategory = searchParams.get("category") || "all";
  const searchQuery = searchParams.get("q") || "";

  // به‌روزرسانی پارامترهای آدرس بدون رفرش کامل صفحه
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
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      {/* سربرگ واژه‌نامه */}
      <div className="border-b border-[var(--av-border)] pb-8 mb-10 text-center sm:text-right">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] border border-[var(--av-border)] bg-[var(--av-surface-soft)] text-xs text-[var(--av-accent)] mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>پیکرهٔ جامع ۲۰۰ واژهٔ متون کهن</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--av-text)] tracking-tight">
          فرهنگ واژگان اوستایی و گاهانی
        </h1>
        <p className="mt-2.5 text-xs sm:text-sm text-[var(--av-text-muted)] max-w-2xl leading-relaxed">
          دانشنامهٔ واژگان اصیل دین‌دبیره بر پایهٔ لغت‌نامهٔ کریستیان بارتولومه
          همراه با آوانگاری، مفهوم فلسفی، ریشه‌شناسی و ارجاع به یسنا و گاهان.
        </p>

        {/* فیلد جستجوی متصل به URL */}
        <div className="mt-6 relative max-w-xl">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[var(--av-text-muted)]">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="جستجوی واژه (اوستایی، پارسی، ترانویسی)..."
            className="w-full h-11 pr-10 pl-4 text-xs sm:text-sm rounded-[6px] border border-[var(--av-border)] bg-[var(--av-surface)] text-[var(--av-text)] placeholder-[var(--av-text-muted)] focus:outline-none focus:border-[var(--av-accent)] transition-colors shadow-2xs"
          />
        </div>

        {/* فیلتر دسته‌بندی‌ها متصل به URL */}
        <div className="flex flex-wrap items-center gap-2 mt-4 justify-center sm:justify-start">
          {dictionaryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1 text-xs rounded-[4px] border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[var(--av-accent)] border-[var(--av-accent)] text-white font-bold"
                  : "bg-[var(--av-surface)] border-[var(--av-border)] text-[var(--av-text-muted)] hover:text-[var(--av-text)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* وضعیت نتایج و آمار */}
      <div className="flex items-center justify-between mb-4 text-xs text-[var(--av-text-muted)]">
        <span>
          نمایش {paginatedWords.length} واژه از مجموع {filteredWords.length}{" "}
          واژه
        </span>
        <span>
          برگهٔ {validPage} از {totalPages}
        </span>
      </div>

      {/* فهرست واژگان */}
      <div className="space-y-5">
        {paginatedWords.length > 0 ? (
          paginatedWords.map((item) => (
            <Card
              key={item.id}
              className="p-6 sm:p-7 hover:border-[var(--av-accent)]/50 transition-all duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* لوح واژه */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-[6px] bg-[var(--av-surface-soft)] border border-[var(--av-border)] text-center">
                  <span className="avestan-glyph text-4xl sm:text-5xl text-[var(--av-text)] mb-3">
                    {item.avestan}
                  </span>
                  <span className="text-xs font-mono font-bold text-[var(--av-accent)] tracking-wider">
                    {item.transliteration}
                  </span>
                  <span className="text-xs font-medium text-[var(--av-text-muted)] mt-1">
                    تلفظ: {item.pronunciation}
                  </span>
                </div>

                {/* شرح معانی و ریشه‌شناسی */}
                <div className="md:col-span-8 space-y-3 text-right">
                  <div className="flex items-center justify-between border-b border-[var(--av-border)] pb-2">
                    <h2 className="text-base sm:text-lg font-bold text-[var(--av-text)]">
                      {item.meaning}
                    </h2>
                    <Badge variant="default" size="sm">
                      ریشه: {item.root}
                    </Badge>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
                    {item.analysis}
                  </p>

                  <div className="p-3 rounded-[6px] bg-[var(--av-bg)] border border-[var(--av-border)] text-xs text-[var(--av-text-muted)]">
                    <span className="text-[var(--av-accent)] font-bold block mb-0.5">
                      مرجع و جایگاه کاربرد:
                    </span>
                    «{item.gathicContext}»
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-[11px] text-[var(--av-text-muted)]">
                    <BookMarked className="h-3.5 w-3.5 text-[var(--av-accent)]" />
                    <span>نویسه‌های کلیدی:</span>
                    <div className="flex items-center gap-1.5">
                      {item.relatedCharacters.map((c, i) => (
                        <span
                          key={i}
                          className="avestan-glyph text-base px-1.5 py-0.5 rounded-[3px] bg-[var(--av-surface-soft)] border border-[var(--av-border)] text-[var(--av-text)]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="p-12 text-center border border-[var(--av-border)] rounded-[8px] bg-[var(--av-surface)]">
            <span className="text-sm text-[var(--av-text-muted)]">
              هیچ واژه‌ای منطبق با جستجوی شما یافت نشد.
            </span>
          </div>
        )}
      </div>

      {/* کنترل‌های ناوبری صفحه‌بندی پایدار */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3 pt-6 border-t border-[var(--av-border)]">
          <Button
            variant="outline"
            size="sm"
            disabled={validPage === 1}
            onClick={() => handlePageChange(validPage - 1)}
          >
            <ChevronRight className="h-4 w-4 ml-1" />
            برگهٔ پیشین
          </Button>

          <span className="text-xs font-mono text-[var(--av-text-muted)] px-2">
            {validPage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={validPage === totalPages}
            onClick={() => handlePageChange(validPage + 1)}
          >
            برگهٔ پسین
            <ChevronLeft className="h-4 w-4 mr-1" />
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
        <div className="p-12 text-center text-xs text-[var(--av-text-muted)]">
          در حال بارگذاری فرهنگ واژگان...
        </div>
      }
    >
      <DictionaryContent />
    </Suspense>
  );
}
