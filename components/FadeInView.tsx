"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInView({
  children,
  delay = 0,
  className,
}: FadeInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
