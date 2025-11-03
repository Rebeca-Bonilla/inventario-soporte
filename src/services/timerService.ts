// src/services/timerService.ts
export class TimerService {
  private timeoutId: number | null = null
  private onTimeoutCallback: (() => void) | null = null

  start(timeLimit: number, onTimeout: () => void) {
    this.onTimeoutCallback = onTimeout
    this.reset(timeLimit)
  }

  reset(timeLimit: number) {
    // Limpiar timeout anterior
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId)
    }

    // Configurar nuevo timeout
    this.timeoutId = window.setTimeout(() => {
      if (this.onTimeoutCallback) {
        this.onTimeoutCallback()
      }
    }, timeLimit)
  }

  stop() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    this.onTimeoutCallback = null
  }

  isRunning(): boolean {
    return this.timeoutId !== null
  }
}
