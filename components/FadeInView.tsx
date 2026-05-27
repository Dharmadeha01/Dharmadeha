"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInView({ children, delay = 0, className }: FadeInViewProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
