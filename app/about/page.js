import Link from "next/link";
import Button from "@/components/shared/Button";
import {
  Scroll,
  Compass,
  ShieldCheck,
  Feather,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "دربارهٔ آویستا و تاریخچهٔ دین‌دبیره | آویستا",
  description:
    "آشنایی با تاریخچهٔ ابداع خط اوستایی در عصر ساسانی، ارزش‌های آواشناختی و رسالت علمی پایگاه آویستا.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 sm:px-6 space-y-12">
      {/* سربرگ اصلی */}
      <header className="border-b border-[var(--av-surface-border)] pb-8 text-center sm:text-right">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--av-surface-border)] bg-[var(--av-surface)] text-xs text-[var(--av-brand)] font-medium mb-3 shadow-xs">
          <Sparkles className="h-3.5 w-3.5" />
          <span>رسالت فرهنگی و پژوهشی</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--av-text)]">
          دربارهٔ آویستا و شاهکار خط اوستایی
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-secondary)] leading-relaxed max-w-2xl">
          آویستا پروژه‌ای مستقل، متن‌باز و غیرانتفاعی است که با تکیه بر مراجع
          معتبر دانشگاهی، دسترسی به میراث زبان‌های کهن ایرانی را برای نسل امروز
          آسان و دلنشین می‌سازد.
        </p>
      </header>

      {/* تاریخچه دین‌دبیره */}
      <section className="space-y-4 text-right">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--av-text)]">
          <Scroll className="h-4 w-4 text-[var(--av-brand)]" />
          <h2>چرا دبیرهٔ اوستایی یکی از شگفتی‌های زبان‌شناسی جهان است؟</h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--av-text-secondary)] leading-relaxed">
          تا پیش از سده‌های چهارم و پنجم میلادی (عصر ساسانی)، سروده‌ها و متون
          کهن اوستا سینه به سینه و از راه سنت شفاهی توسط موبدان حفظ می‌شد. با
          احساس خطرِ فراموشی یا دگرگونی ظرایف آوایی، دانشمندان و زبان‌شناسان
          ایرانی دست به ابداع خطی آوانگار به نام «دین‌دبیره» زدند.
        </p>
        <p className="text-xs sm:text-sm text-[var(--av-text-secondary)] leading-relaxed">
          این الفبا بر پایهٔ خط پهلوی کتابی اما با رفع ابهامات بزرگ آن شکل گرفت.
          دین‌دبیره با داشتن ۵۳ نشانهٔ صوتی مجزا، یکی از کامل‌ترین خط‌های فونتیک
          جهان باستان است که تفاوت ریزترین واکه‌های کوتاه، کشیده، خیشومی و
          صامت‌های سایشی و برگشته را با نشانه‌ای مستقل ثبت می‌کند.
        </p>
      </section>

      {/* کارت‌های ارزش‌های محوری */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-2">
          <Feather className="h-5 w-5 text-[var(--av-brand)]" />
          <h3 className="text-sm font-bold text-[var(--av-text)]">
            سادگی و اصالت
          </h3>
          <p className="text-xs text-[var(--av-text-secondary)] leading-relaxed">
            آموزش بدون پیچیدگی‌های خشک سنتی، همراه با پایبندی به اصول ترانویسی
            استاندارد جهانی.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-2">
          <ShieldCheck className="h-5 w-5 text-[var(--av-brand)]" />
          <h3 className="text-sm font-bold text-[var(--av-text)]">
            استقلال و متن‌باز بودن
          </h3>
          <p className="text-xs text-[var(--av-text-secondary)] leading-relaxed">
            کد باز، بدون تبلیغات بازرگانی، بدون پایگاه دادهٔ تجاری و با پاسداری
            کامل از حریم خصوصی مخاطب.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[var(--av-surface-border)] bg-[var(--av-surface)] shadow-[var(--av-card-shadow)] space-y-2">
          <Compass className="h-5 w-5 text-[var(--av-brand)]" />
          <h3 className="text-sm font-bold text-[var(--av-text)]">
            تکرار فاصله‌دار (SRS)
          </h3>
          <p className="text-xs text-[var(--av-text-secondary)] leading-relaxed">
            بکارگیری اصول یادگیری شناختی تا نویسه‌های دشوار در بازه‌های زمانی
            متناسب مرور و تثبیت شوند.
          </p>
        </div>
      </div>

      {/* بخش دعوت به اقدام پایانی */}
      <div className="border-t border-[var(--av-surface-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[var(--av-text)] block">
            آمادهٔ یادگیری نخستین نویسه هستید؟
          </span>
          <span className="text-[11px] text-[var(--av-text-muted)]">
            از مرحلهٔ واکه‌های کوتاه و بلند بنیادین آغاز کنید.
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/learn">
            <Button variant="primary" size="md">
              <span>ورود به درس‌ها</span>
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            </Button>
          </Link>
          <Link href="/sources">
            <Button variant="secondary" size="md">
              مشاهدهٔ منابع پژوهشی
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
