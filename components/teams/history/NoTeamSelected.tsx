"use client"

import { Trophy } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function NoTeamSelected() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-lg border-0">
        <CardContent className="text-center py-16">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: [0.42, 0, 0.58, 1] }}
          >
            <Trophy className="w-16 h-16 mx-auto text-gray-400 mb-6" />
          </motion.div>
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No Team Selected
          </motion.h3>
          <motion.p
            className="text-gray-600 text-base sm:text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Select a year and team to view their history.
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
