# 交易平台前端

## 項目描述
這是一個使用 React、TypeScript 和 Ant Design 構建的現代化交易平台前端界面。

## 功能特點
- 用戶認證（登錄、註冊、雙因素認證）
- 交易管理（創建、查看、更新交易）
- 策略管理（創建、編輯、啟用/禁用策略）
- 實時數據展示
- 響應式設計

## 技術棧
- React 18
- TypeScript 4.9
- Ant Design 5.3
- React Router 6.8
- Axios
- Day.js

## 安裝說明
1. 安裝依賴：
   ```bash
   npm install
   ```

2. 啟動開發服務器：
   ```bash
   npm start
   ```

3. 構建生產版本：
   ```bash
   npm run build
   ```

## 環境配置
在 `.env` 文件中配置以下環境變量：
- `REACT_APP_API_URL`: API 服務器地址
- `REACT_APP_WS_URL`: WebSocket 服務器地址

## 項目結構
```
src/
  ├── components/     # React 組件
  ├── services/      # API 服務
  ├── routes/        # 路由配置
  ├── utils/         # 工具函數
  └── types/         # TypeScript 類型定義
```

## 開發指南
1. 遵循 TypeScript 嚴格模式
2. 使用函數組件和 Hooks
3. 遵循 Ant Design 設計規範
4. 保持代碼風格一致

## 部署
1. 構建生產版本
2. 將 `build` 目錄部署到 Web 服務器 