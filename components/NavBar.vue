<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
    <div class="container">
      <!-- 品牌Logo -->
      <RouterLink to="/" class="navbar-brand d-flex align-items-center">
        <i class="fas fa-heart text-primary me-2"></i>
        <span class="fw-bold">Elderly Care Center</span>
      </RouterLink>

      <!-- 移动端切换按钮 -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 导航菜单 -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <!-- 首页 -->
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" active-class="active">
              <i class="fas fa-home me-1"></i>Home
            </RouterLink>
          </li>

          <!-- 关于我们 -->
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link" active-class="active">
              <i class="fas fa-info-circle me-1"></i>About Us
            </RouterLink>
          </li>

          <!-- 健康资源 -->
          <li class="nav-item">
            <RouterLink to="/health-resources" class="nav-link" active-class="active">
              <i class="fas fa-stethoscope me-1"></i>Health Resources
            </RouterLink>
          </li>

          <!-- 支持服务 -->
          <li class="nav-item">
            <RouterLink to="/support-services" class="nav-link" active-class="active">
              <i class="fas fa-hands-helping me-1"></i>Support Services
            </RouterLink>
          </li>

          <!-- 照顾者资源（仅限特定角色） -->
          <li class="nav-item" v-if="canAccessCaregiverResources">
            <RouterLink to="/caregiver-resources" class="nav-link" active-class="active">
              <i class="fas fa-user-friends me-1"></i>Caregiver Resources
            </RouterLink>
          </li>

          <!-- 参与我们 -->
          <li class="nav-item">
            <RouterLink to="/get-involved" class="nav-link" active-class="active">
              <i class="fas fa-volunteer-simple me-1"></i>Get Involved
            </RouterLink>
          </li>
        </ul>

        <!-- 用户区域 -->
        <ul class="navbar-nav">
          <!-- 未登录状态 -->
          <template v-if="!authStore.isAuthenticated">
            <li class="nav-item">
              <RouterLink to="/login" class="nav-link">
                <i class="fas fa-sign-in-alt me-1"></i>Login
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/register" class="btn btn-primary ms-2">
                <i class="fas fa-user-plus me-1"></i>Register
              </RouterLink>
            </li>
          </template>

          <!-- 已登录状态 -->
          <template v-else>
            <!-- 用户下拉菜单 -->
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div class="user-avatar me-2">
                  <i class="fas fa-user-circle fa-lg"></i>
                </div>
                <div class="user-info d-none d-lg-block">
                  <div class="user-name">{{ authStore.userName }}</div>
                  <small class="user-role text-muted">{{ roleDisplayName }}</small>
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <h6 class="dropdown-header">
                    <i class="fas fa-user me-2"></i>{{ authStore.userName }}
                  </h6>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <RouterLink to="/my-account" class="dropdown-item">
                    <i class="fas fa-cog me-2"></i>My Account
                  </RouterLink>
                </li>
                <li>
                  <button @click="handleLogout" class="dropdown-item">
                    <i class="fas fa-sign-out-alt me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'NavBar',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    // 计算属性：角色显示名称
    const roleDisplayName = computed(() => {
      return authStore.userRole ? authStore.getRoleDisplayName(authStore.userRole) : ''
    })

    // 计算属性：是否可以访问照顾者资源
    const canAccessCaregiverResources = computed(() => {
      return authStore.hasPermission(['caregiver', 'healthcare'])
    })

    // 登出处理
    const handleLogout = async () => {
      try {
        authStore.logout()
        await router.push('/')
        // 可以在这里添加成功提示
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    return {
      authStore,
      roleDisplayName,
      canAccessCaregiverResources,
      handleLogout,
    }
  },
}
</script>

<style scoped>
.navbar {
  transition: all 0.3s ease;
}

.navbar-brand {
  font-size: 1.25rem;
  text-decoration: none;
}

.navbar-brand:hover {
  color: var(--bs-primary) !important;
}

.nav-link {
  transition: color 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  color: var(--bs-primary) !important;
}

.nav-link.active {
  color: var(--bs-primary) !important;
  font-weight: 600;
}

.user-avatar {
  color: var(--bs-primary);
}

.user-info {
  text-align: left;
}

.user-name {
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.1;
}

.user-role {
  font-size: 0.75rem;
  line-height: 1.1;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.375rem;
}

.dropdown-item {
  transition: background-color 0.3s ease;
}

.dropdown-item:hover {
  background-color: var(--bs-primary);
  color: white;
}

.dropdown-header {
  color: var(--bs-primary);
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 991px) {
  .navbar-nav .nav-link {
    padding: 0.75rem 1rem;
  }

  .btn.ms-2 {
    margin-left: 0 !important;
    margin-top: 0.5rem;
    width: 100%;
  }
}

/* 无障碍设计：高对比度模式 */
@media (prefers-contrast: high) {
  .navbar {
    border-bottom: 2px solid #000;
  }

  .nav-link {
    border: 1px solid transparent;
  }

  .nav-link:focus {
    border-color: #000;
    outline: 2px solid #000;
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .navbar,
  .nav-link,
  .dropdown-item {
    transition: none;
  }
}
</style>
