"use client"

import { motion, type Variants } from "framer-motion"
import ContactForm from "@/components/contact-form"
import ContactInfo from "@/components/contact-info"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const formVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 0.2,
    },
  },
}

const infoVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.4,
    },
  },
}

export default function Contact() {
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
            Contact Us
          </motion.h1>
          <motion.p
            className="text-sm text-center opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </motion.p>
        </div>
      </motion.div>

      <Suspense fallback={<div>Loading...</div>}>
        <motion.main
          className="container mx-auto py-12 px-4 md:px-6 max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-2xl mx-auto">
            <motion.div variants={formVariants}>
              <ContactForm />
            </motion.div>
            <Toaster />
          </div>
          <motion.div variants={infoVariants}>
            <ContactInfo />
          </motion.div>
        </motion.main>
      </Suspense>
    </div>
  )
}