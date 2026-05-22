/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  modularizeImports: {
    "react-icons/?(((\\w*)?/?)*)": {
      transform: "@react-icons/all-files/{{ matches.[1] }}/{{ member }}",
      skipDefaultConversion: true
    }
  },
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    ROBOTEVENTS_API_TOKEN: process.env.ROBOTEVENTS_API_TOKEN,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  },
}

module.exports = nextConfig