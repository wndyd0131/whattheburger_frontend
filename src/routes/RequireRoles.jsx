import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const RequireRoles = ({role}) => {
  const {
    userDetails,
    isLoading,
    isReady
  } = useContext(UserContext);

  if (isLoading || userDetails === undefined) return null;
  if (userDetails && userDetails.role === role) {
    return <Outlet/>;
  }
  return <Navigate to={"/403"}></Navigate>
}

export default RequireRoles;