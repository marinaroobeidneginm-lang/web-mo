import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash'
import Home from './pages/Home'
import PropertyDetail from './pages/PropertyDetail'

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades/:id" element={<PropertyDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
