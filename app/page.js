import HeroSection from "@/components/home/HeroSection";
import ResumeBanner from "@/components/home/ResumeBanner";
import LearningJourney from "@/components/home/LearningJourney";
import FeaturedCharacters from "@/components/home/FeaturedCharacters";
import WordOfTheDay from "@/components/home/WordOfTheDay";
import LearningRoadmap from "@/components/home/LearningRoadmap";

import { charactersData } from "@/data/characters";

export const metadata = {
  title: "یادگیری دبیرهٔ اوستایی",
  description:
    "با آویستا دبیرهٔ اوستایی را گام‌به‌گام یاد بگیرید؛ ۵۳ نویسهٔ رسمی، آواشناسی (تلفظ)، واژگان گاهانی و تمرین‌های آموزشی.",

  alternates: {
    canonical: "https://avista.ir/",
  },

  openGraph: {
    title: "آویستا | یادگیری دبیرهٔ اوستایی",
    description:
      "مسیر تعاملی و علمی برای شناخت دبیرهٔ اوستایی، نویسه‌ها، آواشناسی (تلفظ) و واژگان گاهانی.",
    url: "https://avista.ir/",
    locale: "fa_IR",
    type: "website",
  },
};

export default function HomePage() {
  const sampleWord = {
    word: "𐬀𐬴𐬀",

    transliteration: "aṣ̌a",

    pronunciation: "اَشَه",

    meaning: "راستی، دادگری مطلق و هنجار هستی",

    note: "از بنیادی‌ترین مفهوم‌های اخلاقی و کیهانی در سروده‌های گاهان زرتشت.",

    relatedCharacter: "𐬴",
  };

  return (
    <div className="w-full pb-6 sm:pb-0">
      <HeroSection />

      <ResumeBanner />

      <LearningJourney />

      <FeaturedCharacters characters={charactersData} />

      <WordOfTheDay wordData={sampleWord} />

      <LearningRoadmap />
    </div>
  );
}
