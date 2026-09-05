// components/layout/Footer.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import DonateModal from "@/components/shared/DonateModal";
import { Coffee, Keyboard, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <>
      <footer className="mt-auto border-t border-[var(--av-surface-border)] bg-[var(--av-surface)] transition-colors">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* معرفی و دکمه همیاری */}
            <div className="md:col-span-2 space-y-3.5">
              <Logo />
              <p className="text-xs text-[var(--av-text-secondary)] max-w-sm leading-relaxed">
                آویستا؛ پلتفرم آزاد، مدرن و مستقل برای آموزش دبیره، آواشناسی و
                واژه‌نامهٔ کهن اوستایی. ساخته‌شده با هدف پاسداری پژوهشی از خطوط
                باستانی ایران.
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setDonateOpen(true)}
                  className="inline-flex items-center gap-1.5 h-8 px-3.5 text-xs font-semibold text-[var(--av-brand)] bg-[var(--av-brand-soft)] hover:bg-[var(--av-brand)] hover:text-white rounded-full transition-all cursor-pointer"
                >
                  <Coffee className="h-3.5 w-3.5" />
                  <span>مهرانه و همیاری (یک پیاله چای)</span>
                </button>
              </div>
            </div>

            {/* بخش‌های آموزشی و ابزارها */}
            <div>
              <h4 className="text-xs font-bold text-[var(--av-text)] mb-3">
                بخش‌های سامانه
              </h4>
              <ul className="space-y-2.5 text-xs text-[var(--av-text-secondary)]">
                <li>
                  <Link
                    href="/learn"
                    className="hover:text-[var(--av-text)] transition-colors"
                  >
                    فهرست گام‌های یادگیری
                  </Link>
                </li>
                <li>
                  <Link
                    href="/keyboard"
                    className="inline-flex items-center gap-1.5 text-[var(--av-brand)] font-semibold hover:underline transition-all"
                  >
                    <Keyboard className="h-3.5 w-3.5" />
                    <span>صفحه‌کلید و کارت‌پستال</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dictionary"
                    className="hover:text-[var(--av-text)] transition-colors"
                  >
                    واژه‌نامهٔ گاهانی و متون
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quiz"
                    className="hover:text-[var(--av-text)] transition-colors"
                  >
                    آزمون‌های ارزیابی
                  </Link>
                </li>
                <li>
                  <Link
                    href="/progress"
                    className="hover:text-[var(--av-text)] transition-colors"
                  >
                    کارنامهٔ پیشرفت آموخته‌ها
                  </Link>
                </li>
              </ul>
            </div>

            {/* مراجع و مستندات علمی */}
            <div>
              <h4 className="text-xs font-bold text-[var(--av-text)] mb-3">
                دانش و مستندات
              </h4>
              <ul className="space-y-2.5 text-xs text-[var(--av-text-secondary)]">
                <li>
                  <Link
                    href="/sources"
                    className="hover:text-[var(--av-text)] transition-colors"
                  >
                    مراجع علمی (هافمن و بارتولومه)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[var(--av-text)] transition-colors"
                  >
                    تاریخچه و ساختار دین‌دبیره
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/itshurad/Avista"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[var(--av-text)] transition-colors"
                  >
                    <span>مخزن گیت‌هاب (متن‌باز)</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* خط پانویس کپی‌رایت و توسعه‌دهنده */}
          <div className="mt-8 sm:mt-10 border-t border-[var(--av-surface-border)] pt-5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--av-text-muted)] gap-3">
            <span>
              نویسه‌ها بر پایهٔ نسخه ۱۷ استاندارد یونیکد و الفبای آواشناختی کارل
              هافمن.
            </span>

            <div className="flex items-center gap-1.5 text-[var(--av-text)]">
              <span>ساخته‌شده با</span>
              <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
              <span>به‌دستِ</span>
              <a
                href="https://github.com/itshurad"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--av-brand)] hover:underline transition-all"
              >
                هوراد
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* پنجرهٔ مودال همیاری */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
