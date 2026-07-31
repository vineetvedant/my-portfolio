import { Button } from "@/components/ui/button"
import { Download, ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import DotGrid from "@/components/ui/DotGrid"

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = () => {
    window.open('https://drive.google.com/drive/folders/14rNZ_D5y9wB7CdtefBWi-kn0mF7DUnfV?usp=sharing', '_blank')
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0">
        <DotGrid
          dotSize={3}
          gap={25}
          baseColor="#164e63"
          activeColor="#00f2fe"
          proximity={150}
          shockRadius={240}
          shockStrength={4}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="absolute inset-0 hero-gradient opacity-75 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_85%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          {/* Terminal Command Subtitle */}
          <div className="mb-6">
            <span className="font-mono text-accent text-xs sm:text-sm border border-accent/20 bg-accent/5 px-3 py-1.5 rounded-full inline-flex items-center">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse mr-2" />
              vedant@portfolio:~$ run ai-cloud-pipeline
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 text-white tracking-tight">
            <span>Vedant </span>
            <span className="text-gradient glow-text">Singh</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-semibold mb-6 max-w-2xl mx-auto leading-relaxed">
            AI Engineer & Cloud Infrastructure Developer
          </p>
          
          <p className="text-sm sm:text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed font-sans">
            Computer Science Engineer specializing in Python, SQL, and cloud infrastructure (AWS, OCI), building
            automated data validation, extraction, and processing workflows across enterprise systems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 font-mono">
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 transition-bounce px-8 py-3 text-sm font-semibold rounded-lg"
            >
              View My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              onClick={downloadResume}
              variant="outline" 
              size="lg"
              className="border-accent/40 text-accent hover:bg-accent hover:text-primary transition-bounce px-8 py-3 text-sm font-semibold rounded-lg"
            >
              Get Resume
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/vineetvedant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-smooth"
            >
              <Github className="h-6 w-6" />
            </a>
                <a
              href="https://www.linkedin.com/in/vedant-singh-2550b2202/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-smooth"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="mailto:singhvineetvedant@gmail.com"
              className="text-gray-400 hover:text-accent transition-smooth"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
