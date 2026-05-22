import type { WebsiteData } from "@/history-config/data-generator"

/**
 * Client-side cache for RobotEvents team history (GitHub Pages / static export).
 *
 * Policy (stale-while-revalidate):
 * - fresh  → use cache only, no API call
 * - stale  → show cache immediately, refresh from API in the background
 * - expired → show cache while loading, must fetch from API (entry kept up to MAX_AGE)
 * - miss   → fetch from API
 */
export const CACHE_POLICY = {
  VERSION: 1,
  /** Data is trusted without revalidation */
  FRESH_MS: 6 * 60 * 60 * 1000, // 6 hours
  /** Data may be shown but should be revalidated in the background */
  MAX_AGE_MS: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const

const CACHE_PREFIX = "c2c-team-history"
const INDEX_KEY = `${CACHE_PREFIX}:index`

export type CacheStatus = "miss" | "fresh" | "stale" | "expired"

export interface TeamHistoryIndexEntry {
  years: number[]
  teamName: string
  fetchedAt: number
}

export type TeamHistoryIndex = Record<string, TeamHistoryIndexEntry>

export interface CachedTeamHistory {
  version: number
  fetchedAt: number
  teamNumber: string
  teamName: string
  years: number[]
  teamsData: WebsiteData
}

export interface CacheResolution {
  entry: CachedTeamHistory | null
  status: CacheStatus
  shouldRevalidate: boolean
}

function isBrowser(): boolean {
  return typeof window !== "undefined"
}

function teamCacheKey(teamNumber: string): string {
  return `${CACHE_PREFIX}:team:${teamNumber}`
}

export function getCacheAgeMs(fetchedAt: number): number {
  return Date.now() - fetchedAt
}

export function getCacheStatus(fetchedAt: number): CacheStatus {
  const age = getCacheAgeMs(fetchedAt)
  if (age <= CACHE_POLICY.FRESH_MS) return "fresh"
  if (age <= CACHE_POLICY.MAX_AGE_MS) return "stale"
  return "expired"
}

export function readTeamHistoryIndex(): TeamHistoryIndex {
  if (!isBrowser()) return {}
  try {
    const raw = localStorage.getItem(INDEX_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as TeamHistoryIndex
  } catch {
    return {}
  }
}

function writeTeamHistoryIndex(index: TeamHistoryIndex): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(index))
  } catch (err) {
    console.warn("Failed to write team history index:", err)
  }
}

export function updateTeamHistoryIndex(
  teamNumber: string,
  entry: Omit<TeamHistoryIndexEntry, "fetchedAt"> & { fetchedAt?: number }
): void {
  const index = readTeamHistoryIndex()
  index[teamNumber] = {
    years: entry.years,
    teamName: entry.teamName,
    fetchedAt: entry.fetchedAt ?? Date.now(),
  }
  writeTeamHistoryIndex(index)
}

export function getYearsFromIndex(teamNumber: string): number[] {
  return readTeamHistoryIndex()[teamNumber]?.years ?? []
}

export function readCachedTeamHistory(teamNumber: string): CachedTeamHistory | null {
  if (!isBrowser()) return null
  try {
    const raw = localStorage.getItem(teamCacheKey(teamNumber))
    if (!raw) return null

    const parsed = JSON.parse(raw) as CachedTeamHistory
    if (parsed.version !== CACHE_POLICY.VERSION) return null
    if (getCacheAgeMs(parsed.fetchedAt) > CACHE_POLICY.MAX_AGE_MS) return null

    return parsed
  } catch {
    return null
  }
}

export function readLegacyCachedTeamHistory(teamNumber: string): CachedTeamHistory | null {
  if (!isBrowser()) return null
  try {
    const raw = localStorage.getItem(teamCacheKey(teamNumber))
    if (!raw) return null

    const parsed = JSON.parse(raw) as CachedTeamHistory
    if (parsed.version !== CACHE_POLICY.VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function resolveTeamHistoryCache(teamNumber: string): CacheResolution {
  const entry =
    readCachedTeamHistory(teamNumber) ?? readLegacyCachedTeamHistory(teamNumber)

  if (!entry) {
    return { entry: null, status: "miss", shouldRevalidate: true }
  }

  const status = getCacheStatus(entry.fetchedAt)
  return {
    entry,
    status,
    shouldRevalidate: status !== "fresh",
  }
}

export function writeCachedTeamHistory(entry: CachedTeamHistory): void {
  if (!isBrowser()) return
  try {
    localStorage.setItem(teamCacheKey(entry.teamNumber), JSON.stringify(entry))
    updateTeamHistoryIndex(entry.teamNumber, {
      years: entry.years,
      teamName: entry.teamName,
      fetchedAt: entry.fetchedAt,
    })
  } catch (err) {
    console.warn(`Failed to cache team history for ${entry.teamNumber}:`, err)
  }
}

export function removeCachedTeamHistory(teamNumber: string): void {
  if (!isBrowser()) return
  try {
    localStorage.removeItem(teamCacheKey(teamNumber))
    const index = readTeamHistoryIndex()
    delete index[teamNumber]
    writeTeamHistoryIndex(index)
  } catch {
    // ignore
  }
}
