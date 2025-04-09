import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1
import './Loginpage.css';

const LoginPage = () => {
  const navigate = useNavigate(); // ✅ Step 2

  const [formData, setFormData] = useState({
    username: '',
    voterId: '',
    mobile: '',
    Aadharnumber: '',
    voterIdPhoto: null,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, voterId, mobile, voterIdPhoto, Aadharnumber } = formData;

    if (!username || !voterId || !mobile || !voterIdPhoto || !Aadharnumber) {
      setError('All fields are required!');
      return;
    }

    setError('');
    console.log('Registered Data:', formData);

    // ✅ Step 3: Redirect to fingerprint scan page
    navigate('/fingerprint');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Voter Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Voter ID Number</label>
            <input type="text" name="voterId" value={formData.voterId} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Aadhar Number</label>
            <input type="text" name="Aadharnumber" value={formData.Aadharnumber} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Upload Voter ID Photo</label>
            <input type="file" name="voterIdPhoto" onChange={handleChange} accept="image/*" />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
