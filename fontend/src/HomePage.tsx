import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/style.css'; // Assume this is where your CSS is located

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="home-title">PURECHAIN</h1>
        <p className="home-subtitle">We protect your data</p>
        <div className="button-group">
          <button className="submit-button" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="submit-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;