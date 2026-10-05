# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app

# ---------- DEV: hot reload (código vem por bind mount) ----------
FROM base AS dev
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---------- BUILD ----------
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- Dependências só de produção ----------
FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ---------- PRODUCTION ----------
FROM base AS production
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]