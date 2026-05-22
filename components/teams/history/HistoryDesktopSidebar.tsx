"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion, cubicBezier } from "framer-motion"
import { siteConfig } from "@/config/site"
import HistorySidebarNav from "@/components/teams/history/HistorySidebarNav"
interface HistoryDesktopSidebarProps {
  years: number[]
  teamNumbers: string[]
  effectiveYear: number | null
  effectiveTeamNumber: string | null
  onYearSelect: (year: number) => void
  onTeamSelect: (teamNumber: string) => void
}

export default function HistoryDesktopSidebar({
  years,
  teamNumbers,
  effectiveYear,
  effectiveTeamNumber,
  onYearSelect,
  onTeamSelect,
}: HistoryDesktopSidebarProps) {
  return (
    <motion.div
      className="hidden lg:block w-64 bg-white shadow-lg border-r border-gray-200 shrink-0"
      initial={{ x: -256 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) }}
    >
      <div className="p-6 border-b border-gray-200">
        <Link
          href={siteConfig.siteURLs.teams}
          className="mb-4 w-full justify-start inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Overview
        </Link>
        <h1 className="text-xl font-bold text-[#1a1a1f] uppercase tracking-wide">
          Team History
        </h1>
      </div>
      <div className="p-6 overflow-y-auto h-[calc(100vh-120px)]">
        <HistorySidebarNav
          years={years}
          teamNumbers={teamNumbers}
          effectiveYear={effectiveYear}
          effectiveTeamNumber={effectiveTeamNumber}
          onYearSelect={onYearSelect}
          onTeamSelect={onTeamSelect}
          animated
        />
      </div>
    </motion.div>
  )
}
