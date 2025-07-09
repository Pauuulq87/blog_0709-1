/**
 * TechStackCollector.js - 技術棧收集器
 * 第四階段：收集技術偏好並翻譯為具體技術方案
 */

class TechStackCollector {
    constructor() {
        this.collectedData = {
            contentManagement: null,
            deploymentMaintenance: null,
            performanceBudget: null,
            scalabilitySecurity: null,
            hostingPreference: null
        };
        
        this.contentManagementOptions = [
            {
                id: 'cms_backend',
                title: '簡單易用的後台',
                description: '想要一個直觀的管理介面，輕鬆編輯內容',
                icon: '🎛️',
                category: 'content_management',
                value: 'cms_backend',
                techSpecs: {
                    solutions: ['WordPress', 'Strapi', 'Contentful', 'Ghost'],
                    complexity: 'low',
                    cost: 'medium'
                }
            },
            {
                id: 'code_based',
                title: '純程式碼管理',
                description: '我習慣直接編輯程式碼檔案，不需要管理介面',
                icon: '💻',
                category: 'content_management',
                value: 'code_based',
                techSpecs: {
                    solutions: ['Markdown + Git', 'MDX', 'Static Site Generators'],
                    complexity: 'medium',
                    cost: 'low'
                }
            },
            {
                id: 'external_platform',
                title: '外部平台整合',
                description: '希望整合既有的內容管理平台或服務',
                icon: '🔗',
                category: 'content_management',
                value: 'external_platform',
                techSpecs: {
                    solutions: ['Notion API', 'Airtable', 'Google Sheets', 'Headless CMS'],
                    complexity: 'medium',
                    cost: 'variable'
                }
            },
            {
                id: 'hybrid_approach',
                title: '混合管理方式',
                description: '結合多種方式，靈活管理不同類型的內容',
                icon: '🔄',
                category: 'content_management',
                value: 'hybrid_approach',
                techSpecs: {
                    solutions: ['Next.js + CMS', 'Gatsby + Strapi', 'Nuxt + Contentful'],
                    complexity: 'high',
                    cost: 'medium'
                }
            }
        ];
        
        this.deploymentMaintenanceOptions = [
            {
                id: 'one_click_deploy',
                title: '一鍵部署',
                description: '希望能夠輕鬆部署，不需要複雜的設定',
                icon: '🚀',
                category: 'deployment_maintenance',
                value: 'one_click_deploy',
                techSpecs: {
                    solutions: ['Vercel', 'Netlify', 'GitHub Pages', 'Heroku'],
                    complexity: 'low',
                    cost: 'low'
                }
            },
            {
                id: 'auto_update',
                title: '自動更新',
                description: '內容更新後自動重新部署，無需手動操作',
                icon: '🔄',
                category: 'deployment_maintenance',
                value: 'auto_update',
                techSpecs: {
                    solutions: ['CI/CD Pipeline', 'GitHub Actions', 'GitLab CI', 'Jenkins'],
                    complexity: 'medium',
                    cost: 'medium'
                }
            },
            {
                id: 'manual_control',
                title: '手動管理',
                description: '我想要完全控制部署流程和時機',
                icon: '⚙️',
                category: 'deployment_maintenance',
                value: 'manual_control',
                techSpecs: {
                    solutions: ['Docker', 'VPS', 'AWS EC2', 'Custom Server'],
                    complexity: 'high',
                    cost: 'variable'
                }
            },
            {
                id: 'scheduled_updates',
                title: '定時更新',
                description: '希望能夠設定定時更新，保持內容新鮮',
                icon: '⏰',
                category: 'deployment_maintenance',
                value: 'scheduled_updates',
                techSpecs: {
                    solutions: ['Cron Jobs', 'GitHub Actions Scheduler', 'AWS Lambda'],
                    complexity: 'medium',
                    cost: 'low'
                }
            }
        ];
        
        this.performanceBudgetOptions = [
            {
                id: 'ultra_fast',
                title: '極速載入',
                description: '希望網站載入速度非常快，使用者體驗優先',
                icon: '⚡',
                category: 'performance_budget',
                value: 'ultra_fast',
                techSpecs: {
                    solutions: ['Static Site', 'CDN', 'Image Optimization', 'Lazy Loading'],
                    complexity: 'medium',
                    cost: 'medium'
                }
            },
            {
                id: 'moderate_speed',
                title: '中等速度',
                description: '載入速度適中，平衡功能和效能',
                icon: '🎯',
                category: 'performance_budget',
                value: 'moderate_speed',
                techSpecs: {
                    solutions: ['SSR', 'Code Splitting', 'Caching', 'Optimized Images'],
                    complexity: 'medium',
                    cost: 'medium'
                }
            },
            {
                id: 'functionality_first',
                title: '功能優先',
                description: '重視功能完整性，速度是次要考量',
                icon: '🔧',
                category: 'performance_budget',
                value: 'functionality_first',
                techSpecs: {
                    solutions: ['SPA', 'Rich Interactions', 'Full-Featured CMS'],
                    complexity: 'high',
                    cost: 'high'
                }
            },
            {
                id: 'budget_conscious',
                title: '預算考量',
                description: '成本控制優先，在預算內達到最佳效能',
                icon: '💰',
                category: 'performance_budget',
                value: 'budget_conscious',
                techSpecs: {
                    solutions: ['Free Hosting', 'Minimal Dependencies', 'Static Generation'],
                    complexity: 'low',
                    cost: 'low'
                }
            }
        ];
        
        this.scalabilitySecurityOptions = [
            {
                id: 'current_needs',
                title: '滿足現況',
                description: '目前的規模夠用，不需要考慮大量擴展',
                icon: '📏',
                category: 'scalability_security',
                value: 'current_needs',
                techSpecs: {
                    solutions: ['Simple Hosting', 'Basic Security', 'Minimal Architecture'],
                    complexity: 'low',
                    cost: 'low'
                }
            },
            {
                id: 'future_growth',
                title: '未來成長',
                description: '希望能夠隨著需求增長而擴展',
                icon: '📈',
                category: 'scalability_security',
                value: 'future_growth',
                techSpecs: {
                    solutions: ['Microservices', 'Load Balancing', 'Database Scaling'],
                    complexity: 'medium',
                    cost: 'medium'
                }
            },
            {
                id: 'high_scalability',
                title: '高度可擴展',
                description: '需要支援大量使用者和高併發',
                icon: '🚀',
                category: 'scalability_security',
                value: 'high_scalability',
                techSpecs: {
                    solutions: ['Cloud Native', 'Kubernetes', 'CDN', 'Auto Scaling'],
                    complexity: 'high',
                    cost: 'high'
                }
            },
            {
                id: 'security_focus',
                title: '安全重點',
                description: '安全性是首要考量，需要完整的安全措施',
                icon: '🔐',
                category: 'scalability_security',
                value: 'security_focus',
                techSpecs: {
                    solutions: ['HTTPS', 'Authentication', 'Input Validation', 'Security Headers'],
                    complexity: 'medium',
                    cost: 'medium'
                }
            }
        ];
        
        this.hostingPreferenceOptions = [
            {
                id: 'free_hosting',
                title: '免費主機',
                description: '使用免費的主機服務，適合個人專案',
                icon: '🆓',
                category: 'hosting_preference',
                value: 'free_hosting',
                techSpecs: {
                    solutions: ['GitHub Pages', 'Netlify Free', 'Vercel Free', 'Firebase Hosting'],
                    complexity: 'low',
                    cost: 'free'
                }
            },
            {
                id: 'shared_hosting',
                title: '共享主機',
                description: '經濟實惠的共享主機方案',
                icon: '🏠',
                category: 'hosting_preference',
                value: 'shared_hosting',
                techSpecs: {
                    solutions: ['cPanel Hosting', 'WordPress Hosting', 'Shared VPS'],
                    complexity: 'low',
                    cost: 'low'
                }
            },
            {
                id: 'cloud_hosting',
                title: '雲端主機',
                description: '使用雲端服務，彈性且可擴展',
                icon: '☁️',
                category: 'hosting_preference',
                value: 'cloud_hosting',
                techSpecs: {
                    solutions: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean'],
                    complexity: 'medium',
                    cost: 'medium'
                }
            },
            {
                id: 'dedicated_server',
                title: '專屬伺服器',
                description: '完全控制的專屬伺服器環境',
                icon: '🖥️',
                category: 'hosting_preference',
                value: 'dedicated_server',
                techSpecs: {
                    solutions: ['VPS', 'Dedicated Server', 'Bare Metal'],
                    complexity: 'high',
                    cost: 'high'
                }
            }
        ];
        
        this.currentStep = 'content_management';
        this.stepOrder = ['content_management', 'deployment_maintenance', 'performance_budget', 'scalability_security', 'hosting_preference'];
        this.currentStepIndex = 0;
    }

    // 獲取當前步驟的卡牌資料
    getCurrentStepCards() {
        switch (this.currentStep) {
            case 'content_management':
                return this.contentManagementOptions;
            case 'deployment_maintenance':
                return this.deploymentMaintenanceOptions;
            case 'performance_budget':
                return this.performanceBudgetOptions;
            case 'scalability_security':
                return this.scalabilitySecurityOptions;
            case 'hosting_preference':
                return this.hostingPreferenceOptions;
            default:
                return [];
        }
    }

    // 獲取當前步驟的對話內容
    getCurrentStepDialogue() {
        const dialogues = {
            content_management: {
                title: '內容管理方式',
                text: '讓我們先了解你希望如何管理網站內容。不同的管理方式會影響後續的技術選擇。',
                mood: 'thinking',
                action: {
                    text: '選好了',
                    callback: () => this.validateCurrentStep()
                }
            },
            deployment_maintenance: {
                title: '部署與維護',
                text: '接下來決定網站的部署方式。這會影響你日後更新內容的便利性。',
                mood: 'default',
                action: {
                    text: '繼續',
                    callback: () => this.validateCurrentStep()
                }
            },
            performance_budget: {
                title: '效能與預算',
                text: '平衡效能需求和預算考量。不同的選擇會影響技術架構的複雜度。',
                mood: 'thinking',
                action: {
                    text: '下一步',
                    callback: () => this.validateCurrentStep()
                }
            },
            scalability_security: {
                title: '擴展性與安全性',
                text: '考慮未來的發展需求。這將決定技術架構的規劃方向。',
                mood: 'default',
                action: {
                    text: '繼續',
                    callback: () => this.validateCurrentStep()
                }
            },
            hosting_preference: {
                title: '主機偏好',
                text: '最後選擇適合的主機方案。這會影響整體的成本和管理複雜度。',
                mood: 'excited',
                action: {
                    text: '完成技術分析',
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
            case 'content_management':
                this.collectedData.contentManagement = value;
                break;
            case 'deployment_maintenance':
                this.collectedData.deploymentMaintenance = value;
                break;
            case 'performance_budget':
                this.collectedData.performanceBudget = value;
                break;
            case 'scalability_security':
                this.collectedData.scalabilitySecurity = value;
                break;
            case 'hosting_preference':
                this.collectedData.hostingPreference = value;
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
            case 'content_management':
                return this.collectedData.contentManagement !== null;
            case 'deployment_maintenance':
                return this.collectedData.deploymentMaintenance !== null;
            case 'performance_budget':
                return this.collectedData.performanceBudget !== null;
            case 'scalability_security':
                return this.collectedData.scalabilitySecurity !== null;
            case 'hosting_preference':
                return this.collectedData.hostingPreference !== null;
            default:
                return false;
        }
    }

    // 顯示驗證錯誤
    showValidationError() {
        const errorMessages = {
            content_management: '請選擇內容管理方式',
            deployment_maintenance: '請選擇部署與維護方式',
            performance_budget: '請選擇效能與預算偏好',
            scalability_security: '請選擇擴展性與安全性需求',
            hosting_preference: '請選擇主機偏好'
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
        return this.collectedData.contentManagement !== null &&
               this.collectedData.deploymentMaintenance !== null &&
               this.collectedData.performanceBudget !== null &&
               this.collectedData.scalabilitySecurity !== null &&
               this.collectedData.hostingPreference !== null;
    }

    // 獲取收集到的資料
    getCollectedData() {
        return {
            ...this.collectedData,
            timestamp: new Date().toISOString(),
            stage: 'tech_stack'
        };
    }

    // 技術翻譯功能：將用戶選擇翻譯為具體技術方案
    translateToTechStack() {
        const data = this.collectedData;
        const techStack = {
            frontend: this.getFrontendRecommendations(data),
            backend: this.getBackendRecommendations(data),
            database: this.getDatabaseRecommendations(data),
            hosting: this.getHostingRecommendations(data),
            deployment: this.getDeploymentRecommendations(data),
            security: this.getSecurityRecommendations(data)
        };
        
        return techStack;
    }

    // 獲取前端技術建議
    getFrontendRecommendations(data) {
        const recommendations = {
            frameworks: [],
            libraries: [],
            tools: [],
            complexity: 'medium'
        };

        // 基於內容管理方式
        if (data.contentManagement === 'cms_backend') {
            recommendations.frameworks = ['React', 'Vue.js', 'Angular'];
            recommendations.libraries = ['React Admin', 'Vue Admin', 'Admin Dashboard'];
        } else if (data.contentManagement === 'code_based') {
            recommendations.frameworks = ['Next.js', 'Gatsby', 'Nuxt.js'];
            recommendations.libraries = ['MDX', 'Remark', 'Rehype'];
        }

        // 基於效能需求
        if (data.performanceBudget === 'ultra_fast') {
            recommendations.tools = ['Vite', 'Webpack', 'Parcel'];
            recommendations.complexity = 'medium';
        } else if (data.performanceBudget === 'functionality_first') {
            recommendations.tools = ['Webpack', 'Rollup', 'Build Tools'];
            recommendations.complexity = 'high';
        }

        return recommendations;
    }

    // 獲取後端技術建議
    getBackendRecommendations(data) {
        const recommendations = {
            runtime: [],
            frameworks: [],
            services: [],
            complexity: 'medium'
        };

        if (data.contentManagement === 'cms_backend') {
            recommendations.runtime = ['Node.js', 'PHP', 'Python'];
            recommendations.frameworks = ['Express', 'Laravel', 'Django'];
            recommendations.services = ['Strapi', 'Ghost', 'WordPress'];
        } else if (data.contentManagement === 'code_based') {
            recommendations.runtime = ['Node.js', 'Go', 'Python'];
            recommendations.frameworks = ['Next.js API', 'Express', 'FastAPI'];
            recommendations.services = ['Static Site Generation', 'Serverless Functions'];
        }

        // 基於擴展性需求
        if (data.scalabilitySecurity === 'high_scalability') {
            recommendations.services.push('Microservices', 'Load Balancer', 'CDN');
            recommendations.complexity = 'high';
        }

        return recommendations;
    }

    // 獲取資料庫建議
    getDatabaseRecommendations(data) {
        const recommendations = {
            type: [],
            solutions: [],
            complexity: 'medium'
        };

        if (data.contentManagement === 'cms_backend') {
            recommendations.type = ['SQL', 'NoSQL'];
            recommendations.solutions = ['PostgreSQL', 'MySQL', 'MongoDB'];
        } else if (data.contentManagement === 'code_based') {
            recommendations.type = ['File-based', 'Git-based'];
            recommendations.solutions = ['Markdown Files', 'JSON', 'YAML'];
        }

        if (data.scalabilitySecurity === 'high_scalability') {
            recommendations.solutions.push('Redis', 'Elasticsearch', 'Distributed DB');
            recommendations.complexity = 'high';
        }

        return recommendations;
    }

    // 獲取主機建議
    getHostingRecommendations(data) {
        const recommendations = {
            providers: [],
            type: '',
            cost: 'medium'
        };

        switch (data.hostingPreference) {
            case 'free_hosting':
                recommendations.providers = ['GitHub Pages', 'Netlify', 'Vercel'];
                recommendations.type = 'Static Hosting';
                recommendations.cost = 'free';
                break;
            case 'shared_hosting':
                recommendations.providers = ['Bluehost', 'SiteGround', 'HostGator'];
                recommendations.type = 'Shared Hosting';
                recommendations.cost = 'low';
                break;
            case 'cloud_hosting':
                recommendations.providers = ['AWS', 'Google Cloud', 'Azure'];
                recommendations.type = 'Cloud Hosting';
                recommendations.cost = 'medium';
                break;
            case 'dedicated_server':
                recommendations.providers = ['DigitalOcean', 'Linode', 'Vultr'];
                recommendations.type = 'VPS/Dedicated';
                recommendations.cost = 'high';
                break;
        }

        return recommendations;
    }

    // 獲取部署建議
    getDeploymentRecommendations(data) {
        const recommendations = {
            method: [],
            tools: [],
            automation: 'medium'
        };

        switch (data.deploymentMaintenance) {
            case 'one_click_deploy':
                recommendations.method = ['Git Integration', 'Auto Deploy'];
                recommendations.tools = ['Netlify', 'Vercel', 'GitHub Pages'];
                recommendations.automation = 'high';
                break;
            case 'auto_update':
                recommendations.method = ['CI/CD Pipeline', 'Auto Deploy'];
                recommendations.tools = ['GitHub Actions', 'GitLab CI', 'Jenkins'];
                recommendations.automation = 'high';
                break;
            case 'manual_control':
                recommendations.method = ['Manual Deploy', 'SSH Deploy'];
                recommendations.tools = ['Docker', 'SSH', 'FTP'];
                recommendations.automation = 'low';
                break;
            case 'scheduled_updates':
                recommendations.method = ['Scheduled Deploy', 'Cron Jobs'];
                recommendations.tools = ['GitHub Actions', 'Cron', 'AWS Lambda'];
                recommendations.automation = 'medium';
                break;
        }

        return recommendations;
    }

    // 獲取安全建議
    getSecurityRecommendations(data) {
        const recommendations = {
            measures: [],
            tools: [],
            level: 'medium'
        };

        if (data.scalabilitySecurity === 'security_focus') {
            recommendations.measures = ['HTTPS', 'Authentication', 'Input Validation', 'Security Headers'];
            recommendations.tools = ['SSL Certificate', 'Auth0', 'Helmet.js', 'CSRF Protection'];
            recommendations.level = 'high';
        } else {
            recommendations.measures = ['Basic HTTPS', 'Form Validation'];
            recommendations.tools = ['Let\'s Encrypt', 'Basic Validation'];
            recommendations.level = 'medium';
        }

        return recommendations;
    }

    // 生成技術建議
    generateTechStackSuggestions() {
        const techStack = this.translateToTechStack();
        const suggestions = {
            recommended: this.getRecommendedStack(techStack),
            alternatives: this.getAlternativeStacks(techStack),
            complexity: this.assessComplexity(techStack),
            cost: this.estimateCost(techStack),
            timeline: this.estimateTimeline(techStack)
        };
        
        return suggestions;
    }

    // 獲取推薦技術棧
    getRecommendedStack(techStack) {
        const data = this.collectedData;
        
        // 基於用戶選擇生成最佳組合
        if (data.contentManagement === 'code_based' && data.performanceBudget === 'ultra_fast') {
            return {
                name: 'Jamstack 靜態網站',
                stack: ['Next.js', 'Markdown', 'Vercel', 'Git'],
                pros: ['極快載入', '低成本', '高安全性', '易維護'],
                cons: ['功能限制', '需要程式基礎']
            };
        } else if (data.contentManagement === 'cms_backend' && data.scalabilitySecurity === 'future_growth') {
            return {
                name: 'Headless CMS 方案',
                stack: ['React', 'Strapi', 'PostgreSQL', 'AWS'],
                pros: ['靈活擴展', '易用後台', '現代架構'],
                cons: ['成本較高', '複雜度中等']
            };
        }
        
        // 預設推薦
        return {
            name: '平衡型方案',
            stack: ['Next.js', 'Contentful', 'Vercel', 'GitHub'],
            pros: ['平衡效能', '易於維護', '成本適中'],
            cons: ['需要學習成本']
        };
    }

    // 獲取替代方案
    getAlternativeStacks(techStack) {
        return [
            {
                name: 'WordPress 經典方案',
                stack: ['WordPress', 'PHP', 'MySQL', 'Shared Hosting'],
                pros: ['豐富外掛', '大量資源', '易於使用'],
                cons: ['效能限制', '安全風險']
            },
            {
                name: '現代化全端方案',
                stack: ['Vue.js', 'Node.js', 'MongoDB', 'DigitalOcean'],
                pros: ['完全控制', '現代技術', '高彈性'],
                cons: ['複雜度高', '維護成本']
            }
        ];
    }

    // 評估複雜度
    assessComplexity(techStack) {
        const data = this.collectedData;
        let complexity = 0;
        
        if (data.contentManagement === 'hybrid_approach') complexity += 2;
        if (data.deploymentMaintenance === 'manual_control') complexity += 2;
        if (data.scalabilitySecurity === 'high_scalability') complexity += 2;
        if (data.hostingPreference === 'dedicated_server') complexity += 1;
        
        if (complexity <= 2) return 'low';
        if (complexity <= 4) return 'medium';
        return 'high';
    }

    // 估算成本
    estimateCost(techStack) {
        const data = this.collectedData;
        let cost = 0;
        
        if (data.hostingPreference === 'free_hosting') cost += 0;
        else if (data.hostingPreference === 'shared_hosting') cost += 1;
        else if (data.hostingPreference === 'cloud_hosting') cost += 2;
        else if (data.hostingPreference === 'dedicated_server') cost += 3;
        
        if (data.performanceBudget === 'ultra_fast') cost += 1;
        if (data.scalabilitySecurity === 'high_scalability') cost += 2;
        
        if (cost === 0) return 'free';
        if (cost <= 2) return 'low';
        if (cost <= 4) return 'medium';
        return 'high';
    }

    // 估算時程
    estimateTimeline(techStack) {
        const complexity = this.assessComplexity(techStack);
        const data = this.collectedData;
        
        let weeks = 2; // 基礎時間
        
        if (complexity === 'high') weeks += 4;
        else if (complexity === 'medium') weeks += 2;
        
        if (data.contentManagement === 'hybrid_approach') weeks += 2;
        if (data.scalabilitySecurity === 'high_scalability') weeks += 3;
        
        return {
            estimated: `${weeks} 週`,
            phases: {
                setup: '1 週',
                development: `${Math.ceil(weeks * 0.6)} 週`,
                testing: '1 週',
                deployment: '1 週'
            }
        };
    }

    // 技術方案比較功能
    compareTechStacks(stacks) {
        const criteria = ['performance', 'cost', 'complexity', 'scalability', 'maintenance'];
        const comparison = {};
        
        stacks.forEach(stack => {
            comparison[stack.name] = {
                performance: this.scorePerformance(stack),
                cost: this.scoreCost(stack),
                complexity: this.scoreComplexity(stack),
                scalability: this.scoreScalability(stack),
                maintenance: this.scoreMaintenance(stack)
            };
        });
        
        return comparison;
    }

    // 效能評分
    scorePerformance(stack) {
        const performanceMap = {
            'Next.js': 9,
            'Gatsby': 10,
            'WordPress': 6,
            'Vue.js': 8,
            'React': 8
        };
        
        return stack.stack.reduce((score, tech) => {
            return Math.max(score, performanceMap[tech] || 5);
        }, 5);
    }

    // 成本評分
    scoreCost(stack) {
        const costMap = {
            'Vercel': 8,
            'Netlify': 8,
            'GitHub Pages': 10,
            'AWS': 6,
            'Shared Hosting': 9,
            'DigitalOcean': 7
        };
        
        return stack.stack.reduce((score, tech) => {
            return Math.min(score, costMap[tech] || 5);
        }, 10);
    }

    // 複雜度評分（分數越高越簡單）
    scoreComplexity(stack) {
        const complexityMap = {
            'WordPress': 8,
            'Next.js': 6,
            'Gatsby': 5,
            'Vue.js': 6,
            'React': 6,
            'Node.js': 5
        };
        
        return stack.stack.reduce((score, tech) => {
            return Math.min(score, complexityMap[tech] || 5);
        }, 10);
    }

    // 可擴展性評分
    scoreScalability(stack) {
        const scalabilityMap = {
            'Next.js': 9,
            'Node.js': 9,
            'MongoDB': 8,
            'PostgreSQL': 8,
            'WordPress': 6,
            'AWS': 10
        };
        
        return stack.stack.reduce((score, tech) => {
            return Math.max(score, scalabilityMap[tech] || 5);
        }, 5);
    }

    // 維護性評分
    scoreMaintenance(stack) {
        const maintenanceMap = {
            'WordPress': 7,
            'Next.js': 8,
            'Gatsby': 7,
            'Vercel': 9,
            'GitHub Pages': 9,
            'DigitalOcean': 6
        };
        
        return stack.stack.reduce((score, tech) => {
            return Math.min(score, maintenanceMap[tech] || 5);
        }, 10);
    }

    // 重置收集器
    reset() {
        this.collectedData = {
            contentManagement: null,
            deploymentMaintenance: null,
            performanceBudget: null,
            scalabilitySecurity: null,
            hostingPreference: null
        };
        
        this.currentStep = 'content_management';
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
                stage: 'tech_stack',
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
                stage: 'tech_stack',
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
                stage: 'tech_stack',
                data: this.getCollectedData(),
                techStack: this.translateToTechStack(),
                suggestions: this.generateTechStackSuggestions(),
                nextStage: 'final_review'
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }

    // 發送驗證錯誤事件
    dispatchValidationErrorEvent(message) {
        const event = new CustomEvent('validationError', {
            detail: {
                stage: 'tech_stack',
                step: this.currentStep,
                message: message
            },
            bubbles: true
        });
        
        document.dispatchEvent(event);
    }
}

// 導出到全域
window.TechStackCollector = TechStackCollector;