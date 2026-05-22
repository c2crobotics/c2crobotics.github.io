import { DataGenerator, type WebsiteData } from "@/history-config/data-generator"
import type { TeamStats } from "@/history-config/types"
import {
  resolveTeamHistoryCache,
  writeCachedTeamHistory,
  removeCachedTeamHistory,
  CACHE_POLICY,
  type CachedTeamHistory,
  type CacheStatus,
} from "@/lib/team-history-cache"

function getYearsFromTeamData(teamsData: WebsiteData, teamNumber: string): number[] {
  return Object.keys(teamsData)
    .map(Number)
    .filter((year) => (teamsData[year] || []).some((t) => t.number === teamNumber))
    .sort((a, b) => b - a)
}

function buildCacheEntry(
  teamNumber: string,
  stats: TeamStats,
  teamsData: WebsiteData
): CachedTeamHistory {
  return {
    version: CACHE_POLICY.VERSION,
    fetchedAt: Date.now(),
    teamNumber,
    teamName: stats.teamName,
    years: getYearsFromTeamData(teamsData, teamNumber),
    teamsData,
  }
}

export interface FetchTeamHistoryResult {
  teamsData: WebsiteData
  years: number[]
  teamName: string
  fromCache: boolean
  cacheStatus: CacheStatus
  fetchedAt: number
}

function toResult(entry: CachedTeamHistory, cacheStatus: CacheStatus): FetchTeamHistoryResult {
  return {
    teamsData: entry.teamsData,
    years: entry.years,
    teamName: entry.teamName,
    fromCache: true,
    cacheStatus,
    fetchedAt: entry.fetchedAt,
  }
}

const inflightFetches = new Map<string, Promise<FetchTeamHistoryResult | null>>()

async function fetchFromApi(teamNumber: string): Promise<FetchTeamHistoryResult | null> {
  const existing = inflightFetches.get(teamNumber)
  if (existing) return existing

  const promise = (async () => {
    const generator = new DataGenerator()
    const result = await generator.generateTeamData(teamNumber)
    if (!result) return null

    const entry = buildCacheEntry(teamNumber, result.stats, result.teamsData)
    writeCachedTeamHistory(entry)

    return {
      teamsData: entry.teamsData,
      years: entry.years,
      teamName: entry.teamName,
      fromCache: false,
      cacheStatus: "fresh" as const,
      fetchedAt: entry.fetchedAt,
    }
  })().finally(() => {
    inflightFetches.delete(teamNumber)
  })

  inflightFetches.set(teamNumber, promise)
  return promise
}

export async function refreshTeamHistory(
  teamNumber: string
): Promise<FetchTeamHistoryResult | null> {
  return fetchFromApi(teamNumber)
}

export async function loadTeamHistory(
  teamNumber: string,
  options?: { forceRefresh?: boolean }
): Promise<{
  immediate: FetchTeamHistoryResult | null
  refresh: Promise<FetchTeamHistoryResult | null>
}> {
  if (options?.forceRefresh) {
    removeCachedTeamHistory(teamNumber)
    const fresh = await fetchFromApi(teamNumber)
    return { immediate: fresh, refresh: Promise.resolve(fresh) }
  }

  const { entry, status, shouldRevalidate } = resolveTeamHistoryCache(teamNumber)

  if (!entry) {
    const fresh = await fetchFromApi(teamNumber)
    return { immediate: fresh, refresh: Promise.resolve(fresh) }
  }

  const immediate = toResult(entry, status)

  if (!shouldRevalidate) {
    return { immediate, refresh: Promise.resolve(immediate) }
  }

  const refresh = fetchFromApi(teamNumber).then((fresh) => {
    if (fresh) return fresh
    return immediate
  })

  return { immediate, refresh }
}
