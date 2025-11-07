/** @format */

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./context/AuthContext.js";
import AppRoutes from "./AppRoutes.js";
import Navbar from "./components/common/Navbar.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
