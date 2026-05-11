"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Cog, Trophy, Clock, Star } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"

const courses = {
  learn: {
    icon: BarChart3,
    title: "Learn",
    description: "Get an immersive, practical experience - where students learn by doing.",
    courses: [
      {
        title: "Summer Academic Camps",
        description:
          "Join our week-long camps covering math, English, Chinese, and STEAM including robotics, 3D printing, and more.",
        duration: "Summer 2026",
        level: "Beginner",
        features: [
          "VEX IQ Robotics Platform",
          "Block-based programming",
          "Engineering principles",
          "Problem-solving skills",
        ],
      },
      {
        title: "SRB001 - Robotics Fundamentals Grades K-8, 6-12",
        description: "In this course, students will dive into core engineering principles, 3D design modeling using CAD, programming, and using the VEX IQ system. Students will also have the chance to build their first bot using the knowledge they've gained throughout the course, making this a major stepping stone in their robotics career.",
        duration: "Summer 2026, Saturdays",
        level: "Beginner",
        features: ["Engineering Design", "Mechanics", "Building"],
      },
      {
        title: "CTC001 - Programming for Grades K-5",
        description: "In this course, students will learn important programming fundamentals, numerous vital data types, and the essentials of C++ coding. This course provides detailed necessities of being a coder for your team.",
        duration: "Fall 2026",
        level: "Beginner",
        features: ["Programming skills", "Data types", "Problem-solving", "C++ basics"],
      },
      // {
      //   title: "3D Modelling and Design",
      //   description: "In this course, students will be given the opportunity to learn 3D modeling using CAD software such as Onshape, additive/negative manufacting, and numerous key design principles that can be used in robots and hundreds of other engineering fields. This course will equip the student with the proper knowledge and resources to become a professional designer.",
      //   duration: "Fall 2026",
      //   level: "Beginner",
      //   features: ["CAD design", "Design principles", "3d printing", "Problem-solving"],
      // },

    ],
  },
  create: {
    icon: Cog,
    title: "Create",
    description: "Using various design and development processes, develop and create your ideas.",
    courses: [
      // {
      //   title: "RV001 - Robotics for Grades 6-12",
      //   description: "Continue your robotics journey using the VEX robotics ecosystem, covering gear ratios, torque, speed, and other mechanical concepts.",
      //   duration: "Jan 6 - Apr 13, 2026",
      //   level: "Intermediate",
      //   features: ["VEX ecosystem", "Gear ratios", "Programming", "Design and modeling"],
      // },
      // {
      //   title: "CPP002 - Programming for Grades 6-12",
      //   description: "Advanced programming with complex data types, loops, and I/O operations.",
      //   duration: "Jan 6 - Apr 13, 2026",
      //   level: "Intermediate",
      //   features: ["Basic algorithms", "I/O operations", "Code validation"],
      // },
      {
        title: "3D Modelling and Design",
        description: "In this course, students will be given the opportunity to learn 3D modeling using CAD software such as Onshape, additive/negative manufacting, and numerous key design principles that can be used in robots and hundreds of other engineering fields. This course will equip the student with the proper knowledge and resources to become a professional designer.",
        duration: "Fall 2026",
        level: "Beginner",
        features: ["CAD design", "Design principles", "3d printing", "Problem-solving"],
      },
    ],
  },
  compete: {
    icon: Trophy,
    title: "Compete",
    description: "Show off your creations in competitions at the States and World Championships.",
    courses: [
      {
        title: "VEX V5 Competition Bootcamp",
        description:
          "Join our 8-week long summer bootcamp to learn the ins-and-outs of being on a V5 competition team. Teams will learn about teamwork, public speaking, building, designing, mechanics, programming, and more.",
        duration: "Summer 2026, June 29 - August 28",
        level: "Advanced",
        features: ["Tournament preparation", "Strategy development", "Team leadership", "Award pursuit"],
      },
      {
        title: "VEX IQ Competition Bootcamp",
        description: "Join our 8-week long summer bootcamp to learn the ins-and-outs of being on a VEX IQ competition team. Teams will learn about teamwork, public speaking, building, designing, mechanics, programming, and more.",
        duration: "Summer 2026, June 29 - August 28",
        level: "Intermediate",
        features: ["Tournament preparation", "Strategy development", "Team leadership", "Award pursuit"],
      },
    ],
  },
}

const levelColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-red-100 text-red-800",
  "All levels": "bg-gray-100 text-gray-800",
}

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState("learn")

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{courses[activeTab as keyof typeof courses].title}</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {courses[activeTab as keyof typeof courses].description}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-6">
            {Object.entries(courses).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center justify-center gap-3 px-6 py-2 rounded-lg transition-all duration-200 ${activeTab === key
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
                  }`}
              >
                <section.icon className="w-5 h-5" />
                <div className="text-center">
                  <div className="font-semibold text-base">{section.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses[activeTab as keyof typeof courses].courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="text-xl text-gray-900 flex-1 min-w-0">{course.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${levelColors[course.level as keyof typeof levelColors]
                      }`}
                  >
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 text-base">{course.description}</p>
              </div>

              {/* Card Content */}
              <div className="px-6 pb-6 flex flex-col grow">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6 grow">
                  <h4 className="font-semibold text-sm text-gray-900">Program highlights:</h4>
                  <ul className="space-y-1">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-3 h-3 text-yellow-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <Link href={siteConfig.siteURLs.courses}>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 mt-auto">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
