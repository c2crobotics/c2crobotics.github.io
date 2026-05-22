"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { useRouter } from "next/router"
import type { WebsiteData } from "@/history-config/data-generator"
import { ROBOTEVENTS_CONFIG, validateConfig } from "@/history-config/config"
import { loadTeamHistory } from "@/lib/team-history-service"
import { getYearsFromIndex } from "@/lib/team-history-cache"
import type { HistoryLightbox, Team, TeamManifest, TeamPhoto } from "@/components/teams/history/types"

function getYearsForTeam(teamsData: WebsiteData, teamNumber: string): number[] {
  return Object.keys(teamsData)
    .map(Number)
    .filter((year) => (teamsData[year] || []).some((t) => t.number === teamNumber))
    .sort((a, b) => b - a)
}

function getQueryString(value: string | string[] | undefined): string | null {
  if (typeof value === "string") return value
  if (Array.isArray(value) && value[0]) return value[0]
  return null
}

export function useTeamHistory() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [teamsData, setTeamsData] = useState<WebsiteData>({})
  const [teamLoading, setTeamLoading] = useState(false)
  const [teamError, setTeamError] = useState<string | null>(null)
  const [loadedTeamNumber, setLoadedTeamNumber] = useState<string | null>(null)
  const [teamPhotos, setTeamPhotos] = useState<TeamPhoto[]>([])
  const [photosLoading, setPhotosLoading] = useState(false)
  const [lightbox, setLightbox] = useState<HistoryLightbox | null>(null)
  const [isRevalidating, setIsRevalidating] = useState(false)
  const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(null)

  const fetchGenerationRef = useRef(0)

  const configError = useMemo(() => {
    const validation = validateConfig()
    if (validation.isValid) return null
    return validation.error ?? "RobotEvents API is not configured."
  }, [])

  const photoUrls = useMemo(() => teamPhotos.map((p) => p.url), [teamPhotos])

  const allTeamNumbers = useMemo(() => [...ROBOTEVENTS_CONFIG.TEAMS], [])

  // router.isReady is false on SSR and the first client render (matches static HTML)
  const queryReady = router.isReady

  const teamFromQuery = queryReady ? getQueryString(router.query.team) : null
  const yearFromQuery = queryReady ? getQueryString(router.query.year) : null

  const effectiveTeamNumber = useMemo(() => {
    if (allTeamNumbers.length === 0) return null
    if (teamFromQuery && allTeamNumbers.includes(teamFromQuery)) return teamFromQuery
    return allTeamNumbers[0]
  }, [allTeamNumbers, teamFromQuery])

  const yearsForTeam = useMemo(() => {
    if (!effectiveTeamNumber) return []
    const fromLoaded =
      loadedTeamNumber === effectiveTeamNumber
        ? getYearsForTeam(teamsData, effectiveTeamNumber)
        : []
    if (fromLoaded.length > 0) return fromLoaded
    if (!queryReady) return []
    return getYearsFromIndex(effectiveTeamNumber)
  }, [effectiveTeamNumber, teamsData, loadedTeamNumber, queryReady])

  const effectiveYear = useMemo(() => {
    if (yearsForTeam.length === 0) return null
    const year = yearFromQuery ? Number(yearFromQuery) : null
    if (year && !Number.isNaN(year) && yearsForTeam.includes(year)) return year
    return yearsForTeam[0]
  }, [yearsForTeam, yearFromQuery])

  const effectiveTeam = useMemo((): Team | null => {
    if (effectiveYear == null || !effectiveTeamNumber) return null
    if (loadedTeamNumber !== effectiveTeamNumber) return null
    return (
      (teamsData[effectiveYear] || []).find((t) => t.number === effectiveTeamNumber) ?? null
    )
  }, [teamsData, effectiveYear, effectiveTeamNumber, loadedTeamNumber])

  const replaceHistoryQuery = useCallback(
    (team: string, year: string | null) => {
      const query: Record<string, string> = { team }
      if (year) query.year = year
      router.replace({ pathname: router.pathname, query }, undefined, {
        shallow: true,
        scroll: false,
      })
    },
    [router]
  )

  // Fetch RobotEvents data for the selected team only
  useEffect(() => {
    if (!queryReady || !effectiveTeamNumber || configError) return

    const generation = ++fetchGenerationRef.current
    let cancelled = false

    async function loadTeam() {
      setTeamError(null)
      setTeamLoading(true)

      try {
        const { immediate, refresh } = await loadTeamHistory(effectiveTeamNumber!)

        if (cancelled || generation !== fetchGenerationRef.current) return

        if (immediate) {
          setTeamsData(immediate.teamsData)
          setLoadedTeamNumber(effectiveTeamNumber!)
          setLastFetchedAt(immediate.fetchedAt)
          setTeamLoading(false)
          setIsRevalidating(immediate.cacheStatus !== "fresh")
        }

        const fresh = await refresh
        if (cancelled || generation !== fetchGenerationRef.current) return

        setIsRevalidating(false)

        if (fresh) {
          setTeamsData(fresh.teamsData)
          setLoadedTeamNumber(effectiveTeamNumber!)
          setLastFetchedAt(fresh.fetchedAt)
        } else if (!immediate) {
          setTeamsData({})
          setLoadedTeamNumber(null)
          setTeamError(`No RobotEvents data found for team ${effectiveTeamNumber}.`)
        }
      } catch (err) {
        if (cancelled || generation !== fetchGenerationRef.current) return
        console.error("Error fetching team history:", err)
        setTeamError(
          err instanceof Error ? err.message : "Failed to load team data from RobotEvents"
        )
      } finally {
        if (!cancelled && generation === fetchGenerationRef.current) {
          setTeamLoading(false)
        }
      }
    }

    loadTeam()
    return () => {
      cancelled = true
    }
  }, [queryReady, effectiveTeamNumber, configError])

  useEffect(() => {
    if (!queryReady || configError || effectiveYear == null || !effectiveTeamNumber) return
    if (teamLoading || loadedTeamNumber !== effectiveTeamNumber) return

    const currentYear = getQueryString(router.query.year)
    const currentTeam = getQueryString(router.query.team)
    const targetYear = String(effectiveYear)

    if (currentYear !== targetYear || currentTeam !== effectiveTeamNumber) {
      replaceHistoryQuery(effectiveTeamNumber, targetYear)
    }
  }, [
    queryReady,
    configError,
    effectiveYear,
    effectiveTeamNumber,
    loadedTeamNumber,
    teamLoading,
    router.query.year,
    router.query.team,
    replaceHistoryQuery,
  ])

  useEffect(() => {
    if (!queryReady) return

    async function fetchTeamPhotos() {
      if (!effectiveTeamNumber || effectiveYear == null) {
        setTeamPhotos([])
        return
      }
      const manifestUrl = `/manifests/team-${effectiveTeamNumber}.json`
      setPhotosLoading(true)
      try {
        const res = await fetch(manifestUrl)
        if (!res.ok) {
          setTeamPhotos([])
          return
        }
        const manifest: TeamManifest = await res.json()
        const yearData = manifest.years?.find((y) => y.year === String(effectiveYear))
        setTeamPhotos(yearData?.images ?? [])
      } catch (err) {
        console.error(`Failed to load manifest for team ${effectiveTeamNumber}:`, err)
        setTeamPhotos([])
      } finally {
        setPhotosLoading(false)
      }
    }

    fetchTeamPhotos()
  }, [queryReady, effectiveTeamNumber, effectiveYear])

  const contentKey = `${effectiveYear}-${effectiveTeamNumber || "none"}`

  const openLightbox = useCallback(
    (index: number) => setLightbox({ contentKey, index }),
    [contentKey]
  )

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const handleYearSelect = useCallback(
    (year: number) => {
      if (!effectiveTeamNumber) return
      replaceHistoryQuery(effectiveTeamNumber, String(year))
      setSidebarOpen(false)
    },
    [effectiveTeamNumber, replaceHistoryQuery]
  )

  const handleTeamSelect = useCallback(
    (teamNumber: string) => {
      const loadedYears =
        loadedTeamNumber === teamNumber ? getYearsForTeam(teamsData, teamNumber) : []
      const cachedYears = queryReady ? getYearsFromIndex(teamNumber) : []
      const availableYears = loadedYears.length > 0 ? loadedYears : cachedYears

      const year =
        effectiveYear != null && availableYears.includes(effectiveYear)
          ? effectiveYear
          : availableYears[0]

      replaceHistoryQuery(teamNumber, year != null ? String(year) : null)
      setSidebarOpen(false)
    },
    [teamsData, loadedTeamNumber, effectiveYear, queryReady, replaceHistoryQuery]
  )

  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), [])
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const showLightbox =
    lightbox?.contentKey === contentKey && photoUrls.length > 0

  const hasData = allTeamNumbers.length > 0 && !configError

  const refreshTeamData = useCallback(async () => {
    if (!effectiveTeamNumber || configError) return
    setIsRevalidating(true)
    setTeamError(null)
    try {
      const { refresh } = await loadTeamHistory(effectiveTeamNumber, { forceRefresh: true })
      const fresh = await refresh
      if (fresh) {
        setTeamsData(fresh.teamsData)
        setLoadedTeamNumber(effectiveTeamNumber)
        setLastFetchedAt(fresh.fetchedAt)
      }
    } catch (err) {
      setTeamError(err instanceof Error ? err.message : "Failed to refresh team data")
    } finally {
      setIsRevalidating(false)
    }
  }, [effectiveTeamNumber, configError])

  return {
    queryReady,
    teamLoading: !queryReady || teamLoading,
    isRevalidating,
    lastFetchedAt,
    refreshTeamData,
    error: configError ?? teamError,
    hasData,
    allTeamNumbers,
    yearsForTeam,
    effectiveYear,
    effectiveTeam,
    effectiveTeamNumber,
    teamPhotos,
    photosLoading,
    photoUrls,
    contentKey,
    sidebarOpen,
    lightbox,
    showLightbox,
    toggleSidebar,
    closeSidebar,
    handleYearSelect,
    handleTeamSelect,
    openLightbox,
    closeLightbox,
  }
}
