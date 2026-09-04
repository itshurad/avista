"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import DonateModal from "@/components/shared/DonateModal";
import { Coffee } from "lucide-react";

export default function Footer() {
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <>
      <footer className="mt-auto border-t border-[var(--av-surface-border)] bg-[var(--av-surface)] transition-colors">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* معرفی و دکمه همیاری */}
            <div className="md:col-span-2 space-y-3">
              <Logo />
              <p className="text-xs text-[var(--av-text-secondary)] max-w-sm leading-relaxed">
                آویستا؛ بستری آزاد و مستقل برای آموزش علمی خط و آواشناسی
                اوستایی. این پروژه بدون هدف بازرگانی و برای پاسداری از میراث کهن
                پارسی ساخته شده است.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setDonateOpen(true)}
                  className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold text-[var(--av-brand)] bg-[var(--av-brand-soft)] hover:bg-[var(--av-brand)] hover:text-white rounded-full transition-all cursor-pointer"
                >
                  <Coffee className="h-3.5 w-3.5" />
                  <span>مهرانه و همیاری (یک پیاله چای)</span>
                </button>
              </div>
            </div>

            {/* بخش‌های آموزشی */}
            <div>
              <h4 className="text-xs font-bold text-[var(--av-text)] mb-3">
                بخش‌های سامانه
              </h4>
              <ul className="space-y-2 text-xs text-[var(--av-text-secondary)]">
                <li>
                  <Link href="/learn" className="hover:text-[var(--av-text)]">
                    فهرست نویسه‌ها
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dictionary"
                    className="hover:text-[var(--av-text)]"
                  >
                    واژه‌نامهٔ گاهانی
                  </Link>
                </li>
                <li>
                  <Link href="/quiz" className="hover:text-[var(--av-text)]">
                    آزمون‌های مرحله‌ای
                  </Link>
                </li>
                <li>
                  <Link
                    href="/progress"
                    className="hover:text-[var(--av-text)]"
                  >
                    کارنامهٔ پیشرفت
                  </Link>
                </li>
              </ul>
            </div>

            {/* مراجع و مستندات */}
            <div>
              <h4 className="text-xs font-bold text-[var(--av-text)] mb-3">
                دانش و مستندات
              </h4>
              <ul className="space-y-2 text-xs text-[var(--av-text-secondary)]">
                <li>
                  <Link href="/sources" className="hover:text-[var(--av-text)]">
                    مراجع علمی و دانشگاهی
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[var(--av-text)]">
                    تاریخچهٔ دین‌دبیره
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/itshurad/Avista"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--av-text)] transition-colors"
                  >
                    مخزن گیت‌هاب پروژه (متن‌باز)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-[var(--av-surface-border)] pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--av-text-muted)] gap-3">
            <span>
              داده‌ها بر پایه استاندارد یونیکد و مراجع کریستیان بارتولومه و کارل
              هافمن.
            </span>
            <div className="flex items-center gap-1.5 text-[var(--av-text)]">
              <span>ساخته‌شده با</span>
              <span
                className="text-sm leading-none"
                role="img"
                aria-label="قلب آبی"
              >
                💙
              </span>
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

      {/* پنجرهٔ همیاری */}
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
