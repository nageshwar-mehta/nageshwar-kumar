import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { EducationSection } from "@/components/sections/education-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { PatentsSection } from "@/components/sections/patents-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { AchievementsSection } from "@/components/sections/achievements-section"
import { ResponsibilitiesSection } from "@/components/sections/responsibilities-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Footer } from "@/components/footer"
import { ParallaxBackground } from "@/components/parallax-background"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { SectionDivider } from "@/components/section-divider"

export default function Home() {
  return (
    <div className="relative parallax-container">
      <ParallaxBackground />
      <ScrollIndicator />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none z-0" />
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <EducationSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <PatentsSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <AchievementsSection />
      <SectionDivider />
      <ResponsibilitiesSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </div>
  )
}
