import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    tiempo: '00:00',
    limite: '30:00',
    usuario: '',
    sessionStart: 0,
    inactivityTimer: null as number | null,
  }),

  actions: {
    iniciarSesion(usuario: string) {
      this.usuario = usuario
      this.sessionStart = Date.now()
      this.iniciarTemporizador()
      this.iniciarMonitorInactividad()
    },

    iniciarTemporizador() {
      setInterval(() => {
        const ahora = Date.now()
        const transcurrido = Math.floor((ahora - this.sessionStart) / 1000)
        const minutos = Math.floor(transcurrido / 60)
          .toString()
          .padStart(2, '0')
        const segundos = (transcurrido % 60).toString().padStart(2, '0')
        this.tiempo = `${minutos}:${segundos}`
      }, 1000)
    },

    iniciarMonitorInactividad() {
      // Reiniciar timer de inactividad
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer)
      }

      // Cerrar sesión después de 30 minutos de inactividad
      this.inactivityTimer = window.setTimeout(
        () => {
          this.cerrarSesion()
          alert('Sesión cerrada por inactividad')
          window.location.href = '/login'
        },
        30 * 60 * 1000,
      ) // 30 minutos
    },

    resetearInactividad() {
      this.iniciarMonitorInactividad()
    },

    cerrarSesion() {
      this.usuario = ''
      this.tiempo = '00:00'
      this.sessionStart = 0
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer)
        this.inactivityTimer = null
      }
      localStorage.removeItem('usuario')
      localStorage.removeItem('sessionStart')
    },
  },
})
