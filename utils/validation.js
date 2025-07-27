import DOMPurify from 'dompurify'

// 验证类型枚举
export const VALIDATION_TYPES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  PHONE: 'phone',
  AGE: 'age',
  REQUIRED: 'required',
  MIN_LENGTH: 'minLength',
  MAX_LENGTH: 'maxLength',
  PATTERN: 'pattern',
  CUSTOM: 'custom',
}

// 常用正则表达式
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  BASIC_PASSWORD: /^.{6,}$/,
  NAME: /^[a-zA-Z\s\u4e00-\u9fa5]{2,50}$/,
  POSTAL_CODE: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
}

/**
 * 基础验证函数
 */

// 1. 必填字段验证 (VALIDATION TYPE 1)
export const validateRequired = (value, fieldName = 'Field') => {
  const cleanValue = typeof value === 'string' ? value.trim() : value

  if (!cleanValue && cleanValue !== 0) {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    }
  }

  return { isValid: true, message: '' }
}

// 2. 邮箱验证 (VALIDATION TYPE 2)
export const validateEmail = (email) => {
  // 先检查是否为空
  const requiredCheck = validateRequired(email, 'Email address')
  if (!requiredCheck.isValid) {
    return requiredCheck
  }

  // 清理输入
  const cleanEmail = DOMPurify.sanitize(email.trim().toLowerCase())

  // 长度检查
  if (cleanEmail.length > 100) {
    return {
      isValid: false,
      message: 'Email address cannot exceed 100 characters',
    }
  }

  // 格式验证
  if (!PATTERNS.EMAIL.test(cleanEmail)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address format',
    }
  }

  // 检查常见的无效邮箱域名
  const invalidDomains = ['test.com', 'example.com', 'fake.com']
  const domain = cleanEmail.split('@')[1]
  if (invalidDomains.includes(domain)) {
    return {
      isValid: false,
      message: 'Please use a real email address',
    }
  }

  return { isValid: true, message: '', value: cleanEmail }
}

// 3. 密码验证 (VALIDATION TYPE 3)
export const validatePassword = (password, options = {}) => {
  const { requireStrong = false, minLength = 6, fieldName = 'Password' } = options

  // 先检查是否为空
  const requiredCheck = validateRequired(password, fieldName)
  if (!requiredCheck.isValid) {
    return requiredCheck
  }

  // 长度检查
  if (password.length < minLength) {
    return {
      isValid: false,
      message: `${fieldName} must be at least ${minLength} characters long`,
    }
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: `${fieldName} cannot exceed 128 characters`,
    }
  }

  // 强密码检查
  if (requireStrong && !PATTERNS.STRONG_PASSWORD.test(password)) {
    return {
      isValid: false,
      message:
        'Password must contain uppercase and lowercase letters, numbers, and special characters, at least 8 characters long',
    }
  }

  // 基础密码检查
  if (!requireStrong && !PATTERNS.BASIC_PASSWORD.test(password)) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long',
    }
  }

  // 检查常见弱密码
  const weakPasswords = ['123456', 'password', 'qwerty', '111111', 'abc123']
  if (weakPasswords.includes(password.toLowerCase())) {
    return {
      isValid: false,
      message: 'Please use a stronger password, avoid common passwords',
    }
  }

  return { isValid: true, message: '' }
}

// 4. 确认密码验证
export const validatePasswordConfirm = (password, confirmPassword) => {
  // 先检查确认密码是否为空
  const requiredCheck = validateRequired(confirmPassword, 'Confirm password')
  if (!requiredCheck.isValid) {
    return requiredCheck
  }

  // 检查两次密码是否一致
  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: 'Passwords do not match',
    }
  }

  return { isValid: true, message: '' }
}

// 5. 电话号码验证 (VALIDATION TYPE 4)
export const validatePhone = (phone) => {
  // 允许为空（可选字段）
  if (!phone || phone.trim() === '') {
    return { isValid: true, message: '' }
  }

  // 清理输入
  const cleanPhone = DOMPurify.sanitize(phone.trim())

  // 格式验证
  if (!PATTERNS.PHONE.test(cleanPhone)) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number format, e.g.: (555) 123-4567',
    }
  }

  return { isValid: true, message: '', value: cleanPhone }
}

// 6. 年龄验证 (VALIDATION TYPE 5)
export const validateAge = (age, options = {}) => {
  const { min = 0, max = 120, fieldName = 'Age' } = options

  // 允许为空（可选字段）
  if (!age && age !== 0) {
    return { isValid: true, message: '' }
  }

  // 转换为数字
  const numAge = parseInt(age, 10)

  // 检查是否为有效数字
  if (isNaN(numAge)) {
    return {
      isValid: false,
      message: `${fieldName} must be a number`,
    }
  }

  // 范围检查
  if (numAge < min || numAge > max) {
    return {
      isValid: false,
      message: `${fieldName} must be between ${min}-${max}`,
    }
  }

  return { isValid: true, message: '', value: numAge }
}

// 7. 姓名验证 (VALIDATION TYPE 6)
export const validateName = (name, fieldName = 'Name') => {
  // 先检查是否为空
  const requiredCheck = validateRequired(name, fieldName)
  if (!requiredCheck.isValid) {
    return requiredCheck
  }

  // 清理输入
  const cleanName = DOMPurify.sanitize(name.trim())

  // 长度检查
  if (cleanName.length < 2) {
    return {
      isValid: false,
      message: `${fieldName} must be at least 2 characters long`,
    }
  }

  if (cleanName.length > 50) {
    return {
      isValid: false,
      message: `${fieldName} cannot exceed 50 characters`,
    }
  }

  // 格式验证（允许中文、英文和空格）
  if (!PATTERNS.NAME.test(cleanName)) {
    return {
      isValid: false,
      message: `${fieldName} can only contain Chinese characters, English letters and spaces`,
    }
  }

  return { isValid: true, message: '', value: cleanName }
}

// 8. 评分验证
export const validateRating = (rating) => {
  // 先检查是否为空
  const requiredCheck = validateRequired(rating, 'Rating')
  if (!requiredCheck.isValid) {
    return requiredCheck
  }

  // 转换为数字
  const numRating = parseInt(rating, 10)

  // 检查是否为有效数字
  if (isNaN(numRating)) {
    return {
      isValid: false,
      message: 'Rating must be a number',
    }
  }

  // 范围检查
  if (numRating < 1 || numRating > 5) {
    return {
      isValid: false,
      message: 'Rating must be between 1-5',
    }
  }

  return { isValid: true, message: '', value: numRating }
}

/**
 * 复合验证函数
 */

// 登录表单验证
export const validateLoginForm = (formData) => {
  const errors = {}
  let isValid = true

  // 验证邮箱
  const emailResult = validateEmail(formData.email)
  if (!emailResult.isValid) {
    errors.email = emailResult.message
    isValid = false
  }

  // 验证密码
  const passwordResult = validatePassword(formData.password)
  if (!passwordResult.isValid) {
    errors.password = passwordResult.message
    isValid = false
  }

  return { isValid, errors }
}

// 注册表单验证
export const validateRegisterForm = (formData) => {
  const errors = {}
  let isValid = true

  // 验证姓名
  const nameResult = validateName(formData.name)
  if (!nameResult.isValid) {
    errors.name = nameResult.message
    isValid = false
  }

  // 验证邮箱
  const emailResult = validateEmail(formData.email)
  if (!emailResult.isValid) {
    errors.email = emailResult.message
    isValid = false
  }

  // 验证密码
  const passwordResult = validatePassword(formData.password, { requireStrong: false })
  if (!passwordResult.isValid) {
    errors.password = passwordResult.message
    isValid = false
  }

  // 验证确认密码
  const confirmPasswordResult = validatePasswordConfirm(formData.password, formData.confirmPassword)
  if (!confirmPasswordResult.isValid) {
    errors.confirmPassword = confirmPasswordResult.message
    isValid = false
  }

  // 验证年龄（可选）
  if (formData.age) {
    const ageResult = validateAge(formData.age, { min: 18, max: 120 })
    if (!ageResult.isValid) {
      errors.age = ageResult.message
      isValid = false
    }
  }

  // 验证电话（可选）
  if (formData.phone) {
    const phoneResult = validatePhone(formData.phone)
    if (!phoneResult.isValid) {
      errors.phone = phoneResult.message
      isValid = false
    }
  }

  // 验证角色
  const roleResult = validateRequired(formData.role, 'User role')
  if (!roleResult.isValid) {
    errors.role = roleResult.message
    isValid = false
  }

  return { isValid, errors }
}

// 评分表单验证
export const validateRatingForm = (formData) => {
  const errors = {}
  let isValid = true

  // 验证评分
  const ratingResult = validateRating(formData.score)
  if (!ratingResult.isValid) {
    errors.score = ratingResult.message
    isValid = false
  }

  // 验证评论（可选，但如果提供则需要检查长度）
  if (formData.comment && formData.comment.trim()) {
    const cleanComment = DOMPurify.sanitize(formData.comment.trim())
    if (cleanComment.length > 500) {
      errors.comment = 'Comment cannot exceed 500 characters'
      isValid = false
    }
  }

  return { isValid, errors }
}

/**
 * 通用验证器
 */
export const createValidator = (rules) => {
  return (value) => {
    for (const rule of rules) {
      const result = rule(value)
      if (!result.isValid) {
        return result
      }
    }
    return { isValid: true, message: '' }
  }
}

// 实时验证防抖
export const debounceValidation = (validationFn, delay = 300) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    return new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        resolve(validationFn(...args))
      }, delay)
    })
  }
}
