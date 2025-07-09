/**
 * app.js - 主應用程式邏輯
 * 整合所有組件和收集器，控制整個需求收集流程
 */

class VibeCodingAcademy {
    constructor() {
        // 核心組件
        this.dialogueBox = null;
        this.progressBar = null;
        this.cardManager = null;
        
        // 收集器
        this.collectors = {
            projectType: null,
            designStyle: null,
            feature: null,
            techStack: null,
            deployment: null
        };
        
        // 工具
        this.requirementParser = null;
        this.outputGenerator = null;
        this.validationHelper = null;
        
        // 狀態管理
        this.currentStage = 0;
        this.stageNames = ['project_vision', 'design_style', 'feature_requirements', 'tech_preferences', 'deployment_specs'];
        this.collectedData = {};
        this.isInitialized = false;
        
        // 設定
        this.config = {
            autoSave: true,
            showValidationErrors: true,
            enableAnimations: true,
            skipIntro: false
        };
        
        // 事件監聽器
        this.eventListeners = new Map();
        
        this.init();
    }

    // 初始化應用程式
    async init() {
        try {
            // 顯示載入畫面
            this.showLoadingScreen();
            
            // 初始化組件
            await this.initializeComponents();
            
            // 初始化收集器
            this.initializeCollectors();
            
            // 初始化工具
            this.initializeTools();
            
            // 綁定事件
            this.bindEvents();
            
            // 載入保存的數據
            this.loadSavedData();
            
            // 隱藏載入畫面
            this.hideLoadingScreen();
            
            // 開始應用程式
            this.startApplication();
            
            this.isInitialized = true;
            
        } catch (error) {
            console.error('應用程式初始化失敗:', error);
            console.error('錯誤詳情:', error.stack);
            
            // 顯示詳細錯誤信息在loading screen
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.innerHTML = `
                    <div class="error-message">
                        <h3>🚨 初始化失敗</h3>
                        <p>錯誤原因: ${error.message}</p>
                        <button onclick="location.reload()" class="btn btn-primary">重新整理頁面</button>
                    </div>
                `;
            }
            
            this.handleError('初始化失敗，請重新整理頁面');
        }
    }

    // 初始化組件
    async initializeComponents() {
        console.log('開始初始化組件...');
        
        // 檢查必要的DOM元素是否存在
        const requiredElements = [
            '#dialogue-box',
            '.progress-bar-container', 
            '#card-container'
        ];
        
        for (const selector of requiredElements) {
            const element = document.querySelector(selector);
            if (!element) {
                throw new Error(`缺少必要的DOM元素: ${selector}`);
            }
        }
        
        // 初始化對話框
        console.log('初始化對話框...');
        this.dialogueBox = new window.DialogueBox('#dialogue-box');
        
        // 初始化進度條
        console.log('初始化進度條...');
        this.progressBar = new window.ProgressBar('.progress-bar-container');
        
        // 初始化卡牌管理器
        console.log('初始化卡牌管理器...');
        this.cardManager = new window.CardManager('#card-container');
        
        // 設定進度條階段名稱
        this.progressBar.setStageNames([
            '專案願景', '設計風格', '功能需求', '技術架構', '規格確認'
        ]);
        
        console.log('組件初始化完成');
        await this.sleep(100); // 確保 DOM 準備完成
    }

    // 初始化收集器
    initializeCollectors() {
        console.log('開始初始化收集器...');
        
        // 檢查收集器類別是否存在
        const collectorClasses = [
            'ProjectTypeCollector',
            'DesignStyleCollector', 
            'FeatureCollector',
            'TechStackCollector',
            'DeploymentCollector'
        ];
        
        for (const className of collectorClasses) {
            if (typeof window[className] !== 'function') {
                throw new Error(`收集器類別未定義: ${className}`);
            }
        }
        
        this.collectors.projectType = new window.ProjectTypeCollector();
        this.collectors.designStyle = new window.DesignStyleCollector();
        this.collectors.feature = new window.FeatureCollector();
        this.collectors.techStack = new window.TechStackCollector();
        this.collectors.deployment = new window.DeploymentCollector();
        
        console.log('收集器初始化完成');
    }

    // 初始化工具
    initializeTools() {
        console.log('開始初始化工具...');
        
        // 檢查工具類別是否存在
        const toolClasses = [
            'RequirementParser',
            'OutputGenerator',
            'ValidationHelper'
        ];
        
        for (const className of toolClasses) {
            if (typeof window[className] !== 'function') {
                throw new Error(`工具類別未定義: ${className}`);
            }
        }
        
        this.requirementParser = new window.RequirementParser();
        this.outputGenerator = new window.OutputGenerator();
        this.validationHelper = new window.ValidationHelper();
        
        console.log('工具初始化完成');
    }

    // 綁定事件
    bindEvents() {
        // 綁定按鈕事件
        this.bindButtonEvents();
        
        // 綁定卡牌選擇事件
        this.bindCardEvents();
        
        // 綁定對話框事件
        this.bindDialogueEvents();
        
        // 綁定進度條事件
        this.bindProgressEvents();
        
        // 綁定收集器事件
        this.bindCollectorEvents();
        
        // 綁定全域事件
        this.bindGlobalEvents();
    }

    // 綁定按鈕事件
    bindButtonEvents() {
        const startBtn = document.getElementById('start-btn');
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document.getElementById('back-btn');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startCollection());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStage());
        }
        
        if (backBtn) {
            backBtn.addEventListener('click', () => this.previousStage());
        }
    }

    // 綁定卡牌事件
    bindCardEvents() {
        if (this.cardManager) {
            this.cardManager.container.addEventListener('selectionChange', (e) => {
                this.handleCardSelection(e.detail);
            });
        }
    }

    // 綁定對話框事件
    bindDialogueEvents() {
        if (this.dialogueBox) {
            this.dialogueBox.container.addEventListener('dialogueAction', (e) => {
                this.handleDialogueAction(e.detail);
            });
            
            this.dialogueBox.container.addEventListener('typingComplete', (e) => {
                this.handleTypingComplete(e.detail);
            });
        }
    }

    // 綁定進度條事件
    bindProgressEvents() {
        if (this.progressBar) {
            this.progressBar.container.addEventListener('stageClick', (e) => {
                this.handleStageClick(e.detail);
            });
            
            this.progressBar.container.addEventListener('progressChange', (e) => {
                this.handleProgressChange(e.detail);
            });
        }
    }

    // 綁定收集器事件
    bindCollectorEvents() {
        // 綁定所有收集器的事件
        Object.values(this.collectors).forEach(collector => {
            if (collector) {
                document.addEventListener('dataUpdate', (e) => {
                    this.handleDataUpdate(e.detail);
                });
                
                document.addEventListener('stepChange', (e) => {
                    this.handleStepChange(e.detail);
                });
                
                document.addEventListener('collectionComplete', (e) => {
                    this.handleCollectionComplete(e.detail);
                });
                
                document.addEventListener('validationError', (e) => {
                    this.handleValidationError(e.detail);
                });
            }
        });
    }

    // 綁定全域事件
    bindGlobalEvents() {
        // 鍵盤事件
        document.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });
        
        // 視窗事件
        window.addEventListener('beforeunload', (e) => {
            this.handleBeforeUnload(e);
        });
        
        // 儲存事件
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.config.autoSave) {
                this.saveData();
            }
        });
    }

    // 開始應用程式
    startApplication() {
        if (!this.config.skipIntro) {
            this.showIntroduction();
        } else {
            this.startCollection();
        }
    }

    // 顯示介紹
    showIntroduction() {
        const introDialogue = {
            title: '歡迎來到 Vibe Coding Academy',
            text: '我是你的專屬導師，將引導你完成網站需求收集的旅程。我們將通過五個階段，幫助你清楚地表達你的想法，並將它們轉化為可執行的技術規格。準備好開始了嗎？',
            mood: 'excited',
            action: {
                text: '開始收集需求',
                callback: () => this.startCollection()
            }
        };
        
        this.dialogueBox.showDialogue(introDialogue);
        
        // 顯示開始按鈕
        this.showButton('start-btn');
    }

    // 開始收集
    startCollection() {
        this.hideButton('start-btn');
        this.showButton('next-btn');
        this.showButton('back-btn');
        
        // 切換到遊戲容器
        this.switchToGameContainer();
        
        // 開始第一階段
        this.goToStage(0);
    }

    // 切換到遊戲容器
    switchToGameContainer() {
        const gameContainer = document.getElementById('game-container');
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
        if (gameContainer) {
            gameContainer.classList.remove('hidden');
            gameContainer.classList.add('fade-in');
        }
    }

    // 跳轉到指定階段
    goToStage(stageIndex) {
        if (stageIndex < 0 || stageIndex >= this.stageNames.length) {
            console.warn('無效的階段索引:', stageIndex);
            return;
        }
        
        this.currentStage = stageIndex;
        const stageName = this.stageNames[stageIndex];
        
        // 更新進度條
        this.progressBar.setProgress(stageIndex);
        
        // 獲取當前收集器
        const collector = this.getCurrentCollector();
        
        if (collector) {
            // 重置收集器到第一步
            collector.currentStepIndex = 0;
            collector.currentStep = collector.stepOrder[0];
            
            // 顯示階段對話和卡牌
            this.showStageContent(collector);
        }
        
        // 更新按鈕狀態
        this.updateButtonStates();
        
        // 自動儲存
        if (this.config.autoSave) {
            this.saveData();
        }
    }

    // 獲取當前收集器
    getCurrentCollector() {
        const collectorMap = {
            0: this.collectors.projectType,
            1: this.collectors.designStyle,
            2: this.collectors.feature,
            3: this.collectors.techStack,
            4: this.collectors.deployment
        };
        
        return collectorMap[this.currentStage];
    }

    // 顯示階段內容
    showStageContent(collector) {
        // 獲取對話內容
        const dialogue = collector.getCurrentStepDialogue();
        
        // 顯示對話
        this.dialogueBox.showDialogue(dialogue);
        
        // 獲取卡牌資料
        const cards = collector.getCurrentStepCards();
        
        // 清空現有卡牌
        this.cardManager.clear();
        
        // 設定選擇模式
        this.cardManager.setSelectionMode(this.getSelectionMode(collector));
        
        // 添加卡牌
        cards.forEach(cardData => {
            this.cardManager.addCard(cardData);
        });
        
        // 添加進入動畫
        this.animateStageTransition();
    }

    // 獲取選擇模式
    getSelectionMode(collector) {
        // 功能收集器支援多選
        if (collector === this.collectors.feature) {
            return 'multiple';
        }
        return 'single';
    }

    // 動畫階段轉換
    animateStageTransition() {
        const container = document.getElementById('card-container');
        if (container) {
            container.classList.add('fade-in');
            
            // 為每張卡牌添加延遲動畫
            const cards = container.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.classList.add('card-slide-in');
                card.style.animationDelay = `${index * 0.1}s`;
            });
        }
    }

    // 處理卡牌選擇
    handleCardSelection(detail) {
        const { selectedCards } = detail;
        const collector = this.getCurrentCollector();
        
        if (collector && selectedCards.length > 0) {
            // 處理選擇
            selectedCards.forEach(card => {
                collector.handleSelection({
                    category: card.category,
                    value: card.value,
                    cardId: card.id
                });
            });
            
            // 顯示選擇回饋
            this.showSelectionFeedback(selectedCards);
        }
    }

    // 顯示選擇回饋
    showSelectionFeedback(selectedCards) {
        const feedbackText = selectedCards.length === 1 
            ? `已選擇：${selectedCards[0].title}`
            : `已選擇 ${selectedCards.length} 個項目`;
        
        this.showTemporaryMessage(feedbackText, 'success');
    }

    // 處理對話框動作
    handleDialogueAction(detail) {
        const { action } = detail;
        
        if (action && action.callback) {
            action.callback();
        }
    }

    // 處理打字完成
    handleTypingComplete(detail) {
        // 可以在這裡添加打字完成後的邏輯
        console.log('打字完成:', detail);
    }

    // 處理階段點擊
    handleStageClick(detail) {
        const { stageIndex } = detail;
        
        // 只允許跳轉到已完成或當前階段
        if (stageIndex <= this.currentStage) {
            this.goToStage(stageIndex);
        }
    }

    // 處理進度變更
    handleProgressChange(detail) {
        console.log('進度變更:', detail);
    }

    // 處理資料更新
    handleDataUpdate(detail) {
        const { stage, data } = detail;
        this.collectedData[stage] = data;
        
        // 驗證資料
        if (this.config.showValidationErrors) {
            this.validateCurrentData();
        }
        
        // 自動儲存
        if (this.config.autoSave) {
            this.saveData();
        }
    }

    // 處理步驟變更
    handleStepChange(detail) {
        const { stage, dialogue, cards } = detail;
        
        // 更新對話
        if (dialogue) {
            this.dialogueBox.showDialogue(dialogue);
        }
        
        // 更新卡牌
        if (cards) {
            this.cardManager.clear();
            cards.forEach(cardData => {
                this.cardManager.addCard(cardData);
            });
        }
    }

    // 處理收集完成
    handleCollectionComplete(detail) {
        const { stage, data, nextStage } = detail;
        
        // 儲存階段資料
        this.collectedData[stage] = data;
        
        // 顯示完成回饋
        this.showStageCompleteAnimation();
        
        // 延遲跳轉到下一階段
        setTimeout(() => {
            if (nextStage && this.currentStage < this.stageNames.length - 1) {
                this.nextStage();
            } else {
                this.completeAllStages();
            }
        }, 1500);
    }

    // 處理驗證錯誤
    handleValidationError(detail) {
        const { message } = detail;
        this.showTemporaryMessage(message, 'error');
        
        // 震動效果
        this.shakeCurrentCard();
    }

    // 下一階段
    nextStage() {
        if (this.currentStage < this.stageNames.length - 1) {
            this.goToStage(this.currentStage + 1);
        }
    }

    // 上一階段
    previousStage() {
        if (this.currentStage > 0) {
            this.goToStage(this.currentStage - 1);
        }
    }

    // 完成所有階段
    completeAllStages() {
        this.showCompletionScreen();
    }

    // 顯示完成畫面
    showCompletionScreen() {
        // 隱藏遊戲容器
        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.classList.add('hidden');
        }
        
        // 顯示結果容器
        const resultsContainer = document.getElementById('results-container');
        if (resultsContainer) {
            resultsContainer.classList.remove('hidden');
            resultsContainer.classList.add('fade-in');
        }
        
        // 生成結果
        this.generateResults();
    }

    // 生成結果
    async generateResults() {
        try {
            // 解析需求
            const parsedData = this.requirementParser.parseRequirements(this.collectedData);
            
            // 生成輸出
            const outputs = this.outputGenerator.generateOutput(parsedData, ['all']);
            
            // 顯示結果摘要
            this.displayResultsSummary(parsedData, outputs);
            
            // 綁定下載事件
            this.bindDownloadEvents(outputs);
            
        } catch (error) {
            console.error('結果生成失敗:', error);
            this.handleError('結果生成失敗，請重試');
        }
    }

    // 顯示結果摘要
    displayResultsSummary(parsedData, outputs) {
        const summaryContainer = document.getElementById('results-summary');
        if (!summaryContainer) return;
        
        summaryContainer.innerHTML = `
            <div class="result-item">
                <h3>📋 專案類型</h3>
                <p>${parsedData.projectVision?.typeName || '未設定'}</p>
            </div>
            <div class="result-item">
                <h3>🎨 設計風格</h3>
                <p>${parsedData.designStyle?.visualStyle || '未設定'}</p>
            </div>
            <div class="result-item">
                <h3>⚡ 功能複雜度</h3>
                <p>${parsedData.features?.totalComplexity || '未評估'}</p>
            </div>
            <div class="result-item">
                <h3>🚀 預估時程</h3>
                <p>${parsedData.features?.estimatedTime?.realistic || '未評估'} 週</p>
            </div>
            <div class="result-item">
                <h3>📁 生成文件</h3>
                <p>${outputs.outputs?.length || 0} 個文件已準備就緒</p>
            </div>
        `;
    }

    // 綁定下載事件
    bindDownloadEvents(outputs) {
        const downloadJsonBtn = document.getElementById('download-json');
        const downloadMarkdownBtn = document.getElementById('download-markdown');
        
        if (downloadJsonBtn) {
            downloadJsonBtn.addEventListener('click', () => {
                this.outputGenerator.downloadSingle(outputs.outputs.find(o => o.type === 'json'));
            });
        }
        
        if (downloadMarkdownBtn) {
            downloadMarkdownBtn.addEventListener('click', () => {
                this.outputGenerator.downloadSingle(outputs.outputs.find(o => o.type === 'markdown'));
            });
        }
    }

    // 處理鍵盤事件
    handleKeyDown(event) {
        // ESC 鍵跳過打字效果
        if (event.key === 'Escape') {
            this.dialogueBox.skipTyping();
        }
        
        // 左右箭頭切換階段
        if (event.key === 'ArrowLeft' && event.ctrlKey) {
            this.previousStage();
        }
        
        if (event.key === 'ArrowRight' && event.ctrlKey) {
            this.nextStage();
        }
    }

    // 處理頁面關閉前
    handleBeforeUnload(event) {
        if (this.hasUnsavedData()) {
            event.preventDefault();
            event.returnValue = '你有未儲存的資料，確定要離開嗎？';
        }
    }

    // 檢查是否有未儲存資料
    hasUnsavedData() {
        return Object.keys(this.collectedData).length > 0;
    }

    // 儲存資料
    saveData() {
        try {
            const dataToSave = {
                collectedData: this.collectedData,
                currentStage: this.currentStage,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('vibe-coding-academy-data', JSON.stringify(dataToSave));
            
        } catch (error) {
            console.error('儲存資料失敗:', error);
        }
    }

    // 載入已儲存資料
    loadSavedData() {
        try {
            const savedData = localStorage.getItem('vibe-coding-academy-data');
            
            if (savedData) {
                const parsed = JSON.parse(savedData);
                this.collectedData = parsed.collectedData || {};
                this.currentStage = parsed.currentStage || 0;
                
                // 如果有儲存的資料，詢問是否繼續
                if (Object.keys(this.collectedData).length > 0) {
                    this.showContinueDialog();
                }
            }
            
        } catch (error) {
            console.error('載入資料失敗:', error);
        }
    }

    // 顯示繼續對話框
    showContinueDialog() {
        const continueDialogue = {
            title: '發現先前的進度',
            text: '我發現你之前有進行過需求收集，是否要繼續上次的進度？',
            mood: 'thinking',
            action: {
                text: '繼續上次進度',
                callback: () => this.continueFromSaved()
            }
        };
        
        this.dialogueBox.showDialogue(continueDialogue);
    }

    // 從儲存點繼續
    continueFromSaved() {
        this.goToStage(this.currentStage);
    }

    // 工具方法
    showButton(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.remove('hidden');
        }
    }

    hideButton(buttonId) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.add('hidden');
        }
    }

    updateButtonStates() {
        const nextBtn = document.getElementById('next-btn');
        const backBtn = document.getElementById('back-btn');
        
        if (backBtn) {
            backBtn.disabled = this.currentStage === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentStage === this.stageNames.length - 1;
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }

    showTemporaryMessage(message, type = 'info') {
        // 創建臨時訊息元素
        const messageEl = document.createElement('div');
        messageEl.className = `temporary-message message-${type}`;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // 3秒後移除
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }

    showStageCompleteAnimation() {
        this.progressBar.addCompletionAnimation();
    }

    shakeCurrentCard() {
        const selectedCards = this.cardManager.getSelectedCards();
        selectedCards.forEach(card => {
            if (card.element) {
                card.element.classList.add('shake');
                setTimeout(() => {
                    card.element.classList.remove('shake');
                }, 500);
            }
        });
    }

    validateCurrentData() {
        const collector = this.getCurrentCollector();
        if (collector) {
            const isValid = collector.validateCurrentStep();
            if (!isValid) {
                this.showValidationWarning();
            }
        }
    }

    showValidationWarning() {
        this.showTemporaryMessage('請完成當前步驟的選擇', 'warning');
    }

    handleError(message) {
        this.showTemporaryMessage(message, 'error');
        console.error('應用程式錯誤:', message);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 當 DOM 準備完成時啟動應用程式
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VibeCodingAcademy();
});

// 導出到全域
window.VibeCodingAcademy = VibeCodingAcademy;