"use client"

import { useEffect, useRef } from "react"

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Aurora gradient animation
    let time = 0
    const gradients = [
      { x: 0.3, y: 0.3, radius: 0.4, hue: 200 },
      { x: 0.7, y: 0.7, radius: 0.5, hue: 280 },
      { x: 0.5, y: 0.5, radius: 0.6, hue: 240 },
    ]

    const animate = () => {
      if (!ctx) return

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw aurora gradients
      gradients.forEach((gradient, index) => {
        const x = gradient.x * canvas.width + Math.sin(time * 0.0005 + index) * 100
        const y = gradient.y * canvas.height + Math.cos(time * 0.0005 + index) * 100
        const radius = gradient.radius * Math.min(canvas.width, canvas.height)

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius)
        const hue = gradient.hue + Math.sin(time * 0.001) * 30

        grad.addColorStop(0, `hsla(${hue}, 70%, 50%, 0.1)`)
        grad.addColorStop(0.5, `hsla(${hue}, 60%, 40%, 0.05)`)
        grad.addColorStop(1, "transparent")

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      })

      // Add subtle noise texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 10
        data[i] = Math.max(0, Math.min(255, data[i] + noise))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
      }

      ctx.putImageData(imageData, 0, 0)

      time += 16
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-50" />
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10" />
    </>
  )
}
