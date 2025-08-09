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
                As a Computer Science graduate with a passion for cutting-edge technology, 
                I specialize in artificial intelligence, high-performance computing, and 
                industrial automation. My journey spans from developing accessible solutions 
                for vision-impaired users to optimizing parallel computing systems.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Through internships at industry leaders like TATA Motors, Altair Engineering, 
                and CRIS, I've honed my collaborative skills while tackling complex technical 
                challenges. I believe in the power of technology to solve real-world problems 
                and create meaningful impact.
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
                <div className="text-3xl font-bold text-accent mb-2">4+</div>
                <div className="text-sm text-muted-foreground">Internships</div>
              </Card>
              <Card className="p-6 text-center border-accent/20 hover:border-accent transition-smooth">
                <div className="text-3xl font-bold text-accent mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
