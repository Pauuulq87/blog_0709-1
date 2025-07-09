/**
 * validationHelper.js - 驗證輔助工具
 * 用於驗證用戶輸入和需求資料的完整性
 */

class ValidationHelper {
    constructor() {
        this.validationRules = {
            // 專案願景驗證規則
            projectVision: {
                required: ['projectType', 'targetAudience', 'corePurpose'],
                optional: ['referenceSites', 'inspirationKeywords'],
                rules: {
                    projectType: {
                        type: 'string',
                        enum: ['personal_blog', 'portfolio', 'business', 'ecommerce', 'landing_page', 'community']
                    },
                    targetAudience: {
                        type: 'string',
                        enum: ['general_public', 'professionals', 'students', 'creatives', 'business_owners', 'tech_enthusiasts']
                    },
                    corePurpose: {
                        type: 'string',
                        enum: ['share_knowledge', 'showcase_work', 'sell_products', 'build_community', 'brand_promotion', 'lead_generation']
                    },
                    referenceSites: {
                        type: 'array',
                        items: { type: 'url' }
                    },
                    inspirationKeywords: {
                        type: 'array',
                        items: { type: 'string', minLength: 1 }
                    }
                }
            },
            
            // 設計風格驗證規則
            designStyle: {
                required: ['colorScheme', 'layoutStyle', 'visualStyle', 'animationLevel', 'mobilePriority'],
                rules: {
                    colorScheme: {
                        type: 'string',
                        enum: ['warm', 'cool', 'neutral', 'vibrant', 'pastel', 'monochrome']
                    },
                    layoutStyle: {
                        type: 'string',
                        enum: ['single_column', 'multi_column', 'grid', 'masonry', 'full_width', 'sidebar']
                    },
                    visualStyle: {
                        type: 'string',
                        enum: ['minimal', 'modern', 'classic', 'creative', 'professional', 'playful']
                    },
                    animationLevel: {
                        type: 'string',
                        enum: ['none', 'minimal', 'moderate', 'rich']
                    },
                    mobilePriority: {
                        type: 'string',
                        enum: ['mobile_first', 'desktop_first', 'balanced']
                    }
                }
            },
            
            // 功能需求驗證規則
            features: {
                required: ['contentTypes'],
                optional: ['interactionFeatures', 'integrations', 'adminFeatures', 'priorities'],
                rules: {
                    contentTypes: {
                        type: 'array',
                        minItems: 1,
                        items: {
                            type: 'string',
                            enum: ['blog_posts', 'image_gallery', 'video_content', 'portfolio_items', 'product_catalog', 'documentation']
                        }
                    },
                    interactionFeatures: {
                        type: 'array',
                        items: {
                            type: 'string',
                            enum: ['comments', 'social_sharing', 'newsletter', 'search', 'filtering', 'favorites']
                        }
                    },
                    integrations: {
                        type: 'array',
                        items: {
                            type: 'string',
                            enum: ['google_analytics', 'social_login', 'payment_system', 'email_service', 'crm_integration']
                        }
                    },
                    adminFeatures: {
                        type: 'array',
                        items: {
                            type: 'string',
                            enum: ['content_management', 'user_management', 'analytics_dashboard', 'backup_restore']
                        }
                    }
                }
            },
            
            // 技術偏好驗證規則
            techStack: {
                required: ['contentManagement', 'deploymentPreference', 'performanceNeeds', 'budgetRange'],
                rules: {
                    contentManagement: {
                        type: 'string',
                        enum: ['easy_backend', 'code_management', 'external_platform', 'hybrid_approach']
                    },
                    deploymentPreference: {
                        type: 'string',
                        enum: ['one_click_deploy', 'auto_update', 'manual_management', 'scheduled_update']
                    },
                    performanceNeeds: {
                        type: 'string',
                        enum: ['blazing_fast', 'moderate_speed', 'feature_priority', 'budget_conscious']
                    },
                    budgetRange: {
                        type: 'string',
                        enum: ['free_tier', 'low_cost', 'moderate_budget', 'high_budget']
                    }
                }
            },
            
            // 部署規格驗證規則
            deployment: {
                required: ['timeline', 'budget'],
                optional: ['additionalRequirements', 'finalSpecs'],
                rules: {
                    timeline: {
                        type: 'string',
                        enum: ['urgent', 'standard', 'flexible', 'no_rush']
                    },
                    budget: {
                        type: 'string',
                        enum: ['minimal', 'standard', 'premium', 'enterprise']
                    },
                    additionalRequirements: {
                        type: 'array',
                        items: { type: 'string' }
                    }
                }
            }
        };
        
        this.errorMessages = {
            zh: {
                required: '此欄位為必填項目',
                type: '資料類型不正確',
                enum: '請選擇有效的選項',
                minLength: '內容長度不足',
                maxLength: '內容長度過長',
                minItems: '至少需要選擇一個項目',
                maxItems: '選擇項目過多',
                url: '請輸入有效的網址',
                email: '請輸入有效的電子郵件地址',
                pattern: '格式不符合要求'
            }
        };
    }

    // 驗證單一階段資料
    validateStage(stage, data) {
        const rules = this.validationRules[stage];
        if (!rules) {
            return {
                isValid: false,
                errors: [`未知的階段: ${stage}`]
            };
        }

        const validationResult = {
            isValid: true,
            errors: [],
            warnings: []
        };

        // 檢查必填欄位
        if (rules.required) {
            for (const field of rules.required) {
                if (!data || data[field] === undefined || data[field] === null) {
                    validationResult.isValid = false;
                    validationResult.errors.push(`${field}: ${this.getErrorMessage('required')}`);
                }
            }
        }

        // 檢查欄位規則
        if (rules.rules && data) {
            for (const [field, rule] of Object.entries(rules.rules)) {
                if (data[field] !== undefined && data[field] !== null) {
                    const fieldValidation = this.validateField(field, data[field], rule);
                    if (!fieldValidation.isValid) {
                        validationResult.isValid = false;
                        validationResult.errors.push(...fieldValidation.errors);
                    }
                    if (fieldValidation.warnings) {
                        validationResult.warnings.push(...fieldValidation.warnings);
                    }
                }
            }
        }

        return validationResult;
    }

    // 驗證個別欄位
    validateField(fieldName, value, rule) {
        const result = {
            isValid: true,
            errors: [],
            warnings: []
        };

        // 類型驗證
        if (rule.type) {
            const typeValidation = this.validateType(value, rule.type);
            if (!typeValidation.isValid) {
                result.isValid = false;
                result.errors.push(`${fieldName}: ${typeValidation.message}`);
                return result; // 類型錯誤時不繼續其他驗證
            }
        }

        // 枚舉驗證
        if (rule.enum && !rule.enum.includes(value)) {
            result.isValid = false;
            result.errors.push(`${fieldName}: ${this.getErrorMessage('enum')} (${rule.enum.join(', ')})`);
        }

        // 長度驗證
        if (rule.minLength !== undefined && value.length < rule.minLength) {
            result.isValid = false;
            result.errors.push(`${fieldName}: ${this.getErrorMessage('minLength')} (最少 ${rule.minLength} 字符)`);
        }

        if (rule.maxLength !== undefined && value.length > rule.maxLength) {
            result.isValid = false;
            result.errors.push(`${fieldName}: ${this.getErrorMessage('maxLength')} (最多 ${rule.maxLength} 字符)`);
        }

        // 陣列項目驗證
        if (rule.type === 'array') {
            if (rule.minItems !== undefined && value.length < rule.minItems) {
                result.isValid = false;
                result.errors.push(`${fieldName}: ${this.getErrorMessage('minItems')} (最少 ${rule.minItems} 項)`);
            }

            if (rule.maxItems !== undefined && value.length > rule.maxItems) {
                result.isValid = false;
                result.errors.push(`${fieldName}: ${this.getErrorMessage('maxItems')} (最多 ${rule.maxItems} 項)`);
            }

            // 驗證陣列項目
            if (rule.items) {
                for (let i = 0; i < value.length; i++) {
                    const itemValidation = this.validateField(`${fieldName}[${i}]`, value[i], rule.items);
                    if (!itemValidation.isValid) {
                        result.isValid = false;
                        result.errors.push(...itemValidation.errors);
                    }
                }
            }
        }

        // 正則表達式驗證
        if (rule.pattern) {
            const regex = new RegExp(rule.pattern);
            if (!regex.test(value)) {
                result.isValid = false;
                result.errors.push(`${fieldName}: ${this.getErrorMessage('pattern')}`);
            }
        }

        return result;
    }

    // 類型驗證
    validateType(value, expectedType) {
        const result = {
            isValid: true,
            message: ''
        };

        switch (expectedType) {
            case 'string':
                if (typeof value !== 'string') {
                    result.isValid = false;
                    result.message = this.getErrorMessage('type') + ' (期望: 字串)';
                }
                break;
            
            case 'number':
                if (typeof value !== 'number' || isNaN(value)) {
                    result.isValid = false;
                    result.message = this.getErrorMessage('type') + ' (期望: 數字)';
                }
                break;
            
            case 'boolean':
                if (typeof value !== 'boolean') {
                    result.isValid = false;
                    result.message = this.getErrorMessage('type') + ' (期望: 布林值)';
                }
                break;
            
            case 'array':
                if (!Array.isArray(value)) {
                    result.isValid = false;
                    result.message = this.getErrorMessage('type') + ' (期望: 陣列)';
                }
                break;
            
            case 'object':
                if (typeof value !== 'object' || value === null || Array.isArray(value)) {
                    result.isValid = false;
                    result.message = this.getErrorMessage('type') + ' (期望: 物件)';
                }
                break;
            
            case 'url':
                if (!this.isValidURL(value)) {
                    result.isValid = false;
                    result.message = this.getErrorMessage('url');
                }
                break;
            
            case 'email':
                if (!this.isValidEmail(value)) {
                    result.isValid = false;
                    result.message = this.getErrorMessage('email');
                }
                break;
            
            default:
                result.isValid = false;
                result.message = `未知的類型: ${expectedType}`;
        }

        return result;
    }

    // 驗證完整需求資料
    validateAllRequirements(allRequirements) {
        const result = {
            isValid: true,
            stageResults: {},
            totalErrors: 0,
            totalWarnings: 0,
            summary: {
                completedStages: 0,
                totalStages: 5,
                completionRate: 0
            }
        };

        const stages = ['projectVision', 'designStyle', 'features', 'techStack', 'deployment'];
        
        for (const stage of stages) {
            const stageData = allRequirements[stage === 'projectVision' ? 'project_vision' : 
                                             stage === 'designStyle' ? 'design_style' :
                                             stage === 'features' ? 'feature_requirements' :
                                             stage === 'techStack' ? 'tech_preferences' :
                                             'deployment_specs'];
            
            const stageResult = this.validateStage(stage, stageData);
            result.stageResults[stage] = stageResult;
            
            if (!stageResult.isValid) {
                result.isValid = false;
            }
            
            result.totalErrors += stageResult.errors.length;
            result.totalWarnings += stageResult.warnings.length;
            
            if (stageData && Object.keys(stageData).length > 0) {
                result.summary.completedStages++;
            }
        }

        result.summary.completionRate = (result.summary.completedStages / result.summary.totalStages) * 100;

        return result;
    }

    // 驗證資料完整性
    validateDataIntegrity(data) {
        const integrityChecks = {
            consistency: this.checkDataConsistency(data),
            completeness: this.checkDataCompleteness(data),
            compatibility: this.checkDataCompatibility(data)
        };

        const overallIntegrity = {
            isValid: Object.values(integrityChecks).every(check => check.isValid),
            checks: integrityChecks,
            score: this.calculateIntegrityScore(integrityChecks)
        };

        return overallIntegrity;
    }

    // 檢查資料一致性
    checkDataConsistency(data) {
        const consistencyIssues = [];

        // 檢查專案類型與功能需求的一致性
        if (data.projectVision?.projectType === 'landing_page' && 
            data.features?.interactionFeatures?.length > 3) {
            consistencyIssues.push('登陸頁面通常不需要太多互動功能');
        }

        // 檢查設計風格與專案類型的一致性
        if (data.projectVision?.projectType === 'business' && 
            data.designStyle?.visualStyle === 'playful') {
            consistencyIssues.push('企業網站建議使用較為正式的設計風格');
        }

        // 檢查技術選擇與複雜度的一致性
        if (data.features?.totalComplexity === 'simple' && 
            data.techStack?.contentManagement === 'external_platform') {
            consistencyIssues.push('簡單專案可能不需要複雜的外部平台');
        }

        return {
            isValid: consistencyIssues.length === 0,
            issues: consistencyIssues
        };
    }

    // 檢查資料完整性
    checkDataCompleteness(data) {
        const completenessIssues = [];
        const requiredStages = ['projectVision', 'designStyle', 'features', 'techStack', 'deployment'];

        for (const stage of requiredStages) {
            const stageData = data[stage];
            if (!stageData || Object.keys(stageData).length === 0) {
                completenessIssues.push(`缺少 ${stage} 階段的資料`);
            }
        }

        return {
            isValid: completenessIssues.length === 0,
            issues: completenessIssues
        };
    }

    // 檢查資料相容性
    checkDataCompatibility(data) {
        const compatibilityIssues = [];

        // 檢查時程與預算的相容性
        if (data.deployment?.timeline === 'urgent' && 
            data.deployment?.budget === 'minimal') {
            compatibilityIssues.push('緊急時程通常需要較高的預算');
        }

        // 檢查效能需求與預算的相容性
        if (data.techStack?.performanceNeeds === 'blazing_fast' && 
            data.techStack?.budgetRange === 'free_tier') {
            compatibilityIssues.push('高效能需求通常需要付費服務');
        }

        return {
            isValid: compatibilityIssues.length === 0,
            issues: compatibilityIssues
        };
    }

    // 計算完整性分數
    calculateIntegrityScore(checks) {
        let score = 100;
        
        for (const check of Object.values(checks)) {
            if (!check.isValid) {
                score -= (check.issues.length * 10);
            }
        }

        return Math.max(0, score);
    }

    // URL 驗證
    isValidURL(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
            return false;
        }
    }

    // 電子郵件驗證
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 獲取錯誤訊息
    getErrorMessage(errorType, language = 'zh') {
        return this.errorMessages[language][errorType] || `驗證錯誤: ${errorType}`;
    }

    // 即時驗證
    validateRealtime(stage, field, value) {
        const stageRules = this.validationRules[stage];
        if (!stageRules || !stageRules.rules[field]) {
            return { isValid: true, message: '' };
        }

        const fieldValidation = this.validateField(field, value, stageRules.rules[field]);
        return {
            isValid: fieldValidation.isValid,
            message: fieldValidation.errors.join(', ')
        };
    }

    // 獲取驗證建議
    getValidationSuggestions(stage, data) {
        const suggestions = [];

        if (stage === 'projectVision') {
            if (!data.referenceSites || data.referenceSites.length === 0) {
                suggestions.push('建議提供一些參考網站範例');
            }
            if (!data.inspirationKeywords || data.inspirationKeywords.length === 0) {
                suggestions.push('加入一些風格關鍵字有助於設計決策');
            }
        }

        if (stage === 'features') {
            if (!data.interactionFeatures || data.interactionFeatures.length === 0) {
                suggestions.push('考慮加入一些互動功能提升用戶體驗');
            }
            if (data.contentTypes && data.contentTypes.length > 5) {
                suggestions.push('內容類型過多可能增加開發複雜度');
            }
        }

        if (stage === 'techStack') {
            if (data.performanceNeeds === 'blazing_fast' && data.budgetRange === 'free_tier') {
                suggestions.push('高效能需求建議考慮付費服務');
            }
        }

        return suggestions;
    }

    // 清理和標準化資料
    sanitizeData(data) {
        const sanitized = JSON.parse(JSON.stringify(data));

        // 清理字串資料
        const cleanString = (str) => {
            if (typeof str !== 'string') return str;
            return str.trim().replace(/\s+/g, ' ');
        };

        // 遞歸清理物件
        const cleanObject = (obj) => {
            if (Array.isArray(obj)) {
                return obj.map(item => cleanObject(item));
            } else if (typeof obj === 'object' && obj !== null) {
                const cleaned = {};
                for (const [key, value] of Object.entries(obj)) {
                    cleaned[key] = cleanObject(value);
                }
                return cleaned;
            } else if (typeof obj === 'string') {
                return cleanString(obj);
            }
            return obj;
        };

        return cleanObject(sanitized);
    }

    // 生成驗證報告
    generateValidationReport(allRequirements) {
        const validation = this.validateAllRequirements(allRequirements);
        const integrity = this.validateDataIntegrity(allRequirements);

        return {
            timestamp: new Date().toISOString(),
            validation,
            integrity,
            summary: {
                isValid: validation.isValid && integrity.isValid,
                totalErrors: validation.totalErrors,
                totalWarnings: validation.totalWarnings,
                completionRate: validation.summary.completionRate,
                integrityScore: integrity.score
            },
            recommendations: this.generateRecommendations(validation, integrity)
        };
    }

    // 生成建議
    generateRecommendations(validation, integrity) {
        const recommendations = [];

        if (validation.totalErrors > 0) {
            recommendations.push('請完善必填欄位以提高資料完整性');
        }

        if (integrity.score < 80) {
            recommendations.push('建議檢查各階段資料的一致性');
        }

        if (validation.summary.completionRate < 100) {
            recommendations.push('建議完成所有階段的需求收集');
        }

        return recommendations;
    }
}

// 導出到全域
window.ValidationHelper = ValidationHelper;