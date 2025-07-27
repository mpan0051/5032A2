<template>
  <div class="health-resources-page">
    <!-- 页面标题区域 -->
    <section class="page-header bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-5 fw-bold mb-3">
              <i class="fas fa-stethoscope me-3"></i>Health Resources
            </h1>
            <p class="lead mb-0">
              Comprehensive health guides, wellness tips, and medical information designed
              specifically for seniors and their caregivers.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div class="stats-card bg-white bg-opacity-20 p-3 rounded-3 backdrop-blur">
              <div class="text-center">
                <div class="h2 fw-bold text-warning mb-1">{{ filteredResources.length }}</div>
                <div class="small">Resources Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 搜索和筛选区域 -->
    <section class="search-filters py-4 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mb-3 mb-lg-0">
            <div class="search-box">
              <div class="input-group input-group-lg">
                <span class="input-group-text bg-white border-end-0">
                  <i class="fas fa-search text-muted"></i>
                </span>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control border-start-0 ps-0"
                  placeholder="Search health resources..."
                  @input="handleSearch"
                />
                <button
                  v-if="searchQuery"
                  @click="clearSearch"
                  class="btn btn-outline-secondary"
                  type="button"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="filter-dropdown">
              <select
                v-model="selectedCategory"
                class="form-select form-select-lg"
                @change="handleCategoryFilter"
              >
                <option value="">All Categories</option>
                <option value="medical">Medical</option>
                <option value="nutrition">Nutrition</option>
                <option value="safety">Safety</option>
                <option value="mental">Mental Health</option>
                <option value="fitness">Fitness</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 资源网格区域 -->
    <section class="resources-grid py-5">
      <div class="container">
        <!-- 加载状态 -->
        <div v-if="dataStore.isLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading health resources...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="dataStore.error" class="alert alert-danger" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          {{ dataStore.error }}
        </div>

        <!-- 无结果状态 -->
        <div v-else-if="filteredResources.length === 0" class="empty-state text-center py-5">
          <i class="fas fa-search fa-4x text-muted mb-4"></i>
          <h3 class="text-muted">No Resources Found</h3>
          <p class="text-muted mb-4">
            {{
              searchQuery || selectedCategory
                ? 'Try adjusting your search criteria or browse all resources.'
                : 'No health resources are currently available.'
            }}
          </p>
          <button
            v-if="searchQuery || selectedCategory"
            @click="clearFilters"
            class="btn btn-primary"
          >
            <i class="fas fa-refresh me-2"></i>Clear Filters
          </button>
        </div>

        <!-- 资源卡片网格 -->
        <div v-else class="resources-results">
          <!-- 结果计数 -->
          <div class="results-header mb-4 d-flex justify-content-between align-items-center">
            <div class="results-count">
              <span class="text-muted">
                Showing {{ filteredResources.length }}
                {{ filteredResources.length === 1 ? 'resource' : 'resources' }}
                {{ searchQuery ? `for "${searchQuery}"` : '' }}
                {{ selectedCategory ? `in ${getCategoryLabel(selectedCategory)}` : '' }}
              </span>
            </div>
            <div class="view-options">
              <div class="btn-group" role="group">
                <input
                  id="grid-view"
                  v-model="viewMode"
                  type="radio"
                  value="grid"
                  class="btn-check"
                />
                <label for="grid-view" class="btn btn-outline-primary">
                  <i class="fas fa-th"></i>
                </label>
                <input
                  id="list-view"
                  v-model="viewMode"
                  type="radio"
                  value="list"
                  class="btn-check"
                />
                <label for="list-view" class="btn btn-outline-primary">
                  <i class="fas fa-list"></i>
                </label>
              </div>
            </div>
          </div>

          <!-- 网格视图 -->
          <div v-if="viewMode === 'grid'" class="row">
            <div
              v-for="resource in filteredResources"
              :key="resource.id"
              class="col-lg-4 col-md-6 mb-4"
            >
              <div class="resource-card card h-100 shadow-sm">
                <!-- 资源图片 -->
                <div
                  class="card-img-top resource-image bg-light d-flex align-items-center justify-content-center"
                >
                  <i class="fas fa-file-medical text-primary" style="font-size: 3rem"></i>
                </div>

                <div class="card-body d-flex flex-column">
                  <!-- 资源元信息 -->
                  <div class="resource-meta mb-2">
                    <span class="badge" :class="getCategoryBadgeClass(resource.category)">
                      {{ getCategoryLabel(resource.category) }}
                    </span>
                    <span class="badge bg-secondary ms-1">{{ resource.readTime }}</span>
                    <span v-if="resource.featured" class="badge bg-warning text-dark ms-1">
                      Featured
                    </span>
                  </div>

                  <!-- 资源标题和描述 -->
                  <h5 class="card-title">{{ resource.title }}</h5>
                  <p class="card-text text-muted flex-grow-1">{{ resource.description }}</p>

                  <!-- 作者和发布信息 -->
                  <div class="resource-info mb-3">
                    <div class="d-flex align-items-center text-muted small">
                      <i class="fas fa-user-md me-1"></i>
                      <span class="me-3">{{ resource.author }}</span>
                      <i class="fas fa-calendar me-1"></i>
                      <span>{{ formatDate(resource.publishDate) }}</span>
                    </div>
                  </div>

                  <!-- 评分和标签 -->
                  <div class="resource-rating mb-3">
                    <RatingComponent
                      :item-id="resource.id"
                      item-type="resource"
                      :show-distribution="false"
                      :show-recent-ratings="false"
                    />
                  </div>

                  <!-- 标签 -->
                  <div class="resource-tags mb-3">
                    <span
                      v-for="tag in resource.tags.slice(0, 3)"
                      :key="tag"
                      class="badge bg-light text-dark me-1 mb-1"
                    >
                      #{{ tag }}
                    </span>
                  </div>

                  <!-- 操作按钮 -->
                  <div class="resource-actions mt-auto">
                    <button @click="viewResource(resource)" class="btn btn-primary w-100 mb-2">
                      <i class="fas fa-eye me-2"></i>Read Full Article
                    </button>
                    <div class="d-flex gap-2">
                      <button
                        @click="saveResource(resource.id)"
                        class="btn btn-outline-secondary flex-fill"
                        :class="{ active: savedResources.includes(resource.id) }"
                      >
                        <i class="fas fa-bookmark me-1"></i>
                        {{ savedResources.includes(resource.id) ? 'Saved' : 'Save' }}
                      </button>
                      <button
                        @click="shareResource(resource)"
                        class="btn btn-outline-info flex-fill"
                      >
                        <i class="fas fa-share-alt me-1"></i>Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 列表视图 -->
          <div v-else class="resources-list">
            <div
              v-for="resource in filteredResources"
              :key="resource.id"
              class="resource-list-item card mb-3 shadow-sm"
            >
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-md-2 text-center">
                    <div class="resource-icon">
                      <i class="fas fa-file-medical text-primary fa-2x"></i>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="resource-meta mb-2">
                      <span class="badge" :class="getCategoryBadgeClass(resource.category)">
                        {{ getCategoryLabel(resource.category) }}
                      </span>
                      <span class="badge bg-secondary ms-1">{{ resource.readTime }}</span>
                    </div>
                    <h5 class="mb-2">{{ resource.title }}</h5>
                    <p class="text-muted mb-2">{{ resource.description }}</p>
                    <div class="d-flex align-items-center text-muted small">
                      <i class="fas fa-user-md me-1"></i>
                      <span class="me-3">{{ resource.author }}</span>
                      <i class="fas fa-calendar me-1"></i>
                      <span>{{ formatDate(resource.publishDate) }}</span>
                    </div>
                  </div>
                  <div class="col-md-3 text-md-end">
                    <div class="resource-actions">
                      <RatingComponent
                        :item-id="resource.id"
                        item-type="resource"
                        :show-distribution="false"
                        :show-recent-ratings="false"
                      />
                      <div class="mt-2">
                        <button @click="viewResource(resource)" class="btn btn-primary btn-sm me-2">
                          <i class="fas fa-eye me-1"></i>Read
                        </button>
                        <button
                          @click="saveResource(resource.id)"
                          class="btn btn-outline-secondary btn-sm"
                          :class="{ active: savedResources.includes(resource.id) }"
                        >
                          <i class="fas fa-bookmark"></i>
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
    </section>

    <!-- 资源详情模态框 -->
    <div
      v-if="selectedResource"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedResource.title }}</h5>
            <button @click="closeResourceModal" type="button" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <div class="resource-meta mb-3">
              <span class="badge" :class="getCategoryBadgeClass(selectedResource.category)">
                {{ getCategoryLabel(selectedResource.category) }}
              </span>
              <span class="badge bg-secondary ms-1">{{ selectedResource.readTime }}</span>
              <span class="badge bg-info ms-1">{{ selectedResource.difficulty }}</span>
            </div>

            <div class="resource-author mb-3">
              <div class="d-flex align-items-center">
                <i class="fas fa-user-md text-primary me-2"></i>
                <strong>{{ selectedResource.author }}</strong>
                <span class="text-muted ms-auto">{{
                  formatDate(selectedResource.publishDate)
                }}</span>
              </div>
            </div>

            <div class="resource-content">
              <p class="lead">{{ selectedResource.description }}</p>
              <div class="content-text">
                {{ selectedResource.content }}
              </div>
            </div>

            <div class="resource-tags mt-4">
              <h6>Tags:</h6>
              <span
                v-for="tag in selectedResource.tags"
                :key="tag"
                class="badge bg-light text-dark me-1 mb-1"
              >
                #{{ tag }}
              </span>
            </div>

            <div class="resource-rating mt-4">
              <h6>Rate This Resource:</h6>
              <RatingComponent
                :item-id="selectedResource.id"
                item-type="resource"
                :show-distribution="true"
                :show-recent-ratings="true"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="saveResource(selectedResource.id)" class="btn btn-outline-primary">
              <i class="fas fa-bookmark me-1"></i>
              {{ savedResources.includes(selectedResource.id) ? 'Saved' : 'Save for Later' }}
            </button>
            <button @click="shareResource(selectedResource)" class="btn btn-outline-info">
              <i class="fas fa-share-alt me-1"></i>Share
            </button>
            <button @click="closeResourceModal" class="btn btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/data'
import { useAuthStore } from '@/stores/auth'
import RatingComponent from '@/components/RatingComponent.vue'

export default {
  name: 'HealthResources',
  components: {
    RatingComponent,
  },
  setup() {
    const dataStore = useDataStore()
    const authStore = useAuthStore()

    // 响应式数据
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const viewMode = ref('grid')
    const selectedResource = ref(null)
    const savedResources = ref([])

    // 计算属性
    const filteredResources = computed(() => {
      let resources = dataStore.healthResources

      // 搜索过滤
      if (searchQuery.value) {
        resources = dataStore.searchResources(searchQuery.value)
      }

      // 分类过滤
      if (selectedCategory.value) {
        resources = resources.filter((resource) => resource.category === selectedCategory.value)
      }

      return resources
    })

    // 方法
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

    const getCategoryBadgeClass = (category) => {
      const classes = {
        medical: 'bg-danger',
        nutrition: 'bg-success',
        safety: 'bg-warning text-dark',
        mental: 'bg-info',
        fitness: 'bg-primary',
      }
      return classes[category] || 'bg-secondary'
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }

    const handleSearch = () => {
      // 搜索会触发计算属性重新计算
    }

    const handleCategoryFilter = () => {
      // 分类过滤会触发计算属性重新计算
    }

    const clearSearch = () => {
      searchQuery.value = ''
    }

    const clearFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = ''
    }

    const viewResource = (resource) => {
      selectedResource.value = resource
    }

    const closeResourceModal = () => {
      selectedResource.value = null
    }

    const saveResource = (resourceId) => {
      if (!authStore.isAuthenticated) {
        alert('Please log in to save resources')
        return
      }

      const index = savedResources.value.indexOf(resourceId)
      if (index > -1) {
        savedResources.value.splice(index, 1)
      } else {
        savedResources.value.push(resourceId)
      }

      // 保存到localStorage
      localStorage.setItem('saved-resources', JSON.stringify(savedResources.value))
    }

    const shareResource = (resource) => {
      if (navigator.share) {
        navigator
          .share({
            title: resource.title,
            text: resource.description,
            url: window.location.href,
          })
          .catch(console.error)
      } else {
        // 降级处理：复制到剪贴板
        const url = `${window.location.origin}/health-resources/${resource.id}`
        navigator.clipboard
          .writeText(url)
          .then(() => {
            alert('Resource link copied to clipboard!')
          })
          .catch(() => {
            alert('Could not copy link. Please share manually.')
          })
      }
    }

    const loadSavedResources = () => {
      const saved = localStorage.getItem('saved-resources')
      if (saved) {
        savedResources.value = JSON.parse(saved)
      }
    }

    onMounted(() => {
      loadSavedResources()
    })

    return {
      dataStore,
      authStore,
      searchQuery,
      selectedCategory,
      viewMode,
      selectedResource,
      savedResources,
      filteredResources,
      getCategoryLabel,
      getCategoryBadgeClass,
      formatDate,
      handleSearch,
      handleCategoryFilter,
      clearSearch,
      clearFilters,
      viewResource,
      closeResourceModal,
      saveResource,
      shareResource,
    }
  },
}
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, var(--bs-primary) 0%, #4c84ff 100%);
}

.stats-card {
  backdrop-filter: blur(10px);
}

.resource-image {
  height: 200px;
  background: linear-gradient(45deg, #f8f9fa 0%, #e9ecef 100%);
}

.resource-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.resource-list-item {
  transition: box-shadow 0.3s ease;
}

.resource-list-item:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.resource-meta .badge {
  font-size: 0.75rem;
}

.search-box .input-group-text {
  border-right: none;
}

.search-box .form-control {
  border-left: none;
}

.search-box .form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.view-options .btn-check:checked + .btn {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
  color: white;
}

.empty-state {
  opacity: 0.7;
}

.modal.show {
  display: block;
}

.backdrop-blur {
  backdrop-filter: blur(10px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header .display-5 {
    font-size: 2rem;
  }

  .resource-actions .btn {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }

  .view-options {
    margin-top: 1rem;
  }

  .results-header {
    flex-direction: column;
    align-items: start !important;
  }
}

/* 无障碍设计 */
.btn:focus,
.form-control:focus,
.form-select:focus {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

.resource-card:focus-within {
  outline: 2px solid var(--bs-primary);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .resource-card,
  .resource-list-item {
    border-width: 2px;
  }

  .badge {
    border: 1px solid;
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .resource-card,
  .resource-list-item {
    transition: none;
  }

  .resource-card:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .page-header {
    background: white !important;
    color: black !important;
  }

  .search-filters,
  .resource-actions,
  .view-options {
    display: none;
  }
}
</style>
