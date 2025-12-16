# Multi-stage Dockerfile for building and serving a Gatsby site
# Build stage
FROM node:18-alpine AS builder

# Install OS deps if needed (optional)
# RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install dependencies first (leverage Docker layer caching)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source and build
COPY . .
RUN npm run build

# Runtime stage (serve the prebuilt static site)
FROM node:18-alpine AS runner
WORKDIR /app

# Copy the built app and dependencies (gatsby serve requires node runtime)
COPY --from=builder /app /app

# Environment and ports
ENV HOST=0.0.0.0
ENV PORT=8060
EXPOSE 8060

# Use Gatsby's built-in static server
CMD ["npm", "run", "serve", "--", "-H", "0.0.0.0", "-p", "8060"]
