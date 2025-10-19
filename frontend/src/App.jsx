import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PricePredict from "./pages/PricePredict";
import Info from "./pages/Info";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<PricePredict />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}


export default App;

