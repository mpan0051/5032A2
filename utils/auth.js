import DOMPurify from 'dompurify'

/**
 * 认证和安全工具函数
 */

// 用户角色权限映射
export const ROLE_PERMISSIONS = {
  senior: {
    name: 'Senior Citizen',
    permissions: [
      'view_health_resources',
      'view_support_services',
      'view_events',
      'rate_resources',
      'rate_services',
      'register_events',
      'update_profile',
    ],
    pages: ['/', '/health-resources', '/support-services', '/get-involved', '/my-account'],
  },
  caregiver: {
    name: 'Caregiver',
    permissions: [
      'view_health_resources',
      'view_support_services',
      'view_caregiver_resources',
      'view_events',
      'rate_resources',
      'rate_services',
      'register_events',
      'update_profile',
      'access_caregiver_tools',
    ],
    pages: [
      '/',
      '/health-resources',
      '/support-services',
      '/caregiver-resources',
      '/get-involved',
      '/my-account',
    ],
  },
  healthcare: {
    name: 'Healthcare Professional',
    permissions: [
      'view_health_resources',
      'view_support_services',
      'view_caregiver_resources',
      'view_events',
      'rate_resources',
      'rate_services',
      'register_events',
      'update_profile',
      'access_professional_tools',
      'view_patient_referrals',
    ],
    pages: [
      '/',
      '/health-resources',
      '/support-services',
      '/caregiver-resources',
      '/get-involved',
      '/my-account',
    ],
  },
  volunteer: {
    name: 'Volunteer',
    permissions: [
      'view_health_resources',
      'view_support_services',
      'view_events',
      'rate_resources',
      'rate_services',
      'register_events',
      'update_profile',
      'access_volunteer_portal',
    ],
    pages: ['/', '/health-resources', '/support-services', '/get-involved', '/my-account'],
  },
}

/**
 * 检查用户是否有特定权限
 * @param {string} userRole - 用户角色
 * @param {string} permission - 需要检查的权限
 * @returns {boolean} - 是否有权限
 */
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false

  const roleConfig = ROLE_PERMISSIONS[userRole]
  if (!roleConfig) return false

  return roleConfig.permissions.includes(permission)
}

/**
 * 检查用户是否可以访问特定页面
 * @param {string} userRole - 用户角色
 * @param {string} path - 页面路径
 * @returns {boolean} - 是否可以访问
 */
export const canAccessPage = (userRole, path) => {
  if (!userRole || !path) return false

  const roleConfig = ROLE_PERMISSIONS[userRole]
  if (!roleConfig) return false

  return roleConfig.pages.includes(path)
}

/**
 * 获取用户角色的显示名称
 * @param {string} userRole - 用户角色
 * @returns {string} - 角色显示名称
 */
export const getRoleDisplayName = (userRole) => {
  const roleConfig = ROLE_PERMISSIONS[userRole]
  return roleConfig?.name || 'Unknown Role'
}

/**
 * 获取用户的所有权限
 * @param {string} userRole - 用户角色
 * @returns {Array} - 权限列表
 */
export const getUserPermissions = (userRole) => {
  const roleConfig = ROLE_PERMISSIONS[userRole]
  return roleConfig?.permissions || []
}

/**
 * 安全相关工具函数
 */

/**
 * 清理HTML内容，防止XSS攻击
 * @param {string} html - 需要清理的HTML内容
 * @returns {string} - 清理后的安全HTML
 */
export const sanitizeHtml = (html) => {
  if (!html) return ''

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  })
}

/**
 * 清理用户输入，防止XSS攻击
 * @param {string} input - 用户输入
 * @returns {string} - 清理后的输入
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input

  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
}

/**
 * 验证邮箱域名是否在白名单中
 * @param {string} email - 邮箱地址
 * @returns {boolean} - 是否为可信域名
 */
export const isEmailDomainTrusted = (email) => {
  if (!email || typeof email !== 'string') return false

  const trustedDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'qq.com',
    '163.com',
    '126.com',
  ]

  const domain = email.split('@')[1]?.toLowerCase()
  return trustedDomains.includes(domain)
}

/**
 * 生成安全的随机字符串
 * @param {number} length - 字符串长度
 * @returns {string} - 随机字符串
 */
export const generateSecureToken = (length = 32) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  return result
}

/**
 * 简单的密码强度检查
 * @param {string} password - 密码
 * @returns {Object} - 强度信息
 */
export const checkPasswordStrength = (password) => {
  if (!password) {
    return { score: 0, level: 'weak', feedback: 'Password cannot be empty' }
  }

  let score = 0
  const feedback = []

  // 长度检查
  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('at least 8 characters')
  }

  // 大写字母
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('uppercase letters')
  }

  // 小写字母
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('lowercase letters')
  }

  // 数字
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push('numbers')
  }

  // 特殊字符
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1
  } else {
    feedback.push('special characters')
  }

  // 判断强度等级
  let level
  if (score <= 2) {
    level = 'weak'
  } else if (score <= 3) {
    level = 'medium'
  } else {
    level = 'strong'
  }

  return {
    score,
    level,
    feedback:
      feedback.length > 0 ? `Suggestions: ${feedback.join(', ')}` : 'Password strength is good',
  }
}

/**
 * 会话管理工具
 */

/**
 * 检查会话是否过期
 * @param {string} loginTime - 登录时间（ISO字符串）
 * @param {number} maxAge - 最大会话时间（小时）
 * @returns {boolean} - 是否过期
 */
export const isSessionExpired = (loginTime, maxAge = 24) => {
  if (!loginTime) return true

  const loginDate = new Date(loginTime)
  const now = new Date()
  const diffHours = (now - loginDate) / (1000 * 60 * 60)

  return diffHours > maxAge
}

/**
 * 格式化最后登录时间
 * @param {string} loginTime - 登录时间（ISO字符串）
 * @returns {string} - 格式化的时间字符串
 */
export const formatLastLoginTime = (loginTime) => {
  if (!loginTime) return 'Never logged in'

  const date = new Date(loginTime)
  const now = new Date()
  const diffMs = now - date
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) {
    return 'Just now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString('en-US')
  }
}

/**
 * 数据脱敏工具
 */

/**
 * 脱敏邮箱地址
 * @param {string} email - 邮箱地址
 * @returns {string} - 脱敏后的邮箱
 */
export const maskEmail = (email) => {
  if (!email || typeof email !== 'string') return ''

  const [username, domain] = email.split('@')
  if (!username || !domain) return email

  if (username.length <= 2) {
    return `${username[0]}*@${domain}`
  }

  const maskedUsername =
    username[0] + '*'.repeat(username.length - 2) + username[username.length - 1]
  return `${maskedUsername}@${domain}`
}

/**
 * 脱敏手机号码
 * @param {string} phone - 手机号码
 * @returns {string} - 脱敏后的手机号
 */
export const maskPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return ''

  // 移除所有非数字字符
  const digits = phone.replace(/\D/g, '')

  if (digits.length < 4) return phone

  if (digits.length <= 7) {
    return digits.slice(0, 3) + '*'.repeat(digits.length - 3)
  }

  // 对于较长的号码，保留前3位和后4位
  return digits.slice(0, 3) + '*'.repeat(digits.length - 7) + digits.slice(-4)
}

/**
 * 安全日志记录
 */

/**
 * 记录安全事件（在实际应用中应该发送到服务器）
 * @param {string} eventType - 事件类型
 * @param {Object} details - 事件详情
 */
export const logSecurityEvent = (eventType, details = {}) => {
  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...details,
  }

  // 在开发环境下打印到控制台
  if (import.meta.env.DEV) {
    console.log('Security Event:', event)
  }

  // 在生产环境中，这里应该发送到安全日志服务器
  // 现在暂时存储到localStorage（仅用于演示）
  try {
    const existingLogs = JSON.parse(localStorage.getItem('security-logs') || '[]')
    existingLogs.push(event)

    // 只保留最近100条记录
    if (existingLogs.length > 100) {
      existingLogs.splice(0, existingLogs.length - 100)
    }

    localStorage.setItem('security-logs', JSON.stringify(existingLogs))
  } catch (error) {
    console.error('Failed to log security event:', error)
  }
}

/**
 * 常见安全事件类型
 */
export const SECURITY_EVENTS = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  LOGOUT: 'logout',
  PASSWORD_CHANGE: 'password_change',
  PROFILE_UPDATE: 'profile_update',
  INVALID_ACCESS: 'invalid_access',
  XSS_ATTEMPT: 'xss_attempt',
  RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
}
