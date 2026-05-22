"use client"

import { Camera, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AspectRatioImage from "@/components/AspectRatioImage"
import type { TeamPhoto } from "@/components/teams/history/types"

interface TeamPhotoGalleryProps {
  photos: TeamPhoto[]
  year: number
  contentKey: string
  loading: boolean
  onPhotoClick: (index: number) => void
}

export default function TeamPhotoGallery({
  photos,
  year,
  contentKey,
  loading,
  onPhotoClick,
}: TeamPhotoGalleryProps) {
  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold text-[#1a1a1f] flex items-center uppercase tracking-wide">
          <Camera className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-purple-500 shrink-0" />
          <span className="wrap-break-words">Photo Gallery</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-base sm:text-lg">
              No photos found for this team in {year}.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`photos-${contentKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
                {photos.map((photo, index) => (
                  <motion.div
                    key={`${contentKey}-${index}`}
                    className="mb-4 break-inside-avoid"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index * 0.02, 0.4),
                      ease: "easeOut",
                    }}
                  >
                    <div className="relative group/photo">
                      <AspectRatioImage
                        src={photo.url}
                        alt={photo.caption}
                        priority={index < 8}
                        onClick={() => onPhotoClick(index)}
                      />
                      {photo.caption && (
                        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/75 text-white p-3 translate-y-full group-hover/photo:translate-y-0 transition-transform duration-300 pointer-events-none rounded-b-lg">
                          <p className="font-medium text-sm uppercase tracking-wide wrap-break-words">
                            {photo.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  )
}
