"use client"

import { Calendar, CalendarDays, MapPin, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Team } from "@/components/teams/history/types"
import { containerVariants, contentVariants } from "@/components/teams/history/animations"

interface CompetitionsSectionProps {
  team: Team
  year: number
  contentKey: string
}

export default function CompetitionsSection({ team, year, contentKey }: CompetitionsSectionProps) {
  const competitions = [...team.competitions].sort(
    (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
  )

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-500 shrink-0" />
          <span className="wrap-break-words">Competitions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {competitions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-base sm:text-lg">
              No competitions found for this team in {year}.
            </p>
          </div>
        ) : (
          <motion.div
            key={`competitions-${contentKey}`}
            className="grid gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {competitions.map((competition, index) => (
              <motion.div
                key={index}
                variants={contentVariants}
                className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-base sm:text-lg text-[#1a1a1f] mb-3 uppercase tracking-wide wrap-break-words">
                    {competition.name}
                  </h4>
                  {competition.eventUrl && competition.eventUrl !== "#" && (
                    <a
                      href={competition.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors shrink-0 ml-2"
                      title="View event on RobotEvents"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600 space-y-1 sm:space-y-0">
                  <div className="flex items-center font-medium">
                    <CalendarDays className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
                    <span className="wrap-break-words">{competition.date}</span>
                  </div>
                  <div className="flex items-center font-medium">
                    <MapPin className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                    <span className="wrap-break-words">{competition.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
