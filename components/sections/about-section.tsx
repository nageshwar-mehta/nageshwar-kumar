"use client"

import type React from "react"

import { motion } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Github, Linkedin } from "lucide-react"
import { ParallaxSection } from "@/components/parallax-section"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"

export function AboutSection() {
  return (
    <SectionContainer id="about" className="bg-black/20">
      <SectionTransition transitionType="fade">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about IoT, VLSI, and hardware-software integrations"
        />
      </SectionTransition>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="md:col-span-1">
          <ParallaxSection offset={30} direction="up">
            <SectionTransition transitionType="slide-right" delay={0.2}>
              <TiltCard maxTilt={15} scale={1.05}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl"
                >
                  <img src="/images/profile.png" alt="Nageshwar Kumar" className="w-full h-full object-cover" />
                </motion.div>
              </TiltCard>
            </SectionTransition>
          </ParallaxSection>
        </div>

        <div className="md:col-span-2 space-y-6">
          <ParallaxSection offset={30} direction="down">
            <SectionTransition transitionType="slide-left" delay={0.4}>
              <TiltCard maxTilt={8} scale={1.02}>
                <Card className="glass glass-hover glow">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        I am passionate about IoT, VLSI, and hardware-software integrations. My focus is on
                        developing smart devices and optimizing algorithms to bridge hardware-software gaps for
                        impactful solutions.
                      </p>

                      <p className="text-muted-foreground leading-relaxed">
                        With experience in various technical roles and a strong academic background, I am dedicated to
                        creating innovative solutions that address real-world challenges. My work has been recognized
                        through awards, patents, and collaborations with organizations like the Indian Army.
                      </p>

                      <p className="text-muted-foreground leading-relaxed">
                        I believe in the power of technology to solve complex problems and improve lives. My
                        interdisciplinary approach combines electrical engineering principles with software development
                        to create integrated solutions that work seamlessly across hardware and software boundaries.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <ContactItem icon={<Mail className="h-5 w-5 text-primary" />} label="Email">
                        <a href="mailto:2022uee0138@iitjammu.ac.in" className="hover:text-primary transition-colors">
                          2022uee0138@iitjammu.ac.in
                        </a>
                      </ContactItem>

                      <ContactItem icon={<Phone className="h-5 w-5 text-primary" />} label="Phone">
                        <a href="tel:+919103553896" className="hover:text-primary transition-colors">
                          +91 9103553896
                        </a>
                      </ContactItem>

                      <ContactItem icon={<Github className="h-5 w-5 text-primary" />} label="GitHub">
                        <a
                          href="https://github.com/nageshwar-mehta"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          github.com/nageshwar-mehta
                        </a>
                      </ContactItem>

                      <ContactItem icon={<Linkedin className="h-5 w-5 text-primary" />} label="LinkedIn">
                        <a
                          href="https://linkedin.com/in/nageshwar-kumar-mehta"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          linkedin.com/in/nageshwar-kumar-mehta
                        </a>
                      </ContactItem>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </SectionTransition>
          </ParallaxSection>
        </div>
      </motion.div>
    </SectionContainer>
  )
}

interface ContactItemProps {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}

function ContactItem({ icon, label, children }: ContactItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 mt-0.5 p-2 rounded-full glass">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="text-sm font-medium">{children}</div>
      </div>
    </div>
  )
}
