"use client"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"

const experienceData = [
  {
    position: "IoT Intern",
    company: "MyPerro",
    period: "Feb 2025 – July 2025",
    description: " Developing an IoT-based pet location detection system using WiFi geofencing with GPS activation on boundary breach to optimize battery usage; responsible for circuit design, PCB layout, and hardware optimization.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
  {
    position: "HR Intern",
    company: "Aruyog",
    period: "Jan – Apr 2025",
    description: "Assisted in recruitment and employee engagement initiatives.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
  {
    position: "Academic Secretary",
    company: "IIT Jammu",
    period: "Aug 2024 – Jan 2025",
    description: "Coordinated academic activities and technical events while serving as a liaison between students and the administration.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
  {
    position: "Technical Assistant",
    company: "CST Advanced Pvt. Ltd.",
    period: "Aug – Dec 2023",
    description: "Provided technical support for the Anti-GPS Jamming System project and contributed to its presentation at the North-Tech Symposium 2023.",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
  },
]

export function ExperienceSection() {
  return (
    <SectionContainer id="experience">
      <SectionTransition transitionType="fade">
        <SectionHeading title="Experience" subtitle="My work experience and internships" />
      </SectionTransition>

      <div className="space-y-6">
        {experienceData.map((item, index) => (
          <SectionTransition key={index} transitionType="slide-up" index={index} delay={0.2}>
            <TiltCard maxTilt={8} scale={1.02}>
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-500" />
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="bg-black/30 p-3 rounded-full shrink-0 border border-white/10">{item.icon}</div>

                        <div className="space-y-1 flex-grow">
                          <h3 className="text-xl font-semibold">{item.position}</h3>
                          <p className="text-muted-foreground">{item.company}</p>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                            {item.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          </SectionTransition>
        ))}
      </div>
    </SectionContainer>
  )
}
