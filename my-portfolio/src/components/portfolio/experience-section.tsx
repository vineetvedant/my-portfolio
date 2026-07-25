import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, Calendar } from "lucide-react"

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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Professional Experience</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A track record of engineering scalable automation, AI computer vision, high-performance cloud clusters, and high-efficiency enterprise software.
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
                  index % 2 === 0 ? 'md:mr-8 md:text-left' : 'md:ml-8'
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
                    
                    <div className="flex items-center mb-4 text-muted-foreground flex-wrap gap-y-2">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="font-medium">{exp.company}</span>
                      <MapPin className="h-4 w-4 ml-4 mr-1" />
                      <span>{exp.location}</span>
                    </div>

                    <ul className="list-disc list-outside ml-4 text-muted-foreground mb-6 leading-relaxed text-sm space-y-2 text-left">
                      {exp.description.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>
                          {bullet}
                        </li>
                      ))}
                    </ul>

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