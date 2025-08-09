import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye, Zap, Volume2, Target, Cpu, Brain } from "lucide-react"

const projects = [
  {
    title: "Accessible Ticketing System for Vision Impairment",
    description: "Innovative ticketing solution designed specifically for visually impaired users, featuring voice navigation, audio feedback, and accessible interface design.",
    icon: Eye,
    technologies: ["Python", "Audio Processing", "Accessibility APIs", "UI/UX"],
    features: ["Voice Navigation", "Audio Feedback", "Screen Reader Compatible", "Intuitive Design"],
    status: "Completed",
    links: {
      github: "https://github.com/vineetvedant/Empowering-Accessibility-A-GUI-Based-Ticket-Reservation-System-for-the-Visually-Impaired-with-Real-.git",
      demo: "#"
    }
  },
  {
    title: "Text-to-Audio Converter",
    description: "Advanced text-to-speech application with natural voice synthesis, multiple language support, and customizable audio output settings.",
    icon: Volume2,
    technologies: ["Python", "TensorFlow", "Audio ML", "Natural Language Processing"],
    features: ["Natural Voice Synthesis", "Multi-language Support", "Custom Audio Settings", "Batch Processing"],
    status: "Completed",
    links: {
      github: "https://github.com/vineetvedant/VoiceBook.git",
      demo: "#"
    }
  },
  {
    title: "Object Tracking System",
    description: "Real-time object detection and tracking system using Arduino and C++, implementing computer vision algorithms for autonomous monitoring.",
    icon: Target,
    technologies: ["Arduino", "C++", "OpenCV", "Computer Vision", "Hardware Integration"],
    features: ["Real-time Tracking", "Multiple Object Detection", "Hardware Integration", "Autonomous Operation"],
    status: "Completed",
    links: {
      github: "https://github.com/vineetvedant/object-detection-thermal---grayscale---RGB-.git",
      demo: "#"
    }
  },
  {
    title: "Parallel Programming with OpenMP",
    description: "High-performance computing project demonstrating advanced parallel programming techniques and optimization strategies for computational efficiency.",
    icon: Cpu,
    technologies: ["C++", "OpenMP", "HPC", "Performance Optimization", "Parallel Algorithms"],
    features: ["Parallel Processing", "Performance Optimization", "Scalable Architecture", "Benchmark Testing"],
    status: "Completed",
    links: {
      github: "https://github.com/vineetvedant/My.Prompt.git",
      demo: "#"
    }
  },
  {
    title: "My.Prompt – AI Prompt Engineering Toolkit",
    description: "Comprehensive toolkit for AI prompt engineering, featuring templates, optimization algorithms, and performance analytics for better AI interactions.",
    icon: Brain,
    technologies: ["Python", "AI/ML", "Prompt Engineering", "Analytics", "Web Framework"],
    features: ["Prompt Templates", "Optimization Algorithms", "Performance Analytics", "User-friendly Interface"],
    status: "In Development",
    links: {
      github: "https://github.com/vineetvedant/My.Prompt.git",
      demo: "#"
    }
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of innovative projects showcasing expertise in AI, automation, 
            accessibility, and high-performance computing solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-accent/10 hover:border-accent/30 hover:-translate-y-2"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-smooth">
                    <project.icon className="h-6 w-6 text-accent" />
                  </div>
                  <Badge 
                    variant={project.status === "Completed" ? "default" : "secondary"}
                    className={project.status === "Completed" ? "bg-accent text-primary" : "bg-muted"}
                  >
                    {project.status}
                  </Badge>
                </div>
                
                <CardTitle className="text-xl text-primary group-hover:text-accent transition-smooth">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="outline" 
                        className="text-xs border-accent/20 text-muted-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">Key Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Zap className="h-3 w-3 text-accent mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button 
                    asChild
                    variant="outline" 
                    size="sm" 
                    className="w-full border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-12">
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-primary transition-bounce px-8"
          >
            <a href="https://github.com/vineetvedant" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
