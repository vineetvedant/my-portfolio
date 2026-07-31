import { KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react"
import "./GooeyNav.css"

interface GooeyNavItem { label: string; href: string }
interface GooeyNavProps {
  items: GooeyNavItem[]
  animationTime?: number
  particleCount?: number
  particleDistances?: [number, number]
  particleR?: number
  timeVariance?: number
  colors?: number[]
  initialActiveIndex?: number
  activeIndex?: number
}

export default function GooeyNav({
  items, animationTime = 600, particleCount = 12, particleDistances = [55, 8],
  particleR = 80, timeVariance = 250, colors = [1, 2, 3, 1, 2, 3, 4], initialActiveIndex = 0, activeIndex: controlledActiveIndex,
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const filterRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const timersRef = useRef<number[]>([])
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
  const noise = (amount = 1) => amount / 2 - Math.random() * amount
  const getXY = (distance: number, index: number) => {
    const angle = ((360 + noise(8)) / particleCount) * index * Math.PI / 180
    return [distance * Math.cos(angle), distance * Math.sin(angle)]
  }

  const updatePosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const position = element.getBoundingClientRect()
    const styles = { left: `${position.x - container.x}px`, top: `${position.y - container.y}px`, width: `${position.width}px`, height: `${position.height}px` }
    Object.assign(filterRef.current.style, styles)
    Object.assign(textRef.current.style, styles)
    textRef.current.innerText = element.innerText
  }

  const makeParticles = (element: HTMLElement) => {
    const totalTime = animationTime * 2 + timeVariance
    element.style.setProperty("--time", `${totalTime}ms`)
    for (let index = 0; index < particleCount; index++) {
      const time = animationTime * 2 + noise(timeVariance * 2)
      const start = getXY(particleDistances[0], particleCount - index)
      const end = getXY(particleDistances[1] + noise(7), particleCount - index)
      const rotationNoise = noise(particleR / 10)
      const timer = window.setTimeout(() => {
        const particle = document.createElement("span")
        const point = document.createElement("span")
        particle.className = "particle"
        point.className = "point"
        particle.style.setProperty("--start-x", `${start[0]}px`)
        particle.style.setProperty("--start-y", `${start[1]}px`)
        particle.style.setProperty("--end-x", `${end[0]}px`)
        particle.style.setProperty("--end-y", `${end[1]}px`)
        particle.style.setProperty("--time", `${time}ms`)
        particle.style.setProperty("--scale", `${1 + noise(.2)}`)
        particle.style.setProperty("--color", `var(--color-${colors[Math.floor(Math.random() * colors.length)]}, white)`)
        particle.style.setProperty("--rotate", `${(rotationNoise > 0 ? rotationNoise + particleR / 20 : rotationNoise - particleR / 20) * 10}deg`)
        particle.appendChild(point)
        element.appendChild(particle)
        element.classList.add("active")
        timersRef.current.push(window.setTimeout(() => particle.remove(), time))
      }, 30)
      timersRef.current.push(timer)
    }
  }

  const activate = (element: HTMLElement, index: number) => {
    if (activeIndex === index) return
    setActiveIndex(index)
    updatePosition(element)
    filterRef.current?.querySelectorAll(".particle").forEach((particle) => particle.remove())
    textRef.current?.classList.remove("active")
    void textRef.current?.offsetWidth
    textRef.current?.classList.add("active")
    if (filterRef.current) makeParticles(filterRef.current)
  }

  useEffect(() => {
    const active = navRef.current?.querySelectorAll("li")[activeIndex] as HTMLElement | undefined
    if (active) updatePosition(active)
    const observer = new ResizeObserver(() => { if (active) updatePosition(active) })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [activeIndex])

  useEffect(() => {
    if (controlledActiveIndex !== undefined && controlledActiveIndex !== activeIndex) {
      setActiveIndex(controlledActiveIndex)
    }
  }, [controlledActiveIndex, activeIndex])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav aria-label="Portfolio sections"><ul ref={navRef}>
        {items.map((item, index) => (
          <li key={item.href} className={activeIndex === index ? "active" : ""}>
            <a href={item.href} onClick={(event: MouseEvent<HTMLAnchorElement>) => activate(event.currentTarget.parentElement!, index)} onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) => {
              if (event.key === "Enter" || event.key === " ") activate(event.currentTarget.parentElement!, index)
            }}>{item.label}</a>
          </li>
        ))}
      </ul></nav>
      <span className="effect filter" ref={filterRef}/><span className="effect text" ref={textRef}/>
    </div>
  )
}
