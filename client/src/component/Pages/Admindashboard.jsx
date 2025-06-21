import React from 'react'
import { useAuthContext } from '../Context/Autcontext'
import { useNavigate } from 'react-router-dom'
// import { useAuthContext } from '../Context/AuthContext'

function Admindashboard() {
  const { user,loading } = useAuthContext()
  const navigator = useNavigate()
if(loading) {
  return <div>Loading...</div>
}
  if(!user) {
    navigator('/login')
  }

     
  return (
    <div>
      <h1>Welcome to Admin Dashboard</h1>
      <h2>Admin Name: {user ? user.name : 'Guest'}</h2>
      <p>Role: {user ? user.role : 'No role assigned'}</p>
    </div>
  )
}

export default Admindashboard