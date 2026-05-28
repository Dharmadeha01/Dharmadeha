import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Video from "@/components/Video";
import Courses from "@/components/Courses";
import Format from "@/components/Format";
import AboutProject from "@/components/AboutProject";
import TwoPaths from "@/components/TwoPaths";
import Voices from "@/components/Voices";
import Principles from "@/components/Principles";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ApplyModal from "@/components/ApplyModal";
import {
  sanityFetch,
  queries,
  type SanityHero,
  type SanityCourse,
  type SanityFaq,
  type SanityTestimonial,
  type SanityPrinciple,
  type SanityVideoSection,
} from "@/lib/sanity";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch all Sanity data in parallel; each returns null gracefully if CMS is unconfigured
  const [
    sanityHero,
    sanityCourses,
    sanityFaq,
    sanityTestimonials,
    sanityPrinciples,
    sanityVideoSection,
  ] = await Promise.all([
    sanityFetch<SanityHero>(queries.hero),
    sanityFetch<SanityCourse[]>(queries.courses),
    sanityFetch<SanityFaq[]>(queries.faq),
    sanityFetch<SanityTestimonial[]>(queries.testimonials),
    sanityFetch<SanityPrinciple[]>(queries.principles),
    sanityFetch<SanityVideoSection>(queries.videoSection),
  ]);

  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero */}
        <Hero sanityHero={sanityHero}>
          <StatsStrip />
        </Hero>
        {/* 2. Video */}
        <Video sanityData={sanityVideoSection} />
        {/* 3. Courses */}
        <Courses sanityData={sanityCourses} />
        {/* 4. Format */}
        <Format />
        {/* 6. About the project */}
        <AboutProject />
        {/* 7. Two Paths */}
        <TwoPaths />
        {/* 8. Voices / Testimonials */}
        <Voices sanityData={sanityTestimonials} />
        {/* 9. Principles */}
        <Principles sanityData={sanityPrinciples} />
        {/* 10. FAQ */}
        <FAQ sanityData={sanityFaq} />
        {/* 11. Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      {/* Apply modal — listens for open-apply-modal custom event from any CTA */}
      <ApplyModal />
    </>
  );
}
