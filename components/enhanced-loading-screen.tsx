"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function EnhancedLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loadingText, setLoadingText] = useState("Loading Portfolio")

  // Loading messages to cycle through
  const loadingMessages = [
    "Loading Portfolio",
    "Initializing Projects",
    "Preparing Skills",
    "Gathering Experience",
    "Polishing UI",
    "Almost Ready",
  ]

  useEffect(() => {
    // Cycle through loading messages
    const messageInterval = setInterval(() => {
      const currentIndex = loadingMessages.indexOf(loadingText)
      const nextIndex = (currentIndex + 1) % loadingMessages.length
      setLoadingText(loadingMessages[nextIndex])
    }, 1500)

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 200)

    // Ensure loading screen shows for at least 2.5 seconds
    const minLoadTime = setTimeout(() => {
      if (progress >= 100) {
        setIsLoading(false)
      }
    }, 2500)

    // Initialize canvas animation
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Particle system
        const particles: Particle[] = []
        const particleCount = 50

        // Create particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `hsl(${Math.random() * 60 + 260}, 70%, 60%)`,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
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
            ctx.globalAlpha = particle.alpha
            ctx.fill()
          })

          // Draw connections between particles
          ctx.globalAlpha = 0.2
          ctx.strokeStyle = "#a855f7"
          particles.forEach((particle, i) => {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particle.x - particles[j].x
              const dy = particle.y - particles[j].y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 100) {
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
      }
    }

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
      clearTimeout(minLoadTime)
    }
  }, [progress, loadingText, loadingMessages, isLoading])

  return (
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
              <motion.h2
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-bold gradient-text"
              >
                {loadingText}
              </motion.h2>

              {/* Progress bar */}
              <div className="w-72 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Progress percentage */}
              <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
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
