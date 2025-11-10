import { useState, useEffect } from 'react'
import { gastosService } from '../services/supabase'
import { storageService } from '../services/storage'
import './Hoje.css'

export default function Hoje() {
  const [gastosHoje, setGastosHoje] = useState([])
  const [totalHoje, setTotalHoje] = useState(0)
  const [loading, setLoading] = useState(true)
  const [dataAtual, setDataAtual] = useState(new Date())

  // Atualizar data a cada minuto e resetar à meia-noite
  useEffect(() => {
    const atualizarData = () => {
      const agora = new Date()
      const antigaData = dataAtual
      
      setDataAtual(agora)
      
      // Se mudou o dia, recarregar gastos
      if (agora.getDate() !== antigaData.getDate()) {
        carregarGastosHoje()
      }
    }

    // Verificar a cada minuto
    const intervalo = setInterval(atualizarData, 60000)
    
    return () => clearInterval(intervalo)
  }, [dataAtual])

  // Carregar gastos do dia
  const carregarGastosHoje = async () => {
    try {
      setLoading(true)
      
      const hoje = new Date()

      // Buscar no Supabase
      if (storageService.isOnline()) {
        try {
          const data = await gastosService.getByDate(hoje)
          setGastosHoje(data)
          calcularTotal(data)
        } catch (error) {
          console.error('Erro ao buscar do Supabase:', error)
          // Fallback para cache local
          carregarGastosLocais(hoje)
        }
      } else {
        // Offline: buscar do cache local
        carregarGastosLocais(hoje)
      }
    } catch (error) {
      console.error('Erro ao carregar gastos:', error)
    } finally {
      setLoading(false)
    }
  }

  // Carregar gastos do cache local
  const carregarGastosLocais = (hoje) => {
    const gastosLocal = storageService.getGastos()
    
    const inicioHoje = new Date(hoje)
    inicioHoje.setHours(0, 0, 0, 0)
    
    const fimHoje = new Date(hoje)
    fimHoje.setHours(23, 59, 59, 999)
    
    const gastosFiltrados = gastosLocal.filter(gasto => {
      const dataGasto = new Date(gasto.data)
      return dataGasto >= inicioHoje && dataGasto <= fimHoje
    })
    
    setGastosHoje(gastosFiltrados)
    calcularTotal(gastosFiltrados)
  }

  // Calcular total
  const calcularTotal = (gastos) => {
    const total = gastos.reduce((sum, gasto) => sum + gasto.valor, 0)
    setTotalHoje(total)
  }

  // Excluir gasto
  const excluirGasto = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este gasto?')) {
      return
    }

    try {
      // Deletar do Supabase
      if (storageService.isOnline()) {
        await gastosService.delete(id)
      }
      
      // Deletar do localStorage
      storageService.deleteGasto(id)
      
      // Recarregar lista
      await carregarGastosHoje()
      
    } catch (error) {
      console.error('Erro ao excluir gasto:', error)
      alert('Erro ao excluir o gasto. Tente novamente.')
    }
  }

  // Carregar ao montar
  useEffect(() => {
    carregarGastosHoje()
  }, [])

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

  // Obter cor por categoria
  const obterCorCategoria = (categoria) => {
    const cores = {
      alimentacao: '#f093fb',
      transporte: '#4facfe',
      saude: '#43e97b',
      lazer: '#feca57',
      educacao: '#667eea',
      moradia: '#764ba2',
      outros: '#6e6e8a'
    }
    return cores[categoria] || '#6e6e8a'
  }

  // Formatar data
  const formatarData = (data) => {
    return new Date(data).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="hoje-container">
        <div className="hoje-loading">
          <div className="spinner"></div>
          <p>Carregando gastos de hoje...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="hoje-container">
      {/* Header do dia */}
      <div className="hoje-header">
        <div className="hoje-data">
          <h1>Hoje</h1>
          <p>{dataAtual.toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
          })}</p>
        </div>
        
        <div className="hoje-total">
          <span className="hoje-total-label">Total do dia</span>
          <span className="hoje-total-valor">
            {totalHoje.toLocaleString('pt-BR', { 
              style: 'currency', 
              currency: 'BRL' 
            })}
          </span>
        </div>
      </div>

      {/* Lista de gastos */}
      <div className="hoje-lista">
        {gastosHoje.length === 0 ? (
          <div className="hoje-vazio">
            <span className="hoje-vazio-icone">🎉</span>
            <h2>Nenhum gasto hoje!</h2>
            <p>Você ainda não registrou nenhum gasto hoje. Continue economizando! 💰</p>
          </div>
        ) : (
          gastosHoje.map((gasto, index) => (
            <div 
              key={gasto.id} 
              className="hoje-item"
              style={{ 
                animationDelay: `${index * 0.05}s`,
                '--cor-categoria': obterCorCategoria(gasto.categoria)
              }}
            >
              <div className="hoje-item-icone">
                {obterEmojiCategoria(gasto.categoria)}
              </div>
              
              <div className="hoje-item-info">
                <h3>{gasto.descricao}</h3>
                <span className="hoje-item-categoria">{gasto.categoria}</span>
              </div>
              
              <div className="hoje-item-direita">
                <span className="hoje-item-valor">
                  {gasto.valor.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </span>
                <span className="hoje-item-hora">{formatarData(gasto.data)}</span>
              </div>

              <button 
                className="hoje-item-excluir"
                onClick={() => excluirGasto(gasto.id)}
                title="Excluir este gasto"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Estatísticas rápidas */}
      {gastosHoje.length > 0 && (
        <div className="hoje-stats">
          <div className="hoje-stat">
            <span className="hoje-stat-numero">{gastosHoje.length}</span>
            <span className="hoje-stat-label">Gastos</span>
          </div>
          
          <div className="hoje-stat">
            <span className="hoje-stat-numero">
              {(totalHoje / gastosHoje.length).toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </span>
            <span className="hoje-stat-label">Média</span>
          </div>
          
          <div className="hoje-stat">
            <span className="hoje-stat-numero">
              {Math.max(...gastosHoje.map(g => g.valor)).toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </span>
            <span className="hoje-stat-label">Maior</span>
          </div>
        </div>
      )}
    </div>
  )
}
