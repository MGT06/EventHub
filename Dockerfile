FROM node:24.15.0 AS builder

WORKDIR /app

ENV VITE_API_URL=/api

COPY package-lock.json package.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]