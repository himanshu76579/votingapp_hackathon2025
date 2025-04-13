// VoteButton.js
import React from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this line
import './Navbar.css';

const VoteButton = () => {
  const navigate = useNavigate(); // <-- Initialize the hook

  const handleVoteClick = async () => {
    try {
      const res = await fetch('http://localhost:8000/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      

      if (res.status === 200) {
        // Authenticated
        navigate('/vote');
      } else {
        // Not authenticated
        navigate('/login');
      }
    } catch (err) {
      console.error('Error checking auth:', err);
      navigate('/login'); // fallback
    }
  };

  return (
    <button onClick={handleVoteClick} className="vote-btn" >
      vote
    </button>
  );
};

export default VoteButton;
