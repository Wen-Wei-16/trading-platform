# 交易平台後端

這是一個基於 Node.js 和 TypeScript 開發的自動化交易平台後端服務。

## 功能特點

- 用戶認證（JWT + 雙因子認證）
- 策略管理
- 交易執行
- 交易統計
- 實時數據推送

## 技術棧

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT
- WebSocket

## 安裝

1. 克隆項目：
```bash
git clone <repository-url>
cd trading-platform/backend
```

2. 安裝依賴：
```bash
npm install
```

3. 配置環境變數：
```bash
cp .env.example .env
# 編輯 .env 文件，設置必要的環境變數
```

4. 創建數據庫：
```bash
createdb trading_platform
```

5. 運行遷移：
```bash
npm run migration:run
```

## 開發

啟動開發服務器：
```bash
npm run dev
```

## 構建

構建生產版本：
```bash
npm run build
```

## 運行

運行生產版本：
```bash
npm start
```

## API 文檔

### 認證

- POST /api/auth/register - 用戶註冊
- POST /api/auth/login - 用戶登入
- POST /api/auth/2fa/enable - 啟用雙因子認證
- POST /api/auth/2fa/disable - 禁用雙因子認證
- POST /api/auth/change-password - 修改密碼

### 策略

- POST /api/strategies - 創建策略
- PUT /api/strategies/:id - 更新策略
- DELETE /api/strategies/:id - 刪除策略
- GET /api/strategies/:id - 獲取策略
- GET /api/strategies - 列出策略
- PATCH /api/strategies/:id/status - 更新策略狀態

### 交易

- POST /api/trades - 創建交易
- PATCH /api/trades/:id/status - 更新交易狀態
- GET /api/trades/:id - 獲取交易
- GET /api/trades - 列出交易
- GET /api/trades/stats - 獲取交易統計

## 授權

MIT 