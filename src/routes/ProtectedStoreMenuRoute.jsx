import React from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";


const ProtectedStoreMenuRoute = ({children}) => {
  const location = useLocation();
  const {storeId} = useParams();
  if (storeId === undefined) {
    return null; // Wait until params are ready
  }
  
  const isValidStoreId = Number.isInteger(Number(storeId)) && Number(storeId) > 0
  if (!isValidStoreId) {
    return (
      <Navigate to="/menu/store"></Navigate>
    )
  }
  return (
    children
  )
}

export default ProtectedStoreMenuRoute;