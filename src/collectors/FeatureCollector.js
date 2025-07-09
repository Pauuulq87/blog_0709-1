/**
 * FeatureCollector.js - 功能需求收集器
 * 第三階段：收集具體功能需求
 */

class FeatureCollector {
    constructor() {
        this.collectedData = {
            contentTypes: [],
            interactionFeatures: [],
            integrations: [],
            adminFeatures: [],
            priorityLevels: {}
        };
        
        this.contentTypes = [
            {
                id: 'blog_posts',
                title: '部落格文章',
                description: '文字內容、分類、標籤系統',
                icon: '📝',
                category: 'content_types',
                value: 'blog_posts'
            },
            {
                id: 'image_gallery',
                title: '圖片相簿',
                description: '圖片展示、縮圖、燈箱效果',
                icon: '🖼️',
                category: 'content_types',
                value: 'image_gallery'
            },
            {
                id: 'video_content',
                title: '影片內容',
                description: '影片播放、縮圖、字幕支援',
                icon: '🎬',
                category: 'content_types',
                value: 'video_content'
            },
            {
                id: 'portfolio_items',
                title: '作品集項目',
                description: '專案展示、案例研究、技能標籤',
                icon: '💼',
                category: 'content_types',
                value: 'portfolio_items'
            },
            {
                id: 'product_catalog',
                title: '產品目錄',
                description: '產品展示、規格、價格資訊',
                icon: '🛍️',
                category: 'content_types',
                value: 'product_catalog'
            },
            {
                id: 'news_updates',
                title: '最新消息',
                description: '新聞發布、公告、活動資訊',
                icon: '📰',
                category: 'content_types',
                value: 'news_updates'
            },
            {
                id: 'documentation',
                title: '文件資料',
                description: '技術文件、使用手冊、FAQ',
                icon: '📚',
                category: 'content_types',
                value: 'documentation'
            },
            {
                id: 'testimonials',
                title: '客戶見證',
                description: '評價、推薦、成功案例',
                icon: '💬',
                category: 'content_types',
                value: 'testimonials'
            }
        ];
        
        this.interactionFeatures = [
            {
                id: 'comments_system',
                title: '留言評論',
                description: '文章留言、回覆、審核機制',
                icon: '💬',
                category: 'interaction_features',
                value: 'comments_system'
            },
            {
                id: 'social_sharing',
                title: '社群分享',
                description: 'Facebook、Twitter、LINE 分享',
                icon: '📤',
                category: 'interaction_features',
                value: 'social_sharing'
            },
            {
                id: 'subscription',
                title: '訂閱功能',
                description: '電子報、新文章通知',
                icon: '📧',
                category: 'interaction_features',
                value: 'subscription'
            },
            {
                id: 'search_function',
                title: '搜尋功能',
                description: '全站搜尋、關鍵字、篩選',
                icon: '🔍',
                category: 'interaction_features',
                value: 'search_function'
            },
            {
                id: 'filtering_sorting',
                title: '篩選排序',
                description: '分類篩選、日期排序、標籤',
                icon: '🔧',
                category: 'interaction_features',
                value: 'filtering_sorting'
            },
            {
                id: 'like_bookmark',
                title: '按讚收藏',
                description: '喜歡、收藏、個人清單',
                icon: '❤️',
                category: 'interaction_features',
                value: 'like_bookmark'
            },
            {
                id: 'user_profiles',
                title: '用戶檔案',
                description: '個人資料、頭像、偏好設定',
                icon: '👤',
                category: 'interaction_features',
                value: 'user_profiles'
            },
            {
                id: 'rating_reviews',
                title: '評分評論',
                description: '星級評分、詳細評論',
                icon: '⭐',
                category: 'interaction_features',
                value: 'rating_reviews'
            },
            {
                id: 'contact_form',
                title: '聯絡表單',
                description: '詢問表單、預約系統',
                icon: '📞',
                category: 'interaction_features',
                value: 'contact_form'
            }
        ];
        
        this.integrations = [
            {
                id: 'google_analytics',
                title: 'Google Analytics',
                description: '網站流量分析、使用者行為',
                icon: '📊',
                category: 'integrations',
                value: 'google_analytics'
            },
            {
                id: 'facebook_pixel',
                title: 'Facebook Pixel',
                description: '廣告追蹤、再行銷',
                icon: '📘',
                category: 'integrations',
                value: 'facebook_pixel'
            },
            {
                id: 'social_login',
                title: '社群登入',
                description: 'Google、Facebook、LINE 登入',
                icon: '🔐',
                category: 'integrations',
                value: 'social_login'
            },
            {
                id: 'payment_system',
                title: '付款系統',
                description: '信用卡、PayPal、第三方支付',
                icon: '💳',
                category: 'integrations',
                value: 'payment_system'
            },
            {
                id: 'email_service',
                title: '郵件服務',
                description: 'MailChimp、SendGrid',
                icon: '📮',
                category: 'integrations',
                value: 'email_service'
            },
            {
                id: 'cloud_storage',
                title: '雲端儲存',
                description: 'AWS S3、Google Drive',
                icon: '☁️',
                category: 'integrations',
                value: 'cloud_storage'
            },
            {
                id: 'chatbot',
                title: '聊天機器人',
                description: '自動客服、FAQ 回應',
                icon: '🤖',
                category: 'integrations',
                value: 'chatbot'
            },
            {
                id: 'live_chat',
                title: '即時客服',
                description: '真人客服、線上諮詢',
                icon: '💬',
                category: 'integrations',
                value: 'live_chat'
            },
            {
                id: 'crm_system',
                title: 'CRM 系統',
                description: '客戶關係管理、銷售追蹤',
                icon: '📋',
                category: 'integrations',
                value: 'crm_system'
            }
        ];
        
        this.adminFeatures = [
            {
                id: 'content_management',
                title: '內容管理',
                description: '新增、編輯、刪除內容',
                icon: '✏️',
                category: 'admin_features',
                value: 'content_management'
            },
            {
                id: 'user_management',
                title: '用戶管理',
                description: '會員管理、權限設定',
                icon: '👥',
                category: 'admin_features',
                value: 'user_management'
            },
            {
                id: 'analytics_dashboard',
                title: '分析儀表板',
                description: '流量統計、數據視覺化',
                icon: '📈',
                category: 'admin_features',
                value: 'analytics_dashboard'
            },
            {
                id: 'backup_restore',
                title: '備份還原',
                description: '自動備份、一鍵還原',
                icon: '💾',
                category: 'admin_features',
                value: 'backup_restore'
            },
            {
                id: 'seo_tools',
                title: 'SEO 工具',
                description: 'meta 標籤、sitemap 生成',
                icon: '🎯',
                category: 'admin_features',
                value: 'seo_tools'
            },
            {
                id: 'security_features',
                title: '安全功能',
                description: '防火牆、SSL 憑證、二次驗證',
                icon: '🔒',
                category: 'admin_features',
                value: 'security_features'
            },
            {
                id: 'performance_optimization',
                title: '效能優化',
                description: '快取機制、圖片壓縮',
                icon: '⚡',
                category: 'admin_features',
                value: 'performance_optimization'
            },
            {
                id: 'notification_system',
                title: '通知系統',
                description: '郵件通知、推播、站內通知',
                icon: '🔔',
                category: 'admin_features',
                value: 'notification_system'
            },
            {
                id: 'scheduled_tasks',
                title: '排程任務',
                description: '自動發文、定時備份',
                icon: '⏰',
                category: 'admin_features',
                value: 'scheduled_tasks'
            }
        ];
        
        this.priorityLevels = [
            {
                id: 'essential',
                title: '必要功能',
                description: '網站運作的基本需求',
                icon: '🔥',
                category: 'priority',
                value: 'essential'
            },
            {
                id: 'important',
                title: '重要功能',
                description: '提升用戶體驗的重要功能',
                icon: '⚡',
                category: 'priority',
                value: 'important'
            },
            {
                id: 'nice_to_have',
                title: '加分功能',
                description: '額外的便利功能',
                icon: '✨',
                category: 'priority',
                value: 'nice_to_have'
            },
            {
                id: 'future',
                title: '未來考慮',
                description: '後續階段可能加入',
                icon: '🔮',
                category: 'priority',
                value: 'future'
            }
        ];
        
        this.currentStep = 'content_types';
        this.stepOrder = ['content_types', 'interaction_features', 'integrations', 'admin_features', 'priority_assessment'];
        this.currentStepIndex = 0;
        this.multiSelectSteps = ['content_types', 'interaction_features', 'integrations', 'admin_features'];
        this.selectedItemsForPriority = [];
    }

    // 獲取當前步驟的卡牌資料
    getCurrentStepCards() {
        switch (this.currentStep) {
            case 'content_types':
                return this.contentTypes;
            case 'interaction_features':
                return this.interactionFeatures;
            case 'integrations':
                return this.integrations;
            case 'admin_features':
                return this.adminFeatures;
            case 'priority_assessment':
                return this.getPriorityAssessmentCards();
            default:
                return [];
        }
    }

    // 獲取優先級評估卡牌
    getPriorityAssessmentCards() {
        // 收集所有已選擇的功能
        const allSelected = [
            ...this.collectedData.contentTypes,
            ...this.collectedData.interactionFeatures,
            ...this.collectedData.integrations,
            ...this.collectedData.adminFeatures
        ];
        
        // 為每個功能創建優先級評估卡牌
        return allSelected.map(item => ({
            id: `priority_${item}`,
            title: this.getFeatureTitleByValue(item),
            description: '請選擇此功能的優先級',
            icon: this.getFeatureIconByValue(item),
            category: 'priority_assessment',
            value: item,
            priorityOptions: this.priorityLevels
        }));
    }

    // 根據值獲取功能標題
    getFeatureTitleByValue(value) {
        const allFeatures = [
            ...this.contentTypes,
            ...this.interactionFeatures,
            ...this.integrations,
            ...this.adminFeatures
        ];
        
        const feature = allFeatures.find(f => f.value === value);
        return feature ? feature.title : value;
    }

    // 根據值獲取功能圖標
    getFeatureIconByValue(value) {
        const allFeatures = [
            ...this.contentTypes,
            ...this.interactionFeatures,
            ...this.integrations,
            ...this.adminFeatures
        ];
        
        const feature = allFeatures.find(f => f.value === value);
        return feature ? feature.icon : '⚙️';
    }

    // 獲取當前步驟的對話內容
    getCurrentStepDialogue() {
        const dialogues = {
            content_types: {
                title: '選擇內容類型',
                text: '首先，讓我了解你的網站會有哪些類型的內容。你可以選擇多個選項，這將決定網站的基本架構。',
                mood: 'excited',
                action: {
                    text: '選好了',
                    callback: () => this.validateCurrentStep()
                }
            },
            interaction_features: {
                title: '選擇互動功能',
                text: '接下來，我們來決定網站的互動功能。這些功能將讓訪客與你的內容產生更多互動。',
                mood: 'thinking',
                action: {
                    text: '繼續',
                    callback: () => this.validateCurrentStep()
                }
            },
            integrations: {
                title: '第三方整合',
                text: '現在讓我們看看需要整合哪些第三方服務。這些整合將提升網站的功能性和分析能力。',
                mood: 'default',
                action: {
                    text: '下一步',
                    callback: () => this.validateCurrentStep()
                }
            },
            admin_features: {
                title: '管理功能',
                text: '最後，我們來設定後台管理需要的功能。這些工具將幫助你更好地管理網站。',
                mood: 'default',
                action: {
                    text: '繼續',
                    callback: () => this.validateCurrentStep()
                }
            },
            priority_assessment: {
                title: '功能優先級',
                text: '很好！現在請為每個選擇的功能設定優先級。這將幫助我們規劃開發順序和資源分配。',
                mood: 'thinking',
                action: {
                    text: '完成此階段',
                    callback: () => this.completeCollection()
                }
            }
        };
        
        return dialogues[this.currentStep];
    }

    // 處理用戶選擇
    handleSelection(selection) {
        const { category, value, isMultiSelect } = selection;
        
        if (this.multiSelectSteps.includes(this.currentStep)) {
            this.handleMultiSelect(category, value, isMultiSelect);
        } else if (category === 'priority_assessment') {
            this.handlePrioritySelection(selection);
        }
        
        this.dispatchDataUpdateEvent();
    }

    // 處理多選
    handleMultiSelect(category, value, isSelected) {
        const dataKey = this.getDataKeyByCategory(category);
        
        if (isSelected) {
            if (!this.collectedData[dataKey].includes(value)) {
                this.collectedData[dataKey].push(value);
            }
        } else {
            this.collectedData[dataKey] = this.collectedData[dataKey].filter(item => item !== value);
        }
    }

    // 處理優先級選擇
    handlePrioritySelection(selection) {
        const { featureValue, priorityValue } = selection;
        this.collectedData.priorityLevels[featureValue] = priorityValue;
    }

    // 根據分類獲取數據鍵
    getDataKeyByCategory(category) {
        const keyMap = {
            'content_types': 'contentTypes',
            'interaction_features': 'interactionFeatures',
            'integrations': 'integrations',
            'admin_features': 'adminFeatures'
        };
        
        return keyMap[category] || category;
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
            case 'content_types':
                return this.collectedData.contentTypes.length > 0;
            case 'interaction_features':
                return true; // 互動功能可選
            case 'integrations':
                return true; // 整合功能可選
            case 'admin_features':
                return this.collectedData.adminFeatures.length > 0;
            case 'priority_assessment':
                return this.isPriorityAssessmentComplete();
            default:
                return false;
        }
    }

    // 檢查優先級評估是否完成
    isPriorityAssessmentComplete() {
        const allSelected = [
            ...this.collectedData.contentTypes,
            ...this.collectedData.interactionFeatures,
            ...this.collectedData.integrations,
            ...this.collectedData.adminFeatures
        ];
        
        return allSelected.every(item => this.collectedData.priorityLevels[item]);
    }

    // 顯示驗證錯誤
    showValidationError() {
        const errorMessages = {
            content_types: '請至少選擇一種內容類型',
            interaction_features: '請選擇互動功能',
            integrations: '請選擇需要的整合服務',
            admin_features: '請至少選擇一項管理功能',
            priority_assessment: '請為所有功能設定優先級'
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
            this.dispatchCollectionCompleteEvent();
        }
    }

    // 檢查收集是否完整
    isCollectionComplete() {
        return this.collectedData.contentTypes.length > 0 &&
               this.collectedData.adminFeatures.length > 0 &&
               this.isPriorityAssessmentComplete();
    }

    // 獲取收集到的資料
    getCollectedData() {
        return {
            ...this.collectedData,
            timestamp: new Date().toISOString(),
            stage: 'feature_requirements'
        };
    }

    // 生成功能建議
    generateFeatureSuggestions() {
        const data = this.collectedData;
        const suggestions = {
            technicalRequirements: this.generateTechnicalRequirements(data),
            developmentPhases: this.generateDevelopmentPhases(data),
            estimatedComplexity: this.estimateComplexity(data),
            recommendedTechnologies: this.getRecommendedTechnologies(data)
        };
        
        return suggestions;
    }

    // 生成技術需求
    generateTechnicalRequirements(data) {
        const requirements = {
            database: this.getDatabaseRequirements(data),
            authentication: this.getAuthenticationRequirements(data),
            storage: this.getStorageRequirements(data),
            thirdPartyAPIs: this.getThirdPartyAPIRequirements(data)
        };
        
        return requirements;
    }

    // 獲取資料庫需求
    getDatabaseRequirements(data) {
        const requirements = ['基本頁面內容'];
        
        if (data.contentTypes.includes('blog_posts')) {
            requirements.push('文章系統', '分類標籤');
        }
        
        if (data.contentTypes.includes('user_profiles') || data.interactionFeatures.includes('user_profiles')) {
            requirements.push('用戶資料', '權限管理');
        }
        
        if (data.interactionFeatures.includes('comments_system')) {
            requirements.push('留言系統');
        }
        
        return requirements;
    }

    // 獲取驗證需求
    getAuthenticationRequirements(data) {
        const requirements = [];
        
        if (data.integrations.includes('social_login')) {
            requirements.push('社群登入整合');
        }
        
        if (data.adminFeatures.includes('user_management')) {
            requirements.push('管理員系統');
        }
        
        if (data.adminFeatures.includes('security_features')) {
            requirements.push('二次驗證', 'SSL 憑證');
        }
        
        return requirements;
    }

    // 獲取儲存需求
    getStorageRequirements(data) {
        const requirements = [];
        
        if (data.contentTypes.includes('image_gallery')) {
            requirements.push('圖片儲存');
        }
        
        if (data.contentTypes.includes('video_content')) {
            requirements.push('影片儲存');
        }
        
        if (data.integrations.includes('cloud_storage')) {
            requirements.push('雲端儲存整合');
        }
        
        return requirements;
    }

    // 獲取第三方 API 需求
    getThirdPartyAPIRequirements(data) {
        const apis = [];
        
        if (data.integrations.includes('google_analytics')) {
            apis.push('Google Analytics API');
        }
        
        if (data.integrations.includes('payment_system')) {
            apis.push('付款閘道 API');
        }
        
        if (data.integrations.includes('email_service')) {
            apis.push('郵件服務 API');
        }
        
        return apis;
    }

    // 生成開發階段
    generateDevelopmentPhases(data) {
        const phases = [];
        
        // 階段 1: 基礎架構
        phases.push({
            name: '基礎架構',
            priority: 'essential',
            features: data.contentTypes.filter(type => 
                data.priorityLevels[type] === 'essential'
            )
        });
        
        // 階段 2: 核心功能
        phases.push({
            name: '核心功能',
            priority: 'important',
            features: [
                ...data.interactionFeatures,
                ...data.adminFeatures
            ].filter(feature => 
                data.priorityLevels[feature] === 'important'
            )
        });
        
        // 階段 3: 整合與優化
        phases.push({
            name: '整合與優化',
            priority: 'nice_to_have',
            features: data.integrations.filter(integration => 
                data.priorityLevels[integration] === 'nice_to_have'
            )
        });
        
        return phases;
    }

    // 估算複雜度
    estimateComplexity(data) {
        let complexity = 0;
        const weights = {
            'content_types': 1,
            'interaction_features': 2,
            'integrations': 3,
            'admin_features': 2
        };
        
        Object.keys(weights).forEach(key => {
            const dataKey = this.getDataKeyByCategory(key);
            complexity += (data[dataKey] || []).length * weights[key];
        });
        
        if (complexity <= 10) return 'simple';
        if (complexity <= 20) return 'medium';
        if (complexity <= 35) return 'complex';
        return 'very_complex';
    }

    // 獲取推薦技術
    getRecommendedTechnologies(data) {
        const technologies = {
            frontend: ['HTML5', 'CSS3', 'JavaScript'],
            backend: ['Node.js', 'Express.js'],
            database: ['MongoDB'],
            tools: ['Git', 'Webpack']
        };
        
        // 根據選擇的功能調整技術建議
        if (data.interactionFeatures.includes('comments_system')) {
            technologies.backend.push('Socket.io');
        }
        
        if (data.integrations.includes('payment_system')) {
            technologies.backend.push('Stripe API');
        }
        
        if (data.adminFeatures.includes('analytics_dashboard')) {
            technologies.frontend.push('Chart.js');
        }
        
        return technologies;
    }

    // 重置收集器
    reset() {
        this.collectedData = {
            contentTypes: [],
            interactionFeatures: [],
            integrations: [],
            adminFeatures: [],
            priorityLevels: {}
        };
        
        this.currentStep = 'content_types';
        this.currentStepIndex = 0;
        this.selectedItemsForPriority = [];
    }

    // 獲取進度
    getProgress() {
        return {
            currentStep: this.currentStep,
            stepIndex: this.currentStepIndex,
            totalSteps: this.stepOrder.length,
            percentage: ((this.currentStepIndex + 1) / this.stepOrder.length) * 100
        };
    }

    // 檢查是否為多選步驟
    isMultiSelectStep() {
        return this.multiSelectSteps.includes(this.currentStep);
    }

    // 檢查項目是否已選擇
    isItemSelected(value) {
        const dataKey = this.getDataKeyByCategory(this.currentStep);
        return this.collectedData[dataKey].includes(value);
    }

    // 發送資料更新事件
    dispatchDataUpdateEvent() {
        const event = new CustomEvent('dataUpdate', {
            detail: {
                stage: 'feature_requirements',
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
                stage: 'feature_requirements',
                currentStep: this.currentStep,
                progress: this.getProgress(),
                dialogue: this.getCurrentStepDialogue(),
                cards: this.getCurrentStepCards(),
                isMultiSelect: this.isMultiSelectStep()
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送收集完成事件
    dispatchCollectionCompleteEvent() {
        const event = new CustomEvent('collectionComplete', {
            detail: {
                stage: 'feature_requirements',
                data: this.getCollectedData(),
                suggestions: this.generateFeatureSuggestions(),
                nextStage: 'implementation_plan'
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送驗證錯誤事件
    dispatchValidationErrorEvent(message) {
        const event = new CustomEvent('validationError', {
            detail: {
                stage: 'feature_requirements',
                step: this.currentStep,
                message: message
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }
}

// 導出到全域
window.FeatureCollector = FeatureCollector;