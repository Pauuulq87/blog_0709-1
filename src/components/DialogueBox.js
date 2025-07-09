/**
 * DialogueBox.js - 遊戲化對話框組件
 * 用於引導用戶進行需求收集的對話介面
 */

class DialogueBox {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.currentDialogue = null;
        this.isTyping = false;
        this.typingSpeed = 50; // 打字速度（毫秒）
        this.avatar = {
            default: '🎮',
            excited: '🎉',
            thinking: '🤔',
            success: '✅',
            warning: '⚠️'
        };
        this.currentMood = 'default';
        
        this.init();
    }

    // 初始化對話框
    init() {
        if (!this.container) return;
        
        this.createDialogueStructure();
        this.bindEvents();
    }

    // 創建對話框結構
    createDialogueStructure() {
        // 如果已有內容，保留現有結構
        if (this.container.querySelector('.dialogue-content')) {
            this.titleElement = this.container.querySelector('.dialogue-title');
            this.textElement = this.container.querySelector('.dialogue-text');
            this.avatarElement = this.container.querySelector('.avatar-img');
            return;
        }

        // 創建新的對話框結構
        this.container.innerHTML = `
            <div class="dialogue-avatar">
                <div class="avatar-img">${this.avatar.default}</div>
            </div>
            <div class="dialogue-content">
                <h3 class="dialogue-title">歡迎來到 Vibe Coding Academy</h3>
                <p class="dialogue-text">我是你的專屬導師，將引導你完成網站需求收集的旅程。</p>
                <div class="dialogue-actions">
                    <button class="dialogue-action-btn" style="display: none;">繼續</button>
                </div>
            </div>
        `;

        this.titleElement = this.container.querySelector('.dialogue-title');
        this.textElement = this.container.querySelector('.dialogue-text');
        this.avatarElement = this.container.querySelector('.avatar-img');
        this.actionButton = this.container.querySelector('.dialogue-action-btn');
    }

    // 綁定事件
    bindEvents() {
        if (this.actionButton) {
            this.actionButton.addEventListener('click', () => {
                this.handleActionClick();
            });
        }
    }

    // 顯示對話
    showDialogue(dialogueData) {
        this.currentDialogue = dialogueData;
        
        // 設置心情
        if (dialogueData.mood) {
            this.setMood(dialogueData.mood);
        }
        
        // 更新標題
        if (dialogueData.title) {
            this.updateTitle(dialogueData.title);
        }
        
        // 打字效果顯示文本
        if (dialogueData.text) {
            this.typeText(dialogueData.text);
        }
        
        // 顯示動作按鈕
        if (dialogueData.action) {
            this.showActionButton(dialogueData.action);
        } else {
            this.hideActionButton();
        }
        
        // 添加對話框動畫
        this.addAnimation('dialogue-appear');
    }

    // 設置導師心情
    setMood(mood) {
        this.currentMood = mood;
        if (this.avatarElement && this.avatar[mood]) {
            this.avatarElement.textContent = this.avatar[mood];
            this.avatarElement.className = `avatar-img avatar-${mood}`;
        }
    }

    // 更新標題
    updateTitle(title) {
        if (this.titleElement) {
            this.titleElement.textContent = title;
            this.titleElement.classList.add('title-update');
            
            setTimeout(() => {
                this.titleElement.classList.remove('title-update');
            }, 300);
        }
    }

    // 打字效果顯示文本
    typeText(text) {
        if (!this.textElement) return;
        
        this.isTyping = true;
        this.textElement.textContent = '';
        this.textElement.classList.add('typing');
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                this.textElement.textContent += text[index];
                index++;
            } else {
                clearInterval(typeInterval);
                this.isTyping = false;
                this.textElement.classList.remove('typing');
                this.dispatchTypingCompleteEvent();
            }
        }, this.typingSpeed);
    }

    // 立即顯示文本（跳過打字效果）
    showTextImmediately(text) {
        if (!this.textElement) return;
        
        this.isTyping = false;
        this.textElement.textContent = text;
        this.textElement.classList.remove('typing');
    }

    // 顯示動作按鈕
    showActionButton(actionData) {
        if (!this.actionButton) return;
        
        this.actionButton.textContent = actionData.text || '繼續';
        this.actionButton.style.display = 'inline-block';
        this.actionButton.onclick = () => {
            if (actionData.callback) {
                actionData.callback();
            }
            this.handleActionClick();
        };
        
        // 添加按鈕動畫
        this.actionButton.classList.add('btn-appear');
        setTimeout(() => {
            this.actionButton.classList.remove('btn-appear');
        }, 300);
    }

    // 隱藏動作按鈕
    hideActionButton() {
        if (this.actionButton) {
            this.actionButton.style.display = 'none';
        }
    }

    // 處理動作按鈕點擊
    handleActionClick() {
        this.dispatchActionEvent();
    }

    // 添加動畫效果
    addAnimation(animationClass) {
        this.container.classList.add(animationClass);
        
        setTimeout(() => {
            this.container.classList.remove(animationClass);
        }, 500);
    }

    // 顯示思考狀態
    showThinking(message = '讓我想想...') {
        this.setMood('thinking');
        this.typeText(message);
        
        // 添加思考動畫
        this.avatarElement.classList.add('thinking-animation');
    }

    // 停止思考狀態
    stopThinking() {
        this.avatarElement.classList.remove('thinking-animation');
    }

    // 顯示成功訊息
    showSuccess(message, callback) {
        this.setMood('success');
        this.typeText(message);
        
        if (callback) {
            setTimeout(callback, 2000);
        }
    }

    // 顯示警告訊息
    showWarning(message, callback) {
        this.setMood('warning');
        this.typeText(message);
        
        if (callback) {
            setTimeout(callback, 2000);
        }
    }

    // 發送打字完成事件
    dispatchTypingCompleteEvent() {
        const event = new CustomEvent('typingComplete', {
            detail: {
                dialogue: this.currentDialogue
            },
            bubbles: true
        });
        
        this.container.dispatchEvent(event);
    }

    // 發送動作事件
    dispatchActionEvent() {
        const event = new CustomEvent('dialogueAction', {
            detail: {
                dialogue: this.currentDialogue,
                action: this.currentDialogue?.action
            },
            bubbles: true
        });
        
        this.container.dispatchEvent(event);
    }

    // 重置對話框
    reset() {
        this.currentDialogue = null;
        this.isTyping = false;
        this.setMood('default');
        this.updateTitle('Vibe Coding Academy');
        this.showTextImmediately('準備開始新的需求收集旅程...');
        this.hideActionButton();
    }

    // 設置打字速度
    setTypingSpeed(speed) {
        this.typingSpeed = speed;
    }

    // 跳過打字效果
    skipTyping() {
        if (this.isTyping && this.currentDialogue?.text) {
            this.showTextImmediately(this.currentDialogue.text);
        }
    }
}

// 對話框管理器
class DialogueManager {
    constructor() {
        this.dialogues = new Map();
        this.currentStage = 0;
        this.dialogueSequence = [];
    }

    // 註冊對話框
    registerDialogue(id, dialogueBox) {
        this.dialogues.set(id, dialogueBox);
    }

    // 設置對話序列
    setDialogueSequence(sequence) {
        this.dialogueSequence = sequence;
        this.currentStage = 0;
    }

    // 顯示當前階段對話
    showCurrentDialogue() {
        if (this.currentStage < this.dialogueSequence.length) {
            const dialogueData = this.dialogueSequence[this.currentStage];
            const dialogueBox = this.dialogues.get('main');
            
            if (dialogueBox && dialogueData) {
                dialogueBox.showDialogue(dialogueData);
            }
        }
    }

    // 下一個對話
    nextDialogue() {
        this.currentStage++;
        this.showCurrentDialogue();
    }

    // 上一個對話
    previousDialogue() {
        if (this.currentStage > 0) {
            this.currentStage--;
            this.showCurrentDialogue();
        }
    }

    // 跳轉到指定階段
    goToStage(stage) {
        if (stage >= 0 && stage < this.dialogueSequence.length) {
            this.currentStage = stage;
            this.showCurrentDialogue();
        }
    }

    // 獲取當前階段
    getCurrentStage() {
        return this.currentStage;
    }

    // 重置到開始
    reset() {
        this.currentStage = 0;
        this.showCurrentDialogue();
    }
}

// 導出到全域
window.DialogueBox = DialogueBox;
window.DialogueManager = DialogueManager;