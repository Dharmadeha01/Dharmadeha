"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface CarouselTestimonial {
  _id: string;
  text: string;
  author: string;
  role: string;
}

const ITEMS_PER_PAGE = 3;

export function TestimonialsCarousel({ testimonials }: { testimonials: CarouselTestimonial[] }) {
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const startX = useRef(0);

  const currentItems = testimonials.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  function goTo(newPage: number, dir: number) {
    if (newPage < 0 || newPage >= totalPages) return;
    setDirection(dir);
    setPage(newPage);
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-3"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={(_, info) => { startX.current = info.point.x; }}
          onDragEnd={(_, info) => {
            const diff = info.offset.x;
            if (diff < -50) goTo(page + 1, 1);
            else if (diff > 50) goTo(page - 1, -1);
          }}
        >
          {currentItems.map((t) => (
            <div
              key={t._id}
              className="rounded-2xl p-4 overflow-hidden"
              style={{
                backgroundColor: "#fff",
                boxShadow: "0 1px 6px rgba(26,48,40,0.06)",
                touchAction: "pan-y",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              <p
                className="text-[15px] leading-relaxed italic mb-3 line-clamp-4"
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  color: "rgba(26,48,40,0.82)",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-sm font-medium" style={{ color: "#1A3028" }}>
                — {t.author}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(26,48,40,0.5)" }}>
                {t.role}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > page ? 1 : -1)}
              aria-label={`Page ${i + 1}`}
              style={{
                width: i === page ? "16px" : "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: i === page ? "#E87030" : "rgba(26,48,40,0.2)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
