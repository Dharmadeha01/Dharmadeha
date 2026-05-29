"use client";

import { useTranslations } from "next-intl";
import FadeInView from "./FadeInView";
import type { SanityTestimonial } from "@/lib/sanity";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

interface Quote {
  text: string;
  author: string;
  role: string;
}

export default function Voices({ sanityData }: { sanityData?: SanityTestimonial[] | null }) {
  const t = useTranslations("Voices");
  const fallbackQuotes = t.raw("quotes") as Quote[];
  const quotes: Quote[] = sanityData && sanityData.length > 0
    ? sanityData.map((item) => ({ text: item.quote, author: item.name, role: item.role ?? "" }))
    : fallbackQuotes;

  return (
    <section style={{ backgroundColor: "#EEF6F5" }} className="py-7 md:py-10">
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

        {/* Mobile: swipe carousel */}
        <div className="md:hidden">
          <TestimonialsCarousel
            testimonials={quotes.map((q, i) => ({
              _id: String(i),
              text: q.text,
              author: q.author,
              role: q.role,
            }))}
          />
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 md:gap-6">
          {quotes.map((quote, i) => (
            <FadeInView key={i} delay={i * 0.1}>
              <div
                className="rounded-2xl p-6 md:p-8 flex flex-col h-full overflow-hidden"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 6px rgba(26,48,40,0.06)",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                <p
                  className="text-base leading-relaxed mb-5 flex-1 italic line-clamp-6"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    color: "rgba(26,48,40,0.82)",
                  }}
                >
                  &ldquo;{quote.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#1A3028" }}>
                    — {quote.author}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(26,48,40,0.5)" }}>
                    {quote.role}
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
