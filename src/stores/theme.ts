import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(true) // Por defecto oscuro

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme()
    saveTheme()
  }

  const applyTheme = () => {
    const html = document.documentElement
    if (isDarkMode.value) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
  }

  const saveTheme = () => {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }

  const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    isDarkMode.value = savedTheme === 'dark'
    applyTheme()
  }

  return {
    isDarkMode,
    toggleTheme,
    loadTheme,
  }
})
