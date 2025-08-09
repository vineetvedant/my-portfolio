import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink, Cloud, Shield, BarChart3, Brain } from "lucide-react"

const certifications = [
  {
    title: "Cloud Computing & Distributed Systems",
    issuer: "NPTEL",
    type: "Course Completion",
    icon: Cloud,
    description: "Advanced concepts in cloud architecture, distributed computing, and scalable system design.",
    skills: ["Cloud Architecture", "Distributed Systems", "Scalability", "System Design"],
    credentialUrl: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS09S35860520130200856"
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    type: "Professional Certificate",
    icon: Shield,
    description: "Comprehensive cybersecurity fundamentals including threat detection, security protocols, and risk management.",
    skills: ["Security Protocols", "Threat Detection", "Risk Management", "Network Security"],
    credentialUrl: "https://www.credly.com/badges/3f7a9577-06cd-4ec6-97e4-bc56c4893384/linked_in_profile"
  },
  {
    title: "Data Analytics",
    issuer: "IBM (Coursera)",
    type: "Professional Certificate",
    icon: BarChart3,
    description: "End-to-end data analytics including data collection, cleaning, analysis, and visualization techniques.",
    skills: ["Data Analysis", "Statistical Methods", "Data Visualization", "Python Analytics"],
    credentialUrl: "https://www.coursera.org/learn/introduction-to-data-analytics/home/module/1"
  },
  {
    title: "Machine Learning I",
    issuer: "Columbia University",
    type: "Academic Course",
    icon: Brain,
    description: "Fundamental machine learning algorithms, supervised and unsupervised learning, and model evaluation.",
    skills: ["ML Algorithms", "Supervised Learning", "Model Evaluation", "Statistical Learning"],
    credentialUrl: "https://badges.plus.columbia.edu/e8f50eea-a18e-438b-9453-9438436505ca"
  }
]

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-section-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Certifications & Learning</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through industry-recognized certifications and 
            academic programs from leading institutions and technology companies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-accent/10 hover:border-accent/30"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-accent/10 rounded-lg mr-4 group-hover:bg-accent/20 transition-smooth">
                      <cert.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-primary group-hover:text-accent transition-smooth">
                        {cert.title}
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <span className="text-muted-foreground font-medium">{cert.issuer}</span>
                        <Badge variant="secondary" className="ml-2 text-xs bg-accent/10 text-accent">
                          {cert.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-primary transition-smooth"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">Key Skills Acquired</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex}
                        variant="outline"
                        className="text-xs border-accent/20 text-muted-foreground hover:border-accent hover:text-accent transition-smooth"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-accent/10">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Award className="h-4 w-4 mr-2 text-accent" />
                    <span>Verified Certificate</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Learning Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center border-accent/10 hover:border-accent/30 transition-smooth">
            <div className="text-3xl font-bold text-accent mb-2">4</div>
            <div className="text-sm text-muted-foreground">Professional Certificates</div>
          </Card>
          <Card className="p-6 text-center border-accent/10 hover:border-accent/30 transition-smooth">
            <div className="text-3xl font-bold text-accent mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Hours of Learning</div>
          </Card>
          <Card className="p-6 text-center border-accent/10 hover:border-accent/30 transition-smooth">
            <div className="text-3xl font-bold text-accent mb-2">3</div>
            <div className="text-sm text-muted-foreground">Universities</div>
          </Card>
          <Card className="p-6 text-center border-accent/10 hover:border-accent/30 transition-smooth">
            <div className="text-3xl font-bold text-accent mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Technology Domains</div>
          </Card>
        </div>
      </div>
    </section>
  )
}
