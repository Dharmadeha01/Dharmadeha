"use client";

import { useTranslations } from "next-intl";
import { Lock, Heart, Hand, Star } from "lucide-react";
import FadeInView from "./FadeInView";
import type { SanityPrinciple } from "@/lib/sanity";

interface Principle {
  title: string;
  body: string;
}

const ICON_CONFIG = [
  { Icon: Lock,  iconColor: "#E8A840", bgColor: "rgba(232,168,64,0.2)"  },
  { Icon: Heart, iconColor: "#2AA090", bgColor: "rgba(42,160,144,0.2)"  },
  { Icon: Hand,  iconColor: "#E87030", bgColor: "rgba(232,112,48,0.2)"  },
  { Icon: Star,  iconColor: "#E8A840", bgColor: "rgba(232,168,64,0.2)"  },
];

export default function Principles({ sanityData }: { sanityData?: SanityPrinciple[] | null }) {
  const t = useTranslations("Principles");

  const principles: Principle[] = sanityData && sanityData.length > 0
    ? sanityData.map((p) => ({ title: p.title, body: p.body }))
    : (t.raw("principles") as Principle[]);

  return (
    <section style={{ backgroundColor: "#1A3028" }} className="py-10 md:py-16">
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

          <p
            className="text-base md:text-lg leading-relaxed mb-10 md:mb-14 max-w-2xl"
            style={{ color: "rgba(250,245,236,0.7)", fontFamily: "var(--font-dm-sans)" }}
          >
            {t("intro")}
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {principles.map((principle, i) => {
            const { Icon, iconColor, bgColor } = ICON_CONFIG[i] ?? ICON_CONFIG[0];
            return (
              <FadeInView key={i} delay={i * 0.08}>
                <div
                  className="rounded-2xl flex gap-6 transition-colors duration-200 cursor-default"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "32px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                  }}
                >
                  {/* Decorative number */}
                  <div
                    className="shrink-0 select-none leading-none"
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontSize: "72px",
                      color: "rgba(250,245,236,0.15)",
                      lineHeight: 0.85,
                      marginTop: "4px",
                    }}
                  >
                    {i + 1}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: bgColor }}
                    >
                      <Icon size={15} style={{ color: iconColor }} />
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-dm-serif)",
                        fontSize: "22px",
                        color: "#FAF5EC",
                        lineHeight: 1.2,
                      }}
                    >
                      {principle.title}
                    </h3>

                    <p
                      style={{
                        color: "rgba(250,245,236,0.65)",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "14px",
                        lineHeight: 1.6,
                      }}
                    >
                      {principle.body}
                    </p>
                  </div>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
