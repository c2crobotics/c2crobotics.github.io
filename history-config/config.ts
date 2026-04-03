// Static Configuration for GitHub Pages

export const ROBOTEVENTS_CONFIG = {
  // API Token from environment variable
  API_TOKEN: process.env.ROBOTEVENTS_API_TOKEN || "",

  // Your team numbers
  TEAMS: ["62880A", "62880B", "62880C", "62880D", "62880E", "65950A", "65950B", "65950C", "65950D", "OOPS"],

  // Organization name to filter by
  ORGANIZATION: "Coast 2 Coast Robotics",

  // API Base URL
  BASE_URL: "https://www.robotevents.com/api/v2",
}

export const validateConfig = (): { isValid: boolean; error?: string } => {
  if (!ROBOTEVENTS_CONFIG.API_TOKEN) {
    return {
      isValid: false,
      error:
        "RobotEvents API token is not configured.",
    }
  }

  return { isValid: true }
}
