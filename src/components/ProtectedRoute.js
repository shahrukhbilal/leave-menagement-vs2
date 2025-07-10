import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from './Login'

function ProtectedRoute({children}) {
    const token = localStorage.getItem("token")
    if(!token){
     return   <Navigate to={<Login></Login>} ></Navigate>
    }
    return children;

}

export default ProtectedRoute