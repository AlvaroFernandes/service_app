import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/Profile";
import Clients from "./pages/Clients";
import Jobs from "./pages/Jobs";
import Users from "./pages/Users";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
