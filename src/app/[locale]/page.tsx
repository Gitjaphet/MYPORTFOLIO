import { Hero } from "@/components/home/hero";
import { AboutSummary } from "@/components/home/about-summary";
import { TechStack } from "@/components/home/tech-stack";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ContactTeaser } from "@/components/home/contact-teaser";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <TechStack />
      <FeaturedProjects />
      <ContactTeaser />
    </>
  );
}