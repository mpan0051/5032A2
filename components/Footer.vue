<template>
  <footer class="footer bg-dark text-light mt-auto">
    <div class="container py-5">
      <div class="row">
        <!-- 关于我们部分 -->
        <div class="col-lg-4 col-md-6 mb-4">
          <h5 class="text-primary mb-3"><i class="fas fa-heart me-2"></i>Elderly Care Center</h5>
          <p class="text-light-emphasis">
            Dedicated to improving the health, wellbeing, and social connections of elderly
            populations through accessible digital solutions and community support.
          </p>
          <div class="social-links">
            <a href="#" class="social-link me-3" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-link me-3" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-link me-3" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div class="col-lg-2 col-md-6 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">Quick Links</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <RouterLink to="/" class="footer-link">Home</RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/about" class="footer-link">About Us</RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/health-resources" class="footer-link">Health Resources</RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/support-services" class="footer-link">Support Services</RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink to="/get-involved" class="footer-link">Get Involved</RouterLink>
            </li>
          </ul>
        </div>

        <!-- 服务类别 -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">Our Services</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-check-circle text-primary me-2"></i>Health Resources
              </span>
            </li>
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-check-circle text-primary me-2"></i>Support Services
              </span>
            </li>
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-check-circle text-primary me-2"></i>Community Events
              </span>
            </li>
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-check-circle text-primary me-2"></i>Caregiver Support
              </span>
            </li>
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-check-circle text-primary me-2"></i>Health Monitoring
              </span>
            </li>
          </ul>
        </div>

        <!-- 联系信息 -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h6 class="text-uppercase fw-bold mb-3">Contact Info</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-map-marker-alt text-primary me-2"></i>
                123 Care Street<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Health City, HC 12345
              </span>
            </li>
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-phone text-primary me-2"></i>
                (555) 123-4567
              </span>
            </li>
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-envelope text-primary me-2"></i>
                info@elderlycare.org
              </span>
            </li>
            <li class="mb-2">
              <span class="footer-text">
                <i class="fas fa-clock text-primary me-2"></i>
                Mon-Fri: 8:00 AM - 6:00 PM
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 分割线 -->
      <hr class="my-4" />

      <!-- 底部信息 -->
      <div class="row align-items-center">
        <div class="col-md-6 mb-3 mb-md-0">
          <p class="mb-0 text-light-emphasis">
            © {{ currentYear }} Elderly Care Center. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a href="#" class="footer-link small">Privacy Policy</a>
            </li>
            <li class="list-inline-item">
              <span class="text-light-emphasis">|</span>
            </li>
            <li class="list-inline-item">
              <a href="#" class="footer-link small">Terms of Service</a>
            </li>
            <li class="list-inline-item">
              <span class="text-light-emphasis">|</span>
            </li>
            <li class="list-inline-item">
              <a href="#" class="footer-link small">Accessibility</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 紧急联系信息 -->
      <div
        class="emergency-contact mt-4 p-3 bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded"
      >
        <div class="row align-items-center">
          <div class="col-md-8">
            <h6 class="text-danger mb-1">
              <i class="fas fa-exclamation-triangle me-2"></i>Emergency Contact
            </h6>
            <p class="mb-0 small text-light-emphasis">
              For medical emergencies, call 911. For urgent care support, contact our 24/7 helpline.
            </p>
          </div>
          <div class="col-md-4 text-md-end mt-2 mt-md-0">
            <a href="tel:+15551234567" class="btn btn-outline-danger btn-sm">
              <i class="fas fa-phone me-2"></i>24/7 Helpline
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="back-to-top btn btn-primary btn-sm"
      aria-label="Back to top"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </footer>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Footer',
  setup() {
    const showBackToTop = ref(false)

    // 当前年份
    const currentYear = computed(() => new Date().getFullYear())

    // 监听滚动事件
    const handleScroll = () => {
      showBackToTop.value = window.pageYOffset > 300
    }

    // 返回顶部
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      currentYear,
      showBackToTop,
      scrollToTop,
    }
  },
}
</script>

<style scoped>
.footer {
  position: relative;
}

.footer-link {
  color: var(--bs-light);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--bs-primary);
}

.footer-text {
  color: var(--bs-light);
}

.social-links {
  margin-top: 1rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: var(--bs-primary);
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--bs-light);
  color: var(--bs-primary);
  transform: translateY(-2px);
}

.emergency-contact {
  backdrop-filter: blur(10px);
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer {
    text-align: center;
  }

  .emergency-contact .row {
    text-align: center;
  }

  .emergency-contact .col-md-4 {
    margin-top: 1rem;
  }

  .back-to-top {
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
  }
}

/* 无障碍设计 */
.footer-link:focus,
.social-link:focus,
.back-to-top:focus {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .footer {
    border-top: 3px solid #fff;
  }

  .social-link {
    border: 2px solid #fff;
  }

  .emergency-contact {
    border-width: 2px !important;
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .footer-link,
  .social-link,
  .back-to-top {
    transition: none;
  }

  .social-link:hover,
  .back-to-top:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .footer {
    background: white !important;
    color: black !important;
  }

  .back-to-top,
  .social-links {
    display: none;
  }
}
</style>
