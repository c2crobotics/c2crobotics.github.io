"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

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


      
      <div className="text-center text-black text-4xl underline font-bold mt-6 sm:mt-8 px-2">
        Add Us on WeChat
      </div>
      <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
              style={{
                display: 'flex',
                justifyContent: 'center', // Centers horizontally
                alignItems: 'center',     // Centers vertically
                height: '800px'           // Container needs a height to center vertically
              }}
            >
            <div className="rounded-2xl overflow-hidden">
                <img
                  className="w-150 h-200 object-cover"
                  src="/scanWeChat.avif?height=100&width=100"
                  alt="Coast 2 Coast Robotics team"
                />
            </div>
      </motion.div>


      <div className="flex items-center justify-center p-2 sm:p-4"> 
        <div className="w-full max-w-4xl">
          <Card className="shadow-lg mt-4 sm:mt-8 mx-2 sm:mx-0">
            <CardContent className="p-3 sm:p-6 bg-blue-50">
              {/* Google Form Embed Area */}
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
    </div>
  )
}
