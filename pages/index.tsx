import React, { Suspense, useEffect, useState } from "react";
import ImagesSlider from "@/components/page-hero";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site"
import Sponsors from "@/components/sponsor";
import AboutSection from "@/components/main/about-section"
import StoriesSection from "@/components/main/stories-section"
import CoursesSection from "@/components/main/courses-section"
import { ChevronDown } from "lucide-react"

const images = [
  "/Worlds2026_April23_JHO [IMG_9757]_horizontal.webp",
  "/States2026_March14_JHO [IMG_6709].webp",
  "/States2026_March14_JHO [IMG_6756].webp",
  "/Worlds2026_April23_JHO [IMG_9085].webp",
  "/Worlds2026_April26_JHO [IMG_0563].webp",
  "/Worlds2026_April27_JHO [IMG_1055].webp",
];

const taglines = ["Turning Dreams into Reality", "Robotics Redefined"]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsClient(true);
    });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: "smooth",
    })
  }

  // Early return with loading state
  if (!isClient || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse text-2xl text-neutral-400">Loading...</div>
      </div>
    );
  }

  return (
    <section className="overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        {/* Hero Section */}
        <div className="relative h-[calc(100vh-5rem)] w-full">
          <ImagesSlider className="object-cover" images={images}>
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="z-50 flex flex-col justify-center items-center px-4 h-full"
            >
              <motion.p
                className="font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center text-white py-4 main bg-linear-to-r from-white via-blue-100 to-white bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Coast 2 Coast Robotics
              </motion.p>

              {/* Taglines */}
              <div className="h-16 flex items-center justify-center mb-8">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={taglineIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="font-semibold text-2xl sm:text-3xl md:text-4xl secondary text-center bg-linear-to-r from-blue-200 via-blue-400 to-blue-200 bg-clip-text text-transparent"
                  >
                    {taglines[taglineIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="absolute bottom-8 cursor-pointer"
                onClick={scrollToNext}
              >
                <ChevronDown className="w-8 h-8 text-white animate-bounce" />
              </motion.div>
            </motion.div>
          </ImagesSlider>
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Courses Section */}
        <CoursesSection />

        {/* Stories Section */}
        {/* <StoriesSection /> */}

        {/* Sponsors Section */}
        <Suspense fallback={<div>Loading sponsors...</div>}>
          <div className="max-w-4xl mx-auto py-12 px-4">
            <Sponsors />
          </div>
        </Suspense>
      </Suspense>
    </section>
  );
}