import { BrandBar } from "@/components/BrandBar";
import { FeaturedVerse } from "@/components/FeaturedVerse";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { StudyTools } from "@/components/StudyTools";

export default function Home() {
  return (
    <main className="pb-16">
      <BrandBar />
      <Hero />
      <FeaturedVerse />
      <StudyTools />
      <SiteFooter />
    </main>
  );
}
