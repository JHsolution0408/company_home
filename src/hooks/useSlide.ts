"use client"

import { useState, useCallback, useEffect } from "react"

interface UseSlideOptions {
  totalSlides: number
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function useSlide({ totalSlides, autoPlay = false, autoPlayInterval = 5000 }: UseSlideOptions) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, nextSlide])

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  }
}
