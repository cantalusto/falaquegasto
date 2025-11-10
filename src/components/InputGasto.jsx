import { useState } from 'react'
import { geminiService } from '../services/gemini'
import { gastosService } from '../services/supabase'
import { storageService } from '../services/storage'
import './InputGasto.css'

export default function InputGasto({ onGastoAdicionado }) {
  const [texto, setTexto] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!texto.trim()) return

    setIsProcessing(true)

    try {
      // Interpretar o texto com Gemini
      const gastoInterpretado = await geminiService.interpretarGasto(texto)

      // Adicionar data atual
      const novoGasto = {
        ...gastoInterpretado,
        data: new Date().toISOString()
      }

      // Tentar salvar no Supabase
      if (storageService.isOnline()) {
        try {
          const gastoSalvo = await gastosService.create(novoGasto)
          
          // Salvar no cache local também
          storageService.addGasto({ ...gastoSalvo, synced: true })
          
          if (onGastoAdicionado) {
            onGastoAdicionado(gastoSalvo)
          }
          
          showNotification('Gasto registrado com sucesso!', 'success')
          setTexto('') // Limpar input
        } catch (error) {
          console.error('Erro ao salvar no Supabase:', error)
          
          // Se falhar, salvar apenas localmente
          const gastoLocal = storageService.addGasto(novoGasto)
          storageService.addToSyncQueue(novoGasto)
          
          if (onGastoAdicionado) {
            onGastoAdicionado(gastoLocal)
          }
          
          showNotification('Gasto salvo localmente. Será sincronizado quando voltar online.', 'warning')
          setTexto('')
        }
      } else {
        // Offline: salvar apenas localmente
        const gastoLocal = storageService.addGasto(novoGasto)
        storageService.addToSyncQueue(novoGasto)
        
        if (onGastoAdicionado) {
          onGastoAdicionado(gastoLocal)
        }
        
        showNotification('Você está offline. Gasto salvo localmente.', 'warning')
        setTexto('')
      }
    } catch (error) {
      console.error('Erro ao processar gasto:', error)
      showNotification(error.message || 'Erro ao processar o gasto. Tente novamente.', 'error')
    } finally {
      setIsProcessing(false)
    }
  }

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.classList.add('notification-fade-out')
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="input-gasto">
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="✏️ Digite seu gasto... Ex: Almoço 25 reais"
        disabled={isProcessing}
        className="input-gasto-field"
        title="Digite gastos como: 'almoço 35 reais', 'uber 15', 'janta 40 reais'"
      />
      <button 
        type="submit" 
        disabled={!texto.trim() || isProcessing}
        className="input-gasto-button"
      >
        {isProcessing ? '⏳' : '📤'}
      </button>
    </form>
  )
}
