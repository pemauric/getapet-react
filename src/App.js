import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register"
import Home from "./components/pages/Home";
import Container from "./components/layouts/Container"


function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
