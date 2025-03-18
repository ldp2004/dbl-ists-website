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

# Build the application with static export
RUN npm run build && npm run export

# Production image, copy all the files and run next
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy built static files from builder stage
COPY --from=builder /app/out ./

# Copy custom nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"] 