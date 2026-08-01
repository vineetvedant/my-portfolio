import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Menu, X } from "lucide-react"
import GlassSurface from "@/components/ui/GlassSurface"
import GooeyNav from "@/components/ui/GooeyNav"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  const handleNavSelect = (index: number, href: string) => {
    setActiveSection(index)
    setIsMobileMenuOpen(false)

    if (!href.startsWith("#")) return

    const sectionId = href.slice(1)
    const target = sectionId === "home" ? document.getElementById("home") : document.getElementById(sectionId)

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    } else if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    window.history.pushState(null, "", href)
  }

  useEffect(() => {
    let frame = 0
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const marker = window.scrollY + Math.min(240, window.innerHeight * 0.32)
        let currentIndex = 0
        navLinks.forEach((link, index) => {
          const section = document.querySelector<HTMLElement>(link.href)
          if (section && section.offsetTop <= marker) currentIndex = index
        })
        setActiveSection(currentIndex)
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav aria-label="Primary navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-xl border-b border-accent/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <GlassSurface width="100%" height={56} borderRadius={18} backgroundOpacity={0.5} saturation={1.4} distortionScale={-80} className="mt-2 px-4">
        <div className="flex justify-between items-center h-full w-full">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <GooeyNav
              items={navLinks}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={900}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              activeIndex={activeSection}
              onSelect={handleNavSelect}
            />
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button 
              asChild
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-primary transition-smooth"
            >
              <a href="https://github.com/vineetvedant" target="_blank" rel="noopener noreferrer">
<Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        </GlassSurface>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault()
                    handleNavSelect(index, link.href)
                  }}
                  className={`block rounded-lg px-3 py-2 transition-smooth ${activeSection === index ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-accent"}`}
                >
                  {link.label}
                </a>
              ))}
              <div className="px-3 py-2">
            <Button 
              asChild
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent hover:text-primary transition-smooth"
            >
              <a href="https://github.com/vineetvedant" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
