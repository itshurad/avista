import { academicSources } from "@/data/sources";
import Card from "@/components/shared/Card";
import Badge from "@/components/shared/Badge";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "منابع و مراجع علمی | آویستا",
  description:
    "کتاب‌شناسی و مراجع معتبر اوستاشناسی و زبان‌های کهن ایرانی مورد استفاده در سامانهٔ آویستا.",
};

export default function SourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="border-b border-[var(--av-border)] pb-8 mb-10 text-center sm:text-right">
        <span className="text-xs font-bold text-[var(--av-accent)] tracking-wide">
          اصالت علمی
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--av-text)] mt-1">
          کتاب‌شناسی و منابع پژوهشی
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[var(--av-text-muted)] max-w-2xl leading-relaxed">
          تمامی داده‌های آواشناختی، ارزش‌گذاری‌های یونیکد و ترانویسی نویسه‌ها بر
          پایهٔ مقالات دانشگاهی تراز اول و پژوهش‌های باستان‌شناسی ثبت شده‌اند.
        </p>
      </div>

      <div className="space-y-6">
        {academicSources.map((source) => (
          <Card key={source.id} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <h2 className="text-base font-bold text-[var(--av-text)] font-sans">
                  {source.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[var(--av-text-muted)]">
                  <span>
                    پژوهشگر:{" "}
                    <strong className="text-[var(--av-text)]">
                      {source.author}
                    </strong>
                  </span>
                  <span>•</span>
                  <span>{source.year}</span>
                  <span>•</span>
                  <span>{source.publisher}</span>
                </div>
              </div>
              <Badge variant="default" size="sm">
                سند دانشگاهی
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-[var(--av-text)] leading-relaxed mt-2">
              {source.description}
            </p>

            <div className="mt-4 pt-3 border-t border-[var(--av-border)] flex justify-end">
              <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--av-accent)] hover:underline"
              >
                <span>مشاهدهٔ سند در منبع اصلی</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
