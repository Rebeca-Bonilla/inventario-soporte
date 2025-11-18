import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref<boolean>(false)

  // Inicializar tema desde localStorage o preferencia del sistema
  const initializeTheme = () => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      isDark.value = saved === 'dark'
    } else {
      // Verificar preferencia del sistema
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  // Aplicar tema al documento
  const applyTheme = () => {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  // Cambiar tema
  const toggleTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
  }

  // Configurar tema específico
  const setTheme = (dark: boolean) => {
    isDark.value = dark
    applyTheme()
  }

  // Inicializar al crear el store
  if (typeof window !== 'undefined') {
    initializeTheme()
  }

  return {
    isDark,
    toggleTheme,
    setTheme,
    initializeTheme,
  }
})
