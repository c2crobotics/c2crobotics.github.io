"use client"

import type { Team, TeamPhoto } from "@/components/teams/history/types"
import TeamHistoryHeader from "@/components/teams/history/TeamHistoryHeader"
import AchievementsSection from "@/components/teams/history/AchievementsSection"
import CompetitionsSection from "@/components/teams/history/CompetitionsSection"
import TeamPhotoGallery from "@/components/teams/history/TeamPhotoGallery"

interface TeamHistoryContentProps {
  team: Team
  year: number
  contentKey: string
  photos: TeamPhoto[]
  photosLoading: boolean
  onPhotoClick: (index: number) => void
}

export default function TeamHistoryContent({
  team,
  year,
  contentKey,
  photos,
  photosLoading,
  onPhotoClick,
}: TeamHistoryContentProps) {
  return (
    <div className="space-y-8">
      <TeamHistoryHeader team={team} />
      <AchievementsSection team={team} year={year} contentKey={contentKey} />
      <CompetitionsSection team={team} year={year} contentKey={contentKey} />
      <TeamPhotoGallery
        photos={photos}
        year={year}
        contentKey={contentKey}
        loading={photosLoading}
        onPhotoClick={onPhotoClick}
      />
    </div>
  )
}
