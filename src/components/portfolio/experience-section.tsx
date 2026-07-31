import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Calendar } from "lucide-react"
import GlassSurface from "@/components/ui/GlassSurface"

const experiences = [
  {
    company: "Wipro Limited",
    position: "Associate Analyst",
    location: "Noida, India",
    period: "Jan 2026 – Present",
    description: [
      "Validated backend data integrity and complex data mappings by writing and optimizing advanced SQL queries across relational datasets, ensuring accurate transaction processing.",
      "Architected a scalable end-to-end UI and API automation framework in Python (Selenium WebDriver), automating 500+ test cases and reducing regression cycles by 60% across 5 core microservices.",
      "Designed and deployed Robotic Process Automation (RPA) workflows using Automation Anywhere to streamline repetitive data extraction and UI validation tasks.",
      "Built a Generative AI workflow to automate validation of website data against Jama requirements, streamlining system documentation.",
      "Integrated automated API and UI test suites into Jenkins CI/CD pipelines, enabling nightly batch executions and accelerating deployment feedback loops.",
      "Provisioned parallel, cross-platform environments on AWS EC2 (Linux), reducing overall testing cycle duration by 30%."
    ],
    skills: ["SQL Optimization", "Selenium WebDriver", "Automation Anywhere (RPA)", "Generative AI", "Jenkins CI/CD", "AWS EC2"],
    isUpcoming: false
  },
  {
    company: "Altair Engineering X Siemens Energy",
    position: "Intern, High Performance Computing (HPC)",
    location: "Bangalore, India",
    period: "Apr 2025 – Jun 2025",
    description: [
      "Streamlined cloud infrastructure rollouts on AWS & OCI using Terraform (Infrastructure as Code), cutting deployment cycles from 5 days to 3 days.",
      "Improved HPC cluster efficiency by 37% by integrating 5+ key applications and automating compute resource allocation for large-scale workloads.",
      "Shortened incident response times by 60% via end-to-end Linux monitoring and a real-time alerting system."
    ],
    skills: ["Terraform", "AWS", "Oracle Cloud (OCI)", "HPC Clusters", "Linux", "Resource Allocation"],
    isUpcoming: false
  },
  {
    company: "Proeffico Solutions Pvt. Ltd.",
    position: "Software Engineer Intern (Computer Vision & AI Surveillance)",
    location: "Noida, India",
    period: "Oct 2024 – Jan 2025",
    description: [
      "Reduced hallucination rate in document Q&A by 30% through a custom RAG data pipeline, enabling accurate responses for 10,000+ queries.",
      "Designed and shipped a YOLOv8-based AI solution to monitor 200+ employees’ activity with over 95% detection accuracy.",
      "Built and maintained C++/Python tools on 30+ Raspberry Pis, achieving 99% uptime for edge health monitoring and data tracking.",
      "Deployed a real-time safety system for tracking activity in restricted areas, reducing unauthorized incidents by 80%."
    ],
    skills: ["RAG Pipelines", "YOLOv8", "Computer Vision", "Raspberry Pi", "C++", "Python Surveillance"],
    isUpcoming: false
  },
  {
    company: "TATA Motors",
    position: "Software Engineer Intern",
    location: "Jamshedpur, India",
    period: "Feb 2024 – May 2024",
    description: [
      "Implemented Python & YOLO modules for object detection, improving production-line safety checks by 28%.",
      "Investigated CNN approaches for ADAS research, supporting a project that led to 12% fewer false positives in safety alerts.",
      "Drafted deep learning proposals, influencing adoption of two new automotive user-interaction features."
    ],
    skills: ["Python", "YOLO", "CNN", "ADAS Research", "Object Detection", "Deep Learning"],
    isUpcoming: false
  }
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-section-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassSurface width="100%" height="auto" borderRadius={16} brightness={25} opacity={0.8} backgroundOpacity={0.05} className="theme-glass-header mb-16">
        <div className="text-center px-6 py-7">
          <h2 className="text-4xl font-bold text-primary mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A track record of engineering scalable automation, AI computer vision, high-performance cloud clusters, and high-efficiency enterprise software.
          </p>
        </div>
        </GlassSurface>

        <div className="relative">
          {/* Timeline line - Git Branch Style */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/60 via-blue-500/40 to-accent/20"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline Git Commit Node */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-background border-2 border-accent rounded-full z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                </div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8 md:text-left' : 'md:ml-8'
                } md:w-1/2`}>
                  <Card className="p-6 bg-card/60 backdrop-blur-sm glow-card border border-accent/10 transition-smooth">
                    {exp.isUpcoming && (
                      <Badge className="mb-4 bg-accent text-primary">Upcoming</Badge>
                    )}
                    
                    <div className="flex items-center mb-3 text-xs text-accent font-mono">
                      <Calendar className="h-3.5 w-3.5 mr-2" />
                      <span>{exp.period}</span>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-2">{exp.position}</h3>
                    
                    <div className="flex items-center mb-4 text-muted-foreground flex-wrap gap-y-2 text-xs font-mono">
                      <Building className="h-3.5 w-3.5 mr-2 text-accent/70" />
                      <span className="font-semibold text-primary/80">{exp.company}</span>
                      <MapPin className="h-3.5 w-3.5 ml-4 mr-1 text-accent/70" />
                      <span>{exp.location}</span>
                    </div>

                    <ul className="list-disc list-outside ml-4 text-muted-foreground mb-6 leading-relaxed text-sm space-y-2 text-left font-sans">
                      {exp.description.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          variant="secondary"
                          className="bg-accent/5 text-accent border border-accent/10 font-mono text-[10px] rounded"
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
