"use client";

import { useTranslations } from "next-intl";
import { Users, BookOpen } from "lucide-react";
import FadeInView from "./FadeInView";

export default function AboutProject() {
  const t = useTranslations("AboutProject");

  const satsangBullets = t.raw("satsangBullets") as string[];
  const educationBullets = t.raw("educationBullets") as string[];

  return (
    <section
      id="about-project"
      style={{ backgroundColor: "#FAF5EC" }}
      className="py-10 md:py-16"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* CARD 1 — SATSANG */}
          <FadeInView delay={0.05}>
            <div
              className="rounded-2xl h-full flex flex-col"
              style={{
                backgroundColor: "#fff",
                border: "0.5px solid rgba(26,48,40,0.1)",
                borderLeft: "3px solid #2AA090",
                padding: "36px 36px 28px",
              }}
            >
              {/* Decorative number */}
              <div
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: "64px",
                  color: "rgba(42,160,144,0.2)",
                  lineHeight: 1,
                  marginBottom: "16px",
                }}
              >
                50%
              </div>

              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(42,160,144,0.1)" }}
              >
                <Users size={28} style={{ color: "#2AA090" }} />
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
                {t("satsangTitle")}
              </h3>

              {/* Subtitle */}
              <p
                className="italic mb-5"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "16px",
                  color: "#2AA090",
                }}
              >
                {t("satsangSubtitle")}
              </p>

              {/* Divider */}
              <div
                style={{
                  borderTop: "1px solid rgba(26,48,40,0.1)",
                  marginBottom: "20px",
                }}
              />

              {/* Bullets */}
              <ul className="space-y-3 mb-6 flex-1">
                {satsangBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="shrink-0 rounded-full"
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#2AA090",
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
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(42,160,144,0.15)",
                    color: "#2AA090",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {t("everyMeeting")}
                </span>
              </div>
            </div>
          </FadeInView>

          {/* CARD 2 — EDUCATION */}
          <FadeInView delay={0.1}>
            <div
              className="rounded-2xl h-full flex flex-col"
              style={{
                backgroundColor: "#fff",
                border: "0.5px solid rgba(26,48,40,0.1)",
                borderLeft: "3px solid #E87030",
                padding: "36px 36px 28px",
              }}
            >
              {/* Decorative number */}
              <div
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: "64px",
                  color: "rgba(232,112,48,0.2)",
                  lineHeight: 1,
                  marginBottom: "16px",
                }}
              >
                50%
              </div>

              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: "rgba(232,112,48,0.1)" }}
              >
                <BookOpen size={28} style={{ color: "#E87030" }} />
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
                {t("educationTitle")}
              </h3>

              {/* Subtitle */}
              <p
                className="italic mb-5"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "16px",
                  color: "#E87030",
                }}
              >
                {t("educationSubtitle")}
              </p>

              {/* Divider */}
              <div
                style={{
                  borderTop: "1px solid rgba(26,48,40,0.1)",
                  marginBottom: "20px",
                }}
              />

              {/* Bullets */}
              <ul className="space-y-3 mb-6 flex-1">
                {educationBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="shrink-0 rounded-full"
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#E87030",
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
              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(232,112,48,0.15)",
                    color: "#E87030",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {t("everyMeeting")}
                </span>
              </div>
            </div>
          </FadeInView>
        </div>

        {/* THE PATH block */}
        <FadeInView delay={0.15}>
          <div
            className="rounded-2xl mt-12"
            style={{
              backgroundColor: "#1A3028",
              padding: "40px 40px 40px",
            }}
          >
            {/* Eyebrow */}
            <p
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "rgba(232,168,64,0.6)" }}
            >
              {t("pathEyebrow")}
            </p>

            {/* Title */}
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

            {/* Body */}
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

            {/* Timeline */}
            <div className="relative">
              {/* Desktop connector line behind circles */}
              <div
                className="hidden md:block absolute left-0 right-0"
                style={{
                  top: "24px",
                  height: "1px",
                  borderTop: "1px dashed rgba(250,245,236,0.25)",
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
                {[
                  {
                    num: "1",
                    bg: "#E8A840",
                    textColor: "#1A3028",
                    title: t("step1Title"),
                    body: t("step1Body"),
                  },
                  {
                    num: "2",
                    bg: "#2AA090",
                    textColor: "#ffffff",
                    title: t("step2Title"),
                    body: t("step2Body"),
                  },
                  {
                    num: "3",
                    bg: "#E87030",
                    textColor: "#ffffff",
                    title: t("step3Title"),
                    body: t("step3Body"),
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex md:flex-col gap-4 items-start"
                  >
                    {/* Number circle */}
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
