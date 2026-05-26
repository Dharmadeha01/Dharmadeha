"use client";

import { useTranslations } from "next-intl";
import FadeInView from "./FadeInView";
import type { SanityHero } from "@/lib/sanity";

function openApplyModal() {
  window.dispatchEvent(new CustomEvent("open-apply-modal"));
}

export default function Hero({
  children,
  sanityHero,
}: {
  children?: React.ReactNode;
  sanityHero?: SanityHero | null;
}) {
  const t = useTranslations("Hero");

  return (
    <section id="hero" style={{ backgroundColor: "#FAF5EC" }}>
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-10 md:pt-32 md:pb-20">
        <FadeInView>
          <h1 className="mb-6 md:mb-8 leading-none">
            <span
              className="block text-[clamp(2rem,9vw,3rem)] md:text-[clamp(48px,7vw,72px)]"
              style={{
                fontFamily: "var(--font-dm-serif)",
                color: "#1A3028",
                lineHeight: 1.05,
              }}
            >
              {sanityHero?.headlineLine1 || t("headline1")}
            </span>
            <span
              className="block italic text-[clamp(2rem,9vw,3rem)] md:text-[clamp(48px,7vw,72px)]"
              style={{
                fontFamily: "var(--font-dm-serif)",
                color: "#E87030",
                lineHeight: 1.05,
              }}
            >
              {sanityHero?.headlineLine2 || t("headline2")}
            </span>
          </h1>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p
            className="text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl"
            style={{ color: "rgba(26,48,40,0.72)" }}
          >
            {sanityHero?.bodyText || t("body")}
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={openApplyModal}
              className="px-7 md:px-8 py-3 md:py-3.5 rounded-full text-base font-medium text-white transition-colors cursor-pointer"
              style={{ backgroundColor: "#E87030" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#E87030")
              }
            >
              {sanityHero?.primaryButtonText || t("cta")}
            </button>
            <a
              href="#about"
              className="text-base font-medium transition-colors"
              style={{ color: "#1A3028" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#E87030")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#1A3028")
              }
            >
              {t("howItWorks")}
            </a>
          </div>
        </FadeInView>
      </div>

      {/* StatsStrip slot — passed from the server page as a child */}
      {children}
    </section>
  );
}
