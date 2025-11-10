import { useState } from 'react'
import { voiceService } from '../services/voice'
import { geminiService } from '../services/gemini'
import { gastosService } from '../services/supabase'
import { storageService } from '../services/storage'
import './MicButton.css'

export default function MicButton({ onGastoAdicionado }) {
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognition, setRecognition] = useState(null)

  const handleStartRecording = () => {
    if (!voiceService.isSupported()) {
      alert('❌ Seu navegador não suporta reconhecimento de voz.\n\n✅ Use Chrome, Edge ou Opera.')
      return
    }

    // Verificar permissão de microfone
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'microphone' }).then((result) => {
        if (result.state === 'denied') {
          alert('🎤 Permissão de microfone negada!\n\nVá em Configurações do navegador e permita o acesso ao microfone.')
          return
        }
      })
    }

    console.log('🎤 Iniciando gravação...')
    setIsRecording(true)

    const rec = voiceService.startRecording(
      async (transcript) => {
        console.log('📝 Texto reconhecido:', transcript)
        setIsRecording(false)
        setIsProcessing(true)

        try {
          // Interpretar o texto com Gemini
          console.log('🤖 Interpretando com IA...')
          const gastoInterpretado = await geminiService.interpretarGasto(transcript)
          console.log('✅ Gasto interpretado:', gastoInterpretado)

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
            } catch (error) {
              console.error('Erro ao salvar no Supabase:', error)
              
              // Se falhar, salvar apenas localmente
              const gastoLocal = storageService.addGasto(novoGasto)
              storageService.addToSyncQueue(novoGasto)
              
              if (onGastoAdicionado) {
                onGastoAdicionado(gastoLocal)
              }
              
              showNotification('Gasto salvo localmente. Será sincronizado quando voltar online.', 'warning')
            }
          } else {
            // Offline: salvar apenas localmente
            const gastoLocal = storageService.addGasto(novoGasto)
            storageService.addToSyncQueue(novoGasto)
            
            if (onGastoAdicionado) {
              onGastoAdicionado(gastoLocal)
            }
            
            showNotification('Você está offline. Gasto salvo localmente.', 'warning')
          }
        } catch (error) {
          console.error('Erro ao processar gasto:', error)
          showNotification(error.message || 'Erro ao processar o gasto. Tente novamente.', 'error')
        } finally {
          setIsProcessing(false)
        }
      },
      (error) => {
        setIsRecording(false)
        setIsProcessing(false)
        console.error('❌ Erro no reconhecimento de voz:', error.message)
        
        // Mensagem mais clara para o usuário
        let mensagem = 'Reconhecimento de voz não funcionou.'
        if (error.message.includes('serviço de reconhecimento')) {
          mensagem = '🔇 Serviço de voz do Chrome não respondeu. Use o campo de texto abaixo! ✏️'
        } else {
          mensagem = error.message || 'Erro ao reconhecer a voz. Tente novamente.'
        }
        
        showNotification(mensagem, 'error')
      }
    )

    if (rec) {
      setRecognition(rec)
      console.log('✅ Reconhecimento iniciado')
    } else {
      setIsRecording(false)
      console.error('❌ Falha ao criar reconhecimento')
    }
  }

  const handleStopRecording = () => {
    if (recognition) {
      voiceService.stopRecording(recognition)
      setIsRecording(false)
    }
  }

  const showNotification = (message, type = 'info') => {
    // Criar elemento de notificação
    const notification = document.createElement('div')
    notification.className = `notification notification-${type}`
    notification.textContent = message
    document.body.appendChild(notification)

    // Remover após 3 segundos
    setTimeout(() => {
      notification.classList.add('notification-fade-out')
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  return (
    <>
      <button
        className={`mic-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        disabled={isProcessing}
        title={isRecording ? 'Ouvindo... Fale agora!' : 'Clique para gravar gasto por voz'}
      >
        {isProcessing ? (
          <span className="mic-icon">⏳</span>
        ) : isRecording ? (
          <span className="mic-icon pulse">🎤</span>
        ) : (
          <span className="mic-icon">🎤</span>
        )}
      </button>
      
      {isRecording && (
        <div className="listening-indicator">
          🎤 OUVINDO... Fale agora!
        </div>
      )}
    </>
  )
}
