// Gerenciamento de cache local usando localStorage
const STORAGE_KEY = 'falaquegasto_gastos'
const SYNC_QUEUE_KEY = 'falaquegasto_sync_queue'

export const storageService = {
  // Salvar gastos no cache local
  saveGastos(gastos) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gastos))
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error)
    }
  },

  // Buscar gastos do cache local
  getGastos() {
    try {
      const gastos = localStorage.getItem(STORAGE_KEY)
      return gastos ? JSON.parse(gastos) : []
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error)
      return []
    }
  },

  // Adicionar gasto ao cache local
  addGasto(gasto) {
    const gastos = this.getGastos()
    const novoGasto = {
      ...gasto,
      id: gasto.id || `temp_${Date.now()}`,
      synced: false
    }
    gastos.unshift(novoGasto)
    this.saveGastos(gastos)
    return novoGasto
  },

  // Deletar gasto do cache local
  deleteGasto(id) {
    const gastos = this.getGastos()
    const gastosAtualizados = gastos.filter(gasto => gasto.id !== id)
    this.saveGastos(gastosAtualizados)
  },

  // Fila de sincronização para quando voltar online
  addToSyncQueue(gasto) {
    try {
      const queue = this.getSyncQueue()
      queue.push(gasto)
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue))
    } catch (error) {
      console.error('Erro ao adicionar à fila de sincronização:', error)
    }
  },

  getSyncQueue() {
    try {
      const queue = localStorage.getItem(SYNC_QUEUE_KEY)
      return queue ? JSON.parse(queue) : []
    } catch (error) {
      console.error('Erro ao ler fila de sincronização:', error)
      return []
    }
  },

  clearSyncQueue() {
    try {
      localStorage.removeItem(SYNC_QUEUE_KEY)
    } catch (error) {
      console.error('Erro ao limpar fila de sincronização:', error)
    }
  },

  // Verificar se está online
  isOnline() {
    return navigator.onLine
  }
}
