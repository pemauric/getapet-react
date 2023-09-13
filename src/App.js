import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register"
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import Container from "./components/layouts/Container"
import Message from "./components/layouts/Message";
import MyPets from "./components/pages/Pets/MyPets";
import AddPets from "./components/pages/Pets/AddPets";
import EditPet from "./components/pages/Pets/EditPet";

import {UserProvider} from "./context/UserContext"

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/user/profile" element={<Profile />}/>
            <Route path="/pet/mypets" element={<MyPets />}/>
            <Route path="/pet/add" element={<AddPets/>}/>
            <Route path="/pet/edit/:id" element={<EditPet/>}/>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
