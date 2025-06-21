import React from 'react'
import { useAuthContext } from '../Context/Autcontext';

function Navbar() {
    const { user } = useAuthContext();
  return (
    <div>
      <h1>
        Welcome to the Admin Dashboard, {user ? user.name : 'Guest'}!
        <br />
        Role: {user ? user.role : 'No role assigned'}
      </h1>
      <button>Logout</button>
    </div>
  )
}

export default Navbar
