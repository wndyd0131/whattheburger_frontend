import HomePage from "./pages/HomePage";
import Menu from "./pages/Menu";
import AboutUs from "./pages/AboutUs";
import MenuCreate from "./pages/MenuCreate";
import Auth from "./pages/Auth";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { UserContext } from "./contexts/UserContext";
import Layout from "./Layout";
import { LayoutProvider } from "./contexts/LayoutContext";
import Order from "./pages/Order";
import OrderComplete from "./pages/OrderComplete";
import OrderSearch from "./pages/OrderSearch";
import ProtectedMenuRoute from "./ProtectedMenuRoute";
import StoreSelection from "./pages/StoreSelection";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  const {
    setUserDetails
  } = useContext(UserContext);
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  
  useEffect(() => {
    console.log(GOOGLE_MAPS_API_KEY);
    const script = document.createElement("script");
    script.src = `src="https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=maps`;
    script.async = true;
    document.body.appendChild(script);

    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      axios.get('http://localhost:8080/api/v1/users', {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then (response => {
          console.log("HI", response.data);
          setUserDetails((prev) => ({
            ...prev,
            userId: response.data.userId,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNum: response.data.phoneNum,
            zipcode: response.data.zipcode,
            isAuthenticated: true
          }));
      }).catch(err => console.error(err));
    }

    return () => {
      document.body.removeChild(script);
    }
  }, [])

  return (
      <Router>
        <LayoutProvider>
            <Routes>
              <Route element={<Layout/>}>
                <Route path="/" element={<HomePage/>}></Route>
                
                  <Route path="/menu" element={
                    <ProtectedMenuRoute>
                      <Menu/>
                    </ProtectedMenuRoute>
                  }></Route>
                <Route path="/about" element={<AboutUs/>}></Route>
                <Route path="/admin/menu" element={<MenuCreate/>}></Route>
                <Route path="/menu/store" element={
                  <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <StoreSelection/>
                  </APIProvider>
                }></Route>
                <Route path="/auth" element={<Auth/>}></Route>
                <Route path="/order" element={<Order/>}></Route>
                <Route path="/order/complete" element={<OrderComplete/>}></Route>
                <Route path="/order/search" element={<OrderSearch/>}></Route>
              </Route>
            </Routes>
        </LayoutProvider>
      </Router>
  );
}

export default App
