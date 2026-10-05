# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app

# ---------- DEV: Vite com HMR ----------
FROM base AS dev
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ---------- BUILD ----------
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
# Com /api relativo não precisa mudar nada entre ambientes
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---------- PRODUCTION: nginx só para servir os estáticos ----------
FROM nginx:alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80