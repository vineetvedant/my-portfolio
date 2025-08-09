import { Button } from "@/components/ui/button"
import { Download, ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import heroBackground from "@/assets/7T9364v.gif"

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a')
    link.href = '/resume.pdf' // You can replace this with your actual resume file path
    link.download = 'Vedant_Singh_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 hero-gradient opacity-90" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full animate-float animate-pulse-glow"
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
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white">
            <span className="block">Vedant</span>
            <span className="block text-gradient">Singh</span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-accent font-medium mb-4">
            AI Engineer | HPC Innovator | Problem Solver
          </p>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Computer Science graduate specializing in artificial intelligence, 
            high-performance computing, and industrial automation. Building the future 
            through innovative technology solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 transition-bounce px-8 py-3 text-lg font-semibold"
            >
              View My Work
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={downloadResume}
              variant="outline" 
              size="lg"
              className="border-accent text-accent hover:bg-accent hover:text-primary transition-bounce px-8 py-3 text-lg font-semibold"
            >
              Download Resume
              <Download className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/vedantsingh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent transition-smooth"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com/in/vedantsingh" 
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
