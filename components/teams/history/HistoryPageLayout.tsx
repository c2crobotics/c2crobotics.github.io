"use client"

import { motion } from "framer-motion"
import Lightbox from "@/components/Lightbox"
import HistoryMobileHeader from "@/components/teams/history/HistoryMobileHeader"
import HistoryDesktopSidebar from "@/components/teams/history/HistoryDesktopSidebar"
import HistoryMobileSidebar from "@/components/teams/history/HistoryMobileSidebar"
interface HistoryPageLayoutProps {
  years: number[]
  teamNumbers: string[]
  effectiveYear: number | null
  effectiveTeamNumber: string | null
  sidebarOpen: boolean
  photoUrls: string[]
  showLightbox: boolean
  lightboxIndex: number
  onToggleSidebar: () => void
  onCloseSidebar: () => void
  onYearSelect: (year: number) => void
  onTeamSelect: (teamNumber: string) => void
  onCloseLightbox: () => void
  children: React.ReactNode
}

export default function HistoryPageLayout({
  years,
  teamNumbers,
  effectiveYear,
  effectiveTeamNumber,
  sidebarOpen,
  photoUrls,
  showLightbox,
  lightboxIndex,
  onToggleSidebar,
  onCloseSidebar,
  onYearSelect,
  onTeamSelect,
  onCloseLightbox,
  children,
}: HistoryPageLayoutProps) {
  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HistoryMobileHeader sidebarOpen={sidebarOpen} onToggleSidebar={onToggleSidebar} />

      <div className="flex relative">
        <HistoryDesktopSidebar
          years={years}
          teamNumbers={teamNumbers}
          effectiveYear={effectiveYear}
          effectiveTeamNumber={effectiveTeamNumber}
          onYearSelect={onYearSelect}
          onTeamSelect={onTeamSelect}
        />

        <HistoryMobileSidebar
          open={sidebarOpen}
          years={years}
          teamNumbers={teamNumbers}
          effectiveYear={effectiveYear}
          effectiveTeamNumber={effectiveTeamNumber}
          onClose={onCloseSidebar}
          onYearSelect={onYearSelect}
          onTeamSelect={onTeamSelect}
        />

        <div className="flex-1 min-h-screen min-w-0">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>

      {showLightbox && (
        <Lightbox
          images={photoUrls}
          initialIndex={lightboxIndex}
          onClose={onCloseLightbox}
        />
      )}
    </motion.div>
  )
}
