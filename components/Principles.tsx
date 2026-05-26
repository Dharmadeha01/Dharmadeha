"use client";

import { useTranslations } from "next-intl";
import FadeInView from "./FadeInView";

interface Principle {
  title: string;
  body: string;
}

export default function Principles() {
  const t = useTranslations("Principles");
  const principles = t.raw("principles") as Principle[];

  return (
    <section style={{ backgroundColor: "#FAF5EC" }} className="py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#2AA090" }}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mb-5 md:mb-6">
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
            className="text-base md:text-lg leading-relaxed mb-10 md:mb-16 max-w-2xl"
            style={{ color: "rgba(26,48,40,0.7)" }}
          >
            {t("intro")}
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {principles.map((principle, i) => (
            <FadeInView key={i} delay={i * 0.08}>
              <div
                className="rounded-xl flex gap-5"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(26,48,40,0.1)",
                  padding: "28px",
                }}
              >
                {/* Number badge */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold"
                  style={{
                    backgroundColor: "#E8A840",
                    color: "#1A3028",
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "16px",
                  }}
                >
                  {i + 1}
                </div>

                <div>
                  <h3
                    className="text-lg mb-2"
                    style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
                  >
                    {principle.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(26,48,40,0.7)" }}
                  >
                    {principle.body}
                  </p>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
