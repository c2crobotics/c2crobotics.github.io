// RobotEvents V2 API Response Types

export interface Team {
  id: number
  number: string
  team_name: string
  robot_name?: string
  organization: string
  location: {
    city: string
    region: string
    country: string
  }
  program: {
    id: number
    name: string
    code: string
  }
  grade: string
}

export interface Award {
  id: number
  event: {
    id: number
    name: string
    code: string
  }
  order: number
  title: string
  qualifications: string[]
  designation: string | null
  classification: string | null
  teamWinners: Array<{
    division: {
      id: number
      name: string
      code: string | null
    }
    team: {
      id: number
      name: string
      code: string | null
    }
  }>
  individualWinners: string[] | Record<string, string>
}

export interface Event {
  id: number
  sku: string
  name: string
  start: string
  end: string
  season: {
    id: number
    name: string
    program: {
      id: number
      name: string
      code: string
    }
  }
  program: {
    id: number
    name: string
    code: string
  }
  location: {
    city: string
    region: string
    country: string
  }
  divisions: Array<{
    id: number
    name: string
    order: number
  }>
  level: string
  ongoing: boolean
  awards_finalized: boolean
}

export interface ApiResponse<T> {
  meta: {
    current_page: number
    first_page: number
    first_page_url: string
    last_page: number
    last_page_url: string
    next_page_url?: string
    per_page: number
    previous_page_url?: string
    total: number
  }
  data: T[]
}

export interface TeamStats {
  teamNumber: string
  teamName: string
  organization: string
  totalAwards: number
  totalCompetitions: number
  seasonStats: SeasonStats[]
}

export interface SeasonStats {
  seasonId: number
  seasonName: string
  totalAwards: number
  totalCompetitions: number
  awards: AwardDetail[]
  competitions: CompetitionDetail[]
}

export interface AwardDetail {
  name: string
  date: string
  location: string
  eventName: string
  sortDate: string
  eventUrl: string
}

export interface CompetitionDetail {
  name: string
  date: string
  location: string
  level: string
  sortDate: string
  eventUrl: string
}
export interface CompetitionDetail {
  name: string
  date: string
  location: string
  level: string
}

// Website data types
export interface WebsiteTeam {
  id: number
  name: string
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
  photos: Array<{
    url: string
    caption: string
  }>
}

export interface TeamsData {
  [year: number]: WebsiteTeam[]
}

export interface StatItem {
  icon: any
  label: string
  value: number
  suffix: string
  color: string
  bgColor: string
}
