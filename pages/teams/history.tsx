"use client"

import { Trophy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTeamHistory } from "@/hooks/use-team-history"
import HistoryStatusCard from "@/components/teams/history/HistoryStatusCard"
import HistoryPageLayout from "@/components/teams/history/HistoryPageLayout"
import TeamHistoryContent from "@/components/teams/history/TeamHistoryContent"
import NoTeamSelected from "@/components/teams/history/NoTeamSelected"
import TeamHistoryLoading from "@/components/teams/history/TeamHistoryLoading"

export default function History() {
  const {
    teamLoading,
    error,
    hasData,
    yearsForTeam,
    allTeamNumbers,
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
  } = useTeamHistory()

  if (error && !hasData) {
    return (
      <HistoryStatusCard
        icon={
          <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <X className="w-6 h-6 text-red-500" />
          </div>
        }
        title="Error Loading Data"
        description={<p className="text-gray-600 mb-4 wrap-break-words">{error}</p>}
        action={
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
            Try Again
          </Button>
        }
      />
    )
  }

  if (!hasData) {
    return (
      <HistoryStatusCard
        icon={<Trophy className="w-12 h-12 mx-auto text-gray-400 mb-4" />}
        title="No Team Data Found"
        description={<p className="text-gray-600">Please check your API configuration.</p>}
      />
    )
  }

  return (
    <HistoryPageLayout
      years={yearsForTeam}
      teamNumbers={allTeamNumbers}
      effectiveYear={effectiveYear}
      effectiveTeamNumber={effectiveTeamNumber}
      sidebarOpen={sidebarOpen}
      photoUrls={photoUrls}
      showLightbox={showLightbox}
      lightboxIndex={lightbox?.index ?? 0}
      onToggleSidebar={toggleSidebar}
      onCloseSidebar={closeSidebar}
      onYearSelect={handleYearSelect}
      onTeamSelect={handleTeamSelect}
      onCloseLightbox={closeLightbox}
    >
      {teamLoading && !effectiveTeam ? (
        <TeamHistoryLoading teamNumber={effectiveTeamNumber} />
      ) : error && hasData ? (
        <Card className="bg-white shadow-lg border-0">
          <CardContent className="text-center py-12">
            <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
              <X className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-[#1a1a1f] mb-2 uppercase tracking-wide">
              Error Loading Team
            </h3>
            <p className="text-gray-600 mb-4 wrap-break-words">{error}</p>
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : effectiveTeam && effectiveYear != null ? (
        <TeamHistoryContent
          team={effectiveTeam}
          year={effectiveYear}
          contentKey={contentKey}
          photos={teamPhotos}
          photosLoading={photosLoading}
          onPhotoClick={openLightbox}
        />
      ) : (
        <NoTeamSelected />
      )}
    </HistoryPageLayout>
  )
}
