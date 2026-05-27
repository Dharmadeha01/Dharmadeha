"use client";

import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import FadeInView from "./FadeInView";

export default function Video() {
  const t = useTranslations("Video");

  return (
    <section style={{ backgroundColor: "#FAF5EC" }} className="py-10 md:py-16">
      <div className="max-w-3xl mx-auto px-6">
        <FadeInView>
          <div className="text-center mb-8 md:mb-10">
            <h2>
              <span
                className="block"
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: "clamp(28px, 4vw, 48px)",
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
                  fontSize: "clamp(28px, 4vw, 48px)",
                  color: "#E87030",
                  lineHeight: 1.1,
                }}
              >
                {t("headline2")}
              </span>
            </h2>
            <p
              className="mt-4 text-sm md:text-base"
              style={{ color: "rgba(26,48,40,0.65)" }}
            >
              {t("caption")}
            </p>
          </div>

          {/* TODO: Replace with YouTube iframe embed when video is ready */}
          <div
            className="aspect-video rounded-2xl flex flex-col items-center justify-center gap-4 w-full"
            style={{ backgroundColor: "#1A3028" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(232,168,64,0.12)",
                border: "2px solid rgba(232,168,64,0.35)",
              }}
            >
              <Play
                size={26}
                style={{ color: "#E8A840", marginLeft: "3px" }}
              />
            </div>
            <p
              className="text-xs tracking-wide uppercase"
              style={{ color: "rgba(250,245,236,0.35)" }}
            >
              {t("soon")}
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
