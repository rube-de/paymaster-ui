# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install build dependencies for native modules (utf-8-validate, bufferutil)
RUN apk add --no-cache python3 make g++

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Build production assets
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Stage 3: Serve with nginx (unprivileged, runs as non-root)
FROM nginxinc/nginx-unprivileged:1.27-alpine

# Copy nginx configuration first (better cache layering)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose unprivileged port
EXPOSE 8080

# Health check for container orchestration (use 127.0.0.1 to avoid IPv6 issues)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/ || exit 1
