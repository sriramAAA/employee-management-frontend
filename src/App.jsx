import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {
  const [userEmail, setUserEmail] = useState('')

  function handleLogout() {
    setUserEmail('')
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar isAuthenticated={Boolean(userEmail)} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={<Navigate to={userEmail ? '/dashboard' : '/login'} replace />}
          />
          <Route
            path="/login"
            element={
              userEmail ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLogin={setUserEmail} />
              )
            }
          />
          <Route
            path="/register"
            element={userEmail ? <Navigate to="/dashboard" replace /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={Boolean(userEmail)}>
                <Dashboard email={userEmail} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Northstar</span>
          <span>Simple, thoughtful account access</span>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
