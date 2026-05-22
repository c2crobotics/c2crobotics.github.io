"use client"

import Link from "next/link"
import { ArrowLeft, Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

interface HistoryMobileHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function HistoryMobileHeader({
  sidebarOpen,
  onToggleSidebar,
}: HistoryMobileHeaderProps) {
  return (
    <motion.div
      className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4 relative z-30"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0 flex-1">
          <Link
            href={siteConfig.siteURLs.teams}
            className="mr-2 inline-flex items-center px-2 py-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-[#1a1a1f] uppercase tracking-wide truncate">
            Team History
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="relative z-50 shrink-0"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>
    </motion.div>
  )
}
