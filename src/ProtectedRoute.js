import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { DataState } from './context/Provider';

const ProtectedRoute = () => {
 const {token} = DataState();
 

  
  
  return token?<Outlet/>: <Navigate to="/"/>
}

export default ProtectedRoute