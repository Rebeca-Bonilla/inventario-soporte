import { authService } from './authService'

class TimerService {
  private timeLeft: number = 30 * 60
  private timerId: number | null = null
  private lastActivity: number = Date.now()

  constructor() {
    this.startTimer()
    this.setupActivityListeners()
  }

  private setupActivityListeners() {
    const events = ['click', 'keypress', 'mousemove', 'scroll', 'touchstart']
    events.forEach((event) => {
      document.addEventListener(event, () => this.resetTimer(), { passive: true })
    })
  }

  startTimer() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }

    this.timerId = setInterval(() => {
      const now = Date.now()
      const inactiveTime = Math.floor((now - this.lastActivity) / 1000)
      this.timeLeft = Math.max(0, 30 * 60 - inactiveTime)

      if (this.timeLeft <= 0) {
        this.logout()
      }
    }, 1000) as unknown as number
  }

  resetTimer() {
    this.lastActivity = Date.now()
    this.timeLeft = 30 * 60
  }

  getTimeLeft(): number {
    const now = Date.now()
    const inactiveTime = Math.floor((now - this.lastActivity) / 1000)
    return Math.max(0, 30 * 60 - inactiveTime)
  }

  logout() {
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
    authService.logout()
    window.location.href = '/login'
  }

  destroy() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    const events = ['click', 'keypress', 'mousemove', 'scroll', 'touchstart']
    events.forEach((event) => {
      document.removeEventListener(event, () => this.resetTimer())
    })
  }
}

export const timerService = new TimerService()
