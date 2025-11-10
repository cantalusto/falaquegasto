// Serviço de reconhecimento de voz usando Web Speech API
export const voiceService = {
  // Verificar se o navegador suporta reconhecimento de voz
  isSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  },

  // Iniciar gravação de voz
  startRecording(onResult, onError) {
    if (!this.isSupported()) {
      onError(new Error('❌ Reconhecimento de voz não suportado neste navegador. Use Chrome, Edge ou Opera.'))
      return null
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      // Configurações ESSENCIAIS para funcionar no Chrome
      recognition.lang = 'pt-BR'
      recognition.continuous = false
      recognition.interimResults = false
      recognition.maxAlternatives = 1
      
      // TENTATIVA DE FIX: Forçar reiniciar o serviço de reconhecimento
      try {
        recognition.abort() // Abortar qualquer instância anterior
      } catch (e) {
        // Ignorar erro se não houver instância anterior
      }
      
      console.log('⚙️ Configurações do reconhecimento:', {
        lang: recognition.lang,
        continuous: recognition.continuous,
        interimResults: recognition.interimResults
      })

      // Testar se o microfone está funcionando E REALMENTE CAPTURANDO ÁUDIO
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          console.log('✅ Microfone acessível e funcionando')
          
          // Verificar se o stream está ativo
          const audioTracks = stream.getAudioTracks()
          if (audioTracks.length > 0) {
            console.log('🎤 Tracks de áudio:', audioTracks.length)
            console.log('🎤 Microfone:', audioTracks[0].label)
            console.log('🎤 Habilitado:', audioTracks[0].enabled)
            console.log('🎤 Estado:', audioTracks[0].readyState)
          }
          
          // Parar o stream (já testamos)
          stream.getTracks().forEach(track => track.stop())
        })
        .catch((err) => {
          console.error('❌ Erro ao acessar microfone:', err)
          onError(new Error('🎤 Não consegui acessar o microfone.\n\nVerifique as permissões e se o microfone está conectado.'))
        })

      let finalTranscript = ''
      let lastInterimTranscript = ''
      let timeout = null
      let speechendTimeout = null
      let hasProcessed = false

      let onresultCalled = false

      let audioStarted = false

      recognition.onaudiostart = () => {
        audioStarted = true
        console.log('🔊 Captura de áudio INICIADA! Microfone está ativo.')
      }

      recognition.onaudioend = () => {
        console.log('🔇 Captura de áudio FINALIZADA.')
      }

      recognition.onsoundstart = () => {
        console.log('� SOM DETECTADO! O microfone está captando algo.')
      }

      recognition.onsoundend = () => {
        console.log('🔕 Som parou de ser detectado.')
      }

      recognition.onstart = () => {
        console.log('�🎤 Gravação iniciada - FALE AGORA!')
        console.log('💡 Fale UMA FRASE COMPLETA e pare. Aguarde o processamento.')
        console.log('⏱️ Você tem 15 segundos para falar...')
        hasProcessed = false
        onresultCalled = false
        audioStarted = false
        
        // Timeout de 15 segundos (aumentado para dar mais tempo)
        timeout = setTimeout(() => {
          console.log('⏰ Tempo esgotado (15s)!')
          console.log('📊 Diagnóstico:')
          console.log('  - onresult foi chamado?', onresultCalled)
          console.log('  - Áudio foi iniciado?', audioStarted)
          
          if (!audioStarted) {
            console.error('❌ PROBLEMA CRÍTICO: Captura de áudio NUNCA iniciou!')
            console.error('💡 Possíveis causas:')
            console.error('   1. Chrome não conseguiu acessar o microfone')
            console.error('   2. Outro aplicativo está usando o microfone')
            console.error('   3. Driver do microfone com problema')
            console.error('   4. Tente fechar e reabrir o navegador')
          } else if (!onresultCalled) {
            console.error('❌ PROBLEMA: Serviço de reconhecimento não respondeu!')
            console.error('💡 O microfone captou áudio mas o Chrome não conseguiu transcrever.')
            console.error('📡 Possíveis causas:')
            console.error('   1. Firewall bloqueando a API do Google Speech')
            console.error('   2. Serviço de voz do Google temporariamente indisponível')
            console.error('   3. Chrome precisa ser reiniciado completamente')
            console.error('   4. Problema de conexão com a internet')
            console.error('')
            console.error('✏️ SOLUÇÃO: Use a entrada de texto no campo abaixo!')
            console.error('   Digite: "almoço 35 reais" e clique em ➤')
          }
          recognition.stop()
        }, 15000)
      }

      recognition.onresult = (event) => {
        onresultCalled = true
        console.log('🎉 onresult CHAMADO! Total de resultados:', event.results.length)
        
        // Como interimResults = false, só receberemos resultado final
        const transcript = event.results[0][0].transcript
        const confidence = event.results[0][0].confidence
        
        console.log('✅ Texto reconhecido:', transcript)
        console.log('📊 Confiança:', confidence)
        
        if (transcript && transcript.trim()) {
          clearTimeout(timeout)
          clearTimeout(speechendTimeout)
          hasProcessed = true
          
          console.log('✅ Processando:', transcript.trim())
          onResult(transcript.trim())
        } else {
          console.error('❌ Texto vazio recebido')
        }
      }

      recognition.onspeechend = () => {
        console.log('🛑 Fala detectada como finalizada')
        console.log('⏱️ Aguardando resultado final...')
        // Não fazer nada aqui, deixar o onresult processar
      }

      recognition.onerror = (event) => {
        clearTimeout(timeout)
        console.error('❌ Erro no reconhecimento:', event.error)
        
        if (event.error === 'no-speech') {
          onError(new Error('🔇 Nenhuma fala detectada.\n\nDica: Fale mais alto e próximo ao microfone!'))
        } else if (event.error === 'audio-capture') {
          onError(new Error('🎤 Microfone não detectado.\n\nVerifique se está conectado e funcionando.'))
        } else if (event.error === 'not-allowed') {
          onError(new Error('🚫 Permissão de microfone negada.\n\nClique no ícone de cadeado na barra de endereço e permita o microfone.'))
        } else if (event.error === 'network') {
          onError(new Error('🌐 Erro de rede.\n\nO reconhecimento de voz precisa de internet.'))
        } else if (event.error === 'aborted') {
          onError(new Error('⏹️ Gravação cancelada.'))
        } else {
          onError(new Error(`❌ Erro: ${event.error}\n\nTente novamente.`))
        }
      }

      recognition.onend = () => {
        console.log('🛑 Gravação finalizada')
        console.log('📊 onresult foi chamado?', onresultCalled)
        console.log('📊 Já processou?', hasProcessed)
        
        clearTimeout(timeout)
        clearTimeout(speechendTimeout)
        
        // FALLBACK: Se chegou aqui mas não processou nada, avisar
        if (!hasProcessed) {
          if (!onresultCalled) {
            console.error('❌ ERRO CRÍTICO: onresult NUNCA foi chamado!')
            console.error('💡 Possíveis causas:')
            console.error('   1. Chrome não conseguiu acessar o microfone')
            console.error('   2. Microfone não está captando áudio')
            console.error('   3. Problema de configuração do sistema')
            onError(new Error('🔇 Nenhum texto foi reconhecido.\n\nVerifique se o microfone está funcionando e tente novamente.'))
          } else {
            console.error('⚠️ onresult foi chamado mas não retornou texto')
            onError(new Error('🔇 Não consegui entender o que você disse.\n\nTente falar mais alto e claramente.'))
          }
        } else {
          console.log('✅ Processamento concluído com sucesso!')
        }
      }

      console.log('▶️ Iniciando reconhecimento de voz...')
      recognition.start()
      return recognition
    } catch (error) {
      console.error('❌ Erro ao criar reconhecimento:', error)
      onError(new Error('Erro ao iniciar o reconhecimento de voz. Tente novamente.'))
      return null
    }
  },

  // Parar gravação
  stopRecording(recognition) {
    if (recognition) {
      recognition.stop()
    }
  }
}
