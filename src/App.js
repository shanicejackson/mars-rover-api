import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/home'; 
import Navbar from './components/navbar';
import MarsRover from './pages/rover'; 
import Photos from './pages/photos';
import './styling/App.css'; 

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rover" element={<MarsRover />} /> 
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
