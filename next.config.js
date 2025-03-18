/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable compression
  productionBrowserSourceMaps: false, // Disable source maps in production
  // ... your other Next.js config
};

module.exports = nextConfig; 