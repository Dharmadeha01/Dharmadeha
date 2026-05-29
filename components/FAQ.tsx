"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeInView from "./FadeInView";
import type { SanityFaq } from "@/lib/sanity";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ sanityData }: { sanityData?: SanityFaq[] | null }) {
  const t = useTranslations("FAQ");
  // Always use translation file — Sanity FAQ is English-only and would override locale
  const items: FAQItem[] = t.raw("items") as FAQItem[];

  return (
    <section id="faq" style={{ backgroundColor: "#FAF5EC" }} className="py-7 md:py-10">
      <div className="max-w-3xl mx-auto px-6">
        <FadeInView>
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4 md:mb-5"
            style={{ color: "#2AA090" }}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mb-10 md:mb-14">
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

        <FadeInView delay={0.1}>
          <Accordion className="space-y-2 md:space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-xl overflow-hidden px-5 md:px-6"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(26,48,40,0.08)",
                }}
              >
                <AccordionTrigger
                  className="text-left py-4 md:py-5 text-sm font-medium hover:no-underline"
                  style={{ color: "#1A3028" }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm leading-relaxed pb-4 md:pb-5"
                  style={{ color: "rgba(26,48,40,0.7)" }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInView>
      </div>
    </section>
  );
}
