import { useState } from 'react';
import {
  doCreateUserWithEmailAndPassoword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from './firebase/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async () => {
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await doCreateUserWithEmailAndPassoword(email, password);
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await doSignInWithGoogle();
    } catch (err) {
      console.error("Google login failed:", err.message);
    }
  };

  return (
    <div className='login-form'>
      <h2>Log In</h2>
      <div className='email-container'>
        <p>Email</p>
        <input
        className='email-input'
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='password-container'>
        <p>Password</p>
        <input
          className='password-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className='signin-button' onClick={handleEmailLogin}>Log In</button>
      <label className='register-label'>Don't have an account?<button onClick={handleRegister}>Register</button></label>

      <p>OR</p>
      
      <button className='login-google' onClick={handleGoogleLogin}>Log In with Google</button>
    </div>
  );
}