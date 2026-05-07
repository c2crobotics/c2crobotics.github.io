"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Star, Trophy, Calendar, CalendarDays, MapPin, Menu, X, Camera,
  ArrowLeft, Loader2, ExternalLink
} from 'lucide-react'
import { motion, AnimatePresence, cubicBezier } from "framer-motion"
import { DataGenerator, WebsiteData } from "@/history-config/data-generator"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import Image from "next/image"

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const sidebarVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
}

const mobileSidebarVariants = {
  hidden: {
    x: "-100%",
    transition: {
      type: "tween" as const,
      duration: 0.3,
    },
  },
  visible: {
    x: 0,
    transition: {
      type: "tween" as const,
      duration: 0.3,
    },
  },
} as const

export default function History() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teamsData, setTeamsData] = useState<WebsiteData>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Photos from S3 manifest
  const [teamPhotos, setTeamPhotos] = useState<Array<{ url: string; caption: string }>>([])
  const [photosLoading, setPhotosLoading] = useState(false)

  // Fetch teams data (achievements & competitions) from RobotEvents
  useEffect(() => {
    async function fetchTeamsData() {
      try {
        setLoading(true)
        setError(null)
        const generator = new DataGenerator()
        const { teamsData: apiTeamsData } = await generator.generateTeamsData()
        setTeamsData(apiTeamsData)
      } catch (err) {
        console.error("Error fetching teams data:", err)
        setError(err instanceof Error ? err.message : "Failed to load team data")
      } finally {
        setLoading(false)
      }
    }

    fetchTeamsData()
  }, [])

  // Derived years from loaded data
  const years = useMemo(
    () =>
      Object.keys(teamsData)
        .map(Number)
        .sort((a, b) => b - a),
    [teamsData]
  )

  // Derive the effective year: from URL param (validated) or first available
  const effectiveYear = useMemo(() => {
    if (loading || years.length === 0) return null
    const yearParam = searchParams.get("year")
    const year = yearParam ? Number(yearParam) : null
    if (year && years.includes(year)) return year
    return years[0]
  }, [loading, years, searchParams])

  // Teams for the effective year
  const currentTeams = useMemo(
    () => (effectiveYear != null ? teamsData[effectiveYear] || [] : []),
    [teamsData, effectiveYear]
  )

  // Derive the effective team: by team number from URL param
  const effectiveTeam = useMemo(() => {
    if (effectiveYear == null) return null
    const teamNumber = searchParams.get("team") // now a string like "62880A"
    if (!teamNumber) return currentTeams[0] ?? null
    const found = currentTeams.find(t => t.number === teamNumber)
    return found ?? currentTeams[0] ?? null
  }, [effectiveYear, currentTeams, searchParams])

  // Synchronize the URL with the effective year/team when data first loads
  useEffect(() => {
    if (loading || effectiveYear == null || !effectiveTeam) return

    const currentYearParam = searchParams.get("year")
    const currentTeamParam = searchParams.get("team")

    const targetYear = String(effectiveYear)
    const targetTeamNumber = effectiveTeam.number // use team number

    if (currentYearParam !== targetYear || currentTeamParam !== targetTeamNumber) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("year", targetYear)
      params.set("team", targetTeamNumber)
      router.replace(`?${params.toString()}`, { scroll: false })
    }
  }, [loading, effectiveYear, effectiveTeam, searchParams, router])

  // Photos fetch effect
  useEffect(() => {
    async function fetchTeamPhotos() {
      if (!effectiveTeam || effectiveYear == null) {
        setTeamPhotos([])
        return
      }
      const teamNumber = effectiveTeam.number
      const manifestUrl = `/manifests/team-${teamNumber}.json`
      setPhotosLoading(true)
      try {
        const res = await fetch(manifestUrl)
        if (!res.ok) {
          setTeamPhotos([])
          return
        }
        const manifest = await res.json()
        const yearData = manifest.years?.find((y: any) => y.year === String(effectiveYear))
        if (yearData && yearData.images) {
          setTeamPhotos(yearData.images)
        } else {
          setTeamPhotos([])
        }
      } catch (err) {
        console.error(`Failed to load manifest for team ${teamNumber}:`, err)
        setTeamPhotos([])
      } finally {
        setPhotosLoading(false)
      }
    }

    fetchTeamPhotos()
  }, [effectiveTeam, effectiveYear])

  // The team object to display (effectiveTeam is already the full team object)
  const displayTeam = effectiveTeam

  const contentKey = `${effectiveYear}-${effectiveTeam?.number || "none"}`

  const handleYearSelect = (year: number) => {
    const newYearTeams = teamsData[year] || []
    let newTeamNumber: string | null = null

    // Try to keep the same team number when switching years
    if (effectiveTeam) {
      const currentTeamNumber = effectiveTeam.number
      const matchingTeam = newYearTeams.find(t => t.number === currentTeamNumber)
      if (matchingTeam) {
        newTeamNumber = matchingTeam.number
      } else if (newYearTeams.length > 0) {
        newTeamNumber = newYearTeams[0].number
      }
    } else if (newYearTeams.length > 0) {
      newTeamNumber = newYearTeams[0].number
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set("year", String(year))
    if (newTeamNumber) {
      params.set("team", newTeamNumber)
    } else {
      params.delete("team")
    }
    router.replace(`?${params.toString()}`, { scroll: false })
    setSidebarOpen(false)
  }

  const handleTeamSelect = (teamNumber: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (effectiveYear != null) {
      params.set("year", String(effectiveYear))
    }
    params.set("team", teamNumber)
    router.replace(`?${params.toString()}`, { scroll: false })
    setSidebarOpen(false)
  }

  // ---- RENDER STATES ----

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <Card className="bg-white shadow-lg border-0 p-8 max-w-md w-full">
          <CardContent className="text-center">
            <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-[#1a1a1f] mb-2 uppercase tracking-wide">
              Loading Team Data
            </h3>
            <p className="text-gray-500 text-sm mt-4">Fetching data from RobotEvents API</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <Card className="bg-white shadow-lg border-0 p-8 max-w-md w-full">
          <CardContent className="text-center">
            <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1f] mb-2 uppercase tracking-wide">
              Error Loading Data
            </h3>
            <p className="text-gray-600 mb-4 wrap-break-words">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (years.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
        <Card className="bg-white shadow-lg border-0 p-8 max-w-md w-full">
          <CardContent className="text-center">
            <Trophy className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-[#1a1a1f] mb-2 uppercase tracking-wide">
              No Team Data Found
            </h3>
            <p className="text-gray-600">Please check your API configuration.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ---- MAIN UI ----

  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Header */}
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
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="relative z-50 shrink-0"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </motion.div>

      <div className="flex relative">
        {/* Desktop Sidebar */}
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
            {/* Team Selection – now displays team.number and passes that to handler */}
            {currentTeams.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Teams</h3>
                <motion.div className="space-y-2" variants={sidebarVariants} initial="hidden" animate="visible">
                  {currentTeams.map((team) => (
                    <motion.button
                      key={team.number} // use number as key for consistency
                      variants={itemVariants}
                      onClick={() => handleTeamSelect(team.number)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ease-out font-bold uppercase tracking-wide hover:scale-[1.02] ${effectiveTeam?.number === team.number
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-600 hover:bg-gray-50 hover:shadow-md"
                        }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {team.number}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Year Selection */}
            <div className="mb-8">
              <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Select Year</h3>
              <motion.div className="space-y-2" variants={sidebarVariants} initial="hidden" animate="visible">
                {years.map((year) => (
                  <motion.button
                    key={year}
                    variants={itemVariants}
                    onClick={() => handleYearSelect(year)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-out font-bold uppercase tracking-wide hover:scale-[1.02] ${effectiveYear === year
                        ? "bg-[#1a1a1f] text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {year}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
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
                  {currentTeams.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Teams</h3>
                      <div className="space-y-2">
                        {currentTeams.map((team) => (
                          <button
                            key={team.number}
                            onClick={() => handleTeamSelect(team.number)}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ease-out font-bold uppercase tracking-wide ${effectiveTeam?.number === team.number
                                ? "bg-blue-600 text-white shadow-lg"
                                : "text-gray-600 hover:bg-gray-50 hover:shadow-md"
                              }`}
                          >
                            <span className="wrap-break-words">{team.number}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="font-bold text-[#1a1a1f] mb-4 uppercase tracking-wide">Select Year</h3>
                    <div className="space-y-2">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ease-out font-bold uppercase tracking-wide ${effectiveYear === year
                              ? "bg-[#1a1a1f] text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                            }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 min-h-screen min-w-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {displayTeam ? (
              <div className="space-y-8">
                {/* Team Header */}
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader className="bg-[#1a1a1f] text-white rounded-t-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-y-0 space-y-3">
                        <CardTitle className="text-2xl sm:text-3xl uppercase tracking-wide font-bold wrap-break-words">
                          {displayTeam.name}
                        </CardTitle>
                        <div className="flex gap-2 sm:gap-4">
                          <div className="flex items-center space-x-1 sm:space-x-2 bg-white/20 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                            <Trophy className="w-3 h-3 sm:w-5 sm:h-5 shrink-0" />
                            <span className="text-xs sm:text-base font-semibold">
                              {displayTeam.achievements.length} <span className="text-s">Awards</span>
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 sm:space-x-2 bg-white/20 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                            <Calendar className="w-3 h-3 sm:w-5 sm:h-5 shrink-0" />
                            <span className="text-xs sm:text-base font-semibold">
                              {displayTeam.competitions.length} <span className="text-s">Competitions</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>

                {/* Achievements */}
                <div>
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-yellow-500 shrink-0" />
                        <span className="wrap-break-words">Achievements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {displayTeam.achievements.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-base sm:text-lg">
                            No achievements found for this team in {effectiveYear}.
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
                          {[...displayTeam.achievements]
                            .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
                            .map((achievement, index) => (
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
                </div>

                {/* Competitions */}
                <div>
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-500 shrink-0" />
                        <span className="wrap-break-words">Competitions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {displayTeam.competitions.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-base sm:text-lg">
                            No competitions found for this team in {effectiveYear}.
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
                          {[...displayTeam.competitions]
                            .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime())
                            .map((competition, index) => (
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
                </div>

                {/* Photos */}
                <div>
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-xl sm:text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
                        <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-500 shrink-0" />
                        <span className="wrap-break-words">Photo Gallery</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {photosLoading ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                        </div>
                      ) : teamPhotos.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500 text-base sm:text-lg">
                            No photos found for this team in {effectiveYear}.
                          </p>
                        </div>
                      ) : (
                        <motion.div
                          key={`photos-${contentKey}`}
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {teamPhotos.map((photo, index) => (
                            <motion.div
                              key={index}
                              variants={contentVariants}
                              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500"
                              whileHover={{ scale: 1.05, y: -5 }}
                            >
                              <div className="relative w-full h-81">
                                <Image
                                  src={photo.url}
                                  alt={photo.caption}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                  quality={75}
                                  loading={index < 8 ? "eager" : "lazy"}
                                />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="font-medium text-sm uppercase tracking-wide wrap-break-words">
                                  {photo.caption}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}