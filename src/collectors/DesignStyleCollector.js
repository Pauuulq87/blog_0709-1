/**
 * DesignStyleCollector.js - 設計風格收集器
 * 第二階段：收集用戶視覺設計偏好
 */

class DesignStyleCollector {
    constructor() {
        this.collectedData = {
            colorScheme: null,
            layoutStyle: null,
            animationLevel: null,
            visualStyle: null,
            mobilePriority: null
        };
        
        this.colorSchemes = [
            {
                id: 'warm',
                title: '暖色調',
                description: '橘色、紅色、黃色等溫暖色彩',
                icon: '🌅',
                category: 'color_scheme',
                value: 'warm',
                preview: '#ff6b6b'
            },
            {
                id: 'cool',
                title: '冷色調',
                description: '藍色、綠色、紫色等冷靜色彩',
                icon: '🌊',
                category: 'color_scheme',
                value: 'cool',
                preview: '#4ecdc4'
            },
            {
                id: 'neutral',
                title: '中性色調',
                description: '黑白灰等經典中性色彩',
                icon: '⚫',
                category: 'color_scheme',
                value: 'neutral',
                preview: '#95a5a6'
            },
            {
                id: 'vibrant',
                title: '鮮豔色彩',
                description: '高飽和度的活潑色彩',
                icon: '🌈',
                category: 'color_scheme',
                value: 'vibrant',
                preview: '#e74c3c'
            },
            {
                id: 'pastel',
                title: '粉嫩色調',
                description: '柔和的馬卡龍色系',
                icon: '🎨',
                category: 'color_scheme',
                value: 'pastel',
                preview: '#f8b500'
            },
            {
                id: 'monochrome',
                title: '單色系',
                description: '同色調的漸層變化',
                icon: '🔘',
                category: 'color_scheme',
                value: 'monochrome',
                preview: '#2c3e50'
            }
        ];
        
        this.layoutStyles = [
            {
                id: 'single_column',
                title: '單欄式',
                description: '內容集中在單一欄位，適合閱讀',
                icon: '📄',
                category: 'layout_style',
                value: 'single_column'
            },
            {
                id: 'multi_column',
                title: '多欄式',
                description: '內容分散在多個欄位，資訊豐富',
                icon: '📰',
                category: 'layout_style',
                value: 'multi_column'
            },
            {
                id: 'grid',
                title: '網格式',
                description: '規整的網格佈局，視覺整齊',
                icon: '⚏',
                category: 'layout_style',
                value: 'grid'
            },
            {
                id: 'masonry',
                title: '瀑布流',
                description: '不規則的流動式佈局',
                icon: '🧱',
                category: 'layout_style',
                value: 'masonry'
            },
            {
                id: 'full_width',
                title: '全寬版面',
                description: '充分利用螢幕寬度',
                icon: '📏',
                category: 'layout_style',
                value: 'full_width'
            },
            {
                id: 'sidebar',
                title: '側邊欄',
                description: '主內容搭配側邊欄',
                icon: '📋',
                category: 'layout_style',
                value: 'sidebar'
            }
        ];
        
        this.animationLevels = [
            {
                id: 'none',
                title: '無動畫',
                description: '靜態設計，快速載入',
                icon: '⏸️',
                category: 'animation_level',
                value: 'none'
            },
            {
                id: 'minimal',
                title: '輕微動畫',
                description: '簡單的過渡效果',
                icon: '🌙',
                category: 'animation_level',
                value: 'minimal'
            },
            {
                id: 'moderate',
                title: '適中動畫',
                description: '平衡的互動效果',
                icon: '✨',
                category: 'animation_level',
                value: 'moderate'
            },
            {
                id: 'rich',
                title: '豐富動畫',
                description: '生動的視覺效果',
                icon: '🎭',
                category: 'animation_level',
                value: 'rich'
            }
        ];
        
        this.visualStyles = [
            {
                id: 'minimal',
                title: '簡約風格',
                description: '乾淨簡潔，突出內容',
                icon: '⚪',
                category: 'visual_style',
                value: 'minimal'
            },
            {
                id: 'modern',
                title: '現代風格',
                description: '時尚潮流，線條俐落',
                icon: '🏗️',
                category: 'visual_style',
                value: 'modern'
            },
            {
                id: 'classic',
                title: '經典風格',
                description: '傳統優雅，永不過時',
                icon: '🏛️',
                category: 'visual_style',
                value: 'classic'
            },
            {
                id: 'creative',
                title: '創意風格',
                description: '獨特設計，充滿創意',
                icon: '🎨',
                category: 'visual_style',
                value: 'creative'
            },
            {
                id: 'professional',
                title: '專業風格',
                description: '商務正式，可信度高',
                icon: '💼',
                category: 'visual_style',
                value: 'professional'
            },
            {
                id: 'playful',
                title: '活潑風格',
                description: '趣味生動，充滿活力',
                icon: '🎪',
                category: 'visual_style',
                value: 'playful'
            }
        ];
        
        this.mobilePriorities = [
            {
                id: 'mobile_first',
                title: '手機優先',
                description: '主要為手機使用者設計',
                icon: '📱',
                category: 'mobile_priority',
                value: 'mobile_first'
            },
            {
                id: 'desktop_first',
                title: '桌面優先',
                description: '主要為桌面使用者設計',
                icon: '🖥️',
                category: 'mobile_priority',
                value: 'desktop_first'
            },
            {
                id: 'balanced',
                title: '平衡設計',
                description: '兼顧手機和桌面體驗',
                icon: '⚖️',
                category: 'mobile_priority',
                value: 'balanced'
            }
        ];
        
        this.currentStep = 'color_scheme';
        this.stepOrder = ['color_scheme', 'layout_style', 'visual_style', 'animation_level', 'mobile_priority'];
        this.currentStepIndex = 0;
    }

    // 獲取當前步驟的卡牌資料
    getCurrentStepCards() {
        switch (this.currentStep) {
            case 'color_scheme':
                return this.colorSchemes;
            case 'layout_style':
                return this.layoutStyles;
            case 'visual_style':
                return this.visualStyles;
            case 'animation_level':
                return this.animationLevels;
            case 'mobile_priority':
                return this.mobilePriorities;
            default:
                return [];
        }
    }

    // 獲取當前步驟的對話內容
    getCurrentStepDialogue() {
        const dialogues = {
            color_scheme: {
                title: '選擇色彩偏好',
                text: '色彩會大大影響網站的整體感受。請選擇最能代表你理想網站風格的色彩方案。',
                mood: 'excited',
                action: {
                    text: '選好了',
                    callback: () => this.validateCurrentStep()
                }
            },
            layout_style: {
                title: '決定版面佈局',
                text: '版面佈局決定了內容的呈現方式。考慮一下你的內容類型和使用者的閱讀習慣。',
                mood: 'thinking',
                action: {
                    text: '繼續',
                    callback: () => this.validateCurrentStep()
                }
            },
            visual_style: {
                title: '確定視覺風格',
                text: '視覺風格反映了你的個性和品牌形象。選擇最符合你期望的整體風格。',
                mood: 'default',
                action: {
                    text: '下一步',
                    callback: () => this.validateCurrentStep()
                }
            },
            animation_level: {
                title: '設定動畫程度',
                text: '動畫可以提升使用者體驗，但也會影響載入速度。請選擇適合的動畫程度。',
                mood: 'default',
                action: {
                    text: '繼續',
                    callback: () => this.validateCurrentStep()
                }
            },
            mobile_priority: {
                title: '行動裝置優先級',
                text: '現在很多人使用手機瀏覽網站。請告訴我你對不同裝置的優先考量。',
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
        const { category, value } = selection;
        
        switch (category) {
            case 'color_scheme':
                this.collectedData.colorScheme = value;
                break;
            case 'layout_style':
                this.collectedData.layoutStyle = value;
                break;
            case 'visual_style':
                this.collectedData.visualStyle = value;
                break;
            case 'animation_level':
                this.collectedData.animationLevel = value;
                break;
            case 'mobile_priority':
                this.collectedData.mobilePriority = value;
                break;
        }
        
        this.dispatchDataUpdateEvent();
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
            case 'color_scheme':
                return this.collectedData.colorScheme !== null;
            case 'layout_style':
                return this.collectedData.layoutStyle !== null;
            case 'visual_style':
                return this.collectedData.visualStyle !== null;
            case 'animation_level':
                return this.collectedData.animationLevel !== null;
            case 'mobile_priority':
                return this.collectedData.mobilePriority !== null;
            default:
                return false;
        }
    }

    // 顯示驗證錯誤
    showValidationError() {
        const errorMessages = {
            color_scheme: '請選擇一個色彩方案',
            layout_style: '請選擇版面佈局',
            visual_style: '請選擇視覺風格',
            animation_level: '請選擇動畫程度',
            mobile_priority: '請選擇行動裝置優先級'
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
        return this.collectedData.colorScheme !== null &&
               this.collectedData.layoutStyle !== null &&
               this.collectedData.visualStyle !== null &&
               this.collectedData.animationLevel !== null &&
               this.collectedData.mobilePriority !== null;
    }

    // 獲取收集到的資料
    getCollectedData() {
        return {
            ...this.collectedData,
            timestamp: new Date().toISOString(),
            stage: 'design_style'
        };
    }

    // 生成設計建議
    generateDesignSuggestions() {
        const data = this.collectedData;
        const suggestions = {
            typography: this.getTypographySuggestions(data.visualStyle),
            spacing: this.getSpacingSuggestions(data.layoutStyle),
            interactions: this.getInteractionSuggestions(data.animationLevel),
            responsive: this.getResponsiveSuggestions(data.mobilePriority)
        };
        
        return suggestions;
    }

    // 獲取字體建議
    getTypographySuggestions(visualStyle) {
        const typographyMap = {
            minimal: ['Inter', 'Roboto', 'Open Sans'],
            modern: ['Montserrat', 'Poppins', 'Nunito'],
            classic: ['Georgia', 'Times New Roman', 'Crimson Text'],
            creative: ['Playfair Display', 'Oswald', 'Raleway'],
            professional: ['Lato', 'Source Sans Pro', 'Merriweather'],
            playful: ['Quicksand', 'Fredoka One', 'Pacifico']
        };
        
        return typographyMap[visualStyle] || typographyMap.minimal;
    }

    // 獲取間距建議
    getSpacingSuggestions(layoutStyle) {
        const spacingMap = {
            single_column: { padding: 'large', margin: 'medium' },
            multi_column: { padding: 'medium', margin: 'small' },
            grid: { padding: 'small', margin: 'small' },
            masonry: { padding: 'medium', margin: 'varied' },
            full_width: { padding: 'large', margin: 'minimal' },
            sidebar: { padding: 'medium', margin: 'medium' }
        };
        
        return spacingMap[layoutStyle] || spacingMap.single_column;
    }

    // 獲取互動建議
    getInteractionSuggestions(animationLevel) {
        const interactionMap = {
            none: { hover: 'color', transition: 'instant' },
            minimal: { hover: 'subtle', transition: 'fast' },
            moderate: { hover: 'scale', transition: 'smooth' },
            rich: { hover: 'complex', transition: 'elaborate' }
        };
        
        return interactionMap[animationLevel] || interactionMap.minimal;
    }

    // 獲取響應式建議
    getResponsiveSuggestions(mobilePriority) {
        const responsiveMap = {
            mobile_first: { breakpoints: ['mobile', 'tablet', 'desktop'], approach: 'progressive' },
            desktop_first: { breakpoints: ['desktop', 'tablet', 'mobile'], approach: 'graceful' },
            balanced: { breakpoints: ['tablet', 'mobile', 'desktop'], approach: 'adaptive' }
        };
        
        return responsiveMap[mobilePriority] || responsiveMap.balanced;
    }

    // 重置收集器
    reset() {
        this.collectedData = {
            colorScheme: null,
            layoutStyle: null,
            animationLevel: null,
            visualStyle: null,
            mobilePriority: null
        };
        
        this.currentStep = 'color_scheme';
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
                stage: 'design_style',
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
                stage: 'design_style',
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
                stage: 'design_style',
                data: this.getCollectedData(),
                suggestions: this.generateDesignSuggestions(),
                nextStage: 'feature_requirements'
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送驗證錯誤事件
    dispatchValidationErrorEvent(message) {
        const event = new CustomEvent('validationError', {
            detail: {
                stage: 'design_style',
                step: this.currentStep,
                message: message
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }
}

// 導出到全域
window.DesignStyleCollector = DesignStyleCollector;