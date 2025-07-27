<template>
  <div class="login-page">
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- 左侧信息区域 -->
        <div class="col-lg-6 d-none d-lg-flex login-info-section">
          <div
            class="info-content d-flex flex-column justify-content-center align-items-center text-white p-5"
          >
            <div class="info-header mb-4 text-center">
              <i class="fas fa-heart fa-4x text-warning mb-3"></i>
              <h2 class="fw-bold">Welcome Back</h2>
              <p class="lead">
                Continue your journey towards better health and community connections
              </p>
            </div>

            <div class="features-list">
              <div class="feature-item d-flex align-items-center mb-3">
                <div class="feature-icon me-3">
                  <i class="fas fa-shield-alt fa-2x text-warning"></i>
                </div>
                <div class="feature-text">
                  <h5 class="mb-1">Secure & Private</h5>
                  <p class="mb-0 text-light">
                    Your personal information is protected with advanced security
                  </p>
                </div>
              </div>

              <div class="feature-item d-flex align-items-center mb-3">
                <div class="feature-icon me-3">
                  <i class="fas fa-users fa-2x text-warning"></i>
                </div>
                <div class="feature-text">
                  <h5 class="mb-1">Community Support</h5>
                  <p class="mb-0 text-light">Connect with others and share experiences</p>
                </div>
              </div>

              <div class="feature-item d-flex align-items-center">
                <div class="feature-icon me-3">
                  <i class="fas fa-stethoscope fa-2x text-warning"></i>
                </div>
                <div class="feature-text">
                  <h5 class="mb-1">Personalized Resources</h5>
                  <p class="mb-0 text-light">Access health resources tailored to your needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧登录表单区域 -->
        <div class="col-lg-6 login-form-section d-flex align-items-center">
          <div class="form-container w-100 p-4 p-lg-5">
            <!-- 移动端品牌区域 -->
            <div class="mobile-brand d-lg-none text-center mb-4">
              <RouterLink to="/" class="text-decoration-none">
                <i class="fas fa-heart fa-2x text-primary me-2"></i>
                <span class="h4 fw-bold text-dark">Elderly Care Center</span>
              </RouterLink>
            </div>

            <!-- 登录表单 -->
            <div class="login-form-card">
              <div class="form-header text-center mb-4">
                <h3 class="fw-bold text-dark">Sign In to Your Account</h3>
                <p class="text-muted">
                  Enter your credentials to access your personalized dashboard
                </p>
              </div>

              <!-- 错误信息显示 -->
              <div
                v-if="authStore.error"
                class="alert alert-danger d-flex align-items-center"
                role="alert"
              >
                <i class="fas fa-exclamation-triangle me-2"></i>
                {{ authStore.error }}
              </div>

              <!-- 成功消息显示 -->
              <div
                v-if="successMessage"
                class="alert alert-success d-flex align-items-center"
                role="alert"
              >
                <i class="fas fa-check-circle me-2"></i>
                {{ successMessage }}
              </div>

              <!-- 登录表单 -->
              <form @submit.prevent="handleLogin" novalidate>
                <!-- 邮箱输入 -->
                <div class="mb-3">
                  <label for="email" class="form-label fw-bold">
                    <i class="fas fa-envelope me-2 text-primary"></i>Email Address
                  </label>
                  <input
                    id="email"
                    v-model="loginForm.email"
                    type="email"
                    class="form-control form-control-lg"
                    :class="{ 'is-invalid': formErrors.email }"
                    placeholder="Enter your email address"
                    autocomplete="email"
                    required
                    @blur="validateField('email')"
                    @input="clearFieldError('email')"
                  />
                  <div v-if="formErrors.email" class="invalid-feedback">
                    {{ formErrors.email }}
                  </div>
                  <div class="form-text">
                    <small>Use one of our demo accounts or your registered email</small>
                  </div>
                </div>

                <!-- 密码输入 -->
                <div class="mb-3">
                  <label for="password" class="form-label fw-bold">
                    <i class="fas fa-lock me-2 text-primary"></i>Password
                  </label>
                  <div class="input-group">
                    <input
                      id="password"
                      v-model="loginForm.password"
                      :type="showPassword ? 'text' : 'password'"
                      class="form-control form-control-lg"
                      :class="{ 'is-invalid': formErrors.password }"
                      placeholder="Enter your password"
                      autocomplete="current-password"
                      required
                      @blur="validateField('password')"
                      @input="clearFieldError('password')"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="togglePasswordVisibility"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    >
                      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                    </button>
                  </div>
                  <div v-if="formErrors.password" class="invalid-feedback d-block">
                    {{ formErrors.password }}
                  </div>
                </div>

                <!-- 记住我选项 -->
                <div class="mb-3 form-check">
                  <input
                    id="rememberMe"
                    v-model="loginForm.rememberMe"
                    type="checkbox"
                    class="form-check-input"
                  />
                  <label for="rememberMe" class="form-check-label"> Remember me for 30 days </label>
                </div>

                <!-- 登录按钮 -->
                <button
                  type="submit"
                  class="btn btn-primary btn-lg w-100 mb-3"
                  :disabled="authStore.isLoading"
                >
                  <span
                    v-if="authStore.isLoading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  <i v-else class="fas fa-sign-in-alt me-2"></i>
                  {{ authStore.isLoading ? 'Signing In...' : 'Sign In' }}
                </button>

                <!-- 忘记密码链接 -->
                <div class="text-center mb-3">
                  <a href="#" class="text-decoration-none" @click.prevent="showForgotPassword">
                    <i class="fas fa-key me-1"></i>Forgot your password?
                  </a>
                </div>
              </form>

              <!-- 分割线 -->
              <div class="divider my-4">
                <span class="divider-text text-muted">Or</span>
              </div>

              <!-- 注册链接 -->
              <div class="register-link text-center">
                <p class="mb-2 text-muted">Don't have an account yet?</p>
                <RouterLink to="/register" class="btn btn-outline-primary btn-lg w-100">
                  <i class="fas fa-user-plus me-2"></i>Create New Account
                </RouterLink>
              </div>

              <!-- 演示账户信息 -->
              <div class="demo-accounts mt-4">
                <div class="card bg-light">
                  <div class="card-body">
                    <h6 class="card-title">
                      <i class="fas fa-info-circle text-info me-2"></i>Demo Accounts
                    </h6>
                    <div class="row text-sm">
                      <div class="col-md-6">
                        <p class="mb-1"><strong>Senior Citizen:</strong></p>
                        <p class="small text-muted mb-2">margaret@example.com</p>
                        <p class="mb-1"><strong>Caregiver:</strong></p>
                        <p class="small text-muted mb-2">david@example.com</p>
                      </div>
                      <div class="col-md-6">
                        <p class="mb-1"><strong>Healthcare Pro:</strong></p>
                        <p class="small text-muted mb-2">amelia@example.com</p>
                        <p class="mb-1"><strong>Password:</strong></p>
                        <p class="small text-muted">password123</p>
                      </div>
                    </div>
                    <button
                      @click="fillDemoAccount('margaret@example.com')"
                      class="btn btn-sm btn-info me-2 mb-2"
                    >
                      Try Senior Account
                    </button>
                    <button
                      @click="fillDemoAccount('david@example.com')"
                      class="btn btn-sm btn-success me-2 mb-2"
                    >
                      Try Caregiver Account
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
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { validateLoginForm } from '@/utils/validation'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

    // 响应式数据
    const loginForm = reactive({
      email: '',
      password: '',
      rememberMe: false,
    })

    const formErrors = ref({})
    const showPassword = ref(false)
    const successMessage = ref('')

    // 方法
    const validateField = (fieldName) => {
      const validation = validateLoginForm(loginForm)
      if (!validation.isValid && validation.errors[fieldName]) {
        formErrors.value[fieldName] = validation.errors[fieldName]
      } else {
        delete formErrors.value[fieldName]
      }
    }

    const clearFieldError = (fieldName) => {
      if (formErrors.value[fieldName]) {
        delete formErrors.value[fieldName]
      }
      authStore.clearError()
    }

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value
    }

    const fillDemoAccount = (email) => {
      loginForm.email = email
      loginForm.password = 'password123'
      formErrors.value = {}
    }

    const handleLogin = async () => {
      // 清除之前的错误
      formErrors.value = {}
      authStore.clearError()

      // 验证表单
      const validation = validateLoginForm(loginForm)
      if (!validation.isValid) {
        formErrors.value = validation.errors
        return
      }

      try {
        const result = await authStore.login({
          email: loginForm.email,
          password: loginForm.password,
        })

        if (result.success) {
          successMessage.value = 'Login successful! Redirecting...'

          // 重定向到原始目标页面或首页
          const redirectTo = route.query.redirect || '/'
          setTimeout(() => {
            router.push(redirectTo)
          }, 1000)
        }
      } catch (error) {
        console.error('Login error:', error)
      }
    }

    const showForgotPassword = () => {
      alert(
        'Password reset functionality would be implemented here. For demo accounts, use password123.',
      )
    }

    // 组件挂载时清除错误
    onMounted(() => {
      authStore.clearError()

      // 如果有来自注册页面的成功消息
      if (route.query.registered === 'true') {
        successMessage.value = 'Registration successful! Please sign in with your credentials.'
      }
    })

    return {
      authStore,
      loginForm,
      formErrors,
      showPassword,
      successMessage,
      validateField,
      clearFieldError,
      togglePasswordVisibility,
      fillDemoAccount,
      handleLogin,
      showForgotPassword,
    }
  },
}
</script>

<style scoped>
.login-page {
  background-color: #f8f9fa;
}

.login-info-section {
  background: linear-gradient(135deg, var(--bs-primary) 0%, #4c84ff 100%);
  position: relative;
}

.login-info-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/elderly-care-pattern.svg') center/cover;
  opacity: 0.1;
}

.info-content {
  position: relative;
  z-index: 1;
  max-width: 500px;
}

.feature-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.login-form-section {
  background-color: white;
}

.form-container {
  max-width: 480px;
  margin: 0 auto;
}

.login-form-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-control-lg {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-control-lg:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(13, 110, 253, 0.4);
}

.divider {
  position: relative;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #e9ecef;
}

.divider-text {
  background-color: white;
  padding: 0 1rem;
  position: relative;
}

.demo-accounts .card {
  border: 1px solid #e9ecef;
}

.text-sm {
  font-size: 0.875rem;
}

/* 响应式设计 */
@media (max-width: 991px) {
  .login-form-card {
    padding: 1.5rem;
    box-shadow: none;
    border-radius: 0;
  }

  .form-container {
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .login-form-card {
    padding: 1rem;
  }

  .form-container {
    padding: 0.5rem;
  }

  .btn-lg {
    padding: 0.75rem 1rem;
  }

  .demo-accounts .btn-sm {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
}

/* 无障碍设计 */
.form-control:focus,
.btn:focus {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .login-form-card {
    border: 2px solid #000;
  }

  .form-control-lg {
    border-width: 2px;
  }

  .feature-item {
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .form-control-lg,
  .btn-lg,
  .btn-primary {
    transition: none;
  }

  .btn-primary:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .login-info-section {
    display: none;
  }

  .demo-accounts {
    display: none;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .login-page {
    background-color: #1a1a1a;
  }

  .login-form-section {
    background-color: #2d2d2d;
  }

  .login-form-card {
    background-color: #3d3d3d;
    color: white;
  }

  .divider-text {
    background-color: #3d3d3d;
  }
}
</style>
