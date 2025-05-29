"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"

const educationData = [
  {
    institution: "Indian Institute of Technology, Jammu",
    degree: "B.Tech in Electrical Engineering",
    grade: "CGPA: 9.11/10",
    period: "November 2022 – Present",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
  },
  {
    institution: "Inter Science College, Hazaribag",
    degree: "Senior Secondary School",
    grade: "96.4%",
    period: "April 2020 – March 2022",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
  },
  {
    institution: "Munam Public School, Hazaribag",
    degree: "High School",
    grade: "88.4%",
    period: "April 2019 – March 2020",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
  },
]

export function EducationSection() {
  return (
    <SectionContainer id="education">
      <SectionTransition transitionType="fade">
        <SectionHeading title="Education" subtitle="My academic journey and qualifications" />
      </SectionTransition>

      <div className="space-y-8">
        {educationData.map((item, index) => (
          <SectionTransition key={index} transitionType="slide-up" index={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TiltCard maxTilt={8} scale={1.02}>
                <Card className="glass glass-hover overflow-hidden group transition-all duration-300 glow-hover">
                  <CardContent className="p-0">
                    <div className="relative">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 transition-all duration-500" />
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="glass p-3 rounded-full shrink-0">{item.icon}</div>

                          <div className="space-y-1 flex-grow">
                            <h3 className="text-xl font-semibold">{item.institution}</h3>
                            <p className="text-muted-foreground">{item.degree}</p>
                            <p className="text-muted-foreground">{item.grade}</p>
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
            </motion.div>
          </SectionTransition>
        ))}
      </div>
    </SectionContainer>
  )
}
