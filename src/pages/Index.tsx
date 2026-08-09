import { Navigation } from "@/components/portfolio/navigation"
import { HeroSection } from "@/components/portfolio/hero-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { TargetPitchSection } from "@/components/portfolio/target-pitch-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { CertificationsSection } from "@/components/portfolio/certifications-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { DonationDrawer } from "@/components/portfolio/donation-drawer"
import DotGrid from "@/components/ui/DotGrid"

const Index = () => {
  return (
    <div className="portfolio-shell min-h-screen">
      <div className="portfolio-interactive-grid" aria-hidden="true">
        <DotGrid
          dotSize={2}
          gap={30}
          baseColor="#0e4f60"
          activeColor="#00f2fe"
          proximity={160}
          speedTrigger={80}
          shockRadius={260}
          shockStrength={4}
          resistance={700}
          returnDuration={1.35}
        />
      </div>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TargetPitchSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <DonationDrawer />
    </div>
  );
};

export default Index;
