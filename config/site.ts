type Color = "foreground" | "background" | "primary" | "secondary" | "accent"

import { Trophy, Calendar, Users, Award } from "lucide-react"

export type GallerySubcategory = {
  name: string
  images: string[]
}

export type GalleryAlbum = {
  name: string
  subcategories: {
    [key: string]: GallerySubcategory
  }
}

export type GalleryData = {
  carouselImages: string[]
  albums: {
    [key: string]: GalleryAlbum
  }
}

export type NavItem = {
  label: string
  href: string
  dropdown?: {
    label: string
    href: string
    tabId: string
    description?: string
  }[]
}

export type Sponsor = {
  title: string
  link: string
  url: string
}

export type StatItem = {
  icon: any
  label: string
  value: number
  suffix: string
  color: string
  bgColor: string
}

export type SiteConfig = {
  name: string
  description: string
  navItems: NavItem[]
  links: {
    [key: string]: string
  }
  siteURLs: {
    [key: string]: string
  }
  gallery: GalleryData
  sponsors: Sponsor[]
  stats: StatItem[]
}

export const navItemsData = [
  {
    label: "Teams",
    href: "/teams",
    color: "foreground" as Color,
    dropdown: [
      {
        label: "Team History",
        href: "/teams/history",
        tabId: "",
        description: "Learn about our journey and achievements",
      },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    color: "foreground" as Color,
  },
  {
    label: "Classes & Camps",
    href: "/courses",
    color: "foreground" as Color,
    dropdown: [
      {
        label: "Winter Courses",
        href: "/courses",
        tabId: "jan-april",
        description: "January - March programs",
      },
      {
        label: "Holiday Courses",
        href: "/courses",
        tabId: "holiday",
        description: "April - June programs",
      },
      {
        label: "Summer Courses",
        href: "/courses",
        tabId: "summer",
        description: "July - August programs",
      },
      {
        label: "Fall Courses",
        href: "/courses",
        tabId: "fall",
        description: "September - December programs",
      },
    ],
  },
  {
    label: "Register",
    href: "/register",
    color: "foreground" as Color,
  },
  {
    label: "Contact",
    href: "/contact",
    color: "foreground" as Color,
  },
]

export const linksData = {
  github: "https://github.com/c2crobotics",
  instagram: "https://www.instagram.com/c2crobotics/",
  facebook: "https://www.facebook.com/profile.php?id=100063715805638",
  twitter: "https://x.com/c2c_robotics",
  youtube: "https://www.youtube.com/channel/UCgZzPysyfr9m7b-pOD_6Yng",
}

const galleryData: GalleryData = {
  carouselImages: ["/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5185].webp", "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2320].webp", "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2312].webp", "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5392].webp", "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_6063].webp"],
  albums: {
    "2024-2025": {
      name: "Rapid Relay",
      subcategories: {
        team_photos: {
          name: "Team Photos",
          images: ["/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2587].webp"],
        },
        events: {
          name: "Competitions",
          images: [
            "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2427].webp",
            "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2312].webp",
            "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2320].webp",
            "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2496].webp",
            "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2341].webp",
          ],
        },
        robots: {
          name: "Robots",
          images: [
            "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2327].webp",
            "/gallery/2024-2025 Rapid_Relay/Worlds2025_May12_JHO [IMG_2331].webp",
          ],
        },
      },
    },
    "2023-2024": {
      name: "NJIT 2024",
      subcategories: {
        team_photos: {
          name: "Team Photos",
          images: [
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5267].webp",
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5185].webp",
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5042].webp",
            "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_5843].webp",
          ],
        },
        competitions: {
          name: "Competitions",
          images: [
            "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_6063].webp",
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_4967].webp",
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5456].webp",
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5382].webp",
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5345].webp",
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5392].webp",

          ],
        },
        robots: {
          name: "Robots",
          images: [
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5340].webp",
            "/gallery/NJIT2024/NJIT2024_September21_JHO [IMG_5329].webp",
            "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_5798].webp",
            "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_5681].webp",
            "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_5677].webp",
            "/gallery/NJIT2024/NJIT2024_September22_JHO [IMG_6136].webp",

          ],
        },
      },
    },
  },
}

const sponsorsData: Sponsor[] = [
  // {
  //   title: "Vex Robotics Competition",
  //   link: "/sponsors/VEX.webp",
  //   url: "https://www.vexrobotics.com/competition",
  // },
  // {
  //   title: "Vex IQ Robotics Competition",
  //   link: "/sponsors/VexIQ.webp",
  //   url: "https://www.vexrobotics.com/iq",
  // },
  {
    title: "Whimsy Tech Inc.",
    link: "/sponsors/WhimsyTech.webp",
    url: "https://www.whimsytech.net/",
  },
  {
    title: "Wisteria Arts",
    link: "/sponsors/WisteriaArts.webp",
    url: "https://www.wisteriaarts.com/",
  },
]

const statsData: StatItem[] = [
  {
    icon: Trophy,
    label: "Awards Won",
    value: 80,
    suffix: "+",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Calendar,
    label: "Robotics Competitions",
    value: 190,
    suffix: "+",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    label: "V5RC/VIQRC/VURC Teams",
    value: 10,
    suffix: "",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    label: "Years of Innovation",
    value: 10,
    suffix: "+",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },

]

const siteURLsData = {
  home: "/",
  teams: "/teams",
  history: "/teams/history",
  gallery: "/gallery",
  courses: "/courses",
  register: "/register",
  contact: "/contact",
  tos: "/terms-of-service",
  pp: "/privacy-policy",
}

export const siteConfig: SiteConfig = {
  name: "C2C",
  description: "The official website for the C2C Robotics.",
  navItems: navItemsData,
  links: linksData,
  gallery: galleryData,
  sponsors: sponsorsData,
  stats: statsData,
  siteURLs: siteURLsData,
}
