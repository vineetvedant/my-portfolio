import { Button } from "@/components/ui/button"
import { Download, Github, Linkedin, Mail, Heart } from "lucide-react"
import heroBackground from "@/assets/7T9364v.gif"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-90" />
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Vedant Singh</h3>
            <p className="text-gray-300 leading-relaxed">
              AI Engineer and HPC Innovator passionate about building 
              technology solutions that make a meaningful impact.
            </p>
            <a href="/resume.pdf" download>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent hover:text-primary transition-smooth"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#about" className="text-gray-300 hover:text-accent transition-smooth">About Me</a>
              <a href="#skills" className="text-gray-300 hover:text-accent transition-smooth">Skills</a>
              <a href="#experience" className="text-gray-300 hover:text-accent transition-smooth">Experience</a>
              <a href="#projects" className="text-gray-300 hover:text-accent transition-smooth">Projects</a>
              <a href="#certifications" className="text-gray-300 hover:text-accent transition-smooth">Certifications</a>
              <a href="#contact" className="text-gray-300 hover:text-accent transition-smooth">Contact</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent">Get In Touch</h4>
            <div className="space-y-3">
              <a 
                href="mailto:singhvineetvedant@gmail.com"
                className="flex items-center text-gray-300 hover:text-accent transition-smooth"
              >
                <Mail className="h-4 w-4 mr-3" />
                singhvineetvedant@gmail.com
              </a>
              <div className="flex space-x-4 pt-2">
                <a 
                  href="https://github.com/vineetvedant" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-600 rounded-lg hover:border-accent hover:text-accent transition-smooth"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/vedant-singh-2550b2202/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-600 rounded-lg hover:border-accent hover:text-accent transition-smooth"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:singhvineetvedant@gmail.com"
                  className="p-2 border border-gray-600 rounded-lg hover:border-accent hover:text-accent transition-smooth"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Vedant Singh. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              Built with <Heart className="h-4 w-4 mx-1 text-accent" /> using React & TypeScript
            </p>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}
