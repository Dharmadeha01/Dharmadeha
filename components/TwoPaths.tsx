"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Users, Compass } from "lucide-react";
import FadeInView from "./FadeInView";
import { ConcentricCircles } from "./ui/ConcentricCircles";

function openApplyModal() {
  window.dispatchEvent(new CustomEvent("open-apply-modal"));
}

const cardVariants = {
  rest: { y: 0 },
  hovered: { y: -6 },
};
const circlesVariants = {
  rest: { scale: 1 },
  hovered: { scale: 1.08 },
};

export default function TwoPaths() {
  const t = useTranslations("TwoPaths");
  const shouldReduce = useReducedMotion() ?? false;
  const card1Items = t.raw("card1Items") as string[];
  const card2Items = t.raw("card2Items") as string[];

  return (
    <section id="join" style={{ backgroundColor: "#FAF5EC" }} className="py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#2AA090" }}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mb-10 md:mb-16">
            <span
              className="block"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                color: "#1A3028",
                lineHeight: 1.1,
              }}
            >
              {t("headline1")}
            </span>
            <span
              className="block italic"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                color: "#E87030",
                lineHeight: 1.1,
              }}
            >
              {t("headline2")}
            </span>
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 — Join */}
          <FadeInView delay={0.1}>
            <motion.div
              className="relative overflow-hidden rounded-2xl p-7 md:p-10 flex flex-col"
              style={{ backgroundColor: "#fff", border: "1px solid rgba(26,48,40,0.08)" }}
              variants={cardVariants}
              initial="rest"
              whileHover={shouldReduce ? "rest" : "hovered"}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Circles */}
              <motion.div
                variants={circlesVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "320px",
                  height: "320px",
                  transformOrigin: "center",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                <ConcentricCircles color="#2AA090" id="teal-join" />
              </motion.div>

              {/* Content */}
              <div className="relative flex flex-col flex-1" style={{ zIndex: 10 }}>
                {/* Decorative 50% */}
                <div
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "68px",
                    color: "rgba(42,160,144,0.2)",
                    lineHeight: 1,
                    marginBottom: "16px",
                  }}
                >
                  50%
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#2AA090", marginBottom: "16px" }}
                >
                  <Users size={22} color="#fff" />
                </div>

                {/* Title */}
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "28px",
                    color: "#1A3028",
                    lineHeight: 1.2,
                  }}
                >
                  {t("card1Title")}
                </h3>

                {/* Italic subtitle */}
                <p
                  className="italic mb-5"
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "15px",
                    color: "#2AA090",
                  }}
                >
                  {t("card1Subtitle")}
                </p>

                {/* Divider */}
                <div style={{ borderTop: "1px solid rgba(26,48,40,0.1)", marginBottom: "20px" }} />

                {/* Bullets */}
                <ul className="space-y-3 mb-7 flex-1">
                  {card1Items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <div
                        className="shrink-0 rounded-full"
                        style={{ width: "6px", height: "6px", backgroundColor: "#2AA090", marginTop: "8px" }}
                      />
                      <span style={{ color: "rgba(26,48,40,0.8)", fontFamily: "var(--font-dm-sans)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA — ember */}
                <motion.button
                  onClick={openApplyModal}
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="w-full text-center py-3.5 rounded-full text-sm font-medium text-white cursor-pointer"
                  style={{ backgroundColor: "#E87030" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "#E87030")
                  }
                >
                  {t("card1Cta")}
                </motion.button>
              </div>
            </motion.div>
          </FadeInView>

          {/* Card 2 — Mentor */}
          <FadeInView delay={0.18}>
            <motion.div
              className="relative overflow-hidden rounded-2xl p-7 md:p-10 flex flex-col"
              style={{ backgroundColor: "#fff", border: "1px solid rgba(26,48,40,0.08)" }}
              variants={cardVariants}
              initial="rest"
              whileHover={shouldReduce ? "rest" : "hovered"}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Circles */}
              <motion.div
                variants={circlesVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "320px",
                  height: "320px",
                  transformOrigin: "center",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                <ConcentricCircles color="#E87030" id="ember-mentor" />
              </motion.div>

              {/* Content */}
              <div className="relative flex flex-col flex-1" style={{ zIndex: 10 }}>
                {/* Decorative 50% */}
                <div
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "68px",
                    color: "rgba(232,112,48,0.2)",
                    lineHeight: 1,
                    marginBottom: "16px",
                  }}
                >
                  50%
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#E87030", marginBottom: "16px" }}
                >
                  <Compass size={22} color="#fff" />
                </div>

                {/* Title */}
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "28px",
                    color: "#1A3028",
                    lineHeight: 1.2,
                  }}
                >
                  {t("card2Title")}
                </h3>

                {/* Italic subtitle */}
                <p
                  className="italic mb-5"
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "15px",
                    color: "#E87030",
                  }}
                >
                  {t("card2Subtitle")}
                </p>

                {/* Divider */}
                <div style={{ borderTop: "1px solid rgba(26,48,40,0.1)", marginBottom: "20px" }} />

                {/* Bullets */}
                <ul className="space-y-3 mb-7 flex-1">
                  {card2Items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <div
                        className="shrink-0 rounded-full"
                        style={{ width: "6px", height: "6px", backgroundColor: "#E87030", marginTop: "8px" }}
                      />
                      <span style={{ color: "rgba(26,48,40,0.8)", fontFamily: "var(--font-dm-sans)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA — outline */}
                <motion.button
                  whileHover={shouldReduce ? {} : { scale: 1.02, backgroundColor: "#1A3028", color: "#FAF5EC" }}
                  whileTap={shouldReduce ? {} : { scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="w-full text-center py-3.5 rounded-full text-sm font-medium cursor-pointer"
                  style={{
                    border: "1.5px solid #1A3028",
                    color: "#1A3028",
                    backgroundColor: "transparent",
                  }}
                >
                  {t("card2Cta")}
                </motion.button>
              </div>
            </motion.div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
