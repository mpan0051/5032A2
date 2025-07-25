<!-- src/components/rating/RatingComponent.vue -->
<template>
  <div class="rating-component">
    <!-- 显示模式 -->
    <div v-if="!isEditing" class="rating-display">
      <div class="d-flex align-items-center">
        <!-- 星级显示 -->
        <div class="stars me-3" :aria-label="`当前评分: ${averageRating} 分，满分5分`">
          <i
            v-for="n in 5"
            :key="n"
            :class="getStarClass(n)"
            class="star"
          ></i>
        </div>
        
        <!-- 评分信息 -->
        <div class="rating-info">
          <span class="rating-value">{{ formatRating(averageRating) }}</span>
          <span class="rating-count text-muted ms-2">({{ totalRatings }} 条评价)</span>
        </div>

        <!-- 评价按钮 -->
        <button
          v-if="canRate"
          @click="startRating"
          class="btn btn-outline-primary btn-sm ms-3"
          :disabled="isLoading"
        >
          {{ hasUserRated ? '修改评价' : '写评价' }}
        </button>
      </div>
    </div>

    <!-- 编辑模式 -->
    <div v-else class="rating-editor card p-3 mt-3">
      <h6 class="mb-3">{{ hasUserRated ? '修改您的评价' : '为此项目评分' }}</h6>
      
      <!-- 交互式星级选择 -->
      <div class="stars-interactive mb-3" role="radiogroup" aria-label="选择评分">
        <button
          v-for="n in 5"
          :key="n"
          type="button"
          @click="setRating(n)"
          @mouseover="hoverRating = n"
          @mouseleave="hoverRating = 0"
          :class="['star-button', { active: n <= (hoverRating || currentRating) }]"
          :aria-label="`${n} 星`"
          role="radio"
          :aria-checked="n === currentRating"
        >
          <i class="bi bi-star-fill"></i>
        </button>
      </div>

      <!-- 评价文字 -->
      <div class="mb-3">
        <label for="ratingComment" class="form-label">评价内容（可选）</label>
        <textarea
          id="ratingComment"
          v-model="ratingComment"
          class="form-control"
          rows="3"
          placeholder="分享您的使用体验..."
          maxlength="500"
        ></textarea>
        <div class="form-text">{{ ratingComment.length }}/500</div>
      </div>

      <!-- 错误信息 -->
      <div v-if="ratingError" class="alert alert-danger" role="alert">
        {{ ratingError }}
      </div>

      <!-- 操作按钮 -->
      <div class="d-flex gap-2">
        <button
          @click="submitRating"
          class="btn btn-primary"
          :disabled="!currentRating || isLoading"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
          {{ hasUserRated ? '更新评价' : '提交评价' }}
        </button>
        <button @click="cancelRating" class="btn btn-secondary">
          取消
        </button>
      </div>
    </div>

    <!-- 评价列表 -->
    <div v-if="showReviews && ratings.length > 0" class="reviews-section mt-4">
      <h6 class="mb-3">用户评价</h6>
      <div class="reviews-list">
        <div
          v-for="rating in displayedRatings"
          :key="rating.id"
          class="review-item border-bottom pb-3 mb-3"
        >
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <div class="stars-small">
                <i
                  v-for="n in 5"
                  :key="n"
                  :class="n <= rating.score ? 'bi bi-star-fill text-warning' : 'bi bi-star text-muted'"
                ></i>
              </div>
              <small class="text-muted">{{ rating.userName }} · {{ formatDate(rating.createdAt) }}</small>
            </div>
          </div>
          <p v-if="rating.comment" class="mb-0">{{ rating.comment }}</p>
        </div>
      </div>
      
      <!-- 查看更多按钮 -->
      <button
        v-if="ratings.length > displayLimit"
        @click="showMore"
        class="btn btn-link p-0"
      >
        查看全部 {{ ratings.length }} 条评价
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../store/modules/auth'
import { ratingUtils } from '../../store/utils/localStorage'

export default {
  name: 'RatingComponent',
  props: {
    resourceId: {
      type: String,
      required: true
    },
    resourceType: {
      type: String,
      default: 'service'
    },
    showReviews: {
      type: Boolean,
      default: true
    }
  },
  emits: ['rating-updated'],
  setup(props, { emit }) {
    const authStore = useAuthStore()

    // 响应式数据
    const ratings = ref([])
    const isEditing = ref(false)
    const currentRating = ref(0)
    const hoverRating = ref(0)
    const ratingComment = ref('')
    const ratingError = ref('')
    const isLoading = ref(false)
    const displayLimit = ref(5)

    // 计算属性
    const canRate = computed(() => authStore.isAuthenticated)
    
    const averageRating = computed(() => {
      return ratingUtils.calculateAverageRating(ratings.value)
    })

    const totalRatings = computed(() => ratings.value.length)

    const hasUserRated = computed(() => {
      if (!authStore.isAuthenticated) return false
      return ratings.value.some(r => r.userId === authStore.user.id)
    })

    const displayedRatings = computed(() => {
      return ratings.value.slice(0, displayLimit.value)
    })

    // 方法
    const loadRatings = () => {
      try {
        const storageKey = `ratings_${props.resourceType}_${props.resourceId}`
        const storedRatings = localStorage.getItem(storageKey)
        if (storedRatings) {
          ratings.value = JSON.parse(storedRatings)
        }
      } catch (error) {
        console.error('加载评分数据失败:', error)
      }
    }

    const saveRatings = () => {
      try {
        const storageKey = `ratings_${props.resourceType}_${props.resourceId}`
        localStorage.setItem(storageKey, JSON.stringify(ratings.value))
      } catch (error) {
        console.error('保存评分数据失败:', error)
      }
    }

    const getStarClass = (starNumber) => {
      const rating = averageRating.value
      if (starNumber <= Math.floor(rating)) {
        return 'bi bi-star-fill text-warning'
      } else if (starNumber - 0.5 <= rating) {
        return 'bi bi-star-half text-warning'
      } else {
        return 'bi bi-star text-muted'
      }
    }

    const formatRating = (rating) => {
      return ratingUtils.formatRating(rating)
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN')
    }

    const startRating = () => {
      if (!authStore.isAuthenticated) {
        ratingError.value = '请先登录后再进行评价'
        return
      }

      // 如果用户已经评价过，加载现有评价
      if (hasUserRated.value) {
        const userRating = ratings.value.find(r => r.userId === authStore.user.id)
        currentRating.value = userRating.score
        ratingComment.value = userRating.comment || ''
      }

      isEditing.value = true
      ratingError.value = ''
    }

    const setRating = (rating) => {
      currentRating.value = rating
    }

    const submitRating = async () => {
      if (!currentRating.value) {
        ratingError.value = '请选择评分'
        return
      }

      if (!ratingUtils.validateRating(currentRating.value)) {
        ratingError.value = '评分必须在1-5分之间'
        return
      }

      isLoading.value = true
      ratingError.value = ''

      try {
        const ratingData = {
          id: Date.now().toString(),
          userId: authStore.user.id,
          userName: authStore.user.name,
          resourceId: props.resourceId,
          resourceType: props.resourceType,
          score: currentRating.value,
          comment: ratingComment.value.trim(),
          createdAt: new Date().toISOString()
        }

        if (hasUserRated.value) {
          // 更新现有评价
          const index = ratings.value.findIndex(r => r.userId === authStore.user.id)
          ratings.value[index] = { ...ratings.value[index], ...ratingData }
        } else {
          // 添加新评价
          ratings.value.push(ratingData)
        }

        saveRatings()
        emit('rating-updated', averageRating.value)
        
        isEditing.value = false
        currentRating.value = 0
        ratingComment.value = ''
      } catch (error) {
        ratingError.value = '提交评价失败，请稍后重试'
        console.error('提交评价错误:', error)
      } finally {
        isLoading.value = false
      }
    }

    const cancelRating = () => {
      isEditing.value = false
      currentRating.value = 0
      ratingComment.value = ''
      ratingError.value = ''
      hoverRating.value = 0
    }

    const showMore = () => {
      displayLimit.value = ratings.value.length
    }

    onMounted(() => {
      loadRatings()
    })

    return {
      ratings,
      isEditing,
      currentRating,
      hoverRating,
      ratingComment,
      ratingError,
      isLoading,
      canRate,
      averageRating,
      totalRatings,
      hasUserRated,
      displayedRatings,
      displayLimit,
      getStarClass,
      formatRating,
      formatDate,
      startRating,
      setRating,
      submitRating,
      cancelRating,
      showMore
    }
  }
}
</script>

<style scoped>
.stars .star {
  font-size: 1.2rem;
  margin-right: 0.2rem;
}

.rating-value {
  font-weight: 600;
  font-size: 1.1rem;
}

.stars-interactive {
  display: flex;
  gap: 0.25rem;
}

.star-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #dee2e6;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0.25rem;
}

.star-button:hover,
.star-button.active {
  color: #ffc107;
}

.star-button:focus {
  outline: 2px solid #0d6efd;
  outline-offset: 2px;
}

.stars-small i {
  font-size: 0.875rem;
  margin-right: 0.1rem;
}

.review-item:last-child {
  border-bottom: none !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

/* 辅助功能增强 */
@media (prefers-reduced-motion: reduce) {
  .star-button {
    transition: none;
  }
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .star-button {
    border: 1px solid currentColor;
  }
}
</style>

<!-- src/views/HealthResources.vue -->
<template>
  <div class="health-resources-page">
    <div class="container py-4">
      <!-- 页面标题 -->
      <div class="page-header mb-5">
        <h1 class="display-5 text-primary mb-3">健康资源</h1>
        <p class="lead text-muted">为您提供全面的健康信息和医疗资源</p>
      </div>

      <!-- 搜索和筛选 -->
      <div class="search-filter-section mb-4">
        <div class="row">
          <div class="col-md-6 mb-3">
            <div class="input-group">
              <input
                type="text"
                v-model="searchQuery"
                @input="handleSearch"
                class="form-control"
                placeholder="搜索健康资源..."
                aria-label="搜索健康资源"
              >
              <button class="btn btn-outline-secondary" type="button">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <select v-model="selectedCategory" @change="filterResources" class="form-select">
              <option value="">所有分类</option>
              <option value="medical">医疗信息</option>
              <option value="wellness">健康养生</option>
              <option value="mental">心理健康</option>
              <option value="nutrition">营养膳食</option>
            </select>
          </div>
          <div class="col-md-3 mb-3">
            <select v-model="sortBy" @change="sortResources" class="form-select">
              <option value="rating">按评分排序</option>
              <option value="name">按名称排序</option>
              <option value="date">按日期排序</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 资源列表 -->
      <div class="resources-grid">
        <div class="row">
          <div
            v-for="resource in filteredResources"
            :key="resource.id"
            class="col-lg-6 col-xl-4 mb-4"
          >
            <div class="card h-100 shadow-sm resource-card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <h5 class="card-title">{{ resource.title }}</h5>
                  <span :class="['badge', getCategoryClass(resource.category)]">
                    {{ getCategoryName(resource.category) }}
                  </span>
                </div>
                
                <p class="card-text text-muted">{{ resource.description }}</p>
                
                <!-- 评分组件 -->
                <RatingComponent
                  :resource-id="resource.id"
                  resource-type="health-resource"
                  :show-reviews="false"
                  @rating-updated="updateResourceRating(resource.id, $event)"
                />
                
                <!-- 详细信息 -->
                <div class="resource-details mt-3">
                  <small class="text-muted d-block">
                    <i class="bi bi-clock me-1"></i>
                    更新时间: {{ formatDate(resource.updatedAt) }}
                  </small>
                  <small class="text-muted d-block" v-if="resource.author">
                    <i class="bi bi-person me-1"></i>
                    作者: {{ resource.author }}
                  </small>
                </div>
              </div>
              
              <div class="card-footer bg-transparent">
                <button
                  @click="viewResource(resource)"
                  class="btn btn-primary btn-sm me-2"
                >
                  查看详情
                </button>
                <button
                  @click="bookmarkResource(resource)"
                  :class="['btn', 'btn-outline-secondary', 'btn-sm', { active: isBookmarked(resource.id) }]"
                >
                  <i :class="isBookmarked(resource.id) ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"></i>
                  {{ isBookmarked(resource.id) ? '已收藏' : '收藏' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredResources.length === 0" class="empty-state text-center py-5">
        <i class="bi bi-search display-1 text-muted mb-3"></i>
        <h4 class="text-muted">未找到相关资源</h4>
        <p class="text-muted">请尝试调整搜索条件或筛选选项</p>
      </div>

      <!-- 资源详情模态框 -->
      <div class="modal fade" id="resourceModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ selectedResource?.title }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="关闭"></button>
            </div>
            <div class="modal-body">
              <div v-if="selectedResource">
                <div class="mb-3">
                  <span :class="['badge', getCategoryClass(selectedResource.category), 'mb-2']">
                    {{ getCategoryName(selectedResource.category) }}
                  </span>
                  <p>{{ selectedResource.description }}</p>
                </div>
                
                <div class="resource-content" v-html="sanitizeHtml(selectedResource.content)"></div>
                
                <!-- 评分和评论 -->
                <div class="mt-4">
                  <RatingComponent
                    :resource-id="selectedResource.id"
                    resource-type="health-resource"
                    :show-reviews="true"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                关闭
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../store/modules/auth'
import { sanitizeHtml } from '../store/utils/security'
import RatingComponent from '../components/rating/RatingComponent.vue'

export default {
  name: 'HealthResources',
  components: {
    RatingComponent
  },
  setup() {
    const authStore = useAuthStore()

    // 响应式数据
    const resources = ref([])
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortBy = ref('rating')
    const selectedResource = ref(null)
    const bookmarkedResources = ref([])

    // 模拟健康资源数据
    const initializeResources = () => {
      resources.value = [
        {
          id: '1',
          title: '糖尿病管理指南',
          description: '为糖尿病患者提供日常管理和饮食建议',
          category: 'medical',
          author: '张医生',
          content: '<h3>糖尿病管理要点</h3><p>1. 定期监测血糖</p><p>2. 合理控制饮食</p><p>3. 适量运动</p><p>4. 按时服药</p>',
          updatedAt: '2024-01-15',
          rating: 4.5
        },
        {
          id: '2',
          title: '老年人心理健康',
          description: '关注老年人心理健康，预防抑郁症',
          category: 'mental',
          author: '李心理师',
          content: '<h3>保持心理健康的方法</h3><p>1. 保持社交联系</p><p>2. 培养兴趣爱好</p><p>3. 适当运动</p>',
          updatedAt: '2024-01-10',
          rating: 4.8
        },
        {
          id: '3',
          title: '营养膳食搭配',
          description: '为老年人提供营养均衡的膳食建议',
          category: 'nutrition',
          author: '王营养师',
          content: '<h3>老年人营养要点</h3><p>1. 多样化饮食</p><p>2. 适量蛋白质</p><p>3. 充足维生素</p>',
          updatedAt: '2024-01-08',
          rating: 4.2
        }
      ]
    }

    // 计算属性
    const filteredResources = computed(() => {
      let filtered = resources.value

      // 按分类筛选
      if (selectedCategory.value) {
        filtered = filtered.filter(r => r.category === selectedCategory.value)
      }

      // 按搜索查询筛选
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(r =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
        )
      }

      // 排序
      filtered.sort((a, b) => {
        switch (sortBy.value) {
          case 'rating':
            return (b.rating || 0) - (a.rating || 0)
          case 'name':
            return a.title.localeCompare(b.title)
          case 'date':
            return new Date(b.updatedAt) - new Date(a.updatedAt)
          default:
            return 0
        }
      })

      return filtered
    })

    // 方法
    const handleSearch = () => {
      // 搜索逻辑已在计算属性中处理
    }

    const filterResources = () => {
      // 筛选逻辑已在计算属性中处理
    }

    const sortResources = () => {
      // 排序逻辑已在计算属性中处理
    }

    const getCategoryClass = (category) => {
      const classMap = {
        'medical': 'bg-danger',
        'wellness': 'bg-success',
        'mental': 'bg-info',
        'nutrition': 'bg-warning'
      }
      return classMap[category] || 'bg-secondary'
    }

    const getCategoryName = (category) => {
      const nameMap = {
        'medical': '医疗信息',
        'wellness': '健康养生',
        'mental': '心理健康',
        'nutrition': '营养膳食'
      }
      return nameMap[category] || '其他'
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN')
    }

    const viewResource = (resource) => {
      selectedResource.value = resource
      // 显示模态框（需要Bootstrap JS）
      const modal = new bootstrap.Modal(document.getElementById('resourceModal'))
      modal.show()
    }

    const bookmarkResource = (resource) => {
      if (!authStore.isAuthenticated) {
        alert('请先登录后再收藏')
        return
      }

      const index = bookmarkedResources.value.indexOf(resource.id)
      if (index > -1) {
        bookmarkedResources.value.splice(index, 1)
      } else {
        bookmarkedResources.value.push(resource.id)
      }

      // 保存到localStorage
      localStorage.setItem('bookmarked_resources', JSON.stringify(bookmarkedResources.value))
    }

    const isBookmarked = (resourceId) => {
      return bookmarkedResources.value.includes(resourceId)
    }

    const updateResourceRating = (resourceId, newRating) => {
      const resource = resources.value.find(r => r.id === resourceId)
      if (resource) {
        resource.rating = newRating
      }
    }

    const loadBookmarks = () => {
      try {
        const bookmarks = localStorage.getItem('bookmarked_resources')
        if (bookmarks) {
          bookmarkedResources.value = JSON.parse(bookmarks)
        }
      } catch (error) {
        console.error('加载收藏列表失败:', error)
      }
    }

    onMounted(() => {
      initializeResources()
      loadBookmarks()
    })

    return {
      resources,
      searchQuery,
      selectedCategory,
      sortBy,
      selectedResource,
      filteredResources,
      handleSearch,
      filterResources,
      sortResources,
      getCategoryClass,
      getCategoryName,
      formatDate,
      viewResource,
      bookmarkResource,
      isBookmarked,
      updateResourceRating,
      sanitizeHtml
    }
  }
}
</script>

<style scoped>
.resource-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.resource-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  margin: -2rem -15px 2rem -15px;
  border-radius: 0 0 1rem 1rem;
}

.search-filter-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.empty-state {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
}

.resource-content {
  max-height: 400px;
  overflow-y: auto;
}

.badge {
  font-size: 0.75rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .page-header {
    padding: 2rem 1rem;
    margin: -1rem -15px 1rem -15px;
  }
}
</style>