# 빌드 단계 동일
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx 단계
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
# 빌드 산출물을 /kakao 에 복사
RUN mkdir -p /usr/share/nginx/html/kakao
COPY --from=builder /app/dist/ /usr/share/nginx/html/kakao/
COPY nginx.conf /etc/nginx/conf.d/default.conf