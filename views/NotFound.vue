<template>
  <div class="not-found-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-lg-8 col-xl-6">
          <div class="error-content text-center">
            <!-- 404动画图标 -->
            <div class="error-animation mb-4">
              <div class="error-number">
                <span class="four">4</span>
                <span class="zero">
                  <i class="fas fa-heart text-primary pulse"></i>
                </span>
                <span class="four">4</span>
              </div>
            </div>

            <!-- 错误标题 -->
            <h1 class="error-title display-4 fw-bold text-dark mb-3">Page Not Found</h1>

            <!-- 错误描述 -->
            <p class="error-description lead text-muted mb-4">
              Oops! The page you're looking for seems to have wandered off. Don't worry, we're here
              to help you find what you need.
            </p>

            <!-- 可能的原因 -->
            <div class="error-reasons mb-5">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="reason-card p-3 border rounded-3 bg-light">
                    <i class="fas fa-link text-warning mb-2"></i>
                    <h6 class="fw-bold">Broken Link</h6>
                    <small class="text-muted">The link you clicked might be outdated</small>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="reason-card p-3 border rounded-3 bg-light">
                    <i class="fas fa-keyboard text-info mb-2"></i>
                    <h6 class="fw-bold">Typo in URL</h6>
                    <small class="text-muted">Check if the web address is spelled correctly</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- 导航选项 -->
            <div class="navigation-options mb-5">
              <h5 class="fw-bold mb-3">What would you like to do?</h5>
              <div class="row">
                <div class="col-lg-6 mb-3">
                  <RouterLink to="/" class="nav-option-card d-block text-decoration-none">
                    <div class="card h-100 border-primary">
                      <div class="card-body text-center">
                        <i class="fas fa-home fa-2x text-primary mb-3"></i>
                        <h6 class="card-title fw-bold">Go Home</h6>
                        <p class="card-text small text-muted">
                          Return to our homepage and start fresh
                        </p>
                      </div>
                    </div>
                  </RouterLink>
                </div>
                <div class="col-lg-6 mb-3">
                  <a @click="goBack" href="#" class="nav-option-card d-block text-decoration-none">
                    <div class="card h-100 border-secondary">
                      <div class="card-body text-center">
                        <i class="fas fa-arrow-left fa-2x text-secondary mb-3"></i>
                        <h6 class="card-title fw-bold">Go Back</h6>
                        <p class="card-text small text-muted">
                          Return to the previous page you visited
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <!-- 热门页面推荐 -->
            <div class="popular-pages">
              <h5 class="fw-bold mb-3">Popular Pages</h5>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <RouterLink
                    to="/health-resources"
                    class="popular-page-link d-block text-decoration-none p-3 border rounded-3 bg-primary bg-opacity-10"
                  >
                    <div class="text-center">
                      <i class="fas fa-stethoscope fa-2x text-primary mb-2"></i>
                      <h6 class="fw-bold text-dark">Health Resources</h6>
                      <small class="text-muted">Medical guides and wellness tips</small>
                    </div>
                  </RouterLink>
                </div>
                <div class="col-md-4 mb-3">
                  <RouterLink
                    to="/support-services"
                    class="popular-page-link d-block text-decoration-none p-3 border rounded-3 bg-success bg-opacity-10"
                  >
                    <div class="text-center">
                      <i class="fas fa-hands-helping fa-2x text-success mb-2"></i>
                      <h6 class="fw-bold text-dark">Support Services</h6>
                      <small class="text-muted">Community support and assistance</small>
                    </div>
                  </RouterLink>
                </div>
                <div class="col-md-4 mb-3">
                  <RouterLink
                    to="/get-involved"
                    class="popular-page-link d-block text-decoration-none p-3 border rounded-3 bg-warning bg-opacity-10"
                  >
                    <div class="text-center">
                      <i class="fas fa-calendar-alt fa-2x text-warning mb-2"></i>
                      <h6 class="fw-bold text-dark">Get Involved</h6>
                      <small class="text-muted">Events and volunteer opportunities</small>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>

            <!-- 搜索框 -->
            <div class="search-section mt-5">
              <h5 class="fw-bold mb-3">Or search for what you need</h5>
              <form @submit.prevent="handleSearch" class="search-form">
                <div class="input-group input-group-lg">
                  <input
                    v-model="searchQuery"
                    type="text"
                    class="form-control"
                    placeholder="Search for health resources, services, or information..."
                    aria-label="Search"
                  />
                  <button type="submit" class="btn btn-primary" :disabled="!searchQuery.trim()">
                    <i class="fas fa-search me-2"></i>Search
                  </button>
                </div>
              </form>
            </div>

            <!-- 联系支持 -->
            <div class="contact-support mt-5 p-4 bg-light rounded-3">
              <h6 class="fw-bold mb-2">
                <i class="fas fa-life-ring text-primary me-2"></i>
                Still can't find what you're looking for?
              </h6>
              <p class="text-muted mb-3">
                Our support team is here to help you navigate our resources and services.
              </p>
              <div class="support-options">
                <a href="mailto:support@elderlycare.org" class="btn btn-outline-primary me-2 mb-2">
                  <i class="fas fa-envelope me-2"></i>Email Support
                </a>
                <a href="tel:+15551234567" class="btn btn-outline-success me-2 mb-2">
                  <i class="fas fa-phone me-2"></i>Call Us
                </a>
                <RouterLink to="/about" class="btn btn-outline-info mb-2">
                  <i class="fas fa-info-circle me-2"></i>About Us
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'NotFound',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')

    const goBack = () => {
      // 检查是否有历史记录
      if (window.history.length > 1) {
        router.go(-1)
      } else {
        router.push('/')
      }
    }

    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        // 重定向到健康资源页面并传递搜索查询
        router.push({
          path: '/health-resources',
          query: { search: searchQuery.value.trim() },
        })
      }
    }

    return {
      searchQuery,
      goBack,
      handleSearch,
    }
  },
}
</script>

<style scoped>
.not-found-page {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 2rem 0;
}

.error-animation {
  margin-bottom: 2rem;
}

.error-number {
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

.error-number .four {
  color: var(--bs-primary);
  margin: 0 1rem;
}

.error-number .zero {
  color: var(--bs-primary);
  margin: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.reason-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.reason-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.nav-option-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.nav-option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  text-decoration: none;
}

.nav-option-card .card {
  border-width: 2px;
  transition: border-color 0.3s ease;
}

.nav-option-card:hover .card {
  border-color: var(--bs-primary) !important;
}

.popular-page-link {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border-width: 2px !important;
}

.popular-page-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.search-form .form-control {
  border-radius: 0.5rem 0 0 0.5rem;
}

.search-form .btn {
  border-radius: 0 0.5rem 0.5rem 0;
}

.contact-support {
  border: 2px solid #e9ecef;
}

.support-options .btn {
  transition: transform 0.3s ease;
}

.support-options .btn:hover {
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-number {
    font-size: 6rem;
  }

  .error-number .four,
  .error-number .zero {
    margin: 0 0.5rem;
  }

  .error-title {
    font-size: 2rem;
  }

  .support-options .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .nav-option-card:hover,
  .popular-page-link:hover {
    transform: none;
  }
}

@media (max-width: 576px) {
  .error-number {
    font-size: 4rem;
    flex-direction: column;
  }

  .error-number .four,
  .error-number .zero {
    margin: 0.5rem 0;
  }

  .not-found-page {
    padding: 1rem 0;
  }
}

/* 无障碍设计 */
.nav-option-card:focus,
.popular-page-link:focus,
.btn:focus {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .reason-card,
  .nav-option-card .card,
  .popular-page-link,
  .contact-support {
    border-width: 3px !important;
  }

  .error-number {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .pulse {
    animation: none;
  }

  .reason-card,
  .nav-option-card,
  .popular-page-link,
  .support-options .btn {
    transition: none;
  }

  .reason-card:hover,
  .nav-option-card:hover,
  .popular-page-link:hover,
  .support-options .btn:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .not-found-page {
    background: white !important;
  }

  .error-animation,
  .navigation-options,
  .search-section,
  .contact-support {
    display: none;
  }

  .error-title {
    color: black !important;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .not-found-page {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }

  .error-title {
    color: white !important;
  }

  .reason-card,
  .contact-support {
    background-color: #3d3d3d !important;
    border-color: #4d4d4d !important;
  }

  .nav-option-card .card {
    background-color: #3d3d3d !important;
    color: white !important;
  }
}
</style>
