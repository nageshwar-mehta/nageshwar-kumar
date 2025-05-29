"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string
  color?: string
  height?: number
  width?: string
  animate?: boolean
}

export function SectionDivider({
  className,
  color = "from-purple-500/20 via-pink-500/20 to-blue-500/20",
  height = 1,
  width = "80%",
  animate = true,
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <div ref={ref} className={cn("flex justify-center my-8 md:my-12 w-full", className)}>
      <motion.div
        className={cn("h-px bg-gradient-to-r", color)}
        style={{
          width,
          height: `${height}px`,
          scaleX: animate ? scaleX : 1,
          transformOrigin: "left",
        }}
      />
    </div>
  )
}
