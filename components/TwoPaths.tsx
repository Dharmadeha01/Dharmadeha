"use client";

import { useTranslations } from "next-intl";
import { Users, Compass } from "lucide-react";
import FadeInView from "./FadeInView";

function openApplyModal() {
  window.dispatchEvent(new CustomEvent("open-apply-modal"));
}

function ConcentricCircles({ color }: { color: string }) {
  const rings = [
    { size: 80, opacity: 0.4 },
    { size: 144, opacity: 0.3 },
    { size: 208, opacity: 0.2 },
    { size: 288, opacity: 0.1 },
  ];
  return (
    <>
      {rings.map(({ size, opacity }, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1.5px solid ${color}`,
            right: -60,
            bottom: -60,
            opacity,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}
    </>
  );
}

export default function TwoPaths() {
  const t = useTranslations("TwoPaths");
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

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 — Join */}
          <FadeInView delay={0.1}>
            <div
              className="relative overflow-hidden rounded-2xl flex flex-col p-7 md:p-10"
              style={{
                backgroundColor: "rgba(42,160,144,0.08)",
                border: "1px solid rgba(42,160,144,0.2)",
              }}
            >
              <ConcentricCircles color="#2AA090" />

              {/* All content above circles */}
              <div className="relative flex flex-col flex-1" style={{ zIndex: 10 }}>
                {/* Top pill */}
                <span
                  className="inline-block self-start px-3 py-1 rounded-full text-xs font-medium mb-5"
                  style={{
                    backgroundColor: "rgba(42,160,144,0.1)",
                    color: "#2AA090",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {t("card1Pill")}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#2AA090" }}
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
                <div
                  style={{
                    borderTop: "1px solid rgba(26,48,40,0.1)",
                    marginBottom: "20px",
                  }}
                />

                {/* Bullets */}
                <ul className="space-y-3 mb-7 flex-1">
                  {card1Items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <div
                        className="shrink-0 rounded-full"
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: "#2AA090",
                          marginTop: "8px",
                        }}
                      />
                      <span style={{ color: "rgba(26,48,40,0.8)", fontFamily: "var(--font-dm-sans)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button — ember */}
                <button
                  onClick={openApplyModal}
                  className="w-full text-center py-3.5 rounded-full text-sm font-medium text-white transition-colors cursor-pointer"
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
              </div>
            </div>
          </FadeInView>

          {/* Card 2 — Mentor */}
          <FadeInView delay={0.2}>
            <div
              className="relative overflow-hidden rounded-2xl flex flex-col p-7 md:p-10"
              style={{
                backgroundColor: "rgba(232,112,48,0.08)",
                border: "1px solid rgba(232,112,48,0.2)",
              }}
            >
              <ConcentricCircles color="#E87030" />

              {/* All content above circles */}
              <div className="relative flex flex-col flex-1" style={{ zIndex: 10 }}>
                {/* Top pill */}
                <span
                  className="inline-block self-start px-3 py-1 rounded-full text-xs font-medium mb-5"
                  style={{
                    backgroundColor: "rgba(232,112,48,0.1)",
                    color: "#E87030",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {t("card2Pill")}
                </span>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#E87030" }}
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
                <div
                  style={{
                    borderTop: "1px solid rgba(26,48,40,0.1)",
                    marginBottom: "20px",
                  }}
                />

                {/* Bullets */}
                <ul className="space-y-3 mb-7 flex-1">
                  {card2Items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <div
                        className="shrink-0 rounded-full"
                        style={{
                          width: "6px",
                          height: "6px",
                          backgroundColor: "#E87030",
                          marginTop: "8px",
                        }}
                      />
                      <span style={{ color: "rgba(26,48,40,0.8)", fontFamily: "var(--font-dm-sans)" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button — outline */}
                <button
                  className="w-full text-center py-3.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    border: "1.5px solid #1A3028",
                    color: "#1A3028",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#1A3028";
                    (e.currentTarget as HTMLElement).style.color = "#FAF5EC";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#1A3028";
                  }}
                >
                  {t("card2Cta")}
                </button>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
