import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Relatorios from './pages/Relatorios'
import './App.css'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
