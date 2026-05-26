"use client";

import { useTranslations } from "next-intl";
import { BookOpen, Users, Sparkles } from "lucide-react";
import FadeInView from "./FadeInView";

export default function AboutProject() {
  const t = useTranslations("AboutProject");

  const cards = [
    {
      icon: BookOpen,
      iconColor: "#2AA090",
      bg: "#EEF6F5",
      border: "rgba(42,160,144,0.15)",
      title: t("card1Title"),
      body: t("card1Body"),
    },
    {
      icon: Users,
      iconColor: "#E87030",
      bg: "#FEF3E8",
      border: "rgba(232,112,48,0.15)",
      title: t("card2Title"),
      body: t("card2Body"),
    },
    {
      icon: Sparkles,
      iconColor: "#C48010",
      bg: "#FBF5E0",
      border: "rgba(232,168,64,0.3)",
      title: t("card3Title"),
      body: t("card3Body"),
    },
  ];

  return (
    <section
      id="about-project"
      style={{ backgroundColor: "#FAF5EC" }}
      className="py-12 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#2AA090" }}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mb-6 md:mb-8">
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

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <FadeInView key={card.title} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-7 md:p-8 h-full"
                  style={{
                    backgroundColor: card.bg,
                    border: `1px solid ${card.border}`,
                  }}
                >
                  <div className="mb-4 md:mb-5">
                    <Icon size={24} style={{ color: card.iconColor }} />
                  </div>
                  <h3
                    className="text-lg md:text-xl mb-3"
                    style={{ fontFamily: "var(--font-dm-serif)", color: "#1A3028" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(26,48,40,0.7)" }}
                  >
                    {card.body}
                  </p>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
