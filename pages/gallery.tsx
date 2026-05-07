import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import type { JSX } from "react/jsx-runtime"
import { EmptyImageIcon } from "@/components/icons"
import type { EmblaCarouselType } from 'embla-carousel'

// --- Type definitions ---
interface Subcategory {
  name: string
  images: string[]
}

interface Album {
  name: string
  subcategories: Record<string, Subcategory>
}

interface GalleryManifest {
  carouselImages: string[]
  albums: Record<string, Album>
}
// -------------------------

export default function Gallery() {
  const [selectedAlbum, setSelectedAlbum] = useState("")
  const [carouselApi, setCarouselApi] = useState<EmblaCarouselType | undefined>()
  const autoplayPlugin = useMemo(() => Autoplay({ delay: 2000, stopOnInteraction: true }), [])

  const plugins = useMemo(() => [autoplayPlugin], [autoplayPlugin]);

  const [galleryData, setGalleryData] = useState<GalleryManifest | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/manifests/gallery-manifest.json')
      .then(res => res.json())
      .then((data: GalleryManifest) => {
        setGalleryData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load gallery manifest:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    )
  }

  if (!galleryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load gallery</p>
          <p className="text-gray-500 text-sm">Please refresh the page or try again later.</p>
        </div>
      </div>
    )
  }

  const { carouselImages, albums } = galleryData

  const getCurrentAlbumData = () => {
    if (!selectedAlbum) return null
    const [albumKey, subcategoryKey] = selectedAlbum.split(".")
    const album = albums[albumKey]
    if (!album) return null

    if (subcategoryKey && album.subcategories?.[subcategoryKey]) {
      return {
        name: `${album.name} - ${album.subcategories[subcategoryKey].name}`,
        images: album.subcategories[subcategoryKey].images,
      }
    }

    if (album.subcategories) {
      const allImages: string[] = []
      Object.values(album.subcategories).forEach((subcategory) => {
        allImages.push(...subcategory.images)
      })
      return { name: album.name, images: allImages }
    }

    return { name: album.name, images: [] }
  }

  const currentAlbum = getCurrentAlbumData()
  const currentImages = currentAlbum?.images || []

  const generateDropdownOptions = () => {
    const options: JSX.Element[] = []

    Object.entries(albums).forEach(([albumKey, album]) => {
      if (album.subcategories && Object.keys(album.subcategories).length > 0) {
        const totalImages = Object.values(album.subcategories).reduce(
          (total, subcategory) => total + subcategory.images.length,
          0,
        )

        options.push(
          <SelectItem key={albumKey} value={albumKey} className="font-semibold">
            <div className="flex justify-between items-center w-full">
              <span>{album.name}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">{totalImages}</span>
            </div>
          </SelectItem>,
        )

        Object.entries(album.subcategories).forEach(([subKey, subcategory]) => {
          options.push(
            <SelectItem key={`${albumKey}.${subKey}`} value={`${albumKey}.${subKey}`} className="pl-6">
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-600">{subcategory.name}</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full ml-2">{subcategory.images.length}</span>
              </div>
            </SelectItem>,
          )
        })
      }
    })

    return options
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        className="bg-[#1a1a1f] text-white py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Gallery</h1>
          <p className="text-sm opacity-90 max-w-2xl mx-auto">Explore our collection of images</p>
        </div>
      </motion.div>

      {/* Content */}
      <main className="container mx-auto py-6 sm:py-12 px-4 sm:px-6 max-w-7xl">
        {/* Featured Images */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">Featured Images</h2>
          <div className="max-w-full sm:max-w-2xl mx-auto">
            <Carousel
              plugins={plugins}
              className="mb-2"
              onMouseEnter={autoplayPlugin.stop}
              onMouseLeave={() => autoplayPlugin.play()}
              setApi={setCarouselApi}
              opts={{ align: "start", loop: true }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {carouselImages.map((src, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4">
                    <div className="relative h-128">
                      <Image
                        src={src}
                        alt={`Featured gallery image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg shadow-lg"
                        quality={75}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 672px"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12" />
              <CarouselNext className="hidden sm:flex -right-12" />
            </Carousel>

            {/* Mobile Navigation */}
            <div className="flex sm:hidden justify-center items-center gap-4 mt-4">
              <button
                onClick={() => carouselApi?.scrollPrev()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-xs text-gray-500">Swipe or tap</span>
              <button
                onClick={() => carouselApi?.scrollNext()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Next image"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Albums Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">Albums</h1>
            <div className="w-full sm:w-auto sm:min-w-70 sm:max-w-[320px]">
              <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
                <SelectTrigger className="w-full h-12 text-base sm:text-sm bg-white border-2 hover:border-gray-400 focus:border-blue-500 transition-colors">
                  <SelectValue placeholder="Select an album" />
                </SelectTrigger>
                <SelectContent className="w-full max-w-[calc(100vw-2rem)] sm:max-w-[320px]">
                  {generateDropdownOptions()}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Images Grid */}
          <AnimatePresence mode="wait">
            {selectedAlbum && currentImages.length > 0 && (
              <motion.div
                key={selectedAlbum}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
              >
                {currentImages.map((src, index) => (
                  <motion.div
                    key={`${selectedAlbum}-${index}`}
                    className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Image
                      src={src}
                      alt={`${currentAlbum?.name} image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!selectedAlbum && (
              <motion.div
                key="empty"
                className="flex items-center justify-center h-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <EmptyImageIcon />
                  </div>
                  <p className="text-gray-500 text-lg font-medium mb-2">No album selected</p>
                  <p className="text-gray-400">Please select an album above to view images</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}