"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduce = useReducedMotion();

  const ease = [0.25, 0.1, 0.25, 1] as const;

  function fadeUp(delay: number, y = 16) {
    return {
      initial: shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay, ease },
    };
  }

  return (
    <section id="hero" style={{ backgroundColor: "#FAF5EC" }}>
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-10 md:pt-24 md:pb-20">
        {/* Eyebrow */}
        <motion.p
          className="text-xs font-medium tracking-widest uppercase mb-6"
          style={{ color: "#2AA090" }}
          {...fadeUp(0.2, 8)}
        >
          {t("eyebrow")}
        </motion.p>

        <h1 className="mb-6 md:mb-8 leading-none">
          {/* Line 1 */}
          <motion.span
            className="block text-[clamp(2rem,9vw,3rem)] md:text-[clamp(48px,7vw,72px)]"
            style={{
              fontFamily: "var(--font-dm-serif)",
              color: "#1A3028",
              lineHeight: 1.05,
            }}
            {...fadeUp(0.35)}
          >
            {sanityHero?.headlineLine1 || t("headline1")}
          </motion.span>
          {/* Line 2 */}
          <motion.span
            className="block italic text-[clamp(2rem,9vw,3rem)] md:text-[clamp(48px,7vw,72px)]"
            style={{
              fontFamily: "var(--font-dm-serif)",
              color: "#E87030",
              lineHeight: 1.05,
            }}
            {...fadeUp(0.5)}
          >
            {sanityHero?.headlineLine2 || t("headline2")}
          </motion.span>
        </h1>

        <motion.p
          className="text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl"
          style={{ color: "rgba(26,48,40,0.72)" }}
          {...fadeUp(0.65, 12)}
        >
          {sanityHero?.bodyText || t("body")}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 items-center"
          {...fadeUp(0.8, 8)}
        >
          <motion.button
            onClick={openApplyModal}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="px-7 md:px-8 py-3 md:py-3.5 rounded-full text-base font-medium text-white cursor-pointer"
            style={{ backgroundColor: "#E87030" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#E87030")
            }
          >
            {sanityHero?.primaryButtonText || t("cta")}
          </motion.button>
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
        </motion.div>
      </div>

      {/* StatsStrip slot */}
      {children}
    </section>
  );
}
