"use client";

import { useTranslations } from "next-intl";
import FadeInView from "./FadeInView";
import type { SanityVideoSection } from "@/lib/sanity";

const FALLBACK_VIDEO_ID = "5BcRI87s8q4";

export default function Video({ sanityData }: { sanityData?: SanityVideoSection | null }) {
  const t = useTranslations("Video");
  const youtubeId = sanityData?.youtubeId || FALLBACK_VIDEO_ID;

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

          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '1rem', overflow: 'hidden', backgroundColor: '#1A3028' }}>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&color=white`}
              title="DharmaDeha — invitation video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '1rem',
              }}
            />
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
