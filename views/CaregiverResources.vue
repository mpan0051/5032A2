<template>
  <div class="caregiver-resources-page">
    <!-- 页面标题区域 -->
    <section class="page-header bg-success text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-5 fw-bold mb-3">
              <i class="fas fa-user-friends me-3"></i>Caregiver Resources
            </h1>
            <p class="lead mb-0">
              Essential tools, guides, and support for family caregivers and healthcare
              professionals caring for elderly loved ones and patients.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div class="stats-card bg-white bg-opacity-20 p-3 rounded-3 backdrop-blur">
              <div class="text-center">
                <div class="h2 fw-bold text-warning mb-1">
                  {{ userRole === 'healthcare' ? '24/7' : 'Always' }}
                </div>
                <div class="small">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 角色特定欢迎信息 -->
    <section class="role-welcome py-4 bg-light">
      <div class="container">
        <div class="alert" :class="roleAlertClass" role="alert">
          <div class="d-flex align-items-center">
            <i :class="roleIcon" class="fa-2x me-3"></i>
            <div>
              <h5 class="alert-heading mb-1">{{ roleWelcomeTitle }}</h5>
              <p class="mb-0">{{ roleWelcomeMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速行动工具 -->
    <section class="quick-actions py-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="fw-bold mb-4 text-center">Quick Access Tools</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-4" v-for="tool in quickAccessTools" :key="tool.id">
            <div class="tool-card card h-100 shadow-sm">
              <div class="card-body text-center">
                <div class="tool-icon mb-3">
                  <i :class="tool.icon" class="fa-3x" :style="{ color: tool.color }"></i>
                </div>
                <h5 class="card-title">{{ tool.title }}</h5>
                <p class="card-text text-muted">{{ tool.description }}</p>
                <button
                  @click="useTool(tool.id)"
                  class="btn btn-outline-primary"
                  :disabled="tool.requiresAuth && !authStore.isAuthenticated"
                >
                  <i :class="tool.buttonIcon" class="me-2"></i>{{ tool.buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 照顾者指南 -->
    <section class="caregiver-guides py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="fw-bold mb-4 text-center">Caregiver Guides</h2>
          </div>
        </div>
        <div class="row">
          <div v-for="guide in caregiverGuides" :key="guide.id" class="col-lg-4 col-md-6 mb-4">
            <div class="guide-card card h-100 shadow-sm">
              <div class="card-header" :class="guide.headerClass">
                <h6 class="mb-0 text-white">
                  <i :class="guide.icon" class="me-2"></i>{{ guide.category }}
                </h6>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ guide.title }}</h5>
                <p class="card-text text-muted flex-grow-1">{{ guide.description }}</p>

                <!-- 指南内容预览 -->
                <div class="guide-preview mb-3">
                  <div
                    class="preview-item d-flex align-items-center mb-2"
                    v-for="item in guide.preview"
                    :key="item"
                  >
                    <i class="fas fa-check-circle text-success me-2"></i>
                    <small>{{ item }}</small>
                  </div>
                </div>

                <div class="guide-meta mb-3">
                  <div class="d-flex justify-content-between text-muted small">
                    <span><i class="fas fa-clock me-1"></i>{{ guide.readTime }}</span>
                    <span><i class="fas fa-signal me-1"></i>{{ guide.difficulty }}</span>
                  </div>
                </div>

                <div class="guide-actions mt-auto">
                  <button @click="viewGuide(guide)" class="btn btn-primary w-100 mb-2">
                    <i class="fas fa-book-open me-2"></i>Read Guide
                  </button>
                  <div class="d-flex gap-2">
                    <button
                      @click="downloadGuide(guide.id)"
                      class="btn btn-outline-secondary flex-fill"
                    >
                      <i class="fas fa-download me-1"></i>PDF
                    </button>
                    <button @click="shareGuide(guide)" class="btn btn-outline-info flex-fill">
                      <i class="fas fa-share-alt me-1"></i>Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 专业工具（仅医护人员） -->
    <section v-if="userRole === 'healthcare'" class="professional-tools py-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="fw-bold mb-4 text-center">
              <i class="fas fa-user-md me-2"></i>Professional Tools
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 mb-4">
            <div class="professional-tool-card card shadow-sm">
              <div class="card-header bg-info text-white">
                <h5 class="mb-0">
                  <i class="fas fa-clipboard-list me-2"></i>Patient Assessment Forms
                </h5>
              </div>
              <div class="card-body">
                <p class="card-text">Standardized assessment forms for elderly patients</p>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <i class="fas fa-file-alt text-primary me-2"></i>
                    Comprehensive Geriatric Assessment
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-file-alt text-primary me-2"></i>
                    Fall Risk Assessment
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-file-alt text-primary me-2"></i>
                    Cognitive Function Screening
                  </li>
                </ul>
                <button class="btn btn-info">
                  <i class="fas fa-download me-2"></i>Download Forms
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6 mb-4">
            <div class="professional-tool-card card shadow-sm">
              <div class="card-header bg-warning text-dark">
                <h5 class="mb-0"><i class="fas fa-users me-2"></i>Referral Network</h5>
              </div>
              <div class="card-body">
                <p class="card-text">Connect patients with appropriate services</p>
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <i class="fas fa-hospital text-warning me-2"></i>
                    Specialist Referrals
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-home text-warning me-2"></i>
                    Home Care Services
                  </li>
                  <li class="mb-2">
                    <i class="fas fa-heartbeat text-warning me-2"></i>
                    Mental Health Support
                  </li>
                </ul>
                <button class="btn btn-warning text-dark">
                  <i class="fas fa-search me-2"></i>Find Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 支持社区 -->
    <section class="support-community py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="fw-bold mb-4 text-center">Support Community</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="community-card card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-comments fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Discussion Forums</h5>
                <p class="card-text text-muted">
                  Connect with other caregivers, share experiences, and get advice
                </p>
                <div class="community-stats mb-3">
                  <div class="row text-center">
                    <div class="col-6">
                      <div class="fw-bold text-primary">1,250+</div>
                      <small class="text-muted">Members</small>
                    </div>
                    <div class="col-6">
                      <div class="fw-bold text-primary">2,400+</div>
                      <small class="text-muted">Discussions</small>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary">
                  <i class="fas fa-users me-2"></i>Join Community
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="community-card card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-video fa-3x text-success mb-3"></i>
                <h5 class="card-title">Virtual Support Groups</h5>
                <p class="card-text text-muted">
                  Join weekly video calls with fellow caregivers for emotional support
                </p>
                <div class="next-session mb-3">
                  <div class="fw-bold text-success">Next Session</div>
                  <small class="text-muted">Tomorrow at 7:00 PM EST</small>
                </div>
                <button class="btn btn-success">
                  <i class="fas fa-calendar-plus me-2"></i>Register
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="community-card card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-phone-alt fa-3x text-danger mb-3"></i>
                <h5 class="card-title">24/7 Helpline</h5>
                <p class="card-text text-muted">
                  Immediate support for urgent caregiver questions and crisis situations
                </p>
                <div class="helpline-number mb-3">
                  <div class="fw-bold text-danger fs-5">1-800-CAREGIVER</div>
                  <small class="text-muted">Always available</small>
                </div>
                <button class="btn btn-danger"><i class="fas fa-phone me-2"></i>Call Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 紧急资源 -->
    <section class="emergency-resources py-5">
      <div class="container">
        <div class="alert alert-danger shadow-sm">
          <div class="row align-items-center">
            <div class="col-md-8">
              <h4 class="alert-heading">
                <i class="fas fa-exclamation-triangle me-2"></i>Emergency Resources
              </h4>
              <p class="mb-2">
                For immediate medical emergencies, always call 911. For urgent caregiver support and
                non-emergency assistance, use these resources:
              </p>
              <ul class="mb-0">
                <li>Crisis Intervention: <strong>1-800-CRISIS-1</strong></li>
                <li>Caregiver Stress Helpline: <strong>1-800-CAREGIVER</strong></li>
                <li>Poison Control: <strong>1-800-222-1222</strong></li>
              </ul>
            </div>
            <div class="col-md-4 text-md-end">
              <button class="btn btn-light btn-lg">
                <i class="fas fa-phone me-2"></i>Emergency Contacts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 指南模态框 -->
    <div
      v-if="selectedGuide"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header" :class="selectedGuide.headerClass">
            <h5 class="modal-title text-white">{{ selectedGuide.title }}</h5>
            <button
              @click="closeGuideModal"
              type="button"
              class="btn-close btn-close-white"
            ></button>
          </div>
          <div class="modal-body">
            <div class="guide-content">
              <div class="guide-intro mb-4">
                <p class="lead">{{ selectedGuide.description }}</p>
                <div class="guide-details d-flex gap-4 mb-3">
                  <span class="badge bg-primary">{{ selectedGuide.category }}</span>
                  <span class="text-muted"
                    ><i class="fas fa-clock me-1"></i>{{ selectedGuide.readTime }}</span
                  >
                  <span class="text-muted"
                    ><i class="fas fa-signal me-1"></i>{{ selectedGuide.difficulty }}</span
                  >
                </div>
              </div>

              <div class="guide-sections">
                <div
                  v-for="section in selectedGuide.sections"
                  :key="section.title"
                  class="section mb-4"
                >
                  <h4 class="section-title">{{ section.title }}</h4>
                  <div class="section-content">
                    <p v-for="paragraph in section.content" :key="paragraph" class="mb-3">
                      {{ paragraph }}
                    </p>
                    <ul v-if="section.tips" class="tips-list">
                      <li v-for="tip in section.tips" :key="tip" class="mb-2">
                        <i class="fas fa-lightbulb text-warning me-2"></i>{{ tip }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="downloadGuide(selectedGuide.id)" class="btn btn-outline-primary">
              <i class="fas fa-download me-1"></i>Download PDF
            </button>
            <button @click="shareGuide(selectedGuide)" class="btn btn-outline-info">
              <i class="fas fa-share-alt me-1"></i>Share
            </button>
            <button @click="closeGuideModal" class="btn btn-secondary">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'CaregiverResources',
  setup() {
    const authStore = useAuthStore()
    const selectedGuide = ref(null)

    // 计算属性
    const userRole = computed(() => authStore.userRole)

    const roleAlertClass = computed(() => {
      const classes = {
        caregiver: 'alert-success',
        healthcare: 'alert-info',
      }
      return classes[userRole.value] || 'alert-primary'
    })

    const roleIcon = computed(() => {
      const icons = {
        caregiver: 'fas fa-user-friends text-success',
        healthcare: 'fas fa-user-md text-info',
      }
      return icons[userRole.value] || 'fas fa-users text-primary'
    })

    const roleWelcomeTitle = computed(() => {
      const titles = {
        caregiver: 'Welcome, Family Caregiver',
        healthcare: 'Welcome, Healthcare Professional',
      }
      return titles[userRole.value] || 'Welcome to Caregiver Resources'
    })

    const roleWelcomeMessage = computed(() => {
      const messages = {
        caregiver:
          'Access specialized tools and support designed for family members caring for elderly loved ones.',
        healthcare:
          'Access professional-grade tools, assessments, and referral resources for geriatric care.',
      }
      return messages[userRole.value] || 'Find the support and resources you need for caregiving.'
    })

    // 快速工具数据
    const quickAccessTools = ref([
      {
        id: 'medication-tracker',
        title: 'Medication Tracker',
        description: 'Track medications, schedules, and drug interactions',
        icon: 'fas fa-pills',
        color: '#dc3545',
        buttonIcon: 'fas fa-plus',
        buttonText: 'Start Tracking',
        requiresAuth: true,
      },
      {
        id: 'care-calendar',
        title: 'Care Calendar',
        description: 'Schedule appointments, treatments, and care activities',
        icon: 'fas fa-calendar-alt',
        color: '#0dcaf0',
        buttonIcon: 'fas fa-calendar-plus',
        buttonText: 'Open Calendar',
        requiresAuth: true,
      },
      {
        id: 'emergency-plan',
        title: 'Emergency Plan',
        description: 'Create and manage emergency contact and care plans',
        icon: 'fas fa-ambulance',
        color: '#fd7e14',
        buttonIcon: 'fas fa-edit',
        buttonText: 'Create Plan',
        requiresAuth: true,
      },
      {
        id: 'care-notes',
        title: 'Care Notes',
        description: 'Document daily care activities and observations',
        icon: 'fas fa-sticky-note',
        color: '#20c997',
        buttonIcon: 'fas fa-pen',
        buttonText: 'Add Note',
        requiresAuth: true,
      },
    ])

    // 照顾者指南数据
    const caregiverGuides = ref([
      {
        id: 'dementia-care',
        title: 'Dementia Care Guide',
        description:
          "Comprehensive strategies for caring for someone with dementia or Alzheimer's disease.",
        category: 'Medical Care',
        icon: 'fas fa-brain',
        headerClass: 'bg-danger',
        readTime: '15 min read',
        difficulty: 'Intermediate',
        preview: [
          'Understanding dementia progression',
          'Communication strategies',
          'Managing behavioral changes',
          'Creating safe environments',
        ],
        sections: [
          {
            title: 'Understanding Dementia',
            content: [
              'Dementia is not a specific disease but rather a term that describes a group of symptoms affecting memory, thinking, and social abilities severely enough to interfere with daily life.',
              "The most common type of dementia is Alzheimer's disease, accounting for 60-80% of cases. Other types include vascular dementia, Lewy body dementia, and frontotemporal dementia.",
            ],
          },
          {
            title: 'Communication Strategies',
            content: [
              'Use simple, clear sentences and speak slowly. Make eye contact and use calm, reassuring tones.',
              'Be patient and allow extra time for responses. Avoid arguing or trying to convince them of facts they may not remember.',
            ],
            tips: [
              'Use familiar names and avoid pronouns',
              'Ask one question at a time',
              'Use visual cues and gestures',
              'Listen to the feelings behind their words',
            ],
          },
        ],
      },
      {
        id: 'medication-management',
        title: 'Medication Management',
        description:
          'Safe practices for managing multiple medications and preventing drug interactions.',
        category: 'Health Management',
        icon: 'fas fa-prescription-bottle-alt',
        headerClass: 'bg-primary',
        readTime: '10 min read',
        difficulty: 'Beginner',
        preview: [
          'Organizing medication schedules',
          'Preventing drug interactions',
          'Working with pharmacists',
          'Emergency medication protocols',
        ],
        sections: [
          {
            title: 'Medication Organization',
            content: [
              'Keep an updated list of all medications, including prescriptions, over-the-counter drugs, vitamins, and supplements.',
              'Use pill organizers or automated dispensing systems to prevent missed doses and overdoses.',
            ],
          },
        ],
      },
      {
        id: 'caregiver-stress',
        title: 'Managing Caregiver Stress',
        description:
          'Techniques for preventing burnout and maintaining your own physical and mental health.',
        category: 'Self-Care',
        icon: 'fas fa-spa',
        headerClass: 'bg-success',
        readTime: '12 min read',
        difficulty: 'Beginner',
        preview: [
          'Recognizing burnout signs',
          'Building support networks',
          'Self-care strategies',
          'Finding respite care',
        ],
        sections: [
          {
            title: 'Recognizing Caregiver Burnout',
            content: [
              "Caregiver burnout is a state of physical, emotional, and mental exhaustion that can occur when caregivers don't get the help they need.",
              'Signs include feeling overwhelmed, constantly worried, tired all the time, and losing interest in activities you once enjoyed.',
            ],
          },
        ],
      },
      {
        id: 'fall-prevention',
        title: 'Fall Prevention Strategies',
        description:
          'Environmental modifications and exercises to reduce fall risk in elderly individuals.',
        category: 'Safety',
        icon: 'fas fa-shield-alt',
        headerClass: 'bg-warning',
        readTime: '8 min read',
        difficulty: 'Beginner',
        preview: [
          'Home safety assessments',
          'Bathroom modifications',
          'Lighting improvements',
          'Balance exercises',
        ],
        sections: [
          {
            title: 'Home Safety Assessment',
            content: [
              'Falls are the leading cause of injury-related death among adults age 65 and older. Most falls happen at home.',
              'Conduct a room-by-room assessment to identify and eliminate fall hazards such as loose rugs, clutter, and poor lighting.',
            ],
          },
        ],
      },
      {
        id: 'nutrition-seniors',
        title: 'Nutrition for Seniors',
        description:
          'Guidelines for maintaining proper nutrition and hydration in elderly individuals.',
        category: 'Nutrition',
        icon: 'fas fa-apple-alt',
        headerClass: 'bg-info',
        readTime: '10 min read',
        difficulty: 'Beginner',
        preview: [
          'Age-related nutritional needs',
          'Meal planning strategies',
          'Dealing with appetite loss',
          'Hydration importance',
        ],
        sections: [
          {
            title: 'Age-Related Nutritional Changes',
            content: [
              'As people age, their nutritional needs change due to decreased metabolism, changes in taste and smell, and medications.',
              'Focus on nutrient-dense foods that provide essential vitamins and minerals without excess calories.',
            ],
          },
        ],
      },
      {
        id: 'legal-planning',
        title: 'Legal and Financial Planning',
        description: 'Important legal documents and financial considerations for elderly care.',
        category: 'Planning',
        icon: 'fas fa-balance-scale',
        headerClass: 'bg-secondary',
        readTime: '20 min read',
        difficulty: 'Advanced',
        preview: [
          'Power of attorney documents',
          'Healthcare directives',
          'Financial planning',
          'Insurance considerations',
        ],
        sections: [
          {
            title: 'Essential Legal Documents',
            content: [
              "Having proper legal documents in place is crucial for ensuring your loved one's wishes are respected and you can make necessary decisions.",
              'Key documents include power of attorney for healthcare and finances, living will, and healthcare proxy.',
            ],
          },
        ],
      },
    ])

    // 方法
    const useTool = (toolId) => {
      if (!authStore.isAuthenticated) {
        alert('Please log in to access this tool.')
        return
      }

      // 这里可以实现具体的工具功能
      const toolActions = {
        'medication-tracker': () => alert('Medication Tracker feature would open here'),
        'care-calendar': () => alert('Care Calendar feature would open here'),
        'emergency-plan': () => alert('Emergency Plan creator would open here'),
        'care-notes': () => alert('Care Notes feature would open here'),
      }

      if (toolActions[toolId]) {
        toolActions[toolId]()
      }
    }

    const viewGuide = (guide) => {
      selectedGuide.value = guide
    }

    const closeGuideModal = () => {
      selectedGuide.value = null
    }

    const downloadGuide = (guideId) => {
      // 模拟PDF下载
      alert(`Downloading ${guideId} guide as PDF...`)
    }

    const shareGuide = (guide) => {
      if (navigator.share) {
        navigator
          .share({
            title: guide.title,
            text: guide.description,
            url: window.location.href,
          })
          .catch(console.error)
      } else {
        const url = `${window.location.origin}/caregiver-resources#${guide.id}`
        navigator.clipboard
          .writeText(url)
          .then(() => {
            alert('Guide link copied to clipboard!')
          })
          .catch(() => {
            alert('Could not copy link. Please share manually.')
          })
      }
    }

    return {
      authStore,
      selectedGuide,
      userRole,
      roleAlertClass,
      roleIcon,
      roleWelcomeTitle,
      roleWelcomeMessage,
      quickAccessTools,
      caregiverGuides,
      useTool,
      viewGuide,
      closeGuideModal,
      downloadGuide,
      shareGuide,
    }
  },
}
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, var(--bs-success) 0%, #28a745 100%);
}

.stats-card {
  backdrop-filter: blur(10px);
}

.tool-card,
.guide-card,
.community-card,
.professional-tool-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
}

.tool-card:hover,
.guide-card:hover,
.community-card:hover,
.professional-tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.tool-icon {
  margin-bottom: 1rem;
}

.guide-preview .preview-item {
  font-size: 0.875rem;
}

.community-stats {
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 0;
}

.next-session,
.helpline-number {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 0.75rem;
  background-color: #f8f9fa;
}

.modal.show {
  display: block;
}

.guide-sections .section {
  border-left: 4px solid var(--bs-primary);
  padding-left: 1rem;
  margin-left: 1rem;
}

.section-title {
  color: var(--bs-primary);
  margin-bottom: 1rem;
}

.tips-list {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header .display-5 {
    font-size: 2rem;
  }

  .stats-card {
    margin-top: 1rem;
  }

  .tool-card:hover,
  .guide-card:hover,
  .community-card:hover {
    transform: none;
  }

  .guide-sections .section {
    border-left: none;
    padding-left: 0;
    margin-left: 0;
  }
}

/* 无障碍设计 */
.btn:focus,
.card:focus-within {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .tool-card,
  .guide-card,
  .community-card,
  .professional-tool-card {
    border-width: 2px;
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .tool-card,
  .guide-card,
  .community-card,
  .professional-tool-card {
    transition: none;
  }

  .tool-card:hover,
  .guide-card:hover,
  .community-card:hover,
  .professional-tool-card:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .page-header {
    background: white !important;
    color: black !important;
  }

  .modal,
  .btn {
    display: none;
  }
}
</style>
