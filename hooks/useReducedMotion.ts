'use client'
import { useReducedMotion } from 'framer-motion'

/** Returns true if the user has requested reduced motion via OS/browser settings. */
export function useReducedMotionPref(): boolean {
  return useReducedMotion() ?? false
}
