# 使用 Node.js 官方映像作為基礎映像
FROM node:18-alpine

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製源代碼
COPY . .

# 構建 TypeScript 代碼
RUN npm run build

# 暴露端口
EXPOSE 3001

# 啟動應用
CMD ["npm", "start"] 