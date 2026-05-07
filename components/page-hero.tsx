"use client"

import { type ReactNode, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImagesSliderProps {
  images: string[]
  className?: string
  interval?: number // ms
  children?: ReactNode
}

export default function ImagesSlider({ images, interval = 6000, className, children }: ImagesSliderProps) {
  const [index, setIndex] = useState(0)

  // auto-play
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [images.length, interval])

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            quality={75}
            sizes="100vw"
            className="object-cover"
            unoptimized={false}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-black/60" />
      <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 via-blue-900/60 to-gray-900/80" />
      <div className="relative z-10 flex items-center justify-center h-full">{children}</div>
    </div>
  )
}
