"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ResourceLoader } from "@/components/resource-loader"

export function AdvancedLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [resourceProgress, setResourceProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loadingPhase, setLoadingPhase] = useState(0)

  // Loading phases with messages
  const loadingPhases = [
    { message: "Initializing Portfolio", minDuration: 800 },
    { message: "Loading Projects", minDuration: 1000 },
    { message: "Preparing Skills", minDuration: 800 },
    { message: "Gathering Experience", minDuration: 700 },
    { message: "Polishing UI", minDuration: 900 },
    { message: "Almost Ready", minDuration: 500 },
  ]

  // Calculate combined progress (animation + actual resource loading)
  const combinedProgress = Math.min(100, progress * 0.7 + resourceProgress * 0.3)

  // Get current loading message safely
  const getCurrentLoadingMessage = () => {
    if (!loadingPhases || loadingPhase < 0 || loadingPhase >= loadingPhases.length) {
      return "Loading..."
    }
    return loadingPhases[loadingPhase]?.message || "Loading..."
  }

  useEffect(() => {
    // Ensure loadingPhase is within bounds
    if (loadingPhase < 0 || loadingPhase >= loadingPhases.length) {
      setLoadingPhase(0)
      return
    }

    // Progress through loading phases
    const phaseTimer = setTimeout(() => {
      if (loadingPhase < loadingPhases.length - 1) {
        setLoadingPhase((prev) => prev + 1)
      }
    }, loadingPhases[loadingPhase]?.minDuration || 800)

    // Simulate loading progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Slow down as we approach 100%
        const increment = Math.max(0.5, (100 - prev) / 10)
        const newProgress = prev + Math.random() * increment

        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return newProgress
      })
    }, 150)

    // Initialize canvas animation
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Particle system
        const particles: Particle[] = []
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))

        // Create particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 60 + 260}, 70%, 60%)`,
            vx: Math.random() * 1 - 0.5,
            vy: Math.random() * 1 - 0.5,
            alpha: Math.random() * 0.5 + 0.5,
          })
        }

        // Animation loop
        const animate = () => {
          if (!isLoading) return

          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // Update and draw particles
          particles.forEach((particle) => {
            particle.x += particle.vx
            particle.y += particle.vy

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

            // Draw particle
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
            ctx.fillStyle = particle.color
            ctx.globalAlpha = particle.alpha * (combinedProgress / 100) // Fade in with progress
            ctx.fill()
          })

          // Draw connections between particles
          ctx.globalAlpha = 0.15 * (combinedProgress / 100)
          ctx.strokeStyle = "#a855f7"
          particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particle.x - particles[j].x
              const dy = particle.y - particles[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 150) {
                ctx.beginPath()
                ctx.moveTo(particle.x, particle.y)
                ctx.lineTo(particles[j].x, particles[j].y)
                ctx.stroke()
              }
            }
          })

          requestAnimationFrame(animate)
        }

        animate()

        // Handle window resize
        const handleResize = () => {
          canvas.width = window.innerWidth
          canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
      }
    }

    return () => {
      clearTimeout(phaseTimer)
      clearInterval(progressInterval)
    }
  }, [progress, loadingPhase, loadingPhases, isLoading, combinedProgress])

  // Handle resource loading completion
  const handleResourceProgress = (progress: number) => {
    setResourceProgress(progress)
  }

  const handleLoadingComplete = () => {
    // Ensure we've shown all phases and reached 100%
    if (combinedProgress >= 100 && loadingPhase >= loadingPhases.length - 1) {
      // Add a small delay for the final phase to be visible
      setTimeout(() => setIsLoading(false), 800)
    } else {
      // Force completion after a maximum time
      setTimeout(() => setIsLoading(false), 2000)
    }
  }

  // Check if loading is complete when progress reaches 100%
  useEffect(() => {
    if (combinedProgress >= 100 && loadingPhase >= loadingPhases.length - 1) {
      setTimeout(() => setIsLoading(false), 800)
    }
  }, [combinedProgress, loadingPhase, loadingPhases.length])

  // Current loading message
  const currentMessage = getCurrentLoadingMessage()

  return (
    <>
      <ResourceLoader onProgress={handleResourceProgress} onComplete={handleLoadingComplete} />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            {/* Background canvas for particles */}
            <canvas ref={canvasRef} className="absolute inset-0" />

            <div className="relative z-10">
              {/* Animated logo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50"
                  />
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                        "0 0 40px rgba(168, 85, 247, 0.7)",
                        "0 0 20px rgba(168, 85, 247, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="relative w-36 h-36 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-5xl shadow-2xl"
                  >
                    NK
                  </motion.div>
                </div>
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-6"
              >
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={loadingPhase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold gradient-text h-8"
                  >
                    {currentMessage}
                  </motion.h2>
                </AnimatePresence>

                {/* Progress bar */}
                <div className="w-72 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${combinedProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Progress percentage */}
                <p className="text-sm text-muted-foreground">{Math.round(combinedProgress)}%</p>
              </motion.div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: [0, (i % 2 === 0 ? 1 : -1) * (60 + i * 20)],
                    y: [0, -120 - i * 30],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Particle type for canvas animation
interface Particle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  alpha: number
}
