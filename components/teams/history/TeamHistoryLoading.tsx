"use client"

import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TeamHistoryLoadingProps {
  teamNumber: string | null
}

export default function TeamHistoryLoading({ teamNumber }: TeamHistoryLoadingProps) {
  return (
    <Card className="bg-white shadow-lg border-0">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 text-base sm:text-lg font-medium">
          Loading history{teamNumber ? ` for ${teamNumber}` : ""}…
        </p>
        <p className="text-gray-400 text-sm mt-2">Fetching from RobotEvents (cached when available)</p>
      </CardContent>
    </Card>
  )
}
