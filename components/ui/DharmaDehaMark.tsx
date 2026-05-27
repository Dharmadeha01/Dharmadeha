'use client'
import { motion, useReducedMotion } from 'framer-motion'

export function DharmaDehaMark({
  size = 40,
  ember = '#E87030',
  deep = '#1A3028',
  ...rest
}: {
  size?: number
  ember?: string
  deep?: string
  [key: string]: any
}) {
  const shouldReduce = useReducedMotion()

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="DharmaDeha"
      initial={shouldReduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
      {...rest}
    >
      <circle cx="50" cy="50" r="44" fill="none" stroke={deep} strokeWidth="2" />
      <circle cx="38" cy="38" r="13" fill={ember} />
      <circle cx="62" cy="38" r="13" fill={ember} fillOpacity="0.7" />
      <circle cx="38" cy="62" r="13" fill={ember} fillOpacity="0.55" />
      <circle cx="62" cy="62" r="13" fill={deep} />
    </motion.svg>
  )
}

export function DharmaDehaLockup({
  size = 40,
  ember = '#E87030',
  deep = '#1A3028',
  className,
}: {
  size?: number
  ember?: string
  deep?: string
  className?: string
}) {
  return (
    <div
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.22 }}
    >
      <DharmaDehaMark size={size} ember={ember} deep={deep} />
      <span
        style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontWeight: 400,
          fontSize: size * 0.55,
          letterSpacing: '-0.01em',
          color: deep,
          lineHeight: 1,
        }}
      >
        DharmaDeha
      </span>
    </div>
  )
}
