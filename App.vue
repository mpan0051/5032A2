<template>
  <div id="app" class="elderly-care-app">
    <!-- 无障碍访问：跳转到主内容 -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- 顶部导航栏 -->
    <NavBar />

    <!-- 主内容区域 -->
    <main id="main-content" class="main-content">
      <RouterView />
    </main>

    <!-- 页脚 -->
    <Footer />

    <!-- 无障碍访问：字体大小控制 -->
    <div class="accessibility-controls">
      <button
        @click="increaseFontSize"
        class="btn btn-outline-primary btn-sm"
        title="Increase font size"
      >
        <i class="fas fa-plus"></i> A+
      </button>
      <button
        @click="decreaseFontSize"
        class="btn btn-outline-primary btn-sm"
        title="Decrease font size"
      >
        <i class="fas fa-minus"></i> A-
      </button>
      <button
        @click="toggleHighContrast"
        class="btn btn-outline-primary btn-sm"
        title="High contrast mode"
      >
        <i class="fas fa-adjust"></i>
      </button>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      fontSize: 16,
      highContrast: false,
    }
  },
  mounted() {
    // 从本地存储恢复无障碍设置
    this.loadAccessibilitySettings()
  },
  methods: {
    increaseFontSize() {
      if (this.fontSize < 24) {
        this.fontSize += 2
        this.applyFontSize()
        this.saveAccessibilitySettings()
      }
    },
    decreaseFontSize() {
      if (this.fontSize > 12) {
        this.fontSize -= 2
        this.applyFontSize()
        this.saveAccessibilitySettings()
      }
    },
    toggleHighContrast() {
      this.highContrast = !this.highContrast
      document.body.classList.toggle('high-contrast', this.highContrast)
      this.saveAccessibilitySettings()
    },
    applyFontSize() {
      document.documentElement.style.fontSize = `${this.fontSize}px`
    },
    loadAccessibilitySettings() {
      const settings = localStorage.getItem('accessibilitySettings')
      if (settings) {
        const parsed = JSON.parse(settings)
        this.fontSize = parsed.fontSize || 16
        this.highContrast = parsed.highContrast || false

        this.applyFontSize()
        if (this.highContrast) {
          document.body.classList.add('high-contrast')
        }
      }
    },
    saveAccessibilitySettings() {
      const settings = {
        fontSize: this.fontSize,
        highContrast: this.highContrast,
      }
      localStorage.setItem('accessibilitySettings', JSON.stringify(settings))
    },
  },
}
</script>

<style scoped>
.elderly-care-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 80px; /* 为固定导航栏留空间 */
}

/* 无障碍访问：跳转链接 */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
  border-radius: 4px;
}

.skip-link:focus {
  top: 6px;
}

/* 无障碍访问控制按钮 */
.accessibility-controls {
  position: fixed;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.accessibility-controls button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 响应式设计：移动设备上隐藏无障碍控制 */
@media (max-width: 768px) {
  .accessibility-controls {
    display: none;
  }

  .main-content {
    padding-top: 60px;
  }
}

/* 高对比度模式 */
:global(.high-contrast) {
  background: #000 !important;
  color: #fff !important;
}

:global(.high-contrast .card) {
  background: #222 !important;
  border-color: #fff !important;
}

:global(.high-contrast .btn-primary) {
  background: #fff !important;
  color: #000 !important;
  border-color: #fff !important;
}
</style>
