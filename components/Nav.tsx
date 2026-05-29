"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const shouldReduce = useReducedMotion();
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

  const ease = [0.25, 0.1, 0.25, 1] as const;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "#FAF5EC",
        borderBottom: scrolled ? "1px solid rgba(26,48,40,0.12)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 8px rgba(26,48,40,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between md:h-16 py-1 md:py-0">
        {/* Logo — fade in on load */}
        <motion.a
          href="#"
          aria-label="DharmaDeha home"
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0, ease }}
        >
          <span className="hidden lg:block">
            <DharmaDehaLockup size={42} />
          </span>
          <span className="block lg:hidden">
            <DharmaDehaLockup size={36} />
          </span>
        </motion.a>

        {/* Desktop nav — fade in */}
        <motion.div
          className="hidden md:flex items-center gap-6"
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
        >
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

          {/* Become a mentor */}
          <motion.button
            onClick={scrollToJoin}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="text-sm px-5 py-2 rounded-full font-medium cursor-pointer"
            style={{ backgroundColor: "#1A3028", color: "#FAF5EC" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#2B4A38")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#1A3028")
            }
          >
            {t("mentorCta")}
          </motion.button>

          {/* Join — ember */}
          <motion.button
            onClick={openApplyModal}
            whileHover={shouldReduce ? {} : { scale: 1.02 }}
            whileTap={shouldReduce ? {} : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="text-sm px-5 py-2 rounded-full text-white font-medium cursor-pointer"
            style={{ backgroundColor: "#E87030" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#d4612a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#E87030")
            }
          >
            {t("cta")}
          </motion.button>
        </motion.div>

        {/* Mobile: Join + Hamburger + inline language switcher */}
        <div className="md:hidden flex flex-col items-end gap-0.5">
          <div className="flex items-center gap-2 h-14">
            <motion.button
              onClick={openApplyModal}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="text-sm px-3 py-2 rounded-full text-white font-medium cursor-pointer"
              style={{ backgroundColor: "#E87030" }}
            >
              {t("ctaMobile")}
            </motion.button>
            <button
              className="p-1"
              style={{ color: "#1A3028" }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          {/* Language row — always visible on mobile */}
          <div className="flex items-center gap-0.5 pb-1 pr-0.5">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile menu — animated */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden px-6 py-5 flex flex-col gap-5"
            style={{
              backgroundColor: "#FAF5EC",
              borderTop: "1px solid rgba(26,48,40,0.08)",
            }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-base"
                style={{ color: "rgba(26,48,40,0.8)" }}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.05 + i * 0.05, ease: "easeOut" }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.2, ease: "easeOut" }}
            >
              <LanguageSwitcher />
            </motion.div>
            <motion.button
              className="text-sm px-5 py-3 rounded-full text-white font-medium text-center cursor-pointer"
              style={{ backgroundColor: "#E87030" }}
              onClick={() => { setMenuOpen(false); openApplyModal(); }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.25, ease: "easeOut" }}
            >
              {t("cta")}
            </motion.button>
            <motion.button
              className="text-sm px-5 py-3 rounded-full font-medium text-center cursor-pointer"
              style={{ backgroundColor: "#1A3028", color: "#FAF5EC" }}
              onClick={() => {
                setMenuOpen(false);
                const el = document.getElementById("join");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={shouldReduce ? {} : { scale: 1.02 }}
              whileTap={shouldReduce ? {} : { scale: 0.97 }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.3, ease: "easeOut" }}
            >
              {t("mentorCta")}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
