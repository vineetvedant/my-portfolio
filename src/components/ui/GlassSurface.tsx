/* eslint-disable react-hooks/exhaustive-deps */
import { CSSProperties, ReactNode, useEffect, useId, useRef, useState } from "react"
import "./GlassSurface.css"

type Channel = "R" | "G" | "B"
type BlendMode = "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "difference"

interface GlassSurfaceProps {
  children?: ReactNode
  width?: number | string
  height?: number | string
  borderRadius?: number
  borderWidth?: number
  brightness?: number
  opacity?: number
  blur?: number
  displace?: number
  backgroundOpacity?: number
  saturation?: number
  distortionScale?: number
  redOffset?: number
  greenOffset?: number
  blueOffset?: number
  xChannel?: Channel
  yChannel?: Channel
  mixBlendMode?: BlendMode
  className?: string
  style?: CSSProperties
}

export default function GlassSurface({
  children, width = 200, height = 80, borderRadius = 20, borderWidth = 0.07,
  brightness = 50, opacity = 0.93, blur = 11, displace = 0,
  backgroundOpacity = 0, saturation = 1, distortionScale = -180,
  redOffset = 0, greenOffset = 10, blueOffset = 20, xChannel = "R",
  yChannel = "G", mixBlendMode = "difference", className = "", style = {},
}: GlassSurfaceProps) {
  const uniqueId = useId().replace(/:/g, "-")
  const filterId = `glass-filter-${uniqueId}`
  const redGradId = `red-grad-${uniqueId}`
  const blueGradId = `blue-grad-${uniqueId}`
  const [svgSupported, setSvgSupported] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<SVGFEImageElement>(null)
  const redRef = useRef<SVGFEDisplacementMapElement>(null)
  const greenRef = useRef<SVGFEDisplacementMapElement>(null)
  const blueRef = useRef<SVGFEDisplacementMapElement>(null)
  const blurRef = useRef<SVGFEGaussianBlurElement>(null)

  const updateMap = () => {
    const rect = containerRef.current?.getBoundingClientRect()
    const actualWidth = rect?.width || 400
    const actualHeight = rect?.height || 80
    const edge = Math.min(actualWidth, actualHeight) * borderWidth * 0.5
    const svg = `<svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${redGradId}" x1="100%" x2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="${blueGradId}" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect width="${actualWidth}" height="${actualHeight}" fill="black"/><rect width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})"/><rect width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode:${mixBlendMode}"/><rect x="${edge}" y="${edge}" width="${actualWidth - edge * 2}" height="${actualHeight - edge * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/></svg>`
    imageRef.current?.setAttribute("href", `data:image/svg+xml,${encodeURIComponent(svg)}`)
  }

  useEffect(() => {
    updateMap()
    ;[[redRef, redOffset], [greenRef, greenOffset], [blueRef, blueOffset]].forEach(([ref, offset]) => {
      const element = (ref as typeof redRef).current
      element?.setAttribute("scale", String(distortionScale + (offset as number)))
      element?.setAttribute("xChannelSelector", xChannel)
      element?.setAttribute("yChannelSelector", yChannel)
    })
    blurRef.current?.setAttribute("stdDeviation", String(displace))
  }, [width, height, borderRadius, borderWidth, brightness, opacity, blur, displace, distortionScale, redOffset, greenOffset, blueOffset, xChannel, yChannel, mixBlendMode])

  useEffect(() => {
    const observer = new ResizeObserver(updateMap)
    if (containerRef.current) observer.observe(containerRef.current)
    const test = document.createElement("div")
    test.style.backdropFilter = `url(#${filterId})`
    setSvgSupported(test.style.backdropFilter !== "" && !/Safari|Firefox/.test(navigator.userAgent))
    return () => observer.disconnect()
  }, [])

  const containerStyle = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    "--glass-frost": backgroundOpacity,
    "--glass-saturation": saturation,
    "--filter-id": `url(#${filterId})`,
  } as CSSProperties

  return (
    <div ref={containerRef} className={`glass-surface ${svgSupported ? "glass-surface--svg" : "glass-surface--fallback"} ${className}`} style={containerStyle}>
      <svg className="glass-surface__filter" aria-hidden="true"><defs><filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%"><feImage ref={imageRef} width="100%" height="100%" preserveAspectRatio="none" result="map"/><feDisplacementMap ref={redRef} in="SourceGraphic" in2="map" result="dispRed"/><feColorMatrix in="dispRed" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red"/><feDisplacementMap ref={greenRef} in="SourceGraphic" in2="map" result="dispGreen"/><feColorMatrix in="dispGreen" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green"/><feDisplacementMap ref={blueRef} in="SourceGraphic" in2="map" result="dispBlue"/><feColorMatrix in="dispBlue" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue"/><feBlend in="red" in2="green" mode="screen" result="rg"/><feBlend in="rg" in2="blue" mode="screen" result="output"/><feGaussianBlur ref={blurRef} in="output" stdDeviation="0.7"/></filter></defs></svg>
      <div className="glass-surface__content">{children}</div>
    </div>
  )
}
