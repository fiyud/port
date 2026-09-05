'use client'

import { useEffect, useRef } from 'react'

/**
 * Full-viewport canvas of dots that drift and brighten near the pointer.
 * Pure black & white — dot opacity is the only variable, no color.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let dots: {
      x: number
      y: number
      baseOpacity: number
      phase: number
    }[] = []

    const pointer = { x: -9999, y: -9999, active: false }
    const GAP = 34
    const RADIUS = 1.1
    const INFLUENCE = 170

    function resize() {
      if (!canvas) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.scale(dpr, dpr)

      dots = []
      const cols = Math.ceil(width / GAP) + 1
      const rows = Math.ceil(height / GAP) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * GAP,
            y: j * GAP,
            baseOpacity: 0.08 + Math.random() * 0.1,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }

    function onPointerLeave() {
      pointer.active = false
    }

    let raf = 0
    let t = 0

    function draw() {
      if (!ctx) return
      t += 0.008
      ctx.clearRect(0, 0, width, height)

      for (const dot of dots) {
        let opacity = dot.baseOpacity + Math.sin(t + dot.phase) * 0.03

        if (pointer.active) {
          const dx = dot.x - pointer.x
          const dy = dot.y - pointer.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < INFLUENCE) {
            const strength = 1 - dist / INFLUENCE
            opacity = Math.min(1, opacity + strength * 0.85)
          }
        }

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${opacity})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
