
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production --frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]