"use client"

import { Home, User, GraduationCap, Code2, Cpu, FileText, Briefcase, Award, Users, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export function PortfolioSidebar() {
  const [activeSection, setActiveSection] = useState("home")

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "education",
        "projects",
        "skills",
        "patents",
        "experience",
        "achievements",
        "responsibilities",
        "contact",
      ]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 20,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-black flex flex-col items-center py-6 z-50">
      <nav className="flex flex-col items-center gap-8 w-full">
        <button
          onClick={() => scrollToSection("home")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "home" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Home"
        >
          <Home size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("about")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "about" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="About Me"
        >
          <User size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("education")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "education" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Education"
        >
          <GraduationCap size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("projects")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "projects" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Projects"
        >
          <Code2 size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("skills")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "skills" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Skills"
        >
          <Cpu size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("patents")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "patents" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Patents"
        >
          <FileText size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("experience")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "experience" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Experience"
        >
          <Briefcase size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("achievements")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "achievements" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Achievements"
        >
          <Award size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("responsibilities")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "responsibilities" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Responsibilities"
        >
          <Users size={20} className="text-white" />
        </button>

        <button
          onClick={() => scrollToSection("contact")}
          className={`w-full flex justify-center py-2 ${
            activeSection === "contact" ? "bg-neutral-800" : "hover:bg-neutral-900"
          }`}
          aria-label="Contact"
        >
          <Mail size={20} className="text-white" />
        </button>
      </nav>
    </div>
  )
}
