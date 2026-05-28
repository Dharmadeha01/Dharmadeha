"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeInView from "./FadeInView";

function openApplyModal() {
  window.dispatchEvent(new CustomEvent("open-apply-modal"));
}

function scrollToJoin() {
  const el = document.getElementById("join");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function FinalCTA() {
  const t = useTranslations("FinalCTA");
  const shouldReduce = useReducedMotion();

  return (
    <section style={{ backgroundColor: "#1A3028" }} className="py-7 md:py-10">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeInView>
          <h2 className="mb-5 md:mb-6">
            <span
              className="block"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(32px, 5.5vw, 64px)",
                color: "#FAF5EC",
                lineHeight: 1.05,
              }}
            >
              {t("headline1")}
            </span>
            <span
              className="block italic"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(32px, 5.5vw, 64px)",
                color: "#E8A840",
                lineHeight: 1.05,
              }}
            >
              {t("headline2")}
            </span>
          </h2>

          <p
            className="text-base md:text-lg leading-relaxed mb-8 md:mb-10"
            style={{ color: "rgba(250,245,236,0.68)" }}
          >
            {t("body")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 md:mb-8">
            <motion.button
              onClick={openApplyModal}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="px-9 py-3.5 md:py-4 rounded-full font-medium text-white cursor-pointer"
              style={{ backgroundColor: "#E87030" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = "#E87030")
              }
            >
              {t("cta1")}
            </motion.button>
            <motion.button
              onClick={scrollToJoin}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="px-9 py-3.5 md:py-4 rounded-full font-medium cursor-pointer"
              style={{
                border: "2px solid #E8A840",
                color: "#E8A840",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(232,168,64,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              {t("cta2")}
            </motion.button>
          </div>

          <p
            className="text-xs md:text-sm"
            style={{ color: "rgba(250,245,236,0.35)" }}
          >
            {t("languages")}
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
