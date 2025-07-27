<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <section class="hero-section bg-primary text-white">
      <div class="container">
        <div class="row align-items-center min-vh-75">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="display-4 fw-bold mb-4">
                Supporting Seniors,<br />
                <span class="text-warning">Strengthening Communities</span>
              </h1>
              <p class="lead mb-4">
                Your trusted resource for health information, support services, and community
                connections designed specifically for seniors and their caregivers.
              </p>
              <div class="hero-actions">
                <RouterLink to="/health-resources" class="btn btn-warning btn-lg me-3 mb-3">
                  <i class="fas fa-stethoscope me-2"></i>Explore Health Resources
                </RouterLink>
                <RouterLink to="/support-services" class="btn btn-outline-light btn-lg mb-3">
                  <i class="fas fa-hands-helping me-2"></i>Find Support Services
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image text-center">
              <div class="hero-icon-display bg-white bg-opacity-20 rounded-3 shadow-lg p-5">
                <i class="fas fa-heart fa-5x text-warning mb-3"></i>
                <div class="h4 text-white">Caring for Our Community</div>
                <div class="text-light">Supporting seniors with compassion and expertise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据区域 -->
    <section class="stats-section py-5 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <div class="stat-number text-primary fw-bold fs-2">5,000+</div>
              <div class="stat-label text-muted">Seniors Served</div>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <div class="stat-number text-primary fw-bold fs-2">{{ healthResources.length }}+</div>
              <div class="stat-label text-muted">Health Resources</div>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <div class="stat-number text-primary fw-bold fs-2">{{ supportServices.length }}+</div>
              <div class="stat-label text-muted">Support Services</div>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-4">
            <div class="stat-item">
              <div class="stat-number text-primary fw-bold fs-2">{{ upcomingEvents.length }}</div>
              <div class="stat-label text-muted">Upcoming Events</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特色资源区域 -->
    <section class="featured-resources py-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-header text-center mb-5">
              <h2 class="fw-bold">Featured Health Resources</h2>
              <p class="text-muted">Discover our most popular health guides and wellness tips</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div
            v-for="resource in featuredResources"
            :key="resource.id"
            class="col-lg-4 col-md-6 mb-4"
          >
            <div class="resource-card card h-100 shadow-sm">
              <div
                class="card-img-top bg-light d-flex align-items-center justify-content-center"
                style="height: 200px"
              >
                <i class="fas fa-file-medical text-primary" style="font-size: 3rem"></i>
              </div>
              <div class="card-body d-flex flex-column">
                <div class="resource-meta mb-2">
                  <span class="badge bg-primary">{{ getCategoryLabel(resource.category) }}</span>
                  <span class="badge bg-secondary ms-1">{{ resource.readTime }}</span>
                </div>
                <h5 class="card-title">{{ resource.title }}</h5>
                <p class="card-text text-muted flex-grow-1">{{ resource.description }}</p>
                <div class="resource-footer mt-auto">
                  <div class="d-flex align-items-center justify-content-between">
                    <small class="text-muted">By {{ resource.author }}</small>
                    <RatingComponent
                      :item-id="resource.id"
                      item-type="resource"
                      :show-distribution="false"
                      :show-recent-ratings="false"
                    />
                  </div>
                  <RouterLink
                    :to="`/health-resources/${resource.id}`"
                    class="btn btn-outline-primary btn-sm mt-3 w-100"
                  >
                    <i class="fas fa-arrow-right me-2"></i>Read More
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <RouterLink to="/health-resources" class="btn btn-primary btn-lg">
            <i class="fas fa-th-large me-2"></i>View All Resources
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 即将到来的活动 -->
    <section class="upcoming-events py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-header text-center mb-5">
              <h2 class="fw-bold">Upcoming Events</h2>
              <p class="text-muted">Join our community activities and wellness programs</p>
            </div>
          </div>
        </div>

        <div class="row" v-if="upcomingEvents.length > 0">
          <div v-for="event in upcomingEvents" :key="event.id" class="col-lg-6 mb-4">
            <div class="event-card card h-100 shadow-sm">
              <div class="card-body">
                <div class="event-meta mb-3">
                  <span class="badge bg-success">{{ getCategoryLabel(event.category) }}</span>
                  <span class="badge bg-info ms-1">{{ event.cost }}</span>
                </div>
                <h5 class="card-title">{{ event.title }}</h5>
                <p class="card-text text-muted">{{ event.description }}</p>

                <div class="event-details">
                  <div class="detail-item mb-2">
                    <i class="fas fa-calendar text-primary me-2"></i>
                    <strong>{{ formatDate(event.date) }}</strong> at {{ event.time }}
                  </div>
                  <div class="detail-item mb-2">
                    <i class="fas fa-map-marker-alt text-primary me-2"></i>
                    {{ event.location }}
                  </div>
                  <div class="detail-item mb-3">
                    <i class="fas fa-users text-primary me-2"></i>
                    {{ event.registered }}/{{ event.capacity }} registered
                  </div>
                </div>

                <button
                  @click="registerForEvent(event.id)"
                  class="btn btn-success w-100"
                  :disabled="event.registered >= event.capacity || !authStore.isAuthenticated"
                >
                  <i class="fas fa-calendar-plus me-2"></i>
                  {{ event.registered >= event.capacity ? 'Event Full' : 'Register Now' }}
                </button>

                <div v-if="!authStore.isAuthenticated" class="text-center mt-2">
                  <small class="text-muted">
                    <RouterLink to="/login">Login</RouterLink> required to register
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center">
          <div class="empty-state py-5">
            <i class="fas fa-calendar-alt fa-3x text-muted mb-3"></i>
            <h4 class="text-muted">No upcoming events</h4>
            <p class="text-muted">Check back soon for new community activities!</p>
          </div>
        </div>

        <div class="text-center mt-4">
          <RouterLink to="/get-involved" class="btn btn-outline-primary btn-lg">
            <i class="fas fa-calendar me-2"></i>View All Events
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 用户角色引导区域 -->
    <section class="user-guide py-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="section-header text-center mb-5">
              <h2 class="fw-bold">Find Resources for Your Role</h2>
              <p class="text-muted">Tailored content for different members of our community</p>
            </div>
          </div>
        </div>

        <div class="row">
          <!-- 老年人 -->
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="role-card card h-100 shadow-sm text-center">
              <div class="card-body">
                <div class="role-icon mb-3">
                  <i class="fas fa-user-clock fa-3x text-primary"></i>
                </div>
                <h5 class="card-title">For Seniors</h5>
                <p class="card-text text-muted">
                  Health resources, wellness tips, and community connections
                </p>
                <RouterLink to="/health-resources" class="btn btn-outline-primary">
                  Explore Resources
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- 照顾者 -->
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="role-card card h-100 shadow-sm text-center">
              <div class="card-body">
                <div class="role-icon mb-3">
                  <i class="fas fa-user-friends fa-3x text-success"></i>
                </div>
                <h5 class="card-title">For Caregivers</h5>
                <p class="card-text text-muted">
                  Support tools, resources, and guidance for family caregivers
                </p>
                <RouterLink to="/caregiver-resources" class="btn btn-outline-success">
                  Caregiver Tools
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- 医护人员 -->
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="role-card card h-100 shadow-sm text-center">
              <div class="card-body">
                <div class="role-icon mb-3">
                  <i class="fas fa-user-md fa-3x text-info"></i>
                </div>
                <h5 class="card-title">For Healthcare Professionals</h5>
                <p class="card-text text-muted">
                  Professional resources and patient referral tools
                </p>
                <RouterLink to="/caregiver-resources" class="btn btn-outline-info">
                  Professional Tools
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- 志愿者 -->
          <div class="col-lg-3 col-md-6 mb-4">
            <div class="role-card card h-100 shadow-sm text-center">
              <div class="card-body">
                <div class="role-icon mb-3">
                  <i class="fas fa-hands-helping fa-3x text-warning"></i>
                </div>
                <h5 class="card-title">For Volunteers</h5>
                <p class="card-text text-muted">
                  Volunteer opportunities and community service programs
                </p>
                <RouterLink to="/get-involved" class="btn btn-outline-warning">
                  Get Involved
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 呼吁行动区域 -->
    <section class="cta-section py-5 bg-primary text-white">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h3 class="fw-bold mb-3">Ready to Get Started?</h3>
            <p class="lead mb-0">
              Join our community today and access personalized resources, connect with others, and
              take control of your health and wellbeing.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div class="cta-actions mt-3 mt-lg-0">
              <RouterLink
                v-if="!authStore.isAuthenticated"
                to="/register"
                class="btn btn-warning btn-lg"
              >
                <i class="fas fa-user-plus me-2"></i>Join Now
              </RouterLink>
              <RouterLink v-else to="/my-account" class="btn btn-warning btn-lg">
                <i class="fas fa-user me-2"></i>My Account
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDataStore } from '@/stores/data'
import RatingComponent from '@/components/RatingComponent.vue'

export default {
  name: 'Home',
  components: {
    RatingComponent,
  },
  setup() {
    const authStore = useAuthStore()
    const dataStore = useDataStore()

    // 计算属性
    const featuredResources = computed(() => dataStore.featuredResources)
    const healthResources = computed(() => dataStore.healthResources)
    const supportServices = computed(() => dataStore.supportServices)
    const upcomingEvents = computed(() => dataStore.upcomingEvents)

    // 方法
    const getCategoryLabel = (category) => {
      const labels = {
        medical: 'Medical',
        nutrition: 'Nutrition',
        safety: 'Safety',
        mental: 'Mental Health',
        fitness: 'Fitness',
        'daily-living': 'Daily Living',
        transportation: 'Transportation',
        healthcare: 'Healthcare',
        'mental-health': 'Mental Health',
        education: 'Education',
        technology: 'Technology',
      }
      return labels[category] || category
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const registerForEvent = (eventId) => {
      if (!authStore.isAuthenticated) {
        // 重定向到登录页
        return
      }

      const result = dataStore.registerForEvent(eventId)
      if (result.success) {
        // 可以添加成功提示
        alert(result.message)
      } else {
        alert(result.message)
      }
    }

    return {
      authStore,
      featuredResources,
      healthResources,
      supportServices,
      upcomingEvents,
      getCategoryLabel,
      formatDate,
      registerForEvent,
    }
  },
}
</script>

<style scoped>
.min-vh-75 {
  min-height: 75vh;
}

.hero-section {
  background: linear-gradient(135deg, var(--bs-primary) 0%, #4c84ff 100%);
}

.hero-content h1 {
  line-height: 1.2;
}

.hero-actions .btn {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stats-section {
  background-color: #f8f9fa;
}

.stat-item {
  padding: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  line-height: 1;
}

.section-header h2 {
  color: var(--bs-dark);
  margin-bottom: 1rem;
}

.resource-card,
.event-card,
.role-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
}

.resource-card:hover,
.event-card:hover,
.role-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.resource-meta .badge {
  font-size: 0.75rem;
}

.event-details .detail-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.role-icon {
  margin-bottom: 1rem;
}

.cta-section {
  background: linear-gradient(135deg, var(--bs-primary) 0%, #4c84ff 100%);
}

.empty-state {
  opacity: 0.7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section .display-4 {
    font-size: 2rem;
  }

  .hero-actions .btn {
    width: 100%;
    margin-bottom: 1rem;
  }

  .stat-number {
    font-size: 2rem;
  }

  .hero-content,
  .hero-image {
    text-align: center;
  }

  .cta-actions .btn {
    width: 100%;
  }
}

/* 无障碍设计 */
.btn:focus,
.card:focus {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .card {
    border-width: 2px;
  }

  .badge {
    border: 1px solid;
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .resource-card,
  .event-card,
  .role-card {
    transition: none;
  }

  .resource-card:hover,
  .event-card:hover,
  .role-card:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .hero-section,
  .cta-section {
    background: white !important;
    color: black !important;
  }

  .btn {
    display: none;
  }
}
</style>
