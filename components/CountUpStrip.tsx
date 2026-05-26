"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import type { Stats } from "@/lib/airtable";

function CountUp({ target, started }: { target: number; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const startTime = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return <>{count}</>;
}

export default function CountUpStrip({ stats }: { stats: Stats }) {
  const t = useTranslations("Hero");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const items = [
    { value: stats.people, label: t("statsPeople") },
    { value: stats.dharmaDehas, label: t("statsDharmaDehas") },
    { value: stats.mentors, label: t("statsMentors") },
    { value: stats.countries, label: t("statsCountries") },
  ];

  return (
    <div ref={ref} style={{ backgroundColor: "#1A3028" }} className="py-10 md:py-14">
      <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
        {items.map((item) => (
          <div key={item.label}>
            <div
              className="text-4xl md:text-5xl lg:text-6xl mb-1.5 tabular-nums"
              style={{
                fontFamily: "var(--font-dm-serif)",
                color: "#E8A840",
                letterSpacing: "-0.02em",
              }}
            >
              <CountUp target={item.value} started={isInView} />
            </div>
            <div
              className="text-[10px] md:text-xs uppercase tracking-widest"
              style={{ color: "rgba(250,245,236,0.6)" }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
