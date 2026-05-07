"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedCounter } from "@/components/animated-counter"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import Sponsors from "@/components/sponsor"

export default function Teams() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        className="bg-[#1a1a1f] text-primary-foreground py-6 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-2xl font-bold text-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Robotics Teams
          </motion.h1>
          <motion.p
            className="text-sm text-center opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Inspiring the next generation of engineers
          </motion.p>
        </div>
      </motion.div>

      {/* Content container */}
      <div className="max-w-4xl mx-auto space-y-8 p-6">
        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {siteConfig.stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="text-center p-6 bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="space-y-3">
                <div className={`w-12 h-12 mx-auto rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-[#1a1a1f]">
                  <AnimatedCounter end={stat.value} duration={1500 + index * 200} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#1a1a1f] text-center">Our Initiative</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Since 2019, Coast 2 Coast Robotics has proudly competed in regional, state, and international competitions, including the prestigious international VEX and VEX IQ World Championship, and various coding competitions.
              </p>
              <p>
                We are devoted to uplifting the next generation of engineers who will grow to exemplify teamwork, creativity, and technical excellence through our organization&apos;s mentoring programs.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our dream is to inspire students to pursue careers in STEM through hands-on robotics, real-world programming, and collaborative engineering challenges that build confident engineering skills and the drive to make a bigger impact on the world.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href={siteConfig.siteURLs.history}>
            <Button size="lg" className="bg-[#1a1a1f] hover:bg-gray-600 text-white font-bold px-8 py-4">
              View Team History
            </Button>
          </Link>
        </motion.div>

        {/* Sponsors Section */}
        <Sponsors />
      </div>
    </div>
  )
}