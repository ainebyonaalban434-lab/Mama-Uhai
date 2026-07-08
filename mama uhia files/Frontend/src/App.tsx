import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import MotherDashboard from './pages/MotherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/mother-dashboard" 
          element={<ProtectedRoute role="mother"><MotherDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/admin-dashboard" 
          element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} 
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
