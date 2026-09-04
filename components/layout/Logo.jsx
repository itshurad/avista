import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 text-inherit transition-opacity hover:opacity-85 select-none ${className}`}
      aria-label="آویستا - صفحهٔ نخست"
    >
      <div className="relative w-8 h-8 rounded-full ">
        <Image src="/logo.png" alt="آویستا" fill 
          className="object-contain overflow-hidden rounded-full" />
      </div>
      <span className="font-black text-base tracking-tight text-[var(--av-text)]">
        آویستا
      </span>
    </Link>
  );
}
