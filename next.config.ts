import { NextConfig } from 'next';

// Create a merged type for Next.js config
const nextConfig = {
  // Use standalone output for Docker
  //output: process.env.SKIP_BUILD_STATIC_GENERATION === 'true' ? 'standalone' : 'export',
  
  images: {
    //unoptimized: process.env.SKIP_BUILD_STATIC_GENERATION !== 'true', // Disable image optimization in export mode
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  compress: true, // Enable compression
  
  // For external packages
  serverExternalPackages: ['sharp'],
} satisfies NextConfig;

export default nextConfig;
