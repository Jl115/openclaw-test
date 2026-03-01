<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1 class="auth-title">Welcome Back</h1>
      <p class="auth-subtitle">Sign in to read her story</p>
      
      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="your@email.com"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>
        
        <div v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </div>
        
        <button type="submit" class="auth-button" :disabled="authStore.loading">
          {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      
      <p class="auth-link">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    router.push('/bio')
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
}

.auth-title {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.auth-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #555;
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  font-size: 0.9rem;
}

.auth-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.auth-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.auth-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>
