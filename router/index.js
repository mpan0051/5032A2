import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// 页面组件导入
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AboutUs from '../views/AboutUs.vue'
import HealthResources from '../views/HealthResources.vue'
import SupportServices from '../views/SupportServices.vue'
import CaregiverResources from '../views/CaregiverResources.vue'
import GetInvolved from '../views/GetInvolved.vue'
import MyAccount from '../views/MyAccount.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home - Elderly Care Center',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login - Elderly Care Center',
      requiresAuth: false,
      hideForAuth: true, // 已登录用户隐藏
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register - Elderly Care Center',
      requiresAuth: false,
      hideForAuth: true, // 已登录用户隐藏
    },
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs,
    meta: {
      title: 'About Us - Elderly Care Center',
      requiresAuth: false,
    },
  },
  {
    path: '/health-resources',
    name: 'HealthResources',
    component: HealthResources,
    meta: {
      title: 'Health Resources - Elderly Care Center',
      requiresAuth: false,
    },
  },
  {
    path: '/support-services',
    name: 'SupportServices',
    component: SupportServices,
    meta: {
      title: 'Support Services - Elderly Care Center',
      requiresAuth: false,
    },
  },
  {
    path: '/caregiver-resources',
    name: 'CaregiverResources',
    component: CaregiverResources,
    meta: {
      title: 'Caregiver Resources - Elderly Care Center',
      requiresAuth: true,
      allowedRoles: ['caregiver', 'healthcare'], // 角色权限控制
    },
  },
  {
    path: '/get-involved',
    name: 'GetInvolved',
    component: GetInvolved,
    meta: {
      title: 'Get Involved - Elderly Care Center',
      requiresAuth: false,
    },
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      title: 'My Account - Elderly Care Center',
      requiresAuth: true, // 需要登录
    },
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Page Not Found - Elderly Care Center',
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 路由切换时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

// 路由守卫：认证检查
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 设置页面标题
  document.title = to.meta.title || 'Elderly Care Center'

  // 检查是否需要认证
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // 未登录用户重定向到登录页
    next({
      name: 'Login',
      query: { redirect: to.fullPath }, // 保存原始目标页面
    })
    return
  }

  // 检查已登录用户访问登录/注册页
  if (to.meta.hideForAuth && authStore.isAuthenticated) {
    next({ name: 'Home' })
    return
  }

  // 检查角色权限
  if (to.meta.allowedRoles && authStore.isAuthenticated) {
    const userRole = authStore.user?.role
    if (!to.meta.allowedRoles.includes(userRole)) {
      // 权限不足，重定向到首页
      next({ name: 'Home' })
      return
    }
  }

  next()
})

// 路由错误处理
router.onError((error) => {
  console.error('Router error:', error)
})

export default router
