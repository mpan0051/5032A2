import { createPinia } from 'pinia'

// 创建Pinia实例
const pinia = createPinia()

// 开发环境下启用调试
if (import.meta.env.DEV) {
  pinia.use(({ store }) => {
    // 添加store名称用于调试
    store.$id = store.$id
  })
}

// 持久化插件：自动保存状态到localStorage
pinia.use(({ store }) => {
  // 只持久化特定的store
  if (store.$id === 'auth') {
    // 从localStorage恢复状态
    const savedState = localStorage.getItem(`pinia-${store.$id}`)
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        store.$patch(parsed)
      } catch (error) {
        console.warn(`恢复store状态失败: ${store.$id}`, error)
      }
    }

    // 监听状态变化并保存
    store.$subscribe((mutation, state) => {
      try {
        // 过滤敏感信息
        const stateToSave = {
          ...state,
          // 不保存密码等敏感信息
          password: undefined,
        }
        localStorage.setItem(`pinia-${store.$id}`, JSON.stringify(stateToSave))
      } catch (error) {
        console.warn(`保存store状态失败: ${store.$id}`, error)
      }
    })
  }
})

export default pinia

// 导出所有store
export { useAuthStore } from './auth'
export { useDataStore } from './data'
export { useRatingStore } from './rating'
