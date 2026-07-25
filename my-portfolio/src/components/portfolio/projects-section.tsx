import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye, Zap, Volume2, Target, Cpu, Brain, BarChart3 } from "lucide-react"

const projects = [
  {
    title: "Data Visualization Toolkit",
    description: "An open-source suite for exploratory data analysis (EDA) and automated visualization, streamlining data analysis of 5000+ dataset rows per run.",
    icon: BarChart3,
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "EDA"],
    features: ["Automated Data Analysis", "Exploratory Data Plots", "Support for 5000+ Row Datasets", "Open Source Toolkit"],
    status: "Completed",
    links: {
      github: "https://github.com/vineetvedant",
      demo: "#"
    }
  },
  {
    title: "UTS/PRS Ticketing System for the Visually Impaired",
    description: "An accessible ticketing application featuring SQLite database storage and Braille symbol translation, allowing visually impaired users to book tickets independently.",
    icon: Eye,
    technologies: ["Python", "Tkinter", "SQLite", "Accessibility", "Braille Translation"],
    features: ["Braille Symbol Translation", "Accessible GUI Design", "SQLite Database Storage", "Empowering 100+ Impaired Users"],
    status: "Completed",
    links: {
      github: "https://github.com/vineetvedant/Empowering-Accessibility-A-GUI-Based-Ticket-Reservation-System-for-the-Visually-Impaired-with-Real-.git",
      demo: "#"
    }
  },
  {
    title: "Multi-modal Object Tracking & Targeting",
    description: "A real-time object tracking system for 100+ classes, integrated with RTSP video feeds and a robust API/CLI wrapper.",
    icon: Target,
    technologies: ["Raspberry Pi", "YOLOv8", "RTSP Streaming", "Python", "API/CLI"],
    features: ["Real-time Multi-class Tracking", "18% Error Rate Reduction", "RTSP Camera Feeds Integration", "Robust CLI/API Controls"],
    status: "Completed",
    links: {
      github: "https://github.com/vineetvedant/object-detection-thermal---grayscale---RGB-.git",
      demo: "#"
    }
  },
  {
    title: "Text-to-Audio Converter (Audiobook Tool)",
    description: "An accessibility audiobook utility and GUI that converts PDF text files to audiobooks, helping visually impaired students access materials.",
    icon: Volume2,
    technologies: ["Python", "gTTS", "PDF Processing", "Tkinter GUI"],
    features: ["PDF Text Extraction", "Natural Voice Conversion (gTTS)", "User-friendly GUI", "Used by 50+ Visually Impaired Students"],
    status: "Completed",
    links: {
      github: "https://github.com/vineetvedant/VoiceBook.git",
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
