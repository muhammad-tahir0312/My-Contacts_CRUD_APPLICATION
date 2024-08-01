import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Private from './components/Private';
import Login from './components/Login';
import Homepage from './components/Homepage';
import MyProfile from './components/MyProfile';
import CreateContact from './components/CreateContact';
import ViewAllContacts from './components/ViewAllContacts';
import ViewContact from './components/ViewContact';
import UpdateContact from './components/UpdateContact';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route element={<Private/>}>
          <Route path="/" element={<Homepage/>} />
          <Route path="/create_contact" element={<CreateContact/>} />
          <Route path="/update_contact" element={<UpdateContact/>} />
          <Route path="/view_contact" element={<ViewContact/>} />
          <Route path="/view_all_contacts" element={<ViewAllContacts/>} />
          <Route path="/my_profile" element={<MyProfile/>} />
        </Route>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
