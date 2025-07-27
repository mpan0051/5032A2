<template>
  <div class="rating-component">
    <!-- 评分显示区域 -->
    <div class="rating-display mb-3">
      <div class="d-flex align-items-center mb-2">
        <!-- 星星显示 -->
        <div class="stars-display me-3">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ filled: star <= Math.round(averageRating.average) }"
          >
            <i class="fas fa-star"></i>
          </span>
        </div>

        <!-- 平均分数和评分总数 -->
        <div class="rating-info">
          <span class="rating-score fs-5 fw-bold text-primary">
            {{ averageRating.average.toFixed(1) }}
          </span>
          <span class="text-muted ms-2">
            ({{ averageRating.count }} {{ averageRating.count === 1 ? 'rating' : 'ratings' }})
          </span>
        </div>
      </div>

      <!-- 评分分布（可选显示） -->
      <div v-if="showDistribution && averageRating.count > 0" class="rating-distribution">
        <div
          v-for="score in [5, 4, 3, 2, 1]"
          :key="score"
          class="distribution-bar d-flex align-items-center mb-1"
        >
          <span class="score-label me-2">{{ score }}</span>
          <i class="fas fa-star text-warning me-2"></i>
          <div class="progress flex-grow-1 me-2" style="height: 8px">
            <div
              class="progress-bar bg-warning"
              :style="{ width: getDistributionPercentage(score) + '%' }"
            ></div>
          </div>
          <span class="count-label small text-muted">{{ ratingDistribution[score] }}</span>
        </div>
      </div>
    </div>

    <!-- 添加评分按钮（仅登录用户） -->
    <div v-if="authStore.isAuthenticated && !userHasRated" class="add-rating mb-3">
      <button
        @click="showRatingForm = true"
        class="btn btn-outline-primary"
        :disabled="ratingStore.isLoading"
      >
        <i class="fas fa-plus me-2"></i>Add Your Rating
      </button>
    </div>

    <!-- 用户已评分提示 -->
    <div v-else-if="authStore.isAuthenticated && userHasRated" class="user-rated mb-3">
      <div class="alert alert-info d-flex align-items-center">
        <i class="fas fa-check-circle me-2"></i>
        <span>You have already rated this item.</span>
        <button @click="editUserRating" class="btn btn-sm btn-outline-info ms-auto">
          Edit Rating
        </button>
      </div>
    </div>

    <!-- 评分表单 -->
    <div v-if="showRatingForm" class="rating-form card border-primary mb-3">
      <div class="card-header bg-primary text-white">
        <h6 class="mb-0"><i class="fas fa-star me-2"></i>Rate This Item</h6>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitRating">
          <!-- 星星评分选择 -->
          <div class="mb-3">
            <label class="form-label fw-bold">Your Rating</label>
            <div class="stars-input">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="selectedRating = star"
                @mouseover="hoveredRating = star"
                @mouseleave="hoveredRating = 0"
                class="star-button"
                :class="{
                  active: star <= selectedRating,
                  hovered: star <= hoveredRating,
                }"
                :aria-label="`Rate ${star} star${star > 1 ? 's' : ''}`"
              >
                <i class="fas fa-star"></i>
              </button>
            </div>
            <div v-if="selectedRating > 0" class="rating-text mt-2">
              <small class="text-muted">{{ getRatingText(selectedRating) }}</small>
            </div>
            <div v-if="formErrors.score" class="text-danger small mt-1">
              {{ formErrors.score }}
            </div>
          </div>

          <!-- 评论输入 -->
          <div class="mb-3">
            <label for="rating-comment" class="form-label">
              Comment <span class="text-muted">(Optional)</span>
            </label>
            <textarea
              id="rating-comment"
              v-model="ratingComment"
              class="form-control"
              rows="3"
              placeholder="Share your experience..."
              maxlength="500"
              :class="{ 'is-invalid': formErrors.comment }"
            ></textarea>
            <div class="form-text">{{ ratingComment.length }}/500 characters</div>
            <div v-if="formErrors.comment" class="invalid-feedback">
              {{ formErrors.comment }}
            </div>
          </div>

          <!-- 表单按钮 -->
          <div class="d-flex gap-2">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="selectedRating === 0 || ratingStore.isLoading"
            >
              <span
                v-if="ratingStore.isLoading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              <i v-else class="fas fa-check me-2"></i>
              {{ editingRating ? 'Update Rating' : 'Submit Rating' }}
            </button>
            <button type="button" @click="cancelRating" class="btn btn-outline-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 错误消息 -->
    <div v-if="ratingStore.error" class="alert alert-danger">
      <i class="fas fa-exclamation-triangle me-2"></i>
      {{ ratingStore.error }}
    </div>

    <!-- 最近评分列表 -->
    <div v-if="showRecentRatings && recentRatings.length > 0" class="recent-ratings">
      <h6 class="fw-bold mb-3">Recent Reviews</h6>
      <div class="rating-list">
        <div v-for="rating in recentRatings" :key="rating.id" class="rating-item card mb-2">
          <div class="card-body p-3">
            <div class="d-flex align-items-start mb-2">
              <div class="rating-header flex-grow-1">
                <div class="d-flex align-items-center mb-1">
                  <strong class="me-2">{{ rating.userName }}</strong>
                  <div class="stars-small me-2">
                    <span
                      v-for="star in 5"
                      :key="star"
                      class="star-small"
                      :class="{ filled: star <= rating.score }"
                    >
                      <i class="fas fa-star"></i>
                    </span>
                  </div>
                  <small class="text-muted">{{ formatDate(rating.createdAt) }}</small>
                </div>
              </div>
              <!-- 删除按钮（仅自己的评分） -->
              <div v-if="authStore.user?.id === rating.userId" class="rating-actions">
                <button
                  @click="deleteRating(rating.id)"
                  class="btn btn-sm btn-outline-danger"
                  title="Delete rating"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
            <p v-if="rating.comment" class="mb-0 text-muted">
              {{ rating.comment }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRatingStore } from '@/stores/rating'
import { validateRatingForm } from '@/utils/validation'

export default {
  name: 'RatingComponent',
  props: {
    itemId: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
      validator: (value) => ['resource', 'service', 'event'].includes(value),
    },
    showDistribution: {
      type: Boolean,
      default: false,
    },
    showRecentRatings: {
      type: Boolean,
      default: true,
    },
    maxRecentRatings: {
      type: Number,
      default: 5,
    },
  },
  setup(props) {
    const authStore = useAuthStore()
    const ratingStore = useRatingStore()

    // 响应式数据
    const showRatingForm = ref(false)
    const selectedRating = ref(0)
    const hoveredRating = ref(0)
    const ratingComment = ref('')
    const editingRating = ref(false)
    const formErrors = ref({})

    // 计算属性
    const averageRating = computed(() => {
      return ratingStore.getAverageRating(props.itemId, props.itemType)
    })

    const ratingDistribution = computed(() => {
      return ratingStore.getRatingDistribution(props.itemId, props.itemType)
    })

    const userHasRated = computed(() => {
      if (!authStore.isAuthenticated) return false
      return ratingStore.hasUserRated(props.itemId, props.itemType, authStore.user.id)
    })

    const recentRatings = computed(() => {
      return ratingStore.getItemRatings(props.itemId, props.itemType, props.maxRecentRatings)
    })

    // 方法
    const getRatingText = (rating) => {
      const texts = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent',
      }
      return texts[rating] || ''
    }

    const getDistributionPercentage = (score) => {
      const total = averageRating.value.count
      if (total === 0) return 0
      return (ratingDistribution.value[score] / total) * 100
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    const editUserRating = () => {
      const userRating = ratingStore.getUserRating(props.itemId, props.itemType, authStore.user.id)

      if (userRating) {
        selectedRating.value = userRating.score
        ratingComment.value = userRating.comment || ''
        editingRating.value = true
        showRatingForm.value = true
      }
    }

    const submitRating = async () => {
      // 验证表单
      const formData = {
        score: selectedRating.value,
        comment: ratingComment.value,
      }

      const validation = validateRatingForm(formData)
      if (!validation.isValid) {
        formErrors.value = validation.errors
        return
      }

      formErrors.value = {}

      try {
        const result = await ratingStore.submitRating({
          itemId: props.itemId,
          type: props.itemType,
          score: selectedRating.value,
          comment: ratingComment.value.trim(),
        })

        if (result.success) {
          resetForm()
          showRatingForm.value = false
          // 可以在这里添加成功提示
        }
      } catch (error) {
        console.error('Rating submission error:', error)
      }
    }

    const deleteRating = async (ratingId) => {
      if (confirm('Are you sure you want to delete this rating?')) {
        try {
          const result = await ratingStore.deleteRating(ratingId)
          if (result.success) {
            // 可以在这里添加成功提示
          }
        } catch (error) {
          console.error('Rating deletion error:', error)
        }
      }
    }

    const cancelRating = () => {
      resetForm()
      showRatingForm.value = false
    }

    const resetForm = () => {
      selectedRating.value = 0
      hoveredRating.value = 0
      ratingComment.value = ''
      editingRating.value = false
      formErrors.value = {}
    }

    // 监听错误清除
    watch(
      () => ratingStore.error,
      (newError) => {
        if (!newError) {
          formErrors.value = {}
        }
      },
    )

    // 清除错误当组件卸载
    onMounted(() => {
      ratingStore.clearError()
    })

    return {
      authStore,
      ratingStore,
      showRatingForm,
      selectedRating,
      hoveredRating,
      ratingComment,
      editingRating,
      formErrors,
      averageRating,
      ratingDistribution,
      userHasRated,
      recentRatings,
      getRatingText,
      getDistributionPercentage,
      formatDate,
      editUserRating,
      submitRating,
      deleteRating,
      cancelRating,
      resetForm,
    }
  },
}
</script>

<style scoped>
.rating-component {
  max-width: 100%;
}

/* 星星显示样式 */
.stars-display .star,
.stars-small .star-small {
  color: #ddd;
  font-size: 1.2rem;
  margin-right: 2px;
}

.stars-display .star.filled,
.stars-small .star-small.filled {
  color: #ffc107;
}

.stars-small .star-small {
  font-size: 0.9rem;
}

/* 星星输入样式 */
.stars-input {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.star-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 5px;
  border-radius: 4px;
}

.star-button:hover,
.star-button.hovered {
  color: #ffb300;
}

.star-button.active {
  color: #ffc107;
}

.star-button:focus {
  outline: 2px solid var(--bs-primary);
  outline-offset: 2px;
}

/* 分布条样式 */
.distribution-bar {
  font-size: 0.875rem;
}

.score-label {
  width: 15px;
  text-align: center;
  font-weight: 600;
}

.count-label {
  width: 30px;
  text-align: right;
}

/* 评分项样式 */
.rating-item {
  border: 1px solid #e9ecef;
  transition: box-shadow 0.2s ease;
}

.rating-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .stars-display .star {
    font-size: 1rem;
  }

  .star-button {
    font-size: 1.5rem;
    padding: 3px;
  }

  .rating-info {
    font-size: 0.9rem;
  }

  .distribution-bar {
    font-size: 0.8rem;
  }
}

/* 无障碍设计 */
@media (prefers-reduced-motion: reduce) {
  .star-button,
  .rating-item {
    transition: none;
  }
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .star-button {
    border: 1px solid #000;
  }

  .star-button.active {
    background-color: #ffc107;
    color: #000;
  }

  .rating-item {
    border-width: 2px;
  }
}

/* 打印样式 */
@media print {
  .rating-form,
  .add-rating,
  .rating-actions {
    display: none;
  }
}
</style>
