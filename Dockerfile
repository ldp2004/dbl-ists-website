# Use Node.js LTS as base
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

# Add --legacy-peer-deps flag to resolve dependency conflicts
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

# Use a single CMD instruction with proper JSON format
# First build, then start
CMD ["sh", "-c", "npm run build && npm run start"]