"use client"

import { motion } from "framer-motion"

interface ProjectFilterStatsProps {
  totalProjects: number
  filteredCount: number
  selectedCategory: string
  hasSearchQuery: boolean
}

export function ProjectFilterStats({
  totalProjects,
  filteredCount,
  selectedCategory,
  hasSearchQuery,
}: ProjectFilterStatsProps) {
  // Don't show stats if no filtering is applied
  if (selectedCategory === "All" && !hasSearchQuery) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-sm text-muted-foreground text-center mb-4"
    >
      Showing {filteredCount} of {totalProjects} projects
      {selectedCategory !== "All" && (
        <span>
          {" "}
          in <span className="text-primary font-medium">{selectedCategory}</span>
        </span>
      )}
      {hasSearchQuery && <span> matching your search</span>}
    </motion.div>
  )
}
