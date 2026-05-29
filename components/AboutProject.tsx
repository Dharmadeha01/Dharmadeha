"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Users, BookOpen } from "lucide-react";
import FadeInView from "./FadeInView";
import { ConcentricCircles } from "./ui/ConcentricCircles";

const cardVariants = {
  rest: { y: 0 },
  hovered: { y: -6 },
};
const circlesVariants = {
  rest: { scale: 1 },
  hovered: { scale: 1.08 },
};

interface CardProps {
  accentColor: string;
  accentRgba: string;
  circleId: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bullets: string[];
  badge: string;
  shouldReduce: boolean;
}

function Card({
  accentColor,
  accentRgba,
  circleId,
  icon,
  title,
  subtitle,
  bullets,
  badge,
  shouldReduce,
}: CardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-7 md:p-10 flex flex-col h-full"
      style={{ backgroundColor: "#fff", border: "1px solid rgba(26,48,40,0.08)" }}
      variants={cardVariants}
      initial="rest"
      whileHover={shouldReduce ? "rest" : "hovered"}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Circles — scale on card hover */}
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
        <ConcentricCircles color={accentColor} id={circleId} />
      </motion.div>

      {/* Content */}
      <div className="relative flex flex-col flex-1" style={{ zIndex: 10 }}>
        {/* Decorative 50% */}
        <div
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "68px",
            color: accentRgba,
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          50%
        </div>

        {/* Icon circle */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: accentColor, marginBottom: "16px" }}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "32px",
            color: "#1A3028",
            lineHeight: 1.2,
            marginBottom: "4px",
          }}
        >
          {title}
        </h3>

        {/* Subtitle */}
        <p
          className="italic"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "16px",
            color: accentColor,
          }}
        >
          {subtitle}
        </p>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(26,48,40,0.1)", margin: "20px 0" }} />

        {/* Bullets */}
        <ul className="space-y-3 flex-1 flex flex-col">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className="shrink-0 rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: accentColor,
                  marginTop: "8px",
                }}
              />
              <span
                style={{
                  color: "rgba(26,48,40,0.75)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        {/* Badge */}
        <div className="mt-auto pt-6">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${accentColor}1A`,
              color: accentColor,
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {badge}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutProject() {
  const t = useTranslations("AboutProject");
  const shouldReduce = useReducedMotion() ?? false;

  const satsangBullets = t.raw("satsangBullets") as string[];
  const educationBullets = t.raw("educationBullets") as string[];

  return (
    <section
      id="about-project"
      style={{ backgroundColor: "#FAF5EC" }}
      className="py-7 md:py-10"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#2AA090" }}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mb-4 md:mb-6">
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
          <p
            className="text-base md:text-lg leading-relaxed mb-10 md:mb-14 max-w-2xl"
            style={{ color: "rgba(26,48,40,0.7)" }}
          >
            {t("intro")}
          </p>
        </FadeInView>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <FadeInView delay={0.1} className="h-full flex flex-col">
            <Card
              accentColor="#2AA090"
              accentRgba="rgba(42,160,144,0.2)"
              circleId="teal"
              icon={<Users size={22} color="#fff" />}
              title={t("satsangTitle")}
              subtitle={t("satsangSubtitle")}
              bullets={satsangBullets}
              badge={t("everyMeeting")}
              shouldReduce={shouldReduce}
            />
          </FadeInView>

          <FadeInView delay={0.18} className="h-full flex flex-col">
            <Card
              accentColor="#E87030"
              accentRgba="rgba(232,112,48,0.2)"
              circleId="ember"
              icon={<BookOpen size={22} color="#fff" />}
              title={t("educationTitle")}
              subtitle={t("educationSubtitle")}
              bullets={educationBullets}
              badge={t("everyMeeting")}
              shouldReduce={shouldReduce}
            />
          </FadeInView>
        </div>

        {/* THE PATH block */}
        <FadeInView delay={0.15}>
          <div
            className="rounded-2xl mt-12"
            style={{
              backgroundColor: "#1A3028",
              padding: "40px",
            }}
          >
            <p
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "rgba(232,168,64,0.6)" }}
            >
              {t("pathEyebrow")}
            </p>

            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "28px",
                color: "#FAF5EC",
                lineHeight: 1.2,
              }}
            >
              {t("pathTitle")}
            </h3>

            <p
              className="mb-10 md:mb-12"
              style={{
                color: "rgba(250,245,236,0.7)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "15px",
                lineHeight: 1.6,
              }}
            >
              {t("pathBody")}
            </p>

            <div className="relative">
              <div
                className="hidden md:block absolute left-0 right-0"
                style={{
                  top: "24px",
                  height: "1px",
                  borderTop: "1px dashed rgba(250,245,236,0.25)",
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { num: "1", bg: "#E8A840", textColor: "#1A3028", title: t("step1Title"), body: t("step1Body") },
                  { num: "2", bg: "#2AA090", textColor: "#ffffff", title: t("step2Title"), body: t("step2Body") },
                  { num: "3", bg: "#E87030", textColor: "#ffffff", title: t("step3Title"), body: t("step3Body") },
                ].map((step, i) => (
                  <div key={i} className="flex md:flex-col gap-4 items-start">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative z-10"
                      style={{
                        backgroundColor: step.bg,
                        color: step.textColor,
                        fontFamily: "var(--font-dm-serif)",
                        fontSize: "20px",
                      }}
                    >
                      {step.num}
                    </div>
                    <div className="pt-1 md:pt-0">
                      <h4
                        className="mb-1"
                        style={{
                          fontFamily: "var(--font-dm-serif)",
                          fontSize: "20px",
                          color: "#FAF5EC",
                          lineHeight: 1.3,
                        }}
                      >
                        {step.title}
                      </h4>
                      <p
                        style={{
                          color: "rgba(250,245,236,0.65)",
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "13px",
                          lineHeight: 1.6,
                        }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
