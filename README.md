# 自動化交易平台

這是一個完整的自動化交易平台，提供使用者撰寫、回測、執行自動交易策略，並透過 API 自動下單。

## 系統架構

### 技術棧
- 前端：React + TypeScript
- 後端：Node.js + Express + TypeScript
- 資料庫：PostgreSQL
- 容器化：Docker
- 部署：Kubernetes

### 主要功能模組
1. 使用者管理
   - 註冊、登入、雙因子驗證（2FA）
   - 使用者帳戶管理

2. 策略管理
   - 撰寫與提交交易策略
   - 策略參數設定
   - 策略執行控制

3. 交易管理
   - 即時交易紀錄查詢
   - 交易績效分析
   - 回測與模擬交易

4. API 金鑰管理
   - 交易所 API 金鑰綁定
   - 安全加密存儲

5. 通知系統
   - 即時交易監控
   - 交易訊息推播

## 專案結構
```
trading-platform/
├── frontend/          # React 前端應用
├── backend/           # Node.js 後端服務
├── docker/           # Docker 配置文件
├── k8s/              # Kubernetes 配置文件
└── docs/             # 專案文檔
```

## 開發環境設置
1. 安裝依賴
   ```bash
   # 前端
   cd frontend
   npm install

   # 後端
   cd backend
   npm install
   ```

2. 環境變數設置
   - 複製 `.env.example` 到 `.env`
   - 設置必要的環境變數

3. 啟動開發服務器
   ```bash
   # 前端
   npm run dev

   # 後端
   npm run dev
   ```

## 部署
使用 Docker 和 Kubernetes 進行部署：
```bash
# 構建 Docker 映像
docker-compose build

# 部署到 Kubernetes
kubectl apply -f k8s/
```

## 安全考慮
- API 金鑰使用 AES-256 加密存儲
- 實現 WAF 防火牆
- 使用 Cloudflare/CDN 防 DDoS
- 定期安全審計

## 監控
- 使用 Grafana + Prometheus 監控系統
- 完整的日誌管理系統
- 異常通知機制

## 授權
MIT License 