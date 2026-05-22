import { RobotEventsAnalyzer } from "@/history-config/robotevents-analyzer"
import { ROBOTEVENTS_CONFIG } from "@/history-config/config"
import type { TeamStats } from "@/history-config/types"

export interface WebsiteTeamData {
  id: number
  name: string
  number: string
  achievements: Array<{
    name: string
    place: string
    date: string
    location: string
    sortDate: string;
    eventUrl: string;
    eventName: string;
  }>
  competitions: Array<{
    name: string
    date: string
    location: string
    sortDate: string;
    eventUrl: string;
  }>
}

export interface WebsiteData {
  [year: number]: WebsiteTeamData[]
}

export class DataGenerator {
  private analyzer: RobotEventsAnalyzer

  constructor() {
    this.analyzer = new RobotEventsAnalyzer()
  }

  buildWebsiteDataFromTeamStats(stats: TeamStats, teamId = 1): WebsiteData {
    const teamsData: WebsiteData = {}

    for (const season of stats.seasonStats) {
      const year = this.extractYearFromSeason(season.seasonName)

      if (!teamsData[year]) {
        teamsData[year] = []
      }

      let existingTeam = teamsData[year].find((t) => t.number === stats.teamNumber)

      if (!existingTeam) {
        existingTeam = {
          id: teamId,
          name: stats.teamName,
          number: stats.teamNumber,
          achievements: [],
          competitions: [],
        }
        teamsData[year].push(existingTeam)
      }

      const achievements = season.awards.map((award) => ({
        name: award.name,
        place: "Award",
        date: award.date,
        location: award.location,
        sortDate: award.sortDate,
        eventUrl: award.eventUrl,
        eventName: award.eventName,
      }))

      const competitions = season.competitions.map((comp) => ({
        name: comp.name,
        date: comp.date,
        location: comp.location,
        sortDate: comp.sortDate,
        eventUrl: comp.eventUrl,
      }))

      existingTeam.achievements.push(...achievements)
      existingTeam.competitions.push(...competitions)

      existingTeam.achievements = existingTeam.achievements.filter(
        (achievement, index, self) =>
          index === self.findIndex((a) => a.name === achievement.name && a.date === achievement.date)
      )

      existingTeam.competitions = existingTeam.competitions.filter(
        (competition, index, self) =>
          index === self.findIndex((c) => c.name === competition.name && c.date === competition.date)
      )
    }

    return teamsData
  }

  async generateTeamData(teamNumber: string): Promise<{
    stats: TeamStats
    teamsData: WebsiteData
  } | null> {
    const stats = await this.analyzer.analyzeTeam(teamNumber)
    if (!stats) return null

    return {
      stats,
      teamsData: this.buildWebsiteDataFromTeamStats(stats),
    }
  }

  private extractYearFromSeason(seasonName: string): number {
    // Extract year from season names like "VRC 2023-2024" or "VRC 2024"
    const yearMatch = seasonName.match(/(\d{4})/g)
    if (yearMatch) {
      // Take the later year if there are two (e.g., 2024 from "2023-2024")
      return Math.max(...yearMatch.map(Number))
    }
    return new Date().getFullYear()
  }

  async generateTeamsData(): Promise<{
    teamsData: WebsiteData
    totalStats: { awards: number; competitions: number }
  }> {
    const teamsData: WebsiteData = {}
    let teamIdCounter = 1
    let totalAwards = 0
    let totalCompetitions = 0

    console.log("Generating teams data from RobotEvents API...")
    console.log(`Processing ${ROBOTEVENTS_CONFIG.TEAMS.length} teams`)

    for (const teamNumber of ROBOTEVENTS_CONFIG.TEAMS) {
      console.log(`Starting analysis for team: ${teamNumber}`)

      try {
        const result = await this.generateTeamData(teamNumber)
        if (!result) {
          console.log(`No data found for team ${teamNumber}`)
          continue
        }

        const { stats, teamsData: teamYearData } = result
        totalAwards += stats.totalAwards
        totalCompetitions += stats.totalCompetitions

        console.log(
          `Completed analysis for team: ${teamNumber} (${stats.totalAwards} awards, ${stats.totalCompetitions} competitions)`
        )

        for (const [yearKey, yearTeams] of Object.entries(teamYearData)) {
          const year = Number(yearKey)
          if (!teamsData[year]) teamsData[year] = []

          for (const team of yearTeams) {
            const withId = { ...team, id: teamIdCounter++ }
            teamsData[year].push(withId)
          }
        }
      } catch (error) {
        console.error(`Error processing team ${teamNumber}:`, error)
      }
    }

    return {
      teamsData,
      totalStats: {
        awards: totalAwards,
        competitions: totalCompetitions,
      },
    }
  }
}