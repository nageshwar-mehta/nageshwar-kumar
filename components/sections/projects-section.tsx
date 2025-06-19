"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionContainer } from "@/components/section-container"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, ExternalLink, Award, FileText, Search } from "lucide-react"
import { ParallaxSection } from "@/components/parallax-section"
import { TiltCard } from "@/components/ui/tilt-card"
import { SectionTransition } from "@/components/section-transition"
import { SearchInput } from "@/components/ui/search-input"
import { FilterButton } from "@/components/ui/filter-button"
import { EmptyState } from "@/components/ui/empty-state"
import { ProjectFilterStats } from "@/components/project-filter-stats"

// Define project categories
type ProjectCategory = "All" | "IoT" | "Embedded" | "Military" | "Agriculture" | "Hardware" | "Software"

// Enhanced project type with categories
interface Project {
  title: string
  description: string
  tech: string[]
  categories: ProjectCategory[]
  awards?: string[]
  patent?: string
  patents?: string[]
  Research?: string
  collaboration?: string
  showcase?: string
  github: string
  image: string
}

const projects: Project[] = [
  {
    title: "Tactile Glove for Deafblind Communication",
    description: "A real-time communication device that translates text into tactile patterns for deafblind individuals and converts tactile input back into text.",
    tech: ["ESP", "MPR121 sensors", "ERM vibration", "IoT"],
    categories: ["IoT", "Hardware", "Embedded"],
    awards: ["200,000 INR (Best Invention Award)", "Hyundai Hope Scholarship","Runner Up Pitchers 3.0"],
    patent: "Provisional filed (TEMPE-1/94265/2024-DEL)",
    github: "https://github.com/nageshwar-mehta/Invention-Factory",
    image: "/images/projects/tactile-glove.png",
  },
  {
    title: "Laser Warning System",
    description: "A system to detect and warn about laser targeting for military tanks.",
    tech: ["Embedded Systems", "Laser Detection", "Military Tech"],
    categories: ["Military", "Hardware", "Embedded"],
    collaboration: "Indian Army (150,000 INR grant)",
    patent: "In process",
    github: "https://github.com/nageshwar-mehta/LWS",
    image: "/images/projects/laser-warning-system.png",
  },
  {
    title: "Anti-GPS Jamming System",
    description: "A system to prevent GPS jamming attacks on Military vehicles, ensuring reliable navigation.",
    tech: ["Safron module", "Neo-M8M/N GPS", "Signal Processing"],
    categories: ["Military", "Hardware"],
    showcase: "Presented at North-Tech Symposium 2023 to defense experts and army officers, with Defence Minister Rajnath Singh as the chief guest.",
    github: "https://github.com/nageshwar-mehta",
    image: "/images/projects/anti-gps-jamming.png",
  },
  {
    title: "Plant Water Stress Detector",
    description: "A device that detects water stress in plants using IR sensors and incorporates a CWSI (Crop Water Stress Index) scale for specific plant species.",
    tech: ["Arduino", "MLX90614 sensor", "Agriculture Tech"],
    categories: ["Agriculture", "IoT", "Hardware"],
    patents: ["202511006952", "202511006951"],
    github: "https://github.com/nageshwar-mehta/Mini-project-24",
    image: "/images/projects/plant-water-stress.png",
  },
  {
    title: "VimaanCalc: Propulsion Analysis for Drones",
    description: "An online calculator designed to analyze drone performance based on various parameters.",
    tech: ["HTML", "CSS", "Drone"],
    categories: ["Software"],
    collaboration:"Writing a research paper under Supervision of Dr.Nalin kumar sharma (Assistant Professor, IIT Jammu)",
    github: "https://vimaan-calc-iitjmu.vercel.app/",
    image: "/images/projects/drone-calc.png",
  },
  {
    title: "Mesh Network for Remote Areas",
    description: "A LoRa network solution designed to enable communication in remote areas with limited connectivity.",
    tech: ["Dragino", "LoRa", "Chirpstack"],
    categories: ["IoT", "Hardware"],
    github: "https://github.com/nageshwar-mehta/LORA",
    image: "/images/projects/mesh-network.png",
  },
]

// All available categories
const allCategories: ProjectCategory[] = ["All", "IoT", "Embedded", "Military", "Agriculture", "Hardware", "Software"]

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [isFiltering, setIsFiltering] = useState(false)

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = new Map<ProjectCategory, number>()

    // Initialize all categories with 0
    allCategories.forEach((category) => {
      counts.set(category, 0)
    })

    // Count projects in each category
    projects.forEach((project) => {
      project.categories.forEach((category) => {
        counts.set(category, (counts.get(category) || 0) + 1)
      })
    })

    // Set "All" count to total projects
    counts.set("All", projects.length)

    return counts
  }, [])

  // Filter projects based on selected category and search query
  useEffect(() => {
    setIsFiltering(true)

    const filterProjects = () => {
      let result = projects

      // Filter by category
      if (selectedCategory !== "All") {
        result = result.filter((project) => project.categories.includes(selectedCategory))
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        result = result.filter(
          (project) =>
            project.title.toLowerCase().includes(query) ||
            project.description.toLowerCase().includes(query) ||
            project.tech.some((tech) => tech.toLowerCase().includes(query)) ||
            project.categories.some((category) => category.toLowerCase().includes(query)),
        )
      }

      setFilteredProjects(result)
      setIsFiltering(false)
    }

    // Add a small delay to show filtering animation
    const timer = setTimeout(filterProjects, 300)
    return () => clearTimeout(timer)
  }, [selectedCategory, searchQuery])

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
  }

  return (
    <SectionContainer id="projects" className="bg-black/20">
      <SectionTransition transitionType="fade">
        <SectionHeading
          title="Projects"
          subtitle="A collection of my most significant projects in IoT, Machine Learning, and hardware-software integration"
        />
      </SectionTransition>

      <SectionTransition transitionType="slide-up" delay={0.2}>
        <div className="mb-8 space-y-4">
          {/* Search input */}
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search projects by title, tech, or category..."
            className="max-w-xl mx-auto"
          />

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {allCategories.map((category) => (
              <FilterButton
                key={category}
                active={selectedCategory === category}
                label={category}
                count={categoryCounts.get(category)}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>

          {/* Filter stats */}
          <AnimatePresence>
            {(selectedCategory !== "All" || searchQuery) && (
              <ProjectFilterStats
                totalProjects={projects.length}
                filteredCount={filteredProjects.length}
                selectedCategory={selectedCategory}
                hasSearchQuery={!!searchQuery}
              />
            )}
          </AnimatePresence>
        </div>
      </SectionTransition>

      {/* Loading state */}
      <AnimatePresence>
        {isFiltering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-8"
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
              <div className="absolute inset-0 rounded-full border-r-2 border-pink-500 animate-spin animation-delay-150"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results message */}
      <AnimatePresence>
        {!isFiltering && filteredProjects.length === 0 && (
          <EmptyState
            icon={<Search className="h-12 w-12 mx-auto opacity-50" />}
            title="No projects found"
            description="Try adjusting your search or filter to find what you're looking for."
            actionLabel="Clear filters"
            onAction={clearFilters}
          />
        )}
      </AnimatePresence>

      {/* Projects grid */}
      {!isFiltering && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ParallaxSection
              key={project.title}
              offset={20 + (index % 2) * 10}
              direction={index % 2 === 0 ? "up" : "down"}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <TiltCard className="h-full" maxTilt={10} scale={1.02}>
                  <Card className="h-full flex flex-col overflow-hidden glass glass-hover transition-all duration-300 group glow-hover">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      {/* Category badges */}
                      <div className="absolute top-2 right-2 z-20 flex flex-wrap gap-1 justify-end">
                        {project.categories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="bg-black/50 backdrop-blur-sm text-white text-xs cursor-pointer hover:bg-black/70 transition-colors"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setSelectedCategory(category)
                            }}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="glass text-purple-300 hover:text-purple-200 transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {project.awards && (
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <div className="text-sm text-muted-foreground">
                              {project.awards.map((award, i) => (
                                <p key={i}>{award}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        {project.patent && (
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
                            <p className="text-sm text-muted-foreground">Patent: {project.patent}</p>
                          </div>
                        )}

                        {project.patents && (
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-blue-500 mt-0.5" />
                            <p className="text-sm text-muted-foreground">Patents: {project.patents.join(", ")}</p>
                          </div>
                        )}

                        {project.collaboration && (
                          <div className="flex items-start gap-2">
                            <ExternalLink className="h-4 w-4 text-green-500 mt-0.5" />
                            <p className="text-sm text-muted-foreground">Collaboration: {project.collaboration}</p>
                          </div>
                        )}

                        {project.showcase && (
                          <div className="flex items-start gap-2">
                            <ExternalLink className="h-4 w-4 text-purple-500 mt-0.5" />
                            <p className="text-sm text-muted-foreground">Showcase: {project.showcase}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-white/5 pt-4">
                      <Button variant="outline" size="sm" className="w-full glass glass-hover" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Project
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </TiltCard>
              </motion.div>
            </ParallaxSection>
          ))}
        </div>
      )}
    </SectionContainer>
  )
}
