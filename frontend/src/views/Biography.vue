<template>
  <div class="bio-container">
    <!-- Skeleton Screen for Unauthenticated Users -->
    <div v-if="!authStore.isAuthenticated" class="skeleton-screen">
      <div class="skeleton-header">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-title"></div>
      </div>
      
      <div class="skeleton-content">
        <div class="skeleton-line long"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line medium"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
      
      <div class="skeleton-section">
        <div class="skeleton-line long"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line medium"></div>
      </div>
      
      <div class="skeleton-footer">
        <div class="skeleton-line short"></div>
      </div>
      
      <div class="auth-prompt">
        <p>🔒 This content is protected</p>
        <router-link to="/login" class="auth-link-button">Sign In to Read</router-link>
      </div>
    </div>
    
    <!-- Full Content for Authenticated Users -->
    <div v-else class="bio-content">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading biography...</p>
      </div>
      
      <div v-else-if="biography" class="biography">
        <header class="bio-header">
          <div class="bio-avatar">
            <span class="avatar-icon">👩</span>
          </div>
          <h1 class="bio-title">{{ biography.title }}</h1>
        </header>
        
        <article class="bio-text">
          <p v-for="(paragraph, index) in formattedContent" :key="index" class="bio-paragraph">
            {{ paragraph }}
          </p>
        </article>
        
        <footer class="bio-footer">
          <p class="bio-meta">
            Last updated: {{ formatDate(biography.updatedAt) }}
          </p>
        </footer>
      </div>
      
      <div v-else class="error">
        <p>Failed to load biography. Please try again later.</p>
        <button @click="fetchBiography" class="retry-button">Retry</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

const authStore = useAuthStore()
const biography = ref(null)
const loading = ref(false)

const formattedContent = computed(() => {
  if (!biography.value?.content) return []
  return biography.value.content.split('\n\n')
})

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchBiography = async () => {
  if (!authStore.isAuthenticated) return
  
  loading.value = true
  
  try {
    const response = await axios.get(`${API_URL}/bio`)
    biography.value = response.data.biography
  } catch (err) {
    console.error('Failed to fetch biography:', err)
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
.bio-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

/* Skeleton Screen Styles */
.skeleton-screen {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.skeleton-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-title {
  width: 200px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  margin-bottom: 2rem;
}

.skeleton-section {
  margin-bottom: 2rem;
}

.skeleton-line {
  height: 16px;
  border-radius: 8px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 1rem;
}

.skeleton-line.long {
  width: 95%;
}

.skeleton-line.medium {
  width: 70%;
}

.skeleton-line.short {
  width: 40%;
}

.skeleton-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.auth-prompt {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 2px dashed #ddd;
}

.auth-prompt p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
}

.auth-link-button {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  transition: transform 0.2s, box-shadow 0.2s;
}

.auth-link-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

/* Authenticated Content Styles */
.bio-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.loading {
  text-align: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.bio-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.bio-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.bio-title {
  font-size: 2.5rem;
  color: #333;
  font-weight: 700;
}

.bio-text {
  line-height: 1.8;
  color: #444;
}

.bio-paragraph {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  text-align: justify;
}

.bio-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.bio-meta {
  color: #999;
  font-size: 0.9rem;
  text-align: center;
}

.error {
  text-align: center;
  padding: 3rem;
}

.error p {
  color: #e74c3c;
  margin-bottom: 1rem;
}

.retry-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.retry-button:hover {
  background: #5568d3;
}
</style>
