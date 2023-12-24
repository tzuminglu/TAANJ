import React, { useContext, useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Members from "./pages/Members";
import Photos from "./pages/Photos";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/about" element={<About />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
    </div>
  );
}

export default App;
