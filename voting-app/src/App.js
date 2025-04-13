import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/Loginpage';
import Home from './components/Home';
import FingerprintScan from './components/FingerprintScan';
import ElectionLevel from './components/ElectionLevel';
import ElectionPartyList from './components/ElectionPartyList';




function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fingerprint" element={<FingerprintScan />} />
        <Route path="/vote" element={<ElectionLevel />} />
        <Route path="/election/:level" element={<ElectionPartyList />} />
       
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
