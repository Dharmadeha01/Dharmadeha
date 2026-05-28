"use client";

import { useTranslations } from "next-intl";
import { Camera, PlayCircle, Send } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");

  const links = [
    { key: "about", href: "#about" },
    { key: "courses", href: "#courses" },
    { key: "faq", href: "#faq" },
    { key: "contact", href: "#contact" },
  ] as const;

  return (
    <footer
      style={{
        backgroundColor: "#1A3028",
        borderTop: "1px solid rgba(250,245,236,0.08)",
      }}
      className="py-7"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-7 mb-8">
          {/* Wordmark */}
          <span
            className="text-xl"
            style={{ fontFamily: "var(--font-dm-serif)", color: "#FAF5EC" }}
          >
            DharmaDeha
          </span>

          {/* Links */}
          <div className="flex flex-wrap gap-6 justify-center">
            {links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm transition-colors"
                style={{ color: "rgba(250,245,236,0.55)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#FAF5EC")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(250,245,236,0.55)")
                }
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex gap-4 items-center">
            {[
              { Icon: Camera, label: "Instagram" },
              { Icon: PlayCircle, label: "YouTube" },
              { Icon: Send, label: "Telegram" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="transition-colors"
                style={{ color: "rgba(250,245,236,0.55)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#FAF5EC")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(250,245,236,0.55)")
                }
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div
          className="text-center text-sm pt-6"
          style={{
            color: "rgba(250,245,236,0.28)",
            borderTop: "1px solid rgba(250,245,236,0.08)",
          }}
        >
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
