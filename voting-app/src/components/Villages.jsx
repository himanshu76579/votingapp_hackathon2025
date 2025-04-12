// src/components/Villages.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const villages = ["Rampur", "Gopalpur", "Kishanganj", "Sultanpur", "Rajapakar"];

const Villages = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Select Your Village</h2>
      {villages.map((village, index) => (
        <div key={index}>
          <button onClick={() => navigate('/login')}>{village}</button>
          <br /><br />
        </div>
      ))}
    </div>
  );
};

export default Villages;
