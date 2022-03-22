import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

//components
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Router>
    </div>
  );
}

export default App;
