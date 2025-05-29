"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxBackground() {
  const [windowHeight, setWindowHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Different parallax rates for different elements
  const y1 = useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.1])
  const y2 = useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.2])
  const y3 = useTransform(scrollY, [0, windowHeight], [0, windowHeight * 0.3])
  const opacity1 = useTransform(scrollY, [0, windowHeight * 0.5], [1, 0.3])
  const opacity2 = useTransform(scrollY, [0, windowHeight * 0.7], [0.7, 0.1])
  const scale1 = useTransform(scrollY, [0, windowHeight], [1, 1.1])
  const scale2 = useTransform(scrollY, [0, windowHeight], [1, 1.2])

  useEffect(() => {
    // Set window height for parallax calculations
    setWindowHeight(window.innerHeight)

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Base layer - slowest moving */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: y1, opacity: opacity1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />
      </motion.div>

      {/* Middle layer - medium speed */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: y2, opacity: opacity2, scale: scale1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900/5 via-transparent to-indigo-900/5" />
        <ParallaxOrb
          className="top-[20%] left-[15%]"
          color="from-purple-500/10 to-pink-500/5"
          size="w-[30vw] h-[30vw]"
          delay={0}
          parallaxFactor={0.15}
        />
        <ParallaxOrb
          className="top-[60%] right-[10%]"
          color="from-blue-500/10 to-indigo-500/5"
          size="w-[25vw] h-[25vw]"
          delay={0.3}
          parallaxFactor={0.2}
        />
      </motion.div>

      {/* Top layer - fastest moving */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: y3, scale: scale2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <ParallaxOrb
          className="top-[10%] right-[20%]"
          color="from-pink-500/10 to-purple-500/5"
          size="w-[20vw] h-[20vw]"
          delay={0.1}
          parallaxFactor={0.25}
        />
        <ParallaxOrb
          className="top-[70%] left-[25%]"
          color="from-indigo-500/10 to-blue-500/5"
          size="w-[22vw] h-[22vw]"
          delay={0.2}
          parallaxFactor={0.3}
        />
        <ParallaxOrb
          className="top-[40%] left-[60%]"
          color="from-violet-500/10 to-fuchsia-500/5"
          size="w-[15vw] h-[15vw]"
          delay={0.4}
          parallaxFactor={0.35}
        />
      </motion.div>

      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-20" />
    </div>
  )
}

interface ParallaxOrbProps {
  className: string
  color: string
  size: string
  delay: number
  parallaxFactor: number
}

function ParallaxOrb({ className, color, size, delay, parallaxFactor }: ParallaxOrbProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * parallaxFactor])
  const rotate = useTransform(scrollY, [0, 1000], [0, 30])
  const scale = useTransform(scrollY, [0, 1000], [1, 1 + parallaxFactor * 0.2])

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${size} ${className}`}
      style={{
        y,
        rotate,
        scale,
        background: `radial-gradient(circle, var(--tw-gradient-stops))`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay }}
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-br ${color}`} />
    </motion.div>
  )
}
