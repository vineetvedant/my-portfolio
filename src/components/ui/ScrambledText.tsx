import { CSSProperties, ReactNode, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"
import "./ScrambledText.css"

gsap.registerPlugin(SplitText, ScrambleTextPlugin)

interface ScrambledTextProps {
  radius?: number
  duration?: number
  speed?: number
  scrambleChars?: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  autoScramble?: boolean
}

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  autoScramble = false,
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const paragraph = rootRef.current?.querySelector("p")
    if (!paragraph) return

    const split = SplitText.create(paragraph, { type: "chars", charsClass: "char" })
    const chars = split.chars as HTMLElement[]

    chars.forEach((char) => {
      gsap.set(char, { display: "inline-block", attr: { "data-content": char.innerHTML } })
    })

    if (autoScramble) {
      chars.forEach((char, index) => {
        gsap.fromTo(char,
          { opacity: 0 },
          {
            opacity: 1,
            delay: index * 0.045,
            duration,
            scrambleText: { text: char.dataset.content || "", chars: scrambleChars, speed },
            ease: "none",
          },
        )
      })
    }

    const handleMove = (event: PointerEvent) => {
      chars.forEach((char) => {
        const { left, top, width, height } = char.getBoundingClientRect()
        const distance = Math.hypot(event.clientX - (left + width / 2), event.clientY - (top + height / 2))
        if (distance < radius) {
          gsap.to(char, {
            overwrite: true,
            duration: Math.max(0.12, duration * (1 - distance / radius)),
            scrambleText: { text: char.dataset.content || "", chars: scrambleChars, speed },
            ease: "none",
          })
        }
      })
    }

    const element = rootRef.current
    element?.addEventListener("pointermove", handleMove)
    return () => {
      element?.removeEventListener("pointermove", handleMove)
      gsap.killTweensOf(chars)
      split.revert()
    }
  }, [radius, duration, speed, scrambleChars, autoScramble])

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  )
}
