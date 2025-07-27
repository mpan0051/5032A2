import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from './auth'

export const useRatingStore = defineStore('rating', () => {
  // 状态
  const ratings = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // 评分类型
  const RATING_TYPES = {
    RESOURCE: 'resource', // 健康资源评分
    SERVICE: 'service', // 支持服务评分
    EVENT: 'event', // 活动评分
  }

  // 计算属性：获取平均评分
  const getAverageRating = computed(() => (itemId, type) => {
    const itemRatings = ratings.value.filter((r) => r.itemId === itemId && r.type === type)

    if (itemRatings.length === 0) return { average: 0, count: 0 }

    const sum = itemRatings.reduce((acc, rating) => acc + rating.score, 0)
    const average = sum / itemRatings.length

    return {
      average: Math.round(average * 10) / 10, // 保留1位小数
      count: itemRatings.length,
    }
  })

  // 计算属性：获取评分分布
  const getRatingDistribution = computed(() => (itemId, type) => {
    const itemRatings = ratings.value.filter((r) => r.itemId === itemId && r.type === type)

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    itemRatings.forEach((rating) => {
      distribution[rating.score]++
    })

    return distribution
  })

  // 计算属性：检查用户是否已评分
  const hasUserRated = computed(() => (itemId, type, userId) => {
    return ratings.value.some((r) => r.itemId === itemId && r.type === type && r.userId === userId)
  })

  // 从localStorage加载评分数据
  const loadRatingsFromStorage = () => {
    const storedRatings = localStorage.getItem('app-ratings')
    if (storedRatings) {
      ratings.value = JSON.parse(storedRatings)
    } else {
      initializeDefaultRatings()
    }
  }

  // 保存评分数据到localStorage
  const saveRatingsToStorage = () => {
    localStorage.setItem('app-ratings', JSON.stringify(ratings.value))
  }

  // 初始化默认评分数据（用于演示）
  const initializeDefaultRatings = () => {
    const defaultRatings = [
      // 健康资源评分示例
      {
        id: uuidv4(),
        itemId: 'resource-1',
        type: RATING_TYPES.RESOURCE,
        userId: 'user-1',
        userName: 'Margaret Johnson',
        score: 5,
        comment:
          'This hypertension management guide is very practical and helped me better understand how to manage my blood pressure effectively.',
        createdAt: '2024-01-20T10:30:00Z',
      },
      {
        id: uuidv4(),
        itemId: 'resource-1',
        type: RATING_TYPES.RESOURCE,
        userId: 'user-2',
        userName: 'David Chen',
        score: 4,
        comment: 'Very detailed content, extremely helpful for caring for my mother.',
        createdAt: '2024-01-22T14:15:00Z',
      },
      // 服务评分示例
      {
        id: uuidv4(),
        itemId: 'service-1',
        type: RATING_TYPES.SERVICE,
        userId: 'user-1',
        userName: 'Margaret Johnson',
        score: 5,
        comment:
          'The meal delivery service is very timely, food is fresh and delicious, and the staff is very friendly.',
        createdAt: '2024-02-01T09:45:00Z',
      },
    ]

    ratings.value = defaultRatings
    saveRatingsToStorage()
  }

  // 提交评分
  const submitRating = async (ratingData) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
      throw new Error('Please log in before submitting a rating')
    }

    isLoading.value = true
    error.value = null

    try {
      // 验证评分数据
      if (!ratingData.itemId || !ratingData.type || !ratingData.score) {
        throw new Error('Incomplete rating data')
      }

      if (ratingData.score < 1 || ratingData.score > 5) {
        throw new Error('Rating must be between 1-5')
      }

      if (!Object.values(RATING_TYPES).includes(ratingData.type)) {
        throw new Error('Invalid rating type')
      }

      // 检查用户是否已经评分过
      const existingRating = ratings.value.find(
        (r) =>
          r.itemId === ratingData.itemId &&
          r.type === ratingData.type &&
          r.userId === authStore.user.id,
      )

      const newRating = {
        id: existingRating?.id || uuidv4(),
        itemId: ratingData.itemId,
        type: ratingData.type,
        userId: authStore.user.id,
        userName: authStore.user.name,
        score: ratingData.score,
        comment: ratingData.comment || '',
        createdAt: existingRating?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (existingRating) {
        // 更新现有评分
        const index = ratings.value.findIndex((r) => r.id === existingRating.id)
        ratings.value[index] = newRating
      } else {
        // 添加新评分
        ratings.value.push(newRating)
      }

      saveRatingsToStorage()

      return {
        success: true,
        message: existingRating ? 'Rating updated successfully' : 'Rating submitted successfully',
        rating: newRating,
      }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // 获取物品的所有评分
  const getItemRatings = (itemId, type, limit = null) => {
    const itemRatings = ratings.value
      .filter((r) => r.itemId === itemId && r.type === type)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return limit ? itemRatings.slice(0, limit) : itemRatings
  }

  // 获取用户的评分
  const getUserRating = (itemId, type, userId) => {
    return ratings.value.find((r) => r.itemId === itemId && r.type === type && r.userId === userId)
  }

  // 删除评分（仅限评分者本人）
  const deleteRating = async (ratingId) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated) {
      throw new Error('Please log in first')
    }

    const rating = ratings.value.find((r) => r.id === ratingId)
    if (!rating) {
      throw new Error('Rating not found')
    }

    if (rating.userId !== authStore.user.id) {
      throw new Error('You can only delete your own ratings')
    }

    isLoading.value = true
    error.value = null

    try {
      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 300))

      ratings.value = ratings.value.filter((r) => r.id !== ratingId)
      saveRatingsToStorage()

      return { success: true, message: 'Rating deleted successfully' }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  // 获取热门评分项目
  const getTopRatedItems = (type, limit = 5) => {
    // 按类型分组评分
    const itemRatings = {}

    ratings.value
      .filter((r) => r.type === type)
      .forEach((rating) => {
        if (!itemRatings[rating.itemId]) {
          itemRatings[rating.itemId] = []
        }
        itemRatings[rating.itemId].push(rating.score)
      })

    // 计算平均评分并排序
    const topItems = Object.keys(itemRatings)
      .map((itemId) => {
        const scores = itemRatings[itemId]
        const average = scores.reduce((a, b) => a + b, 0) / scores.length
        return {
          itemId,
          averageRating: Math.round(average * 10) / 10,
          ratingCount: scores.length,
        }
      })
      .sort((a, b) => {
        // 先按平均评分排序，再按评分数量排序
        if (b.averageRating !== a.averageRating) {
          return b.averageRating - a.averageRating
        }
        return b.ratingCount - a.ratingCount
      })
      .slice(0, limit)

    return topItems
  }

  // 清除错误
  const clearError = () => {
    error.value = null
  }

  // 初始化
  loadRatingsFromStorage()

  return {
    // 状态
    ratings,
    isLoading,
    error,

    // 常量
    RATING_TYPES,

    // 计算属性
    getAverageRating,
    getRatingDistribution,
    hasUserRated,

    // 方法
    submitRating,
    getItemRatings,
    getUserRating,
    deleteRating,
    getTopRatedItems,
    clearError,
  }
})
