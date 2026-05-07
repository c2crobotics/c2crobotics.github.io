"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function RegisterPage() {
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
            Course Registration
          </motion.h1>
          <motion.p
            className="text-xs sm:text-sm text-center opacity-90 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Register for our courses and secure your spot
          </motion.p>
        </div>
      </motion.div>

      <div className="flex items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-4xl">
          <Card className="shadow-lg mt-4 sm:mt-8 mx-2 sm:mx-0">
            <CardContent className="p-3 sm:p-6 bg-blue-50">
              {/* Google Form Embed Area */}
              <div className="w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSe1KG4qFC7P95dGq7nSQPSssHHAz8lIb2yoUChzLM9ZRV4rQw/viewform?embedded=true"
                  width="100%"
                  height="600"
                  className="rounded-lg sm:h-200 h-150 border-0"
                  title="Course Registration Form"
                >
                  Loading…
                </iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
