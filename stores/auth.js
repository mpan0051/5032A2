import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import DOMPurify from 'dompurify'

export const useAuthStore = defineStore('auth', () => {
  // 状态
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // 计算属性
  const isAuthenticated = computed(() => !!user.value)
  const userRole = computed(() => user.value?.role || null)
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')

  // 用户角色定义
  const USER_ROLES = {
    SENIOR: 'senior', // 老年人
    CAREGIVER: 'caregiver', // 照顾者
    HEALTHCARE: 'healthcare', // 医护人员
    VOLUNTEER: 'volunteer', // 志愿者
  }

  // 模拟用户数据库（实际项目中应该是后端API）
  const getUsersFromStorage = () => {
    const users = localStorage.getItem('app-users')
    return users ? JSON.parse(users) : []
  }

  const saveUsersToStorage = (users) => {
    localStorage.setItem('app-users', JSON.stringify(users))
  }

  // 初始化默认用户（仅用于演示）
  const initializeDefaultUsers = () => {
    const existingUsers = getUsersFromStorage()
    if (existingUsers.length === 0) {
      const defaultUsers = [
        {
          id: uuidv4(),
          email: 'margaret@example.com',
          password: 'password123', // 实际项目中应该加密
          name: 'Margaret Johnson',
          role: USER_ROLES.SENIOR,
          age: 78,
          phone: '(555) 123-4567',
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          email: 'david@example.com',
          password: 'password123',
          name: 'David Chen',
          role: USER_ROLES.CAREGIVER,
          age: 56,
          phone: '(555) 234-5678',
          createdAt: new Date().toISOString(),
        },
        {
          id: uuidv4(),
          email: 'amelia@example.com',
          password: 'password123',
          name: 'Dr. Amelia Rodriguez',
          role: USER_ROLES.HEALTHCARE,
          age: 42,
          phone: '(555) 345-6789',
          createdAt: new Date().toISOString(),
        },
      ]
      saveUsersToStorage(defaultUsers)
    }
  }

  // 输入清理（防XSS）
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input.trim())
  }

  // 登录
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null

    try {
      // 清理输入
      const email = sanitizeInput(credentials.email.toLowerCase())
      const password = sanitizeInput(credentials.password)

      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 查找用户
      const users = getUsersFromStorage()
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email && u.password === password,
      )

      if (!foundUser) {
        throw new Error('Invalid email or password')
      }

      // 登录成功，设置用户信息（排除密码）
      const { password: _, ...userWithoutPassword } = foundUser
      user.value = userWithoutPassword

      return { success: true, user: userWithoutPassword }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // 注册
  const register = async (userData) => {
    isLoading.value = true
    error.value = null

    try {
      // 清理输入
      const email = sanitizeInput(userData.email.toLowerCase())
      const name = sanitizeInput(userData.name)
      const password = sanitizeInput(userData.password)
      const role = userData.role

      // 验证角色
      if (!Object.values(USER_ROLES).includes(role)) {
        throw new Error('Invalid user role')
      }

      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 检查邮箱是否已存在
      const users = getUsersFromStorage()
      const existingUser = users.find((u) => u.email.toLowerCase() === email)

      if (existingUser) {
        throw new Error('This email is already registered')
      }

      // 创建新用户
      const newUser = {
        id: uuidv4(),
        email,
        password, // 实际项目中应该加密
        name,
        role,
        age: userData.age || null,
        phone: userData.phone || '',
        createdAt: new Date().toISOString(),
      }

      // 保存到"数据库"
      users.push(newUser)
      saveUsersToStorage(users)

      // 自动登录
      const { password: _, ...userWithoutPassword } = newUser
      user.value = userWithoutPassword

      return { success: true, user: userWithoutPassword }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // 登出
  const logout = () => {
    user.value = null
    error.value = null
    // 清除认证相关的localStorage数据
    localStorage.removeItem('pinia-auth')
  }

  // 更新用户信息
  const updateProfile = async (updates) => {
    if (!user.value) throw new Error('User not logged in')

    isLoading.value = true
    error.value = null

    try {
      // 清理输入
      const cleanUpdates = {}
      Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
          cleanUpdates[key] = sanitizeInput(String(updates[key]))
        }
      })

      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 更新用户信息
      const updatedUser = { ...user.value, ...cleanUpdates }
      user.value = updatedUser

      // 更新"数据库"
      const users = getUsersFromStorage()
      const userIndex = users.findIndex((u) => u.id === user.value.id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...cleanUpdates }
        saveUsersToStorage(users)
      }

      return { success: true, user: updatedUser }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // 检查权限
  const hasPermission = (requiredRoles) => {
    if (!isAuthenticated.value) return false
    if (!requiredRoles || requiredRoles.length === 0) return true
    return requiredRoles.includes(userRole.value)
  }

  // 获取角色显示名称
  const getRoleDisplayName = (role) => {
    const roleNames = {
      [USER_ROLES.SENIOR]: 'Senior Citizen',
      [USER_ROLES.CAREGIVER]: 'Caregiver',
      [USER_ROLES.HEALTHCARE]: 'Healthcare Professional',
      [USER_ROLES.VOLUNTEER]: 'Volunteer',
    }
    return roleNames[role] || 'Unknown Role'
  }

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  // 初始化
  initializeDefaultUsers()

  return {
    // 状态
    user,
    isLoading,
    error,

    // 计算属性
    isAuthenticated,
    userRole,
    userName,
    userEmail,

    // 常量
    USER_ROLES,

    // 方法
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
    getRoleDisplayName,
    clearError,
  }
})
