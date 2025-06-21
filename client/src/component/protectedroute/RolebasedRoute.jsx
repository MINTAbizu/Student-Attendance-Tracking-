import React from 'react'
import { useNavigate } from 'react-router-dom';

function RolebasedRoute({children, requiredRole})  {
    const {user, loading} = useAuthContext();
    const navigate = useNavigate();
    if (loading) {
        return <div>Loading...</div>;
    }

    if(!requiredRole.includes(user?.role)) {
        return children;
        navigate("/unautorized") // If no role is required, render the children
    }




}

export default RolebasedRoute
