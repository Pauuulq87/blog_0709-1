/**
 * ProjectTypeCollector.js - 專案類型收集器
 * 第一階段：收集用戶專案願景和基本需求
 */

class ProjectTypeCollector {
    constructor() {
        this.collectedData = {
            projectType: null,
            targetAudience: null,
            corePurpose: null,
            referenceSites: [],
            inspirationKeywords: []
        };
        
        this.projectTypes = [
            {
                id: 'personal_blog',
                title: '個人部落格',
                description: '分享個人想法、生活經驗或專業知識',
                icon: '📝',
                category: 'project_type',
                value: 'personal_blog'
            },
            {
                id: 'portfolio',
                title: '作品集網站',
                description: '展示創意作品、設計案例或專業技能',
                icon: '🎨',
                category: 'project_type',
                value: 'portfolio'
            },
            {
                id: 'business',
                title: '企業官網',
                description: '展示公司資訊、服務內容和聯絡方式',
                icon: '🏢',
                category: 'project_type',
                value: 'business'
            },
            {
                id: 'ecommerce',
                title: '電商網站',
                description: '線上商店，銷售產品或服務',
                icon: '🛒',
                category: 'project_type',
                value: 'ecommerce'
            },
            {
                id: 'landing_page',
                title: '活動頁面',
                description: '單一目的的登陸頁面或活動宣傳',
                icon: '🎯',
                category: 'project_type',
                value: 'landing_page'
            },
            {
                id: 'community',
                title: '社群網站',
                description: '用戶互動、討論或分享的平台',
                icon: '👥',
                category: 'project_type',
                value: 'community'
            }
        ];
        
        this.targetAudiences = [
            {
                id: 'general_public',
                title: '一般大眾',
                description: '不特定的廣泛受眾',
                icon: '🌍',
                category: 'target_audience',
                value: 'general_public'
            },
            {
                id: 'professionals',
                title: '專業人士',
                description: '特定領域的專業工作者',
                icon: '💼',
                category: 'target_audience',
                value: 'professionals'
            },
            {
                id: 'students',
                title: '學生族群',
                description: '在學學生或終身學習者',
                icon: '🎓',
                category: 'target_audience',
                value: 'students'
            },
            {
                id: 'creatives',
                title: '創作者',
                description: '設計師、藝術家、內容創作者',
                icon: '🎨',
                category: 'target_audience',
                value: 'creatives'
            },
            {
                id: 'business_owners',
                title: '企業主',
                description: '商業決策者或創業者',
                icon: '🏆',
                category: 'target_audience',
                value: 'business_owners'
            },
            {
                id: 'tech_enthusiasts',
                title: '技術愛好者',
                description: '對技術和創新感興趣的人',
                icon: '💻',
                category: 'target_audience',
                value: 'tech_enthusiasts'
            }
        ];
        
        this.purposes = [
            {
                id: 'share_knowledge',
                title: '知識分享',
                description: '分享專業知識或個人經驗',
                icon: '📚',
                category: 'purpose',
                value: 'share_knowledge'
            },
            {
                id: 'showcase_work',
                title: '展示作品',
                description: '展示創意作品或專業成果',
                icon: '🖼️',
                category: 'purpose',
                value: 'showcase_work'
            },
            {
                id: 'sell_products',
                title: '銷售產品',
                description: '線上販售實體或數位商品',
                icon: '💰',
                category: 'purpose',
                value: 'sell_products'
            },
            {
                id: 'build_community',
                title: '建立社群',
                description: '聚集志同道合的人群',
                icon: '🤝',
                category: 'purpose',
                value: 'build_community'
            },
            {
                id: 'brand_promotion',
                title: '品牌宣傳',
                description: '提升品牌知名度和形象',
                icon: '📢',
                category: 'purpose',
                value: 'brand_promotion'
            },
            {
                id: 'lead_generation',
                title: '潛在客戶',
                description: '收集潛在客戶資訊',
                icon: '🎣',
                category: 'purpose',
                value: 'lead_generation'
            }
        ];
        
        this.currentStep = 'project_type';
        this.stepOrder = ['project_type', 'target_audience', 'purpose', 'inspiration'];
        this.currentStepIndex = 0;
    }

    // 獲取當前步驟的卡牌資料
    getCurrentStepCards() {
        switch (this.currentStep) {
            case 'project_type':
                return this.projectTypes;
            case 'target_audience':
                return this.targetAudiences;
            case 'purpose':
                return this.purposes;
            case 'inspiration':
                return this.getInspirationInputs();
            default:
                return [];
        }
    }

    // 獲取當前步驟的對話內容
    getCurrentStepDialogue() {
        const dialogues = {
            project_type: {
                title: '選擇專案類型',
                text: '首先，讓我了解你想要建立什麼類型的網站。每種類型都有不同的特色和用途，選擇最符合你需求的選項。',
                mood: 'excited',
                action: {
                    text: '我選好了',
                    callback: () => this.validateCurrentStep()
                }
            },
            target_audience: {
                title: '確定目標受眾',
                text: '很好！現在告訴我，你的網站主要是為了哪些人設計的？了解目標受眾有助於我們選擇合適的設計風格和功能。',
                mood: 'thinking',
                action: {
                    text: '繼續',
                    callback: () => this.validateCurrentStep()
                }
            },
            purpose: {
                title: '明確核心目的',
                text: '接下來，我需要了解你建立這個網站的核心目的是什麼？這將決定網站的主要功能和結構。',
                mood: 'default',
                action: {
                    text: '下一步',
                    callback: () => this.validateCurrentStep()
                }
            },
            inspiration: {
                title: '收集靈感來源',
                text: '最後，請分享一些你喜歡的網站範例或關鍵字。這些靈感將幫助我更好地理解你的期望。',
                mood: 'excited',
                action: {
                    text: '完成此階段',
                    callback: () => this.completeCollection()
                }
            }
        };
        
        return dialogues[this.currentStep];
    }

    // 獲取靈感輸入介面
    getInspirationInputs() {
        return [
            {
                id: 'reference_sites',
                title: '參考網站',
                description: '請輸入你喜歡的網站網址',
                icon: '🔗',
                category: 'inspiration',
                value: 'reference_sites',
                inputType: 'url'
            },
            {
                id: 'inspiration_keywords',
                title: '風格關鍵字',
                description: '描述你理想中的網站風格',
                icon: '🏷️',
                category: 'inspiration',
                value: 'inspiration_keywords',
                inputType: 'text'
            }
        ];
    }

    // 處理用戶選擇
    handleSelection(selection) {
        const { category, value, cardId } = selection;
        
        switch (category) {
            case 'project_type':
                this.collectedData.projectType = value;
                break;
            case 'target_audience':
                this.collectedData.targetAudience = value;
                break;
            case 'purpose':
                this.collectedData.corePurpose = value;
                break;
            case 'inspiration':
                this.handleInspirationInput(value, cardId);
                break;
        }
        
        this.dispatchDataUpdateEvent();
    }

    // 處理靈感輸入
    handleInspirationInput(type, value) {
        if (type === 'reference_sites') {
            if (value && this.isValidURL(value)) {
                this.collectedData.referenceSites.push(value);
            }
        } else if (type === 'inspiration_keywords') {
            if (value && value.trim()) {
                this.collectedData.inspirationKeywords.push(value.trim());
            }
        }
    }

    // 驗證 URL
    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
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
            case 'project_type':
                return this.collectedData.projectType !== null;
            case 'target_audience':
                return this.collectedData.targetAudience !== null;
            case 'purpose':
                return this.collectedData.corePurpose !== null;
            case 'inspiration':
                return true; // 靈感階段可選
            default:
                return false;
        }
    }

    // 顯示驗證錯誤
    showValidationError() {
        const errorMessages = {
            project_type: '請選擇一個專案類型',
            target_audience: '請選擇目標受眾',
            purpose: '請選擇核心目的',
            inspiration: '請提供一些靈感來源'
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
        return this.collectedData.projectType !== null &&
               this.collectedData.targetAudience !== null &&
               this.collectedData.corePurpose !== null;
    }

    // 獲取收集到的資料
    getCollectedData() {
        return {
            ...this.collectedData,
            timestamp: new Date().toISOString(),
            stage: 'project_vision'
        };
    }

    // 重置收集器
    reset() {
        this.collectedData = {
            projectType: null,
            targetAudience: null,
            corePurpose: null,
            referenceSites: [],
            inspirationKeywords: []
        };
        
        this.currentStep = 'project_type';
        this.currentStepIndex = 0;
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
                stage: 'project_vision',
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
                stage: 'project_vision',
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
                stage: 'project_vision',
                data: this.getCollectedData(),
                nextStage: 'design_style'
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送驗證錯誤事件
    dispatchValidationErrorEvent(message) {
        const event = new CustomEvent('validationError', {
            detail: {
                stage: 'project_vision',
                step: this.currentStep,
                message: message
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }
}

// 導出到全域
window.ProjectTypeCollector = ProjectTypeCollector;