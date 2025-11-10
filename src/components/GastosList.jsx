import './GastosList.css'

export default function GastosList({ gastos, onDelete }) {
  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const formatarData = (data) => {
    const date = new Date(data)
    return date.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoriaEmoji = (categoria) => {
    const emojis = {
      alimentacao: '🍔',
      transporte: '🚌',
      saude: '💊',
      lazer: '🎮',
      mercado: '🛒',
      contas: '📄',
      outros: '📦'
    }
    return emojis[categoria] || '📦'
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

  if (!gastos || gastos.length === 0) {
    return (
      <div className="gastos-list-empty">
        <div className="empty-icon">💸</div>
        <p>Nenhum gasto registrado hoje</p>
        <p className="empty-hint">Use o botão do microfone para adicionar gastos por voz</p>
      </div>
    )
  }

  return (
    <div className="gastos-list">
      {gastos.map((gasto) => (
        <div key={gasto.id} className="gasto-item">
          <div className="gasto-header">
            <div className="gasto-categoria" style={{ backgroundColor: getCategoriaColor(gasto.categoria) }}>
              <span className="categoria-emoji">{getCategoriaEmoji(gasto.categoria)}</span>
              <span className="categoria-nome">{gasto.categoria}</span>
            </div>
            <span className="gasto-hora">{formatarData(gasto.data)}</span>
          </div>
          
          <div className="gasto-body">
            <p className="gasto-descricao">{gasto.descricao}</p>
            <div className="gasto-footer">
              <span className="gasto-valor">{formatarValor(gasto.valor)}</span>
              {onDelete && (
                <button
                  className="gasto-delete"
                  onClick={() => onDelete(gasto.id)}
                  title="Excluir gasto"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>

          {!gasto.synced && (
            <div className="gasto-sync-status" title="Não sincronizado">
              ⚠️
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
