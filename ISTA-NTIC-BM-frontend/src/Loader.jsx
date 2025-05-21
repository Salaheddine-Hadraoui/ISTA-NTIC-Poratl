import React from 'react';
import './loader.css';
const Loader = () => {
  return (
    <div className="loading-container">
      <div className="loader">
        <div className="cube cube1" />
        <div className="cube cube2" />
        <div className="cube cube3" />
        <div className="cube cube4" />
      </div>
    </div>
  );
};

export default Loader;
