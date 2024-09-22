import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import QuizComponent from './components/QuizComponent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="App">
      {!isLoggedIn ? (
        isSignup ? (
          <SignupForm onSignup={() => setIsLoggedIn(true)} />
        ) : (
          <LoginForm onLogin={() => setIsLoggedIn(true)} />
        )
      ) : (
        <QuizComponent />
      )}
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Go to Login' : 'Go to Signup'}
      </button>
    </div>
  );
}

export default App;
