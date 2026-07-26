import { Button } from "@/components/ui/button"
import { Download, ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import heroBackground from "@/assets/7T9364v.gif"

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = () => {
    window.open('https://drive.google.com/drive/folders/14rNZ_D5y9wB7CdtefBWi-kn0mF7DUnfV?usp=sharing', '_blank')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 hero-gradient opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_85%)] pointer-events-none" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2.5 h-2.5 bg-accent rounded-full animate-float animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

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
