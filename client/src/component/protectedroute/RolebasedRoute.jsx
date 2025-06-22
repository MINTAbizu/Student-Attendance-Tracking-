import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../Context/Autcontext'

function RolebasedRoute({ children, requiredRole }) {
  const { user, loading } = useAuthContext()

  if (loading) {
    return <div>Loading...</div>
  }

  // If user is not logged in or does not have the required role, redirect
  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  // If user has the required role, render the children
  return children
}

export default RolebasedRoute