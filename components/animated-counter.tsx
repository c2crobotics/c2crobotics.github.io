"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  startCounting?: boolean
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  startCounting = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Do not start animation when not in viewport
    if (!startCounting) {
      return
    }

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      setCount(0)
    }
  }, [end, duration, startCounting])

  return (
    <span className="font-bold">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}