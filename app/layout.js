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

const SITE_URL = "https://avista.ir";
const SITE_NAME = "آویستا";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "آویستا | یادگیری دبیرهٔ اوستایی",
    template: "%s | آویستا",
  },

  description:
    "آویستا سامانه‌ای متن‌باز، علمی و تعاملی برای یادگیری دبیرهٔ اوستایی، شناخت نویسه‌ها، آواشناسی (تلفظ)، واژگان گاهانی و تمرین با مرور فاصله‌دار است.",

  applicationName: SITE_NAME,

  generator: "Next.js",

  authors: [
    {
      name: "Hurad",
      url: "https://github.com/itshurad",
    },
  ],

  creator: "Hurad",
  publisher: SITE_NAME,

  category: "education",

  keywords: [
    "آویستا",
    "دبیره اوستایی",
    "دین دبیره",
    "دبیره دین دبیره",
    "زبان اوستایی",
    "اوستا",
    "گاهان",
    "نویسه های اوستایی",
    "آواشناسی اوستایی",
    "واژگان اوستایی",
    "آموزش اوستایی",
    "یادگیری دبیره اوستایی",
    "Avestan",
    "Avestan Script",
    "Avestan Language",
    "Din Dabireh",
  ],

  alternates: {
    canonical: SITE_URL,
    languages: {
      "fa-IR": SITE_URL,
    },
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: SITE_NAME,

    title: "آویستا | یادگیری دبیرهٔ اوستایی",

    description:
      "یادگیری گام‌به‌گام دبیرهٔ اوستایی، شناخت ۵۳ نویسهٔ رسمی، آواشناسی (تلفظ)، واژگان گاهانی و تمرین با روش مرور فاصله‌دار.",
  },

  twitter: {
    card: "summary_large_image",

    title: "آویستا | یادگیری دبیرهٔ اوستایی",

    description:
      "سامانهٔ متن‌باز و پژوهش‌محور برای یادگیری دبیرهٔ اوستایی، واژگان و آواشناسی (تلفظ).",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f7f8f5",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#080d12",
    },
  ],

  colorScheme: "light dark",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "EducationalApplication",

        "@id": `${SITE_URL}/#application`,

        name: SITE_NAME,

        alternateName: [
          "Avista",
          "Avestan Learning Platform",
          "آموزش دبیرهٔ اوستایی",
        ],

        url: SITE_URL,

        applicationCategory: "EducationalApplication",

        operatingSystem: "Web",

        inLanguage: "fa-IR",

        description:
          "سامانهٔ متن‌باز، علمی و تعاملی برای یادگیری دبیرهٔ اوستایی، شناخت نویسه‌ها، آواشناسی (تلفظ)، واژگان گاهانی و تمرین.",

        author: {
          "@type": "Person",
          name: "Hurad",
          url: "https://github.com/itshurad",
        },

        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },

        isAccessibleForFree: true,
      },

      {
        "@type": "WebSite",

        "@id": `${SITE_URL}/#website`,

        url: SITE_URL,

        name: SITE_NAME,

        description: "آموزش و تمرین دبیرهٔ اوستایی و واژگان زبان اوستایی.",

        inLanguage: "fa-IR",

        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },

      {
        "@type": "Organization",

        "@id": `${SITE_URL}/#organization`,

        name: SITE_NAME,

        url: SITE_URL,

        founder: {
          "@type": "Person",
          name: "Hurad",
          url: "https://github.com/itshurad",
        },
      },
    ],
  };

  return (
    <html
      lang="fa-IR"
      dir="rtl"
      className={vazirmatn.variable}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#f7f8f5" data-av-theme-color />

        <meta name="color-scheme" content="light dark" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const getThemeColor = () => {
                  const root = document.documentElement;
                  const isDark =
                    root.classList.contains("dark") ||
                    root.dataset.theme === "dark";

                  return isDark ? "#080d12" : "#f7f8f5";
                };

                const syncThemeColor = () => {
                  const meta = document.querySelector(
                    'meta[name="theme-color"][data-av-theme-color]'
                  );

                  if (meta) {
                    meta.setAttribute("content", getThemeColor());
                  }
                };

                syncThemeColor();

                const observer = new MutationObserver(syncThemeColor);

                observer.observe(document.documentElement, {
                  attributes: true,
                  attributeFilter: ["class", "data-theme"],
                });
              })();
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
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
