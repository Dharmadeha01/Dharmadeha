"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

const localeLabels: Record<string, string> = {
  ru: "RU",
  en: "EN",
  uk: "UK",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="flex items-center gap-1" style={{ opacity: isPending ? 0.6 : 1 }}>
      {(["ru", "en", "uk"] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className="text-xs font-medium px-1.5 py-0.5 rounded transition-colors"
          style={{
            color:
              locale === loc
                ? "#E87030"
                : "rgba(26,48,40,0.5)",
            fontWeight: locale === loc ? 600 : 400,
          }}
          onMouseEnter={(e) => {
            if (locale !== loc)
              (e.currentTarget as HTMLElement).style.color = "#1A3028";
          }}
          onMouseLeave={(e) => {
            if (locale !== loc)
              (e.currentTarget as HTMLElement).style.color = "rgba(26,48,40,0.5)";
          }}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
