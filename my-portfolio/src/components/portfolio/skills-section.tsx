import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Code, 
  Brain, 
  Database, 
  Cloud, 
  Users, 
  Cpu,
  GitBranch,
  Zap
} from "lucide-react"

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: [
      { name: "Python", level: 95 },
      { name: "C++", level: 85 },
      { name: "SQL", level: 90 },
      { name: "Git", level: 90 },
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "TensorFlow / CNN", level: 90 },
      { name: "YOLO (Object Detection)", level: 90 },
      { name: "RAG & LLMs", level: 85 },
      { name: "Computer Vision", level: 88 },
    ]
  },
  {
    title: "Data & Analytics",
    icon: Database,
    skills: [
      { name: "Pandas & NumPy", level: 95 },
      { name: "SQL Query Optimization", level: 90 },
      { name: "Data Validation & Mapping", level: 90 },
      { name: "EDA & Visualization (Matplotlib/Seaborn)", level: 88 },
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "AWS (EC2)", level: 85 },
      { name: "Oracle Cloud (OCI)", level: 80 },
      { name: "Terraform (IaC)", level: 85 },
      { name: "Jenkins CI/CD", level: 80 },
    ]
  },
  {
    title: "Automation & Testing",
    icon: Zap,
    skills: [
      { name: "Selenium WebDriver", level: 90 },
      { name: "Automation Anywhere (RPA)", level: 85 },
      { name: "API Testing", level: 85 },
      { name: "Linux Systems", level: 88 },
    ]
  }
]

const additionalSkills = [
  "High Performance Computing (HPC)", "Raspberry Pi", "Distributed Systems", "SQLite", 
  "gTTS", "Tkinter", "RTSP Streaming", "Leadership & Discipline (NCC 'C')"
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Technical Skills</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built through hands-on experience in AI development, 
            high-performance computing, and team leadership across multiple industries.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-6 bg-card/60 backdrop-blur-sm glow-card border-accent/10 transition-smooth">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-accent/10 rounded-lg mr-4">
                  <category.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="font-mono">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-foreground">{skill.name}</span>
                      <span className="text-xs text-accent font-bold">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-1.5 bg-muted text-accent" 
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <Card className="p-8 bg-primary/5 border border-accent/10 backdrop-blur-sm glow-card">
          <h3 className="text-xl font-bold text-primary mb-6 text-center">
            Additional Technologies & Concepts
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-accent/10 text-accent font-mono hover:bg-accent hover:text-primary transition-smooth px-4 py-2 text-xs rounded-lg"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}