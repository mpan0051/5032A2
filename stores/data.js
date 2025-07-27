import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export const useDataStore = defineStore('data', () => {
  // 状态
  const healthResources = ref([])
  const supportServices = ref([])
  const events = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // 计算属性
  const upcomingEvents = computed(() => {
    const now = new Date()
    return events.value
      .filter((event) => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5)
  })

  const featuredResources = computed(() => {
    return healthResources.value.filter((resource) => resource.featured).slice(0, 6)
  })

  // 初始化健康资源数据
  const initializeHealthResources = () => {
    const defaultResources = [
      {
        id: uuidv4(),
        title: 'Hypertension Management Guide',
        description:
          'Learn how to manage high blood pressure through diet, exercise, and medication to maintain cardiovascular health.',
        category: 'medical',
        imageUrl: '/images/hypertension-guide.jpg',
        content:
          'High blood pressure is a common chronic condition among seniors. This comprehensive guide covers dietary modifications, exercise recommendations, medication adherence, and lifestyle changes that can help manage hypertension effectively...',
        featured: true,
        author: 'Dr. Sarah Johnson',
        publishDate: '2024-01-15',
        readTime: '5 minutes',
        tags: ['hypertension', 'cardiovascular', 'medication management'],
        difficulty: 'beginner',
      },
      {
        id: uuidv4(),
        title: 'Diabetes-Friendly Recipes',
        description:
          'Nutritionally balanced recipes suitable for diabetes patients to help control blood sugar levels.',
        category: 'nutrition',
        imageUrl: '/images/diabetes-recipes.jpg',
        content:
          'Dietary management is crucial for diabetes patients. This collection includes low-glycemic recipes, portion control guidelines, and meal planning strategies specifically designed for seniors with diabetes...',
        featured: true,
        author: 'Nutritionist Linda Wang',
        publishDate: '2024-01-20',
        readTime: '8 minutes',
        tags: ['diabetes', 'diet', 'blood sugar control'],
        difficulty: 'beginner',
      },
      {
        id: uuidv4(),
        title: 'Home Safety Checklist',
        description:
          'Comprehensive home safety assessment guide to prevent falls and accidental injuries.',
        category: 'safety',
        imageUrl: '/images/home-safety.jpg',
        content:
          'Home safety for seniors is key to preventing accidents. This checklist covers lighting improvements, bathroom safety, stair safety, emergency preparedness, and home modifications...',
        featured: true,
        author: 'Occupational Therapist Mike Chen',
        publishDate: '2024-01-25',
        readTime: '10 minutes',
        tags: ['home safety', 'fall prevention', 'environmental modification'],
        difficulty: 'intermediate',
      },
      {
        id: uuidv4(),
        title: 'Cognitive Training Games',
        description:
          'Keep your brain active and prevent cognitive decline through fun games and exercises.',
        category: 'mental',
        imageUrl: '/images/brain-training.jpg',
        content:
          'Regular cognitive training helps maintain brain health. This resource includes memory games, problem-solving exercises, and brain training activities suitable for different cognitive levels...',
        featured: false,
        author: 'Neuropsychologist Dr. Emily Zhang',
        publishDate: '2024-02-01',
        readTime: '12 minutes',
        tags: ['cognitive training', 'brain health', 'memory'],
        difficulty: 'intermediate',
      },
      {
        id: uuidv4(),
        title: 'Exercise Plan for Seniors',
        description: 'Low-impact exercise programs to improve strength, balance, and flexibility.',
        category: 'fitness',
        imageUrl: '/images/senior-exercise.jpg',
        content:
          'Moderate exercise is important for senior health. This plan includes gentle stretching, balance exercises, strength training, and cardiovascular activities tailored for older adults...',
        featured: true,
        author: 'Physical Therapist Jessica Liu',
        publishDate: '2024-02-05',
        readTime: '15 minutes',
        tags: ['exercise', 'balance training', 'strength training'],
        difficulty: 'beginner',
      },
    ]

    healthResources.value = defaultResources
    localStorage.setItem('app-health-resources', JSON.stringify(defaultResources))
  }

  // 初始化支持服务数据
  const initializeSupportServices = () => {
    const defaultServices = [
      {
        id: uuidv4(),
        name: 'Meal Delivery Service',
        description:
          'Nutritionally balanced meal delivery service for seniors with limited mobility',
        category: 'daily-living',
        provider: 'Community Care Center',
        contact: '(555) 123-4567',
        availability: 'Monday to Friday 8:00 AM - 6:00 PM',
        cost: '$12-15 per meal',
        eligibility: '65+ years old, limited mobility or unable to prepare meals independently',
        coverageArea: 'Metropolitan area',
        featured: true,
      },
      {
        id: uuidv4(),
        name: 'Transportation Service',
        description: 'Transportation service for seniors to medical appointments and shopping',
        category: 'transportation',
        provider: 'Senior Transportation Association',
        contact: '(555) 234-5678',
        availability: 'Monday to Saturday 9:00 AM - 5:00 PM',
        cost: 'Distance-based pricing, starting at $5',
        eligibility: '65+ years old, unable to drive or use public transportation',
        coverageArea: 'City metropolitan area',
        featured: true,
      },
      {
        id: uuidv4(),
        name: 'Home Care Service',
        description: 'Professional nurses provide in-home medical care and health monitoring',
        category: 'healthcare',
        provider: 'Professional Home Care Team',
        contact: '(555) 345-6789',
        availability: '24-hour service available',
        cost: '$45-65 per hour',
        eligibility: 'Seniors requiring medical care assistance',
        coverageArea: 'City-wide coverage',
        featured: true,
      },
      {
        id: uuidv4(),
        name: 'Counseling Service',
        description: 'Professional counselors provide emotional support and mental health services',
        category: 'mental-health',
        provider: 'Senior Mental Health Center',
        contact: '(555) 456-7890',
        availability: 'Monday to Friday 9:00 AM - 5:00 PM',
        cost: '$80-120 per session',
        eligibility: 'All seniors welcome',
        coverageArea: 'City-wide service',
        featured: false,
      },
    ]

    supportServices.value = defaultServices
    localStorage.setItem('app-support-services', JSON.stringify(defaultServices))
  }

  // 初始化活动数据
  const initializeEvents = () => {
    const defaultEvents = [
      {
        id: uuidv4(),
        title: 'Health Seminar: Fall & Winter Wellness',
        description:
          'Join medical experts as they share essential fall and winter wellness tips and health precautions for seniors',
        date: '2024-11-15',
        time: '2:00 PM - 4:00 PM',
        location: 'Community Activity Center',
        address: '123 Main Street',
        category: 'education',
        organizer: 'Community Health Committee',
        capacity: 50,
        registered: 23,
        cost: 'Free',
        requirements: 'No special requirements',
        contact: '(555) 111-2222',
      },
      {
        id: uuidv4(),
        title: 'Tai Chi Morning Practice',
        description:
          'Professional instructor-led Tai Chi session suitable for all skill levels and abilities',
        date: '2024-11-20',
        time: '8:00 AM - 9:00 AM',
        location: 'City Park',
        address: '456 Park Avenue',
        category: 'fitness',
        organizer: 'Tai Chi Association',
        capacity: 30,
        registered: 15,
        cost: 'Free',
        requirements: 'Wear comfortable exercise clothing',
        contact: '(555) 222-3333',
      },
      {
        id: uuidv4(),
        title: 'Digital Skills Workshop',
        description:
          'Learn how to use smartphones and computers for video calls, online shopping, and staying connected',
        date: '2024-11-25',
        time: '10:00 AM - 12:00 PM',
        location: 'Library Computer Room',
        address: '789 Library Lane',
        category: 'technology',
        organizer: 'Digital Inclusion Project',
        capacity: 15,
        registered: 8,
        cost: 'Free',
        requirements: 'Feel free to bring your own device',
        contact: '(555) 333-4444',
      },
    ]

    events.value = defaultEvents
    localStorage.setItem('app-events', JSON.stringify(defaultEvents))
  }

  // 从localStorage加载数据
  const loadDataFromStorage = () => {
    const storedResources = localStorage.getItem('app-health-resources')
    const storedServices = localStorage.getItem('app-support-services')
    const storedEvents = localStorage.getItem('app-events')

    if (storedResources) {
      healthResources.value = JSON.parse(storedResources)
    } else {
      initializeHealthResources()
    }

    if (storedServices) {
      supportServices.value = JSON.parse(storedServices)
    } else {
      initializeSupportServices()
    }

    if (storedEvents) {
      events.value = JSON.parse(storedEvents)
    } else {
      initializeEvents()
    }
  }

  // 获取资源分类
  const getResourcesByCategory = (category) => {
    return healthResources.value.filter((resource) => resource.category === category)
  }

  // 搜索资源
  const searchResources = (query) => {
    const lowerQuery = query.toLowerCase()
    return healthResources.value.filter(
      (resource) =>
        resource.title.toLowerCase().includes(lowerQuery) ||
        resource.description.toLowerCase().includes(lowerQuery) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }

  // 获取服务分类
  const getServicesByCategory = (category) => {
    return supportServices.value.filter((service) => service.category === category)
  }

  // 搜索服务
  const searchServices = (query) => {
    const lowerQuery = query.toLowerCase()
    return supportServices.value.filter(
      (service) =>
        service.name.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery),
    )
  }

  // 注册活动
  const registerForEvent = (eventId) => {
    const event = events.value.find((e) => e.id === eventId)
    if (event && event.registered < event.capacity) {
      event.registered++
      localStorage.setItem('app-events', JSON.stringify(events.value))
      return { success: true, message: 'Registration successful!' }
    }
    return { success: false, message: 'Event is full or does not exist' }
  }

  // 初始化数据
  loadDataFromStorage()

  return {
    // 状态
    healthResources,
    supportServices,
    events,
    isLoading,
    error,

    // 计算属性
    upcomingEvents,
    featuredResources,

    // 方法
    getResourcesByCategory,
    searchResources,
    getServicesByCategory,
    searchServices,
    registerForEvent,
    loadDataFromStorage,
  }
})
