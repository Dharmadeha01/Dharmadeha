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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero — StatsStrip is a server component passed as children for ISR stats */}
        <Hero>
          <StatsStrip />
        </Hero>
        {/* 2. Video */}
        <Video />
        {/* 3. Courses */}
        <Courses />
        {/* 4. Format */}
        <Format />
        {/* 5. About the project */}
        <AboutProject />
        {/* 6. Two Paths */}
        <TwoPaths />
        {/* 7. Voices */}
        <Voices />
        {/* 8. Principles */}
        <Principles />
        {/* 9. FAQ */}
        <FAQ />
        {/* 10. Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
      {/* Apply modal — listens for open-apply-modal custom event from any CTA */}
      <ApplyModal />
    </>
  );
}
