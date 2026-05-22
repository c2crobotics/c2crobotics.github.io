import { cubicBezier } from "framer-motion"

export const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const sidebarVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
    },
  },
}

export const mobileSidebarVariants = {
  hidden: {
    x: "-100%",
    transition: {
      type: "tween" as const,
      duration: 0.3,
    },
  },
  visible: {
    x: 0,
    transition: {
      type: "tween" as const,
      duration: 0.3,
    },
  },
} as const
