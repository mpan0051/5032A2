<template>
  <div class="support-services-page">
    <!-- 页面标题区域 -->
    <section class="page-header bg-success text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-5 fw-bold mb-3">
              <i class="fas fa-hands-helping me-3"></i>Support Services
            </h1>
            <p class="lead mb-0">
              Comprehensive support services designed to help seniors maintain independence and
              improve quality of life in their own communities.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div class="stats-card bg-white bg-opacity-20 p-3 rounded-3">
              <div class="text-center">
                <div class="h2 fw-bold text-warning mb-1">{{ filteredServices.length }}</div>
                <div class="small">Services Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务分类导航 -->
    <section class="service-categories py-4 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="category-filters d-flex flex-wrap justify-content-center gap-2">
              <button
                @click="selectedCategory = ''"
                :class="{ active: selectedCategory === '' }"
                class="btn btn-outline-success category-btn"
              >
                <i class="fas fa-th-large me-2"></i>All Services
              </button>
              <button
                @click="selectedCategory = 'daily-living'"
                :class="{ active: selectedCategory === 'daily-living' }"
                class="btn btn-outline-success category-btn"
              >
                <i class="fas fa-home me-2"></i>Daily Living
              </button>
              <button
                @click="selectedCategory = 'transportation'"
                :class="{ active: selectedCategory === 'transportation' }"
                class="btn btn-outline-success category-btn"
              >
                <i class="fas fa-car me-2"></i>Transportation
              </button>
              <button
                @click="selectedCategory = 'healthcare'"
                :class="{ active: selectedCategory === 'healthcare' }"
                class="btn btn-outline-success category-btn"
              >
                <i class="fas fa-stethoscope me-2"></i>Healthcare
              </button>
              <button
                @click="selectedCategory = 'mental-health'"
                :class="{ active: selectedCategory === 'mental-health' }"
                class="btn btn-outline-success category-btn"
              >
                <i class="fas fa-brain me-2"></i>Mental Health
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务网格区域 -->
    <section class="services-grid py-5">
      <div class="container">
        <!-- 搜索框 -->
        <div class="row mb-4">
          <div class="col-lg-8 mx-auto">
            <div class="search-box">
              <div class="input-group input-group-lg">
                <span class="input-group-text bg-white border-end-0">
                  <i class="fas fa-search text-muted"></i>
                </span>
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control border-start-0 ps-0"
                  placeholder="Search support services..."
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
        </div>

        <!-- 结果计数 -->
        <div class="results-header mb-4">
          <h5 class="text-muted">
            {{ filteredServices.length }}
            {{ filteredServices.length === 1 ? 'service' : 'services' }}
            {{ selectedCategory ? `in ${getCategoryLabel(selectedCategory)}` : 'available' }}
          </h5>
        </div>

        <!-- 服务卡片 -->
        <div v-if="filteredServices.length > 0" class="row">
          <div v-for="service in filteredServices" :key="service.id" class="col-lg-6 mb-4">
            <div class="service-card card h-100 shadow-sm">
              <div class="card-header d-flex align-items-center">
                <div class="service-icon me-3">
                  <i :class="getServiceIcon(service.category)" class="fa-2x text-success"></i>
                </div>
                <div class="service-header-info flex-grow-1">
                  <h5 class="card-title mb-1">{{ service.name }}</h5>
                  <div class="service-meta">
                    <span class="badge" :class="getCategoryBadgeClass(service.category)">
                      {{ getCategoryLabel(service.category) }}
                    </span>
                    <span v-if="service.featured" class="badge bg-warning text-dark ms-1">
                      Featured
                    </span>
                  </div>
                </div>
              </div>

              <div class="card-body">
                <p class="card-text text-muted mb-3">{{ service.description }}</p>

                <!-- 服务详情 -->
                <div class="service-details">
                  <div class="detail-row mb-2">
                    <div class="row">
                      <div class="col-sm-4">
                        <strong><i class="fas fa-building me-1 text-primary"></i>Provider:</strong>
                      </div>
                      <div class="col-sm-8">
                        {{ service.provider }}
                      </div>
                    </div>
                  </div>

                  <div class="detail-row mb-2">
                    <div class="row">
                      <div class="col-sm-4">
                        <strong><i class="fas fa-phone me-1 text-primary"></i>Contact:</strong>
                      </div>
                      <div class="col-sm-8">
                        <a :href="`tel:${service.contact}`" class="text-decoration-none">
                          {{ service.contact }}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div class="detail-row mb-2">
                    <div class="row">
                      <div class="col-sm-4">
                        <strong><i class="fas fa-clock me-1 text-primary"></i>Hours:</strong>
                      </div>
                      <div class="col-sm-8">
                        {{ service.availability }}
                      </div>
                    </div>
                  </div>

                  <div class="detail-row mb-2">
                    <div class="row">
                      <div class="col-sm-4">
                        <strong><i class="fas fa-dollar-sign me-1 text-primary"></i>Cost:</strong>
                      </div>
                      <div class="col-sm-8">
                        {{ service.cost }}
                      </div>
                    </div>
                  </div>

                  <div class="detail-row mb-3">
                    <div class="row">
                      <div class="col-sm-4">
                        <strong
                          ><i class="fas fa-map-marker-alt me-1 text-primary"></i>Area:</strong
                        >
                      </div>
                      <div class="col-sm-8">
                        {{ service.coverageArea }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 资格要求 -->
                <div class="eligibility-section mb-3">
                  <h6 class="fw-bold mb-2">
                    <i class="fas fa-check-circle me-1 text-success"></i>Eligibility Requirements:
                  </h6>
                  <p class="small text-muted mb-0">{{ service.eligibility }}</p>
                </div>

                <!-- 评分 -->
                <div class="service-rating mb-3">
                  <RatingComponent
                    :item-id="service.id"
                    item-type="service"
                    :show-distribution="false"
                    :show-recent-ratings="false"
                  />
                </div>
              </div>

              <!-- 卡片底部操作 -->
              <div class="card-footer bg-transparent">
                <div class="d-flex gap-2">
                  <button @click="contactService(service)" class="btn btn-success flex-fill">
                    <i class="fas fa-phone me-2"></i>Contact Provider
                  </button>
                  <button @click="getDirections(service)" class="btn btn-outline-primary flex-fill">
                    <i class="fas fa-map-marker-alt me-2"></i>Get Directions
                  </button>
                  <button
                    @click="saveService(service.id)"
                    class="btn btn-outline-secondary"
                    :class="{ active: savedServices.includes(service.id) }"
                  >
                    <i class="fas fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果状态 -->
        <div v-else class="empty-state text-center py-5">
          <i class="fas fa-search fa-4x text-muted mb-4"></i>
          <h3 class="text-muted">No Services Found</h3>
          <p class="text-muted mb-4">
            {{
              searchQuery || selectedCategory
                ? 'Try adjusting your search criteria or browse all services.'
                : 'No support services are currently available.'
            }}
          </p>
          <button
            v-if="searchQuery || selectedCategory"
            @click="clearFilters"
            class="btn btn-success"
          >
            <i class="fas fa-refresh me-2"></i>Clear Filters
          </button>
        </div>
      </div>
    </section>

    <!-- 紧急服务信息 -->
    <section class="emergency-services py-5 bg-danger bg-opacity-10">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <div class="emergency-card card border-danger">
              <div class="card-header bg-danger text-white">
                <h5 class="mb-0">
                  <i class="fas fa-exclamation-triangle me-2"></i>Emergency & Crisis Support
                </h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <h6 class="fw-bold text-danger">Medical Emergency</h6>
                    <p class="mb-2">For life-threatening situations</p>
                    <a href="tel:911" class="btn btn-danger">
                      <i class="fas fa-phone me-2"></i>Call 911
                    </a>
                  </div>
                  <div class="col-md-6 mb-3">
                    <h6 class="fw-bold text-warning">24/7 Crisis Helpline</h6>
                    <p class="mb-2">Mental health and emotional support</p>
                    <a href="tel:+15551234567" class="btn btn-warning">
                      <i class="fas fa-phone me-2"></i>Call (555) 123-4567
                    </a>
                  </div>
                  <div class="col-md-6 mb-3">
                    <h6 class="fw-bold text-info">Poison Control</h6>
                    <p class="mb-2">24/7 poison emergency assistance</p>
                    <a href="tel:18002221222" class="btn btn-info">
                      <i class="fas fa-phone me-2"></i>Call 1-800-222-1222
                    </a>
                  </div>
                  <div class="col-md-6 mb-3">
                    <h6 class="fw-bold text-success">Senior Helpline</h6>
                    <p class="mb-2">Non-emergency senior support</p>
                    <a href="tel:+15559876543" class="btn btn-success">
                      <i class="fas fa-phone me-2"></i>Call (555) 987-6543
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务申请帮助 -->
    <section class="service-help py-5 bg-light">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h3 class="fw-bold mb-3">Need Help Finding the Right Service?</h3>
            <p class="text-muted mb-0">
              Our service coordinators can help you navigate available options and connect you with
              the support services that best meet your needs.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <div class="help-actions">
              <a href="tel:+15551234567" class="btn btn-success btn-lg me-2 mb-2">
                <i class="fas fa-phone me-2"></i>Call for Help
              </a>
              <a href="mailto:services@elderlycare.org" class="btn btn-outline-success btn-lg mb-2">
                <i class="fas fa-envelope me-2"></i>Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/data'
import { useAuthStore } from '@/stores/auth'
import RatingComponent from '@/components/RatingComponent.vue'

export default {
  name: 'SupportServices',
  components: {
    RatingComponent,
  },
  setup() {
    const dataStore = useDataStore()
    const authStore = useAuthStore()

    // 响应式数据
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const savedServices = ref([])

    // 计算属性
    const filteredServices = computed(() => {
      let services = dataStore.supportServices

      // 搜索过滤
      if (searchQuery.value) {
        services = dataStore.searchServices(searchQuery.value)
      }

      // 分类过滤
      if (selectedCategory.value) {
        services = services.filter((service) => service.category === selectedCategory.value)
      }

      return services
    })

    // 方法
    const getCategoryLabel = (category) => {
      const labels = {
        'daily-living': 'Daily Living',
        transportation: 'Transportation',
        healthcare: 'Healthcare',
        'mental-health': 'Mental Health',
      }
      return labels[category] || category
    }

    const getCategoryBadgeClass = (category) => {
      const classes = {
        'daily-living': 'bg-primary',
        transportation: 'bg-info',
        healthcare: 'bg-danger',
        'mental-health': 'bg-warning text-dark',
      }
      return classes[category] || 'bg-secondary'
    }

    const getServiceIcon = (category) => {
      const icons = {
        'daily-living': 'fas fa-home',
        transportation: 'fas fa-car',
        healthcare: 'fas fa-stethoscope',
        'mental-health': 'fas fa-brain',
      }
      return icons[category] || 'fas fa-hands-helping'
    }

    const clearSearch = () => {
      searchQuery.value = ''
    }

    const clearFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = ''
    }

    const contactService = (service) => {
      // 清理电话号码，只保留数字
      const phoneNumber = service.contact.replace(/\D/g, '')
      window.open(`tel:+1${phoneNumber}`, '_self')
    }

    const getDirections = (service) => {
      // 在实际应用中，这里会使用地理编码来获取确切地址
      const query = encodeURIComponent(`${service.provider} ${service.coverageArea}`)
      window.open(`https://www.google.com/maps/search/${query}`, '_blank')
    }

    const saveService = (serviceId) => {
      if (!authStore.isAuthenticated) {
        alert('Please log in to save services')
        return
      }

      const index = savedServices.value.indexOf(serviceId)
      if (index > -1) {
        savedServices.value.splice(index, 1)
      } else {
        savedServices.value.push(serviceId)
      }

      // 保存到localStorage
      localStorage.setItem('saved-services', JSON.stringify(savedServices.value))
    }

    const loadSavedServices = () => {
      const saved = localStorage.getItem('saved-services')
      if (saved) {
        savedServices.value = JSON.parse(saved)
      }
    }

    onMounted(() => {
      loadSavedServices()
    })

    return {
      dataStore,
      authStore,
      searchQuery,
      selectedCategory,
      savedServices,
      filteredServices,
      getCategoryLabel,
      getCategoryBadgeClass,
      getServiceIcon,
      clearSearch,
      clearFilters,
      contactService,
      getDirections,
      saveService,
    }
  },
}
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, var(--bs-success) 0%, #20c997 100%);
}

.stats-card {
  backdrop-filter: blur(10px);
}

.category-btn {
  transition: all 0.3s ease;
  border-width: 2px;
}

.category-btn.active {
  background-color: var(--bs-success);
  border-color: var(--bs-success);
  color: white;
}

.category-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.service-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 60px;
  text-align: center;
}

.detail-row {
  font-size: 0.9rem;
}

.detail-row strong {
  color: var(--bs-gray-700);
}

.eligibility-section {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid var(--bs-success);
}

.emergency-card {
  box-shadow: 0 4px 20px rgba(220, 53, 69, 0.2);
}

.search-box .input-group-text {
  border-right: none;
}

.search-box .form-control {
  border-left: none;
}

.search-box .form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}

.empty-state {
  opacity: 0.7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header .display-5 {
    font-size: 2rem;
  }

  .category-filters {
    justify-content: flex-start !important;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .category-btn {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .detail-row .row {
    flex-direction: column;
  }

  .detail-row .col-sm-4 {
    margin-bottom: 0.25rem;
  }

  .help-actions .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 576px) {
  .service-card .card-footer .d-flex {
    flex-direction: column;
  }

  .service-card .card-footer .btn {
    margin-bottom: 0.5rem;
  }

  .emergency-services .row > div {
    margin-bottom: 1rem;
  }
}

/* 无障碍设计 */
.btn:focus,
.form-control:focus {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

.service-card:focus-within {
  outline: 2px solid var(--bs-success);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .service-card,
  .emergency-card {
    border-width: 2px;
  }

  .category-btn {
    border-width: 3px;
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .service-card,
  .category-btn {
    transition: none;
  }

  .service-card:hover,
  .category-btn:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .page-header {
    background: white !important;
    color: black !important;
  }

  .category-filters,
  .service-card .card-footer,
  .emergency-services,
  .service-help {
    display: none;
  }

  .service-card {
    break-inside: avoid;
    margin-bottom: 1rem;
  }
}
</style>
