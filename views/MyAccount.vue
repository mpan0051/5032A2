<template>
  <div class="my-account-page">
    <!-- 页面标题区域 -->
    <section class="page-header bg-primary text-white py-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h1 class="h3 fw-bold mb-2"><i class="fas fa-user-circle me-2"></i>My Account</h1>
            <p class="mb-0 text-light">Manage your profile, preferences, and account settings</p>
          </div>
          <div class="col-md-4 text-md-end">
            <div class="user-info-card bg-white bg-opacity-20 p-3 rounded-3">
              <div class="d-flex align-items-center">
                <div class="user-avatar me-3">
                  <i class="fas fa-user-circle fa-2x text-warning"></i>
                </div>
                <div class="user-details">
                  <div class="fw-bold">{{ authStore.userName }}</div>
                  <small class="text-light">{{
                    authStore.getRoleDisplayName(authStore.userRole)
                  }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <section class="account-content py-5">
      <div class="container">
        <div class="row">
          <!-- 侧边栏导航 -->
          <div class="col-lg-3 mb-4">
            <div class="account-sidebar">
              <div class="nav nav-pills flex-column" role="tablist">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="{ active: activeTab === tab.id }"
                  class="nav-link text-start mb-2"
                  type="button"
                >
                  <i :class="tab.icon" class="me-2"></i>{{ tab.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- 主要内容区域 -->
          <div class="col-lg-9">
            <div class="tab-content">
              <!-- 个人信息标签页 -->
              <div v-show="activeTab === 'profile'" class="tab-pane fade show active">
                <div class="card shadow-sm">
                  <div class="card-header bg-primary text-white">
                    <h5 class="mb-0"><i class="fas fa-user-edit me-2"></i>Personal Information</h5>
                  </div>
                  <div class="card-body">
                    <!-- 成功消息 -->
                    <div
                      v-if="successMessage"
                      class="alert alert-success d-flex align-items-center"
                      role="alert"
                    >
                      <i class="fas fa-check-circle me-2"></i>
                      {{ successMessage }}
                    </div>

                    <!-- 错误消息 -->
                    <div
                      v-if="authStore.error"
                      class="alert alert-danger d-flex align-items-center"
                      role="alert"
                    >
                      <i class="fas fa-exclamation-triangle me-2"></i>
                      {{ authStore.error }}
                    </div>

                    <form @submit.prevent="updateProfile">
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <label for="profileName" class="form-label fw-bold">Full Name</label>
                          <input
                            id="profileName"
                            v-model="profileForm.name"
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': formErrors.name }"
                            required
                          />
                          <div v-if="formErrors.name" class="invalid-feedback">
                            {{ formErrors.name }}
                          </div>
                        </div>

                        <div class="col-md-6 mb-3">
                          <label for="profileEmail" class="form-label fw-bold">Email Address</label>
                          <input
                            id="profileEmail"
                            v-model="profileForm.email"
                            type="email"
                            class="form-control"
                            :class="{ 'is-invalid': formErrors.email }"
                            required
                          />
                          <div v-if="formErrors.email" class="invalid-feedback">
                            {{ formErrors.email }}
                          </div>
                        </div>

                        <div class="col-md-6 mb-3">
                          <label for="profileAge" class="form-label fw-bold">Age</label>
                          <input
                            id="profileAge"
                            v-model="profileForm.age"
                            type="number"
                            class="form-control"
                            min="18"
                            max="120"
                          />
                        </div>

                        <div class="col-md-6 mb-3">
                          <label for="profilePhone" class="form-label fw-bold">Phone Number</label>
                          <input
                            id="profilePhone"
                            v-model="profileForm.phone"
                            type="tel"
                            class="form-control"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div class="col-12 mb-3">
                          <label class="form-label fw-bold">Role</label>
                          <div class="form-control-plaintext">
                            <span class="badge bg-primary fs-6">
                              {{ authStore.getRoleDisplayName(authStore.userRole) }}
                            </span>
                            <small class="text-muted ms-2"
                              >Contact support to change your role</small
                            >
                          </div>
                        </div>
                      </div>

                      <div class="d-flex gap-2">
                        <button
                          type="submit"
                          class="btn btn-primary"
                          :disabled="authStore.isLoading"
                        >
                          <span
                            v-if="authStore.isLoading"
                            class="spinner-border spinner-border-sm me-2"
                          ></span>
                          <i v-else class="fas fa-save me-2"></i>
                          {{ authStore.isLoading ? 'Updating...' : 'Update Profile' }}
                        </button>
                        <button
                          type="button"
                          @click="resetProfileForm"
                          class="btn btn-outline-secondary"
                        >
                          <i class="fas fa-undo me-2"></i>Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <!-- 我的评分标签页 -->
              <div v-show="activeTab === 'ratings'" class="tab-pane">
                <div class="card shadow-sm">
                  <div class="card-header bg-success text-white">
                    <h5 class="mb-0"><i class="fas fa-star me-2"></i>My Ratings & Reviews</h5>
                  </div>
                  <div class="card-body">
                    <div v-if="userRatings.length === 0" class="text-center py-5">
                      <i class="fas fa-star fa-3x text-muted mb-3"></i>
                      <h5 class="text-muted">No Ratings Yet</h5>
                      <p class="text-muted mb-4">
                        Start rating resources and services to help other community members!
                      </p>
                      <RouterLink to="/health-resources" class="btn btn-primary">
                        <i class="fas fa-stethoscope me-2"></i>Explore Resources
                      </RouterLink>
                    </div>

                    <div v-else class="ratings-list">
                      <div
                        v-for="rating in userRatings"
                        :key="rating.id"
                        class="rating-item card mb-3"
                      >
                        <div class="card-body">
                          <div class="d-flex justify-content-between align-items-start mb-2">
                            <div class="rating-header">
                              <h6 class="mb-1">{{ getRatingItemTitle(rating) }}</h6>
                              <div class="rating-stars mb-1">
                                <span
                                  v-for="star in 5"
                                  :key="star"
                                  class="star"
                                  :class="{ filled: star <= rating.score }"
                                >
                                  <i class="fas fa-star"></i>
                                </span>
                                <span class="ms-2 text-muted">{{ rating.score }}/5</span>
                              </div>
                              <small class="text-muted">
                                {{ formatDate(rating.createdAt) }}
                                {{ rating.updatedAt !== rating.createdAt ? '(Updated)' : '' }}
                              </small>
                            </div>
                            <div class="rating-actions">
                              <button
                                @click="editRating(rating)"
                                class="btn btn-sm btn-outline-primary me-2"
                              >
                                <i class="fas fa-edit"></i>
                              </button>
                              <button
                                @click="deleteUserRating(rating.id)"
                                class="btn btn-sm btn-outline-danger"
                              >
                                <i class="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <p v-if="rating.comment" class="mb-0 text-muted">
                            "{{ rating.comment }}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 保存的资源标签页 -->
              <div v-show="activeTab === 'saved'" class="tab-pane">
                <div class="card shadow-sm">
                  <div class="card-header bg-warning text-dark">
                    <h5 class="mb-0"><i class="fas fa-bookmark me-2"></i>Saved Resources</h5>
                  </div>
                  <div class="card-body">
                    <div v-if="savedResourcesList.length === 0" class="text-center py-5">
                      <i class="fas fa-bookmark fa-3x text-muted mb-3"></i>
                      <h5 class="text-muted">No Saved Resources</h5>
                      <p class="text-muted mb-4">Save resources to easily find them later!</p>
                      <RouterLink to="/health-resources" class="btn btn-warning">
                        <i class="fas fa-search me-2"></i>Browse Resources
                      </RouterLink>
                    </div>

                    <div v-else class="saved-resources">
                      <div
                        v-for="resource in savedResourcesList"
                        :key="resource.id"
                        class="saved-resource card mb-3"
                      >
                        <div class="card-body">
                          <div class="row align-items-center">
                            <div class="col-md-8">
                              <div class="resource-info">
                                <div class="resource-meta mb-2">
                                  <span class="badge bg-primary">{{
                                    getCategoryLabel(resource.category)
                                  }}</span>
                                  <span class="badge bg-secondary ms-1">{{
                                    resource.readTime
                                  }}</span>
                                </div>
                                <h6 class="mb-2">{{ resource.title }}</h6>
                                <p class="text-muted mb-1">{{ resource.description }}</p>
                                <small class="text-muted">By {{ resource.author }}</small>
                              </div>
                            </div>
                            <div class="col-md-4 text-md-end">
                              <div class="resource-actions">
                                <RouterLink
                                  :to="`/health-resources/${resource.id}`"
                                  class="btn btn-primary btn-sm me-2"
                                >
                                  <i class="fas fa-eye me-1"></i>View
                                </RouterLink>
                                <button
                                  @click="removeSavedResource(resource.id)"
                                  class="btn btn-outline-danger btn-sm"
                                >
                                  <i class="fas fa-bookmark-slash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 账户设置标签页 -->
              <div v-show="activeTab === 'settings'" class="tab-pane">
                <div class="card shadow-sm">
                  <div class="card-header bg-info text-white">
                    <h5 class="mb-0"><i class="fas fa-cogs me-2"></i>Account Settings</h5>
                  </div>
                  <div class="card-body">
                    <!-- 安全设置 -->
                    <div class="settings-section mb-4">
                      <h6 class="fw-bold mb-3">Security</h6>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="setting-item">
                            <div class="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>Password</strong>
                                <br /><small class="text-muted">Last changed: Never</small>
                              </div>
                              <button class="btn btn-outline-primary btn-sm">
                                <i class="fas fa-key me-1"></i>Change
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="setting-item">
                            <div class="d-flex justify-content-between align-items-center">
                              <div>
                                <strong>Two-Factor Auth</strong>
                                <br /><small class="text-muted">Not enabled</small>
                              </div>
                              <button class="btn btn-outline-success btn-sm">
                                <i class="fas fa-shield-alt me-1"></i>Enable
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 通知设置 -->
                    <div class="settings-section mb-4">
                      <h6 class="fw-bold mb-3">Notifications</h6>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-check form-switch mb-3">
                            <input
                              id="emailNotifications"
                              v-model="settings.emailNotifications"
                              class="form-check-input"
                              type="checkbox"
                            />
                            <label for="emailNotifications" class="form-check-label">
                              <strong>Email Notifications</strong>
                              <br /><small class="text-muted">Receive updates via email</small>
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-check form-switch mb-3">
                            <input
                              id="eventReminders"
                              v-model="settings.eventReminders"
                              class="form-check-input"
                              type="checkbox"
                            />
                            <label for="eventReminders" class="form-check-label">
                              <strong>Event Reminders</strong>
                              <br /><small class="text-muted"
                                >Get reminded about upcoming events</small
                              >
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 隐私设置 -->
                    <div class="settings-section mb-4">
                      <h6 class="fw-bold mb-3">Privacy</h6>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-check form-switch mb-3">
                            <input
                              id="profileVisible"
                              v-model="settings.profileVisible"
                              class="form-check-input"
                              type="checkbox"
                            />
                            <label for="profileVisible" class="form-check-label">
                              <strong>Public Profile</strong>
                              <br /><small class="text-muted">Make profile visible to others</small>
                            </label>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-check form-switch mb-3">
                            <input
                              id="showRatings"
                              v-model="settings.showRatings"
                              class="form-check-input"
                              type="checkbox"
                            />
                            <label for="showRatings" class="form-check-label">
                              <strong>Show My Ratings</strong>
                              <br /><small class="text-muted">Display your name on ratings</small>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="settings-actions">
                      <button @click="saveSettings" class="btn btn-info me-2">
                        <i class="fas fa-save me-2"></i>Save Settings
                      </button>
                      <button @click="exportData" class="btn btn-outline-secondary me-2">
                        <i class="fas fa-download me-2"></i>Export My Data
                      </button>
                      <button @click="deleteAccount" class="btn btn-outline-danger">
                        <i class="fas fa-user-times me-2"></i>Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDataStore } from '@/stores/data'
import { useRatingStore } from '@/stores/rating'
import { validateEmail, validateName } from '@/utils/validation'

export default {
  name: 'MyAccount',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const dataStore = useDataStore()
    const ratingStore = useRatingStore()

    // 响应式数据
    const activeTab = ref('profile')
    const successMessage = ref('')
    const formErrors = ref({})

    const profileForm = reactive({
      name: '',
      email: '',
      age: '',
      phone: '',
    })

    const settings = reactive({
      emailNotifications: true,
      eventReminders: true,
      profileVisible: true,
      showRatings: true,
    })

    // 标签页配置
    const tabs = [
      { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
      { id: 'ratings', label: 'My Ratings', icon: 'fas fa-star' },
      { id: 'saved', label: 'Saved Resources', icon: 'fas fa-bookmark' },
      { id: 'settings', label: 'Settings', icon: 'fas fa-cogs' },
    ]

    // 计算属性
    const userRatings = computed(() => {
      if (!authStore.user) return []
      return ratingStore.ratings.filter((rating) => rating.userId === authStore.user.id)
    })

    const savedResourcesList = computed(() => {
      const savedIds = JSON.parse(localStorage.getItem('saved-resources') || '[]')
      return dataStore.healthResources.filter((resource) => savedIds.includes(resource.id))
    })

    // 方法
    const resetProfileForm = () => {
      if (authStore.user) {
        profileForm.name = authStore.user.name || ''
        profileForm.email = authStore.user.email || ''
        profileForm.age = authStore.user.age || ''
        profileForm.phone = authStore.user.phone || ''
      }
    }

    const updateProfile = async () => {
      formErrors.value = {}
      successMessage.value = ''
      authStore.clearError()

      // 验证表单
      const nameResult = validateName(profileForm.name)
      if (!nameResult.isValid) {
        formErrors.value.name = nameResult.message
      }

      const emailResult = validateEmail(profileForm.email)
      if (!emailResult.isValid) {
        formErrors.value.email = emailResult.message
      }

      if (Object.keys(formErrors.value).length > 0) {
        return
      }

      try {
        const result = await authStore.updateProfile({
          name: profileForm.name,
          email: profileForm.email,
          age: profileForm.age,
          phone: profileForm.phone,
        })

        if (result.success) {
          successMessage.value = 'Profile updated successfully!'
          setTimeout(() => {
            successMessage.value = ''
          }, 3000)
        }
      } catch (error) {
        console.error('Profile update error:', error)
      }
    }

    const getCategoryLabel = (category) => {
      const labels = {
        medical: 'Medical',
        nutrition: 'Nutrition',
        safety: 'Safety',
        mental: 'Mental Health',
        fitness: 'Fitness',
      }
      return labels[category] || category
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    const getRatingItemTitle = (rating) => {
      // 这里应该根据itemId和type获取实际的资源/服务标题
      // 为演示目的，我们返回一个通用标题
      const typeLabels = {
        resource: 'Health Resource',
        service: 'Support Service',
        event: 'Community Event',
      }
      return `${typeLabels[rating.type] || 'Item'} Rating`
    }

    const editRating = (rating) => {
      // 这里应该导航到相应的资源页面或打开编辑模态框
      alert('Edit rating functionality would be implemented here')
    }

    const deleteUserRating = async (ratingId) => {
      if (confirm('Are you sure you want to delete this rating?')) {
        try {
          const result = await ratingStore.deleteRating(ratingId)
          if (result.success) {
            successMessage.value = 'Rating deleted successfully!'
            setTimeout(() => {
              successMessage.value = ''
            }, 3000)
          }
        } catch (error) {
          console.error('Rating deletion error:', error)
        }
      }
    }

    const removeSavedResource = (resourceId) => {
      const savedIds = JSON.parse(localStorage.getItem('saved-resources') || '[]')
      const updatedIds = savedIds.filter((id) => id !== resourceId)
      localStorage.setItem('saved-resources', JSON.stringify(updatedIds))
      // 强制重新计算
      savedResourcesList.value = dataStore.healthResources.filter((resource) =>
        updatedIds.includes(resource.id),
      )
    }

    const saveSettings = () => {
      localStorage.setItem('user-settings', JSON.stringify(settings))
      successMessage.value = 'Settings saved successfully!'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }

    const exportData = () => {
      const userData = {
        profile: authStore.user,
        ratings: userRatings.value,
        savedResources: savedResourcesList.value.map((r) => r.id),
        settings: settings,
      }

      const dataStr = JSON.stringify(userData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)

      const link = document.createElement('a')
      link.href = url
      link.download = `my-data-${new Date().toISOString().split('T')[0]}.json`
      link.click()

      URL.revokeObjectURL(url)
    }

    const deleteAccount = () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
          authStore.logout()
          router.push('/')
          alert('Account deletion request submitted. You have been logged out.')
        }
      }
    }

    const loadSettings = () => {
      const savedSettings = localStorage.getItem('user-settings')
      if (savedSettings) {
        Object.assign(settings, JSON.parse(savedSettings))
      }
    }

    onMounted(() => {
      resetProfileForm()
      loadSettings()
    })

    return {
      authStore,
      activeTab,
      tabs,
      successMessage,
      formErrors,
      profileForm,
      settings,
      userRatings,
      savedResourcesList,
      resetProfileForm,
      updateProfile,
      getCategoryLabel,
      formatDate,
      getRatingItemTitle,
      editRating,
      deleteUserRating,
      removeSavedResource,
      saveSettings,
      exportData,
      deleteAccount,
    }
  },
}
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, var(--bs-primary) 0%, #4c84ff 100%);
}

.user-info-card {
  backdrop-filter: blur(10px);
}

.account-sidebar .nav-link {
  border: 1px solid #e9ecef;
  color: #495057;
  transition: all 0.3s ease;
}

.account-sidebar .nav-link:hover {
  background-color: #f8f9fa;
  border-color: var(--bs-primary);
}

.account-sidebar .nav-link.active {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
  color: white;
}

.rating-item,
.saved-resource {
  transition: box-shadow 0.3s ease;
}

.rating-item:hover,
.saved-resource:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.star {
  color: #ddd;
  font-size: 1rem;
  margin-right: 2px;
}

.star.filled {
  color: #ffc107;
}

.settings-section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1.5rem;
}

.settings-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.setting-item {
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.form-check-label strong {
  display: block;
  margin-bottom: 0.25rem;
}

/* 响应式设计 */
@media (max-width: 991px) {
  .page-header .h3 {
    font-size: 1.5rem;
  }

  .account-sidebar {
    margin-bottom: 2rem;
  }

  .account-sidebar .nav {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .account-sidebar .nav-link {
    white-space: nowrap;
    margin-right: 0.5rem;
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .user-info-card {
    margin-top: 1rem;
  }

  .rating-actions,
  .resource-actions {
    margin-top: 1rem;
    text-align: center;
  }

  .settings-actions {
    text-align: center;
  }

  .settings-actions .btn {
    margin-bottom: 0.5rem;
    width: 100%;
  }
}

/* 无障碍设计 */
.nav-link:focus,
.btn:focus,
.form-control:focus,
.form-check-input:focus {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .card,
  .setting-item {
    border-width: 2px;
  }

  .nav-link {
    border-width: 2px;
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .rating-item,
  .saved-resource {
    transition: none;
  }
}

/* 打印样式 */
@media print {
  .page-header {
    background: white !important;
    color: black !important;
  }

  .account-sidebar,
  .rating-actions,
  .resource-actions,
  .settings-actions {
    display: none;
  }
}
</style>
