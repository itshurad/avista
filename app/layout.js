import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata = {
  title: "آویستا | پلتفرم مدرن یادگیری دبیرهٔ اوستایی",
  description:
    "سامانهٔ علمی، مرحله‌ای و مینیمال برای یادگیری، تمرین و سنجش نویسه‌ها و واژگان دبیرهٔ اوستایی.",
  metadataBase: new URL("https://avista.ir"),
  openGraph: {
    title: "آویستا | آموزش دین‌دبیرهٔ اوستایی",
    description:
      "یادگیری گام‌به‌گام و علمی خط و زبان باستانی اوستا با آزمون‌های سنجیده و روش تکرار فاصله‌دار.",
    url: "https://avista.ir",
    siteName: "آویستا",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "آویستا | آموزش دین‌دبیرهٔ اوستایی",
    description:
      "یادگیری خط باستانی اوستا با متد علمی و تمرین‌های چهارگزینه‌ای.",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    name: "آویستا",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description:
      "بستر علمی و تعاملی یادگیری دبیره و آواشناسی زبان اوستایی با رویکرد مینیمال و متن‌باز.",
    inLanguage: "fa",
  };

  return (
    <html
      lang="fa"
      dir="rtl"
      className={vazirmatn.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
