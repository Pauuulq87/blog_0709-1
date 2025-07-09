# Vibe Coding Academy - 網站需求收集器

## 專案概述

**Vibe Coding Academy** 是一個遊戲化的網站需求收集介面，透過卡牌遊戲的互動方式，幫助非技術背景用戶清晰表達他們的網站建置需求。

### 核心功能
- 🎮 遊戲化卡牌介面
- 📋 結構化需求收集
- 🔄 降低認知負荷
- 📄 生成標準化需求文件

## 快速開始

1. **閱讀 CLAUDE.md 首先** - 包含 Claude Code 的基本規則
2. 遵循任務執行前的合規檢查清單
3. 使用 `src/` 目錄下的模組結構
4. 每個完成的任務後提交

## 專案結構

```
src/
├── components/     # 卡牌、對話框等 UI 組件
├── collectors/     # 需求收集器（五大階段）
├── utils/         # 需求處理、輸出生成工具
└── styles/        # 遊戲化視覺設計
output/            # 生成的需求文件
docs/              # 使用說明
```

## 需求收集流程

### 五大階段
1. **專案願景收集** - 基本需求與動機
2. **設計風格收集** - 視覺設計偏好
3. **功能需求收集** - 具體功能需求
4. **技術架構收集** - 技術偏好（非技術語言）
5. **專案規格確認** - 最終確認與輸出

## 開發指南

- **始終先搜索** - 創建新文件前先查找現有功能
- **擴展現有** - 優先擴展現有功能而非重複
- **使用 Task agents** - 超過30秒的操作
- **單一事實來源** - 避免重複實現
- **語言無關結構** - 適用於 JavaScript 等語言
- **可擴展** - 從簡單開始，按需增長

## 技術棧

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **資料處理**: JSON 格式需求輸出
- **整合**: 直接與 Claude API 串接
- **部署**: 靜態網站部署（Vercel/Netlify）

## 使用方式

```bash
# 啟動開發伺服器
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

## 輸出格式

系統會生成以下格式的需求文件：
- `user_requirements.json` - 結構化需求資料
- `tech_specifications.md` - 技術規格文件
- `project_brief.md` - 專案摘要說明

## 貢獻指南

1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權條款

本專案採用 MIT 授權條款