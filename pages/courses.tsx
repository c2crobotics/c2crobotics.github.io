"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Filter } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
  siteConfig,
  janAprilConfig,
  holidayConfig,
  fallConfig,
  summerConfig,
  janAprilCourses,
  holidayCourses,
  fallCourses,
  summerCourses,
} from "../config/courses"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useCallback, useMemo } from "react"
import Image from "next/image"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

const imageVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
}

const detailsVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    marginBottom: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    marginBottom: 12,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

function ScheduleImage({ category }: { category: string }) {
  const imageConfig = siteConfig.scheduleImages[category as keyof typeof siteConfig.scheduleImages]

  if (!imageConfig) return null

  return (
    <motion.div variants={itemVariants}>
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full" style={{ aspectRatio: `${imageConfig.width}/${imageConfig.height}` }}>
            <Image
              src={imageConfig.src}
              alt={imageConfig.alt}
              fill
              className="rounded-lg border object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 672px"
              quality={75}
              priority
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function CompactCourseCard({ course, index }: { course: any; index: number }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" custom={index}>
      <Card className="h-full flex flex-col overflow-hidden" style={{ contain: "layout" }}>
        <div className="relative overflow-hidden">
          <motion.div
            className="relative w-full h-48"
            variants={imageVariants}
            whileHover="hover"
          >
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover rounded-t-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              quality={75}
              loading={index < 8 ? "eager" : "lazy"}
            />
          </motion.div>
          <div className="absolute top-2 right-2 flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              {course.category}
            </Badge>
            {course.soldOut && (
              <Badge variant="destructive" className="text-xs">
                Full
              </Badge>
            )}
            {course.notAvailable && (
              <Badge variant="destructive" className="text-xs">
                Not Available
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="p-4 pb-2 shrink-0">
          <CardTitle className="text-base leading-tight min-h-10 flex items-start">{course.title}</CardTitle>
          <CardDescription className="text-xs line-clamp-2 min-h-8 flex items-start">
            {course.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-1 flex flex-col">
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground shrink-0" />
              <span className="truncate">{course.gradeLevel}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-muted-foreground shrink-0" />
              <span className="truncate">{course.dates}</span>
            </div>
            <div className="flex items-start gap-1 col-span-2">
              <Clock className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-xs leading-tight">{course.time}</span>
            </div>
          </div>

          {/* Show sessions */}
          {course.sessions && course.sessions.length > 0 && (
            <div className="space-y-1 mb-3">
              <h5 className="font-medium text-xs">Available Sessions:</h5>
              <div className="grid gap-1">
                {course.sessions.map((session: any, sessionIndex: number) => (
                  <motion.div
                    key={sessionIndex}
                    className="bg-muted p-2 rounded text-xs relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sessionIndex * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium">{session.name}</div>
                        <div className="text-muted-foreground">{session.dates}</div>
                      </div>
                      {session.available === false && (
                        <Badge variant="destructive" className="text-xs">
                          Full
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* content area */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex-1">
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    variants={detailsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="overflow-hidden"
                    style={{ willChange: "height, opacity" }}
                  >
                    <div className="space-y-2 text-xs pt-2">
                      <div>
                        <h5 className="font-medium mb-1">Skills:</h5>
                        <div className="flex flex-wrap gap-1">
                          {course.skills.map((skill: string, skillIndex: number) => (
                            <motion.div
                              key={skillIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: skillIndex * 0.05 }}
                            >
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Projects:</h5>
                        <ul className="list-disc list-inside space-y-0.5">
                          {course.projects.slice(0, 3).map((project: string, projectIndex: number) => (
                            <motion.li
                              key={projectIndex}
                              className="text-xs"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: projectIndex * 0.1 }}
                            >
                              {project}
                            </motion.li>
                          ))}
                          {course.projects.length > 3 && (
                            <motion.li
                              className="text-xs"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              ...and more
                            </motion.li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Button */}
            <div className="space-y-2 mt-auto">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs bg-transparent"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? "Hide Details" : "Show Details"}
                </Button>
              </motion.div>

              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                {course.soldOut || course.notAvailable ? (
                  <Button size="sm" className="w-full" disabled>
                    {course.soldOut ? "No Spots Available" : course.notAvailable ? "Not Offered" : "Enroll Now"}
                  </Button>
                ) : (
                  <Link href="/register">
                    <Button size="sm" className="w-full">
                      Enroll Now
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FilterTags({
  courses,
  selectedTags,
  onTagChange,
}: {
  courses: any[]
  selectedTags: string[]
  onTagChange: (tags: string[]) => void
}) {
  const allTags = Array.from(new Set(courses.flatMap((course) => course.tags)))

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagChange([...selectedTags, tag])
    }
  }

  return (
    <motion.div variants={itemVariants}>
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter by Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() => toggleTag(tag)}
                >
                  {tag.replace("-", " ")}
                </Button>
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {selectedTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => onTagChange([])}>
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ClassDatesCard({ config }: { config: any }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="mb-4 bg-secondary">
        <CardContent className="p-4">
          <h3 className="text-base font-bold mb-2">{config.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {Object.entries(config.schedule).map(([day, dates]) => (
              <div key={day}>
                <h4 className="font-medium mb-1">{day}:</h4>
                <p className="text-muted-foreground">{dates as string}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SessionsCard({ config }: { config: any }) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="mb-4 bg-primary text-primary-foreground">
        <CardContent className="p-4">
          <h3 className="text-base font-bold mb-2">{config.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {config.sessions.map((session: string, index: number) => (
              <div key={index}>• {session}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function CoursesPage() {
  const [janAprilTags, setJanAprilTags] = useState<string[]>([])
  const [holidayTags, setHolidayTags] = useState<string[]>([])
  const [fallTags, setFallTags] = useState<string[]>([])
  const [summerTags, setSummerTags] = useState<string[]>([])

  const searchParams = useSearchParams()
  const router = useRouter()

  // Derive active tab directly from URL – no state, no effect
  const activeTab = useMemo(() => {
    const tab = searchParams.get("tab")
    return tab && ["jan-april", "summer", "fall", "holiday"].includes(tab) ? tab : "jan-april"
  }, [searchParams])

  // Update URL when user selects a tab – only side effect is router.replace
  const handleTabChange = useCallback(
    (value: string) => {
      router.replace(`?tab=${value}`, { scroll: false })
    },
    [router]
  )

  const filteredJanAprilCourses =
    janAprilTags.length === 0
      ? janAprilCourses
      : janAprilCourses.filter((course) => course.tags.some((tag) => janAprilTags.includes(tag)))

  const filteredHolidayCourses =
    holidayTags.length === 0
      ? holidayCourses
      : holidayCourses.filter((course) => course.tags.some((tag) => holidayTags.includes(tag)))

  const filteredFallCourses =
    fallTags.length === 0
      ? fallCourses
      : fallCourses.filter((course) => course.tags.some((tag) => fallTags.includes(tag)))

  const filteredSummerCourses =
    summerTags.length === 0
      ? summerCourses
      : summerCourses.filter((course) => course.tags.some((tag) => summerTags.includes(tag)))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        className="bg-[#1a1a1f] text-primary-foreground py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-2xl font-bold text-center mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {siteConfig.title}
          </motion.h1>
          <motion.p
            className="text-sm text-center opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {siteConfig.subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="summer" className="text-xs">
                Summer
              </TabsTrigger>
              <TabsTrigger value="fall" className="text-xs">
                Fall (Sept - Dec)
              </TabsTrigger>
              <TabsTrigger value="jan-april" className="text-xs" >
                Winter (Jan - Mar)
              </TabsTrigger>
              <TabsTrigger value="holiday" className="text-xs">
                Holiday
              </TabsTrigger>
              
            </TabsList>
          </motion.div>

          <TabsContent value="jan-april">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.div variants={itemVariants}>
                <h2 className="text-lg font-bold mb-2">{janAprilConfig.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{janAprilConfig.description}</p>
              </motion.div>

              <ClassDatesCard config={janAprilConfig.classDates} />
              <ScheduleImage category="jan-april" />
              <FilterTags courses={janAprilCourses} selectedTags={janAprilTags} onTagChange={setJanAprilTags} />

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                variants={containerVariants}
              >
                {filteredJanAprilCourses.map((course, index) => (
                  <CompactCourseCard key={index} course={course} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="summer">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.div variants={itemVariants}>
                <h2 className="text-lg font-bold mb-2">{summerConfig.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{summerConfig.description}</p>
              </motion.div>

              <FilterTags courses={summerCourses} selectedTags={summerTags} onTagChange={setSummerTags} />

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                variants={containerVariants}
              >
                {filteredSummerCourses.map((course, index) => (
                  <CompactCourseCard key={index} course={course} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="fall">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.div variants={itemVariants}>
                <h2 className="text-lg font-bold mb-2">{fallConfig.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{fallConfig.description}</p>
              </motion.div>

              <ClassDatesCard config={fallConfig.classDates} />
              <ScheduleImage category="fall" />
              <FilterTags courses={fallCourses} selectedTags={fallTags} onTagChange={setFallTags} />

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                variants={containerVariants}
              >
                {filteredFallCourses.map((course, index) => (
                  <CompactCourseCard key={index} course={course} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="holiday">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
              <motion.div variants={itemVariants}>
                <h2 className="text-lg font-bold mb-2">{holidayConfig.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{holidayConfig.description}</p>
              </motion.div>

              <SessionsCard config={holidayConfig.availableSessions} />
              <FilterTags courses={holidayCourses} selectedTags={holidayTags} onTagChange={setHolidayTags} />

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                variants={containerVariants}
              >
                {filteredHolidayCourses.map((course, index) => (
                  <CompactCourseCard key={index} course={course} index={index} />
                ))}
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}