import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Menu from "./pages/Menu";
import AboutUs from "./pages/AboutUs";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
// const HomePage = () => <h1>Home Page</h1>
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/menu" element={<Menu/>}></Route>
          <Route path="/about" element={<AboutUs/>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
