"use client"

import { motion } from "framer-motion"
import { itemVariants, sidebarVariants } from "@/components/teams/history/animations"

interface HistorySidebarNavProps {
  years: number[]
  teamNumbers: string[]
  effectiveYear: number | null
  effectiveTeamNumber: string | null
  onYearSelect: (year: number) => void
  onTeamSelect: (teamNumber: string) => void
  animated?: boolean
}

function teamButtonClass(isSelected: boolean, animated: boolean) {
  return `w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ease-out font-bold uppercase tracking-wide ${
    animated ? "hover:scale-[1.02]" : ""
  } ${
    isSelected
      ? "bg-blue-600 text-white shadow-lg"
      : "text-gray-600 hover:bg-gray-50 hover:shadow-md"
  }`
}

function yearButtonClass(isSelected: boolean, animated: boolean) {
  return `w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-out font-bold uppercase tracking-wide ${
    animated ? "hover:scale-[1.02]" : ""
  } ${
    isSelected
      ? "bg-[#1a1a1f] text-white shadow-lg"
      : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
  }`
}

export default function HistorySidebarNav({
  years,
  teamNumbers,
  effectiveYear,
  effectiveTeamNumber,
  onYearSelect,
  onTeamSelect,
  animated = false,
}: HistorySidebarNavProps) {
  const teamsList = teamNumbers.length > 0 && (
    <div className="mb-8">
      <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Teams</h3>
      {animated ? (
        <motion.div className="space-y-2" variants={sidebarVariants} initial="hidden" animate="visible">
          {teamNumbers.map((teamNumber) => (
            <motion.button
              key={teamNumber}
              variants={itemVariants}
              onClick={() => onTeamSelect(teamNumber)}
              className={teamButtonClass(effectiveTeamNumber === teamNumber, animated)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {teamNumber}
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <div className="space-y-2">
          {teamNumbers.map((teamNumber) => (
            <button
              key={teamNumber}
              onClick={() => onTeamSelect(teamNumber)}
              className={teamButtonClass(effectiveTeamNumber === teamNumber, animated)}
            >
              <span className="wrap-break-words">{teamNumber}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )

  const yearsList = effectiveTeamNumber != null && (
    <div className="mb-8">
      <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Select Year</h3>
      {years.length === 0 ? (
        <p className="text-sm text-gray-500">No seasons found for this team.</p>
      ) : animated ? (
        <motion.div className="space-y-2" variants={sidebarVariants} initial="hidden" animate="visible">
          {years.map((year) => (
            <motion.button
              key={year}
              variants={itemVariants}
              onClick={() => onYearSelect(year)}
              className={yearButtonClass(effectiveYear === year, animated)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {year}
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <div className="space-y-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onYearSelect(year)}
              className={yearButtonClass(effectiveYear === year, animated)}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <>
      {teamsList}
      {yearsList}
    </>
  )
}
