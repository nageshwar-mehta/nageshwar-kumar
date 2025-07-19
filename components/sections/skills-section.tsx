"use client"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Cpu, Database, Wrench, BookOpen } from "lucide-react"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"

const skillCategories = [
  {
    id: "languages",
    name: "Languages",
    icon: <Code className="h-5 w-5" />,
    skills: ["C/C++", "Python", "SQL", "HTML", "Verilog"],
  },
  {
    id: "libraries",
    name: "Libraries",
    icon: <Database className="h-5 w-5" />,
    skills: ["Pandas", "NumPy", "scikit-learn", "Matplotlib", "WiFi", "HTTPSServer", "PainlessMesh", "ESPNOW"],
  },
  {
    id: "tools",
    name: "Tools",
    icon: <Wrench className="h-5 w-5" />,
    skills: ["Git", "VS Code", "Jupyter Notebook", "Arduino IDE", "Power BI", "Figma"],
  },
  {
    id: "hardware",
    name: "Hardware",
    icon: <Cpu className="h-5 w-5" />,
    skills: ["Arduino", "ESP8266", "Raspberry Pi", "Jetson Nano"],
  },
  {
    id: "cad",
    name: "CAD/Simulation tools",
    icon: <BookOpen className="h-5 w-5" />,
    skills: ["Kicad", "Quilter", "Vivado Xilinx", "LT Spice", "CST Studio Suite", "MATLAB", "SolidWorks", "LaTeX"],
  },
]

export function SkillsSection() {
  return (
    <SectionContainer id="skills">
      <SectionTransition transitionType="fade">
        <SectionHeading title="Skills" subtitle="A comprehensive overview of my technical skills and expertise" />
      </SectionTransition>

      <SectionTransition transitionType="slide-up" delay={0.2}>
        <Tabs defaultValue="languages" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 glass p-1">
            {skillCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-300"
              >
                {category.icon}
                <span className="hidden md:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card className="glass glow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <TiltCard key={index} maxTilt={12} scale={1.05}>
                          <div className="glass glass-hover rounded-lg p-4 h-full flex flex-col items-center justify-center text-center transition-all duration-300 group">
                            <p className="font-medium group-hover:text-primary transition-colors">{skill}</p>
                          </div>
                        </TiltCard>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </SectionTransition>

      <div className="mt-12">
        <SectionTransition transitionType="slide-up" delay={0.4}>
          <TiltCard maxTilt={8} scale={1.02}>
            <Card className="glass glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Relevant Courses</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    Machine Learning
                  </Badge>
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    Data Structures
                  </Badge>
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    Internet of Things
                  </Badge>
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    Robotics & Automation
                  </Badge>
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    Control System
                  </Badge>
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    Digital Communication
                  </Badge>
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    RF & Antennas
                  </Badge>
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    Embedded Systems
                  </Badge>
                  <Badge className="glass text-purple-300 hover:text-purple-200 transition-colors px-3 py-1.5">
                    Signal Processing
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </SectionTransition>
      </div>
    </SectionContainer>
  )
}
