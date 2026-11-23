import HomeHero from "@/components/home/HomeHero";
import { BigCta, BlogTeaser, FeaturedProjects, Manifesto, Pillars, ProcessTeaser, Stats, Testimonials, ZonesHover } from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Manifesto />
      <Pillars />
      <FeaturedProjects />
      <Stats />
      <ProcessTeaser />
      <ZonesHover />
      <Testimonials />
      <BlogTeaser />
      <BigCta />
    </>
  );
}
