/**
 * Puppeteer 自動化測試腳本
 * 用於診斷 Vibe Coding Academy 網站問題
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class VibeCodingAcademyTester {
    constructor() {
        this.browser = null;
        this.page = null;
        this.testResults = {
            timestamp: new Date().toISOString(),
            url: 'http://localhost:8000',
            errors: [],
            warnings: [],
            performance: {},
            screenshots: [],
            domAnalysis: {},
            jsExecution: {}
        };
    }

    async init() {
        console.log('🚀 啟動 Puppeteer 瀏覽器...');
        try {
            this.browser = await puppeteer.launch({
                headless: false, // 顯示瀏覽器視窗以便觀察
                devtools: false, // 暫時關閉開發者工具避免問題
                slowMo: 50,      // 減慢操作速度
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor'
                ]
            });
        } catch (error) {
            console.log(`❌ 瀏覽器啟動失敗: ${error.message}`);
            throw error;
        }
        
        this.page = await this.browser.newPage();
        
        // 設定視窗大小
        await this.page.setViewport({ width: 1280, height: 720 });
        
        // 監聽控制台訊息
        this.page.on('console', (msg) => {
            const type = msg.type();
            const text = msg.text();
            
            console.log(`[瀏覽器 ${type.toUpperCase()}]: ${text}`);
            
            if (type === 'error') {
                this.testResults.errors.push({
                    type: 'console_error',
                    message: text,
                    timestamp: new Date().toISOString()
                });
            } else if (type === 'warning') {
                this.testResults.warnings.push({
                    type: 'console_warning', 
                    message: text,
                    timestamp: new Date().toISOString()
                });
            }
        });
        
        // 監聽頁面錯誤
        this.page.on('pageerror', (error) => {
            console.log(`[頁面錯誤]: ${error.message}`);
            this.testResults.errors.push({
                type: 'page_error',
                message: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString()
            });
        });
        
        // 監聽請求失敗
        this.page.on('requestfailed', (request) => {
            console.log(`[請求失敗]: ${request.url()} - ${request.failure().errorText}`);
            this.testResults.errors.push({
                type: 'request_failed',
                url: request.url(),
                error: request.failure().errorText,
                timestamp: new Date().toISOString()
            });
        });
    }

    async loadWebsite() {
        console.log('📄 載入網站...');
        const startTime = Date.now();
        
        try {
            // 先嘗試簡單載入
            await this.page.goto('http://localhost:8000', {
                waitUntil: 'domcontentloaded',
                timeout: 15000
            });
            
            // 等待一些時間讓 JavaScript 執行
            await this.page.waitForTimeout(3000);
            
            const loadTime = Date.now() - startTime;
            this.testResults.performance.loadTime = loadTime;
            console.log(`✅ 網站載入完成，耗時: ${loadTime}ms`);
            
        } catch (error) {
            console.log(`❌ 網站載入失敗: ${error.message}`);
            this.testResults.errors.push({
                type: 'page_load_error',
                message: error.message,
                timestamp: new Date().toISOString()
            });
            
            // 嘗試重新載入
            try {
                console.log('🔄 嘗試重新載入...');
                await this.page.goto('http://localhost:8000', {
                    waitUntil: 'load',
                    timeout: 10000
                });
                console.log('✅ 重新載入成功');
            } catch (retryError) {
                console.log(`❌ 重新載入也失敗: ${retryError.message}`);
            }
        }
    }

    async analyzeDOM() {
        console.log('🔍 分析 DOM 結構...');
        
        try {
            // 檢查關鍵元素是否存在
            const elements = await this.page.evaluate(() => {
                const checkElement = (selector, name) => {
                    const element = document.querySelector(selector);
                    return {
                        selector,
                        name,
                        exists: !!element,
                        visible: element ? !element.hidden && 
                                           getComputedStyle(element).display !== 'none' &&
                                           getComputedStyle(element).visibility !== 'hidden' : false,
                        classList: element ? Array.from(element.classList) : [],
                        innerHTML: element ? element.innerHTML.substring(0, 200) : null
                    };
                };
                
                return {
                    loadingScreen: checkElement('#loading-screen', 'Loading Screen'),
                    gameContainer: checkElement('#game-container', 'Game Container'),
                    dialogueBox: checkElement('#dialogue-box', 'Dialogue Box'),
                    progressBar: checkElement('.progress-bar-container', 'Progress Bar'),
                    cardContainer: checkElement('#card-container', 'Card Container'),
                    startBtn: checkElement('#start-btn', 'Start Button'),
                    appContainer: checkElement('#app', 'App Container')
                };
            });
            
            this.testResults.domAnalysis = elements;
            
            // 輸出分析結果
            console.log('\n📊 DOM 元素分析結果:');
            Object.entries(elements).forEach(([key, element]) => {
                const status = element.exists ? 
                    (element.visible ? '✅ 存在且可見' : '⚠️ 存在但隱藏') : 
                    '❌ 不存在';
                console.log(`  ${element.name}: ${status}`);
                if (element.classList.length > 0) {
                    console.log(`    CSS Classes: ${element.classList.join(', ')}`);
                }
            });
            
        } catch (error) {
            console.log(`❌ DOM 分析失敗: ${error.message}`);
            this.testResults.errors.push({
                type: 'dom_analysis_error',
                message: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    async checkJavaScriptExecution() {
        console.log('🔧 檢查 JavaScript 執行狀況...');
        
        try {
            const jsStatus = await this.page.evaluate(() => {
                return {
                    // 檢查全域變數
                    windowApp: typeof window.app,
                    vibeCodingAcademy: typeof window.VibeCodingAcademy,
                    
                    // 檢查組件類別
                    dialogueBox: typeof window.DialogueBox,
                    progressBar: typeof window.ProgressBar,
                    cardManager: typeof window.CardManager,
                    
                    // 檢查收集器類別
                    projectTypeCollector: typeof window.ProjectTypeCollector,
                    designStyleCollector: typeof window.DesignStyleCollector,
                    featureCollector: typeof window.FeatureCollector,
                    techStackCollector: typeof window.TechStackCollector,
                    deploymentCollector: typeof window.DeploymentCollector,
                    
                    // 檢查工具類別
                    requirementParser: typeof window.RequirementParser,
                    outputGenerator: typeof window.OutputGenerator,
                    validationHelper: typeof window.ValidationHelper,
                    
                    // 檢查 app 實例
                    appInstance: window.app ? {
                        isInitialized: window.app.isInitialized,
                        currentStage: window.app.currentStage,
                        hasCollectors: !!window.app.collectors
                    } : null
                };
            });
            
            this.testResults.jsExecution = jsStatus;
            
            console.log('\n🔧 JavaScript 執行狀況:');
            console.log(`  App Instance: ${jsStatus.windowApp}`);
            console.log(`  VibeCodingAcademy Class: ${jsStatus.vibeCodingAcademy}`);
            console.log(`  Components: DialogueBox(${jsStatus.dialogueBox}), ProgressBar(${jsStatus.progressBar}), CardManager(${jsStatus.cardManager})`);
            console.log(`  Collectors: ProjectType(${jsStatus.projectTypeCollector}), DesignStyle(${jsStatus.designStyleCollector}), Feature(${jsStatus.featureCollector})`);
            console.log(`  Tools: Parser(${jsStatus.requirementParser}), Generator(${jsStatus.outputGenerator}), Validator(${jsStatus.validationHelper})`);
            
            if (jsStatus.appInstance) {
                console.log(`  App Status: Initialized(${jsStatus.appInstance.isInitialized}), Stage(${jsStatus.appInstance.currentStage})`);
            }
            
        } catch (error) {
            console.log(`❌ JavaScript 執行檢查失敗: ${error.message}`);
            this.testResults.errors.push({
                type: 'js_execution_error',
                message: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    async takeScreenshot(name = 'screenshot') {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `${name}_${timestamp}.png`;
            const filepath = path.join(__dirname, 'screenshots', filename);
            
            // 確保 screenshots 目錄存在
            const screenshotDir = path.join(__dirname, 'screenshots');
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }
            
            await this.page.screenshot({ 
                path: filepath,
                fullPage: true 
            });
            
            this.testResults.screenshots.push({
                name,
                filename,
                filepath,
                timestamp: new Date().toISOString()
            });
            
            console.log(`📸 截圖已儲存: ${filename}`);
            
        } catch (error) {
            console.log(`❌ 截圖失敗: ${error.message}`);
        }
    }

    async waitForElement(selector, timeout = 5000) {
        try {
            await this.page.waitForSelector(selector, { timeout });
            return true;
        } catch (error) {
            console.log(`⏰ 等待元素超時: ${selector}`);
            return false;
        }
    }

    async testUserInteraction() {
        console.log('🖱️ 測試使用者互動...');
        
        // 檢查開始按鈕是否存在且可點擊
        const startBtnExists = await this.waitForElement('#start-btn', 2000);
        
        if (startBtnExists) {
            try {
                console.log('🎯 嘗試點擊開始按鈕...');
                await this.page.click('#start-btn');
                await this.page.waitForTimeout(2000); // 等待反應
                
                // 檢查是否有變化
                const afterClick = await this.page.evaluate(() => {
                    const loadingScreen = document.querySelector('#loading-screen');
                    const gameContainer = document.querySelector('#game-container');
                    
                    return {
                        loadingHidden: loadingScreen ? loadingScreen.classList.contains('hidden') : false,
                        gameVisible: gameContainer ? !gameContainer.classList.contains('hidden') : false
                    };
                });
                
                console.log(`  Loading Screen Hidden: ${afterClick.loadingHidden}`);
                console.log(`  Game Container Visible: ${afterClick.gameVisible}`);
                
            } catch (error) {
                console.log(`❌ 點擊開始按鈕失敗: ${error.message}`);
                this.testResults.errors.push({
                    type: 'interaction_error',
                    message: `Failed to click start button: ${error.message}`,
                    timestamp: new Date().toISOString()
                });
            }
        } else {
            console.log('❌ 找不到開始按鈕');
        }
    }

    async generateReport() {
        console.log('📋 生成測試報告...');
        
        const reportPath = path.join(__dirname, 'test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(this.testResults, null, 2));
        
        console.log(`\n📊 測試報告摘要:`);
        console.log(`  錯誤數量: ${this.testResults.errors.length}`);
        console.log(`  警告數量: ${this.testResults.warnings.length}`);
        console.log(`  載入時間: ${this.testResults.performance.loadTime}ms`);
        console.log(`  截圖數量: ${this.testResults.screenshots.length}`);
        console.log(`  報告位置: ${reportPath}`);
        
        if (this.testResults.errors.length > 0) {
            console.log('\n❌ 發現的主要錯誤:');
            this.testResults.errors.forEach((error, index) => {
                console.log(`  ${index + 1}. [${error.type}] ${error.message}`);
            });
        }
    }

    async runFullTest() {
        try {
            await this.init();
            await this.takeScreenshot('01_initial');
            
            await this.loadWebsite();
            await this.takeScreenshot('02_after_load');
            
            await this.analyzeDOM();
            await this.checkJavaScriptExecution();
            
            await this.testUserInteraction();
            await this.takeScreenshot('03_after_interaction');
            
            await this.generateReport();
            
        } catch (error) {
            console.log(`❌ 測試過程中發生錯誤: ${error.message}`);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}

// 執行測試
async function runTest() {
    const tester = new VibeCodingAcademyTester();
    await tester.runFullTest();
}

// 如果直接執行這個檔案
if (require.main === module) {
    runTest().catch(console.error);
}

module.exports = VibeCodingAcademyTester;