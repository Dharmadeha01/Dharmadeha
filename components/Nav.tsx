"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { DharmaDehaLockup } from "@/components/ui/DharmaDehaMark";

function openApplyModal() {
  window.dispatchEvent(new CustomEvent("open-apply-modal"));
}

function scrollToJoin(e: React.MouseEvent) {
  e.preventDefault();
  const el = document.getElementById("join");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: t("about"), href: "#about" },
    { label: t("courses"), href: "#courses" },
    { label: t("faq"), href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "#FAF5EC",
        borderBottom: scrolled ? "1px solid rgba(26,48,40,0.12)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 8px rgba(26,48,40,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark — responsive size */}
        <a href="#" aria-label="DharmaDeha home">
          <span className="hidden lg:block">
            <DharmaDehaLockup size={42} />
          </span>
          <span className="block lg:hidden">
            <DharmaDehaLockup size={36} />
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm lg:text-base transition-colors"
              style={{ color: "rgba(26,48,40,0.75)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#1A3028")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(26,48,40,0.75)")
              }
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher />

          {/* Become a mentor button — Deep bg, ivory text */}
          <button
            onClick={scrollToJoin}
            className="text-sm px-5 py-2 rounded-full font-medium transition-colors cursor-pointer"
            style={{ backgroundColor: "#1A3028", color: "#FAF5EC" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#2B4A38")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#1A3028")
            }
          >
            {t("mentorCta")}
          </button>

          {/* Join a DharmaDeha button — Ember */}
          <button
            onClick={openApplyModal}
            className="text-sm px-5 py-2 rounded-full text-white font-medium transition-colors cursor-pointer"
            style={{ backgroundColor: "#E87030" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#E87030")
            }
          >
            {t("cta")}
          </button>
        </div>

        {/* Mobile: sticky Join button + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={openApplyModal}
            className="text-sm px-3 py-2 rounded-full text-white font-medium cursor-pointer"
            style={{ backgroundColor: "#E87030" }}
          >
            {t("cta")}
          </button>
          <button
            className="p-1"
            style={{ color: "#1A3028" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-5 flex flex-col gap-5"
          style={{
            backgroundColor: "#FAF5EC",
            borderTop: "1px solid rgba(26,48,40,0.08)",
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base"
              style={{ color: "rgba(26,48,40,0.8)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
          {/* Join button */}
          <button
            className="text-sm px-5 py-3 rounded-full text-white font-medium text-center cursor-pointer"
            style={{ backgroundColor: "#E87030" }}
            onClick={() => { setMenuOpen(false); openApplyModal(); }}
          >
            {t("cta")}
          </button>
          {/* Become a mentor button */}
          <button
            className="text-sm px-5 py-3 rounded-full font-medium text-center cursor-pointer"
            style={{ backgroundColor: "#1A3028", color: "#FAF5EC" }}
            onClick={() => {
              setMenuOpen(false);
              const el = document.getElementById("join");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("mentorCta")}
          </button>
        </div>
      )}
    </nav>
  );
}
