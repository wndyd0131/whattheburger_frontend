import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutUs from "../pages/AboutUs";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/about" element={<AboutUs/>}></Route>
    </Routes>
  );
};

export default Router;