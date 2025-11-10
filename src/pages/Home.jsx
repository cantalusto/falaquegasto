import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import GastosList from '../components/GastosList'
import MicButton from '../components/MicButton'
import InputGasto from '../components/InputGasto'
import { gastosService } from '../services/supabase'
import { storageService } from '../services/storage'
import './Home.css'

export default function Home() {
  const [gastosHoje, setGastosHoje] = useState([])
  const [totalHoje, setTotalHoje] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarGastos()
    
    // Listener para sincronizar quando voltar online
    const handleOnline = () => {
      sincronizarGastos()
    }
    
    window.addEventListener('online', handleOnline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  const carregarGastos = async () => {
    try {
      setLoading(true)
      
      if (storageService.isOnline()) {
        // Tentar buscar do Supabase
        try {
          const hoje = new Date()
          const gastos = await gastosService.getByDate(hoje)
          setGastosHoje(gastos)
          
          // Atualizar cache local
          storageService.saveGastos(gastos.map(g => ({ ...g, synced: true })))
          
          calcularTotal(gastos)
        } catch (error) {
          console.error('Erro ao buscar do Supabase:', error)
          // Fallback para cache local
          carregarDoCache()
        }
      } else {
        // Offline: usar cache local
        carregarDoCache()
      }
    } finally {
      setLoading(false)
    }
  }

  const carregarDoCache = () => {
    const gastosCache = storageService.getGastos()
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    
    // Filtrar apenas gastos de hoje
    const gastosHoje = gastosCache.filter(gasto => {
      const dataGasto = new Date(gasto.data)
      dataGasto.setHours(0, 0, 0, 0)
      return dataGasto.getTime() === hoje.getTime()
    })
    
    setGastosHoje(gastosHoje)
    calcularTotal(gastosHoje)
  }

  const sincronizarGastos = async () => {
    const filaSincronizacao = storageService.getSyncQueue()
    
    if (filaSincronizacao.length > 0) {
      console.log('Sincronizando gastos pendentes...')
      
      for (const gasto of filaSincronizacao) {
        try {
          await gastosService.create(gasto)
        } catch (error) {
          console.error('Erro ao sincronizar gasto:', error)
        }
      }
      
      storageService.clearSyncQueue()
      carregarGastos()
    }
  }

  const calcularTotal = (gastos) => {
    const total = gastos.reduce((acc, gasto) => acc + parseFloat(gasto.valor), 0)
    setTotalHoje(total)
  }

  const handleGastoAdicionado = (novoGasto) => {
    setGastosHoje([novoGasto, ...gastosHoje])
    calcularTotal([novoGasto, ...gastosHoje])
  }

  const handleDelete = async (id) => {
    if (!confirm('Deseja realmente excluir este gasto?')) {
      return
    }

    try {
      // Tentar deletar do Supabase
      if (storageService.isOnline()) {
        await gastosService.delete(id)
      }
      
      // Remover do estado
      const novosGastos = gastosHoje.filter(g => g.id !== id)
      setGastosHoje(novosGastos)
      calcularTotal(novosGastos)
      
      // Atualizar cache local
      storageService.saveGastos(novosGastos)
    } catch (error) {
      console.error('Erro ao deletar gasto:', error)
      alert('Erro ao deletar o gasto. Tente novamente.')
    }
  }

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  return (
    <div className="home-page">
      <Header title="FalaQueGasto 💸" />
      
      <div className="home-content">
        <div className="status-bar">
          {!storageService.isOnline() && (
            <div className="offline-badge">
              📡 Modo Offline
            </div>
          )}
        </div>

        <div className="total-card">
          <span className="total-label">Total gasto hoje</span>
          <span className="total-valor">{formatarValor(totalHoje)}</span>
        </div>

        <div className="actions-bar">
          <h2 className="section-title">Gastos de Hoje</h2>
          <Link to="/relatorios" className="btn-relatorios">
            📊 Relatórios
          </Link>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Carregando gastos...</p>
          </div>
        ) : (
          <GastosList gastos={gastosHoje} onDelete={handleDelete} />
        )}
      </div>

      <MicButton onGastoAdicionado={handleGastoAdicionado} />
      <InputGasto onGastoAdicionado={handleGastoAdicionado} />
    </div>
  )
}
