/**
 * ProgressBar.js - 進度條組件
 * 用於顯示需求收集的進度
 */

class ProgressBar {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.progressBar = null;
        this.progressText = null;
        this.currentProgress = 0;
        this.maxProgress = 5; // 五個階段
        this.stageNames = [
            '專案願景',
            '設計風格',
            '功能需求',
            '技術架構',
            '規格確認'
        ];
        this.isAnimating = false;
        
        this.init();
    }

    // 初始化進度條
    init() {
        if (!this.container) return;
        
        this.createProgressStructure();
        this.bindEvents();
    }

    // 創建進度條結構
    createProgressStructure() {
        // 如果已有進度條結構，直接獲取元素
        if (this.container.querySelector('.progress-bar')) {
            this.progressBar = this.container.querySelector('.progress-bar');
            this.progressText = this.container.querySelector('.progress-text');
            this.progressFill = this.container.querySelector('.progress-fill');
            this.progressPercentage = this.container.querySelector('.progress-percentage');
            this.stages = this.container.querySelectorAll('.progress-stage');
            
            // 如果沒有完整結構，重新創建
            if (!this.progressFill || !this.progressPercentage) {
                this.createFullStructure();
            }
            return;
        }
        
        this.createFullStructure();
    }
    
    // 創建完整的進度條結構
    createFullStructure() {
        // 創建新的進度條結構
        this.container.innerHTML = `
            <div class="progress-bar-wrapper">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                    <div class="progress-stages">
                        ${this.stageNames.map((name, index) => `
                            <div class="progress-stage" data-stage="${index}">
                                <div class="stage-dot"></div>
                                <div class="stage-label">${name}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="progress-info">
                    <span class="progress-text">0 / ${this.maxProgress}</span>
                    <span class="progress-percentage">0%</span>
                </div>
            </div>
        `;

        this.progressBar = this.container.querySelector('.progress-bar');
        this.progressText = this.container.querySelector('.progress-text');
        this.progressFill = this.container.querySelector('.progress-fill');
        this.progressPercentage = this.container.querySelector('.progress-percentage');
        this.stages = this.container.querySelectorAll('.progress-stage');
    }

    // 綁定事件
    bindEvents() {
        // 為每個階段添加點擊事件
        this.stages.forEach((stage, index) => {
            stage.addEventListener('click', () => {
                this.handleStageClick(index);
            });
        });
    }

    // 設置進度
    setProgress(progress, animate = true) {
        if (this.isAnimating && animate) return;
        
        // 確保進度在有效範圍內
        progress = Math.max(0, Math.min(progress, this.maxProgress));
        
        if (animate) {
            this.animateProgress(this.currentProgress, progress);
        } else {
            this.updateProgress(progress);
        }
        
        this.currentProgress = progress;
    }

    // 更新進度顯示
    updateProgress(progress) {
        const percentage = (progress / this.maxProgress) * 100;
        
        // 更新進度條填充
        if (this.progressFill) {
            this.progressFill.style.width = `${percentage}%`;
        }
        
        // 更新文字顯示
        if (this.progressText) {
            this.progressText.textContent = `${progress} / ${this.maxProgress}`;
        }
        
        if (this.progressPercentage) {
            this.progressPercentage.textContent = `${Math.round(percentage)}%`;
        }
        
        // 更新階段狀態
        this.updateStageStates(progress);
    }

    // 動畫更新進度
    animateProgress(fromProgress, toProgress) {
        this.isAnimating = true;
        
        const duration = 800; // 動畫持續時間
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用緩動函數
            const easeProgress = this.easeOutCubic(progress);
            const currentValue = fromProgress + (toProgress - fromProgress) * easeProgress;
            
            this.updateProgress(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
                this.dispatchProgressChangeEvent();
            }
        };
        
        requestAnimationFrame(animate);
    }

    // 緩動函數
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // 更新階段狀態
    updateStageStates(progress) {
        this.stages.forEach((stage, index) => {
            const stageProgress = index + 1;
            
            if (stageProgress <= progress) {
                stage.classList.add('stage-completed');
                stage.classList.remove('stage-current', 'stage-pending');
            } else if (stageProgress === Math.floor(progress) + 1) {
                stage.classList.add('stage-current');
                stage.classList.remove('stage-completed', 'stage-pending');
            } else {
                stage.classList.add('stage-pending');
                stage.classList.remove('stage-completed', 'stage-current');
            }
        });
    }

    // 下一個階段
    nextStage() {
        const nextProgress = Math.min(this.currentProgress + 1, this.maxProgress);
        this.setProgress(nextProgress);
    }

    // 上一個階段
    previousStage() {
        const prevProgress = Math.max(this.currentProgress - 1, 0);
        this.setProgress(prevProgress);
    }

    // 跳轉到指定階段
    goToStage(stage) {
        if (stage >= 0 && stage <= this.maxProgress) {
            this.setProgress(stage);
        }
    }

    // 處理階段點擊
    handleStageClick(stageIndex) {
        this.dispatchStageClickEvent(stageIndex);
    }

    // 設置階段名稱
    setStageNames(names) {
        this.stageNames = names;
        this.maxProgress = names.length;
        
        // 重新創建進度條
        this.createProgressStructure();
    }

    // 獲取當前階段名稱
    getCurrentStageName() {
        const stageIndex = Math.floor(this.currentProgress);
        return this.stageNames[stageIndex] || '';
    }

    // 獲取當前進度
    getCurrentProgress() {
        return this.currentProgress;
    }

    // 獲取進度百分比
    getProgressPercentage() {
        return (this.currentProgress / this.maxProgress) * 100;
    }

    // 重置進度
    reset() {
        this.setProgress(0, false);
    }

    // 完成所有階段
    complete() {
        this.setProgress(this.maxProgress);
        this.addCompletionAnimation();
    }

    // 添加完成動畫
    addCompletionAnimation() {
        if (this.progressBar) {
            this.progressBar.classList.add('progress-complete');
            
            setTimeout(() => {
                this.progressBar.classList.remove('progress-complete');
            }, 2000);
        }
    }

    // 設置進度條顏色主題
    setTheme(theme) {
        this.container.className = `progress-bar-container theme-${theme}`;
    }

    // 顯示進度詳情
    showProgressDetails(details) {
        // 可以在這裡添加詳細資訊的顯示
        console.log('Progress details:', details);
    }

    // 發送進度變更事件
    dispatchProgressChangeEvent() {
        const event = new CustomEvent('progressChange', {
            detail: {
                progress: this.currentProgress,
                maxProgress: this.maxProgress,
                percentage: this.getProgressPercentage(),
                stageName: this.getCurrentStageName()
            },
            bubbles: true
        });
        
        this.container.dispatchEvent(event);
    }

    // 發送階段點擊事件
    dispatchStageClickEvent(stageIndex) {
        const event = new CustomEvent('stageClick', {
            detail: {
                stageIndex: stageIndex,
                stageName: this.stageNames[stageIndex],
                currentProgress: this.currentProgress
            },
            bubbles: true
        });
        
        this.container.dispatchEvent(event);
    }
}

// 進度管理器
class ProgressManager {
    constructor() {
        this.progressBars = new Map();
        this.globalProgress = 0;
        this.milestones = [];
    }

    // 註冊進度條
    registerProgressBar(id, progressBar) {
        this.progressBars.set(id, progressBar);
    }

    // 同步所有進度條
    syncAllProgressBars(progress) {
        this.progressBars.forEach((progressBar) => {
            progressBar.setProgress(progress);
        });
        
        this.globalProgress = progress;
    }

    // 添加里程碑
    addMilestone(progress, description) {
        this.milestones.push({ progress, description });
    }

    // 檢查里程碑
    checkMilestones(progress) {
        return this.milestones.filter(milestone => 
            milestone.progress === progress
        );
    }

    // 獲取總體進度
    getGlobalProgress() {
        return this.globalProgress;
    }

    // 重置所有進度
    resetAll() {
        this.progressBars.forEach((progressBar) => {
            progressBar.reset();
        });
        
        this.globalProgress = 0;
    }
}

// 導出到全域
window.ProgressBar = ProgressBar;
window.ProgressManager = ProgressManager;