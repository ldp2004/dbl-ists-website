# Use Node.js LTS as base
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json ./
# Use npm install instead of npm ci since package-lock.json is out of sync
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build time
# Use a mock API URL during build time or a publicly accessible URL
ENV NEXT_PUBLIC_STRAPI_API_URL=https://dbl-website-nextjs-dbl.mtgysl.easypanel.host/api
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SITE_URL=https://dbl-website-nextjs-dbl.mtgysl.easypanel.host/
# Add this to enable fallback for static export
ENV NEXT_PUBLIC_STATIC_EXPORT=true
# Add environment variable to skip data fetching during build
ENV SKIP_API_CALLS=true
# Add environment variable for Strapi URL (found in your utils.ts)
ENV NEXT_PUBLIC_STRAPI_URL=https://dbl-website-nextjs-dbl.mtgysl.easypanel.host

# Debug the output directory before building
RUN echo "Building application..." && ls -la

# Build the application
RUN npm run build

# Debug the output directory after building
RUN echo "Build completed, checking output directory:" && ls -la && ls -la out || echo "out directory not found, checking .next:" && ls -la .next || echo ".next directory not found"

# Production image, copy all the files and run next
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx content
RUN rm -rf ./*

# Copy built static files from builder stage
COPY --from=builder /app/out/ .

# Create a basic nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 