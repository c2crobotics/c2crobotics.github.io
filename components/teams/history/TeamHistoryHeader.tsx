"use client"

import { Trophy, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import type { Team } from "@/components/teams/history/types"

interface TeamHistoryHeaderProps {
  team: Team
}

export default function TeamHistoryHeader({ team }: TeamHistoryHeaderProps) {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-white shadow-lg border-0">
        <CardHeader className="bg-[#1a1a1f] text-white rounded-t-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-y-0 space-y-3">
            <CardTitle className="text-2xl sm:text-3xl uppercase tracking-wide font-bold wrap-break-words">
              {team.name}
            </CardTitle>
            <div className="flex gap-2 sm:gap-4">
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white/20 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                <Trophy className="w-3 h-3 sm:w-5 sm:h-5 shrink-0" />
                <span className="text-xs sm:text-base font-semibold">
                  {team.achievements.length} <span className="text-s">Awards</span>
                </span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white/20 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                <Calendar className="w-3 h-3 sm:w-5 sm:h-5 shrink-0" />
                <span className="text-xs sm:text-base font-semibold">
                  {team.competitions.length} <span className="text-s">Competitions</span>
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  )
}
