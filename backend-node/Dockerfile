# Giai đoạn 1: Build mã nguồn TypeScript sang JavaScript
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Giai đoạn 2: Khởi chạy ứng dụng sản phẩm thực tế
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

# Copy thư mục 'dist' đã được build từ Giai đoạn 1 sang
COPY --from=builder /app/dist ./dist

# Mở cổng kết nối
EXPOSE 3001

# Lệnh chạy file chính đã được build thành file .js trong thư mục dist
CMD ["node", "dist/index.js"]