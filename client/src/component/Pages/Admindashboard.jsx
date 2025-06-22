import React from 'react'
import { useAuthContext } from '../Context/Autcontext'
import { Navigate } from 'react-router-dom'
import Sidebar from '../Pages/Sidebar'
import Navbar from '../Pages/Navbar'
// import './Admindashboard.css' // Create this CSS file
import '../Pages/admin.css' // Create this CSS file
import ADminsummer from './ADminsummer'

function Admindashboard() {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <div>Loading...</div>
  }
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <div className="admin-content">
          
          <ADminsummer/>
          
        </div>
      </div>
    </div>
  )
}

export default Admindashboard