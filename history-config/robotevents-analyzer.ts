import { ROBOTEVENTS_CONFIG, validateConfig } from "@/history-config/config"
import type { Team, Award, Event, ApiResponse, TeamStats, SeasonStats, AwardDetail, CompetitionDetail } from "@/history-config/types"

export class RobotEventsAnalyzer {
  private apiToken: string
  private baseUrl: string
  private cache: Map<string, any> = new Map()

  constructor() {
    const validation = validateConfig()
    if (!validation.isValid) {
      throw new Error(validation.error)
    }

    this.apiToken = ROBOTEVENTS_CONFIG.API_TOKEN
    this.baseUrl = ROBOTEVENTS_CONFIG.BASE_URL
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<ApiResponse<T>> {
    // Create cache key
    const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`

    // Check cache first
    if (this.cache.has(cacheKey)) {
      console.log(`Cache hit for: ${endpoint}`)
      return this.cache.get(cacheKey)
    }

    const url = new URL(`${this.baseUrl}${endpoint}`)

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value)
      }
    })

    console.log(`API request: ${endpoint}`)
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()

    // Cache the response
    this.cache.set(cacheKey, data)

    return data
  }

  private async getAllPagesOptimized<T>(endpoint: string, params: Record<string, string> = {}): Promise<T[]> {
    // First request to get total pages
    const firstResponse = await this.makeRequest<T>(endpoint, {
      ...params,
      page: "1",
      per_page: "250", // Maximum per page
    })

    let allData: T[] = [...firstResponse.data]
    const totalPages = firstResponse.meta.last_page

    if (totalPages <= 1) {
      return allData
    }

    console.log(`Fetching ${totalPages} pages for ${endpoint}...`)

    // Create promises for remaining pages
    const pagePromises: Promise<ApiResponse<T>>[] = []
    const maxConcurrent = 5 // Limit concurrent requests to avoid rate limiting

    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(
        this.makeRequest<T>(endpoint, {
          ...params,
          page: page.toString(),
          per_page: "250",
        }),
      )

      // Process in batches to avoid overwhelming the API
      if (pagePromises.length >= maxConcurrent || page === totalPages) {
        const batchResults = await Promise.all(pagePromises)
        batchResults.forEach((response) => {
          allData = allData.concat(response.data)
        })
        pagePromises.length = 0 // Clear the array

        // Small delay between batches to be respectful to the API
        if (page < totalPages) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      }
    }

    console.log(`Fetched ${allData.length} items from ${totalPages} pages`)
    return allData
  }

  async findTeamByNumber(teamNumber: string): Promise<Team | null> {
    const cacheKey = `team-${teamNumber}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const teams = await this.getAllPagesOptimized<Team>("/teams", {
      "number[]": teamNumber,   // was: number: teamNumber
      myTeams: "true",
    })

    if (teams.length === 0) {
      this.cache.set(cacheKey, null)
      return null
    }

    // Filter for teams with the configured organization
    const orgTeams = teams.filter(
      (team) =>
        team.organization && team.organization.toLowerCase().includes(ROBOTEVENTS_CONFIG.ORGANIZATION.toLowerCase()),
    )

    const result = orgTeams.length > 0 ? orgTeams[0] : null
    this.cache.set(cacheKey, result)
    return result
  }

  private formatLocation(location: any): string {
    if (!location) return "Unknown Location"

    const parts = []
    if (location.city) parts.push(location.city)
    if (location.region) parts.push(location.region)
    if (location.country) parts.push(location.country)

    return parts.length > 0 ? parts.join(", ") : "Unknown Location"
  }

  private formatDate(dateString: string): string {
    if (!dateString) return "Unknown Date"

    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return "Unknown Date"
    }
  }

  private formatDateRange(start: string, end: string): string {
    if (!start) return "Unknown Date"

    const startDate = new Date(start)
    if (!end || start === end) {
      return this.formatDate(start)
    }

    const endDate = new Date(end)

    // If same year
    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()

    if (startYear === endYear) {
      const startStr = startDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })
      const endStr = endDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
      return `${startStr} - ${endStr}`
    }

    // Different years: show full dates
    const startStr = this.formatDate(start)
    const endStr = this.formatDate(end)
    return `${startStr} - ${endStr}`
  }

  async analyzeTeam(teamNumber: string): Promise<TeamStats | null> {
    const team = await this.findTeamByNumber(teamNumber)
    if (!team || !team.id) {
      return null
    }

    console.log(`Analyzing team: ${team.team_name} (${team.number})`)

    // Fetch events and awards in parallel for better performance
    const [events, allAwards] = await Promise.all([
      this.getAllPagesOptimized<Event>(`/teams/${team.id}/events`),
      this.getAllPagesOptimized<Award>(`/teams/${team.id}/awards`),
    ])

    console.log(`Found ${events.length} events and ${allAwards.length} awards`)

    // Extract unique seasons
    const seasonsSet = new Set<number>()
    const seasonNames = new Map<number, string>()

    events.forEach((event) => {
      if (event.season) {
        seasonsSet.add(event.season.id)
        seasonNames.set(event.season.id, event.season.name)
      }
    })

    const seasonIds = Array.from(seasonsSet)
    console.log(`Found ${seasonIds.length} seasons`)

    // Create event map for cross-referencing
    const eventMap = new Map<number, Event>()
    events.forEach((event) => {
      eventMap.set(event.id, event)
    })

    // Group data by season
    const seasonMap = new Map<
      number,
      {
        seasonId: number
        seasonName: string
        awards: Award[]
        events: Event[]
      }
    >()

    // Initialize with events
    events.forEach((event) => {
      if (event.season) {
        const seasonId = event.season.id
        if (!seasonMap.has(seasonId)) {
          seasonMap.set(seasonId, {
            seasonId,
            seasonName: event.season.name,
            awards: [],
            events: [],
          })
        }
        seasonMap.get(seasonId)!.events.push(event)
      }
    })

    // Add awards to seasons
    allAwards.forEach((award) => {
      const event = eventMap.get(award.event?.id || 0)
      if (event && event.season) {
        const seasonId = event.season.id
        if (seasonMap.has(seasonId)) {
          seasonMap.get(seasonId)!.awards.push(award)
        }
      }
    })

    // Convert to season stats
    const seasonStats: SeasonStats[] = Array.from(seasonMap.values())
      .sort((a, b) => b.seasonId - a.seasonId)
      .map((season) => {
        const awardDetails: AwardDetail[] = season.awards.map((award) => {
          const event = eventMap.get(award.event?.id || 0)

          return {
            name: award.title || "Unknown Award",
            date: event?.start ? this.formatDate(event.start) : "Unknown Date",
            location: event?.location ? this.formatLocation(event.location) : "Unknown Location",
            eventName: award.event?.name || "Unknown Event",
            sortDate: event?.start || "",
            eventUrl: event?.sku && event?.program?.name
              ? `https://events.vex.com/robot-competitions/${event.program.name.toLowerCase().replace(/\s+/g, '-')}/${event.sku}.html#awards`
              : "#",
          }
        })

        const competitionDetails: CompetitionDetail[] = season.events.map((event) => ({
          name: event.name || "Unknown Event",
          date: this.formatDateRange(event.start, event.end),
          location: event.location ? this.formatLocation(event.location) : "Unknown Location",
          level: event.level || "Unknown Level",
          sortDate: event.start || "",
          eventUrl: event.sku && event.program?.name
            ? `https://events.vex.com/robot-competitions/${event.program.name.toLowerCase().replace(/\s+/g, '-')}/${event.sku}.html#general-info`
            : "#",
        }))

        return {
          seasonId: season.seasonId,
          seasonName: season.seasonName,
          totalAwards: season.awards.length,
          totalCompetitions: season.events.length,
          awards: awardDetails,
          competitions: competitionDetails,
        }
      })

    return {
      teamNumber: team.number,
      teamName: team.team_name,
      organization: team.organization || "Unknown Organization",
      totalAwards: allAwards.length,
      totalCompetitions: events.length,
      seasonStats,
    }
  }
}

// curl.exe - H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMDA3OTYyZWRkZjQyMjhjZGI2NGU0MWM3OWM4NThhMDE0M2E4MjhkZWM2N2RmZGFiMjlkM2M0MTc4ZmEwNDZiMWZjNDc5YzdkZTRiNzFiZTUiLCJpYXQiOjE3NzUyMzY1MjUuMzc5NzUsIm5iZiI6MTc3NTIzNjUyNS4zNzk3NTE5LCJleHAiOjI3MjIwMDc3MjUuMzczMDU4OCwic3ViIjoiNDU0NzIiLCJzY29wZXMiOltdfQ.UNpz8ocsejxt-lB6GOi2XeqjqVZ2ikjbOCKRBFVsfLplarAnVo-4ImzaYKuwl2jLJuMrB_RFM3L1ZcMPxRaMKk8bG_bOP0Xq95KFrsn5-Xc2M4oj7_xVqyt5KZkzhO_CVNJMkYMqeZv9PRz-GsfekuvyBqjjsfslSRj4PsnBZQg4kX0XfUgHjtKlPxvtoelfB7q7TW0aWuAtcvNdtvYau7SzP3pbtXGIB4CpaCX2qbG8JYZG8ezyDg2fWITfPErtyWyPUkFKtLm_Dz08UtSAfUVgIw5lRbYcTNDRVXdbgDvinrjYcnizgfxdURbQ8_6RH17fcRXet7omnxkM1W3hmMdvS_Cd7_bThcYu1rBX-W6TJSSLEt6S7oldueYWQ_pNM_NfgvbgLr6SU6IPhssaJ1uGOIzGeBFr1OghtNZI9k4f-JbEJSvYVibaxf6xDXr8P8z5lqHCLu1JHnm-PeSFv5KiLb_6u73j9fQYW8NdE4la1Z16Qn_D0DvbtYIXfi9Ekc8FwhJRshirianYVz49jjldV_J6UVpOimPlH53siMcym6QQC0chNUVQw5mRNBcldLJQPItgNapf83JrfJb2nGCxUmnO1gygobph7x_bFGPieYZ0u_adSCFKPPi-thKu5RWE7MiBCWpe97g6KqcVJUPieZDk7QD79em8sN8Ep08" "https://events.vex.com/api/v2/teams?number[]=OOPS&myTeams=true" 