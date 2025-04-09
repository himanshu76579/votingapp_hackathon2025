// src/components/States.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const states = ["Bihar", "Uttar Pradesh", "Maharashtra", "Tamil Nadu", "West Bengal"];

const States = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Select Your State</h2>
      {states.map((state, index) => (
        <div key={index}>
          <button onClick={() => navigate('/login')}>{state}</button>
          <br /><br />
        </div>
      ))}
    </div>
  );
};

export default States;
