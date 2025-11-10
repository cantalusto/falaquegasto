import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({ title, showBackButton = false }) {
  return (
    <header className="app-header">
      <div className="header-content">
        {showBackButton && (
          <Link to="/" className="back-button">
            ← Voltar
          </Link>
        )}
        <h1 className="header-title">{title}</h1>
      </div>
    </header>
  )
}
