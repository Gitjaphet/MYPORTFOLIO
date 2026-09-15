import { Hero } from "@/components/home/hero";
import { AboutSummary } from "@/components/home/about-summary";
import { EngineeringStandards } from "@/components/about/engineering-standards";
import { TechStack } from "@/components/home/tech-stack";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ContactTeaser } from "@/components/home/contact-teaser";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <EngineeringStandards />
      <TechStack />
      <FeaturedProjects />
      <ContactTeaser />
    </>
  );
}