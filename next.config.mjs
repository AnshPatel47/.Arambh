/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Ignore ESLint errors during Vercel builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript type errors during Vercel builds
  typescript: {
    ignoreBuildErrors: false,
    },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      'framer-motion',
      '@prisma/client',
      'date-fns',
      'lodash'
    ],
  },
};

export default nextConfig;