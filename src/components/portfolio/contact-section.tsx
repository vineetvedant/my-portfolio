import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || "Portfolio Contact")
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    const mailtoLink = `mailto:singhvineetvedant@gmail.com?subject=${subject}&body=${body}`
    
    window.open(mailtoLink, '_blank')
    
    toast({
      title: "Message Ready",
      description: "Your email client should open with the pre-filled message.",
    })

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "singhvineetvedant@gmail.com",
      href: "mailto:singhvineetvedant@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91-8873001000",
      href: "tel:+918873001000"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/vineetvedant",
      href: "https://github.com/vineetvedant"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "www.linkedin.com/in/vedant-singh-2550b2202",
      href: "https://www.linkedin.com/in/vedant-singh-2550b2202/"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on innovative projects or discuss opportunities? 
            Let's connect and build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 border-accent/10">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-primary">Let's Connect</CardTitle>
                <p className="text-muted-foreground">
                  Whether you're looking for an AI engineer, HPC specialist, or project collaborator, 
                  I'm always open to discussing new opportunities and innovative challenges.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : '_self'}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-center p-4 rounded-lg border border-accent/10 hover:border-accent/30 hover:bg-accent/5 transition-smooth group"
                  >
                    <div className="p-3 bg-accent/10 rounded-lg mr-4 group-hover:bg-accent/20 transition-smooth">
                      <info.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{info.title}</h3>
                      <p className="text-muted-foreground group-hover:text-accent transition-smooth">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
              <h3 className="text-lg font-semibold text-primary mb-4">Response Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">24h</div>
                  <div className="text-sm text-muted-foreground">Email Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">Always</div>
                  <div className="text-sm text-muted-foreground">Open to Chat</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-accent/10">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-primary">Send a Message</CardTitle>
              <p className="text-muted-foreground">
                Have a project in mind? Fill out the form below and I'll get back to you soon.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="border-accent/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="border-accent/20 focus:border-accent"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    className="border-accent/20 focus:border-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or inquiry..."
                    rows={6}
                    required
                    className="border-accent/20 focus:border-accent resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent text-primary hover:bg-accent/90 transition-bounce"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
