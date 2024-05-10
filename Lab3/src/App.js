import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse";
import HotelPage from "./pages/HotelPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
