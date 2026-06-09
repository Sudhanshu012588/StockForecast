import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Stocks } from './Pages/Stocks'
import LandingPage from "./Pages/HomePage.tsx"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/stock" element={<Stocks />} />
        <Route path="*" element={<Navigate to="/stock" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
