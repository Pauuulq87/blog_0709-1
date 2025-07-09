/**
 * DeploymentCollector.js - 部署確認收集器
 * 第五階段：專案規格確認和最終設定
 */

class DeploymentCollector {
    constructor() {
        this.collectedData = {
            projectSummary: null,
            priorityOrder: [],
            timelineExpectation: null,
            budgetRange: null,
            additionalRequirements: [],
            finalSpecifications: null
        };
        
        // 從本地存儲獲取前面階段的資料
        this.allStageData = this.loadAllStageData();
        
        this.timelineOptions = [
            {
                id: 'urgent',
                title: '緊急需求',
                description: '1-2 週內完成',
                icon: '⚡',
                category: 'timeline',
                value: 'urgent',
                weeks: 1.5
            },
            {
                id: 'standard',
                title: '標準時程',
                description: '3-4 週內完成',
                icon: '📅',
                category: 'timeline',
                value: 'standard',
                weeks: 3.5
            },
            {
                id: 'relaxed',
                title: '彈性時程',
                description: '1-2 個月完成',
                icon: '🌱',
                category: 'timeline',
                value: 'relaxed',
                weeks: 6
            },
            {
                id: 'no_rush',
                title: '不趕時間',
                description: '慢工出細活，品質優先',
                icon: '🎯',
                category: 'timeline',
                value: 'no_rush',
                weeks: 8
            }
        ];
        
        this.budgetRanges = [
            {
                id: 'minimal',
                title: '最低預算',
                description: '基本功能實現',
                icon: '💰',
                category: 'budget',
                value: 'minimal',
                range: 'NT$ 10,000 - 30,000'
            },
            {
                id: 'standard',
                title: '標準預算',
                description: '完整功能開發',
                icon: '💎',
                category: 'budget',
                value: 'standard',
                range: 'NT$ 30,000 - 80,000'
            },
            {
                id: 'premium',
                title: '高端預算',
                description: '精緻設計與進階功能',
                icon: '👑',
                category: 'budget',
                value: 'premium',
                range: 'NT$ 80,000 - 150,000'
            },
            {
                id: 'enterprise',
                title: '企業級',
                description: '全方位解決方案',
                icon: '🏢',
                category: 'budget',
                value: 'enterprise',
                range: 'NT$ 150,000+'
            }
        ];
        
        this.currentStep = 'summary_review';
        this.stepOrder = [
            'summary_review',
            'priority_confirmation',
            'timeline_budget',
            'final_requirements',
            'project_completion'
        ];
        this.currentStepIndex = 0;
    }

    // 載入所有階段的資料
    loadAllStageData() {
        const stages = ['project_vision', 'design_style', 'feature_requirements', 'tech_stack'];
        const allData = {};
        
        stages.forEach(stage => {
            const data = localStorage.getItem(`collector_data_${stage}`);
            if (data) {
                try {
                    allData[stage] = JSON.parse(data);
                } catch (e) {
                    console.warn(`載入 ${stage} 資料時發生錯誤:`, e);
                }
            }
        });
        
        return allData;
    }

    // 獲取當前步驟的卡牌資料
    getCurrentStepCards() {
        switch (this.currentStep) {
            case 'summary_review':
                return this.getSummaryCards();
            case 'priority_confirmation':
                return this.getPriorityCards();
            case 'timeline_budget':
                return this.getTimelineBudgetCards();
            case 'final_requirements':
                return this.getFinalRequirementInputs();
            case 'project_completion':
                return this.getCompletionCards();
            default:
                return [];
        }
    }

    // 獲取當前步驟的對話內容
    getCurrentStepDialogue() {
        const dialogues = {
            summary_review: {
                title: '專案需求總覽',
                text: '讓我們回顧一下到目前為止收集到的所有需求。請仔細檢查每個項目，確保符合你的期望。',
                mood: 'thinking',
                action: {
                    text: '確認無誤，繼續',
                    callback: () => this.validateCurrentStep()
                }
            },
            priority_confirmation: {
                title: '功能優先級排序',
                text: '請重新確認功能的優先順序。拖拉調整順序，最重要的功能放在最前面。',
                mood: 'focused',
                action: {
                    text: '優先級確認完成',
                    callback: () => this.validateCurrentStep()
                }
            },
            timeline_budget: {
                title: '時程與預算規劃',
                text: '最後，請告訴我你對專案完成時間和預算的期望。這將幫助我們制定最適合的開發方案。',
                mood: 'professional',
                action: {
                    text: '設定完成',
                    callback: () => this.validateCurrentStep()
                }
            },
            final_requirements: {
                title: '補充說明',
                text: '還有其他特殊需求或想法嗎？任何額外的細節都可以在這裡提到。',
                mood: 'helpful',
                action: {
                    text: '準備完成專案設定',
                    callback: () => this.validateCurrentStep()
                }
            },
            project_completion: {
                title: '專案規格確認',
                text: '太棒了！所有需求都已收集完成。讓我為你生成完整的專案規格文件和開發方案。',
                mood: 'excited',
                action: {
                    text: '生成專案文件',
                    callback: () => this.completeCollection()
                }
            }
        };
        
        return dialogues[this.currentStep];
    }

    // 獲取總覽卡牌
    getSummaryCards() {
        const cards = [];
        
        // 專案類型總覽
        if (this.allStageData.project_vision) {
            cards.push({
                id: 'project_overview',
                title: '專案概述',
                description: this.generateProjectOverview(),
                icon: '📋',
                category: 'summary',
                value: 'project_overview'
            });
        }
        
        // 設計風格總覽
        if (this.allStageData.design_style) {
            cards.push({
                id: 'design_overview',
                title: '設計風格',
                description: this.generateDesignOverview(),
                icon: '🎨',
                category: 'summary',
                value: 'design_overview'
            });
        }
        
        // 功能需求總覽
        if (this.allStageData.feature_requirements) {
            cards.push({
                id: 'feature_overview',
                title: '功能需求',
                description: this.generateFeatureOverview(),
                icon: '⚙️',
                category: 'summary',
                value: 'feature_overview'
            });
        }
        
        // 技術規格總覽
        if (this.allStageData.tech_stack) {
            cards.push({
                id: 'tech_overview',
                title: '技術規格',
                description: this.generateTechOverview(),
                icon: '💻',
                category: 'summary',
                value: 'tech_overview'
            });
        }
        
        return cards;
    }

    // 獲取優先級卡牌
    getPriorityCards() {
        if (!this.allStageData.feature_requirements) return [];
        
        const features = this.allStageData.feature_requirements.coreFeatures || [];
        return features.map((feature, index) => ({
            id: `priority_${index}`,
            title: feature.title || `功能 ${index + 1}`,
            description: feature.description || '功能描述',
            icon: feature.icon || '🔧',
            category: 'priority',
            value: feature.value || `feature_${index}`,
            priority: index + 1,
            draggable: true
        }));
    }

    // 獲取時程預算卡牌
    getTimelineBudgetCards() {
        return [
            ...this.timelineOptions.map(option => ({
                ...option,
                selectable: true
            })),
            ...this.budgetRanges.map(option => ({
                ...option,
                selectable: true
            }))
        ];
    }

    // 獲取最終需求輸入
    getFinalRequirementInputs() {
        return [
            {
                id: 'additional_features',
                title: '額外功能需求',
                description: '有沒有其他想要的功能？',
                icon: '✨',
                category: 'final_requirements',
                value: 'additional_features',
                inputType: 'textarea'
            },
            {
                id: 'special_considerations',
                title: '特殊考量',
                description: '任何特別需要注意的事項',
                icon: '⚠️',
                category: 'final_requirements',
                value: 'special_considerations',
                inputType: 'textarea'
            },
            {
                id: 'success_criteria',
                title: '成功標準',
                description: '什麼條件下算是成功的專案？',
                icon: '🎯',
                category: 'final_requirements',
                value: 'success_criteria',
                inputType: 'textarea'
            }
        ];
    }

    // 獲取完成卡牌
    getCompletionCards() {
        return [
            {
                id: 'spec_document',
                title: '需求規格書',
                description: '完整的專案需求與規格文件',
                icon: '📄',
                category: 'completion',
                value: 'spec_document',
                action: 'generate_spec'
            },
            {
                id: 'claude_prompt',
                title: 'Claude 提示詞',
                description: '針對此專案的 Claude 開發提示詞',
                icon: '🤖',
                category: 'completion',
                value: 'claude_prompt',
                action: 'generate_prompt'
            },
            {
                id: 'project_plan',
                title: '專案計畫書',
                description: '開發時程與里程碑規劃',
                icon: '📊',
                category: 'completion',
                value: 'project_plan',
                action: 'generate_plan'
            },
            {
                id: 'tech_specification',
                title: '技術規格文件',
                description: '技術架構與實作細節',
                icon: '⚙️',
                category: 'completion',
                value: 'tech_specification',
                action: 'generate_tech_spec'
            }
        ];
    }

    // 生成專案概述
    generateProjectOverview() {
        const data = this.allStageData.project_vision;
        if (!data) return '專案概述資料不完整';
        
        return `專案類型：${this.translateProjectType(data.projectType)}
目標受眾：${this.translateTargetAudience(data.targetAudience)}
核心目的：${this.translatePurpose(data.corePurpose)}`;
    }

    // 生成設計概述
    generateDesignOverview() {
        const data = this.allStageData.design_style;
        if (!data) return '設計風格資料不完整';
        
        return `設計風格：${this.translateDesignStyle(data.designStyle)}
色彩偏好：${this.translateColorPreference(data.colorPreference)}
版面配置：${this.translateLayoutPreference(data.layoutPreference)}`;
    }

    // 生成功能概述
    generateFeatureOverview() {
        const data = this.allStageData.feature_requirements;
        if (!data) return '功能需求資料不完整';
        
        const coreFeatures = data.coreFeatures || [];
        const featureList = coreFeatures.map(f => f.title || f.value).join('、');
        
        return `核心功能：${featureList}
內容類型：${this.translateContentTypes(data.contentTypes)}
互動功能：${this.translateInteractionFeatures(data.interactionFeatures)}`;
    }

    // 生成技術概述
    generateTechOverview() {
        const data = this.allStageData.tech_stack;
        if (!data) return '技術規格資料不完整';
        
        return `內容管理：${this.translateContentManagement(data.contentManagement)}
部署方式：${this.translateDeploymentMaintenance(data.deploymentMaintenance)}
效能預算：${this.translatePerformanceBudget(data.performanceBudget)}`;
    }

    // 翻譯方法群組
    translateProjectType(type) {
        const translations = {
            'personal_blog': '個人部落格',
            'portfolio': '作品集網站',
            'business': '企業官網',
            'ecommerce': '電商網站',
            'landing_page': '活動頁面',
            'community': '社群網站'
        };
        return translations[type] || type;
    }

    translateTargetAudience(audience) {
        const translations = {
            'general_public': '一般大眾',
            'professionals': '專業人士',
            'students': '學生族群',
            'creatives': '創作者',
            'business_owners': '企業主',
            'tech_enthusiasts': '技術愛好者'
        };
        return translations[audience] || audience;
    }

    translatePurpose(purpose) {
        const translations = {
            'share_knowledge': '知識分享',
            'showcase_work': '展示作品',
            'sell_products': '銷售產品',
            'build_community': '建立社群',
            'brand_promotion': '品牌宣傳',
            'lead_generation': '潛在客戶'
        };
        return translations[purpose] || purpose;
    }

    translateDesignStyle(style) {
        const translations = {
            'modern_minimalist': '現代簡約',
            'creative_artistic': '創意藝術',
            'professional_business': '商務專業',
            'warm_friendly': '溫暖友善',
            'technical_clean': '技術簡潔',
            'trendy_fashionable': '時尚潮流'
        };
        return translations[style] || style;
    }

    translateColorPreference(color) {
        const translations = {
            'neutral_tones': '中性色調',
            'warm_colors': '暖色系',
            'cool_colors': '冷色系',
            'monochrome': '單色系',
            'brand_colors': '品牌色彩',
            'vibrant_colors': '鮮豔色彩'
        };
        return translations[color] || color;
    }

    translateLayoutPreference(layout) {
        const translations = {
            'grid_layout': '網格佈局',
            'single_column': '單欄佈局',
            'sidebar_layout': '側邊欄佈局',
            'masonry_layout': '瀑布流佈局',
            'full_width': '全寬佈局',
            'card_layout': '卡片佈局'
        };
        return translations[layout] || layout;
    }

    translateContentTypes(types) {
        if (!types || !Array.isArray(types)) return '未指定';
        return types.map(type => {
            const translations = {
                'blog_posts': '部落格文章',
                'portfolio_items': '作品展示',
                'product_catalog': '產品目錄',
                'news_updates': '新聞更新',
                'documentation': '文件資料',
                'multimedia': '多媒體內容'
            };
            return translations[type] || type;
        }).join('、');
    }

    translateInteractionFeatures(features) {
        if (!features || !Array.isArray(features)) return '未指定';
        return features.map(feature => {
            const translations = {
                'comment_system': '評論系統',
                'social_sharing': '社群分享',
                'contact_form': '聯絡表單',
                'newsletter': '電子報',
                'user_accounts': '會員系統',
                'search_function': '搜尋功能'
            };
            return translations[feature] || feature;
        }).join('、');
    }

    translateContentManagement(management) {
        const translations = {
            'cms_backend': '後台管理系統',
            'code_based': '程式碼管理',
            'external_platform': '外部平台整合',
            'hybrid_approach': '混合管理方式'
        };
        return translations[management] || management;
    }

    translateDeploymentMaintenance(deployment) {
        const translations = {
            'one_click_deploy': '一鍵部署',
            'auto_update': '自動更新',
            'manual_control': '手動管理',
            'professional_ops': '專業維運'
        };
        return translations[deployment] || deployment;
    }

    translatePerformanceBudget(budget) {
        const translations = {
            'basic_performance': '基本效能',
            'optimized_performance': '優化效能',
            'high_performance': '高效能',
            'enterprise_performance': '企業級效能'
        };
        return translations[budget] || budget;
    }

    // 處理用戶選擇
    handleSelection(selection) {
        const { category, value, cardId } = selection;
        
        switch (category) {
            case 'summary':
                this.handleSummarySelection(value);
                break;
            case 'priority':
                this.handlePrioritySelection(value, cardId);
                break;
            case 'timeline':
                this.collectedData.timelineExpectation = value;
                break;
            case 'budget':
                this.collectedData.budgetRange = value;
                break;
            case 'final_requirements':
                this.handleFinalRequirements(value, cardId);
                break;
            case 'completion':
                this.handleCompletionAction(value);
                break;
        }
        
        this.dispatchDataUpdateEvent();
    }

    // 處理總覽選擇
    handleSummarySelection(value) {
        // 允許用戶修改之前的資料
        this.dispatchEditRequestEvent(value);
    }

    // 處理優先級選擇
    handlePrioritySelection(value, cardId) {
        // 實現拖拉排序功能
        this.updatePriorityOrder(value, cardId);
    }

    // 更新優先級順序
    updatePriorityOrder(value, cardId) {
        const existingIndex = this.collectedData.priorityOrder.findIndex(item => item.value === value);
        
        if (existingIndex > -1) {
            this.collectedData.priorityOrder.splice(existingIndex, 1);
        }
        
        this.collectedData.priorityOrder.push({
            value: value,
            cardId: cardId,
            timestamp: Date.now()
        });
        
        // 按時間戳排序
        this.collectedData.priorityOrder.sort((a, b) => a.timestamp - b.timestamp);
    }

    // 處理最終需求
    handleFinalRequirements(type, value) {
        if (value && value.trim()) {
            this.collectedData.additionalRequirements.push({
                type: type,
                content: value.trim(),
                timestamp: Date.now()
            });
        }
    }

    // 處理完成動作
    handleCompletionAction(action) {
        switch (action) {
            case 'generate_spec':
                this.generateSpecDocument();
                break;
            case 'generate_prompt':
                this.generateClaudePrompt();
                break;
            case 'generate_plan':
                this.generateProjectPlan();
                break;
            case 'generate_tech_spec':
                this.generateTechSpecification();
                break;
        }
    }

    // 生成需求規格書
    generateSpecDocument() {
        const specification = {
            projectInfo: {
                title: '專案需求規格書',
                generatedAt: new Date().toISOString(),
                version: '1.0'
            },
            projectVision: this.allStageData.project_vision,
            designStyle: this.allStageData.design_style,
            featureRequirements: this.allStageData.feature_requirements,
            techStack: this.allStageData.tech_stack,
            deployment: this.collectedData,
            summary: this.generateProjectSummary()
        };
        
        // 儲存到本地
        this.saveDocument('specification', specification);
        
        // 生成 Markdown 格式
        const markdownSpec = this.generateMarkdownSpec(specification);
        this.saveDocument('specification_md', markdownSpec);
        
        return specification;
    }

    // 生成 Claude 提示詞
    generateClaudePrompt() {
        const prompt = `# 專案開發提示詞

## 專案概述
${this.generateProjectOverview()}

## 設計需求
${this.generateDesignOverview()}

## 功能需求
${this.generateFeatureOverview()}

## 技術規格
${this.generateTechOverview()}

## 開發指引
請根據以上需求，開發一個完整的網站。注意以下重點：

1. **使用者體驗**：確保介面直觀易用
2. **響應式設計**：支援各種裝置
3. **效能優化**：載入速度快，體驗流暢
4. **SEO 友善**：搜尋引擎優化
5. **可維護性**：程式碼結構清晰

## 交付要求
- 完整的原始碼
- 部署說明文件
- 使用者操作手冊
- 維護指引

請開始開發，有任何問題隨時詢問。`;
        
        this.saveDocument('claude_prompt', prompt);
        return prompt;
    }

    // 生成專案計畫書
    generateProjectPlan() {
        const timeline = this.collectedData.timelineExpectation;
        const timelineData = this.timelineOptions.find(t => t.value === timeline);
        const totalWeeks = timelineData ? timelineData.weeks : 4;
        
        const plan = {
            projectInfo: {
                title: '專案開發計畫書',
                estimatedWeeks: totalWeeks,
                budget: this.collectedData.budgetRange
            },
            phases: [
                {
                    phase: 1,
                    title: '需求分析與設計',
                    duration: Math.ceil(totalWeeks * 0.2),
                    tasks: ['需求確認', '設計稿製作', '技術架構規劃']
                },
                {
                    phase: 2,
                    title: '核心功能開發',
                    duration: Math.ceil(totalWeeks * 0.4),
                    tasks: ['基礎架構建置', '核心功能實作', '介面開發']
                },
                {
                    phase: 3,
                    title: '整合與測試',
                    duration: Math.ceil(totalWeeks * 0.25),
                    tasks: ['功能整合', '測試與除錯', '效能優化']
                },
                {
                    phase: 4,
                    title: '部署與上線',
                    duration: Math.ceil(totalWeeks * 0.15),
                    tasks: ['部署準備', '上線測試', '文件交付']
                }
            ],
            deliverables: [
                '完整網站原始碼',
                '部署與維護文件',
                '使用者操作手冊',
                '專案交付報告'
            ]
        };
        
        this.saveDocument('project_plan', plan);
        return plan;
    }

    // 生成技術規格文件
    generateTechSpecification() {
        const techSpec = {
            projectInfo: {
                title: '技術規格文件',
                generatedAt: new Date().toISOString()
            },
            architecture: this.generateArchitectureSpec(),
            frontend: this.generateFrontendSpec(),
            backend: this.generateBackendSpec(),
            database: this.generateDatabaseSpec(),
            deployment: this.generateDeploymentSpec(),
            security: this.generateSecuritySpec(),
            performance: this.generatePerformanceSpec()
        };
        
        this.saveDocument('tech_specification', techSpec);
        return techSpec;
    }

    // 生成架構規格
    generateArchitectureSpec() {
        const techData = this.allStageData.tech_stack;
        if (!techData) return {};
        
        return {
            pattern: 'JAMstack',
            contentManagement: techData.contentManagement,
            deployment: techData.deploymentMaintenance,
            hosting: techData.hostingPreference || 'cloud'
        };
    }

    // 生成前端規格
    generateFrontendSpec() {
        const designData = this.allStageData.design_style;
        const featureData = this.allStageData.feature_requirements;
        
        return {
            framework: 'Modern JavaScript',
            styling: 'CSS-in-JS / Tailwind CSS',
            responsive: true,
            accessibility: 'WCAG 2.1 AA',
            designSystem: designData?.designStyle || 'modern_minimalist',
            components: featureData?.coreFeatures || []
        };
    }

    // 生成後端規格
    generateBackendSpec() {
        const techData = this.allStageData.tech_stack;
        const featureData = this.allStageData.feature_requirements;
        
        return {
            type: techData?.contentManagement === 'cms_backend' ? 'Traditional Backend' : 'Serverless',
            api: 'REST / GraphQL',
            authentication: featureData?.interactionFeatures?.includes('user_accounts') ? 'JWT' : 'None',
            storage: 'Cloud Storage'
        };
    }

    // 生成資料庫規格
    generateDatabaseSpec() {
        const featureData = this.allStageData.feature_requirements;
        const hasUserAccounts = featureData?.interactionFeatures?.includes('user_accounts');
        const hasComments = featureData?.interactionFeatures?.includes('comment_system');
        
        return {
            type: hasUserAccounts || hasComments ? 'SQL Database' : 'File-based',
            hosting: 'Cloud Database',
            backup: 'Automated Daily Backup',
            scaling: 'Horizontal Scaling Ready'
        };
    }

    // 生成部署規格
    generateDeploymentSpec() {
        const techData = this.allStageData.tech_stack;
        
        return {
            strategy: techData?.deploymentMaintenance || 'one_click_deploy',
            cicd: 'GitHub Actions',
            monitoring: 'Basic Monitoring',
            ssl: 'Let\'s Encrypt',
            cdn: 'Global CDN'
        };
    }

    // 生成安全規格
    generateSecuritySpec() {
        return {
            https: 'Enforced',
            headers: 'Security Headers',
            validation: 'Input Validation',
            sanitization: 'XSS Protection',
            cors: 'Configured CORS'
        };
    }

    // 生成效能規格
    generatePerformanceSpec() {
        const techData = this.allStageData.tech_stack;
        
        return {
            budget: techData?.performanceBudget || 'optimized_performance',
            loadTime: '< 3 seconds',
            caching: 'Browser & CDN Caching',
            optimization: 'Code Splitting & Lazy Loading',
            lighthouse: 'Score > 90'
        };
    }

    // 生成 Markdown 規格
    generateMarkdownSpec(spec) {
        return `# ${spec.projectInfo.title}

生成時間：${new Date(spec.projectInfo.generatedAt).toLocaleString('zh-TW')}

## 專案概述
${this.generateProjectOverview()}

## 設計需求
${this.generateDesignOverview()}

## 功能需求
${this.generateFeatureOverview()}

## 技術規格
${this.generateTechOverview()}

## 時程與預算
- 預期完成時間：${this.translateTimelineExpectation(spec.deployment.timelineExpectation)}
- 預算範圍：${this.translateBudgetRange(spec.deployment.budgetRange)}

## 額外需求
${this.generateAdditionalRequirements()}

## 專案摘要
${spec.summary}
`;
    }

    // 翻譯時程期望
    translateTimelineExpectation(timeline) {
        const option = this.timelineOptions.find(t => t.value === timeline);
        return option ? option.description : '未指定';
    }

    // 翻譯預算範圍
    translateBudgetRange(budget) {
        const option = this.budgetRanges.find(b => b.value === budget);
        return option ? option.range : '未指定';
    }

    // 生成額外需求
    generateAdditionalRequirements() {
        if (!this.collectedData.additionalRequirements.length) {
            return '無額外需求';
        }
        
        return this.collectedData.additionalRequirements
            .map(req => `- ${req.type}: ${req.content}`)
            .join('\n');
    }

    // 生成專案摘要
    generateProjectSummary() {
        return `這是一個${this.translateProjectType(this.allStageData.project_vision?.projectType)}專案，
目標受眾為${this.translateTargetAudience(this.allStageData.project_vision?.targetAudience)}，
主要目的是${this.translatePurpose(this.allStageData.project_vision?.corePurpose)}。

設計風格採用${this.translateDesignStyle(this.allStageData.design_style?.designStyle)}，
技術架構選擇${this.translateContentManagement(this.allStageData.tech_stack?.contentManagement)}，
預計在${this.translateTimelineExpectation(this.collectedData.timelineExpectation)}內完成。`;
    }

    // 儲存文件
    saveDocument(type, content) {
        const key = `project_document_${type}`;
        const data = {
            type: type,
            content: content,
            generatedAt: new Date().toISOString(),
            version: '1.0'
        };
        
        localStorage.setItem(key, JSON.stringify(data));
        
        // 觸發下載事件
        this.dispatchDocumentGeneratedEvent(type, content);
    }

    // 驗證當前步驟
    validateCurrentStep() {
        const isValid = this.isCurrentStepValid();
        
        if (isValid) {
            this.nextStep();
        } else {
            this.showValidationError();
        }
        
        return isValid;
    }

    // 檢查當前步驟是否有效
    isCurrentStepValid() {
        switch (this.currentStep) {
            case 'summary_review':
                return true; // 總覽階段總是有效
            case 'priority_confirmation':
                return this.collectedData.priorityOrder.length > 0;
            case 'timeline_budget':
                return this.collectedData.timelineExpectation && this.collectedData.budgetRange;
            case 'final_requirements':
                return true; // 最終需求階段可選
            case 'project_completion':
                return true; // 完成階段總是有效
            default:
                return false;
        }
    }

    // 顯示驗證錯誤
    showValidationError() {
        const errorMessages = {
            priority_confirmation: '請至少確認一個功能的優先級',
            timeline_budget: '請選擇時程期望和預算範圍'
        };
        
        this.dispatchValidationErrorEvent(errorMessages[this.currentStep]);
    }

    // 下一步
    nextStep() {
        if (this.currentStepIndex < this.stepOrder.length - 1) {
            this.currentStepIndex++;
            this.currentStep = this.stepOrder[this.currentStepIndex];
            this.dispatchStepChangeEvent();
        }
    }

    // 上一步
    previousStep() {
        if (this.currentStepIndex > 0) {
            this.currentStepIndex--;
            this.currentStep = this.stepOrder[this.currentStepIndex];
            this.dispatchStepChangeEvent();
        }
    }

    // 完成收集
    completeCollection() {
        if (this.isCollectionComplete()) {
            this.finalizeProject();
            this.dispatchCollectionCompleteEvent();
        }
    }

    // 最終化專案
    finalizeProject() {
        // 生成所有文件
        this.generateSpecDocument();
        this.generateClaudePrompt();
        this.generateProjectPlan();
        this.generateTechSpecification();
        
        // 儲存最終資料
        this.saveCollectedData();
    }

    // 儲存收集的資料
    saveCollectedData() {
        const finalData = {
            ...this.collectedData,
            allStageData: this.allStageData,
            timestamp: new Date().toISOString(),
            stage: 'deployment_complete'
        };
        
        localStorage.setItem('collector_data_deployment', JSON.stringify(finalData));
        localStorage.setItem('project_complete', 'true');
    }

    // 檢查收集是否完整
    isCollectionComplete() {
        return this.collectedData.timelineExpectation &&
               this.collectedData.budgetRange &&
               this.allStageData.project_vision &&
               this.allStageData.design_style &&
               this.allStageData.feature_requirements &&
               this.allStageData.tech_stack;
    }

    // 獲取收集到的資料
    getCollectedData() {
        return {
            ...this.collectedData,
            allStageData: this.allStageData,
            timestamp: new Date().toISOString(),
            stage: 'deployment'
        };
    }

    // 重置收集器
    reset() {
        this.collectedData = {
            projectSummary: null,
            priorityOrder: [],
            timelineExpectation: null,
            budgetRange: null,
            additionalRequirements: [],
            finalSpecifications: null
        };
        
        this.currentStep = 'summary_review';
        this.currentStepIndex = 0;
        
        // 重新載入資料
        this.allStageData = this.loadAllStageData();
    }

    // 獲取進度
    getProgress() {
        return {
            currentStep: this.currentStep,
            stepIndex: this.currentStepIndex,
            totalSteps: this.stepOrder.length,
            percentage: (this.currentStepIndex / this.stepOrder.length) * 100
        };
    }

    // 發送資料更新事件
    dispatchDataUpdateEvent() {
        const event = new CustomEvent('dataUpdate', {
            detail: {
                stage: 'deployment',
                data: this.getCollectedData(),
                progress: this.getProgress()
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送步驟變更事件
    dispatchStepChangeEvent() {
        const event = new CustomEvent('stepChange', {
            detail: {
                stage: 'deployment',
                currentStep: this.currentStep,
                progress: this.getProgress(),
                dialogue: this.getCurrentStepDialogue(),
                cards: this.getCurrentStepCards()
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送收集完成事件
    dispatchCollectionCompleteEvent() {
        const event = new CustomEvent('collectionComplete', {
            detail: {
                stage: 'deployment',
                data: this.getCollectedData(),
                projectComplete: true
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送驗證錯誤事件
    dispatchValidationErrorEvent(message) {
        const event = new CustomEvent('validationError', {
            detail: {
                stage: 'deployment',
                step: this.currentStep,
                message: message
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送編輯請求事件
    dispatchEditRequestEvent(section) {
        const event = new CustomEvent('editRequest', {
            detail: {
                stage: 'deployment',
                section: section,
                currentData: this.allStageData
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送文件生成事件
    dispatchDocumentGeneratedEvent(type, content) {
        const event = new CustomEvent('documentGenerated', {
            detail: {
                stage: 'deployment',
                documentType: type,
                content: content,
                timestamp: new Date().toISOString()
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }
}

// 導出到全域
window.DeploymentCollector = DeploymentCollector;