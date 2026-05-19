FROM node:24-alpine AS base

RUN corepack enable && corepack prepare pnpm@11.1.0 --activate

WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm approve-builds esbuild msw && \
    pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run check:size
RUN pnpm run build:prod

# Production image
FROM node:24-alpine AS runner
RUN corepack enable && corepack prepare pnpm@11.1.0 --activate
WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Set production environment
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "build"]