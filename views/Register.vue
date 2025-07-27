<template>
  <div class="register-page">
    <div class="container-fluid">
      <div class="row min-vh-100">
        <!-- 左侧信息区域 -->
        <div class="col-lg-5 d-none d-lg-flex register-info-section">
          <div
            class="info-content d-flex flex-column justify-content-center align-items-center text-white p-5"
          >
            <div class="info-header mb-5 text-center">
              <i class="fas fa-users fa-4x text-warning mb-3"></i>
              <h2 class="fw-bold">Join Our Community</h2>
              <p class="lead">
                Start your journey towards better health and meaningful connections
              </p>
            </div>

            <div class="benefits-list">
              <div class="benefit-item d-flex align-items-center mb-4">
                <div class="benefit-icon me-3">
                  <i class="fas fa-user-shield fa-2x text-warning"></i>
                </div>
                <div class="benefit-text">
                  <h5 class="mb-1">Personalized Experience</h5>
                  <p class="mb-0 text-light">
                    Get resources tailored to your specific role and needs
                  </p>
                </div>
              </div>

              <div class="benefit-item d-flex align-items-center mb-4">
                <div class="benefit-icon me-3">
                  <i class="fas fa-heart fa-2x text-warning"></i>
                </div>
                <div class="benefit-text">
                  <h5 class="mb-1">Health & Wellness</h5>
                  <p class="mb-0 text-light">
                    Access comprehensive health resources and wellness tips
                  </p>
                </div>
              </div>

              <div class="benefit-item d-flex align-items-center mb-4">
                <div class="benefit-icon me-3">
                  <i class="fas fa-hands-helping fa-2x text-warning"></i>
                </div>
                <div class="benefit-text">
                  <h5 class="mb-1">Community Support</h5>
                  <p class="mb-0 text-light">Connect with others and share experiences</p>
                </div>
              </div>

              <div class="benefit-item d-flex align-items-center">
                <div class="benefit-icon me-3">
                  <i class="fas fa-calendar-alt fa-2x text-warning"></i>
                </div>
                <div class="benefit-text">
                  <h5 class="mb-1">Events & Activities</h5>
                  <p class="mb-0 text-light">Join community events and wellness programs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧注册表单区域 -->
        <div class="col-lg-7 register-form-section d-flex align-items-center">
          <div class="form-container w-100 p-4 p-lg-5">
            <!-- 移动端品牌区域 -->
            <div class="mobile-brand d-lg-none text-center mb-4">
              <RouterLink to="/" class="text-decoration-none">
                <i class="fas fa-heart fa-2x text-primary me-2"></i>
                <span class="h4 fw-bold text-dark">Elderly Care Center</span>
              </RouterLink>
            </div>

            <!-- 注册表单 -->
            <div class="register-form-card">
              <div class="form-header text-center mb-4">
                <h3 class="fw-bold text-dark">Create Your Account</h3>
                <p class="text-muted">Join our community and start your wellness journey today</p>
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

              <!-- 注册表单 -->
              <form @submit.prevent="handleRegister" novalidate>
                <!-- 第一行：姓名和邮箱 -->
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="name" class="form-label fw-bold">
                      <i class="fas fa-user me-2 text-primary"></i>Full Name *
                    </label>
                    <input
                      id="name"
                      v-model="registerForm.name"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': formErrors.name }"
                      placeholder="Enter your full name"
                      autocomplete="name"
                      required
                      @blur="validateField('name')"
                      @input="clearFieldError('name')"
                    />
                    <div v-if="formErrors.name" class="invalid-feedback">
                      {{ formErrors.name }}
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label fw-bold">
                      <i class="fas fa-envelope me-2 text-primary"></i>Email Address *
                    </label>
                    <input
                      id="email"
                      v-model="registerForm.email"
                      type="email"
                      class="form-control"
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
                  </div>
                </div>

                <!-- 第二行：密码 -->
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label fw-bold">
                      <i class="fas fa-lock me-2 text-primary"></i>Password *
                    </label>
                    <div class="input-group">
                      <input
                        id="password"
                        v-model="registerForm.password"
                        :type="showPassword ? 'text' : 'password'"
                        class="form-control"
                        :class="{ 'is-invalid': formErrors.password }"
                        placeholder="Create a password"
                        autocomplete="new-password"
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
                    <div class="form-text">
                      <small>At least 6 characters</small>
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="confirmPassword" class="form-label fw-bold">
                      <i class="fas fa-lock me-2 text-primary"></i>Confirm Password *
                    </label>
                    <input
                      id="confirmPassword"
                      v-model="registerForm.confirmPassword"
                      type="password"
                      class="form-control"
                      :class="{ 'is-invalid': formErrors.confirmPassword }"
                      placeholder="Confirm your password"
                      autocomplete="new-password"
                      required
                      @blur="validateField('confirmPassword')"
                      @input="clearFieldError('confirmPassword')"
                    />
                    <div v-if="formErrors.confirmPassword" class="invalid-feedback">
                      {{ formErrors.confirmPassword }}
                    </div>
                  </div>
                </div>

                <!-- 第三行：角色选择 -->
                <div class="mb-3">
                  <label class="form-label fw-bold">
                    <i class="fas fa-user-tag me-2 text-primary"></i>I am a... *
                  </label>
                  <div class="role-selection">
                    <div class="row">
                      <div class="col-md-6 mb-2">
                        <div class="form-check role-option">
                          <input
                            id="role-senior"
                            v-model="registerForm.role"
                            type="radio"
                            value="senior"
                            class="form-check-input"
                            :class="{ 'is-invalid': formErrors.role }"
                            @change="clearFieldError('role')"
                          />
                          <label for="role-senior" class="form-check-label role-label">
                            <div class="role-content">
                              <i class="fas fa-user-clock text-primary me-2"></i>
                              <div>
                                <strong>Senior Citizen</strong>
                                <br /><small class="text-muted"
                                  >Looking for health resources and community</small
                                >
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div class="col-md-6 mb-2">
                        <div class="form-check role-option">
                          <input
                            id="role-caregiver"
                            v-model="registerForm.role"
                            type="radio"
                            value="caregiver"
                            class="form-check-input"
                            @change="clearFieldError('role')"
                          />
                          <label for="role-caregiver" class="form-check-label role-label">
                            <div class="role-content">
                              <i class="fas fa-user-friends text-success me-2"></i>
                              <div>
                                <strong>Caregiver/Family Member</strong>
                                <br /><small class="text-muted"
                                  >Caring for an elderly family member</small
                                >
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div class="col-md-6 mb-2">
                        <div class="form-check role-option">
                          <input
                            id="role-healthcare"
                            v-model="registerForm.role"
                            type="radio"
                            value="healthcare"
                            class="form-check-input"
                            @change="clearFieldError('role')"
                          />
                          <label for="role-healthcare" class="form-check-label role-label">
                            <div class="role-content">
                              <i class="fas fa-user-md text-info me-2"></i>
                              <div>
                                <strong>Healthcare Professional</strong>
                                <br /><small class="text-muted"
                                  >Doctor, nurse, or healthcare worker</small
                                >
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div class="col-md-6 mb-2">
                        <div class="form-check role-option">
                          <input
                            id="role-volunteer"
                            v-model="registerForm.role"
                            type="radio"
                            value="volunteer"
                            class="form-check-input"
                            @change="clearFieldError('role')"
                          />
                          <label for="role-volunteer" class="form-check-label role-label">
                            <div class="role-content">
                              <i class="fas fa-hands-helping text-warning me-2"></i>
                              <div>
                                <strong>Volunteer</strong>
                                <br /><small class="text-muted"
                                  >Want to help the elderly community</small
                                >
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="formErrors.role" class="text-danger small">
                    {{ formErrors.role }}
                  </div>
                </div>

                <!-- 第四行：可选信息 -->
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="age" class="form-label fw-bold">
                      <i class="fas fa-birthday-cake me-2 text-primary"></i>Age
                      <span class="text-muted">(Optional)</span>
                    </label>
                    <input
                      id="age"
                      v-model="registerForm.age"
                      type="number"
                      class="form-control"
                      :class="{ 'is-invalid': formErrors.age }"
                      placeholder="Enter your age"
                      min="18"
                      max="120"
                      @blur="validateField('age')"
                      @input="clearFieldError('age')"
                    />
                    <div v-if="formErrors.age" class="invalid-feedback">
                      {{ formErrors.age }}
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="phone" class="form-label fw-bold">
                      <i class="fas fa-phone me-2 text-primary"></i>Phone Number
                      <span class="text-muted">(Optional)</span>
                    </label>
                    <input
                      id="phone"
                      v-model="registerForm.phone"
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': formErrors.phone }"
                      placeholder="(555) 123-4567"
                      autocomplete="tel"
                      @blur="validateField('phone')"
                      @input="clearFieldError('phone')"
                    />
                    <div v-if="formErrors.phone" class="invalid-feedback">
                      {{ formErrors.phone }}
                    </div>
                  </div>
                </div>

                <!-- 同意条款 -->
                <div class="mb-3 form-check">
                  <input
                    id="agreeTerms"
                    v-model="registerForm.agreeTerms"
                    type="checkbox"
                    class="form-check-input"
                    :class="{ 'is-invalid': formErrors.agreeTerms }"
                    required
                  />
                  <label for="agreeTerms" class="form-check-label">
                    I agree to the <a href="#" class="text-decoration-none">Terms of Service</a> and
                    <a href="#" class="text-decoration-none">Privacy Policy</a> *
                  </label>
                  <div v-if="formErrors.agreeTerms" class="invalid-feedback d-block">
                    {{ formErrors.agreeTerms }}
                  </div>
                </div>

                <!-- 注册按钮 -->
                <button
                  type="submit"
                  class="btn btn-primary btn-lg w-100 mb-3"
                  :disabled="authStore.isLoading"
                >
                  <span
                    v-if="authStore.isLoading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  <i v-else class="fas fa-user-plus me-2"></i>
                  {{ authStore.isLoading ? 'Creating Account...' : 'Create Account' }}
                </button>
              </form>

              <!-- 分割线 -->
              <div class="divider my-4">
                <span class="divider-text text-muted">Already have an account?</span>
              </div>

              <!-- 登录链接 -->
              <div class="login-link text-center">
                <RouterLink to="/login" class="btn btn-outline-primary btn-lg w-100">
                  <i class="fas fa-sign-in-alt me-2"></i>Sign In to Existing Account
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
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { validateRegisterForm } from '@/utils/validation'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    // 响应式数据
    const registerForm = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      age: '',
      phone: '',
      agreeTerms: false,
    })

    const formErrors = ref({})
    const showPassword = ref(false)

    // 方法
    const validateField = (fieldName) => {
      const validation = validateRegisterForm(registerForm)

      if (fieldName === 'agreeTerms' && !registerForm.agreeTerms) {
        formErrors.value.agreeTerms = 'You must agree to the terms and conditions'
        return
      }

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

    const handleRegister = async () => {
      // 清除之前的错误
      formErrors.value = {}
      authStore.clearError()

      // 验证同意条款
      if (!registerForm.agreeTerms) {
        formErrors.value.agreeTerms = 'You must agree to the terms and conditions'
        return
      }

      // 验证表单
      const validation = validateRegisterForm(registerForm)
      if (!validation.isValid) {
        formErrors.value = validation.errors
        return
      }

      try {
        const result = await authStore.register({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
          confirmPassword: registerForm.confirmPassword,
          role: registerForm.role,
          age: registerForm.age || null,
          phone: registerForm.phone || '',
        })

        if (result.success) {
          // 注册成功，重定向到首页
          router.push({
            path: '/',
            query: { registered: 'true' },
          })
        }
      } catch (error) {
        console.error('Registration error:', error)
      }
    }

    // 组件挂载时清除错误
    onMounted(() => {
      authStore.clearError()
    })

    return {
      authStore,
      registerForm,
      formErrors,
      showPassword,
      validateField,
      clearFieldError,
      togglePasswordVisibility,
      handleRegister,
    }
  },
}
</script>

<style scoped>
.register-page {
  background-color: #f8f9fa;
}

.register-info-section {
  background: linear-gradient(135deg, var(--bs-success) 0%, #28a745 100%);
  position: relative;
}

.register-info-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/images/community-pattern.svg') center/cover;
  opacity: 0.1;
}

.info-content {
  position: relative;
  z-index: 1;
  max-width: 500px;
}

.benefit-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.25rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.register-form-section {
  background-color: white;
}

.form-container {
  max-width: 700px;
  margin: 0 auto;
}

.register-form-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-control {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.role-selection {
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f8f9fa;
}

.role-option {
  margin-bottom: 0;
}

.role-label {
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.role-label:hover {
  border-color: var(--bs-primary);
  background-color: #f8f9ff;
}

.form-check-input:checked + .role-label {
  border-color: var(--bs-primary);
  background-color: #e7f3ff;
}

.role-content {
  display: flex;
  align-items: center;
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

/* 响应式设计 */
@media (max-width: 991px) {
  .register-form-card {
    padding: 1.5rem;
    box-shadow: none;
    border-radius: 0;
  }

  .form-container {
    padding: 1rem;
  }

  .role-content {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .register-form-card {
    padding: 1rem;
  }

  .form-container {
    padding: 0.5rem;
  }

  .btn-lg {
    padding: 0.75rem 1rem;
  }

  .role-label {
    padding: 0.75rem;
  }

  .role-content {
    flex-direction: column;
    text-align: center;
  }

  .role-content i {
    margin-bottom: 0.5rem;
    margin-right: 0;
  }
}

/* 无障碍设计 */
.form-control:focus,
.btn:focus,
.role-label:focus-within {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .register-form-card {
    border: 2px solid #000;
  }

  .form-control,
  .role-label {
    border-width: 2px;
  }

  .benefit-item {
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .form-control,
  .btn-lg,
  .btn-primary,
  .role-label {
    transition: none;
  }

  .btn-primary:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .register-info-section {
    display: none;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .register-page {
    background-color: #1a1a1a;
  }

  .register-form-section {
    background-color: #2d2d2d;
  }

  .register-form-card {
    background-color: #3d3d3d;
    color: white;
  }

  .role-selection {
    background-color: #2d2d2d;
  }

  .role-label {
    background-color: #4d4d4d;
    color: white;
  }

  .divider-text {
    background-color: #3d3d3d;
  }
}
</style>
