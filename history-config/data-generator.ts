import { RobotEventsAnalyzer } from "@/history-config/robotevents-analyzer"
import { ROBOTEVENTS_CONFIG } from "@/history-config/config"

interface WebsiteTeamData {
  id: number
  name: string
  number: string
  achievements: Array<{
    name: string
    place: string
    date: string
    location: string
  }>
  competitions: Array<{
    name: string
    date: string
    location: string
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

    // Process all teams
    const teamPromises = ROBOTEVENTS_CONFIG.TEAMS.map(async (teamNumber) => {
      console.log(`Starting analysis for team: ${teamNumber}`)

      try {
        const stats = await this.analyzer.analyzeTeam(teamNumber)

        if (!stats) {
          console.log(`No data found for team ${teamNumber}`)
          return null
        }

        console.log(
          `Completed analysis for team: ${teamNumber} (${stats.totalAwards} awards, ${stats.totalCompetitions} competitions)`,
        )
        return { teamNumber, stats }
      } catch (error) {
        console.error(`Error processing team ${teamNumber}:`, error)
        return null
      }
    })

    // Wait for all teams to finish
    const teamResults = await Promise.all(teamPromises)

    // Process results
    for (const result of teamResults) {
      if (!result) continue

      const { stats } = result
      totalAwards += stats.totalAwards
      totalCompetitions += stats.totalCompetitions

      // Process each season
      for (const season of stats.seasonStats) {
        const year = this.extractYearFromSeason(season.seasonName)

        if (!teamsData[year]) {
          teamsData[year] = []
        }

        // Check if team already exists for this year
        let existingTeam = teamsData[year].find((t) => t.name === stats.teamName)

        if (!existingTeam) {
          // Create new team entry (no photos anymore)
          existingTeam = {
            id: teamIdCounter++,
            name: stats.teamName,
            number: stats.teamNumber,
            achievements: [],
            competitions: [],
          }
          teamsData[year].push(existingTeam)
        }

        // Add achievements
        const achievements = season.awards.map((award) => ({
          name: award.name,
          place: "Award",
          date: award.date,
          location: award.location,
        }))

        // Add competitions
        const competitions = season.competitions.map((comp) => ({
          name: comp.name,
          date: comp.date,
          location: comp.location,
        }))

        existingTeam.achievements.push(...achievements)
        existingTeam.competitions.push(...competitions)

        // Remove duplicates based on name and date
        existingTeam.achievements = existingTeam.achievements.filter(
          (achievement, index, self) =>
            index === self.findIndex((a) => a.name === achievement.name && a.date === achievement.date),
        )

        existingTeam.competitions = existingTeam.competitions.filter(
          (competition, index, self) =>
            index === self.findIndex((c) => c.name === competition.name && c.date === competition.date),
        )
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