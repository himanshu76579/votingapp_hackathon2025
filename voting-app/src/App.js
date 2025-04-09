import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/Loginpage';
import Home from './components/Home';
import FingerprintScan from './components/FingerprintScan';
import Villages from './components/Villages';
import States  from './components/States';
import VoteSelection from './components/VoteSelection';

function App() {
  return (
    <Router>
     
      <Navbar />

     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fingerprint" element={<FingerprintScan />} />
        <Route path="/vote" element={<VoteSelection />} />
      <Route path="/states" element={<States />} />
      <Route path="/villages" element={<Villages />} />
      </Routes>

   
      <Footer />
    </Router>
  );
}

export default App;

