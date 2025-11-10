const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent'

// Interpretação local como fallback
function interpretarLocal(texto) {
  console.log('🔍 Interpretando localmente:', texto)
  const textoLower = texto.toLowerCase()
  
  // Procurar por valor com contexto de "reais", "R$", etc.
  let valor = 0
  let descricao = texto
  
  // Padrões de valor em ordem de prioridade
  const padroes = [
    /(\d+[.,]\d{1,2})\s*(reais|real|r\$|rs)/i,  // "35.50 reais"
    /r\$\s*(\d+[.,]\d{1,2})/i,                    // "R$ 35.50"
    /(\d+[.,]\d{1,2})/,                           // "35.50"
    /(\d+)\s*(reais|real|r\$|rs)/i,              // "35 reais"
    /r\$\s*(\d+)/i,                               // "R$ 35"
    /(\d+)/                                        // último recurso: qualquer número
  ]
  
  for (const padrao of padroes) {
    const match = texto.match(padrao)
    if (match) {
      valor = parseFloat(match[1].replace(',', '.'))
      // Remover o valor e contexto da descrição
      descricao = texto.replace(match[0], '').trim()
      console.log('💰 Valor encontrado:', valor, '| Padrão:', padrao)
      break
    }
  }
  
  // Se não encontrou valor, tentar extrair número solto como último recurso
  if (valor === 0) {
    const numeros = texto.match(/\d+[.,]?\d*/g)
    if (numeros && numeros.length > 0) {
      // Pegar o último número (geralmente é o valor)
      valor = parseFloat(numeros[numeros.length - 1].replace(',', '.'))
      descricao = texto.replace(numeros[numeros.length - 1], '').trim()
    }
  }
  
  // Limpar descrição
  descricao = descricao
    .replace(/\s+/g, ' ')                           // múltiplos espaços
    .replace(/[,;.]\s*$/g, '')                      // vírgulas, ponto-vírgula, pontos no final
    .replace(/^\s*[,;.]\s*/g, '')                   // vírgulas, ponto-vírgula, pontos no início
    .replace(/^\s*(no|na|em|de|do|da)\s*/i, '')    // preposições no início
    .replace(/\s*(brl|r\$|reais?)\s*[.,;]?\s*$/gi, '') // remover BRL, R$, reais no final
    .replace(/[,;.]\s*$/g, '')                      // remover pontuação final novamente
    .trim()
  
  // Capitalizar primeira letra
  if (descricao) {
    descricao = descricao.charAt(0).toUpperCase() + descricao.slice(1).toLowerCase()
  }
  
  // Se ficou vazio, usar texto original
  if (!descricao) {
    descricao = texto
  }
  
  // Determinar categoria por palavras-chave
  let categoria = 'outros'
  
  if (/comida|almoço|almoço|jantar|janta|lanche|restaurante|pizza|hamburguer|hambúrguer|café|padaria|comeu|comi|refeição|refeicao/i.test(textoLower)) {
    categoria = 'alimentacao'
  } else if (/uber|taxi|ônibus|onibus|bus|gasolina|combustível|combustivel|passagem|metro|metrô|transporte/i.test(textoLower)) {
    categoria = 'transporte'
  } else if (/remédio|remedio|farmácia|farmacia|médico|medico|consulta|exame|saúde|saude/i.test(textoLower)) {
    categoria = 'saude'
  } else if (/cinema|show|festa|jogo|diversão|diversao|passeio|lazer/i.test(textoLower)) {
    categoria = 'lazer'
  } else if (/mercado|supermercado|feira|compras|açougue|acougue|verdura|legume|fruta/i.test(textoLower)) {
    categoria = 'mercado'
  } else if (/conta|água|agua|luz|internet|telefone|aluguel|energia|fatura/i.test(textoLower)) {
    categoria = 'contas'
  }
  
  console.log('🏷️ Categoria detectada:', categoria)
  
  console.log('✅ Interpretação:', { descricao, valor, categoria })
  
  return {
    descricao,
    valor,
    categoria
  }
}

export const geminiService = {
  async interpretarGasto(texto) {
    // Tentar API do Gemini primeiro
    if (GEMINI_API_KEY) {
      const prompt = `
Você é um assistente que interpreta gastos falados por uma pessoa.
Analise o texto a seguir e retorne APENAS um objeto JSON válido (sem markdown, sem explicações) com os campos:
- descricao (string): descrição do que foi comprado
- valor (number): valor em reais (apenas o número, ex: 5.50)
- categoria (string): categoria do gasto (escolha entre: alimentacao, transporte, saude, lazer, mercado, contas, outros)

Texto: "${texto}"

Exemplos de resposta esperada:
{"descricao": "coca cola no supermercado", "valor": 5.0, "categoria": "mercado"}
{"descricao": "passagem de ônibus", "valor": 4.50, "categoria": "transporte"}

Responda APENAS com o JSON, sem formatação markdown:
`

      try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 200,
            }
          })
        })

        if (!response.ok) {
          console.warn(`API Gemini falhou (${response.status}), usando interpretação local`)
          return interpretarLocal(texto)
        }

        const data = await response.json()
        const textoResposta = data.candidates[0]?.content?.parts[0]?.text

        if (!textoResposta) {
          console.warn('Resposta vazia da API, usando interpretação local')
          return interpretarLocal(texto)
        }

        // Remove markdown se existir (```json ... ```)
        const jsonLimpo = textoResposta
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim()

        const gastoInterpretado = JSON.parse(jsonLimpo)

        // Validação básica
        if (!gastoInterpretado.descricao || gastoInterpretado.valor === undefined || !gastoInterpretado.categoria) {
          console.warn('Resposta incompleta da API, usando interpretação local')
          return interpretarLocal(texto)
        }

        return gastoInterpretado
      } catch (error) {
        console.warn('Erro na API Gemini, usando interpretação local:', error.message)
        return interpretarLocal(texto)
      }
    }
    
    // Se não houver API key, usar interpretação local
    console.info('Usando interpretação local (sem API do Gemini)')
    return interpretarLocal(texto)
  }
}
