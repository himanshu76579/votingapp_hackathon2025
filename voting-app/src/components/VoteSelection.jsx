// src/components/VoteSelection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const VoteSelection = () => {
  const navigate = useNavigate();

  const handleNational = () => {
    navigate('/login');
  };

  const handleState = () => {
    navigate('/states');
  };

  const handleRegional = () => {
    navigate('/villages');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Select Voting Level</h2>
      <button onClick={handleNational}>National Level Vote</button>
      <br /><br />
      <button onClick={handleState}>State Level</button>
      <br /><br />
      <button onClick={handleRegional}>Regional Level</button>
    </div>
  );
};

export default VoteSelection;
