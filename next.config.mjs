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
    ignoreBuildErrors: true,
  },
};

export default nextConfig;