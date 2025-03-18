/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimize for containerized environments
  poweredByHeader: false, // Remove X-Powered-By header for security
  compress: true, // Enable compression
  productionBrowserSourceMaps: false, // Disable source maps in production
  // ... your other Next.js config
};

module.exports = nextConfig; 