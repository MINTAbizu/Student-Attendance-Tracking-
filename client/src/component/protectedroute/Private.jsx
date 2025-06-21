import React from 'react'
import { useAuthContext } from '../Context/Autcontext';

function Private({ children }) {
  const {user,loading }= useAuthContext()

    if (loading) {
    return <div>Loading...</div>;
  }
}

  return user ? children:<navigator to="/login"/>;

export default Private
