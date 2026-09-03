import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import Link from "next/link";
import Button from "@/components/shared/Button";
import { Scroll, Compass, ShieldCheck, Feather } from "lucide-react";

export const metadata = {
  title: "دربارهٔ آویستا و تاریخچهٔ دین‌دبیره | آویستا",
  description:
    "آشنایی با تاریخچهٔ ابداع خط اوستایی در عصر ساسانی، ارزش‌های آواشناختی و رسالت علمی پایگاه آویستا.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-12">
      {/* سربرگ اصلی */}
      <header className="border-b border-[var(--av-border)] pb-8 text-center sm:text-right">
        <span className="text-xs font-bold tracking-wide text-[var(--av-accent)]">
          رسالت فرهنگی و علمی
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--av-text)] mt-1.5">
          دربارهٔ آویستا و شاهکار خط اوستایی
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[var(--av-text-muted)] leading-relaxed max-w-2xl">
          آویستا پروژه‌ای مستقل، متن‌باز و غیرانتفاعی است که با تکیه بر منابع
          معتبر دانشگاهی، دسترسی به میراث مکتوب اوستا را برای نسل امروز ساده و
          دلنشین می‌کند.
        </p>
      </header>

      {/* بخش تاریخچهٔ دین‌دبیره */}
      <section className="space-y-4 text-right">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--av-text)]">
          <Scroll className="h-4 w-4 text-[var(--av-accent)]" />
          <h2>چرا دبیرهٔ اوستایی یکی از شگفتی‌های زبان‌شناسی است؟</h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
          تا پیش از سده‌های چهارم و پنجم میلادی (عصر ساسانی)، متون دینی و
          سروده‌های کهن اوستا سینه به سینه و از راه سنت شفاهی توسط موبدان حفظ
          می‌شد. در دورهٔ شاپور و با احساس خطرِ فراموشی یا تحریف ظرایف آوایی،
          دانشمندان و موبدان ایرانی دست به ابداع خطی ویژه به نام «دین‌دبیره»
          زدند.
        </p>
        <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed">
          این الفبا بر پایهٔ خط پهلوی کتابی ولی با رفع ابهامات بزرگ آن ابداع شد.
          دبیرهٔ اوستایی با داشتن بیش از ۵۰ نشانهٔ صوتی، یکی از کامل‌ترین خط‌های
          فونتیک جهان باستان است که تفاوت ریزترین واکه‌های کوتاه، کشیده، خیشومی
          و صامت‌های سایشی و برگشته را با نشانه‌ای ویژه ثبت می‌کند.
        </p>
      </section>

      {/* ارکان آویستا */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5 space-y-2">
          <Feather className="h-5 w-5 text-[var(--av-accent)]" />
          <h3 className="text-sm font-bold text-[var(--av-text)]">
            سادگی و اصالت
          </h3>
          <p className="text-xs text-[var(--av-text-muted)] leading-relaxed">
            آموزش بدون پیچیدگی‌های خشک دانشگاهی، اما پایبند به اصول ترانویسی
            استاندارد جهانی.
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <ShieldCheck className="h-5 w-5 text-[var(--av-accent)]" />
          <h3 className="text-sm font-bold text-[var(--av-text)]">
            استقلال و متن‌باز بودن
          </h3>
          <p className="text-xs text-[var(--av-text-muted)] leading-relaxed">
            کد باز، بدون تبلیغات، بدون پایگاه دادهٔ تجاری و با احترام کامل به
            حریم خصوصی مخاطب.
          </p>
        </Card>

        <Card className="p-5 space-y-2">
          <Compass className="h-5 w-5 text-[var(--av-accent)]" />
          <h3 className="text-sm font-bold text-[var(--av-text)]">
            تکرار فاصله‌دار (SRS)
          </h3>
          <p className="text-xs text-[var(--av-text-muted)] leading-relaxed">
            بکارگیری اصول یادگیری شناختی تا نویسه‌های دشوار در بازه‌های زمانی
            مناسب مرور شوند.
          </p>
        </Card>
      </div>

      {/* اقدام پایانی */}
      <div className="border-t border-[var(--av-border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[var(--av-text)] block">
            آمادهٔ یادگیری نخستین نویسه هستید؟
          </span>
          <span className="text-[11px] text-[var(--av-text-muted)]">
            از واکه‌های کوتاه و بلند آغاز کنید.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/learn">
            <Button variant="primary" size="md">
              ورود به درس‌ها
            </Button>
          </Link>
          <Link href="/sources">
            <Button variant="outline" size="md">
              مشاهدهٔ منابع پژوهشی
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
