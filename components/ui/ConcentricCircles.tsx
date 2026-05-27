'use client'
import { motion, useReducedMotion } from 'framer-motion'

export function ConcentricCircles({ color, id }: { color: string; id: string }) {
  const shouldReduce = useReducedMotion()

  return (
    <svg
      viewBox="0 0 320 320"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '320px',
        height: '320px',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <defs>
        <radialGradient id={`fade-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="60" fill={`url(#fade-${id})`} />
      <circle cx="160" cy="160" r="90" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.5" />
      <circle cx="160" cy="160" r="120" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />

      {/* Outermost ring — slow rotation */}
      <motion.g
        style={{ transformOrigin: '160px 160px' }}
        animate={shouldReduce ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="160" cy="160" r="150" fill="none" stroke={color} strokeWidth="0.75" strokeOpacity="0.3" />
      </motion.g>

      <circle cx="310" cy="160" r="3" fill={color} fillOpacity="1" />
      <circle cx="160" cy="40" r="2" fill={color} fillOpacity="1" />
    </svg>
  )
}
