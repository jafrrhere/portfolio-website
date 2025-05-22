import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import Terminal from './components/Terminal';
import ProjectSection from './components/ProjectSection';
import Squares from './components/Squares';
import './App.css';

function App() {
  return (
    <Router>
      <div className="content-wrapper">
        <div className="background-container">
          <Squares 
            speed={0.5} 
            squareSize={40}
            direction='diagonal'
            borderColor='#fff'
            hoverFillColor='#222'
          />
        </div>
        <Navbar />
        <div className="center">
          <h2 className="center-text" id="nameText"></h2>
        </div>
        <ProfileCard />
        <ProjectSection />
        <Terminal />
      </div>
    </Router>
  );
}

export default App; 