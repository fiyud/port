'use client'

import { useEffect, useRef, useState } from 'react'

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________'

interface DecryptedTextProps {
  text: string
  className?: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  /** Milliseconds between each scramble tick. */
  speed?: number
  /** How many characters (from the left) resolve on each tick. */
  revealPerTick?: number
  /** Delay before the animation starts, in ms. */
  delay?: number
  /** Only animate once the element scrolls into view. */
  triggerOnView?: boolean
}

export function DecryptedText({
  text,
  className,
  as = 'span',
  speed = 35,
  revealPerTick = 1,
  delay = 0,
  triggerOnView = true,
}: DecryptedTextProps) {
  const [display, setDisplay] = useState(text)
  const [started, setStarted] = useState(!triggerOnView)
  const ref = useRef<HTMLElement | null>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!triggerOnView) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setStarted(true)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [triggerOnView])

  useEffect(() => {
    if (!started || hasAnimated.current) return
    hasAnimated.current = true

    let revealed = 0
    let tickHandle: ReturnType<typeof setInterval>
    const startTimeout = setTimeout(() => {
      tickHandle = setInterval(() => {
        revealed += revealPerTick
        if (revealed >= text.length) {
          setDisplay(text)
          clearInterval(tickHandle)
          return
        }
        const resolvedPart = text.slice(0, revealed)
        const scrambledPart = text
          .slice(revealed)
          .split('')
          .map((ch) =>
            ch === ' '
              ? ' '
              : DEFAULT_CHARS[Math.floor(Math.random() * DEFAULT_CHARS.length)],
          )
          .join('')
        setDisplay(resolvedPart + scrambledPart)
      }, speed)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      clearInterval(tickHandle)
    }
  }, [started, text, speed, revealPerTick, delay])

  const Tag = as
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      aria-label={text}
    >
      {display}
    </Tag>
  )
}
