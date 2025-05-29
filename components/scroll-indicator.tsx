"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

interface ScrollIndicatorProps {
  color?: string
  height?: number
  showPercentage?: boolean
}

export function ScrollIndicator({
  color = "bg-gradient-to-r from-purple-500 to-pink-500",
  height = 3,
  showPercentage = false,
}: ScrollIndicatorProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollPercentage(Math.round(latest * 100))
    })
  }, [scrollYProgress])

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 origin-left ${color}`}
        style={{ scaleX, height: `${height}px` }}
      />
      {showPercentage && (
        <div className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium z-50">
          {scrollPercentage}%
        </div>
      )}
    </>
  )
}
