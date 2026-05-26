"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Users, Compass, Check } from "lucide-react";

function openApplyModal() {
  window.dispatchEvent(new CustomEvent("open-apply-modal"));
}
import FadeInView from "./FadeInView";

export default function TwoPaths() {
  const t = useTranslations("TwoPaths");
  const card1Items = t.raw("card1Items") as string[];
  const card2Items = t.raw("card2Items") as string[];

  return (
    <section id="join" style={{ backgroundColor: "#FAF5EC" }} className="py-12 md:py-24">
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

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {/* Card 1 — Join */}
          <FadeInView delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl flex flex-col relative overflow-hidden"
              style={{
                backgroundColor: "#EEF6F5",
                border: "1px solid rgba(42,160,144,0.15)",
                padding: "28px",
              }}
            >
              {/* Decorative circle */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
                style={{ backgroundColor: "rgba(42,160,144,0.08)" }}
              />
              <div
                className="absolute -top-4 -right-4 w-28 h-28 rounded-full pointer-events-none"
                style={{ backgroundColor: "rgba(42,160,144,0.06)" }}
              />

              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10"
                style={{ backgroundColor: "#2AA090" }}
              >
                <Users size={22} color="#fff" />
              </div>

              {/* Subtitle */}
              <p
                className="italic text-sm mb-2 relative z-10"
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  color: "#2AA090",
                }}
              >
                {t("card1Subtitle")}
              </p>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl mb-5 md:mb-7 relative z-10"
                style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
              >
                {t("card1Title")}
              </h3>

              {/* Items */}
              <ul className="space-y-3 mb-7 md:mb-8 flex-1 relative z-10">
                {card1Items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 shrink-0">
                      <Check size={16} style={{ color: "#2AA090" }} />
                    </span>
                    <span style={{ color: "rgba(26,48,40,0.8)" }}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={openApplyModal}
                className="block w-full text-center py-3.5 rounded-full text-sm font-medium text-white transition-colors relative z-10 cursor-pointer"
                style={{ backgroundColor: "#E87030" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "#E87030")
                }
              >
                {t("card1Cta")}
              </button>
            </motion.div>
          </FadeInView>

          {/* Card 2 — Mentor */}
          <FadeInView delay={0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl flex flex-col relative overflow-hidden"
              style={{
                backgroundColor: "#FBF5E0",
                border: "1px solid rgba(232,168,64,0.3)",
                padding: "28px",
              }}
            >
              {/* Decorative circle */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
                style={{ backgroundColor: "rgba(196,128,16,0.08)" }}
              />
              <div
                className="absolute -top-4 -right-4 w-28 h-28 rounded-full pointer-events-none"
                style={{ backgroundColor: "rgba(196,128,16,0.06)" }}
              />

              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10"
                style={{ backgroundColor: "#E8A840" }}
              >
                <Compass size={22} color="#1A3028" />
              </div>

              {/* Subtitle */}
              <p
                className="italic text-sm mb-2 relative z-10"
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  color: "#C48010",
                }}
              >
                {t("card2Subtitle")}
              </p>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl mb-5 md:mb-7 relative z-10"
                style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
              >
                {t("card2Title")}
              </h3>

              {/* Items */}
              <ul className="space-y-3 mb-7 md:mb-8 flex-1 relative z-10">
                {card2Items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-0.5 shrink-0">
                      <Check size={16} style={{ color: "#C48010" }} />
                    </span>
                    <span style={{ color: "rgba(26,48,40,0.8)" }}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <a
                href="#"
                className="block w-full text-center py-3.5 rounded-full text-sm font-medium transition-colors relative z-10"
                style={{
                  border: "2px solid #1A3028",
                  color: "#1A3028",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.backgroundColor = "#1A3028";
                  el.style.color = "#FAF5EC";
                }}
                onMouseLeave={(e) => {
                  const el = e.target as HTMLElement;
                  el.style.backgroundColor = "transparent";
                  el.style.color = "#1A3028";
                }}
              >
                {t("card2Cta")}
              </a>
            </motion.div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
