import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FingerprintScan.css';

const FingerprintScan = () => {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVerified(true);
      setTimeout(() => {
        navigate('/dashboard'); // or your next page
      }, 1500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="scan-container">
      {!verified ? (
        <>
          <h2>Scanning Fingerprint...</h2>
          <div className="fingerprint-spinner"></div>
        </>
      ) : (
        <h2>Fingerprint Verified ✅</h2>
      )}
    </div>
  );
};

export default FingerprintScan;
