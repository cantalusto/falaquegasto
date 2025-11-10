import { useState, useEffect, useRef } from 'react'
import { geminiService } from '../services/gemini'
import { gastosService } from '../services/supabase'
import { storageService } from '../services/storage'
import { voiceService } from '../services/voice'
import './Chat.css'

export default function Chat() {
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      tipo: 'bot',
      texto: '👋 Olá! Sou o FalaQueGasto!\n\n✏️ Digite seus gastos que eu registro tudo pra você! 💰\n\nExemplos:\n• "almoço 35 reais"\n• "uber 25"\n• "café 8 reais"\n\n🎤 Você também pode usar o modo de fala (experimental - pode não funcionar)',
      timestamp: new Date()
    }
  ])
  const [inputTexto, setInputTexto] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [botDigitando, setBotDigitando] = useState(false)
  
  const mensagensRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight
    }
  }, [mensagens, botDigitando])

  // Adicionar mensagem do usuário
  const adicionarMensagemUsuario = (texto) => {
    const novaMensagem = {
      id: Date.now(),
      tipo: 'usuario',
      texto,
      timestamp: new Date()
    }
    setMensagens(prev => [...prev, novaMensagem])
    return novaMensagem
  }

  // Adicionar mensagem do bot com efeito de digitação
  const adicionarMensagemBot = async (texto, gasto = null) => {
    setBotDigitando(true)
    
    // Simular digitação (delay)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const novaMensagem = {
      id: Date.now(),
      tipo: 'bot',
      texto,
      gasto,
      timestamp: new Date()
    }
    
    setBotDigitando(false)
    setMensagens(prev => [...prev, novaMensagem])
  }

  // Excluir gasto
  const excluirGasto = async (gastoId, mensagemId) => {
    if (!confirm('Tem certeza que deseja excluir este gasto?')) {
      return
    }

    try {
      // Deletar do Supabase
      if (storageService.isOnline()) {
        await gastosService.delete(gastoId)
      }
      
      // Deletar do localStorage
      storageService.deleteGasto(gastoId)
      
      // Atualizar mensagem para indicar que foi excluído
      setMensagens(prev => prev.map(msg => 
        msg.id === mensagemId 
          ? { ...msg, gastoExcluido: true }
          : msg
      ))
      
      // Adicionar mensagem de confirmação do bot
      await adicionarMensagemBot('✅ Gasto excluído com sucesso!')
      
    } catch (error) {
      console.error('Erro ao excluir gasto:', error)
      await adicionarMensagemBot('❌ Erro ao excluir o gasto. Tente novamente.')
    }
  }

  // Processar gasto
  const processarGasto = async (texto) => {
    try {
      setIsProcessing(true)
      
      // Adicionar mensagem do usuário
      adicionarMensagemUsuario(texto)
      
      // Interpretar com Gemini
      const gastoInterpretado = await geminiService.interpretarGasto(texto)
      
      // Adicionar data atual
      const novoGasto = {
        ...gastoInterpretado,
        data: new Date().toISOString()
      }

      // Salvar no Supabase
      let gastoSalvo
      if (storageService.isOnline()) {
        try {
          gastoSalvo = await gastosService.create(novoGasto)
          storageService.addGasto({ ...gastoSalvo, synced: true })
        } catch (error) {
          console.error('Erro ao salvar no Supabase:', error)
          gastoSalvo = storageService.addGasto(novoGasto)
          storageService.addToSyncQueue(novoGasto)
        }
      } else {
        gastoSalvo = storageService.addGasto(novoGasto)
        storageService.addToSyncQueue(novoGasto)
      }

      // Resposta do bot
      const emoji = obterEmojiCategoria(gastoSalvo.categoria)
      const valorFormatado = gastoSalvo.valor.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
      })
      
      const respostaBot = `✅ Perfeito! Registrei:\n\n${emoji} ${gastoSalvo.descricao}\n💰 ${valorFormatado}\n📁 ${gastoSalvo.categoria}`
      
      await adicionarMensagemBot(respostaBot, gastoSalvo)
      
    } catch (error) {
      console.error('Erro ao processar gasto:', error)
      await adicionarMensagemBot('❌ Ops! Não consegui entender esse gasto. Tente novamente, por exemplo: "Almoço 35 reais"')
    } finally {
      setIsProcessing(false)
    }
  }

  // Enviar mensagem de texto
  const handleEnviarTexto = (e) => {
    e.preventDefault()
    
    if (!inputTexto.trim() || isProcessing) return
    
    const texto = inputTexto.trim()
    setInputTexto('')
    processarGasto(texto)
  }

  // Gravar áudio
  const handleGravarAudio = () => {
    if (isRecording) {
      if (recognition) {
        voiceService.stopRecording(recognition)
        setIsRecording(false)
      }
      return
    }

    setIsRecording(true)
    
    const rec = voiceService.startRecording(
      async (transcript) => {
        setIsRecording(false)
        processarGasto(transcript)
      },
      async (error) => {
        setIsRecording(false)
        console.error('Erro no reconhecimento:', error)
        
        // Mensagem amigável do bot explicando o problema
        const mensagemErro = `🎤 Ops! O reconhecimento de voz não está funcionando agora.\n\n✏️ Mas não se preocupe! Você pode digitar no campo abaixo.\n\nExemplo: "almoço 35 reais"`
        
        await adicionarMensagemBot(mensagemErro)
        
        // Focar no campo de texto
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }
    )
    
    if (rec) {
      setRecognition(rec)
    }
  }

  // Obter emoji por categoria
  const obterEmojiCategoria = (categoria) => {
    const emojis = {
      alimentacao: '🍽️',
      transporte: '🚗',
      saude: '🏥',
      lazer: '🎮',
      educacao: '📚',
      moradia: '🏠',
      outros: '💳'
    }
    return emojis[categoria] || '💳'
  }

  return (
    <div className="chat-container">
      {/* Área de mensagens */}
      <div className="chat-mensagens" ref={mensagensRef}>
        {mensagens.map((msg) => (
          <div 
            key={msg.id} 
            className={`mensagem ${msg.tipo === 'bot' ? 'mensagem-bot' : 'mensagem-usuario'} ${msg.gastoExcluido ? 'gasto-excluido' : ''}`}
          >
            <div className="mensagem-conteudo">
              {msg.tipo === 'bot' && (
                <div className="bot-avatar">🤖</div>
              )}
              
              <div className="mensagem-texto">
                {msg.texto}
                {msg.gasto && !msg.gastoExcluido && (
                  <button 
                    className="btn-excluir-gasto"
                    onClick={() => excluirGasto(msg.gasto.id, msg.id)}
                    title="Excluir este gasto"
                  >
                    🗑️
                  </button>
                )}
              </div>
              
              {msg.tipo === 'usuario' && (
                <div className="usuario-avatar">👤</div>
              )}
            </div>
            
            <div className="mensagem-hora">
              {msg.timestamp.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
        
        {/* Indicador de digitação */}
        {botDigitando && (
          <div className="mensagem mensagem-bot">
            <div className="mensagem-conteudo">
              <div className="bot-avatar">🤖</div>
              <div className="mensagem-digitando">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Área de input */}
      <form className="chat-input-area" onSubmit={handleEnviarTexto}>
        <button
          type="button"
          className={`btn-microfone ${isRecording ? 'gravando' : ''}`}
          onClick={handleGravarAudio}
          disabled={isProcessing}
          title={isRecording ? 'Gravando... Clique para parar' : 'Gravar áudio'}
        >
          {isRecording ? '🔴' : '🎤'}
        </button>

        <input
          ref={inputRef}
          type="text"
          value={inputTexto}
          onChange={(e) => setInputTexto(e.target.value)}
          placeholder="Digite seu gasto... Ex: Almoço 35 reais"
          disabled={isProcessing || isRecording}
          className="chat-input"
        />

        <button
          type="submit"
          className="btn-enviar"
          disabled={!inputTexto.trim() || isProcessing || isRecording}
          title="Enviar mensagem"
        >
          {isProcessing ? '⏳' : '📤'}
        </button>
      </form>
    </div>
  )
}
