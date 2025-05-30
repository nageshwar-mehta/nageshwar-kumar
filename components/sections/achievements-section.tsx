"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Award, GraduationCap, Trophy } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"

const achievementsData = [
  {
    category: "Academic",
    items: [
      {
        title: "JEE Main 2022",
        description: "98.16% (Top 1.3M candidates)",
        icon: <GraduationCap className="h-6 w-6 text-primary" />,
      },
      {
        title: "JEE Advanced 2022",
        description: "AIR 4064",
        icon: <GraduationCap className="h-6 w-6 text-primary" />,
      },
    ],
  },
  {
    category: "Awards",
    items: [
      {
        title: "Best Invention Award",
        description: "Invention Factory, 200,000 INR",
        icon: <Trophy className="h-6 w-6 text-primary" />,
      },
      {
        title: "Runner-Up",
        description: "Pitchers 3.0, 40,000 INR",
        icon: <Trophy className="h-6 w-6 text-primary" />,
      },
    ],
  },
  {
    category: "Fellowships",
    items: [
      {
        title: "TiH IoT Fellowship",
        description: "IIT Bombay, 10,000 INR/month",
        icon: <Award className="h-6 w-6 text-primary" />,
      },
      {
        title: "JAC State Rank 6",
        description: "15,000 INR",
        icon: <Award className="h-6 w-6 text-primary" />,
      },
    ],
  },
]

export function AchievementsSection() {
  return (
    <SectionContainer id="achievements" className="bg-black/20">
      <SectionTransition transitionType="fade">
        <SectionHeading title="Achievements" subtitle="Highlights of my academic and professional achievements" />
      </SectionTransition>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievementsData.map((category, categoryIndex) => (
          <SectionTransition key={categoryIndex} transitionType="slide-up" index={categoryIndex} delay={0.2}>
            <TiltCard maxTilt={10} scale={1.02}>
              <Card className="glass glass-hover h-full transition-all duration-300 glow-hover">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-white/5">{category.category}</h3>

                  <div className="space-y-6">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 + itemIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="glass p-2 rounded-full mt-0.5 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/20">
                            {item.icon}
                          </div>

                          <div>
                            <h4 className="font-medium group-hover:text-primary transition-colors">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
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
