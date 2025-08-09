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
    title: "Languages & Core",
    icon: Code,
    skills: [
      { name: "Python", level: 95 },
      { name: "C++", level: 85 },
      { name: "SQL", level: 80 },
      { name: "Java", level: 70 },
      { name: "Git", level: 90 },
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "OpenCV", level: 80 },
      { name: "YOLO", level: 75 },
      { name: "Pandas/NumPy", level: 95 },
    ]
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { name: "AWS", level: 80 },
      { name: "Cloud Deployment", level: 75 },
      { name: "HPC Systems", level: 85 },
      { name: "OpenMP", level: 80 },
    ]
  },
  {
    title: "Leadership & Soft Skills",
    icon: Users,
    skills: [
      { name: "Team Management", level: 90 },
      { name: "Project Leadership", level: 85 },
      { name: "Problem Solving", level: 95 },
      { name: "Communication", level: 88 },
    ]
  }
]

const additionalSkills = [
  "OOPS", "Prompt Engineering", "Data Analytics", "Cybersecurity", 
  "Distributed Systems", "Arduino", "Industrial Automation", "Computer Vision"
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
            <Card key={index} className="p-6 hover:shadow-lg transition-smooth border-accent/10">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-accent/10 rounded-lg mr-4">
                  <category.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-muted" 
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <Card className="p-8 bg-primary/5 border-accent/20">
          <h3 className="text-xl font-semibold text-primary mb-6 text-center">
            Additional Technologies & Concepts
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-accent/10 text-accent hover:bg-accent hover:text-primary transition-smooth px-4 py-2"
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