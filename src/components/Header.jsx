import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">�</span>
          <span className="logo-text">FalaQueGasto</span>
        </Link>

        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <span className="nav-icon">�</span>
            <span className="nav-text">Chat</span>
          </Link>
          
          <Link 
            to="/hoje" 
            className={`nav-link ${isActive('/hoje') ? 'active' : ''}`}
          >
            <span className="nav-icon">📅</span>
            <span className="nav-text">Hoje</span>
          </Link>
          
          <Link 
            to="/relatorios" 
            className={`nav-link ${isActive('/relatorios') ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Relatórios</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
