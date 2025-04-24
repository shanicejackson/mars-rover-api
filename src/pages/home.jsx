import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styling/home.css'; 
import '../styling/button.css'; 

function Home() {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/rover'); 
  };

  return (
    <div className="space-photo">
      <button className="btn-76" onClick={handleClick}>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
        Welcome
      </button>
      </div>
  );
}

export default Home;