"use client"

import {
  Star, Trophy, Calendar, MapPin, ExternalLink,
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Team } from "@/components/teams/history/types"
import { containerVariants, contentVariants } from "@/components/teams/history/animations"

interface AchievementsSectionProps {
  team: Team
  year: number
  contentKey: string
}

export default function AchievementsSection({ team, year, contentKey }: AchievementsSectionProps) {
  const achievements = [...team.achievements].sort(
    (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
  )

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
          <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-yellow-500 shrink-0" />
          <span className="wrap-break-words">Achievements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-base sm:text-lg">
              No achievements found for this team in {year}.
            </p>
          </div>
        ) : (
          <motion.div
            key={`achievements-${contentKey}`}
            className="grid gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={contentVariants}
                className="p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-base sm:text-lg text-[#1a1a1f] mb-2 uppercase tracking-wide wrap-break-words">
                        {achievement.name}
                      </h4>
                      {achievement.eventUrl && achievement.eventUrl !== "#" && (
                        <a
                          href={achievement.eventUrl}
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
                      {achievement.eventName && (
                        <div className="flex items-center font-medium text-gray-700 uppercase tracking-wide">
                          <Star className="w-4 h-4 mr-2 text-purple-500 shrink-0" />
                          <span className="wrap-break-words">{achievement.eventName}</span>
                        </div>
                      )}
                      <div className="flex items-center font-medium">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
                        <span className="wrap-break-words">{achievement.date}</span>
                      </div>
                      <div className="flex items-center font-medium">
                        <MapPin className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                        <span className="wrap-break-words">{achievement.location}</span>
                      </div>
                    </div>
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
