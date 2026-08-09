import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import GlassSurface from "@/components/ui/GlassSurface"
import { Award, ExternalLink, Cloud, Shield, BarChart3, BookOpen, FileText } from "lucide-react"

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
    title: "Introduction to Data Analytics",
    issuer: "IBM (Coursera)",
    type: "Professional Certificate",
    icon: BarChart3,
    description: "End-to-end data analytics including data collection, cleaning, analysis, and visualization techniques.",
    skills: ["Data Analysis", "Statistical Methods", "Data Visualization", "Python Analytics"],
    credentialUrl: "https://www.coursera.org/learn/introduction-to-data-analytics/home/module/1"
  },
  {
    title: "NCC 'C' Certificate - Leadership & Discipline",
    issuer: "National Cadet Corps",
    type: "Leadership Credential",
    icon: Award,
    description: "Highest level certificate in the NCC, demonstrating leadership, national security knowledge, physical endurance, and discipline.",
    skills: ["Leadership", "Discipline", "Team Operations", "Crisis Management"],
    credentialUrl: "#"
  }
]

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-section-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassSurface width="100%" height="auto" borderRadius={16} brightness={25} opacity={0.8} backgroundOpacity={0.12} className="theme-glass-header mb-16">
          <div className="text-center px-6 py-7">
            <h2 className="text-4xl font-bold text-primary mb-4">Certifications & Research</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Continuous learning through industry-recognized certifications and academic publications in leading science venues.
            </p>
          </div>
        </GlassSurface>

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
                      <div className="flex items-center mt-2 flex-wrap gap-2">
                        <span className="text-muted-foreground font-medium">{cert.issuer}</span>
                        <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">
                          {cert.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {cert.credentialUrl !== "#" && (
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-primary transition-smooth"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-sm">
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
                    <span>Verified Credential</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Research Publication */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">Research Publications</h3>
          <Card className="group hover:shadow-xl transition-all duration-300 border-accent/30 bg-accent/5 max-w-4xl mx-auto overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="p-3 bg-accent/10 rounded-lg mr-4 group-hover:bg-accent/20 transition-smooth mt-1">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <a
                      href="https://link.springer.com/chapter/10.1007/978-3-032-24929-6_1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/title inline-flex items-center gap-2"
                    >
                      <CardTitle className="text-xl sm:text-2xl text-primary group-hover/title:text-accent transition-smooth">
                        Smart Drone System Using Deep Learning Techniques
                      </CardTitle>
                      <ExternalLink className="h-4 w-4 text-accent opacity-70 group-hover/title:opacity-100 transition-smooth flex-shrink-0" />
                    </a>
                    <div className="flex items-center mt-2.5 flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs bg-accent/15 text-accent font-semibold border border-accent/20">
                        Springer Nature
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-accent/10 text-accent font-semibold">
                        ICAIN 2025
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground font-mono">
                        LNNS Series
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Scopus Indexed
                      </Badge>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://link.springer.com/chapter/10.1007/978-3-032-24929-6_1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex text-accent hover:text-primary p-2 rounded-lg bg-accent/10 hover:bg-accent transition-smooth"
                  title="View on SpringerLink"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Authors & Publication venue info */}
              <div className="text-xs sm:text-sm text-muted-foreground bg-background/50 p-3 rounded-lg border border-accent/10 space-y-1">
                <div>
                  <span className="font-semibold text-primary">Authors:</span> Shivank Mishra, Vedant Singh, Atreo Pramanick, Aditya Tripathi, Naresh Sharma
                </div>
                <div>
                  <span className="font-semibold text-primary">Venue:</span> Proceedings of International Conference on Artificial Intelligence and Networks (ICAIN), Springer, Cham
                </div>
                <div className="font-mono text-[11px] text-accent">
                  <span className="font-semibold text-primary font-sans text-xs">DOI:</span>{" "}
                  <a 
                    href="https://doi.org/10.1007/978-3-032-24929-6_1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary transition-smooth"
                  >
                    10.1007/978-3-032-24929-6_1
                  </a>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm">
                Co-authored research on leveraging deep learning algorithms in autonomous drone operations, focusing on real-time visual tracking, aerial object detection, and hardware acoustic footprint reduction.
              </p>
              <ul className="list-disc list-outside ml-4 text-muted-foreground leading-relaxed text-sm space-y-2">
                <li>
                  Launched a YOLOv10 server for processing live drone video feeds, enabling real-time detection and response in defense scenarios.
                </li>
                <li>
                  Innovated a 3D-modeled, silent propeller design, reducing the drone's acoustic footprint by 15% in field tests.
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap gap-3">
                <Button 
                  asChild
                  className="bg-accent text-primary hover:bg-accent/90 transition-bounce text-xs sm:text-sm font-semibold"
                >
                  <a 
                    href="https://link.springer.com/chapter/10.1007/978-3-032-24929-6_1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read Chapter on SpringerLink
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-accent/30 text-accent hover:bg-accent hover:text-primary transition-smooth text-xs sm:text-sm"
                >
                  <a 
                    href="https://doi.org/10.1007/978-3-032-24929-6_1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View DOI Citation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Learning Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center border-accent/10 hover:border-accent/30 transition-smooth">
            <div className="text-3xl font-bold text-accent mb-2">4</div>
            <div className="text-sm text-muted-foreground">Certifications</div>
          </Card>
          <Card className="p-6 text-center border-accent/10 hover:border-accent/30 transition-smooth">
            <div className="text-3xl font-bold text-accent mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Hours of Learning</div>
          </Card>
          <Card className="p-6 text-center border-accent/10 hover:border-accent/30 transition-smooth">
            <div className="text-3xl font-bold text-accent mb-2">1</div>
            <div className="text-sm text-muted-foreground">Research Publication</div>
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
