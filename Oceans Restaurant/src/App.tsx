import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './styles/App.scss'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/Dashboard/DashboardHome'
import DashboardSettings from './pages/Dashboard/DashboardSettings'
import DashboardSells from './pages/Dashboard/DashboardSells'
import DashboardProfile from './pages/Dashboard/DashboardProfile'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="sells" element={<DashboardSells />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="profile" element={<DashboardProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}

export default App
