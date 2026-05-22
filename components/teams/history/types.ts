import type { WebsiteData } from "@/history-config/data-generator"

export type Team = WebsiteData[number][number]

export interface TeamPhoto {
  url: string
  caption: string
}

export interface HistoryLightbox {
  contentKey: string
  index: number
}

export interface TeamManifestYear {
  year: string
  images: TeamPhoto[]
}

export interface TeamManifest {
  years?: TeamManifestYear[]
}
