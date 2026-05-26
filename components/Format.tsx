"use client";

import { useTranslations } from "next-intl";
import FadeInView from "./FadeInView";

interface Step {
  name: string;
  duration: string;
  description: string;
}

export default function Format() {
  const t = useTranslations("Format");
  const steps = t.raw("steps") as Step[];

  return (
    <section id="about" style={{ backgroundColor: "#1A3028" }} className="py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#E8A840" }}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mb-10 md:mb-16">
            <span
              className="block"
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                color: "#FAF5EC",
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
                color: "#E8A840",
                lineHeight: 1.1,
              }}
            >
              {t("headline2")}
            </span>
          </h2>
        </FadeInView>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:flex gap-0 relative">
          <div
            className="absolute top-8 left-8 right-8 h-px"
            style={{ backgroundColor: "rgba(250,245,236,0.15)" }}
          />
          {steps.map((step, i) => (
            <FadeInView key={i} delay={i * 0.1} className="flex-1 px-3">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-6 relative z-10"
                  style={{
                    backgroundColor: "#E8A840",
                    color: "#1A3028",
                    fontFamily: "var(--font-dm-serif)",
                  }}
                >
                  {i + 1}
                </div>
                <h3
                  className="text-base mb-1"
                  style={{ fontFamily: "var(--font-dm-serif)", color: "#FAF5EC" }}
                >
                  {step.name}
                </h3>
                <p className="text-xs font-medium mb-2" style={{ color: "#E8A840" }}>
                  {step.duration}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(250,245,236,0.55)" }}
                >
                  {step.description}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden flex flex-col gap-5 relative pl-1">
          <div
            className="absolute top-6 bottom-6 left-6 w-px"
            style={{ backgroundColor: "rgba(250,245,236,0.15)" }}
          />
          {steps.map((step, i) => (
            <FadeInView key={i} delay={i * 0.08}>
              <div className="flex gap-4 items-start">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold shrink-0 relative z-10"
                  style={{
                    backgroundColor: "#E8A840",
                    color: "#1A3028",
                    fontFamily: "var(--font-dm-serif)",
                  }}
                >
                  {i + 1}
                </div>
                <div className="pt-2">
                  <h3
                    className="text-sm mb-0.5"
                    style={{ fontFamily: "var(--font-dm-serif)", color: "#FAF5EC" }}
                  >
                    {step.name}
                  </h3>
                  <p className="text-xs font-medium mb-1" style={{ color: "#E8A840" }}>
                    {step.duration}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(250,245,236,0.55)" }}
                  >
                    {step.description}
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
