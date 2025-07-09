/**
 * outputGenerator.js - 輸出生成器
 * 用於生成各種格式的需求文件輸出
 */

class OutputGenerator {
    constructor() {
        this.version = '1.0.0';
        this.supportedFormats = ['json', 'markdown', 'txt', 'html'];
        this.templates = this.initializeTemplates();
    }

    // 初始化模板
    initializeTemplates() {
        return {
            projectBrief: {
                sections: ['概述', '專案願景', '設計風格', '功能需求', '技術架構', '時程預算'],
                format: 'markdown'
            },
            techSpecs: {
                sections: ['技術棧', '架構設計', '資料庫設計', 'API 設計', '部署方案'],
                format: 'markdown'
            },
            claudePrompt: {
                sections: ['專案背景', '技術要求', '功能清單', '開發指導', '品質標準'],
                format: 'txt'
            },
            developmentPlan: {
                sections: ['開發階段', '里程碑', '時程安排', '資源分配', '風險管理'],
                format: 'markdown'
            }
        };
    }

    // 主要生成方法
    generateOutput(parsedData, outputTypes = ['all']) {
        try {
            const results = {};
            
            if (outputTypes.includes('all') || outputTypes.includes('json')) {
                results.json = this.generateJSON(parsedData);
            }
            
            if (outputTypes.includes('all') || outputTypes.includes('project_brief')) {
                results.projectBrief = this.generateProjectBrief(parsedData);
            }
            
            if (outputTypes.includes('all') || outputTypes.includes('tech_specs')) {
                results.techSpecs = this.generateTechSpecs(parsedData);
            }
            
            if (outputTypes.includes('all') || outputTypes.includes('claude_prompt')) {
                results.claudePrompt = this.generateClaudePrompt(parsedData);
            }
            
            if (outputTypes.includes('all') || outputTypes.includes('development_plan')) {
                results.developmentPlan = this.generateDevelopmentPlan(parsedData);
            }

            return {
                success: true,
                timestamp: new Date().toISOString(),
                version: this.version,
                outputs: results
            };
            
        } catch (error) {
            console.error('輸出生成錯誤:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    // 生成 JSON 格式的需求文件
    generateJSON(parsedData) {
        const output = {
            metadata: {
                title: '專案需求文件',
                version: this.version,
                generatedAt: new Date().toISOString(),
                parsingVersion: parsedData.metadata?.parsingVersion || 'unknown'
            },
            projectInfo: {
                name: this.extractProjectName(parsedData),
                type: parsedData.projectVision?.typeName || '未定義',
                description: this.generateProjectDescription(parsedData),
                targetAudience: parsedData.projectVision?.audienceName || '未定義',
                purpose: parsedData.projectVision?.purposeName || '未定義'
            },
            requirements: {
                vision: parsedData.projectVision,
                design: parsedData.designStyle,
                features: parsedData.features,
                technology: parsedData.techStack,
                deployment: parsedData.deployment
            },
            estimates: {
                complexity: parsedData.features?.totalComplexity || 'medium',
                timeline: parsedData.features?.estimatedTime || {},
                budget: parsedData.deployment?.budgetSpecs || {},
                phases: parsedData.features?.developmentPhases || []
            },
            recommendations: {
                techStack: parsedData.techStack?.techRecommendations || {},
                hosting: parsedData.techStack?.hostingRecommendation || [],
                cms: parsedData.techStack?.cmsRecommendation || []
            }
        };

        return {
            filename: 'user_requirements.json',
            content: JSON.stringify(output, null, 2),
            format: 'json',
            downloadable: true
        };
    }

    // 生成專案摘要 Markdown
    generateProjectBrief(parsedData) {
        const content = `# 專案摘要文件

## 專案概述
**專案名稱：** ${this.extractProjectName(parsedData)}
**專案類型：** ${parsedData.projectVision?.typeName || '未定義'}
**目標受眾：** ${parsedData.projectVision?.audienceName || '未定義'}
**核心目的：** ${parsedData.projectVision?.purposeName || '未定義'}

${this.generateProjectDescription(parsedData)}

## 專案願景
${this.formatProjectVision(parsedData.projectVision)}

## 設計風格
${this.formatDesignStyle(parsedData.designStyle)}

## 功能需求
${this.formatFeatures(parsedData.features)}

## 技術架構
${this.formatTechStack(parsedData.techStack)}

## 時程與預算
${this.formatDeployment(parsedData.deployment)}

## 開發建議
${this.formatDevelopmentPhases(parsedData.features?.developmentPhases)}

---
*文件生成時間：${new Date().toLocaleString('zh-TW')}*
*生成版本：${this.version}*`;

        return {
            filename: 'project_brief.md',
            content: content,
            format: 'markdown',
            downloadable: true
        };
    }

    // 生成技術規格文件
    generateTechSpecs(parsedData) {
        const techStack = parsedData.techStack;
        const features = parsedData.features;
        
        const content = `# 技術規格文件

## 技術棧選擇

### 前端技術
${this.formatTechRecommendations(techStack?.techRecommendations?.frontend)}

### 後端技術
${this.formatTechRecommendations(techStack?.techRecommendations?.backend)}

### 資料庫
${this.formatTechRecommendations(techStack?.techRecommendations?.database)}

### 部署平台
${this.formatTechRecommendations(techStack?.techRecommendations?.hosting)}

## 架構設計

### 系統架構
- **複雜度等級：** ${features?.totalComplexity || 'medium'}
- **開發模式：** ${this.getArchitecturePattern(parsedData)}
- **資料流設計：** ${this.getDataFlowPattern(parsedData)}

### 效能規格
${this.formatPerformanceSpecs(techStack?.performanceSpecs)}

### 響應式設計
${this.formatResponsiveStrategy(parsedData.designStyle?.responsiveStrategy)}

## 資料庫設計
${this.generateDatabaseDesign(parsedData)}

## API 設計
${this.generateAPIDesign(parsedData)}

## 部署方案
${this.generateDeploymentStrategy(parsedData)}

## 安全考量
${this.generateSecuritySpecs(parsedData)}

---
*文件生成時間：${new Date().toLocaleString('zh-TW')}*
*版本：${this.version}*`;

        return {
            filename: 'tech_specifications.md',
            content: content,
            format: 'markdown',
            downloadable: true
        };
    }

    // 生成 Claude 開發提示詞
    generateClaudePrompt(parsedData) {
        const content = `# Claude 開發指令

## 專案背景
你是一位資深的 ${this.getMainTechnology(parsedData)} 開發者，需要開發一個${parsedData.projectVision?.typeName || '網站'}專案。

專案基本資訊：
- 專案類型：${parsedData.projectVision?.typeName || '未定義'}
- 目標受眾：${parsedData.projectVision?.audienceName || '未定義'}
- 核心目的：${parsedData.projectVision?.purposeName || '未定義'}
- 複雜度等級：${parsedData.features?.totalComplexity || 'medium'}

## 技術要求

### 必須使用的技術棧
${this.formatTechStackForPrompt(parsedData.techStack)}

### 設計規範
- 色彩方案：${parsedData.designStyle?.colorScheme || '未定義'}
- 佈局風格：${parsedData.designStyle?.layoutStyle || '未定義'}
- 視覺風格：${parsedData.designStyle?.visualStyle || '未定義'}
- 動畫層級：${parsedData.designStyle?.animationLevel || '未定義'}
- 響應式優先：${parsedData.designStyle?.mobilePriority || '未定義'}

### 效能要求
${this.formatPerformanceRequirements(parsedData.techStack?.performanceSpecs)}

## 功能清單

### 核心功能
${this.formatFeaturesForPrompt(parsedData.features)}

### 開發階段
${this.formatPhasesForPrompt(parsedData.features?.developmentPhases)}

## 開發指導

### 程式碼品質標準
1. 使用 ES6+ 語法
2. 遵循 ${this.getCodeStyle(parsedData)} 程式碼風格
3. 包含完整的錯誤處理
4. 加入適當的註解和文件
5. 確保程式碼可讀性和可維護性

### 檔案結構建議
${this.generateFileStructure(parsedData)}

### 開發流程
1. 建立基礎專案結構
2. 實現核心功能
3. 加入互動功能
4. 優化效能和使用者體驗
5. 測試和除錯
6. 部署準備

## 品質標準

### 測試要求
- 單元測試覆蓋率：80%+
- 整合測試：核心功能
- 效能測試：符合規格要求
- 瀏覽器相容性：${this.getBrowserSupport(parsedData)}

### 完成條件
- 所有功能正常運作
- 響應式設計完整
- 效能符合需求
- 程式碼品質良好
- 文件完整

---
生成時間：${new Date().toLocaleString('zh-TW')}
版本：${this.version}`;

        return {
            filename: 'claude_prompt.txt',
            content: content,
            format: 'txt',
            downloadable: true
        };
    }

    // 生成開發計劃
    generateDevelopmentPlan(parsedData) {
        const phases = parsedData.features?.developmentPhases || [];
        const timeline = parsedData.deployment?.timelineSpecs || {};
        const budget = parsedData.deployment?.budgetSpecs || {};
        
        const content = `# 開發計劃

## 專案概述
**專案名稱：** ${this.extractProjectName(parsedData)}
**預估時程：** ${timeline.duration || '未定義'}
**預算範圍：** ${budget.range || '未定義'}
**複雜度：** ${parsedData.features?.totalComplexity || 'medium'}

## 開發階段

${phases.map((phase, index) => `
### 階段 ${phase.phase}：${phase.name}
- **優先級：** ${phase.priority}
- **預估時間：** ${phase.estimatedTime}
- **主要功能：**
${phase.features.map(feature => `  - ${feature}`).join('\n')}
`).join('\n')}

## 里程碑設定

${this.generateMilestones(parsedData)}

## 資源分配

### 技術資源
- **主要開發者：** 1-2 人
- **設計師：** ${this.needsDesigner(parsedData) ? '1 人' : '選配'}
- **專案經理：** ${this.needsProjectManager(parsedData) ? '1 人' : '選配'}

### 工具與服務
${this.formatResourceRequirements(parsedData)}

## 風險管理

### 技術風險
${this.generateTechnicalRisks(parsedData)}

### 時程風險
${this.generateTimelineRisks(parsedData)}

### 預算風險
${this.generateBudgetRisks(parsedData)}

## 品質保證

### 測試策略
- **單元測試：** 核心功能
- **整合測試：** 系統整合
- **使用者測試：** 界面互動
- **效能測試：** 載入速度

### 程式碼審查
- **同儕審查：** 每個功能
- **架構審查：** 每個階段
- **安全審查：** 部署前

## 交付標準

### 階段性交付
${phases.map(phase => `- 階段 ${phase.phase}：${phase.name} 完成`).join('\n')}

### 最終交付
- 完整功能網站
- 程式碼文件
- 部署指南
- 使用手冊

---
*計劃生成時間：${new Date().toLocaleString('zh-TW')}*
*版本：${this.version}*`;

        return {
            filename: 'development_plan.md',
            content: content,
            format: 'markdown',
            downloadable: true
        };
    }

    // 工具方法：提取專案名稱
    extractProjectName(parsedData) {
        const type = parsedData.projectVision?.typeName || '網站';
        const purpose = parsedData.projectVision?.purposeName || '專案';
        return `${type} - ${purpose}`;
    }

    // 工具方法：生成專案描述
    generateProjectDescription(parsedData) {
        const vision = parsedData.projectVision;
        if (!vision) return '專案描述待完善';
        
        return `此專案旨在為${vision.audienceName}建立一個${vision.typeName}，主要目的是${vision.purposeName}。專案將採用${parsedData.designStyle?.visualStyle || '現代化'}設計風格，並整合${parsedData.features?.totalComplexity || 'medium'}複雜度的功能需求。`;
    }

    // 工具方法：格式化專案願景
    formatProjectVision(vision) {
        if (!vision) return '專案願景資料不完整';
        
        return `
### 專案類型
${vision.typeName} (${vision.type})

### 目標受眾
${vision.audienceName} (${vision.targetAudience})

### 核心目的
${vision.purposeName} (${vision.corePurpose})

### 參考網站
${vision.referenceSites?.length > 0 ? vision.referenceSites.map(site => `- ${site}`).join('\n') : '無指定參考網站'}

### 靈感關鍵字
${vision.inspirationKeywords?.length > 0 ? vision.inspirationKeywords.join(', ') : '無特定關鍵字'}`;
    }

    // 工具方法：格式化設計風格
    formatDesignStyle(style) {
        if (!style) return '設計風格資料不完整';
        
        return `
### 色彩方案
${style.colorScheme}
調色盤：${style.colorPalette?.join(', ') || '系統預設'}

### 佈局風格
${style.layoutStyle}
規格：最大寬度 ${style.layoutSpecs?.maxWidth || '1200px'}，${style.layoutSpecs?.columns || 1} 欄位

### 視覺風格
${style.visualStyle}
字體：${style.styleGuide?.typography?.join(', ') || '系統預設'}

### 動畫效果
${style.animationLevel}
轉場：${style.animationSpecs?.transitions || '基本'}
變換：${style.animationSpecs?.transforms || '基本'}

### 響應式設計
${style.mobilePriority}
策略：${style.responsiveStrategy?.approach || '自適應設計'}
斷點：${style.responsiveStrategy?.breakpoints?.join(', ') || '標準斷點'}`;
    }

    // 工具方法：格式化功能需求
    formatFeatures(features) {
        if (!features) return '功能需求資料不完整';
        
        return `
### 內容類型
${features.contentTypes?.length > 0 ? features.contentTypes.map(type => `- ${type}`).join('\n') : '無指定內容類型'}

### 互動功能
${features.interactionFeatures?.length > 0 ? features.interactionFeatures.map(feature => `- ${feature}`).join('\n') : '無互動功能'}

### 系統整合
${features.integrations?.length > 0 ? features.integrations.map(integration => `- ${integration}`).join('\n') : '無系統整合'}

### 管理功能
${features.adminFeatures?.length > 0 ? features.adminFeatures.map(admin => `- ${admin}`).join('\n') : '無管理功能'}

### 複雜度評估
**總體複雜度：** ${features.totalComplexity}
**預估時間：** ${features.estimatedTime?.realistic || '未評估'} ${features.estimatedTime?.unit || ''}`;
    }

    // 工具方法：格式化技術棧
    formatTechStack(techStack) {
        if (!techStack) return '技術棧資料不完整';
        
        return `
### 內容管理
${techStack.contentManagement}
建議：${techStack.cmsRecommendation?.join(', ') || '無建議'}

### 部署偏好
${techStack.deploymentPreference}
建議：${techStack.hostingRecommendation?.join(', ') || '無建議'}

### 效能需求
${techStack.performanceNeeds}
規格：載入時間 ${techStack.performanceSpecs?.loadTime || '< 3s'}，優化等級 ${techStack.performanceSpecs?.optimization || '標準'}

### 預算範圍
${techStack.budgetRange}`;
    }

    // 工具方法：格式化部署資訊
    formatDeployment(deployment) {
        if (!deployment) return '部署資訊不完整';
        
        return `
### 時程安排
${deployment.timeline}
**持續時間：** ${deployment.timelineSpecs?.duration || '未定義'}
**優先級：** ${deployment.timelineSpecs?.priority || '平衡'}

### 預算規劃
${deployment.budget}
**範圍：** ${deployment.budgetSpecs?.range || '未定義'}
**功能範圍：** ${deployment.budgetSpecs?.features || '標準'}

### 附加需求
${deployment.additionalRequirements?.length > 0 ? deployment.additionalRequirements.map(req => `- ${req}`).join('\n') : '無附加需求'}`;
    }

    // 工具方法：格式化開發階段
    formatDevelopmentPhases(phases) {
        if (!phases || phases.length === 0) return '開發階段資料不完整';
        
        return phases.map(phase => `
### 階段 ${phase.phase}：${phase.name}
- **優先級：** ${phase.priority}
- **預估時間：** ${phase.estimatedTime}
- **主要功能：** ${phase.features.join(', ')}`).join('\n');
    }

    // 工具方法：格式化技術建議
    formatTechRecommendations(recommendations) {
        if (!recommendations || recommendations.length === 0) return '無特定建議';
        return recommendations.map(tech => `- ${tech}`).join('\n');
    }

    // 工具方法：獲取架構模式
    getArchitecturePattern(parsedData) {
        const complexity = parsedData.features?.totalComplexity;
        const patterns = {
            'simple': 'Static Site',
            'medium': 'MVC Architecture',
            'complex': 'Microservices',
            'very_complex': 'Distributed Architecture'
        };
        return patterns[complexity] || 'Standard Architecture';
    }

    // 工具方法：獲取資料流模式
    getDataFlowPattern(parsedData) {
        const hasDatabase = parsedData.features?.integrations?.some(i => i.includes('database'));
        const hasAPI = parsedData.features?.integrations?.some(i => i.includes('api'));
        
        if (hasDatabase && hasAPI) return 'Full Stack Data Flow';
        if (hasDatabase) return 'Database-driven';
        if (hasAPI) return 'API-driven';
        return 'Static Content';
    }

    // 工具方法：格式化效能規格
    formatPerformanceSpecs(specs) {
        if (!specs) return '效能規格未定義';
        
        return `
- **載入時間：** ${specs.loadTime}
- **優化等級：** ${specs.optimization}
- **快取策略：** ${specs.caching}`;
    }

    // 工具方法：格式化響應式策略
    formatResponsiveStrategy(strategy) {
        if (!strategy) return '響應式策略未定義';
        
        return `
- **設計方法：** ${strategy.approach}
- **斷點設定：** ${strategy.breakpoints?.join(', ')}
- **優先級：** ${strategy.priority}`;
    }

    // 工具方法：生成資料庫設計
    generateDatabaseDesign(parsedData) {
        const features = parsedData.features;
        const needsDatabase = features?.integrations?.some(i => i.includes('database')) || 
                            features?.adminFeatures?.length > 0;
        
        if (!needsDatabase) return '此專案無需資料庫設計';
        
        return `
### 資料模型
- **用戶系統：** ${features.adminFeatures?.includes('user_management') ? '需要' : '不需要'}
- **內容管理：** ${features.contentTypes?.length > 0 ? '需要' : '不需要'}
- **互動數據：** ${features.interactionFeatures?.length > 0 ? '需要' : '不需要'}

### 建議資料庫
${parsedData.techStack?.techRecommendations?.database?.join(', ') || 'MySQL, PostgreSQL'}`;
    }

    // 工具方法：生成 API 設計
    generateAPIDesign(parsedData) {
        const features = parsedData.features;
        const needsAPI = features?.integrations?.some(i => i.includes('api')) || 
                        features?.interactionFeatures?.length > 0;
        
        if (!needsAPI) return '此專案無需 API 設計';
        
        return `
### API 架構
- **RESTful API：** ${features.interactionFeatures?.length > 0 ? '需要' : '不需要'}
- **GraphQL：** ${parsedData.features?.totalComplexity === 'very_complex' ? '考慮' : '不需要'}
- **第三方整合：** ${features.integrations?.length > 0 ? '需要' : '不需要'}`;
    }

    // 工具方法：生成部署策略
    generateDeploymentStrategy(parsedData) {
        const hosting = parsedData.techStack?.hostingRecommendation || [];
        const performance = parsedData.techStack?.performanceNeeds;
        
        return `
### 部署平台
${hosting.map(host => `- ${host}`).join('\n')}

### 部署方式
- **自動部署：** ${parsedData.techStack?.deploymentPreference === 'auto_update' ? '是' : '否'}
- **CI/CD：** ${performance === 'blazing_fast' ? '需要' : '選配'}
- **CDN：** ${performance === 'blazing_fast' ? '需要' : '選配'}`;
    }

    // 工具方法：生成安全規格
    generateSecuritySpecs(parsedData) {
        const features = parsedData.features;
        const hasUserSystem = features?.adminFeatures?.some(f => f.includes('user'));
        const hasPayment = features?.interactionFeatures?.some(f => f.includes('payment'));
        
        return `
### 安全需求
- **HTTPS：** 必須
- **用戶認證：** ${hasUserSystem ? '需要' : '不需要'}
- **資料加密：** ${hasPayment ? '需要' : '標準'}
- **XSS 防護：** ${features?.interactionFeatures?.length > 0 ? '需要' : '基本'}`;
    }

    // 工具方法：獲取主要技術
    getMainTechnology(parsedData) {
        const cms = parsedData.techStack?.contentManagement;
        const complexity = parsedData.features?.totalComplexity;
        
        if (cms === 'code_management') return 'Frontend';
        if (complexity === 'very_complex') return 'Full Stack';
        return 'Web';
    }

    // 工具方法：格式化技術棧（為提示詞）
    formatTechStackForPrompt(techStack) {
        if (!techStack) return '技術棧未定義';
        
        const frontend = techStack.techRecommendations?.frontend || ['HTML', 'CSS', 'JavaScript'];
        const backend = techStack.techRecommendations?.backend || [];
        const database = techStack.techRecommendations?.database || [];
        
        return `
前端：${frontend.join(', ')}
${backend.length > 0 ? `後端：${backend.join(', ')}` : ''}
${database.length > 0 ? `資料庫：${database.join(', ')}` : ''}`;
    }

    // 工具方法：格式化效能要求
    formatPerformanceRequirements(specs) {
        if (!specs) return '效能要求標準';
        
        return `載入時間需控制在 ${specs.loadTime}，採用 ${specs.optimization} 優化策略，${specs.caching} 快取設定。`;
    }

    // 工具方法：格式化功能（為提示詞）
    formatFeaturesForPrompt(features) {
        if (!features) return '功能需求待定義';
        
        const content = features.contentTypes?.map(type => `- ${type}`).join('\n') || '';
        const interaction = features.interactionFeatures?.map(feature => `- ${feature}`).join('\n') || '';
        const integration = features.integrations?.map(int => `- ${int}`).join('\n') || '';
        
        return `
內容功能：
${content}

互動功能：
${interaction}

整合功能：
${integration}`;
    }

    // 工具方法：格式化階段（為提示詞）
    formatPhasesForPrompt(phases) {
        if (!phases || phases.length === 0) return '開發階段待規劃';
        
        return phases.map(phase => `
階段 ${phase.phase}（${phase.estimatedTime}）：
${phase.features.map(feature => `- ${feature}`).join('\n')}`).join('\n');
    }

    // 工具方法：獲取程式碼風格
    getCodeStyle(parsedData) {
        const complexity = parsedData.features?.totalComplexity;
        const styles = {
            'simple': 'Clean Code',
            'medium': 'Airbnb',
            'complex': 'Google',
            'very_complex': 'Enterprise'
        };
        return styles[complexity] || 'Standard';
    }

    // 工具方法：生成檔案結構
    generateFileStructure(parsedData) {
        const complexity = parsedData.features?.totalComplexity;
        const hasBackend = parsedData.techStack?.techRecommendations?.backend?.length > 0;
        
        if (complexity === 'simple') {
            return `
\`\`\`
project/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── images/
\`\`\``;
        } else if (hasBackend) {
            return `
\`\`\`
project/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── config/
└── database/
    └── migrations/
\`\`\``;
        } else {
            return `
\`\`\`
project/
├── src/
│   ├── components/
│   ├── styles/
│   ├── utils/
│   └── pages/
├── public/
│   └── assets/
└── package.json
\`\`\``;
        }
    }

    // 工具方法：獲取瀏覽器支援
    getBrowserSupport(parsedData) {
        const performance = parsedData.techStack?.performanceNeeds;
        if (performance === 'blazing_fast') return 'Modern browsers only';
        return 'IE11+, Chrome, Firefox, Safari';
    }

    // 工具方法：生成里程碑
    generateMilestones(parsedData) {
        const phases = parsedData.features?.developmentPhases || [];
        if (phases.length === 0) return '里程碑待規劃';
        
        return phases.map((phase, index) => `
### 里程碑 ${index + 1}：${phase.name}完成
- **時間點：** 第 ${phase.phase * 2} 週
- **交付物：** ${phase.features.join('、')}功能
- **驗收標準：** 功能完整且測試通過`).join('\n');
    }

    // 工具方法：判斷是否需要設計師
    needsDesigner(parsedData) {
        const style = parsedData.designStyle?.visualStyle;
        return style === 'creative' || parsedData.features?.totalComplexity === 'very_complex';
    }

    // 工具方法：判斷是否需要專案經理
    needsProjectManager(parsedData) {
        const phases = parsedData.features?.developmentPhases || [];
        return phases.length > 2 || parsedData.features?.totalComplexity === 'very_complex';
    }

    // 工具方法：格式化資源需求
    formatResourceRequirements(parsedData) {
        const hosting = parsedData.techStack?.hostingRecommendation || [];
        const cms = parsedData.techStack?.cmsRecommendation || [];
        
        return `
### 開發工具
- **程式碼編輯器：** VS Code, WebStorm
- **版本控制：** Git, GitHub
- **測試工具：** Jest, Cypress

### 服務平台
- **主機服務：** ${hosting.join(', ')}
- **CMS 平台：** ${cms.join(', ')}
- **監控服務：** Google Analytics, Sentry`;
    }

    // 工具方法：生成技術風險
    generateTechnicalRisks(parsedData) {
        const complexity = parsedData.features?.totalComplexity;
        const risks = {
            'simple': ['技術實作相對簡單，風險較低'],
            'medium': ['整合複雜度中等，需注意相容性'],
            'complex': ['技術挑戰較高，需要經驗豐富的開發者'],
            'very_complex': ['技術風險高，建議分階段開發並充分測試']
        };
        
        return risks[complexity] || risks['medium'];
    }

    // 工具方法：生成時程風險
    generateTimelineRisks(parsedData) {
        const timeline = parsedData.deployment?.timeline;
        const complexity = parsedData.features?.totalComplexity;
        
        if (timeline === 'urgent' && complexity === 'very_complex') {
            return ['時程過於緊迫，建議調整功能範圍或延長時程'];
        } else if (timeline === 'urgent') {
            return ['時程緊迫，需要專注核心功能'];
        } else if (complexity === 'very_complex') {
            return ['複雜專案需要充分的開發和測試時間'];
        }
        
        return ['時程安排合理，風險可控'];
    }

    // 工具方法：生成預算風險
    generateBudgetRisks(parsedData) {
        const budget = parsedData.deployment?.budget;
        const complexity = parsedData.features?.totalComplexity;
        
        if (budget === 'minimal' && complexity === 'very_complex') {
            return ['預算與功能需求不匹配，建議調整功能範圍'];
        } else if (budget === 'minimal') {
            return ['預算有限，需要精簡功能需求'];
        } else if (complexity === 'very_complex' && budget !== 'enterprise') {
            return ['複雜專案可能需要更多預算支援'];
        }
        
        return ['預算規劃合理，風險較低'];
    }

    // 下載功能
    downloadFile(filename, content, format = 'text/plain') {
        const blob = new Blob([content], { type: format });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 批次下載
    downloadAll(outputs) {
        if (!outputs || typeof outputs !== 'object') return;
        
        Object.values(outputs).forEach(output => {
            if (output.downloadable && output.filename && output.content) {
                setTimeout(() => {
                    this.downloadFile(output.filename, output.content, this.getContentType(output.format));
                }, 100);
            }
        });
    }

    // 獲取 Content Type
    getContentType(format) {
        const types = {
            'json': 'application/json',
            'markdown': 'text/markdown',
            'txt': 'text/plain',
            'html': 'text/html'
        };
        return types[format] || 'text/plain';
    }

    // 預覽輸出
    previewOutput(output) {
        if (!output || !output.content) return null;
        
        const previewWindow = window.open('', '_blank');
        const content = output.format === 'json' ? 
            `<pre>${JSON.stringify(JSON.parse(output.content), null, 2)}</pre>` : 
            `<pre>${output.content}</pre>`;
        
        previewWindow.document.write(`
            <html>
                <head>
                    <title>${output.filename}</title>
                    <style>
                        body { font-family: 'Courier New', monospace; margin: 20px; }
                        pre { white-space: pre-wrap; word-wrap: break-word; }
                    </style>
                </head>
                <body>${content}</body>
            </html>
        `);
        previewWindow.document.close();
    }
}

// 導出到全域
window.OutputGenerator = OutputGenerator;