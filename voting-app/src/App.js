import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/Loginpage';
import Home from './components/Home';
import FingerprintScan from './components/FingerprintScan';
import States from './components/States';

import CheckElection from './components/CheckElection';

function App() {
  return (
    <Router>
     
      <Navbar />

     
      <Routes>
        <Route path="/" element={<Home />} />
        //Main hoon baap coder
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fingerprint" element={<FingerprintScan />} />
        <Route path="/vote" element={<States />} />
      {/* <Route path="/states" element={<States />} />
      //Hello
      <Route path="/villages" element={<Villages />} /> */}
      </Routes>

   
      <Footer />
    </Router>
  );
}

export default App;

