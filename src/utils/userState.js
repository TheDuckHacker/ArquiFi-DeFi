// Estado global del usuario en ArquiFi
export class UserState {
  constructor() {
    this.user = null
    this.wallet = null
    this.arquipuntos = 2400 // Valor por defecto para demo
    this.reputacion = 850 // Valor por defecto para demo
    this.level = 'Explorador' // Valor por defecto para demo
    this.badges = []
    this.isConnected = false
  }

  // Inicializar estado del usuario
  async initializeUser(walletAddress) {
    try {
      this.wallet = walletAddress
      this.isConnected = true
      
      // Crear usuario con datos por defecto
      this.user = {
        id: Date.now(),
        wallet_address: walletAddress,
        username: `user_${walletAddress.slice(-6)}`,
        reputation_points: this.reputacion,
        arquipuntos: this.arquipuntos,
        level: this.level,
        badges: this.badges,
        created_at: new Date().toISOString()
      }

      return this
    } catch (error) {
      console.error('Error inicializando usuario:', error)
      throw error
    }
  }

  // Crear nuevo usuario
  async createNewUser(walletAddress) {
    try {
      const newUser = {
        id: Date.now(),
        wallet_address: walletAddress,
        username: `user_${walletAddress.slice(-6)}`,
        reputation_points: 0,
        arquipuntos: 0,
        level: 'Novato',
        badges: [],
        created_at: new Date().toISOString()
      }

      this.user = newUser
      this.arquipuntos = 0
      this.reputacion = 0
      this.level = 'Novato'
      this.badges = []

      return newUser
    } catch (error) {
      console.error('Error creando usuario:', error)
      throw error
    }
  }

  // Actualizar Arquipuntos
  async updateArquipuntos(newAmount) {
    try {
      this.arquipuntos = newAmount
      
      // Actualizar UI
      this.updateUI()
    } catch (error) {
      console.error('Error actualizando Arquipuntos:', error)
      throw error
    }
  }

  // Actualizar Reputación
  async updateReputacion(newAmount) {
    try {
      this.reputacion = newAmount
      
      // Actualizar nivel según reputación
      this.updateLevel()
      
      // Actualizar UI
      this.updateUI()
    } catch (error) {
      console.error('Error actualizando Reputación:', error)
      throw error
    }
  }

  // Actualizar nivel según reputación
  updateLevel() {
    if (this.reputacion >= 1000) {
      this.level = 'Visionario'
    } else if (this.reputacion >= 500) {
      this.level = 'Arquitecto'
    } else if (this.reputacion >= 200) {
      this.level = 'Explorador'
    } else {
      this.level = 'Novato'
    }
  }

  // Agregar badge
  async addBadge(badgeName) {
    try {
      if (!this.badges.includes(badgeName)) {
        this.badges.push(badgeName)
        
        // Mostrar notificación
        this.showNotification(`¡Nuevo badge desbloqueado: ${badgeName}!`, 'success')
      }
    } catch (error) {
      console.error('Error agregando badge:', error)
      throw error
    }
  }

  // Actualizar UI
  updateUI() {
    // Actualizar contadores en la navegación
    const apElement = document.querySelector('[data-ap]')
    const rpElement = document.querySelector('[data-rp]')
    const levelElement = document.querySelector('[data-level]')

    if (apElement) apElement.textContent = `${this.arquipuntos} AP`
    if (rpElement) rpElement.textContent = `${this.reputacion} RP`
    if (levelElement) levelElement.textContent = this.level
  }

  // Mostrar notificación
  showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 
      'bg-blue-500'
    } text-white`
    notification.textContent = message

    document.body.appendChild(notification)

    // Remover después de 3 segundos
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  // Obtener estado actual
  getState() {
    return {
      user: this.user,
      wallet: this.wallet,
      arquipuntos: this.arquipuntos,
      reputacion: this.reputacion,
      level: this.level,
      badges: this.badges,
      isConnected: this.isConnected
    }
  }
}

// Instancia global del estado del usuario
export const userState = new UserState()
