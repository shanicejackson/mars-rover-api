import React from 'react';
import './styling/home.css';
import './styling/button.css';

function Home() {
  return (
    <div>
      <button className="btn-76">
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