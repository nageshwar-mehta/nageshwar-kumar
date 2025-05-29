"use client"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"

const responsibilitiesData = [
  {
    position: "Co-Head",
    organization: "Robotics Club & Competitive Programming Dept., IIT Jammu",
    period: "2023–24",
    description: "Led technical workshops and coordinated robotics competitions.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    position: "General Secretary (Technical)",
    organization: "Inter-IIT Tech Meet 13.0",
    period: "2024",
    description: "Managed technical events and coordinated with other IITs for the annual tech meet.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    position: "Event Head",
    organization: "National-level CP/ML competitions at IIT Jammu",
    period: "2023-24",
    description: "Organized and judged competitive programming and machine learning contests.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    position: "Campus Ambassador",
    organization: "Wayspire",
    period: "2023",
    description: "Promoted educational initiatives and organized workshops on campus.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
]

export function ResponsibilitiesSection() {
  return (
    <SectionContainer id="responsibilities">
      <SectionTransition transitionType="fade">
        <SectionHeading
          title="Positions of Responsibility"
          subtitle="Leadership roles and organizational responsibilities"
        />
      </SectionTransition>

      <div className="space-y-6">
        {responsibilitiesData.map((item, index) => (
          <SectionTransition key={index} transitionType="slide-up" index={index} delay={0.2}>
            <TiltCard maxTilt={8} scale={1.02}>
              <Card className="bg-black/30 border-white/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-primary" />
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="bg-black/30 p-3 rounded-full shrink-0 border border-white/10">{item.icon}</div>

                        <div className="space-y-1 flex-grow">
                          <h3 className="text-xl font-semibold">{item.position}</h3>
                          <p className="text-muted-foreground">{item.organization}</p>
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
