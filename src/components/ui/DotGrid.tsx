import { CSSProperties, useCallback, useEffect, useMemo, useRef } from "react"
import { gsap } from "gsap"
import { InertiaPlugin } from "gsap/InertiaPlugin"
import "./DotGrid.css"

gsap.registerPlugin(InertiaPlugin)

type Dot = { cx: number; cy: number; xOffset: number; yOffset: number; active: boolean }

interface DotGridProps {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  speedTrigger?: number
  shockRadius?: number
  shockStrength?: number
  maxSpeed?: number
  resistance?: number
  returnDuration?: number
  className?: string
  style?: CSSProperties
}

const hexToRgb = (hex: string) => {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  return match
    ? { r: parseInt(match[1], 16), g: parseInt(match[2], 16), b: parseInt(match[3], 16) }
    : { r: 0, g: 0, b: 0 }
}

export default function DotGrid({
  dotSize = 3,
  gap = 25,
  baseColor = "#164e63",
  activeColor = "#00f2fe",
  proximity = 140,
  speedTrigger = 100,
  shockRadius = 220,
  shockStrength = 4,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const pointerRef = useRef({ x: -1000, y: -1000, lastX: 0, lastY: 0, lastTime: 0 })
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return
    const { width, height } = wrapper.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    const cell = dotSize + gap
    const cols = Math.floor((width + gap) / cell)
    const rows = Math.floor((height + gap) / cell)
    const startX = (width - (cell * cols - gap)) / 2 + dotSize / 2
    const startY = (height - (cell * rows - gap)) / 2 + dotSize / 2
    dotsRef.current = Array.from({ length: rows * cols }, (_, index) => ({
      cx: startX + (index % cols) * cell,
      cy: startY + Math.floor(index / cols) * cell,
      xOffset: 0,
      yOffset: 0,
      active: false,
    }))
  }, [dotSize, gap])

  useEffect(() => {
    buildGrid()
    const observer = new ResizeObserver(buildGrid)
    if (wrapperRef.current) observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [buildGrid])

  useEffect(() => {
    let frame = 0
    const draw = () => {
      const canvas = canvasRef.current
      const context = canvas?.getContext("2d")
      if (!canvas || !context) return
      const dpr = window.devicePixelRatio || 1
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - pointerRef.current.x, dot.cy - pointerRef.current.y)
        const amount = Math.max(0, 1 - distance / proximity)
        const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * amount)
        const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * amount)
        const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * amount)
        context.beginPath()
        context.arc(dot.cx + dot.xOffset, dot.cy + dot.yOffset, dotSize / 2, 0, Math.PI * 2)
        context.fillStyle = `rgb(${r}, ${g}, ${b})`
        context.fill()
      }
      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [activeRgb, baseRgb, dotSize, proximity])

  useEffect(() => {
    const pushDot = (dot: Dot, x: number, y: number, strength: number) => {
      if (dot.active) return
      dot.active = true
      gsap.killTweensOf(dot)
      gsap.to(dot, {
        inertia: { xOffset: x, yOffset: y, resistance },
        onComplete: () => gsap.to(dot, {
          xOffset: 0, yOffset: 0, duration: returnDuration, ease: "elastic.out(1, .75)",
          onComplete: () => { dot.active = false },
        }),
      })
    }

    const onMove = (event: PointerEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const now = performance.now()
      const pointer = pointerRef.current
      const elapsed = Math.max(16, now - pointer.lastTime)
      const vx = Math.max(-maxSpeed, Math.min(maxSpeed, ((event.clientX - pointer.lastX) / elapsed) * 1000))
      const vy = Math.max(-maxSpeed, Math.min(maxSpeed, ((event.clientY - pointer.lastY) / elapsed) * 1000))
      const speed = Math.hypot(vx, vy)
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.lastX = event.clientX
      pointer.lastY = event.clientY
      pointer.lastTime = now
      if (speed > speedTrigger) {
        dotsRef.current.forEach((dot) => {
          if (Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y) < proximity) {
            pushDot(dot, (dot.cx - pointer.x) + vx * .005, (dot.cy - pointer.y) + vy * .005, 1)
          }
        })
      }
    }

    const onClick = (event: PointerEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      dotsRef.current.forEach((dot) => {
        const distance = Math.hypot(dot.cx - x, dot.cy - y)
        if (distance < shockRadius) {
          const falloff = 1 - distance / shockRadius
          pushDot(dot, (dot.cx - x) * shockStrength * falloff, (dot.cy - y) * shockStrength * falloff, falloff)
        }
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onClick, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onClick)
      dotsRef.current.forEach((dot) => gsap.killTweensOf(dot))
    }
  }, [maxSpeed, proximity, resistance, returnDuration, shockRadius, shockStrength, speedTrigger])

  return (
    <div className={`dot-grid ${className}`} style={style} aria-hidden="true">
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </div>
  )
}
