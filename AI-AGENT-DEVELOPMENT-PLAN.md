# Vibe Coding Academy - 網站需求收集器

## 專案重新定義

**Vibe Coding Academy** 是一個遊戲化的網站需求收集介面，透過卡牌遊戲的互動方式，幫助非技術背景用戶清晰表達他們的網站建置需求。

### 核心功能定位
- **需求收集工具**：透過遊戲化介面收集用戶網站需求
- **認知負荷降低器**：用直觀的視覺化方式替代複雜的技術選項
- **溝通媒介**：將用戶想法翻譯成可執行的技術規格
- **問卷系統**：結構化地收集所有建站必要資訊

## 專案架構（重新定義）

### 技術棧
```
Frontend: HTML5, CSS3, Vanilla JavaScript
Data Processing: JSON 格式需求輸出
Integration: 直接與 Claude API 串接
Deployment: 靜態網站部署（Vercel/Netlify）
```

### 簡化目錄結構
```
vibe-coding-academy/
├── README.md
├── index.html                  # 主要需求收集介面
├── src/
│   ├── components/             # UI 組件
│   │   ├── Card.js            # 卡牌組件
│   │   ├── DialogueBox.js     # 對話框組件
│   │   └── ProgressBar.js     # 進度條組件
│   ├── collectors/             # 需求收集器
│   │   ├── ProjectTypeCollector.js
│   │   ├── DesignStyleCollector.js
│   │   ├── FeatureCollector.js
│   │   ├── TechStackCollector.js
│   │   └── DeploymentCollector.js
│   ├── utils/                  # 工具函數
│   │   ├── requirementParser.js
│   │   ├── outputGenerator.js
│   │   └── validationHelper.js
│   └── styles/                 # 樣式文件
│       ├── global.css
│       ├── cards.css
│       └── animations.css
├── output/                     # 生成的需求文件
│   ├── user_requirements.json
│   ├── tech_specifications.md
│   └── project_brief.md
└── docs/                       # 使用說明
    ├── USER_GUIDE.md
    └── INTEGRATION_GUIDE.md
```

## 需求收集流程設計

### 五大收集階段

#### 𝟬 專案願景收集
**收集目標：** 用戶基本需求與動機
- 網站類型（部落格、作品集、電商、公司官網）
- 目標受眾定義
- 核心功能期望
- 參考網站範例

**輸出格式：**
```json
{
  "project_vision": {
    "type": "personal_blog",
    "target_audience": "設計師和創作者",
    "core_purpose": "展示作品和分享設計心得",
    "reference_sites": ["https://example.com"],
    "inspiration_keywords": ["簡潔", "現代", "藝術感"]
  }
}
```

#### 𝟭 設計風格收集
**收集目標：** 視覺設計偏好
- 色彩偏好（透過卡牌選擇）
- 佈局風格（單欄、多欄、卡片式）
- 動畫效果需求
- 響應式設計要求

**輸出格式：**
```json
{
  "design_preferences": {
    "color_scheme": "暖色調",
    "layout_style": "單欄式",
    "animation_level": "輕微動畫",
    "mobile_priority": true
  }
}
```

#### 𝟮 功能需求收集
**收集目標：** 具體功能需求
- 內容管理需求（文章、圖片、影片）
- 互動功能（評論、分享、訂閱）
- 整合需求（社群媒體、分析工具）
- 效能要求（載入速度、SEO）

**輸出格式：**
```json
{
  "feature_requirements": {
    "content_types": ["文章", "圖片集", "作品展示"],
    "interaction_features": ["評論系統", "社群分享"],
    "integrations": ["Google Analytics", "Instagram 同步"],
    "performance_needs": ["快速載入", "SEO 優化"]
  }
}
```

#### 𝟯 技術架構收集
**收集目標：** 技術偏好（用非技術語言）
- 內容管理方式偏好
- 部署與維護期望
- 預算與時間限制
- 擴展性需求

**輸出格式：**
```json
{
  "tech_preferences": {
    "content_management": "簡單易用的後台",
    "deployment": "一鍵部署",
    "maintenance": "最少維護",
    "scalability": "支援未來擴展"
  }
}
```

#### 𝟰 專案規格確認
**收集目標：** 最終確認與輸出
- 需求摘要確認
- 優先級排序
- 時程期望
- 生成完整需求文件

**輸出格式：**
```json
{
  "project_summary": {
    "confirmed_requirements": {...},
    "priority_ranking": [...],
    "timeline_expectations": "2-3 週",
    "generated_at": "2025-07-09T10:30:00Z"
  }
}
```

## 核心功能實現

### 1. 需求收集引擎
```javascript
// 需求收集管理器
class RequirementCollector {
  constructor() {
    this.collectedData = {};
    this.currentStage = 0;
    this.validationRules = {};
  }

  collectRequirement(category, data) {
    this.collectedData[category] = data;
    this.validateData(category, data);
  }

  generateOutput() {
    return {
      user_requirements: this.collectedData,
      tech_specifications: this.translateToTechSpecs(),
      project_brief: this.generateProjectBrief()
    };
  }
}
```

### 2. 卡牌互動系統
```javascript
// 卡牌選擇處理器
class CardInteractionHandler {
  constructor() {
    this.selectedOptions = new Map();
    this.cardCategories = ['design', 'features', 'tech', 'deployment'];
  }

  selectCard(category, cardData) {
    this.selectedOptions.set(category, cardData);
    this.updateProgress();
  }

  validateSelection(category) {
    return this.selectedOptions.has(category);
  }
}
```

### 3. 需求翻譯器
```javascript
// 將用戶選擇翻譯成技術規格
class RequirementTranslator {
  translateToTechSpecs(userRequirements) {
    return {
      frontend: this.determineFrontendStack(userRequirements),
      backend: this.determineBackendNeeds(userRequirements),
      cms: this.determineCMSChoice(userRequirements),
      deployment: this.determineDeploymentStrategy(userRequirements)
    };
  }

  generateClaudePrompt(requirements) {
    return `
      基於以下需求建立網站：
      ${JSON.stringify(requirements, null, 2)}
      
      請生成對應的專案架構和程式碼。
    `;
  }
}
```

### 4. 輸出生成器
```javascript
// 生成各種格式的需求文件
class OutputGenerator {
  generateJSON(requirements) {
    return JSON.stringify(requirements, null, 2);
  }

  generateMarkdown(requirements) {
    return `
# 網站建置需求書

## 專案概述
- 類型：${requirements.project_vision.type}
- 目標：${requirements.project_vision.core_purpose}

## 設計需求
- 風格：${requirements.design_preferences.layout_style}
- 色彩：${requirements.design_preferences.color_scheme}

## 功能需求
${requirements.feature_requirements.content_types.map(item => `- ${item}`).join('\n')}

## 技術建議
基於收集到的需求，建議使用以下技術棧：
- 前端：${this.recommendFrontend(requirements)}
- 後端：${this.recommendBackend(requirements)}
- 部署：${this.recommendDeployment(requirements)}
    `;
  }
}
```

## 使用流程

### 用戶操作流程
1. **進入介面** → 看到神秘導師卡牌
2. **點擊開始** → 進入需求收集對話
3. **逐步回答** → 透過卡牌選擇表達需求
4. **確認需求** → 檢視收集到的需求摘要
5. **生成文件** → 獲得結構化的需求文件

### 系統處理流程
1. **收集輸入** → 將用戶選擇轉換為結構化資料
2. **驗證完整性** → 確保所有必要資訊已收集
3. **需求翻譯** → 將用戶語言轉換為技術規格
4. **生成輸出** → 產生多種格式的需求文件
5. **整合準備** → 準備好與 Claude API 串接的 prompt

## 整合方式

### 與 Claude Code CLI 整合
```bash
# 用戶完成需求收集後，系統自動執行
claude-code "$(cat output/claude_prompt.txt)"
```

### 與其他工具整合
- **設計工具**：輸出設計系統規格
- **專案管理**：生成專案計畫文件
- **開發工具**：提供技術架構建議

## 成功指標（重新定義）

### 需求收集品質
- 需求完整度 > 90%
- 用戶滿意度 > 4.5/5
- 需求變更率 < 20%

### 使用者體驗
- 完成率 > 85%
- 平均完成時間 < 15 分鐘
- 重複使用率 > 60%

### 技術整合效果
- 生成程式碼準確率 > 80%
- 需求理解準確率 > 85%
- 後續開發效率提升 > 40%

## 開發重點

### 優先開發功能
1. **基礎卡牌系統**：可選擇、有回饋的卡牌介面
2. **需求收集流程**：五階段的線性收集流程
3. **資料驗證**：確保收集到的資料完整有效
4. **輸出生成**：產生 JSON、Markdown 格式的需求文件

### 次要功能
1. **需求預覽**：讓用戶檢視收集到的需求
2. **編輯功能**：允許用戶修改已填寫的需求
3. **範本系統**：提供常見網站類型的需求範本
4. **進度保存**：支援中途保存和繼續填寫

## 技術實現重點

### 1. 輕量化設計
- 無需複雜的後端系統
- 純前端實現，方便部署
- 最小化外部依賴

### 2. 資料結構設計
- 標準化的 JSON 格式
- 易於解析和處理
- 支援版本控制

### 3. 用戶體驗優化
- 響應式設計
- 載入速度優化
- 直觀的操作流程

這個重新定義的架構是否更符合你的需求？它專注於「需求收集」而不是「教學」，是一個純粹的溝通媒介工具。