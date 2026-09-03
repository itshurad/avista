import HeroSection from "@/components/home/HeroSection";
import ResumeBanner from "@/components/home/ResumeBanner";
import LearningJourney from "@/components/home/LearningJourney";
import FeaturedCharacters from "@/components/home/FeaturedCharacters";
import WordOfTheDay from "@/components/home/WordOfTheDay";
import LearningRoadmap from "@/components/home/LearningRoadmap";
import { charactersData } from "@/data/characters";

export default function HomePage() {
  const sampleWord = {
    word: "𐬀𐬴𐬀",
    transliteration: "aṣ̌a",
    pronunciation: "اَشَه",
    meaning: "راستی، دادگری مطلق و هنجار هستی",
    note: "بنیادی‌ترین مفهوم اخلاقی و کیهانی در سروده‌های گاهان زرتشت.",
    relatedCharacter: "𐬴",
  };

  return (
    <div className="w-full">
      <HeroSection />
      <ResumeBanner />
      <LearningJourney />
      <FeaturedCharacters characters={charactersData} />
      <WordOfTheDay wordData={sampleWord} />
      <LearningRoadmap />
    </div>
  );
}
