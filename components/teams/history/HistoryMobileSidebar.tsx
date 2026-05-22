"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { siteConfig } from "@/config/site"
import HistorySidebarNav from "@/components/teams/history/HistorySidebarNav"
import { mobileSidebarVariants } from "@/components/teams/history/animations"
interface HistoryMobileSidebarProps {
  open: boolean
  years: number[]
  teamNumbers: string[]
  effectiveYear: number | null
  effectiveTeamNumber: string | null
  onClose: () => void
  onYearSelect: (year: number) => void
  onTeamSelect: (teamNumber: string) => void
}

export default function HistoryMobileSidebar({
  open,
  years,
  teamNumbers,
  effectiveYear,
  effectiveTeamNumber,
  onClose,
  onYearSelect,
  onTeamSelect,
}: HistoryMobileSidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 lg:hidden"
            variants={mobileSidebarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg sm:text-xl font-bold text-[#1a1a1f] uppercase tracking-wide">
                  Team History
                </h1>
              </div>
              <Link
                href={siteConfig.siteURLs.teams}
                className="w-full justify-start inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Overview
              </Link>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto h-[calc(100vh-140px)]">
              <HistorySidebarNav
                years={years}
                teamNumbers={teamNumbers}
                effectiveYear={effectiveYear}
                effectiveTeamNumber={effectiveTeamNumber}
                onYearSelect={onYearSelect}
                onTeamSelect={onTeamSelect}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
