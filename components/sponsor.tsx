"use client"

import { motion, type Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { siteConfig } from "@/config/site"
import Image from "next/image"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function Sponsors() {
  return (
    <motion.div
      className="bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <h1 className="text-4xl font-bold text-[#1a1a1f] mb-6 text-center">
        Our Partners & Sponsors
      </h1>
      <motion.div
        className="flex flex-wrap justify-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {siteConfig.sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group"
          >
            <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white w-48 h-32">
              <CardContent className="flex flex-col items-center justify-center text-center h-full p-0">
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center h-full w-full"
                >
                  <div className="relative h-12 w-full mb-2">
                    <Image
                      src={sponsor.link || "/placeholder.svg"}
                      alt={sponsor.title}
                      fill
                      sizes="(max-width: 192px) 100vw, 192px"
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      quality={75}
                    />
                  </div>
                  <p className="font-bold text-xs text-[#1a1a1f] leading-tight">
                    {sponsor.title}
                  </p>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}