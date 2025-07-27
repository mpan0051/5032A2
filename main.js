import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入Bootstrap CSS和JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 导入FontAwesome图标
import '@fortawesome/fontawesome-free/css/all.min.css'

// 导入全局样式
import './assets/main.css'

const app = createApp(App)

// 配置Pinia状态管理
app.use(createPinia())

// 配置Vue Router
app.use(router)

// 全局属性：当前用户角色
app.config.globalProperties.$userRoles = {
  SENIOR: 'senior',
  CAREGIVER: 'caregiver',
  HEALTHCARE: 'healthcare',
  VOLUNTEER: 'volunteer',
}

// 挂载应用到DOM
app.mount('#app')
