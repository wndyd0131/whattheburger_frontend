import React from 'react'
import { Navigate } from "react-router-dom";
import Cookie from 'js-cookie';

const ProtectedMenuRoute = ({children}) => {
  const hasCookie = document.cookie.includes("storeId");
  if (!hasCookie) {
    return <Navigate to="/menu/store" replace />
  }
  const storeId = Cookie.get("storeId");
  return <Navigate to={`/menu/${storeId}`}/>;
}

export default ProtectedMenuRoute