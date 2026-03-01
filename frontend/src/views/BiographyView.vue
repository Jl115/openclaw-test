<template>
  <div class="biography-container">
    <!-- SKELETON SCREEN (unauthenticated) -->
    <div v-if="!authStore.isAuthenticated" class="skeleton-wrapper">
      <div class="skeleton-header">
        <div class="skeleton-title"></div>
        <div class="skeleton-subtitle"></div>
      </div>
      <div class="skeleton-content">
        <div v-for="n in 6" :key="n" class="skeleton-line" :style="{ width: getRandomWidth(n) }"></div>
      </div>
      <div class="skeleton-cta">
        <div class="lock-icon">🔒</div>
        <p>Sign in to read the full story</p>
        <router-link to="/login" class="login-cta">Sign In</router-link>
      </div>
    </div>

    <!-- FULL CONTENT (authenticated) -->
    <div v-else-if="biography" class="biography-content">
      <header class="bio-header">
        <h1>{{ biography.title }}</h1>
        <div class="meta">
          <span class="date">Last updated: {{ formatDate(biography.updated_at) }}</span>
        </div>
      </header>
      <article class="bio-text">
        <p v-for="(paragraph, index) in formattedContent" :key="index">
          {{ paragraph }}
        </p>
      </article>
    </div>

    <!-- LOADING STATE -->
    <div v-else-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading her story...</p>
    </div>

    <!-- ERROR STATE -->
    <div v-else class="error">
      <p>Unable to load biography</p>
      <button @click="fetchBiography" class="retry-btn">Try Again</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import api from '../api/client'

const authStore = useAuthStore()
const biography = ref(null)
const loading = ref(false)
const error = ref(null)

const formattedContent = computed(() => {
  if (!biography.value?.content) return []
  return biography.value.content.split('\n\n').filter(p => p.trim())
})

const getRandomWidth = (index) => {
  const widths = ['100%', '95%', '98%', '90%', '100%', '85%']
  return widths[index - 1] || '100%'
}

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchBiography = async () => {
  if (!authStore.isAuthenticated) return
  
  loading.value = true
  error.value = null
  
  try {
    const response = await api.get('/biography')
    biography.value = response.data
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed to load biography'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (authStore.isAuthenticated) {
    fetchBiography()
  }
})
</script>

<style scoped>
.biography-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

/* Skeleton Screen */
.skeleton-wrapper {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.skeleton-header {
  margin-bottom: 2rem;
}

.skeleton-title {
  height: 3rem;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
  animation: shimmer 1.5s infinite;
}

.skeleton-subtitle {
  height: 1.5rem;
  width: 60%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  margin-bottom: 3rem;
}

.skeleton-line {
  height: 1.2rem;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  margin-bottom: 1rem;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton-cta {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  border: 2px dashed rgba(255, 255, 255, 0.3);
}

.lock-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.skeleton-cta p {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.login-cta {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: transform 0.2s;
}

.login-cta:hover {
  transform: translateY(-2px);
}

/* Full Content */
.biography-content {
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.bio-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}

.bio-header h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.meta {
  color: #666;
  font-size: 0.9rem;
}

.bio-text {
  line-height: 1.8;
  color: #444;
  font-size: 1.1rem;
}

.bio-text p {
  margin-bottom: 1.5rem;
}

/* Loading & Error */
.loading, .error {
  text-align: center;
  padding: 4rem;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  background: white;
  color: #764ba2;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
}
</style>
