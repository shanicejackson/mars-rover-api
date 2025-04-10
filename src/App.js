import React from 'react';
import Home from './pages/home';
import Navbar from './components/navbar';
import Rover from './pages/rover';
import Photos from './pages/photos';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styling/App.css';

function App() {
  return (
    <div>
      <Home />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rover" element={<Rover />} />
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
