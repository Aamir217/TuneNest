import React, { useState } from 'react';
import './EntryPage.css'; // You can add your custom styles here

const EntryPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handlers for form input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Placeholder functions for handling login and sign-up
  const handleLogin = () => {
    alert('Login clicked!');
    // Implement actual login logic here
  };

  const handleSignUp = () => {
    alert('Sign-up clicked!');
    // Implement actual sign-up logic here
  };

  const handleGuestContinue = () => {
    alert('Continuing as Guest!');
    // Redirect to the main app page
  };

  return (
    <div className="entry-page">
      <div className="entry-container">
        <h1>Welcome to TuneNest</h1>
        {isSignUp ? (
          <div className="sign-up-form">
            <h2>Create an Account</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <p>
              Already have an account?{' '}
              <span onClick={() => setIsSignUp(false)}>Login here</span>
            </p>
          </div>
        ) : (
          <div className="login-form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button onClick={handleLogin}>Login</button>
            <p>
              Don’t have an account?{' '}
              <span onClick={() => setIsSignUp(true)}>Sign up here</span>
            </p>
          </div>
        )}
        <button className="guest-button" onClick={handleGuestContinue}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default EntryPage;
