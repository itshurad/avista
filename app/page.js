import HeroSection from "@/components/home/HeroSection";
import WordOfTheDay from "@/components/home/WordOfTheDay";
import LearningRoadmap from "@/components/home/LearningRoadmap";
import FeaturedCharacters from "@/components/home/FeaturedCharacters";
import { charactersData } from "@/data/characters";
import { getWordOfTheDay } from "@/data/dailyWords";

export default function HomePage() {
  const wordData = getWordOfTheDay();

  return (
    <div className="w-full">
      <HeroSection />
      <WordOfTheDay wordData={wordData} />
      <LearningRoadmap />
      <FeaturedCharacters characters={charactersData} />
    </div>
  );
}
