import { Hero } from "@/components/home/hero";
import { AboutSummary } from "@/components/home/about-summary";
import { TechStack } from "@/components/home/tech-stack";
import { FeaturedProjects } from "@/components/home/featured-projects";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSummary />
      <TechStack />
      <FeaturedProjects />
    </>
  );
}