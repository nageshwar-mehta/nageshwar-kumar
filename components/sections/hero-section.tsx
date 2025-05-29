"use client"

import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ExternalLink } from "lucide-react"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TiltCard } from "@/components/ui/tilt-card"
import { useRef } from "react"
import { SectionTransition } from "@/components/section-transition"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  // Parallax effect for hero content
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const words = [
    { text: "IoT" },
    { text: "•" },
    { text: "Machine" },
    { text: "Learning" },
    { text: "•" },
    { text: "Hardware" },
    { text: "Integration" },
  ]

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      <div className="container relative z-10 max-w-5xl mx-auto">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8 text-center"
        >
          <SectionTransition transitionType="zoom" delay={0.1}>
            <TiltCard maxTilt={20} scale={1.1} className="inline-block">
              <div className="mx-auto w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden p-1 glass glow">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl md:text-3xl shadow-lg shadow-purple-500/25">
                  NK
                </div>
              </div>
            </TiltCard>
          </SectionTransition>

          <SectionTransition transitionType="slide-up" delay={0.3}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading gradient-text">Nageshwar Kumar</h1>
          </SectionTransition>

          <SectionTransition transitionType="fade" delay={0.5}>
            <TypewriterEffect words={words} className="text-lg md:text-xl text-muted-foreground justify-center" />
          </SectionTransition>

          <SectionTransition transitionType="slide-up" delay={0.7}>
            <p className="text-lg text-muted-foreground">Final Year Student at IIT Jammu</p>
          </SectionTransition>

          <SectionTransition transitionType="slide-up" delay={0.9}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={scrollToAbout}
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 shadow-lg shadow-purple-500/25 transform transition-all duration-200 hover:scale-105"
              >
                Explore My Work
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="glass glass-hover border-white/10 transform transition-all duration-200 hover:scale-105"
              >
                <a href="#contact">
                  Get In Touch
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </SectionTransition>

          <SectionTransition transitionType="fade" delay={1.1}>
            <div className="mt-8 text-muted-foreground">
              <p className="text-sm">Winner Invention-Factory | Runner-UP Pitchers 3.0 | IoT-Intern @ MyPerro</p>
            </div>
          </SectionTransition>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToAbout} aria-label="Scroll down">
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  )
}
