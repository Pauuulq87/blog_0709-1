/**
 * requirementParser.js - 需求解析器
 * 用於解析和標準化用戶需求數據
 */

class RequirementParser {
    constructor() {
        this.parsingRules = {
            // 專案類型映射
            projectTypes: {
                'personal_blog': {
                    tech: ['HTML', 'CSS', 'JavaScript', 'Static Site Generator'],
                    features: ['blogging', 'comments', 'rss'],
                    complexity: 'simple'
                },
                'portfolio': {
                    tech: ['HTML', 'CSS', 'JavaScript', 'Image Processing'],
                    features: ['gallery', 'contact_form', 'responsive'],
                    complexity: 'medium'
                },
                'business': {
                    tech: ['HTML', 'CSS', 'JavaScript', 'CMS'],
                    features: ['multi_page', 'contact_form', 'seo'],
                    complexity: 'medium'
                },
                'ecommerce': {
                    tech: ['Full Stack', 'Database', 'Payment Processing'],
                    features: ['shopping_cart', 'payment', 'inventory'],
                    complexity: 'complex'
                },
                'landing_page': {
                    tech: ['HTML', 'CSS', 'JavaScript'],
                    features: ['responsive', 'contact_form', 'analytics'],
                    complexity: 'simple'
                },
                'community': {
                    tech: ['Full Stack', 'Database', 'Authentication'],
                    features: ['user_system', 'forums', 'messaging'],
                    complexity: 'very_complex'
                }
            },
            
            // 設計風格映射
            designStyles: {
                'minimal': {
                    css: ['clean_layout', 'white_space', 'simple_typography'],
                    colors: ['monochrome', 'minimal_palette']
                },
                'modern': {
                    css: ['grid_layout', 'bold_typography', 'geometric_shapes'],
                    colors: ['contemporary_palette', 'accent_colors']
                },
                'creative': {
                    css: ['custom_animations', 'unique_layouts', 'artistic_elements'],
                    colors: ['vibrant_palette', 'creative_combinations']
                }
            },
            
            // 功能複雜度映射
            featureComplexity: {
                'simple': ['static_content', 'basic_responsive', 'contact_form'],
                'medium': ['cms_integration', 'user_comments', 'search_functionality'],
                'complex': ['user_authentication', 'payment_processing', 'advanced_search'],
                'very_complex': ['real_time_features', 'advanced_analytics', 'custom_apis']
            }
        };
    }

    // 解析完整的需求數據
    parseRequirements(allRequirements) {
        try {
            const parsedData = {
                projectVision: this.parseProjectVision(allRequirements.project_vision),
                designStyle: this.parseDesignStyle(allRequirements.design_style),
                features: this.parseFeatures(allRequirements.feature_requirements),
                techStack: this.parseTechStack(allRequirements.tech_preferences),
                deployment: this.parseDeployment(allRequirements.deployment_specs),
                metadata: this.generateMetadata(allRequirements)
            };

            // 進行交叉驗證和優化
            this.validateAndOptimize(parsedData);

            return parsedData;
        } catch (error) {
            console.error('需求解析錯誤:', error);
            throw new Error('需求解析失敗: ' + error.message);
        }
    }

    // 解析專案願景
    parseProjectVision(visionData) {
        if (!visionData) return null;

        const projectType = visionData.projectType;
        const typeInfo = this.parsingRules.projectTypes[projectType];

        return {
            type: projectType,
            typeName: this.getProjectTypeName(projectType),
            targetAudience: visionData.targetAudience,
            audienceName: this.getAudienceName(visionData.targetAudience),
            corePurpose: visionData.corePurpose,
            purposeName: this.getPurposeName(visionData.corePurpose),
            referenceSites: visionData.referenceSites || [],
            inspirationKeywords: visionData.inspirationKeywords || [],
            suggestedTech: typeInfo?.tech || [],
            suggestedFeatures: typeInfo?.features || [],
            baseComplexity: typeInfo?.complexity || 'medium',
            timestamp: visionData.timestamp
        };
    }

    // 解析設計風格
    parseDesignStyle(styleData) {
        if (!styleData) return null;

        return {
            colorScheme: styleData.colorScheme,
            colorPalette: this.generateColorPalette(styleData.colorScheme),
            layoutStyle: styleData.layoutStyle,
            layoutSpecs: this.getLayoutSpecs(styleData.layoutStyle),
            visualStyle: styleData.visualStyle,
            styleGuide: this.generateStyleGuide(styleData.visualStyle),
            animationLevel: styleData.animationLevel,
            animationSpecs: this.getAnimationSpecs(styleData.animationLevel),
            mobilePriority: styleData.mobilePriority,
            responsiveStrategy: this.getResponsiveStrategy(styleData.mobilePriority),
            timestamp: styleData.timestamp
        };
    }

    // 解析功能需求
    parseFeatures(featureData) {
        if (!featureData) return null;

        const features = {
            contentTypes: featureData.contentTypes || [],
            interactionFeatures: featureData.interactionFeatures || [],
            integrations: featureData.integrations || [],
            adminFeatures: featureData.adminFeatures || [],
            priorities: featureData.priorities || {},
            timestamp: featureData.timestamp
        };

        // 計算總體複雜度
        features.totalComplexity = this.calculateFeatureComplexity(features);
        
        // 生成開發階段建議
        features.developmentPhases = this.generateDevelopmentPhases(features);
        
        // 估算開發時間
        features.estimatedTime = this.estimateFeatureDevelopmentTime(features);

        return features;
    }

    // 解析技術堆疊
    parseTechStack(techData) {
        if (!techData) return null;

        return {
            contentManagement: techData.contentManagement,
            cmsRecommendation: this.getCMSRecommendation(techData.contentManagement),
            deploymentPreference: techData.deploymentPreference,
            hostingRecommendation: this.getHostingRecommendation(techData.deploymentPreference),
            performanceNeeds: techData.performanceNeeds,
            performanceSpecs: this.getPerformanceSpecs(techData.performanceNeeds),
            budgetRange: techData.budgetRange,
            techRecommendations: this.generateTechRecommendations(techData),
            timestamp: techData.timestamp
        };
    }

    // 解析部署規格
    parseDeployment(deploymentData) {
        if (!deploymentData) return null;

        return {
            timeline: deploymentData.timeline,
            timelineSpecs: this.getTimelineSpecs(deploymentData.timeline),
            budget: deploymentData.budget,
            budgetSpecs: this.getBudgetSpecs(deploymentData.budget),
            additionalRequirements: deploymentData.additionalRequirements || [],
            finalSpecs: deploymentData.finalSpecs || {},
            timestamp: deploymentData.timestamp
        };
    }

    // 生成元數據
    generateMetadata(allRequirements) {
        return {
            parsingVersion: '1.0.0',
            parsedAt: new Date().toISOString(),
            totalStages: Object.keys(allRequirements).length,
            completionRate: this.calculateCompletionRate(allRequirements),
            dataIntegrity: this.validateDataIntegrity(allRequirements)
        };
    }

    // 獲取專案類型名稱
    getProjectTypeName(type) {
        const typeNames = {
            'personal_blog': '個人部落格',
            'portfolio': '作品集網站',
            'business': '企業官網',
            'ecommerce': '電商網站',
            'landing_page': '活動頁面',
            'community': '社群網站'
        };
        return typeNames[type] || type;
    }

    // 獲取目標受眾名稱
    getAudienceName(audience) {
        const audienceNames = {
            'general_public': '一般大眾',
            'professionals': '專業人士',
            'students': '學生族群',
            'creatives': '創作者',
            'business_owners': '企業主',
            'tech_enthusiasts': '技術愛好者'
        };
        return audienceNames[audience] || audience;
    }

    // 獲取目的名稱
    getPurposeName(purpose) {
        const purposeNames = {
            'share_knowledge': '知識分享',
            'showcase_work': '展示作品',
            'sell_products': '銷售產品',
            'build_community': '建立社群',
            'brand_promotion': '品牌宣傳',
            'lead_generation': '潛在客戶'
        };
        return purposeNames[purpose] || purpose;
    }

    // 生成色彩調色盤
    generateColorPalette(colorScheme) {
        const palettes = {
            'warm': ['#FF6B6B', '#FFE66D', '#FF8E53', '#4ECDC4'],
            'cool': ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
            'neutral': ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7'],
            'vibrant': ['#E74C3C', '#F39C12', '#27AE60', '#3498DB'],
            'pastel': ['#FFB6C1', '#FFE4E1', '#E6E6FA', '#F0F8FF'],
            'monochrome': ['#000000', '#333333', '#666666', '#CCCCCC']
        };
        
        return palettes[colorScheme] || palettes.neutral;
    }

    // 獲取佈局規格
    getLayoutSpecs(layoutStyle) {
        const specs = {
            'single_column': {
                maxWidth: '800px',
                columns: 1,
                gutters: '2rem',
                breakpoints: ['mobile', 'tablet', 'desktop']
            },
            'multi_column': {
                maxWidth: '1200px',
                columns: 3,
                gutters: '1.5rem',
                breakpoints: ['mobile', 'tablet', 'desktop']
            },
            'grid': {
                maxWidth: '1200px',
                grid: '12-column',
                gutters: '1rem',
                breakpoints: ['mobile', 'tablet', 'desktop']
            }
        };
        
        return specs[layoutStyle] || specs.single_column;
    }

    // 生成風格指南
    generateStyleGuide(visualStyle) {
        const styleGuides = {
            'minimal': {
                typography: ['Inter', 'system-ui'],
                spacing: 'generous',
                borders: 'subtle',
                shadows: 'minimal'
            },
            'modern': {
                typography: ['Montserrat', 'Roboto'],
                spacing: 'balanced',
                borders: 'clean',
                shadows: 'moderate'
            },
            'creative': {
                typography: ['custom', 'display'],
                spacing: 'varied',
                borders: 'artistic',
                shadows: 'dramatic'
            }
        };
        
        return styleGuides[visualStyle] || styleGuides.minimal;
    }

    // 獲取動畫規格
    getAnimationSpecs(animationLevel) {
        const specs = {
            'none': {
                transitions: false,
                transforms: false,
                keyframes: false
            },
            'minimal': {
                transitions: 'basic',
                transforms: 'subtle',
                keyframes: 'simple'
            },
            'moderate': {
                transitions: 'smooth',
                transforms: 'balanced',
                keyframes: 'moderate'
            },
            'rich': {
                transitions: 'complex',
                transforms: 'dynamic',
                keyframes: 'elaborate'
            }
        };
        
        return specs[animationLevel] || specs.minimal;
    }

    // 獲取響應式策略
    getResponsiveStrategy(mobilePriority) {
        const strategies = {
            'mobile_first': {
                approach: 'progressive_enhancement',
                breakpoints: ['320px', '768px', '1024px'],
                priority: 'mobile'
            },
            'desktop_first': {
                approach: 'graceful_degradation',
                breakpoints: ['1024px', '768px', '320px'],
                priority: 'desktop'
            },
            'balanced': {
                approach: 'adaptive_design',
                breakpoints: ['768px', '320px', '1024px'],
                priority: 'balanced'
            }
        };
        
        return strategies[mobilePriority] || strategies.balanced;
    }

    // 計算功能複雜度
    calculateFeatureComplexity(features) {
        let complexity = 0;
        
        // 內容類型複雜度
        complexity += features.contentTypes.length * 1;
        
        // 互動功能複雜度
        complexity += features.interactionFeatures.length * 2;
        
        // 整合需求複雜度
        complexity += features.integrations.length * 3;
        
        // 管理功能複雜度
        complexity += features.adminFeatures.length * 2;
        
        if (complexity <= 5) return 'simple';
        if (complexity <= 10) return 'medium';
        if (complexity <= 20) return 'complex';
        return 'very_complex';
    }

    // 生成開發階段建議
    generateDevelopmentPhases(features) {
        const phases = [];
        
        // 第一階段：基礎功能
        phases.push({
            phase: 1,
            name: '基礎建設',
            features: features.contentTypes.slice(0, 2),
            priority: 'high',
            estimatedTime: '2-3 週'
        });
        
        // 第二階段：互動功能
        if (features.interactionFeatures.length > 0) {
            phases.push({
                phase: 2,
                name: '互動功能',
                features: features.interactionFeatures.slice(0, 3),
                priority: 'medium',
                estimatedTime: '2-4 週'
            });
        }
        
        // 第三階段：整合與優化
        if (features.integrations.length > 0) {
            phases.push({
                phase: 3,
                name: '整合與優化',
                features: features.integrations,
                priority: 'low',
                estimatedTime: '1-2 週'
            });
        }
        
        return phases;
    }

    // 估算功能開發時間
    estimateFeatureDevelopmentTime(features) {
        const timeMap = {
            'simple': 2,
            'medium': 4,
            'complex': 8,
            'very_complex': 16
        };
        
        const complexity = features.totalComplexity;
        const baseTime = timeMap[complexity] || 4;
        const featureCount = Object.values(features).flat().length;
        
        return {
            minimum: baseTime,
            maximum: baseTime * 2,
            realistic: Math.ceil(baseTime * 1.5),
            unit: 'weeks'
        };
    }

    // 獲取 CMS 建議
    getCMSRecommendation(contentManagement) {
        const recommendations = {
            'easy_backend': ['WordPress', 'Ghost', 'Strapi'],
            'code_management': ['Next.js', 'Gatsby', 'Nuxt.js'],
            'external_platform': ['Contentful', 'Sanity', 'Airtable'],
            'hybrid_approach': ['Headless CMS', 'Static + CMS', 'JAMstack']
        };
        
        return recommendations[contentManagement] || recommendations.easy_backend;
    }

    // 獲取主機建議
    getHostingRecommendation(deploymentPreference) {
        const recommendations = {
            'one_click_deploy': ['Vercel', 'Netlify', 'GitHub Pages'],
            'auto_update': ['Vercel', 'Netlify', 'Heroku'],
            'manual_management': ['DigitalOcean', 'AWS', 'VPS'],
            'scheduled_update': ['GitHub Actions', 'GitLab CI', 'Jenkins']
        };
        
        return recommendations[deploymentPreference] || recommendations.one_click_deploy;
    }

    // 獲取效能規格
    getPerformanceSpecs(performanceNeeds) {
        const specs = {
            'blazing_fast': {
                loadTime: '< 1s',
                optimization: 'aggressive',
                caching: 'extensive'
            },
            'moderate_speed': {
                loadTime: '< 3s',
                optimization: 'balanced',
                caching: 'standard'
            },
            'feature_priority': {
                loadTime: '< 5s',
                optimization: 'minimal',
                caching: 'basic'
            }
        };
        
        return specs[performanceNeeds] || specs.moderate_speed;
    }

    // 生成技術建議
    generateTechRecommendations(techData) {
        const recommendations = {
            frontend: this.getFrontendRecommendations(techData),
            backend: this.getBackendRecommendations(techData),
            database: this.getDatabaseRecommendations(techData),
            hosting: this.getHostingRecommendations(techData)
        };
        
        return recommendations;
    }

    // 獲取前端建議
    getFrontendRecommendations(techData) {
        if (techData.performanceNeeds === 'blazing_fast') {
            return ['React', 'Vue.js', 'Svelte'];
        }
        return ['HTML5', 'CSS3', 'JavaScript'];
    }

    // 獲取後端建議
    getBackendRecommendations(techData) {
        if (techData.contentManagement === 'code_management') {
            return ['Node.js', 'Python', 'Static Site'];
        }
        return ['WordPress', 'Strapi', 'Ghost'];
    }

    // 獲取資料庫建議
    getDatabaseRecommendations(techData) {
        if (techData.contentManagement === 'external_platform') {
            return ['Headless CMS', 'API-based'];
        }
        return ['MySQL', 'PostgreSQL', 'MongoDB'];
    }

    // 獲取主機建議
    getHostingRecommendations(techData) {
        const budget = techData.budgetRange;
        
        if (budget === 'free_tier') {
            return ['GitHub Pages', 'Netlify', 'Vercel'];
        } else if (budget === 'low_cost') {
            return ['Shared Hosting', 'VPS', 'Cloud Hosting'];
        }
        return ['Dedicated Server', 'Enterprise Cloud', 'CDN'];
    }

    // 獲取時程規格
    getTimelineSpecs(timeline) {
        const specs = {
            'urgent': {
                duration: '2-4 週',
                priority: 'speed',
                resources: 'intensive'
            },
            'standard': {
                duration: '6-8 週',
                priority: 'balanced',
                resources: 'normal'
            },
            'flexible': {
                duration: '8-12 週',
                priority: 'quality',
                resources: 'thorough'
            },
            'no_rush': {
                duration: '12+ 週',
                priority: 'perfection',
                resources: 'comprehensive'
            }
        };
        
        return specs[timeline] || specs.standard;
    }

    // 獲取預算規格
    getBudgetSpecs(budget) {
        const specs = {
            'minimal': {
                range: '< $1,000',
                scope: 'basic',
                features: 'essential'
            },
            'standard': {
                range: '$1,000 - $5,000',
                scope: 'complete',
                features: 'comprehensive'
            },
            'premium': {
                range: '$5,000 - $15,000',
                scope: 'advanced',
                features: 'premium'
            },
            'enterprise': {
                range: '$15,000+',
                scope: 'custom',
                features: 'unlimited'
            }
        };
        
        return specs[budget] || specs.standard;
    }

    // 計算完成率
    calculateCompletionRate(allRequirements) {
        const totalStages = 5;
        const completedStages = Object.keys(allRequirements).length;
        return Math.round((completedStages / totalStages) * 100);
    }

    // 驗證資料完整性
    validateDataIntegrity(allRequirements) {
        const issues = [];
        
        // 檢查必要欄位
        if (!allRequirements.project_vision) {
            issues.push('缺少專案願景資料');
        }
        
        if (!allRequirements.design_style) {
            issues.push('缺少設計風格資料');
        }
        
        // 檢查資料一致性
        // 可以加入更多驗證邏輯
        
        return {
            isValid: issues.length === 0,
            issues: issues,
            score: Math.max(0, 100 - issues.length * 20)
        };
    }

    // 驗證和優化解析資料
    validateAndOptimize(parsedData) {
        // 交叉驗證功能需求與專案類型
        this.validateFeatureCompatibility(parsedData);
        
        // 優化技術選擇
        this.optimizeTechStack(parsedData);
        
        // 調整時程預算
        this.adjustTimelineBudget(parsedData);
    }

    // 驗證功能相容性
    validateFeatureCompatibility(parsedData) {
        const projectType = parsedData.projectVision?.type;
        const features = parsedData.features;
        
        if (projectType === 'landing_page' && features?.interactionFeatures?.length > 3) {
            console.warn('登陸頁面不建議使用過多互動功能');
        }
        
        if (projectType === 'ecommerce' && !features?.interactionFeatures?.includes('payment')) {
            console.warn('電商網站建議包含付款功能');
        }
    }

    // 優化技術堆疊
    optimizeTechStack(parsedData) {
        const complexity = parsedData.features?.totalComplexity;
        const techStack = parsedData.techStack;
        
        if (complexity === 'simple' && techStack?.cmsRecommendation?.includes('complex')) {
            console.warn('簡單專案建議使用輕量級技術方案');
        }
    }

    // 調整時程預算
    adjustTimelineBudget(parsedData) {
        const timeline = parsedData.deployment?.timeline;
        const budget = parsedData.deployment?.budget;
        const complexity = parsedData.features?.totalComplexity;
        
        if (timeline === 'urgent' && complexity === 'very_complex') {
            console.warn('複雜專案建議調整時程或簡化功能');
        }
        
        if (budget === 'minimal' && complexity === 'very_complex') {
            console.warn('複雜專案建議調整預算或分階段開發');
        }
    }
}

// 導出到全域
window.RequirementParser = RequirementParser;