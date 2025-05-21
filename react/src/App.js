import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import Terminal from './components/Terminal';
import ProjectSection from './components/ProjectSection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="content-wrapper">
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