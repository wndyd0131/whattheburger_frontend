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

function App() {

  const {
    setUserDetails
  } = useContext(UserContext);

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      axios.get('http://localhost:8080/api/v1/users', {
        headers: {Authorization: `Bearer ${accessToken}`}
      }).then (response => {
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
  })

  return (
      <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/menu" element={<Menu/>}></Route>
            <Route path="/about" element={<AboutUs/>}></Route>
            <Route path="/admin/menu" element={<MenuCreate/>}></Route>
            <Route path="/auth" element={<Auth/>}></Route>
          </Routes>
      </Router>

  );
}

export default App
