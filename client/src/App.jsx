import { Routes, Route, Navigate } from 'react-router-dom'
import Admindashboard from './component/Pages/Admindashboard'
import Login from './component/Pages/Login'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="admindashboard" />} />
        <Route path="/employee" element={<h1>About Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={
          
          <Private> 
            <RolebasedRoute requiredRole={['admin']}> 
          <Admindashboard />
          </RolebasedRoute>
          </Private>
          
          } />
      </Routes>
    </div>
  )
}

export default App