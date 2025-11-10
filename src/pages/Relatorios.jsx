import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { gastosService } from '../services/supabase'
import { storageService } from '../services/storage'
import './Relatorios.css'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Relatorios() {
  const [gastosHoje, setGastosHoje] = useState([])
  const [gastosMes, setGastosMes] = useState([])
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  const [totalHoje, setTotalHoje] = useState(0)
  const [totalMes, setTotalMes] = useState(0)
  const [totalFiltrado, setTotalFiltrado] = useState(0)
  const [loading, setLoading] = useState(true)
  const [categorias, setCategorias] = useState({})
  
  // Filtros
  const [tipoFiltro, setTipoFiltro] = useState('mes') // 'dia', 'mes', 'ano'
  const [dataFiltro, setDataFiltro] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    carregarRelatorios()
  }, [])

  useEffect(() => {
    aplicarFiltro()
  }, [tipoFiltro, dataFiltro, gastosMes])

  const carregarRelatorios = async () => {
    try {
      setLoading(true)
      const hoje = new Date()
      const mes = hoje.getMonth()
      const ano = hoje.getFullYear()

      if (storageService.isOnline()) {
        try {
          const [gastosHoje, gastosMes] = await Promise.all([
            gastosService.getByDate(hoje),
            gastosService.getByMonth(ano, mes)
          ])

          processarDados(gastosHoje, gastosMes)
        } catch (error) {
          console.error('Erro ao buscar dados:', error)
          carregarDoCache()
        }
      } else {
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
    
    const mes = hoje.getMonth()
    const ano = hoje.getFullYear()

    const gastosHoje = gastosCache.filter(gasto => {
      const dataGasto = new Date(gasto.data)
      dataGasto.setHours(0, 0, 0, 0)
      return dataGasto.getTime() === hoje.getTime()
    })

    const gastosMes = gastosCache.filter(gasto => {
      const dataGasto = new Date(gasto.data)
      return dataGasto.getMonth() === mes && dataGasto.getFullYear() === ano
    })

    processarDados(gastosHoje, gastosMes)
  }

  const processarDados = (gastosHoje, gastosMes) => {
    setGastosHoje(gastosHoje)
    setGastosMes(gastosMes)
    setGastosFiltrados(gastosMes)

    const totalHoje = gastosHoje.reduce((acc, g) => acc + parseFloat(g.valor), 0)
    const totalMes = gastosMes.reduce((acc, g) => acc + parseFloat(g.valor), 0)

    setTotalHoje(totalHoje)
    setTotalMes(totalMes)
    setTotalFiltrado(totalMes)

    // Agrupar por categoria
    const cats = {}
    gastosMes.forEach(gasto => {
      const cat = gasto.categoria || 'outros'
      if (!cats[cat]) {
        cats[cat] = 0
      }
      cats[cat] += parseFloat(gasto.valor)
    })

    setCategorias(cats)
  }

  const aplicarFiltro = () => {
    if (!dataFiltro || gastosMes.length === 0) return

    const dataBase = new Date(dataFiltro)
    let gastosFiltrados = []

    if (tipoFiltro === 'dia') {
      dataBase.setHours(0, 0, 0, 0)
      gastosFiltrados = gastosMes.filter(gasto => {
        const dataGasto = new Date(gasto.data)
        dataGasto.setHours(0, 0, 0, 0)
        return dataGasto.getTime() === dataBase.getTime()
      })
    } else if (tipoFiltro === 'mes') {
      gastosFiltrados = gastosMes.filter(gasto => {
        const dataGasto = new Date(gasto.data)
        return dataGasto.getMonth() === dataBase.getMonth() && 
               dataGasto.getFullYear() === dataBase.getFullYear()
      })
    } else if (tipoFiltro === 'ano') {
      // Para ano, buscar todos os gastos do ano
      const gastosCache = storageService.getGastos()
      gastosFiltrados = gastosCache.filter(gasto => {
        const dataGasto = new Date(gasto.data)
        return dataGasto.getFullYear() === dataBase.getFullYear()
      })
    }

    setGastosFiltrados(gastosFiltrados)
    
    const total = gastosFiltrados.reduce((acc, g) => acc + parseFloat(g.valor), 0)
    setTotalFiltrado(total)

    // Atualizar categorias
    const cats = {}
    gastosFiltrados.forEach(gasto => {
      const cat = gasto.categoria || 'outros'
      if (!cats[cat]) {
        cats[cat] = 0
      }
      cats[cat] += parseFloat(gasto.valor)
    })
    setCategorias(cats)
  }

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
      
      // Recarregar dados
      await carregarRelatorios()
      
    } catch (error) {
      console.error('Erro ao excluir gasto:', error)
      alert('Erro ao excluir o gasto. Tente novamente.')
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF()
    
    // Título
    doc.setFontSize(18)
    doc.text('FalaQueGasto - Relatório', 14, 20)
    
    // Período
    doc.setFontSize(12)
    let periodo = ''
    if (tipoFiltro === 'dia') {
      periodo = new Date(dataFiltro).toLocaleDateString('pt-BR')
    } else if (tipoFiltro === 'mes') {
      const data = new Date(dataFiltro)
      periodo = `${data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`
    } else {
      periodo = new Date(dataFiltro).getFullYear().toString()
    }
    doc.text(`Período: ${periodo}`, 14, 30)
    
    // Total
    doc.setFontSize(14)
    doc.text(`Total: ${formatarValor(totalFiltrado)}`, 14, 40)
    
    // Tabela de gastos por categoria
    doc.setFontSize(12)
    doc.text('Gastos por Categoria:', 14, 50)
    
    const tabelaCategorias = Object.entries(categorias).map(([cat, valor]) => [
      cat.charAt(0).toUpperCase() + cat.slice(1),
      formatarValor(valor)
    ])
    
    doc.autoTable({
      startY: 55,
      head: [['Categoria', 'Valor']],
      body: tabelaCategorias,
      theme: 'striped',
      headStyles: { fillColor: [70, 130, 180] }
    })
    
    // Tabela de gastos individuais
    doc.text('Gastos Detalhados:', 14, doc.lastAutoTable.finalY + 10)
    
    const tabelaGastos = gastosFiltrados
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .map(gasto => [
        new Date(gasto.data).toLocaleDateString('pt-BR'),
        gasto.descricao,
        gasto.categoria,
        formatarValor(gasto.valor)
      ])
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Data', 'Descrição', 'Categoria', 'Valor']],
      body: tabelaGastos,
      theme: 'striped',
      headStyles: { fillColor: [70, 130, 180] }
    })
    
    // Salvar
    doc.save(`relatorio-${periodo.replace(/\s/g, '-')}.pdf`)
  }

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const getCategoriaColor = (categoria) => {
    const colors = {
      alimentacao: '#ff6b6b',
      transporte: '#4ecdc4',
      saude: '#45b7d1',
      lazer: '#f9ca24',
      mercado: '#6ab04c',
      contas: '#eb4d4b',
      outros: '#95a5a6'
    }
    return colors[categoria] || '#95a5a6'
  }

  // Dados para gráfico de pizza
  const pieData = {
    labels: Object.keys(categorias).map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
    datasets: [{
      data: Object.values(categorias),
      backgroundColor: Object.keys(categorias).map(cat => getCategoriaColor(cat)),
      borderWidth: 2,
      borderColor: '#fff'
    }]
  }

  // Dados para gráfico de barras
  const barData = {
    labels: Object.keys(categorias).map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
    datasets: [{
      label: 'Gastos por Categoria (R$)',
      data: Object.values(categorias),
      backgroundColor: Object.keys(categorias).map(cat => getCategoriaColor(cat)),
      borderRadius: 8
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12
          }
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="relatorios-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Carregando relatórios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relatorios-page">
      <div className="relatorios-content">
        {/* Filtros */}
        <div className="filtros-container">
          <h3 className="filtros-titulo">Filtrar Relatório</h3>
          
          <div className="filtros-grupo">
            <label>Tipo:</label>
            <select 
              value={tipoFiltro} 
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="filtro-select"
            >
              <option value="dia">Por Dia</option>
              <option value="mes">Por Mês</option>
              <option value="ano">Por Ano</option>
            </select>
          </div>

          <div className="filtros-grupo">
            <label>Data:</label>
            <input 
              type="date" 
              value={dataFiltro}
              onChange={(e) => setDataFiltro(e.target.value)}
              className="filtro-date"
            />
          </div>

          <button onClick={exportarPDF} className="btn-exportar-pdf">
            📄 Exportar PDF
          </button>
        </div>

        <div className="resumo-cards">
          <div className="resumo-card">
            <span className="resumo-label">Total Hoje</span>
            <span className="resumo-valor">{formatarValor(totalHoje)}</span>
            <span className="resumo-info">{gastosHoje.length} gastos</span>
          </div>

          <div className="resumo-card highlight">
            <span className="resumo-label">
              {tipoFiltro === 'dia' ? 'Total do Dia' : tipoFiltro === 'mes' ? 'Total do Mês' : 'Total do Ano'}
            </span>
            <span className="resumo-valor">{formatarValor(totalFiltrado)}</span>
            <span className="resumo-info">{gastosFiltrados.length} gastos</span>
          </div>
        </div>

        {Object.keys(categorias).length > 0 ? (
          <>
            <div className="chart-section">
              <h3 className="chart-title">Gastos por Categoria</h3>
              <div className="chart-container">
                <Pie data={pieData} options={chartOptions} />
              </div>
            </div>

            <div className="chart-section">
              <h3 className="chart-title">Comparativo de Gastos</h3>
              <div className="chart-container">
                <Bar data={barData} options={chartOptions} />
              </div>
            </div>

            <div className="categorias-lista">
              <h3 className="chart-title">Detalhamento por Categoria</h3>
              {Object.entries(categorias)
                .sort((a, b) => b[1] - a[1])
                .map(([categoria, valor]) => (
                  <div key={categoria} className="categoria-item">
                    <div className="categoria-info">
                      <span 
                        className="categoria-cor" 
                        style={{ backgroundColor: getCategoriaColor(categoria) }}
                      />
                      <span className="categoria-nome">
                        {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                      </span>
                    </div>
                    <span className="categoria-valor">{formatarValor(valor)}</span>
                  </div>
                ))}
            </div>

            <div className="gastos-detalhados">
              <h3 className="chart-title">Lista Completa de Gastos</h3>
              <div className="gastos-lista">
                {gastosFiltrados.map((gasto) => (
                  <div key={gasto.id} className="gasto-item">
                    <div className="gasto-data">
                      {new Date(gasto.data).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="gasto-info">
                      <span className="gasto-descricao">{gasto.descricao}</span>
                      <span 
                        className="gasto-categoria"
                        style={{ color: getCategoriaColor(gasto.categoria) }}
                      >
                        {gasto.categoria}
                      </span>
                    </div>
                    <div className="gasto-valor">
                      {formatarValor(gasto.valor)}
                    </div>
                    <button 
                      className="gasto-excluir"
                      onClick={() => excluirGasto(gasto.id)}
                      title="Excluir este gasto"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="no-data">
            <div className="no-data-icon">📊</div>
            <p>Nenhum gasto registrado no período selecionado</p>
          </div>
        )}
      </div>
    </div>
  )
}
