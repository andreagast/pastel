FROM docker.io/library/node:18-alpine AS builder

COPY ./ /app
WORKDIR /app
RUN npm ci
RUN npm run build

FROM docker.io/library/nginx:alpine
COPY ./confs/nginx-fe.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/frontend/ /usr/share/nginx/html
