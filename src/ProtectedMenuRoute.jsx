import React from 'react'
import { Navigate } from "react-router-dom";

const ProtectedMenuRoute = ({children}) => {
  const hasCookie = document.cookie.includes("storeId");
  if (!hasCookie) {
    return <Navigate to="/menu/store" replace />
  }
  return children;
}

export default ProtectedMenuRoute