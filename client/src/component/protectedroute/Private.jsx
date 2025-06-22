import React from 'react'
import { useAuthContext } from '../Context/Autcontext'
import { Navigate } from 'react-router-dom'

function Private({ children }) {
  const { user, loading } = useAuthContext()

  // if (loading) {
  //   return <div>Loading...</div>
  // }
  return user ? children : <Navigate to="/login" />
}

export default Private