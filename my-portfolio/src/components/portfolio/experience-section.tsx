import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Calendar } from "lucide-react"

const experiences = [
  {
    company: "Altair Engineering",
    position: "HPC Intern",
    location: "Bangalore",
    period: "Apr – Jun 2025",
    description: "Specialized in high-performance computing solutions, optimizing parallel processing systems and contributing to advanced computational workflows.",
    skills: ["HPC", "Parallel Computing", "Performance Optimization", "System Architecture"],
    isUpcoming: true
  },
  {
    company: "Proeffico Solutions",
    position: "Project Lead Intern",
    location: "Noida",
    period: "Oct 2024 – Jan 2025",
    description: "Led development projects focusing on AI-driven solutions, managing cross-functional teams and delivering innovative software products.",
    skills: ["Project Leadership", "AI Development", "Team Management", "Software Engineering"],
    isUpcoming: false
  },
  {
    company: "TATA Motors",
    position: "Software Engineer Intern",
    location: "Jamshedpur",
    period: "Feb – May 2024",
    description: "Developed software solutions for automotive systems, working on industrial automation and process optimization in a large-scale manufacturing environment.",
    skills: ["Industrial Automation", "Software Engineering", "Process Optimization", "Automotive Systems"],
    isUpcoming: false
  },
  {
    company: "CRIS (Centre for Railway Information Systems)",
    position: "Software Engineer Intern",
    location: "Delhi",
    period: "Jun – Jul 2023",
    description: "Contributed to railway information systems, developing software solutions for transportation infrastructure and data management.",
    skills: ["System Development", "Data Management", "Infrastructure", "Transportation Tech"],
    isUpcoming: false
  }
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-section-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Journey through leading technology companies, building expertise in AI, 
            HPC, and industrial systems while developing leadership skills.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-accent/30"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-accent rounded-full border-4 border-background z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'
                } md:w-1/2`}>
                  <Card className={`p-6 hover:shadow-lg transition-smooth ${
                    exp.isUpcoming ? 'border-accent/50 bg-accent/5' : 'border-accent/20'
                  }`}>
                    {exp.isUpcoming && (
                      <Badge className="mb-4 bg-accent text-primary">Upcoming</Badge>
                    )}
                    
                    <div className="flex items-center mb-3 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-primary mb-2">{exp.position}</h3>
                    
                    <div className="flex items-center mb-4 text-muted-foreground">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="font-medium">{exp.company}</span>
                      <MapPin className="h-4 w-4 ml-4 mr-1" />
                      <span>{exp.location}</span>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          variant="secondary"
                          className="bg-accent/10 text-accent text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}