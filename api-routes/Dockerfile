FROM node:24-alpine AS base
ENV CI=true
RUN corepack enable
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY api/package.json ./api/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm i --frozen-lockfile --store-dir=/pnpm/store --filter @pheralb/svgl-api

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/api/node_modules ./api/node_modules
COPY api/ ./api/
COPY src/data/ ./src/data/
COPY src/types/ ./src/types/
WORKDIR /app/api
RUN node generate-data.mjs && pnpm run build

# Production
FROM node:24-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/api/dist ./dist
COPY --from=builder /app/api/node_modules ./node_modules
COPY --from=builder /app/api/package.json ./
EXPOSE 3000
CMD ["node", "dist/index.mjs"]
