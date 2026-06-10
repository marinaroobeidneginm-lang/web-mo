import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash'
import AdminLayout from './components/admin/AdminLayout'
import Home from './pages/Home'
import PropertyDetail from './pages/PropertyDetail'
import AdminPropertyList from './pages/admin/AdminPropertyList'
import AdminPropertyNew from './pages/admin/AdminPropertyNew'
import AdminPropertyEdit from './pages/admin/AdminPropertyEdit'

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/propiedades/:id" element={<PropertyDetail />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPropertyList />} />
          <Route path="propiedades/nueva" element={<AdminPropertyNew />} />
          <Route path="propiedades/:id/editar" element={<AdminPropertyEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
