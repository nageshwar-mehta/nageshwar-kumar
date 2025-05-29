"use client"

import { useEffect, useState } from "react"

interface ResourceLoaderProps {
  onProgress: (progress: number) => void
  onComplete: () => void
}

export function ResourceLoader({ onProgress, onComplete }: ResourceLoaderProps) {
  const [loadedResources, setLoadedResources] = useState(0)
  const [totalResources, setTotalResources] = useState(0)

  useEffect(() => {
    // Get all images on the page
    const images = document.querySelectorAll("img")
    setTotalResources(images.length)

    // If no images, complete immediately
    if (images.length === 0) {
      onComplete()
      return
    }

    // Track loading progress
    let loaded = 0

    const imageLoaded = () => {
      loaded++
      setLoadedResources(loaded)
      const progress = (loaded / images.length) * 100
      onProgress(progress)

      if (loaded === images.length) {
        onComplete()
      }
    }

    // Set up load event listeners
    images.forEach((img) => {
      if (img.complete) {
        imageLoaded()
      } else {
        img.addEventListener("load", imageLoaded)
        img.addEventListener("error", imageLoaded) // Count errors as loaded to avoid hanging
      }
    })

    // Add a timeout to ensure completion even if some resources fail
    const timeout = setTimeout(() => {
      onComplete()
    }, 5000)

    return () => {
      clearTimeout(timeout)
      images.forEach((img) => {
        img.removeEventListener("load", imageLoaded)
        img.removeEventListener("error", imageLoaded)
      })
    }
  }, [onComplete, onProgress])

  return null
}
