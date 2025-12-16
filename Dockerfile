# Multi-stage Dockerfile for building and serving a Gatsby site
# This image uses Debian (glibc) to avoid musl/glibc incompatibilities with Gatsby native modules

# Build stage
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Install build tools required by Gatsby plugins (e.g., sharp) during npm install
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ git \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies first (leverage Docker layer caching)
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy the rest of the source and build
COPY . .
RUN npm run build

# Runtime stage (serve the prebuilt static site)
FROM node:20-bookworm-slim AS runner
WORKDIR /app

# Copy the built app and dependencies (gatsby serve requires node runtime)
COPY --from=builder /app /app

# Environment and ports
ENV HOST=0.0.0.0
ENV PORT=8060
EXPOSE 8060

# Use Gatsby's built-in static server
CMD ["npm", "run", "serve", "--", "-H", "0.0.0.0", "-p", "8060"]
