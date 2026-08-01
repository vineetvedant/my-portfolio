import { useEffect, useRef } from "react"
import "./CyberCursor.css"

export default function CyberCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const cursor = cursorRef.current
    if (!cursor) return
    document.body.classList.add("cyber-cursor-enabled")

    let frame = 0
    let currentX = window.innerWidth / 2
    let currentY = window.innerHeight / 2
    let targetX = currentX
    let targetY = currentY

    const render = () => {
      currentX += (targetX - currentX) * 0.34
      currentY += (targetY - currentY) * 0.34
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      cursor.classList.add("cyber-cursor--visible")
      cursor.classList.toggle("cyber-cursor--interactive", Boolean((event.target as Element | null)?.closest("a, button, input, textarea, [role='button']")))
    }
    const onDown = () => cursor.classList.add("cyber-cursor--pressed")
    const onUp = () => cursor.classList.remove("cyber-cursor--pressed")
    const onLeave = () => cursor.classList.remove("cyber-cursor--visible")

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerdown", onDown, { passive: true })
    window.addEventListener("pointerup", onUp, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      document.body.classList.remove("cyber-cursor-enabled")
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      document.documentElement.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div ref={cursorRef} className="cyber-cursor" aria-hidden="true">
      <img className="cyber-cursor__image" src="/cyber-mouse-cursor.png" alt="" draggable={false} />
    </div>
  )
}
