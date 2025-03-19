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

# Enhanced debugging before build
RUN echo "===== PRE-BUILD DIRECTORY CONTENTS =====" && \
    ls -la && \
    echo "===== PACKAGE.JSON CONTENT =====" && \
    cat package.json | grep -A 5 "scripts"

# Build the application
RUN npm run build

# Enhanced debugging after build
RUN echo "===== BUILD OUTPUT DIRECTORY STRUCTURE =====" && \
    ls -la && \
    echo "===== OUT DIRECTORY CONTENTS (if exists) =====" && \
    ls -la out || echo "out directory not found" && \
    echo "===== .NEXT DIRECTORY CONTENTS (if exists) =====" && \
    ls -la .next || echo ".next directory not found"

# Production image, copy all the files and run next
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx content and add debugging
RUN echo "===== REMOVING DEFAULT NGINX CONTENT =====" && \
    rm -rf ./* && \
    echo "===== NGINX HTML DIR AFTER CLEANUP =====" && \
    ls -la

# Copy built static files from builder stage
COPY --from=builder /app/out/ .

# Verify the copied files
RUN echo "===== NGINX HTML DIR AFTER COPYING FILES =====" && \
    ls -la && \
    echo "===== INDEX.HTML CONTENT (if exists) =====" && \
    cat index.html || echo "index.html not found"

# Create a basic nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf && \
    echo "===== NGINX CONFIG =====" && \
    cat /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 