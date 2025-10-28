import HomePage from "./pages/HomePage";
import Menu from "./pages/menu/Menu";
import MenuCreate from "./components/Admin/MenuCreate";
import Auth from "./pages/auth/Auth";
import {BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { UserContext } from "./contexts/UserContext";
import Layout from "./Layout";
import { LayoutProvider } from "./contexts/LayoutContext";
import Order from "./pages/order/Order";
import OrderComplete from "./pages/order/OrderComplete";
import OrderSearch from "./pages/order/OrderSearch";
import ProtectedMenuRoute from "./routes/ProtectedMenuRoute";
import StoreSelection from "./pages/store/StoreSelection";
import { APIProvider } from "@vis.gl/react-google-maps";
import Admin from "./pages/admin/Admin";
import ProtectedStoreMenuRoute from "./routes/ProtectedStoreMenuRoute";
import RequireRoles from "./routes/RequireRoles";
import api from "./utils/api";

function App() {
  const {
    setUserDetails,
    setIsLoading
  } = useContext(UserContext);
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
    if (accessToken) {
      setIsLoading(true);
      api.get('/users', {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then (response => {
          setUserDetails((prev) => ({
            ...prev,
            userId: response.data.userId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNum: response.data.phoneNum,
            zipcode: response.data.zipcode,
            isAuthenticated: true,
            role: response.data.role
          }));
      })
      .catch(err => {
        console.error(err);
        setUserDetails(null);
      })
      .finally(() => {
        setIsLoading(false)
      });
    } else {
      setUserDetails(null);
    }

    // return () => {
    //   document.body.removeChild(script);
    // }
  }, [])

  return (
      <Router>
        <LayoutProvider>
            <Routes>
              <Route element={<Layout/>}>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/menu" element={
                  <ProtectedMenuRoute>
                  </ProtectedMenuRoute>
                }></Route>
                <Route path="/menu/:storeId" element={
                  <ProtectedStoreMenuRoute>
                    <Menu/>
                  </ProtectedStoreMenuRoute>
                }></Route>
                <Route element={<RequireRoles role={'ADMIN'} />}>
                  <Route path="/admin" element={<Admin/>} />
                </Route>
                <Route path="/admin/menu" element={<MenuCreate/>}></Route>
                <Route path="/menu/store" element={
                  <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <StoreSelection/>
                  </APIProvider>
                }></Route>
                <Route path="/auth" element={<Auth/>}></Route>
                <Route path="/order-session/:sessionId/store/:storeId" element={<Order/>}></Route>
                <Route path="/order/complete" element={<OrderComplete/>}></Route>
                <Route path="/order/search" element={<OrderSearch/>}></Route>
              </Route>
            </Routes>
        </LayoutProvider>
      </Router>
  );
}

export default App
