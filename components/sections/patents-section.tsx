"use client"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"

const patentsData = [
  {
    title: "Portable Plant Stress Detector",
    description: "A device that detects water stress in plants using IR sensors and incorporates a CWSI (Crop Water Stress Index) scale for specific plant species.",
    filingInfo: "2 patents filed (202511006952, 202511006951), 2024",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "Tactile Glove",
    description: "A real-time communication device that translates text into tactile patterns for deafblind individuals and converts tactile input back into text.",
    filingInfo: "Provisional patent filed (TEMPE-1/94265/2024-DEL), 2024",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
  {
    title: "LWS System",
    description: "A laser warning system for military tanks to detect and alert about laser targeting.",
    filingInfo: "MoU with Indian Army, patent pending",
    icon: <FileText className="h-6 w-6 text-primary" />,
  },
]

export function PatentsSection() {
  return (
    <SectionContainer id="patents" className="bg-black/20">
      <SectionTransition transitionType="fade">
        <SectionHeading title="Patents & Publications" subtitle="My contributions to innovation and research" />
      </SectionTransition>

      <div className="space-y-6">
        {patentsData.map((item, index) => (
          <SectionTransition key={index} transitionType="slide-up" index={index} delay={0.2}>
            <TiltCard maxTilt={8} scale={1.02}>
              <Card className="glass glass-hover transition-all duration-300 overflow-hidden glow-hover">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-50" />
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="glass p-3 rounded-full shrink-0 mt-1">{item.icon}</div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                          <div className="inline-block px-3 py-1 rounded-full glass text-purple-300 text-sm mt-2">
                            {item.filingInfo}
                          </div>
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
