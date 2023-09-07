import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register"
import Home from "./components/pages/Home";
import Container from "./components/layouts/Container"

import {UserProvider} from "./context/UserContext"


function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />}/>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
