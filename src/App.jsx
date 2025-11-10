import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Chat from './pages/Chat'
import Hoje from './pages/Hoje'
import Relatorios from './pages/Relatorios'
import './styles/theme.css'
import './App.css'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="app">
        <Header />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/hoje" element={<Hoje />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
