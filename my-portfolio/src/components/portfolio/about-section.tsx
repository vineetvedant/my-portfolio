import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-section-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">About Me</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Placeholder */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-80 h-80">
              <img 
                src="/profile.jpg" 
                alt="Vedant Singh"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <Card className="p-8 border-l-4 border-l-accent shadow-lg hover:shadow-xl transition-smooth">
              <h3 className="text-2xl font-semibold text-primary mb-4">Innovation & Adaptability</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I am a Computer Science Engineer with hands-on experience in Python, SQL, and cloud infrastructure (AWS, OCI), building automated data validation, extraction, and processing workflows across enterprise systems. I specialize in writing and optimizing SQL queries, provisioning cloud environments with Terraform, and integrating automated pipelines into Jenkins CI/CD.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                With professional experience at Wipro Limited as an Associate Analyst, and software engineering internships at Siemens Energy, Altair Engineering, Proeffico Solutions, and TATA Motors, I have a proven track record of designing scalable automation frameworks, deploying real-time AI surveillance models, and optimizing high-performance computing clusters.
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-accent/10 text-accent">Problem Solver</Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent">Team Leader</Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent">Innovation Driven</Badge>
                <Badge variant="secondary" className="bg-accent/10 text-accent">Collaborative</Badge>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center border-accent/20 hover:border-accent transition-smooth">
                <div className="text-3xl font-bold text-accent mb-2">5</div>
                <div className="text-sm text-muted-foreground">Professional Roles</div>
              </Card>
              <Card className="p-6 text-center border-accent/20 hover:border-accent transition-smooth">
                <div className="text-3xl font-bold text-accent mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Projects & Publications</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
