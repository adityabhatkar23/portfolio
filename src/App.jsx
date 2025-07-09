import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import { Contact } from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <div className=" bg-black min-h-screen w-full text-white flex flex-col items-center p-10 gap-12 ">
        <Navbar />

        <main className=" max-w-4xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
