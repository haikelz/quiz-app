FROM node:alpine AS build

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . ./
RUN pnpm run build

CMD ["pnpm", "run", "dev"]