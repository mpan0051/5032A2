<template>
  <div class="get-involved-page">
    <!-- 页面标题区域 -->
    <section class="page-header bg-warning text-dark py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-5 fw-bold mb-3">
              <i class="fas fa-hands-helping me-3"></i>Get Involved
            </h1>
            <p class="lead mb-0">
              Join our mission to support seniors in our community. Whether you want to volunteer,
              attend events, or make a donation, there are many ways to make a difference.
            </p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <div class="stats-card bg-white bg-opacity-20 p-3 rounded-3">
              <div class="text-center">
                <div class="h2 fw-bold text-primary mb-1">{{ upcomingEvents.length }}</div>
                <div class="small">Upcoming Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 参与方式选项 -->
    <section class="involvement-options py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="fw-bold">Ways to Get Involved</h2>
          <p class="text-muted">Choose how you'd like to contribute to our community</p>
        </div>

        <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="option-card card h-100 shadow-sm text-center">
              <div class="card-body p-4">
                <div class="option-icon mb-3">
                  <i class="fas fa-volunteer-simple fa-4x text-primary"></i>
                </div>
                <h5 class="card-title fw-bold">Volunteer</h5>
                <p class="card-text text-muted mb-4">
                  Share your time and skills to directly help seniors in your community. From
                  companionship to specialized services, every contribution matters.
                </p>
                <button @click="activeTab = 'volunteer'" class="btn btn-primary">
                  <i class="fas fa-hand-heart me-2"></i>Learn More
                </button>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mb-4">
            <div class="option-card card h-100 shadow-sm text-center">
              <div class="card-body p-4">
                <div class="option-icon mb-3">
                  <i class="fas fa-calendar-alt fa-4x text-success"></i>
                </div>
                <h5 class="card-title fw-bold">Attend Events</h5>
                <p class="card-text text-muted mb-4">
                  Join our community events, workshops, and wellness programs. Connect with others
                  and learn from health and wellness experts.
                </p>
                <button @click="activeTab = 'events'" class="btn btn-success">
                  <i class="fas fa-calendar-check me-2"></i>View Events
                </button>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mb-4">
            <div class="option-card card h-100 shadow-sm text-center">
              <div class="card-body p-4">
                <div class="option-icon mb-3">
                  <i class="fas fa-heart fa-4x text-danger"></i>
                </div>
                <h5 class="card-title fw-bold">Make a Donation</h5>
                <p class="card-text text-muted mb-4">
                  Support our mission financially. Your donations help us expand our services and
                  reach more seniors in need of support.
                </p>
                <button @click="activeTab = 'donate'" class="btn btn-danger">
                  <i class="fas fa-donate me-2"></i>Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 详细内容标签页 -->
    <section class="involvement-details py-5 bg-light">
      <div class="container">
        <!-- 志愿服务标签页 -->
        <div v-show="activeTab === 'volunteer'" class="volunteer-section">
          <div class="text-center mb-5">
            <h2 class="fw-bold">Volunteer Opportunities</h2>
            <p class="text-muted">Make a direct impact in the lives of seniors</p>
          </div>

          <div class="row">
            <div class="col-lg-6 mb-4">
              <div class="volunteer-card card shadow-sm">
                <div class="card-header bg-primary text-white">
                  <h5 class="mb-0">
                    <i class="fas fa-user-friends me-2"></i>Companionship Volunteer
                  </h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    Provide friendly visits and social interaction to seniors who may be isolated.
                    Activities include conversation, light activities, and emotional support.
                  </p>
                  <ul class="list-unstyled">
                    <li>
                      <i class="fas fa-clock text-primary me-2"></i><strong>Time:</strong> 2-4 hours
                      per week
                    </li>
                    <li>
                      <i class="fas fa-map-marker-alt text-primary me-2"></i
                      ><strong>Location:</strong> Homes or community centers
                    </li>
                    <li>
                      <i class="fas fa-users text-primary me-2"></i
                      ><strong>Training:</strong> Provided
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mb-4">
              <div class="volunteer-card card shadow-sm">
                <div class="card-header bg-success text-white">
                  <h5 class="mb-0"><i class="fas fa-car me-2"></i>Transportation Volunteer</h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    Help seniors get to medical appointments, grocery shopping, and other essential
                    errands when they can't drive themselves.
                  </p>
                  <ul class="list-unstyled">
                    <li>
                      <i class="fas fa-clock text-success me-2"></i><strong>Time:</strong> Flexible
                      schedule
                    </li>
                    <li>
                      <i class="fas fa-car text-success me-2"></i
                      ><strong>Requirements:</strong> Valid license & insurance
                    </li>
                    <li>
                      <i class="fas fa-dollar-sign text-success me-2"></i
                      ><strong>Reimbursement:</strong> Mileage provided
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mb-4">
              <div class="volunteer-card card shadow-sm">
                <div class="card-header bg-info text-white">
                  <h5 class="mb-0"><i class="fas fa-laptop me-2"></i>Tech Support Volunteer</h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    Help seniors learn to use technology for staying connected with family,
                    accessing health resources, and enjoying digital entertainment.
                  </p>
                  <ul class="list-unstyled">
                    <li>
                      <i class="fas fa-clock text-info me-2"></i><strong>Time:</strong> 1-2 hours
                      per session
                    </li>
                    <li>
                      <i class="fas fa-laptop text-info me-2"></i><strong>Skills:</strong> Basic
                      tech knowledge
                    </li>
                    <li>
                      <i class="fas fa-heart text-info me-2"></i><strong>Patience:</strong> Most
                      important requirement!
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-lg-6 mb-4">
              <div class="volunteer-card card shadow-sm">
                <div class="card-header bg-warning text-dark">
                  <h5 class="mb-0"><i class="fas fa-utensils me-2"></i>Meal Program Volunteer</h5>
                </div>
                <div class="card-body">
                  <p class="card-text">
                    Assist with meal preparation, packaging, and delivery to seniors in need. Help
                    ensure proper nutrition for vulnerable community members.
                  </p>
                  <ul class="list-unstyled">
                    <li>
                      <i class="fas fa-clock text-warning me-2"></i><strong>Time:</strong> 3-4 hours
                      per session
                    </li>
                    <li>
                      <i class="fas fa-calendar text-warning me-2"></i
                      ><strong>Schedule:</strong> Weekly or bi-weekly
                    </li>
                    <li>
                      <i class="fas fa-shield-alt text-warning me-2"></i
                      ><strong>Training:</strong> Food safety included
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- 志愿者申请表单 -->
          <div class="volunteer-application mt-5">
            <div class="card shadow">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0"><i class="fas fa-hand-paper me-2"></i>Volunteer Application</h5>
              </div>
              <div class="card-body">
                <form @submit.prevent="submitVolunteerApplication">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="volName" class="form-label">Full Name *</label>
                      <input
                        id="volName"
                        v-model="volunteerForm.name"
                        type="text"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="volEmail" class="form-label">Email Address *</label>
                      <input
                        id="volEmail"
                        v-model="volunteerForm.email"
                        type="email"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="volPhone" class="form-label">Phone Number *</label>
                      <input
                        id="volPhone"
                        v-model="volunteerForm.phone"
                        type="tel"
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="volInterest" class="form-label">Area of Interest *</label>
                      <select
                        id="volInterest"
                        v-model="volunteerForm.interest"
                        class="form-select"
                        required
                      >
                        <option value="">Select an area</option>
                        <option value="companionship">Companionship</option>
                        <option value="transportation">Transportation</option>
                        <option value="tech-support">Tech Support</option>
                        <option value="meal-program">Meal Program</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div class="col-12 mb-3">
                      <label for="volAvailability" class="form-label">Availability</label>
                      <textarea
                        id="volAvailability"
                        v-model="volunteerForm.availability"
                        class="form-control"
                        rows="3"
                        placeholder="Please describe your availability (days, times, frequency)"
                      ></textarea>
                    </div>
                    <div class="col-12 mb-3">
                      <label for="volExperience" class="form-label">Relevant Experience</label>
                      <textarea
                        id="volExperience"
                        v-model="volunteerForm.experience"
                        class="form-control"
                        rows="3"
                        placeholder="Tell us about any relevant experience or skills"
                      ></textarea>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    <i class="fas fa-paper-plane me-2"></i>Submit Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- 活动标签页 -->
        <div v-show="activeTab === 'events'" class="events-section">
          <div class="text-center mb-5">
            <h2 class="fw-bold">Upcoming Events</h2>
            <p class="text-muted">Join us for community activities and learning opportunities</p>
          </div>

          <div v-if="upcomingEvents.length > 0" class="row">
            <div v-for="event in upcomingEvents" :key="event.id" class="col-lg-6 mb-4">
              <div class="event-card card shadow-sm">
                <div class="card-header d-flex align-items-center">
                  <div class="event-icon me-3">
                    <i :class="getEventIcon(event.category)" class="fa-2x text-primary"></i>
                  </div>
                  <div class="event-header-info flex-grow-1">
                    <h5 class="card-title mb-1">{{ event.title }}</h5>
                    <div class="event-meta">
                      <span class="badge bg-primary">{{ getCategoryLabel(event.category) }}</span>
                      <span class="badge bg-success ms-1">{{ event.cost }}</span>
                    </div>
                  </div>
                </div>

                <div class="card-body">
                  <p class="card-text text-muted mb-3">{{ event.description }}</p>

                  <div class="event-details">
                    <div class="detail-item mb-2">
                      <i class="fas fa-calendar text-primary me-2"></i>
                      <strong>{{ formatDate(event.date) }}</strong> at {{ event.time }}
                    </div>
                    <div class="detail-item mb-2">
                      <i class="fas fa-map-marker-alt text-primary me-2"></i>
                      {{ event.location }}, {{ event.address }}
                    </div>
                    <div class="detail-item mb-2">
                      <i class="fas fa-user text-primary me-2"></i>
                      Organized by {{ event.organizer }}
                    </div>
                    <div class="detail-item mb-3">
                      <i class="fas fa-users text-primary me-2"></i>
                      {{ event.registered }}/{{ event.capacity }} registered
                    </div>
                  </div>

                  <div class="progress mb-3">
                    <div
                      class="progress-bar bg-success"
                      :style="{ width: (event.registered / event.capacity) * 100 + '%' }"
                    ></div>
                  </div>
                </div>

                <div class="card-footer bg-transparent">
                  <button
                    @click="registerForEvent(event.id)"
                    class="btn btn-success w-100"
                    :disabled="event.registered >= event.capacity || !authStore.isAuthenticated"
                  >
                    <i class="fas fa-calendar-plus me-2"></i>
                    {{ event.registered >= event.capacity ? 'Event Full' : 'Register Now' }}
                  </button>

                  <div v-if="!authStore.isAuthenticated" class="text-center mt-2">
                    <small class="text-muted">
                      <RouterLink to="/login">Login</RouterLink> required to register
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-events text-center py-5">
            <i class="fas fa-calendar-alt fa-4x text-muted mb-3"></i>
            <h4 class="text-muted">No Upcoming Events</h4>
            <p class="text-muted">Check back soon for new community activities!</p>
          </div>
        </div>

        <!-- 捐赠标签页 -->
        <div v-show="activeTab === 'donate'" class="donate-section">
          <div class="text-center mb-5">
            <h2 class="fw-bold">Support Our Mission</h2>
            <p class="text-muted">Your donation helps us expand services and reach more seniors</p>
          </div>

          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="donation-card card shadow">
                <div class="card-header bg-danger text-white text-center">
                  <h5 class="mb-0"><i class="fas fa-heart me-2"></i>Make a Donation</h5>
                </div>
                <div class="card-body p-4">
                  <!-- 捐赠影响说明 -->
                  <div class="donation-impact mb-4">
                    <h6 class="fw-bold mb-3">Your Impact</h6>
                    <div class="row text-center">
                      <div class="col-md-4 mb-3">
                        <div class="impact-item">
                          <div class="impact-amount h4 text-primary">$25</div>
                          <small class="text-muted">Provides health resources for 5 seniors</small>
                        </div>
                      </div>
                      <div class="col-md-4 mb-3">
                        <div class="impact-item">
                          <div class="impact-amount h4 text-success">$50</div>
                          <small class="text-muted">Funds one wellness workshop</small>
                        </div>
                      </div>
                      <div class="col-md-4 mb-3">
                        <div class="impact-item">
                          <div class="impact-amount h4 text-warning">$100</div>
                          <small class="text-muted">Supports meal delivery for a month</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 捐赠表单 -->
                  <form @submit.prevent="submitDonation">
                    <div class="mb-3">
                      <label class="form-label fw-bold">Donation Amount</label>
                      <div class="donation-amounts mb-3">
                        <div class="btn-group w-100" role="group">
                          <input
                            id="amount25"
                            v-model="donationForm.amount"
                            type="radio"
                            value="25"
                            class="btn-check"
                          />
                          <label for="amount25" class="btn btn-outline-primary">$25</label>

                          <input
                            id="amount50"
                            v-model="donationForm.amount"
                            type="radio"
                            value="50"
                            class="btn-check"
                          />
                          <label for="amount50" class="btn btn-outline-primary">$50</label>

                          <input
                            id="amount100"
                            v-model="donationForm.amount"
                            type="radio"
                            value="100"
                            class="btn-check"
                          />
                          <label for="amount100" class="btn btn-outline-primary">$100</label>

                          <input
                            id="amountOther"
                            v-model="donationForm.amount"
                            type="radio"
                            value="other"
                            class="btn-check"
                          />
                          <label for="amountOther" class="btn btn-outline-primary">Other</label>
                        </div>
                      </div>

                      <div v-if="donationForm.amount === 'other'" class="custom-amount">
                        <input
                          v-model="donationForm.customAmount"
                          type="number"
                          class="form-control"
                          placeholder="Enter amount"
                          min="1"
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="donorName" class="form-label">Full Name *</label>
                        <input
                          id="donorName"
                          v-model="donationForm.name"
                          type="text"
                          class="form-control"
                          required
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <label for="donorEmail" class="form-label">Email Address *</label>
                        <input
                          id="donorEmail"
                          v-model="donationForm.email"
                          type="email"
                          class="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="donationType" class="form-label">Donation Type</label>
                      <select id="donationType" v-model="donationForm.type" class="form-select">
                        <option value="one-time">One-time donation</option>
                        <option value="monthly">Monthly recurring</option>
                        <option value="yearly">Yearly recurring</option>
                      </select>
                    </div>

                    <div class="form-check mb-3">
                      <input
                        id="anonymous"
                        v-model="donationForm.anonymous"
                        type="checkbox"
                        class="form-check-input"
                      />
                      <label for="anonymous" class="form-check-label">
                        Make this donation anonymous
                      </label>
                    </div>

                    <button type="submit" class="btn btn-danger btn-lg w-100">
                      <i class="fas fa-heart me-2"></i>
                      Donate ${{
                        donationForm.amount === 'other'
                          ? donationForm.customAmount
                          : donationForm.amount
                      }}
                    </button>
                  </form>

                  <div class="donation-note mt-3 p-3 bg-light rounded">
                    <small class="text-muted">
                      <i class="fas fa-shield-alt me-1"></i>
                      Your donation is secure and tax-deductible. You will receive a receipt via
                      email.
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useDataStore } from '@/stores/data'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'GetInvolved',
  setup() {
    const dataStore = useDataStore()
    const authStore = useAuthStore()

    // 响应式数据
    const activeTab = ref('volunteer')

    const volunteerForm = reactive({
      name: '',
      email: '',
      phone: '',
      interest: '',
      availability: '',
      experience: '',
    })

    const donationForm = reactive({
      amount: '25',
      customAmount: '',
      name: '',
      email: '',
      type: 'one-time',
      anonymous: false,
    })

    // 计算属性
    const upcomingEvents = computed(() => dataStore.upcomingEvents)

    // 方法
    const getCategoryLabel = (category) => {
      const labels = {
        education: 'Education',
        fitness: 'Fitness',
        technology: 'Technology',
        social: 'Social',
        health: 'Health',
      }
      return labels[category] || category
    }

    const getEventIcon = (category) => {
      const icons = {
        education: 'fas fa-graduation-cap',
        fitness: 'fas fa-dumbbell',
        technology: 'fas fa-laptop',
        social: 'fas fa-users',
        health: 'fas fa-heartbeat',
      }
      return icons[category] || 'fas fa-calendar'
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const submitVolunteerApplication = () => {
      // 在实际应用中，这里会提交到后端服务器
      console.log('Volunteer application submitted:', volunteerForm)
      alert('Thank you for your interest in volunteering! We will contact you soon.')

      // 重置表单
      Object.keys(volunteerForm).forEach((key) => {
        volunteerForm[key] = ''
      })
    }

    const submitDonation = () => {
      // 在实际应用中，这里会集成支付处理系统
      const amount =
        donationForm.amount === 'other' ? donationForm.customAmount : donationForm.amount
      console.log('Donation submitted:', { ...donationForm, finalAmount: amount })
      alert(
        `Thank you for your generous donation of $${amount}! Redirecting to payment processor...`,
      )
    }

    const registerForEvent = (eventId) => {
      if (!authStore.isAuthenticated) {
        alert('Please log in to register for events')
        return
      }

      const result = dataStore.registerForEvent(eventId)
      if (result.success) {
        alert(result.message)
      } else {
        alert(result.message)
      }
    }

    return {
      authStore,
      activeTab,
      volunteerForm,
      donationForm,
      upcomingEvents,
      getCategoryLabel,
      getEventIcon,
      formatDate,
      submitVolunteerApplication,
      submitDonation,
      registerForEvent,
    }
  },
}
</script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, var(--bs-warning) 0%, #ffb347 100%);
}

.stats-card {
  backdrop-filter: blur(10px);
}

.option-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
}

.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.volunteer-card,
.event-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 1px solid #e9ecef;
}

.volunteer-card:hover,
.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.donation-card {
  border: 2px solid var(--bs-danger);
}

.donation-amounts .btn-check:checked + .btn {
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
  color: white;
}

.impact-item {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f8f9fa;
}

.impact-amount {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.event-details .detail-item {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.progress {
  height: 8px;
}

.custom-amount {
  margin-top: 1rem;
}

.donation-note {
  border-left: 4px solid var(--bs-danger);
}

.empty-events {
  opacity: 0.7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header .display-5 {
    font-size: 2rem;
  }

  .option-card .btn {
    width: 100%;
  }

  .donation-amounts .btn-group {
    flex-direction: column;
  }

  .donation-amounts .btn {
    margin-bottom: 0.5rem;
  }

  .impact-item {
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .volunteer-application .row,
  .donation-card .row {
    margin: 0;
  }

  .volunteer-application .col-md-6,
  .donation-card .col-md-6 {
    padding: 0;
    margin-bottom: 1rem;
  }
}

/* 无障碍设计 */
.btn:focus,
.form-control:focus,
.form-select:focus {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

.option-card:focus-within,
.volunteer-card:focus-within,
.event-card:focus-within {
  outline: 2px solid var(--bs-warning);
  outline-offset: 2px;
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
  .option-card,
  .volunteer-card,
  .event-card,
  .donation-card {
    border-width: 2px;
  }

  .impact-item {
    border: 1px solid #000;
  }
}

/* 减少动画（如果用户偏好） */
@media (prefers-reduced-motion: reduce) {
  .option-card,
  .volunteer-card,
  .event-card {
    transition: none;
  }

  .option-card:hover,
  .volunteer-card:hover,
  .event-card:hover {
    transform: none;
  }
}

/* 打印样式 */
@media print {
  .page-header {
    background: white !important;
    color: black !important;
  }

  .btn,
  .donation-card,
  .volunteer-application {
    display: none;
  }

  .option-card,
  .volunteer-card,
  .event-card {
    break-inside: avoid;
    margin-bottom: 1rem;
  }
}
</style>
