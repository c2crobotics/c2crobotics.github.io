"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import ContactInfo from "@/components/contact-info"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        className="bg-[#1a1a1f] text-primary-foreground py-4 sm:py-6 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center px-4">
          <motion.h1
            className="text-xl sm:text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-xs sm:text-sm text-center opacity-90 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Give us a call or send us a message.
          </motion.p>
        </div>
      </motion.div>

      <div className="flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-4xl">
          <Card className="shadow-lg mt-4 sm:mt-8 mx-2 sm:mx-0">
            <CardContent className="p-3 sm:p-6 bg-blue-50">
              <div className="w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://tally.so/r/GxXJyo?transparentBackground=1"
                  width="100%"
                  height="600"
                  className="rounded-lg sm:h-200 h-150 border-0"
                  title="Get In Touch"
                >
                  Loading…
                </iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ContactInfo />
    </div>
  )
}