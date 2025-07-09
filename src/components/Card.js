/**
 * Card.js - 遊戲化卡牌組件
 * 用於需求收集過程中的選項卡牌
 */

class Card {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.icon = data.icon;
        this.category = data.category;
        this.value = data.value;
        this.isSelected = false;
        this.isEnabled = true;
        this.element = null;
    }

    // 創建卡牌 DOM 元素
    createElement() {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-card-id', this.id);
        card.setAttribute('data-category', this.category);
        
        if (!this.isEnabled) {
            card.classList.add('card-disabled');
        }
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">${this.icon}</div>
                <div class="card-selected-indicator">✓</div>
            </div>
            <div class="card-content">
                <h3 class="card-title">${this.title}</h3>
                <p class="card-description">${this.description}</p>
            </div>
            <div class="card-footer">
                <div class="card-value" data-value="${this.value}"></div>
            </div>
        `;

        // 添加點擊事件
        card.addEventListener('click', () => {
            if (this.isEnabled) {
                this.toggle();
            }
        });

        // 添加鍵盤支援
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (this.isEnabled) {
                    this.toggle();
                }
            }
        });

        // 設置 tabindex 以支援鍵盤導航
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');

        this.element = card;
        return card;
    }

    // 切換選中狀態
    toggle() {
        this.isSelected = !this.isSelected;
        this.updateVisualState();
        this.dispatchSelectionEvent();
    }

    // 設置選中狀態
    setSelected(selected) {
        this.isSelected = selected;
        this.updateVisualState();
    }

    // 更新視覺狀態
    updateVisualState() {
        if (!this.element) return;

        if (this.isSelected) {
            this.element.classList.add('card-selected');
            this.element.setAttribute('aria-pressed', 'true');
        } else {
            this.element.classList.remove('card-selected');
            this.element.setAttribute('aria-pressed', 'false');
        }
    }

    // 啟用/禁用卡牌
    setEnabled(enabled) {
        this.isEnabled = enabled;
        if (!this.element) return;

        if (enabled) {
            this.element.classList.remove('card-disabled');
            this.element.setAttribute('tabindex', '0');
        } else {
            this.element.classList.add('card-disabled');
            this.element.setAttribute('tabindex', '-1');
            this.setSelected(false);
        }
    }

    // 發送選擇事件
    dispatchSelectionEvent() {
        const event = new CustomEvent('cardSelection', {
            detail: {
                card: this,
                cardId: this.id,
                category: this.category,
                value: this.value,
                isSelected: this.isSelected
            },
            bubbles: true
        });
        
        if (this.element) {
            this.element.dispatchEvent(event);
        }
    }

    // 添加動畫效果
    addAnimation(animationClass) {
        if (!this.element) return;
        
        this.element.classList.add(animationClass);
        
        // 動畫結束後移除類別
        this.element.addEventListener('animationend', () => {
            this.element.classList.remove(animationClass);
        }, { once: true });
    }

    // 獲取卡牌數據
    getData() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category,
            value: this.value,
            isSelected: this.isSelected
        };
    }

    // 銷毀卡牌
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// 卡牌管理器
class CardManager {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.cards = new Map();
        this.selectedCards = new Set();
        this.currentCategory = null;
        this.selectionMode = 'single'; // 'single' 或 'multiple'
    }

    // 添加卡牌
    addCard(cardData) {
        const card = new Card(cardData);
        this.cards.set(cardData.id, card);
        
        const cardElement = card.createElement();
        this.container.appendChild(cardElement);
        
        // 監聽卡牌選擇事件
        cardElement.addEventListener('cardSelection', (e) => {
            this.handleCardSelection(e.detail);
        });
        
        return card;
    }

    // 處理卡牌選擇
    handleCardSelection(detail) {
        const { cardId, isSelected, category } = detail;
        
        if (isSelected) {
            // 如果是單選模式，清除其他選擇
            if (this.selectionMode === 'single') {
                this.clearSelection(category);
            }
            
            this.selectedCards.add(cardId);
        } else {
            this.selectedCards.delete(cardId);
        }
        
        // 發送選擇變更事件
        this.dispatchSelectionChangeEvent();
    }

    // 清除選擇
    clearSelection(category = null) {
        this.cards.forEach((card) => {
            if (!category || card.category === category) {
                if (card.isSelected) {
                    card.setSelected(false);
                    this.selectedCards.delete(card.id);
                }
            }
        });
    }

    // 設置選擇模式
    setSelectionMode(mode) {
        this.selectionMode = mode;
    }

    // 獲取選中的卡牌
    getSelectedCards() {
        return Array.from(this.selectedCards).map(id => this.cards.get(id));
    }

    // 按類別獲取選中的卡牌
    getSelectedCardsByCategory(category) {
        return this.getSelectedCards().filter(card => card.category === category);
    }

    // 清空所有卡牌
    clear() {
        this.cards.forEach(card => card.destroy());
        this.cards.clear();
        this.selectedCards.clear();
        this.container.innerHTML = '';
    }

    // 發送選擇變更事件
    dispatchSelectionChangeEvent() {
        const event = new CustomEvent('selectionChange', {
            detail: {
                selectedCards: this.getSelectedCards(),
                selectedCount: this.selectedCards.size
            },
            bubbles: true
        });
        
        this.container.dispatchEvent(event);
    }

    // 根據類別顯示卡牌
    showCardsByCategory(category) {
        this.currentCategory = category;
        
        this.cards.forEach((card) => {
            if (card.category === category) {
                card.element.style.display = 'block';
                card.addAnimation('card-slide-in');
            } else {
                card.element.style.display = 'none';
            }
        });
    }
}

// 導出到全域
window.Card = Card;
window.CardManager = CardManager;