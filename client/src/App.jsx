import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Home from './pages/Home'
import PropertyDetail from './pages/PropertyDetail'
import AdminLogin from './pages/admin/AdminLogin'
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

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPropertyList />} />
          <Route path="propiedades/nueva" element={<AdminPropertyNew />} />
          <Route path="propiedades/:id/editar" element={<AdminPropertyEdit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
