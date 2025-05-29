"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Home,
  User,
  GraduationCap,
  Code2,
  Cpu,
  FileText,
  Briefcase,
  Award,
  Users,
  Mail,
  Github,
  Linkedin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMounted, setIsMounted] = useState(false)

  // Handle scroll to update active section
  useEffect(() => {
    setIsMounted(true)

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

  if (!isMounted) return null

  return (
    <TooltipProvider delayDuration={300}>
      <aside className="fixed left-0 top-0 h-full w-16 md:w-20 glass border-r border-white/5 flex flex-col items-center py-8 z-50">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm md:text-base mb-10 shadow-lg shadow-purple-500/25">
          NK
        </div>

        <nav className="flex flex-col items-center gap-6 md:gap-8 w-full">
          <NavItem
            icon={<Home size={20} />}
            label="Home"
            isActive={activeSection === "home"}
            onClick={() => scrollToSection("home")}
          />

          <NavItem
            icon={<User size={20} />}
            label="About"
            isActive={activeSection === "about"}
            onClick={() => scrollToSection("about")}
          />

          <NavItem
            icon={<GraduationCap size={20} />}
            label="Education"
            isActive={activeSection === "education"}
            onClick={() => scrollToSection("education")}
          />

          <NavItem
            icon={<Code2 size={20} />}
            label="Projects"
            isActive={activeSection === "projects"}
            onClick={() => scrollToSection("projects")}
          />

          <NavItem
            icon={<Cpu size={20} />}
            label="Skills"
            isActive={activeSection === "skills"}
            onClick={() => scrollToSection("skills")}
          />

          <NavItem
            icon={<FileText size={20} />}
            label="Patents"
            isActive={activeSection === "patents"}
            onClick={() => scrollToSection("patents")}
          />

          <NavItem
            icon={<Briefcase size={20} />}
            label="Experience"
            isActive={activeSection === "experience"}
            onClick={() => scrollToSection("experience")}
          />

          <NavItem
            icon={<Award size={20} />}
            label="Achievements"
            isActive={activeSection === "achievements"}
            onClick={() => scrollToSection("achievements")}
          />

          <NavItem
            icon={<Users size={20} />}
            label="Responsibilities"
            isActive={activeSection === "responsibilities"}
            onClick={() => scrollToSection("responsibilities")}
          />

          <NavItem
            icon={<Mail size={20} />}
            label="Contact"
            isActive={activeSection === "contact"}
            onClick={() => scrollToSection("contact")}
          />
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <a
            href="https://github.com/nageshwar-mehta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/nageshwar-kumar-mehta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </aside>
    </TooltipProvider>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "w-full flex justify-center py-2 relative group",
            isActive ? "text-white" : "text-white/50 hover:text-white/80",
          )}
          aria-label={label}
        >
          {isActive && (
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full shadow-lg shadow-purple-500/50" />
          )}
          <span className="transition-transform duration-200 group-hover:scale-110">{icon}</span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-black/90 border-white/10 text-white">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
